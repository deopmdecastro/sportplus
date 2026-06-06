/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { VideoCard } from '../components/cards/VideoCard'
import { highlights, sports } from '../data/mockData'
import { formatNumber } from '../lib/utils'

export function HighlightsPage() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Highlights | SPORT+</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body>
        <Navbar currentPage="highlights" />
        <div style="padding-top:64px;min-height:100vh;background:#0f0f0f">
          
          {/* Hero */}
          <div style="background:linear-gradient(135deg,#0f0f0f,#1a0505,#0f0f0f);padding:48px 24px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06)">
            <h1 style="color:white;font-size:40px;font-weight:900;margin:0 0 10px">⚡ Highlights</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:16px;margin:0 0 28px">Os melhores momentos do esporte mundial</p>
            
            {/* Filter Tabs */}
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">
              {['Todos', ...sports.slice(0, 7).map(s => `${s.icon} ${s.name}`)].map((tab, i) => (
                <button key={tab} class={`tab-btn ${i === 0 ? 'active' : ''}`} style={`padding:8px 18px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;${i === 0 ? 'background:#ef4444;border:none;color:white;' : 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style="max-width:1400px;margin:0 auto;padding:40px 24px">
            
            {/* Featured Video */}
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:40px;aspect-ratio:21/9;background:#111;min-height:300px">
              <img src={highlights[2].thumbnail} alt={highlights[2].title} style="width:100%;height:100%;object-fit:cover;filter:brightness(0.5)" />
              <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.9) 0%,transparent 70%)"></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 48px">
                <div style="max-width:500px">
                  <span style="background:#ef4444;color:white;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;margin-bottom:14px;display:inline-block">EM DESTAQUE</span>
                  <h2 style="color:white;font-size:32px;font-weight:900;margin:0 0 10px;line-height:1.2">{highlights[2].title}</h2>
                  <p style="color:rgba(255,255,255,0.6);font-size:15px;margin:0 0 20px">{highlights[2].description}</p>
                  <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                    <span style="color:rgba(255,255,255,0.5);font-size:14px">👁 {formatNumber(highlights[2].views)}</span>
                    <span style="color:rgba(255,255,255,0.5);font-size:14px">❤️ {formatNumber(highlights[2].likes)}</span>
                  </div>
                  <a href={`/video/${highlights[2].id}`} style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Assistir Agora
                  </a>
                </div>
              </div>
            </div>

            {/* Ad */}
            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:40px">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="color:rgba(255,255,255,0.25);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.15);padding:2px 5px;border-radius:3px">AD</span>
                <span style="color:rgba(255,255,255,0.6);font-size:14px">🔥 Nike — Coleção Esportes 2024. Até 40% OFF em equipamentos esportivos.</span>
              </div>
              <a href="#" style="color:#ef4444;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap">Ver Oferta →</a>
            </div>

            {/* Sort Controls */}
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
              <div style="display:flex;gap:8px">
                {['Mais Populares', 'Mais Recentes', 'Mais Curtos', 'Mais Longos'].map((sort, i) => (
                  <button key={sort} class={`sort-btn ${i === 0 ? 'active-sort' : ''}`} style={`padding:7px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;${i === 0 ? 'background:#ef4444;border:none;color:white;' : 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);'}`}>
                    {sort}
                  </button>
                ))}
              </div>
              <span style="color:rgba(255,255,255,0.3);font-size:13px">{formatNumber(1240)} vídeos encontrados</span>
            </div>

            {/* Videos Grid */}
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-bottom:40px">
              {highlights.map(video => <VideoCard key={video.id} video={video} />)}
            </div>

            {/* Load More */}
            <div style="text-align:center;padding:20px 0">
              <button style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:white;padding:14px 40px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer" class="load-more-btn">
                Carregar Mais Vídeos
              </button>
            </div>
          </div>
        </div>
        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          document.querySelectorAll('.video-card').forEach(card => {
            const overlay = card.querySelector('.play-overlay');
            card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; card.style.borderColor = 'rgba(239,68,68,0.3)'; if(overlay) overlay.style.opacity = '1'; });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.borderColor = 'rgba(255,255,255,0.06)'; if(overlay) overlay.style.opacity = '0'; });
          });
          document.querySelectorAll('.tab-btn,.sort-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const group = btn.classList.contains('tab-btn') ? '.tab-btn' : '.sort-btn';
              document.querySelectorAll(group).forEach(b => { b.style.background = 'rgba(255,255,255,0.06)'; b.style.borderColor = 'rgba(255,255,255,0.1)'; b.style.color = 'rgba(255,255,255,0.7)'; b.style.border = '1px solid rgba(255,255,255,0.1)'; });
              btn.style.background = '#ef4444'; btn.style.border = 'none'; btn.style.color = 'white';
              window.showToast?.('Lista atualizada.', 'success');
            });
          });
          document.querySelector('.load-more-btn')?.addEventListener('mouseenter', function() { this.style.background = 'rgba(239,68,68,0.1)'; this.style.borderColor = 'rgba(239,68,68,0.3)'; });
          document.querySelector('.load-more-btn')?.addEventListener('mouseleave', function() { this.style.background = 'rgba(255,255,255,0.06)'; this.style.borderColor = 'rgba(255,255,255,0.1)'; });
          document.querySelector('.load-more-btn')?.addEventListener('click', function() { window.showToast?.('Mais highlights carregados.', 'success'); });
        `}} />
      </body>
    </html>
  )
}
