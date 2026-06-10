/** @jsxImportSource hono/jsx */
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { getServerApiBaseUrl, loadEventData, loadHomePageData, loadVideoPageData } from './lib/apiClient'

// Pages
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { HighlightsPage } from './pages/HighlightsPage'
import { LiveEventPage } from './pages/LiveEventPage'
import { VideoPlayerPage } from './pages/VideoPlayerPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { CreatorDashboard } from './pages/creator/CreatorDashboard'
import { AdminDashboard } from './pages/admin/AdminDashboard'

const app = new Hono()
const siteUrl = 'https://sportplus.example'
const publicRoutes = ['/', '/explorar', '/ao-vivo', '/highlights', '/login', '/cadastro', '/criador', '/admin', '/esportes']
const apiProxyBaseUrl = 'http://localhost:4000'

// ==============================
// MIDDLEWARE
// ==============================
app.use('*', logger())
app.use('*', secureHeaders())

// Static files
app.use('/static/*', serveStatic({ root: './public' }))
app.get('/favicon.ico', (c) => c.body(null, 204))
app.get('/robots.txt', (c) => {
  return c.text([
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join('\n'))
})

app.get('/sitemap.xml', (c) => {
  const now = new Date().toISOString()
  const urls = publicRoutes.map((route) => `
  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`).join('')

  c.header('content-type', 'application/xml; charset=utf-8')
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`)
})

// ==============================
// API ROUTES
// ==============================
app.all('/api/*', async (c) => {
  const sourceUrl = new URL(c.req.url)
  const targetUrl = `${apiProxyBaseUrl}${sourceUrl.pathname}${sourceUrl.search}`
  const headers = new Headers(c.req.raw.headers)
  headers.delete('host')

  try {
    const method = c.req.method
    const body = method === 'GET' || method === 'HEAD' ? undefined : await c.req.arrayBuffer()
    const response = await fetch(targetUrl, { method, headers, body })
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  } catch (error) {
    return c.json({ success: false, message: 'API indisponivel', error: String(error) }, 502)
  }
})

// ==============================
// PUBLIC PAGES
// ==============================

// Home
app.get('/', async (c) => {
  const data = await loadHomePageData(getServerApiBaseUrl(c.env))
  return c.html(<HomePage data={data} />)
})

// Explore
app.get('/explorar', (c) => {
  return c.html(<ExplorePage />)
})

// Highlights
app.get('/highlights', (c) => {
  return c.html(<HighlightsPage />)
})

// Live Events list
app.get('/ao-vivo', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ao Vivo | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#0f0f0f;padding-top:64px">
        <div style="max-width:1400px;margin:0 auto;padding:40px 24px;text-align:center">
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:16px">
            <span style="width:10px;height:10px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite"></span>
            <h1 style="color:white;font-size:32px;font-weight:900">Eventos Ao Vivo</h1>
          </div>
          <p style="color:rgba(255,255,255,0.5);margin-bottom:40px">Escolha um evento para assistir</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;text-align:left">
            {['1','2','3','4','5'].map(id => (
              <a key={id} href={`/evento/${id}`} style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;text-decoration:none;color:white;transition:all 0.2s;display:block" class="event-card">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
                  <span style="width:8px;height:8px;background:#ef4444;border-radius:50%"></span>
                  <span style="color:#ef4444;font-size:12px;font-weight:700">AO VIVO</span>
                </div>
                <div style="color:white;font-size:15px;font-weight:600">Evento Esportivo #{id}</div>
                <div style="color:rgba(255,255,255,0.4);font-size:13px;margin-top:6px">Clique para assistir</div>
              </a>
            ))}
          </div>
        </div>
      </body>
    </html>
  )
})

// Single Event Page
app.get('/evento/:id', async (c) => {
  const eventId = c.req.param('id')
  const event = await loadEventData(getServerApiBaseUrl(c.env), eventId)
  return c.html(<LiveEventPage eventId={eventId} event={event} />)
})

// Video Player Page
app.get('/video/:id', async (c) => {
  const videoId = c.req.param('id')
  const data = await loadVideoPageData(getServerApiBaseUrl(c.env), videoId)
  return c.html(<VideoPlayerPage videoId={videoId} data={data} />)
})

// ==============================
// AUTH PAGES
// ==============================

app.get('/login', (c) => {
  return c.html(<LoginPage />)
})

app.get('/cadastro', (c) => {
  return c.html(<RegisterPage />)
})

app.get('/perfil', (c) => {
  return c.html(<ProfilePage />)
})

// ==============================
// CREATOR PAGES
// ==============================

app.get('/criador', (c) => {
  return c.html(<CreatorDashboard />)
})

app.get('/criador/transmissoes', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Transmissões | sportplus Creator</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh;display:flex;align-items:center;justify-content:center">
        <div style="text-align:center">
          <div style="font-size:64px;margin-bottom:16px">🎥</div>
          <h1 style="color:white;margin-bottom:8px">Transmissões</h1>
          <p style="color:rgba(255,255,255,0.5)">Gerencie suas transmissões ao vivo</p>
          <a href="/criador" style="display:inline-block;margin-top:20px;background:#ef4444;color:white;text-decoration:none;padding:10px 24px;border-radius:8px;font-weight:600">← Dashboard</a>
        </div>
      </body>
    </html>
  )
})

// ==============================
// ADMIN PAGES
// ==============================

app.get('/admin', (c) => {
  return c.html(<AdminDashboard />)
})

// ==============================
// SPORTS PAGES
// ==============================

app.get('/esportes', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Esportes | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#0f0f0f;padding-top:80px">
        <div style="max-width:1400px;margin:0 auto;padding:40px 24px">
          <h1 style="color:white;font-size:32px;font-weight:900;margin-bottom:8px">🏆 Todos os Esportes</h1>
          <p style="color:rgba(255,255,255,0.5);margin-bottom:32px">Explore todos os esportes disponíveis na plataforma</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
            {[
              { n:'Futebol', e:'⚽', c:'#22c55e' },{ n:'Basquete', e:'🏀', c:'#f97316' },
              { n:'UFC/MMA', e:'🥊', c:'#ef4444' },{ n:'Tênis', e:'🎾', c:'#eab308' },
              { n:'F1', e:'🏎️', c:'#e11d48' },{ n:'Vôlei', e:'🏐', c:'#3b82f6' },
              { n:'Natação', e:'🏊', c:'#06b6d4' },{ n:'E-Sports', e:'🎮', c:'#8b5cf6' },
              { n:'Atletismo', e:'🏃', c:'#d97706' },{ n:'Ciclismo', e:'🚴', c:'#10b981' },
            ].map(s => (
              <a key={s.n} href={`/esportes/${s.n.toLowerCase()}`} style={`text-decoration:none;background:#111;border:2px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;text-align:center;display:block;transition:all 0.2s`} class="sport-card">
                <div style="font-size:48px;margin-bottom:12px">{s.e}</div>
                <div style="color:white;font-size:15px;font-weight:700">{s.n}</div>
              </a>
            ))}
          </div>
        </div>
      </body>
    </html>
  )
})

// ==============================
// 404 PAGE
// ==============================

app.notFound((c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>404 | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center">
        <div>
          <div style="font-size:80px;margin-bottom:16px">🏟️</div>
          <h1 style="color:white;font-size:48px;font-weight:900;margin-bottom:8px">404</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:18px;margin-bottom:32px">Esta página saiu de campo!</p>
          <a href="/" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:16px;font-weight:700">Voltar ao Início</a>
        </div>
      </body>
    </html>,
    404
  )
})

export default app
