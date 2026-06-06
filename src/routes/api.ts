import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { liveEvents, upcomingEvents, highlights, sports, mockChannels, mockUsers, mockCampaigns, analyticsData, mockAds } from '../data/mockData'

export const apiRouter = new Hono()

// Enable CORS for all API routes
apiRouter.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// ==============================
// EVENTS API
// ==============================

apiRouter.get('/events', (c) => {
  const status = c.req.query('status')
  const sportSlug = c.req.query('sport')
  const limit = parseInt(c.req.query('limit') || '20')
  const page = parseInt(c.req.query('page') || '1')

  let events = [...liveEvents, ...upcomingEvents]

  if (status) events = events.filter(e => e.status === status)
  if (sportSlug) events = events.filter(e => e.sport.slug === sportSlug)

  const start = (page - 1) * limit
  const paginated = events.slice(start, start + limit)

  return c.json({
    success: true,
    data: paginated,
    pagination: { page, limit, total: events.length, pages: Math.ceil(events.length / limit) }
  })
})

apiRouter.get('/events/live', (c) => {
  return c.json({ success: true, data: liveEvents, count: liveEvents.length })
})

apiRouter.get('/events/upcoming', (c) => {
  return c.json({ success: true, data: upcomingEvents, count: upcomingEvents.length })
})

apiRouter.get('/events/:id', (c) => {
  const id = c.req.param('id')
  const event = [...liveEvents, ...upcomingEvents].find(e => e.id === id)
  if (!event) return c.json({ success: false, error: 'Event not found' }, 404)
  return c.json({ success: true, data: event })
})

// ==============================
// VIDEOS / HIGHLIGHTS API
// ==============================

apiRouter.get('/videos', (c) => {
  const type = c.req.query('type')
  const sport = c.req.query('sport')
  const limit = parseInt(c.req.query('limit') || '20')
  const sort = c.req.query('sort') || 'views'

  let vids = [...highlights]

  if (type) vids = vids.filter(v => v.type === type)
  if (sport) vids = vids.filter(v => v.sport.slug === sport)

  if (sort === 'views') vids.sort((a, b) => b.views - a.views)
  else if (sort === 'likes') vids.sort((a, b) => b.likes - a.likes)
  else if (sort === 'recent') vids.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return c.json({ success: true, data: vids.slice(0, limit), total: vids.length })
})

apiRouter.get('/videos/:id', (c) => {
  const video = highlights.find(v => v.id === c.req.param('id'))
  if (!video) return c.json({ success: false, error: 'Video not found' }, 404)
  return c.json({ success: true, data: video })
})

// ==============================
// SPORTS API
// ==============================

apiRouter.get('/sports', (c) => {
  return c.json({ success: true, data: sports })
})

apiRouter.get('/sports/:slug', (c) => {
  const sport = sports.find(s => s.slug === c.req.param('slug'))
  if (!sport) return c.json({ success: false, error: 'Sport not found' }, 404)
  const sportEvents = liveEvents.filter(e => e.sport.slug === c.req.param('slug'))
  return c.json({ success: true, data: { ...sport, events: sportEvents } })
})

// ==============================
// CHANNELS API
// ==============================

apiRouter.get('/channels', (c) => {
  const live = c.req.query('live')
  let channels = [...mockChannels]
  if (live === 'true') channels = channels.filter(ch => ch.isLive)
  return c.json({ success: true, data: channels })
})

apiRouter.get('/channels/:slug', (c) => {
  const channel = mockChannels.find(ch => ch.slug === c.req.param('slug'))
  if (!channel) return c.json({ success: false, error: 'Channel not found' }, 404)
  return c.json({ success: true, data: channel })
})

// ==============================
// ADS API (Ad Serving)
// ==============================

apiRouter.get('/ads/serve', (c) => {
  const type = c.req.query('type') || 'pre-roll'
  const sport = c.req.query('sport')
  const position = c.req.query('position') || 'pre'

  // Simulate ad serving logic
  const ad = mockAds.find(a => a.type === type) || mockAds[0]

  return c.json({
    success: true,
    ad: {
      ...ad,
      impressionId: `imp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      trackingUrl: `/api/ads/track?impressionId=imp_${Date.now()}`,
      sport: sport,
    }
  })
})

apiRouter.post('/ads/track', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  // In production: save to analytics DB
  return c.json({
    success: true,
    message: 'Impression tracked',
    data: {
      impressionId: body.impressionId,
      eventType: body.eventType || 'impression',
      timestamp: new Date().toISOString()
    }
  })
})

apiRouter.post('/ads/click', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  return c.json({
    success: true,
    message: 'Click tracked',
    redirectUrl: body.clickUrl || '/',
    data: { adId: body.adId, timestamp: new Date().toISOString() }
  })
})

// ==============================
// ANALYTICS API
// ==============================

apiRouter.get('/analytics/overview', (c) => {
  return c.json({
    success: true,
    data: {
      ...analyticsData,
      adMetrics: {
        totalImpressions: 1240000,
        totalClicks: 24800,
        totalRevenue: analyticsData.month.revenue,
        ctr: 2.0,
        rpm: 60.3,
        fill_rate: 94.2,
        adTypes: {
          preRoll: { impressions: 480000, revenue: 32400, ctr: 2.8 },
          midRoll: { impressions: 280000, revenue: 21800, ctr: 1.9 },
          banner: { impressions: 340000, revenue: 12100, ctr: 0.8 },
          overlay: { impressions: 140000, revenue: 8500, ctr: 1.4 },
        }
      }
    }
  })
})

apiRouter.get('/analytics/creator/:id', (c) => {
  return c.json({
    success: true,
    data: {
      creatorId: c.req.param('id'),
      ...analyticsData,
      earnings: { today: 284.05, week: 1842.00, month: 7480.00, pending: 8420.50 },
      topContent: highlights.slice(0, 5),
      audienceByCountry: [
        { country: 'Brasil', pct: 68.4 },
        { country: 'Portugal', pct: 12.1 },
        { country: 'Argentina', pct: 8.7 },
        { country: 'Outros', pct: 10.8 },
      ]
    }
  })
})

// ==============================
// AUTH API
// ==============================

apiRouter.post('/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.email || !body.password) {
    return c.json({ success: false, error: 'Email e senha são obrigatórios' }, 400)
  }
  // Simulate auth
  return c.json({
    success: true,
    token: `sport_${Date.now()}_jwt_token`,
    user: mockUsers[0],
    expiresIn: 86400
  })
})

apiRouter.post('/auth/register', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.email || !body.password || !body.name) {
    return c.json({ success: false, error: 'Dados incompletos' }, 400)
  }
  return c.json({
    success: true,
    message: 'Conta criada com sucesso! Verifique seu email.',
    token: `sport_${Date.now()}_jwt_token`,
    user: { id: `user_${Date.now()}`, name: body.name, email: body.email, role: 'viewer', plan: 'free' }
  })
})

apiRouter.post('/auth/logout', (c) => {
  return c.json({ success: true, message: 'Logout realizado com sucesso' })
})

// ==============================
// USERS API
// ==============================

apiRouter.get('/users/:id', (c) => {
  const user = mockUsers.find(u => u.id === c.req.param('id'))
  if (!user) return c.json({ success: false, error: 'User not found' }, 404)
  return c.json({ success: true, data: user })
})

apiRouter.get('/users', (c) => {
  return c.json({ success: true, data: mockUsers, total: mockUsers.length })
})

// ==============================
// ADMIN API
// ==============================

apiRouter.get('/admin/stats', (c) => {
  return c.json({
    success: true,
    data: {
      totalUsers: 1240000,
      activeUsers: 187000,
      totalEvents: 408,
      liveEvents: liveEvents.length,
      totalRevenue: analyticsData.month.revenue,
      totalImpressions: 1240000,
      campaigns: mockCampaigns,
      systemHealth: { status: 'healthy', uptime: 99.97, latency: 42 }
    }
  })
})

apiRouter.get('/admin/campaigns', (c) => {
  return c.json({ success: true, data: mockCampaigns })
})

apiRouter.post('/admin/campaigns', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  return c.json({
    success: true,
    message: 'Campanha criada com sucesso',
    data: { ...body, id: `camp_${Date.now()}`, status: 'active', spent: 0, impressions: 0, clicks: 0 }
  })
})

// ==============================
// SEARCH API
// ==============================

apiRouter.get('/search', (c) => {
  const q = c.req.query('q')?.toLowerCase() || ''
  const type = c.req.query('type') || 'all'

  const events = liveEvents.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.sport.name.toLowerCase().includes(q) ||
    e.tags.some(t => t.includes(q))
  )

  const videos = highlights.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.sport.name.toLowerCase().includes(q) ||
    v.tags.some(t => t.includes(q))
  )

  const channels = mockChannels.filter(ch =>
    ch.name.toLowerCase().includes(q) ||
    ch.sport.name.toLowerCase().includes(q)
  )

  return c.json({
    success: true,
    query: q,
    results: { events, videos, channels, total: events.length + videos.length + channels.length }
  })
})

// Health check
apiRouter.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'SPORT+ API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: 'cloudflare-edge'
  })
})

export default apiRouter
