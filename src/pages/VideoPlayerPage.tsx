/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { VideoCard } from '../components/cards/VideoCard'
import { highlights } from '../data/mockData'
import { formatNumber, formatDuration, formatTimeAgo } from '../lib/utils'

interface VideoPlayerPageProps {
  videoId: string
}

export function VideoPlayerPage({ videoId }: VideoPlayerPageProps) {
  const video = highlights.find(v => v.id === videoId) || highlights[0]
  const related = highlights.filter(v => v.id !== video.id && v.sport.id === video.sport.id).slice(0, 4)
  const otherVideos = highlights.filter(v => v.id !== video.id && v.sport.id !== video.sport.id).slice(0, 4)

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{video.title} | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#0a0a0a">
        <Navbar currentPage="" />
        <div style="padding-top:64px;min-height:100vh">
          <div style="max-width:1400px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:1fr 360px;gap:28px" class="player-layout">
            
            {/* Main Column */}
            <div>
              {/* Player */}
              <div id="player-wrap" style="position:relative;background:#000;border-radius:12px;overflow:hidden;margin-bottom:20px">
                
                {/* Pre-roll Ad */}
                <div id="preroll" style="position:absolute;inset:0;background:#000;z-index:50;display:flex;flex-direction:column">
                  <div style="position:absolute;top:12px;left:12px;z-index:10;display:flex;align-items:center;gap:8px">
                    <span style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;padding:3px 8px;border-radius:3px">ANÚNCIO</span>
                    <span id="skip-countdown" style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:600">Pular em 5s</span>
                  </div>
                  <video autoplay muted style="width:100%;height:100%;object-fit:cover" id="ad-vid">
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" type="video/mp4" />
                  </video>
                  <div style="position:absolute;bottom:16px;right:16px;display:flex;gap:10px;z-index:10">
                    <a href="#" style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.2);color:white;text-decoration:none;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600">Betano — Aposte Agora</a>
                    <button id="skip-btn" disabled style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.6);padding:8px 14px;border-radius:6px;font-size:12px;cursor:pointer;opacity:0.5">Pular →</button>
                  </div>
                </div>

                {/* Main Video */}
                <video id="main-video" style="width:100%;aspect-ratio:16/9;display:block" poster={video.thumbnail} controls={false}>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>

                {/* Custom Controls */}
                <div id="controls" style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(0deg,rgba(0,0,0,0.95),transparent);padding:20px;display:none" class="vid-controls">
                  {/* Progress */}
                  <div id="progress-bar" style="height:4px;background:rgba(255,255,255,0.2);border-radius:2px;margin-bottom:14px;cursor:pointer;position:relative">
                    <div id="progress" style="height:100%;background:#ef4444;border-radius:2px;width:0%"></div>
                    <div id="progress-handle" style="position:absolute;right:-4px;top:-4px;width:12px;height:12px;background:#ef4444;border-radius:50%;transform:translate(0,0)"></div>
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <div style="display:flex;align-items:center;gap:14px">
                      <button id="play-btn" style="background:none;border:none;color:white;cursor:pointer;padding:0">
                        <svg id="play-ic" width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </button>
                      <span id="time-display" style="color:rgba(255,255,255,0.7);font-size:12px">0:00 / {formatDuration(video.duration)}</span>
                      <input type="range" id="vol" min="0" max="100" value="80" style="width:70px;accent-color:#ef4444" />
                    </div>
                    <div style="display:flex;align-items:center;gap:12px">
                      <select id="speed-sel" style="background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.2);color:white;font-size:11px;padding:3px 6px;border-radius:4px;cursor:pointer">
                        <option value="0.5">0.5x</option>
                        <option value="1" selected>1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                      <select id="quality-sel" style="background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.2);color:white;font-size:11px;padding:3px 6px;border-radius:4px;cursor:pointer">
                        <option>1080p</option>
                        <option>720p</option>
                        <option selected>Auto</option>
                      </select>
                      <button id="full-btn" style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Overlay Ad */}
                <div id="overlay" style="position:absolute;bottom:72px;left:12px;right:12px;background:rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;display:none;align-items:center;gap:10px">
                  <span style="color:rgba(255,255,255,0.3);font-size:10px;border:1px solid rgba(255,255,255,0.15);padding:2px 4px;border-radius:3px">AD</span>
                  <span style="color:white;font-size:12px;flex:1">Red Bull — Energia para seus esportes</span>
                  <a href="#" style="color:#ef4444;font-size:12px;font-weight:600;text-decoration:none">Ver</a>
                  <button onclick="document.getElementById('overlay').style.display='none'" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:14px;padding:0;margin-left:4px">✕</button>
                </div>
              </div>

              {/* Video Info */}
              <div style="margin-bottom:20px">
                <span style={`background:${video.type === 'highlight' ? '#ef4444' : '#8b5cf6'};color:white;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;margin-bottom:10px;display:inline-block`}>
                  {video.type.toUpperCase()}
                </span>
                <h1 style="color:white;font-size:22px;font-weight:800;margin:0 0 12px;line-height:1.3">{video.title}</h1>
                
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
                  <div style="display:flex;align-items:center;gap:16px">
                    <span style="color:rgba(255,255,255,0.5);font-size:14px">👁 {formatNumber(video.views)} views</span>
                    <span style="color:rgba(255,255,255,0.5);font-size:14px">{formatTimeAgo(video.publishedAt)}</span>
                    <span style="color:rgba(255,255,255,0.5);font-size:14px">{video.sport.icon} {video.sport.name}</span>
                  </div>
                  <div style="display:flex;gap:8px">
                    <button style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:white;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px">
                      ❤️ {formatNumber(video.likes)}
                    </button>
                    <button style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:white;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px">
                      🔗 Compartilhar
                    </button>
                    <button style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:white;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px">
                      🔖 Salvar
                    </button>
                  </div>
                </div>

                {/* Channel */}
                <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:10px;margin-bottom:16px">
                  <div style="display:flex;align-items:center;gap:10px">
                    <img src={video.channel.avatar} alt="" style="width:44px;height:44px;border-radius:50%;border:2px solid rgba(239,68,68,0.3)" />
                    <div>
                      <div style="color:white;font-size:14px;font-weight:700">{video.channel.name} {video.channel.isVerified ? '✓' : ''}</div>
                      <div style="color:rgba(255,255,255,0.4);font-size:12px">{formatNumber(video.channel.followersCount)} seguidores</div>
                    </div>
                  </div>
                  <button style="background:linear-gradient(135deg,#ef4444,#dc2626);border:none;color:white;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">+ Seguir</button>
                </div>

                {/* Description */}
                <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px 16px">
                  <p style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;margin:0 0 10px">{video.description}</p>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    {video.tags.map(tag => (
                      <a key={tag} href={`/busca?q=${tag}`} style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);text-decoration:none;padding:3px 10px;border-radius:50px;font-size:12px">#{tag}</a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mid-roll Ad */}
              <div style="background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.1);border-radius:10px;padding:14px 20px;display:flex;align-items:center;gap:12px;justify-content:space-between;margin-bottom:24px">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="color:rgba(255,255,255,0.3);font-size:10px;border:1px solid rgba(255,255,255,0.15);padding:2px 5px;border-radius:3px">PATROCINADO</span>
                  <span style="color:white;font-size:13px">🏋️ Under Armour — Equipamentos Esportivos Premium 2024</span>
                </div>
                <a href="#" style="color:#ef4444;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap">Comprar →</a>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h3 style="color:white;font-size:16px;font-weight:700;margin:0 0 16px">Próximos Vídeos</h3>
              <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
                {[...related, ...otherVideos].slice(0, 6).map(v => (
                  <a key={v.id} href={`/video/${v.id}`} style="text-decoration:none;display:flex;gap:10px" class="related-video">
                    <div style="position:relative;width:140px;height:80px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#1a1a1a">
                      <img src={v.thumbnail} alt={v.title} style="width:100%;height:100%;object-fit:cover" />
                      <div style="position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,0.85);color:white;font-size:10px;font-weight:700;padding:2px 5px;border-radius:3px">{formatDuration(v.duration)}</div>
                    </div>
                    <div style="flex:1;min-width:0">
                      <div style="color:white;font-size:13px;font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:4px">{v.title}</div>
                      <div style="color:rgba(255,255,255,0.4);font-size:11px;margin-bottom:3px">{v.channel.name}</div>
                      <div style="color:rgba(255,255,255,0.3);font-size:11px">{formatNumber(v.views)} views</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Sidebar Ad */}
              <div style="background:linear-gradient(135deg,#111,#1a1a2e);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:20px;text-align:center">
                <div style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;letter-spacing:1px;margin-bottom:12px">PUBLICIDADE</div>
                <div style="font-size:40px;margin-bottom:10px">🏆</div>
                <div style="color:white;font-size:15px;font-weight:700;margin-bottom:6px">sportplus PRO</div>
                <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-bottom:16px">Sem anúncios + 4K + Conteúdo Exclusivo</div>
                <a href="/cadastro" style="display:block;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:10px;border-radius:8px;font-size:13px;font-weight:700">7 Dias Grátis</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          let skipCount = 5;
          let skipTimer = setInterval(() => {
            skipCount--;
            const el = document.getElementById('skip-countdown');
            const btn = document.getElementById('skip-btn');
            if(el) el.textContent = skipCount > 0 ? 'Pular em ' + skipCount + 's' : 'Pular anúncio';
            if(btn && skipCount <= 0) { btn.disabled = false; btn.style.opacity = '1'; }
            if(skipCount <= 0) clearInterval(skipTimer);
          }, 1000);

          document.getElementById('skip-btn')?.addEventListener('click', () => {
            document.getElementById('preroll').style.display = 'none';
            const vid = document.getElementById('main-video');
            vid?.play();
            document.getElementById('controls').style.display = 'block';
            setTimeout(() => {
              document.getElementById('overlay').style.display = 'flex';
            }, 20000);
          });

          const wrap = document.getElementById('player-wrap');
          wrap?.addEventListener('mouseenter', () => document.getElementById('controls').style.display = 'block');
          wrap?.addEventListener('mouseleave', () => { const v = document.getElementById('main-video'); if(!v?.paused) document.getElementById('controls').style.display = 'none'; });

          const vid = document.getElementById('main-video');
          vid?.addEventListener('timeupdate', () => {
            const pct = (vid.currentTime / vid.duration * 100) || 0;
            const p = document.getElementById('progress');
            if(p) p.style.width = pct + '%';
            const ts = document.getElementById('time-display');
            const fmtTime = t => { const m = Math.floor(t/60); const s = Math.floor(t%60); return m + ':' + String(s).padStart(2,'0'); };
            if(ts) ts.textContent = fmtTime(vid.currentTime) + ' / ' + fmtTime(vid.duration || 0);
          });

          document.getElementById('play-btn')?.addEventListener('click', () => {
            const v = document.getElementById('main-video');
            const ic = document.getElementById('play-ic');
            if(v?.paused) { v.play(); ic.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'; }
            else { v?.pause(); ic.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>'; }
          });

          document.getElementById('full-btn')?.addEventListener('click', () => {
            if(!document.fullscreenElement) wrap?.requestFullscreen();
            else document.exitFullscreen();
          });
          document.getElementById('speed-sel')?.addEventListener('change', (e) => { if(vid) vid.playbackRate = parseFloat(e.target.value); });
          document.getElementById('vol')?.addEventListener('input', (e) => { if(vid) vid.volume = e.target.value / 100; });

          document.querySelectorAll('.related-video').forEach(el => {
            el.addEventListener('mouseenter', () => el.style.opacity = '0.8');
            el.addEventListener('mouseleave', () => el.style.opacity = '1');
          });
        `}} />
      </body>
    </html>
  )
}
