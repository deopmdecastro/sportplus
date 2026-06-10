/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { EventCard } from '../components/cards/EventCard'
import { VideoCard } from '../components/cards/VideoCard'
import { liveEvents, highlights, sports } from '../data/mockData'

export function ExplorePage() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Explorar | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body>
        <Navbar currentPage="explorar" />
        <div style="padding-top:64px;min-height:100vh;background:#0f0f0f">

          {/* Header */}
          <div style="background:linear-gradient(135deg,#0f0f0f,#1a0505,#0f0f0f);padding:48px 24px 32px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div style="max-width:1400px;margin:0 auto">
              <h1 style="color:white;font-size:36px;font-weight:900;margin:0 0 8px">Explorar Esportes</h1>
              <p style="color:rgba(255,255,255,0.5);font-size:16px;margin:0 0 32px">Descubra transmissões ao vivo, highlights e eventos</p>
              
              {/* Search Bar */}
              <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 20px;max-width:600px">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="Buscar esportes, eventos, criadores..." style="background:none;border:none;outline:none;color:white;font-size:16px;flex:1" />
                <button style="background:#ef4444;border:none;color:white;padding:8px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600">Buscar</button>
              </div>
            </div>
          </div>

          {/* Ad Banner */}
          <div style="background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.05);padding:12px 24px">
            <div style="max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">AD</span>
                <span style="color:white;font-size:14px;font-weight:500">Final de handebol ao vivo agora — <strong>Arena Handebol</strong> transmitindo!</span>
              </div>
              <a href="/ao-vivo" style="color:#ef4444;font-size:13px;font-weight:700;text-decoration:none">Assistir →</a>
            </div>
          </div>

          <div style="max-width:1400px;margin:0 auto;padding:40px 24px">
            
            {/* Sports Grid */}
            <div style="margin-bottom:48px">
              <h2 style="color:white;font-size:22px;font-weight:800;margin:0 0 24px">🏆 Todos os Esportes</h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px">
                {sports.map(sport => (
                  <a key={sport.id} href={`/esportes/${sport.slug}`} style="text-decoration:none">
                    <div class="sport-card" style={`background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px 16px;text-align:center;transition:all 0.2s;cursor:pointer;position:relative;overflow:hidden`}>
                      <div style={`position:absolute;inset:0;background:linear-gradient(135deg,${sport.color}10,transparent);opacity:0`} class="sport-gradient"></div>
                      <div style="font-size:36px;margin-bottom:10px">{sport.icon}</div>
                      <div style="color:white;font-size:14px;font-weight:700;margin-bottom:6px">{sport.name}</div>
                      {sport.liveCount > 0 && (
                        <div style="display:flex;align-items:center;justify-content:center;gap:4px">
                          <span style="width:6px;height:6px;background:#ef4444;border-radius:50%"></span>
                          <span style="color:#ef4444;font-size:11px;font-weight:600">{sport.liveCount} ao vivo</span>
                        </div>
                      )}
                      <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:4px">{sport.totalEvents} eventos</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Filter Bar */}
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;overflow-x:auto;padding-bottom:4px">
              {['Todos', 'Ao Vivo', 'Highlights', 'Replays', 'Em Breve', 'Gratuito', 'Premium'].map((filter, i) => (
                <button key={filter} class={`filter-btn ${i === 0 ? 'active' : ''}`} style={`padding:8px 18px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s;${i === 0 ? 'background:#ef4444;border:none;color:white;' : 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);'}`}>
                  {filter}
                </button>
              ))}
              <div style="margin-left:auto;display:flex;gap:8px">
                <select style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:white;padding:8px 12px;border-radius:8px;font-size:13px;cursor:pointer">
                  <option>Mais Populares</option>
                  <option>Mais Recentes</option>
                  <option>Mais Visualizados</option>
                </select>
              </div>
            </div>

            {/* Live Events Grid */}
            <div style="margin-bottom:48px">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
                <span style="width:8px;height:8px;background:#ef4444;border-radius:50%"></span>
                <h2 style="color:white;font-size:20px;font-weight:800;margin:0">Ao Vivo Agora</h2>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
                {liveEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </div>

            {/* Display Ad */}
            <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:24px;display:flex;align-items:center;gap:24px;margin-bottom:48px;flex-wrap:wrap">
              <div style="font-size:48px">🏆</div>
              <div style="flex:1">
                <div style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;letter-spacing:1px;margin-bottom:6px">PUBLICIDADE</div>
                <div style="color:white;font-size:20px;font-weight:800;margin-bottom:6px">sportplus PRO — Sem Anúncios + 4K Ultra HD</div>
                <div style="color:rgba(255,255,255,0.5);font-size:14px">Experimente 7 dias grátis. Cancele quando quiser.</div>
              </div>
              <a href="/cadastro" style="padding:12px 28px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;border-radius:8px;font-weight:700;white-space:nowrap">Começar Grátis</a>
            </div>

            {/* Highlights Grid */}
            <div>
              <h2 style="color:white;font-size:20px;font-weight:800;margin:0 0 20px">⚡ Highlights em Alta</h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
                {highlights.map(video => <VideoCard key={video.id} video={video} />)}
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          document.querySelectorAll('.event-card, .video-card').forEach(card => {
            card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; card.style.borderColor = 'rgba(239,68,68,0.3)'; });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.borderColor = 'rgba(255,255,255,0.06)'; });
          });
          document.querySelectorAll('.video-card').forEach(card => {
            const overlay = card.querySelector('.play-overlay');
            card.addEventListener('mouseenter', () => { if(overlay) overlay.style.opacity = '1'; });
            card.addEventListener('mouseleave', () => { if(overlay) overlay.style.opacity = '0'; });
          });
          document.querySelectorAll('.sport-card').forEach(card => {
            card.addEventListener('mouseenter', () => { card.style.borderColor = 'rgba(239,68,68,0.3)'; card.style.transform = 'translateY(-2px)'; });
            card.addEventListener('mouseleave', () => { card.style.borderColor = 'rgba(255,255,255,0.06)'; card.style.transform = ''; });
          });
          document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.filter-btn').forEach(b => { b.style.background = 'rgba(255,255,255,0.06)'; b.style.borderColor = 'rgba(255,255,255,0.1)'; b.style.color = 'rgba(255,255,255,0.7)'; b.style.border = '1px solid rgba(255,255,255,0.1)'; });
              btn.style.background = '#ef4444'; btn.style.border = 'none'; btn.style.color = 'white';
              window.showToast?.('Filtro aplicado.', 'success');
            });
          });
        `}} />
      </body>
    </html>
  )
}
