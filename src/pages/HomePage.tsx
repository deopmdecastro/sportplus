/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { EventCard } from '../components/cards/EventCard'
import { VideoCard } from '../components/cards/VideoCard'
import { liveEvents, upcomingEvents, highlights, sports, mockChannels, mockAds } from '../data/mockData'
import { formatNumber } from '../lib/utils'

export function HomePage() {
  const featuredEvent = liveEvents[4] // F1 Monaco

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SPORT+ | Streaming Esportivo Ao Vivo</title>
        <meta name="description" content="Assista transmissões esportivas ao vivo, replays e highlights. A maior plataforma de streaming esportivo do Brasil." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body>
        <Navbar currentPage="home" />

        {/* HERO - Featured Event */}
        <section style="position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden;padding-top:64px">
          {/* Background */}
          <div style="position:absolute;inset:0">
            <img 
              src={featuredEvent.thumbnail}
              alt={featuredEvent.title}
              style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35)"
            />
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.4) 50%,transparent 100%)"></div>
            <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.95) 100%)"></div>
          </div>

          {/* Content */}
          <div style="position:relative;max-width:1400px;margin:0 auto;padding:0 24px 80px;width:100%">
            <div style="max-width:700px">
              {/* Live Badge */}
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
                <span style="display:flex;align-items:center;gap:6px;background:#ef4444;color:white;font-size:13px;font-weight:700;padding:6px 14px;border-radius:6px">
                  <span style="width:8px;height:8px;background:white;border-radius:50%;animation:pulse 1.5s infinite"></span>
                  AO VIVO
                </span>
                <span style="color:rgba(255,255,255,0.7);font-size:14px">{featuredEvent.sport.icon} {featuredEvent.sport.name}</span>
                <span style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.6);font-size:14px">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {formatNumber(featuredEvent.viewers)} assistindo
                </span>
              </div>

              <h1 style="color:white;font-size:clamp(32px,5vw,60px);font-weight:900;line-height:1.1;margin:0 0 16px;letter-spacing:-1px">
                {featuredEvent.title}
              </h1>
              <p style="color:rgba(255,255,255,0.7);font-size:18px;line-height:1.6;margin:0 0 32px">
                {featuredEvent.description}
              </p>

              {/* Buttons */}
              <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
                <a href={`/evento/${featuredEvent.id}`} style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:16px 32px;border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.3px">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Assistir Agora
                </a>
                <a href="/explorar" style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:white;text-decoration:none;padding:16px 32px;border-radius:10px;font-size:16px;font-weight:600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  Explorar
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(90deg,rgba(239,68,68,0.15),rgba(0,0,0,0.4));border-top:1px solid rgba(255,255,255,0.08)">
            <div style="max-width:1400px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;gap:40px;overflow-x:auto">
              {[
                { label: 'Eventos Ao Vivo', value: '12', icon: '🔴' },
                { label: 'Espectadores', value: '1.2M', icon: '👁' },
                { label: 'Esportes', value: '25+', icon: '🏆' },
                { label: 'Criadores', value: '8.4K', icon: '📡' },
              ].map(stat => (
                <div key={stat.label} style="display:flex;align-items:center;gap:10px;white-space:nowrap">
                  <span style="font-size:20px">{stat.icon}</span>
                  <div>
                    <div style="color:white;font-size:20px;font-weight:800">{stat.value}</div>
                    <div style="color:rgba(255,255,255,0.5);font-size:12px">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AD BANNER */}
        <div style="background:linear-gradient(90deg,#0f0f0f,#1a0505,#0f0f0f);border-top:1px solid rgba(239,68,68,0.1);border-bottom:1px solid rgba(239,68,68,0.1)">
          <div style="max-width:1400px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">PATROCINADO</span>
              <span style="color:white;font-size:14px;font-weight:600">🏆 Betano — Aposte nos seus esportes favoritos com os melhores odds do mercado!</span>
            </div>
            <a href="#" style="padding:8px 16px;background:#ef4444;color:white;text-decoration:none;border-radius:6px;font-size:12px;font-weight:700;white-space:nowrap">Apostar Agora</a>
          </div>
        </div>

        {/* Sports Categories */}
        <section style="padding:40px 0 20px;background:#0f0f0f">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
              <h2 style="color:white;font-size:22px;font-weight:800;margin:0">
                🏆 Esportes em Destaque
              </h2>
              <a href="/esportes" style="color:#ef4444;text-decoration:none;font-size:14px;font-weight:600">Ver todos →</a>
            </div>
            <div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:8px" class="sports-scroll">
              {sports.slice(0, 8).map(sport => (
                <a key={sport.id} href={`/esportes/${sport.slug}`} style="text-decoration:none;flex-shrink:0">
                  <div class="sport-pill" style={`display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:50px;padding:8px 18px;transition:all 0.2s;cursor:pointer;white-space:nowrap`}>
                    <span style="font-size:20px">{sport.icon}</span>
                    <span style="color:white;font-size:14px;font-weight:600">{sport.name}</span>
                    {sport.liveCount > 0 && (
                      <span style="background:#ef4444;color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:50px">
                        {sport.liveCount} ao vivo
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Live Events */}
        <section style="padding:44px 0;background:#0f0f0f;border-top:1px solid rgba(255,255,255,0.04)">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="width:10px;height:10px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite"></span>
                <h2 style="color:white;font-size:22px;font-weight:800;margin:0">Ao Vivo Agora</h2>
                <span id="live-events-count" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:12px;font-weight:700;padding:3px 10px;border-radius:50px">
                  {liveEvents.length} eventos
                </span>
              </div>
              <a href="/ao-vivo" style="color:#ef4444;text-decoration:none;font-size:14px;font-weight:600">Ver todos →</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px">
              {liveEvents.slice(0, 6).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* DISPLAY AD */}
        <div style="background:#0a0a0a;padding:24px 0">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px;display:flex;gap:20px;justify-content:center;flex-wrap:wrap">
            <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:20px 32px;display:flex;align-items:center;gap:20px;flex:1;max-width:600px">
              <span style="font-size:40px">🎮</span>
              <div>
                <div style="color:rgba(255,255,255,0.4);font-size:10px;font-weight:600;letter-spacing:1px;margin-bottom:4px">PATROCINADO</div>
                <div style="color:white;font-size:16px;font-weight:700;margin-bottom:4px">CS2 Major — Aposte no seu time!</div>
                <div style="color:rgba(255,255,255,0.5);font-size:13px">Melhores odds de e-sports no Brasil</div>
              </div>
              <a href="#" style="padding:10px 20px;background:#8b5cf6;color:white;text-decoration:none;border-radius:6px;font-size:13px;font-weight:700;white-space:nowrap">Apostar</a>
            </div>
            <div style="background:linear-gradient(135deg,#0d1117,#1a2a1a);border:1px solid rgba(34,197,94,0.2);border-radius:10px;padding:20px 32px;display:flex;align-items:center;gap:20px;flex:1;max-width:600px">
              <span style="font-size:40px">⚽</span>
              <div>
                <div style="color:rgba(255,255,255,0.4);font-size:10px;font-weight:600;letter-spacing:1px;margin-bottom:4px">PATROCINADO</div>
                <div style="color:white;font-size:16px;font-weight:700;margin-bottom:4px">Brasileirão 2024 — Transmissão Completa</div>
                <div style="color:rgba(255,255,255,0.5);font-size:13px">Todos os jogos com transmissão exclusiva</div>
              </div>
              <a href="#" style="padding:10px 20px;background:#22c55e;color:white;text-decoration:none;border-radius:6px;font-size:13px;font-weight:700;white-space:nowrap">Assinar</a>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <section style="padding:40px 0;background:#0f0f0f">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
              <h2 style="color:white;font-size:22px;font-weight:800;margin:0">⚡ Highlights em Alta</h2>
              <a href="/highlights" style="color:#ef4444;text-decoration:none;font-size:14px;font-weight:600">Ver todos →</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
              {highlights.slice(0, 6).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section style="padding:40px 0;background:#0a0a0a">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
              <h2 style="color:white;font-size:22px;font-weight:800;margin:0">⏰ Em Breve</h2>
              <a href="/agenda" style="color:#ef4444;text-decoration:none;font-size:14px;font-weight:600">Ver agenda →</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Channels */}
        <section style="padding:40px 0;background:#0f0f0f">
          <div style="max-width:1400px;margin:0 auto;padding:0 24px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
              <h2 style="color:white;font-size:22px;font-weight:800;margin:0">📡 Canais em Destaque</h2>
              <a href="/canais" style="color:#ef4444;text-decoration:none;font-size:14px;font-weight:600">Ver todos →</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
              {mockChannels.map(channel => (
                <a key={channel.id} href={`/canal/${channel.slug}`} style="text-decoration:none">
                  <div class="channel-card" style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;text-align:center;transition:all 0.2s;cursor:pointer">
                    <div style="position:relative;display:inline-block;margin-bottom:12px">
                      <img src={channel.avatar} alt={channel.name} style="width:64px;height:64px;border-radius:50%;border:3px solid rgba(239,68,68,0.3)" />
                      {channel.isLive && (
                        <span style="position:absolute;bottom:2px;right:2px;width:14px;height:14px;background:#ef4444;border-radius:50%;border:2px solid #111"></span>
                      )}
                    </div>
                    <div style="color:white;font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:4px">
                      {channel.name}
                      {channel.isVerified && <span style="color:#3b82f6;font-size:12px">✓</span>}
                    </div>
                    <div style="color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:8px">{formatNumber(channel.followersCount)} seguidores</div>
                    {channel.isLive && (
                      <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:11px;font-weight:700;padding:3px 10px;border-radius:50px">
                        <span style="width:5px;height:5px;background:#ef4444;border-radius:50%"></span>
                        AO VIVO
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Premium Plan */}
        <section style="padding:80px 24px;background:linear-gradient(135deg,#0f0f0f 0%,#1a0505 50%,#0f0f0f 100%);text-align:center">
          <div style="max-width:700px;margin:0 auto">
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:50px;padding:6px 16px;margin-bottom:24px">
              <span style="color:#ef4444;font-size:13px;font-weight:700">🏆 SPORT+ PRO</span>
            </div>
            <h2 style="color:white;font-size:48px;font-weight:900;margin:0 0 16px;letter-spacing:-1px">
              Eleve sua experiência esportiva
            </h2>
            <p style="color:rgba(255,255,255,0.6);font-size:18px;line-height:1.6;margin:0 0 40px">
              Sem anúncios, qualidade 4K, transmissões exclusivas e muito mais por apenas R$29,90/mês.
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap">
              <a href="/cadastro" style="padding:16px 40px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;border-radius:10px;font-size:16px;font-weight:700">
                Começar Grátis por 7 dias
              </a>
              <a href="#planos" style="padding:16px 40px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:white;text-decoration:none;border-radius:10px;font-size:16px;font-weight:600">
                Ver Planos
              </a>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:32px;margin-top:32px;flex-wrap:wrap">
              {['Sem compromisso', 'Cancele quando quiser', 'Suporte 24/7'].map(item => (
                <div key={item} style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.5);font-size:14px">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          // Add hover effects
          document.querySelectorAll('.event-card, .video-card, .channel-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
              card.style.transform = 'translateY(-4px)';
              card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              card.style.borderColor = 'rgba(239,68,68,0.3)';
            });
            card.addEventListener('mouseleave', () => {
              card.style.transform = '';
              card.style.boxShadow = '';
              card.style.borderColor = 'rgba(255,255,255,0.06)';
            });
          });
          
          document.querySelectorAll('.video-card').forEach(card => {
            const overlay = card.querySelector('.play-overlay');
            card.addEventListener('mouseenter', () => { if(overlay) overlay.style.opacity = '1'; });
            card.addEventListener('mouseleave', () => { if(overlay) overlay.style.opacity = '0'; });
          });
          
          document.querySelectorAll('.sport-pill').forEach(pill => {
            pill.addEventListener('mouseenter', () => {
              pill.style.background = 'rgba(239,68,68,0.15)';
              pill.style.borderColor = 'rgba(239,68,68,0.4)';
            });
            pill.addEventListener('mouseleave', () => {
              pill.style.background = 'rgba(255,255,255,0.06)';
              pill.style.borderColor = 'rgba(255,255,255,0.1)';
            });
          });
          
          document.querySelectorAll('.card-img').forEach(img => {
            const card = img.closest('.event-card, .video-card');
            if(card) {
              card.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05)'; });
              card.addEventListener('mouseleave', () => { img.style.transform = ''; });
            }
          });

          const apiBaseUrl = window.SPORTPLUS_API_BASE || 'http://localhost:4000/api';

          function formatCompact(value) {
            const number = Number(value || 0);
            if (number >= 1000000) return (number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace('.0', '') + 'M';
            if (number >= 1000) return (number / 1000).toFixed(number >= 10000 ? 0 : 1).replace('.0', '') + 'K';
            return String(number);
          }

          function updateLiveEventViews(events) {
            const count = document.getElementById('live-events-count');
            if (count) count.textContent = events.length + ' eventos';
            events.forEach((event) => {
              document.querySelectorAll('[data-event-views="' + event.id + '"]').forEach((el) => {
                el.textContent = formatCompact(event.views || 0);
              });
              document.querySelectorAll('[data-event-views-label="' + event.id + '"]').forEach((el) => {
                el.textContent = '👁 ' + formatCompact(event.views || 0);
              });
            });
          }

          async function refreshLiveViews() {
            try {
              const response = await fetch(apiBaseUrl + '/events/live');
              const payload = await response.json();
              if (payload?.success) updateLiveEventViews(payload.data || []);
            } catch (_) {}
          }

          refreshLiveViews();
          setInterval(refreshLiveViews, 30000);
        `}} />
      </body>
    </html>
  )
}
