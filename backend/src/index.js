import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getDatabaseHealth, query } from './db.js'

const app = new Hono()
const api = new Hono()
const adminEmail = process.env.ADMIN_EMAIL || 'admin@sportplus.test'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'
const demoUserPassword = process.env.DEMO_USER_PASSWORD || 'User@123'

api.use('*', cors({
  origin: process.env.CORS_ORIGIN || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

api.onError((error, c) => {
  console.error(error)

  if (error.code === '23505') {
    return c.json({ success: false, error: 'Registro duplicado' }, 409)
  }

  if (error.code === '23502') {
    return c.json({ success: false, error: 'Dados obrigatorios em falta' }, 400)
  }

  return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
})

const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value || '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const mapRecord = (row) => ({
  ...row,
  viewers: Number(row.viewers || 0),
  likes: Number(row.likes || 0),
  views: Number(row.views || 0),
  followersCount: Number(row.followersCount || 0),
  followingCount: Number(row.followingCount || 0),
  totalViews: Number(row.totalViews || 0),
})

let eventViewsReady = false

const ensureEventViewsTable = async () => {
  if (eventViewsReady) return
  await query(`
    create table if not exists event_views (
      id bigserial primary key,
      event_id text not null references events(id) on delete cascade,
      viewer_key text not null,
      created_at timestamptz not null default now()
    )
  `)
  await query('create unique index if not exists event_views_event_id_viewer_key_idx on event_views (event_id, viewer_key)')
  eventViewsReady = true
}

const eventViewsJoin = `
  left join (
    select event_id, count(*)::int as "realViews"
    from event_views
    group by event_id
  ) ev on ev.event_id = event_details.id
`

const mapEventRecord = (row) => {
  const record = mapRecord(row)
  const realViews = Number(row.realViews || 0)
  return {
    ...record,
    views: realViews,
    viewers: realViews,
  }
}

const parseJsonEnv = (name, fallback = {}) => {
  try {
    return process.env[name] ? JSON.parse(process.env[name]) : fallback
  } catch {
    return fallback
  }
}

const getExternalFixtureId = (event) => {
  const fixtureMap = parseJsonEnv('FOOTBALL_FIXTURE_MAP')
  return fixtureMap[event.id] || event.teams?.externalFixtureId || event.externalFixtureId || null
}

const getLocalFootballScore = (event, reason = 'external_provider_not_configured') => ({
  source: 'local',
  provider: null,
  configured: false,
  reason,
  eventId: event.id,
  title: event.title,
  status: {
    short: event.status === 'live' ? 'LIVE' : event.status,
    long: event.status === 'live' ? 'Ao vivo' : event.status,
    elapsed: event.status === 'live' ? 72 : null,
  },
  teams: event.teams || null,
  cards: [],
  updatedAt: new Date().toISOString(),
})

const normalizeApiFootballFixture = (event, fixture) => {
  const fixtureStatus = fixture.fixture?.status || {}
  const goals = fixture.goals || {}
  const teams = fixture.teams || {}
  const cards = (fixture.events || [])
    .filter((item) => item.type === 'Card')
    .map((item) => ({
      team: item.team?.name || '',
      teamId: item.team?.id || null,
      player: item.player?.name || '',
      playerId: item.player?.id || null,
      minute: item.time?.elapsed || null,
      extra: item.time?.extra || null,
      type: item.detail || 'Card',
    }))

  return {
    source: 'external',
    provider: 'api-football',
    configured: true,
    eventId: event.id,
    externalFixtureId: fixture.fixture?.id || getExternalFixtureId(event),
    title: event.title,
    status: {
      short: fixtureStatus.short || event.status,
      long: fixtureStatus.long || event.status,
      elapsed: fixtureStatus.elapsed || null,
    },
    teams: {
      home: {
        name: teams.home?.name || event.teams?.home?.name || 'Casa',
        logo: teams.home?.logo || event.teams?.home?.logo || '',
        score: goals.home ?? event.teams?.home?.score ?? 0,
      },
      away: {
        name: teams.away?.name || event.teams?.away?.name || 'Fora',
        logo: teams.away?.logo || event.teams?.away?.logo || '',
        score: goals.away ?? event.teams?.away?.score ?? 0,
      },
    },
    cards,
    updatedAt: new Date().toISOString(),
  }
}

const fetchFootballLiveScore = async (event) => {
  if (event.sport?.slug !== 'futebol') {
    return getLocalFootballScore(event, 'not_a_football_event')
  }

  const apiKey = process.env.API_FOOTBALL_KEY
  const fixtureId = getExternalFixtureId(event)
  if (!apiKey || !fixtureId) {
    return getLocalFootballScore(event)
  }

  const baseUrl = process.env.API_FOOTBALL_BASE_URL || 'https://v3.football.api-sports.io'
  const response = await fetch(`${baseUrl}/fixtures?id=${encodeURIComponent(fixtureId)}`, {
    headers: { 'x-apisports-key': apiKey },
  })

  if (!response.ok) {
    return getLocalFootballScore(event, `external_provider_http_${response.status}`)
  }

  const payload = await response.json()
  const [fixture] = payload.response || []
  if (!fixture) {
    return getLocalFootballScore(event, 'external_fixture_not_found')
  }

  return normalizeApiFootballFixture(event, fixture)
}

api.get('/health', async (c) => {
  try {
    const database = await getDatabaseHealth()
    return c.json({
      status: 'ok',
      service: 'SPORT+ API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return c.json({ status: 'error', database: { ok: false }, error: error.message }, 503)
  }
})

api.get('/sports', async (c) => {
  const sports = await query('select * from sports order by name')
  return c.json({ success: true, data: sports })
})

api.get('/sports/:slug', async (c) => {
  const [sport] = await query('select * from sports where slug = $1', [c.req.param('slug')])
  if (!sport) return c.json({ success: false, error: 'Sport not found' }, 404)

  const events = await query('select * from event_details where sport->>$1 = $2 order by "startTime"', ['slug', sport.slug])
  return c.json({ success: true, data: { ...sport, events: events.map(mapRecord) } })
})

api.get('/channels', async (c) => {
  const live = c.req.query('live')
  const params = []
  let sql = 'select * from channel_details'

  if (live === 'true') {
    sql += ' where "isLive" = true'
  }

  sql += ' order by "followersCount" desc'
  const channels = await query(sql, params)
  return c.json({ success: true, data: channels.map(mapRecord) })
})

api.get('/channels/:slug', async (c) => {
  const [channel] = await query('select * from channel_details where slug = $1', [c.req.param('slug')])
  if (!channel) return c.json({ success: false, error: 'Channel not found' }, 404)
  return c.json({ success: true, data: mapRecord(channel) })
})

api.get('/events', async (c) => {
  await ensureEventViewsTable()
  const status = c.req.query('status')
  const sportSlug = c.req.query('sport')
  const limit = toNumber(c.req.query('limit'), 20)
  const page = toNumber(c.req.query('page'), 1)
  const offset = (page - 1) * limit
  const params = []
  const filters = []

  if (status) {
    params.push(status)
    filters.push(`status = $${params.length}`)
  }

  if (sportSlug) {
    params.push(sportSlug)
    filters.push(`sport->>'slug' = $${params.length}`)
  }

  const where = filters.length ? `where ${filters.join(' and ')}` : ''
  const [{ total }] = await query(`select count(*)::int as total from event_details ${where}`, params)
  params.push(limit, offset)
  const events = await query(
    `select event_details.*, coalesce(ev."realViews", 0)::int as "realViews"
     from event_details ${eventViewsJoin}
     ${where} order by "startTime" limit $${params.length - 1} offset $${params.length}`,
    params,
  )

  return c.json({
    success: true,
    data: events.map(mapEventRecord),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
})

api.get('/events/live', async (c) => {
  await ensureEventViewsTable()
  const events = await query(
    `select event_details.*, coalesce(ev."realViews", 0)::int as "realViews"
     from event_details ${eventViewsJoin}
     where status = $1
     order by coalesce(ev."realViews", 0) desc, "startTime" desc`,
    ['live'],
  )
  return c.json({ success: true, data: events.map(mapEventRecord), count: events.length })
})

api.get('/events/upcoming', async (c) => {
  await ensureEventViewsTable()
  const events = await query(
    `select event_details.*, coalesce(ev."realViews", 0)::int as "realViews"
     from event_details ${eventViewsJoin}
     where status = $1
     order by "startTime"`,
    ['upcoming'],
  )
  return c.json({ success: true, data: events.map(mapEventRecord), count: events.length })
})

api.get('/events/:id', async (c) => {
  await ensureEventViewsTable()
  const [event] = await query(
    `select event_details.*, coalesce(ev."realViews", 0)::int as "realViews"
     from event_details ${eventViewsJoin}
     where event_details.id = $1`,
    [c.req.param('id')],
  )
  if (!event) return c.json({ success: false, error: 'Event not found' }, 404)
  return c.json({ success: true, data: mapEventRecord(event) })
})

api.post('/events/:id/view', async (c) => {
  await ensureEventViewsTable()
  const body = await c.req.json().catch(() => ({}))
  const viewerKey = String(body.viewerKey || '').trim()
  if (!viewerKey) return c.json({ success: false, error: 'viewerKey obrigatorio' }, 400)

  const [event] = await query('select id from events where id = $1', [c.req.param('id')])
  if (!event) return c.json({ success: false, error: 'Event not found' }, 404)

  await query(
    'insert into event_views (event_id, viewer_key) values ($1, $2) on conflict (event_id, viewer_key) do nothing',
    [event.id, viewerKey.slice(0, 128)],
  )
  const [stats] = await query('select count(*)::int as views from event_views where event_id = $1', [event.id])
  return c.json({ success: true, data: { eventId: event.id, views: Number(stats.views || 0) } })
})

api.get('/events/:id/live-score', async (c) => {
  const [event] = await query('select * from event_details where id = $1', [c.req.param('id')])
  if (!event) return c.json({ success: false, error: 'Event not found' }, 404)

  try {
    const liveScore = await fetchFootballLiveScore(mapRecord(event))
    return c.json({ success: true, data: liveScore })
  } catch (error) {
    return c.json({ success: true, data: getLocalFootballScore(mapRecord(event), error.message) })
  }
})

api.get('/videos', async (c) => {
  const type = c.req.query('type')
  const sport = c.req.query('sport')
  const limit = toNumber(c.req.query('limit'), 20)
  const sort = c.req.query('sort') || 'views'
  const params = []
  const filters = []

  if (type) {
    params.push(type)
    filters.push(`type = $${params.length}`)
  }

  if (sport) {
    params.push(sport)
    filters.push(`sport->>'slug' = $${params.length}`)
  }

  const orderBy = sort === 'likes' ? '"likes" desc' : sort === 'recent' ? '"publishedAt" desc' : '"views" desc'
  const where = filters.length ? `where ${filters.join(' and ')}` : ''
  params.push(limit)
  const videos = await query(`select * from video_details ${where} order by ${orderBy} limit $${params.length}`, params)
  return c.json({ success: true, data: videos.map(mapRecord), total: videos.length })
})

api.get('/videos/:id', async (c) => {
  const [video] = await query('select * from video_details where id = $1', [c.req.param('id')])
  if (!video) return c.json({ success: false, error: 'Video not found' }, 404)
  return c.json({ success: true, data: mapRecord(video) })
})

api.get('/ads/serve', async (c) => {
  const type = c.req.query('type') || 'pre-roll'
  const sport = c.req.query('sport')
  const [ad] = await query('select * from ads where type = $1 order by id limit 1', [type])
  const [fallback] = ad ? [ad] : await query('select * from ads order by id limit 1')

  return c.json({
    success: true,
    ad: {
      ...fallback,
      impressionId: `imp_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      trackingUrl: `/api/ads/track?impressionId=imp_${Date.now()}`,
      sport,
    },
  })
})

api.post('/ads/track', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  await query(
    'insert into ad_events (ad_id, event_type, impression_id, payload) values ($1, $2, $3, $4)',
    [body.adId || null, body.eventType || 'impression', body.impressionId || null, body],
  )
  return c.json({ success: true, message: 'Impression tracked', data: { ...body, timestamp: new Date().toISOString() } })
})

api.post('/ads/click', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  await query(
    'insert into ad_events (ad_id, event_type, impression_id, payload) values ($1, $2, $3, $4)',
    [body.adId || null, 'click', body.impressionId || null, body],
  )
  return c.json({ success: true, message: 'Click tracked', redirectUrl: body.clickUrl || '/', data: { adId: body.adId, timestamp: new Date().toISOString() } })
})

api.get('/users', async (c) => {
  const users = await query('select * from users order by "createdAt"')
  return c.json({ success: true, data: users.map(mapRecord), total: users.length })
})

api.get('/users/:id', async (c) => {
  const [user] = await query('select * from users where id = $1', [c.req.param('id')])
  if (!user) return c.json({ success: false, error: 'User not found' }, 404)
  return c.json({ success: true, data: mapRecord(user) })
})

api.post('/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.email || !body.password) {
    return c.json({ success: false, error: 'Email e senha sao obrigatorios' }, 400)
  }

  if (body.email === adminEmail) {
    if (body.password !== adminPassword) {
      return c.json({ success: false, error: 'Credenciais invalidas' }, 401)
    }

    return c.json({
      success: true,
      token: `sport_admin_${Date.now()}_jwt_token`,
      user: { id: 'admin', name: 'Admin SPORT+', email: adminEmail, role: 'admin', plan: 'premium', followersCount: 0, followingCount: 0, createdAt: '2026-06-06', isVerified: true },
      expiresIn: 86400,
    })
  }

  const [user] = await query('select * from users where email = $1', [body.email])
  if (!user) return c.json({ success: false, error: 'Credenciais invalidas' }, 401)
  if (body.password !== demoUserPassword) return c.json({ success: false, error: 'Credenciais invalidas' }, 401)

  return c.json({ success: true, token: `sport_${Date.now()}_jwt_token`, user: mapRecord(user), expiresIn: 86400 })
})

api.post('/auth/register', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.email || !body.password || !body.name) {
    return c.json({ success: false, error: 'Dados incompletos' }, 400)
  }

  const [existingUser] = await query('select id from users where email = $1', [body.email])
  if (existingUser) {
    return c.json({ success: false, error: 'Email ja cadastrado' }, 409)
  }

  const [user] = await query(
    `insert into users (name, email, role, plan)
     values ($1, $2, 'viewer', 'free')
     returning *`,
    [body.name, body.email],
  )

  return c.json({ success: true, message: 'Conta criada com sucesso!', token: `sport_${Date.now()}_jwt_token`, user: mapRecord(user) }, 201)
})

api.get('/admin/stats', async (c) => {
  const [stats] = await query(`
    select
      (select count(*)::int from users) as "totalUsers",
      (select count(*)::int from events) as "totalEvents",
      (select count(*)::int from events where status = 'live') as "liveEvents",
      (select coalesce(sum(impressions), 0)::int from campaigns) as "totalImpressions",
      (select coalesce(sum(spent), 0)::float from campaigns) as "totalRevenue"
  `)
  const campaigns = await query('select * from campaigns order by "startDate" desc')
  return c.json({ success: true, data: { ...stats, activeUsers: stats.totalUsers, campaigns, systemHealth: { status: 'healthy', uptime: 99.97, latency: 42 } } })
})

api.get('/admin/campaigns', async (c) => {
  const campaigns = await query('select * from campaigns order by "startDate" desc')
  return c.json({ success: true, data: campaigns })
})

api.post('/admin/campaigns', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.advertiser) {
    return c.json({ success: false, error: 'Nome e anunciante sao obrigatorios' }, 400)
  }

  const [campaign] = await query(
    `insert into campaigns (name, advertiser, budget, status, "startDate", "endDate", "targetSports", "targetCountries")
     values ($1, $2, $3, coalesce($4, 'active'), coalesce($5, current_date), coalesce($6, current_date + interval '30 days'), coalesce($7, '[]'::jsonb), coalesce($8, '[]'::jsonb))
     returning *`,
    [body.name, body.advertiser, body.budget || 0, body.status, body.startDate, body.endDate, JSON.stringify(body.targetSports || []), JSON.stringify(body.targetCountries || [])],
  )
  return c.json({ success: true, message: 'Campanha criada com sucesso', data: campaign }, 201)
})

api.get('/analytics/overview', async (c) => {
  const [totals] = await query('select coalesce(sum(views), 0)::int as views, coalesce(sum(spent), 0)::float as revenue from videos cross join campaigns')
  return c.json({
    success: true,
    data: {
      today: { views: 48240, revenue: 2840.5, viewers: 12400, watchTime: 3.2 },
      week: { views: 312000, revenue: 18420, viewers: 48700, watchTime: 3.8 },
      month: { views: totals.views || 1240000, revenue: totals.revenue || 74800, viewers: 187000, watchTime: 4.1 },
      adMetrics: { totalImpressions: 1240000, totalClicks: 24800, totalRevenue: totals.revenue || 74800, ctr: 2.0, rpm: 60.3, fill_rate: 94.2 },
    },
  })
})

api.get('/analytics/creator/:id', async (c) => {
  const videos = await query('select * from video_details order by "views" desc limit 5')
  return c.json({ success: true, data: { creatorId: c.req.param('id'), earnings: { today: 284.05, week: 1842, month: 7480, pending: 8420.5 }, topContent: videos.map(mapRecord) } })
})

api.get('/search', async (c) => {
  const q = `%${(c.req.query('q') || '').toLowerCase()}%`
  const events = await query('select * from event_details where lower(title) like $1 or sport->>$2 like $1', [q, 'slug'])
  const videos = await query('select * from video_details where lower(title) like $1 or sport->>$2 like $1', [q, 'slug'])
  const channels = await query('select * from channel_details where lower(name) like $1 or sport->>$2 like $1', [q, 'slug'])

  return c.json({
    success: true,
    query: c.req.query('q') || '',
    results: {
      events: events.map(mapRecord),
      videos: videos.map(mapRecord),
      channels: channels.map(mapRecord),
      total: events.length + videos.length + channels.length,
    },
  })
})

api.post('/auth/logout', (c) => c.json({ success: true, message: 'Logout realizado com sucesso' }))

app.route('/api', api)
app.get('/', (c) => c.json({ service: 'SPORT+ API', docs: '/api/health' }))

const port = Number(process.env.PORT || 4000)
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`SPORT+ API listening on http://localhost:${info.port}`)
})
