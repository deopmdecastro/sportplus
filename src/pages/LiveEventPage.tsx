/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { liveEvents } from '../data/mockData'
import { formatNumber } from '../lib/utils'

interface LiveEventPageProps {
  eventId: string
}

export function LiveEventPage({ eventId }: LiveEventPageProps) {
  const event = liveEvents.find(e => e.id === eventId) || liveEvents[0]

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{event.title} | SPORT+ AO VIVO</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js"></script>
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808">
        <Navbar currentPage="aovivo" />

        <div style="padding-top:64px;display:grid;grid-template-columns:1fr 360px;min-height:100vh;max-width:1600px;margin:0 auto" class="event-layout">

          {/* Main Content */}
          <div style="background:#0a0a0a">
            
            {/* PLAYER SECTION */}
            <div id="player-container" style="position:relative;background:#000;aspect-ratio:16/9;overflow:hidden">
              
              {/* Video Element */}
              <video 
                id="sport-player"
                style="width:100%;height:100%;object-fit:contain"
                poster={event.thumbnail}
                controls={false}
                data-stream-url={event.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              ></video>
              <div id="stream-status" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;color:rgba(255,255,255,0.72);font-size:14px;font-weight:700;background:rgba(0,0,0,0.22)">
                A carregar transmissão...
              </div>
              <div style="position:absolute;top:14px;right:14px;z-index:80;display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.72);border:1px solid rgba(255,255,255,0.14);border-radius:8px;padding:8px 10px">
                <span style="color:rgba(255,255,255,0.58);font-size:11px;font-weight:800;text-transform:uppercase">Fonte</span>
                <select id="stream-test-select" style="max-width:320px;background:#151515;border:1px solid rgba(255,255,255,0.16);color:white;border-radius:6px;padding:7px 30px 7px 10px;font-size:12px;font-weight:700;outline:none">
                  <option value="">Stream do evento</option>
                </select>
              </div>

              {/* Pre-roll Ad Overlay */}
              <div id="preroll-ad" style="position:absolute;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100">
                <div style="position:absolute;top:16px;left:16px;background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px 12px;display:flex;align-items:center;gap:8px">
                  <span style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:600">ANÚNCIO</span>
                  <span id="ad-countdown" style="color:white;font-size:13px;font-weight:700">Pular em 5s</span>
                </div>

                <video id="ad-video" autoplay muted style="width:100%;height:100%;object-fit:contain">
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" type="video/mp4" />
                </video>

                <div style="position:absolute;bottom:20px;right:20px;display:flex;align-items:center;gap:12px">
                  <a id="preroll-ad-link" href="https://www.betano.com/" target="_blank" rel="noopener noreferrer" style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.2);color:white;text-decoration:none;padding:8px 16px;border-radius:6px;font-size:13px">
                    Betano Sports — Saiba Mais
                  </a>
                  <button id="skip-ad-btn" data-ready="false" style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.3);color:white;padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer;opacity:0.4">
                    Pular Anúncio →
                  </button>
                </div>
              </div>

              {/* Player Controls Overlay */}
              <div id="player-controls" style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(0deg,rgba(0,0,0,0.95) 0%,transparent 100%);padding:16px 20px;display:none" class="player-controls">
                
                {/* Progress Bar */}
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                  <span style="display:flex;align-items:center;gap:6px;background:#ef4444;color:white;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px">
                    <span style="width:6px;height:6px;background:white;border-radius:50%"></span>
                    AO VIVO
                  </span>
                  <div style="flex:1;height:3px;background:rgba(255,255,255,0.2);border-radius:2px;cursor:pointer" id="progress-bar">
                    <div id="progress-fill" style="height:100%;background:#ef4444;border-radius:2px;width:65%"></div>
                  </div>
                  <span style="color:rgba(255,255,255,0.7);font-size:12px"><span data-current-event-views>{formatNumber(event.views || 0)}</span> visualizações</span>
                </div>

                {/* Controls */}
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:16px">
                    <button id="play-btn" style="background:none;border:none;color:white;cursor:pointer;display:flex;align-items:center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" id="play-icon">
                        <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                      </svg>
                    </button>

                    <button id="mute-btn" style="background:none;border:none;color:white;cursor:pointer;display:flex;align-items:center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    </button>

                    {/* Volume Slider */}
                    <input type="range" id="volume-slider" min="0" max="100" value="80" style="width:80px;accent-color:#ef4444" />

                    {/* Quality Selector */}
                    <select id="quality-select" style="background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.2);color:white;font-size:12px;padding:4px 8px;border-radius:4px;cursor:pointer">
                      <option>1080p</option>
                      <option>720p</option>
                      <option>480p</option>
                      <option>Auto</option>
                    </select>
                  </div>

                  <div style="display:flex;align-items:center;gap:12px">
                    {/* Theater Mode */}
                    <button id="theater-btn" style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8"/><path d="M12 17v4"/>
                      </svg>
                    </button>
                    {/* Fullscreen */}
                    <button id="fullscreen-btn" style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Overlay Ad */}
              <div id="overlay-ad" style="position:absolute;bottom:80px;left:16px;right:16px;background:rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 16px;display:none;align-items:center;justify-content:space-between;gap:12px;z-index:50">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">AD</span>
                  <div>
                    <p style="color:white;font-size:13px;font-weight:600;margin:0">Red Bull — Dá Asas</p>
                    <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:2px 0 0">Energia para seus esportes favoritos</p>
                  </div>
                </div>
                <div style="display:flex;gap:8px">
                  <a id="overlay-ad-link" href="https://www.redbull.com/" target="_blank" rel="noopener noreferrer" style="padding:6px 12px;background:#ef4444;color:white;text-decoration:none;border-radius:4px;font-size:12px;font-weight:600">Ver</a>
                  <button onclick="document.getElementById('overlay-ad').style.display='none'" style="background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.7);width:28px;height:28px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px">✕</button>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div style="padding:20px 24px">
              {/* Title Row */}
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px;flex-wrap:wrap">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="background:#ef4444;color:white;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;display:flex;align-items:center;gap:4px">
                      <span style="width:5px;height:5px;background:white;border-radius:50%"></span>
                      AO VIVO
                    </span>
                    <span style="color:rgba(255,255,255,0.5);font-size:13px">{event.sport.icon} {event.sport.name}</span>
                  </div>
                  <h1 style="color:white;font-size:22px;font-weight:800;margin:0;letter-spacing:-0.3px">{event.title}</h1>
                </div>
                <div style="display:flex;gap:10px">
                  <button id="like-btn" data-base-likes={event.likes} style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:white;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span id="like-count">{formatNumber(event.likes)}</span>
                  </button>
                  <button id="share-btn" style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:white;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Compartilhar
                  </button>
                </div>
              </div>

              {/* Score Board (se tiver times) */}
              {event.teams && (
                <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:20px;text-align:center">
                  <div style="display:flex;align-items:center;justify-content:center;gap:24px">
                    <div style="text-align:center">
                      <div id="score-home-logo" style="font-size:40px;margin-bottom:8px">{event.teams.home.logo}</div>
                      <div id="score-home-name" style="color:white;font-size:16px;font-weight:700">{event.teams.home.name}</div>
                    </div>
                    <div style="text-align:center">
                      <div style="color:white;font-size:48px;font-weight:900;letter-spacing:-2px"><span id="score-home-value">{event.teams.home.score ?? '0'}</span> - <span id="score-away-value">{event.teams.away.score ?? '0'}</span></div>
                      <div style="display:flex;align-items:center;gap:6px;justify-content:center">
                        <span style="width:6px;height:6px;background:#ef4444;border-radius:50%"></span>
                        <span id="score-status" style="color:#ef4444;font-size:12px;font-weight:600">72' AO VIVO</span>
                      </div>
                      <div id="score-source" style="color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;margin-top:6px">Dados locais</div>
                    </div>
                    <div style="text-align:center">
                      <div id="score-away-logo" style="font-size:40px;margin-bottom:8px">{event.teams.away.logo}</div>
                      <div id="score-away-name" style="color:white;font-size:16px;font-weight:700">{event.teams.away.name}</div>
                    </div>
                  </div>
                  <div id="score-cards" style="display:none;margin-top:18px;border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;text-align:left"></div>
                </div>
              )}

              {/* Channel Info */}
              <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:10px;margin-bottom:20px">
                <div style="display:flex;align-items:center;gap:12px">
                  <img src={event.channel.avatar} alt={event.channel.name} style="width:48px;height:48px;border-radius:50%;border:2px solid rgba(239,68,68,0.3)" />
                  <div>
                    <div style="display:flex;align-items:center;gap:6px">
                      <span style="color:white;font-size:15px;font-weight:700">{event.channel.name}</span>
                      {event.channel.isVerified && <span style="color:#3b82f6;font-size:14px">✓</span>}
                    </div>
                    <span style="color:rgba(255,255,255,0.4);font-size:13px"><span id="followers-count">{formatNumber(event.channel.followersCount)}</span> seguidores</span>
                  </div>
                </div>
                <button id="follow-btn" data-base-followers={event.channel.followersCount} style="padding:10px 20px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer">
                  + Seguir
                </button>
              </div>

              {/* Tags */}
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                {event.tags.map(tag => (
                  <a key={tag} href={`/busca?q=${tag}`} style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);text-decoration:none;padding:4px 12px;border-radius:50px;font-size:12px">
                    #{tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Mid-roll Ad Banner */}
            <div style="background:linear-gradient(90deg,rgba(239,68,68,0.05),rgba(0,0,0,0.3));border-top:1px solid rgba(239,68,68,0.1);border-bottom:1px solid rgba(239,68,68,0.1);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">PATROCINADO</span>
                <span style="color:white;font-size:14px;font-weight:600">🏆 Nike — Just Do It. Novo coleção Esportes 2024</span>
              </div>
              <a href="#" style="padding:8px 16px;background:#ef4444;color:white;text-decoration:none;border-radius:6px;font-size:12px;font-weight:700">Comprar</a>
            </div>
          </div>

          {/* SIDEBAR - Chat */}
          <div style="background:#0d0d0d;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;height:calc(100vh - 64px);position:sticky;top:64px" class="chat-sidebar">
            
            {/* Chat Header */}
            <div style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <h3 style="color:white;font-size:15px;font-weight:700;margin:0">Chat ao Vivo</h3>
                <div style="display:flex;align-items:center;gap:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:50px;padding:4px 10px">
                  <span style="width:6px;height:6px;background:#ef4444;border-radius:50%"></span>
                  <span data-current-event-views style="color:#ef4444;font-size:11px;font-weight:600">{formatNumber(event.views || 0)}</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div id="chat-messages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px">
              <div id="empty-chat" style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:rgba(255,255,255,0.38);font-size:13px;line-height:1.5;padding:24px">
                Ainda nao ha comentarios. Seja o primeiro a comentar.
              </div>
            </div>

            {/* Chat Input */}
            <div style="padding:12px;border-top:1px solid rgba(255,255,255,0.06)">
              <div style="display:flex;gap:8px;margin-bottom:10px">
                <input id="chat-input" type="text" placeholder="Escreva uma mensagem..." style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:white;padding:10px 14px;border-radius:8px;font-size:13px;outline:none" />
                <button id="send-btn" style="background:linear-gradient(135deg,#ef4444,#dc2626);border:none;color:white;padding:10px 14px;border-radius:8px;cursor:pointer;font-size:16px">➤</button>
              </div>
              <div style="display:flex;gap:8px">
                <button id="superchat-btn" style="flex:1;background:linear-gradient(135deg,rgba(239,68,68,0.15),rgba(220,38,38,0.1));border:1px solid rgba(239,68,68,0.3);color:#ef4444;padding:8px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600">
                  💰 Super Chat
                </button>
                <button id="reactions-toggle" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);padding:8px;border-radius:6px;cursor:pointer;font-size:12px">
                  😄 Reações
                </button>
              </div>
              <div id="reactions-panel" style="display:none;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">
                {['👏', '🔥', '⚽', '❤️'].map(reaction => (
                  <button class="reaction-btn" data-reaction={reaction} style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:8px;padding:8px 6px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;gap:5px">
                    <span>{reaction}</span>
                    <span data-reaction-count={reaction} style="color:rgba(255,255,255,0.55);font-size:11px;font-weight:700">0</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          const mainPlayer = document.getElementById('sport-player');
          const mainStreamUrl = mainPlayer?.dataset.streamUrl || '';
          const streamStatus = document.getElementById('stream-status');
          const streamTestSelect = document.getElementById('stream-test-select');
          const fallbackStreamUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
          const hlsTestStreams = [
            ['Tears of Steel', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'],
            ['Apple fMP4', 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8'],
            ['Tears MP4 m3u8', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8'],
            ['Live Akamai', 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'],
            ['Live Akamai 2', 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'],
            ['Dolby VOD HTTP', 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8'],
            ['Dolby Multichannel HTTP', 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multichannel_subs.m3u8'],
            ['Dolby Multilanguage HTTP', 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8'],
            ['Azure HLSv4 HTTP', 'http://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=m3u8-aapl)'],
            ['Azure Promo HTTP', 'http://amssamples.streaming.mediaservices.windows.net/69fbaeba-8e92-4740-aedc-ce09ae945073/AzurePromo.ism/manifest(format=m3u8-aapl)'],
            ['Azure 4K HTTP', 'http://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)'],
          ];
          let activeStreamUrl = mainStreamUrl;
          let streamLoaded = false;
          let streamReady = false;
          let pendingAutoPlay = false;
          let hlsFallbackRequested = false;
          let backupStreamLoaded = false;

          function setStreamStatus(message, isError = false) {
            if (!streamStatus) return;
            streamStatus.textContent = message || '';
            streamStatus.style.display = message ? 'flex' : 'none';
            streamStatus.style.color = isError ? '#fca5a5' : 'rgba(255,255,255,0.72)';
          }

          function hideStreamStatus() {
            setStreamStatus('');
          }

          function isHlsUrl(url) {
            return /\\.m3u8(\\?|$|\\/)|format=m3u8/i.test(url);
          }

          function markStreamReady() {
            streamReady = true;
            hideStreamStatus();
            if (pendingAutoPlay) startPlayback();
          }

          function startPlayback() {
            mainPlayer?.play?.().then(() => {
              hideStreamStatus();
            }).catch(() => {
              setStreamStatus('Clique em play para iniciar a transmissão.');
            });
          }

          function requestHlsFallback() {
            if (hlsFallbackRequested) return;
            hlsFallbackRequested = true;
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.6.13/hls.min.js';
            script.async = true;
            document.head.appendChild(script);
          }

          function waitForHls(callback, attempts = 0) {
            if (window.Hls?.isSupported()) {
              callback();
              return;
            }
            if (attempts === 10) requestHlsFallback();
            if (attempts < 80) {
              setTimeout(() => waitForHls(callback, attempts + 1), 100);
              return;
            }
            setStreamStatus('Não foi possível carregar o suporte HLS no browser.', true);
          }

          function getHlsErrorMessage(data) {
            const response = data?.response;
            const status = response?.code || response?.status;
            const url = response?.url || data?.url || '';
            if (status) return 'Erro HLS ' + status + (url ? ': ' + url : '');
            return 'Erro ao carregar a transmissão HLS.';
          }

          function resetMainPlayer() {
            if (window.sportPlayerHls) {
              window.sportPlayerHls.destroy();
              window.sportPlayerHls = null;
            }
            mainPlayer?.pause?.();
            mainPlayer?.removeAttribute('src');
            mainPlayer?.load?.();
          }

          function loadSportStream(url = activeStreamUrl, allowFallback = true) {
            if (!mainPlayer || !url) return;
            if (streamLoaded && url === activeStreamUrl) return;
            streamLoaded = true;
            activeStreamUrl = url;
            setStreamStatus('A carregar transmissão...');

            mainPlayer.addEventListener('loadedmetadata', markStreamReady, { once: true });
            mainPlayer.addEventListener('canplay', markStreamReady, { once: true });
            mainPlayer.addEventListener('playing', hideStreamStatus);
            mainPlayer.addEventListener('error', () => {
              setStreamStatus('Erro ao carregar a transmissão.', true);
            });

            const isHls = isHlsUrl(url);
            if (isHls && mainPlayer.canPlayType('application/vnd.apple.mpegurl')) {
              mainPlayer.src = url;
              mainPlayer.load();
              return;
            }

            if (isHls) {
              waitForHls(() => {
                const hls = new window.Hls({
                  enableWorker: true,
                  lowLatencyMode: true,
                });
                hls.loadSource(url);
                hls.attachMedia(mainPlayer);
                hls.on(window.Hls.Events.MANIFEST_PARSED, markStreamReady);
                hls.on(window.Hls.Events.ERROR, (_, data) => {
                  if (data?.fatal) {
                    const message = getHlsErrorMessage(data);
                    if (allowFallback && !backupStreamLoaded && url !== fallbackStreamUrl) {
                      backupStreamLoaded = true;
                      setStreamStatus(message + ' A carregar stream de fallback...', true);
                      window.showToast?.('A stream principal falhou. A testar stream fallback.', 'error');
                      resetMainPlayer();
                      streamReady = false;
                      loadSportStream(fallbackStreamUrl);
                      return;
                    }
                    setStreamStatus(message, true);
                    window.showToast?.(message, 'error');
                  }
                });
                window.sportPlayerHls = hls;
              });
              return;
            }

            mainPlayer.src = url;
            mainPlayer.load();
          }

          function playMainPlayer() {
            pendingAutoPlay = true;
            loadSportStream();
            if (streamReady) startPlayback();
          }

          function switchSportStream(url, label) {
            activeStreamUrl = url || mainStreamUrl;
            streamLoaded = false;
            streamReady = false;
            pendingAutoPlay = true;
            backupStreamLoaded = true;
            resetMainPlayer();
            setStreamStatus('A carregar ' + (label || 'transmissão') + '...');
            loadSportStream(activeStreamUrl, false);
          }

          if (streamTestSelect) {
            hlsTestStreams.forEach(([label, url]) => {
              const option = document.createElement('option');
              option.value = url;
              option.textContent = label;
              streamTestSelect.appendChild(option);
            });
            streamTestSelect.addEventListener('change', () => {
              const label = streamTestSelect.options[streamTestSelect.selectedIndex]?.textContent || 'transmissão';
              switchSportStream(streamTestSelect.value || mainStreamUrl, label);
            });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadSportStream);
          } else {
            loadSportStream();
          }

          let adCountdown = 5;
          let adSkipped = false;
          function skipPrerollAd() {
            if (adSkipped) return;
            adSkipped = true;
            const preroll = document.getElementById('preroll-ad');
            const adVideo = document.getElementById('ad-video');
            if (adVideo) adVideo.pause();
            if (preroll) preroll.style.display = 'none';
            document.getElementById('player-controls').style.display = 'block';
            playMainPlayer();
            setTimeout(() => {
              const overlayAd = document.getElementById('overlay-ad');
              if (overlayAd) overlayAd.style.display = 'flex';
            }, 15000);
          }

          let adTimer = setInterval(() => {
            adCountdown--;
            const el = document.getElementById('ad-countdown');
            const btn = document.getElementById('skip-ad-btn');
            if(el) el.textContent = adCountdown > 0 ? 'Pular em ' + adCountdown + 's' : 'Pular Anúncio →';
            if(btn && adCountdown <= 0) { btn.dataset.ready = 'true'; btn.style.opacity = '1'; }
            if(adCountdown <= 0) clearInterval(adTimer);
          }, 1000);
          
          document.getElementById('skip-ad-btn')?.addEventListener('click', () => {
            const btn = document.getElementById('skip-ad-btn');
            if (btn?.dataset.ready !== 'true') {
              window.showToast?.('O anuncio pode ser pulado em ' + adCountdown + 's.', 'error');
              return;
            }
            skipPrerollAd();
          });
          
          const playerContainer = document.getElementById('player-container');
          playerContainer?.addEventListener('mouseenter', () => {
            document.getElementById('player-controls').style.display = 'block';
          });
          playerContainer?.addEventListener('mouseleave', () => {
            document.getElementById('player-controls').style.display = 'none';
          });
          
          document.getElementById('play-btn')?.addEventListener('click', () => {
            const player = document.getElementById('sport-player');
            const icon = document.getElementById('play-icon');
            if(player?.paused) {
              playMainPlayer();
              icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
            } else {
              player?.pause();
              icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
            }
          });
          
          document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
            const container = document.getElementById('player-container');
            if(!document.fullscreenElement) container?.requestFullscreen();
            else document.exitFullscreen();
          });
          
          document.getElementById('volume-slider')?.addEventListener('input', (e) => {
            const player = document.getElementById('sport-player');
            if(player) player.volume = e.target.value / 100;
          });

          const isFootballEvent = '${event.sport.slug}' === 'futebol';
          const apiBaseUrl = window.SPORTPLUS_API_BASE || 'http://localhost:4000/api';

          function getViewerKey() {
            const key = 'sportplus_viewer_key';
            let value = localStorage.getItem(key);
            if (!value) {
              value = 'viewer_' + Date.now() + '_' + Math.random().toString(36).slice(2, 12);
              localStorage.setItem(key, value);
            }
            return value;
          }

          async function registerRealEventView() {
            try {
              const response = await fetch(apiBaseUrl + '/events/${event.id}/view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ viewerKey: getViewerKey() }),
              });
              const payload = await response.json();
              if (payload?.success) {
                document.querySelectorAll('[data-current-event-views]').forEach((el) => {
                  el.textContent = payload.data.views;
                });
              }
            } catch (_) {}
          }

          registerRealEventView();

          function setScoreLogo(elementId, logo, fallback) {
            const element = document.getElementById(elementId);
            if (!element) return;
            if (logo && /^https?:\\/\\//.test(logo)) {
              element.innerHTML = '<img src="' + logo + '" alt="' + (fallback || 'equipa') + '" style="width:46px;height:46px;object-fit:contain;border-radius:50%" />';
              return;
            }
            element.textContent = logo || fallback || '';
          }

          function getScoreStatusText(status) {
            if (!status) return 'AO VIVO';
            if (status.elapsed) return status.elapsed + "' " + (status.short || 'AO VIVO');
            return status.long || status.short || 'AO VIVO';
          }

          function renderFootballCards(cards) {
            const container = document.getElementById('score-cards');
            if (!container) return;
            if (!cards || !cards.length) {
              container.style.display = 'none';
              container.innerHTML = '';
              return;
            }

            container.style.display = 'block';
            container.innerHTML = '<div style="color:white;font-size:13px;font-weight:800;margin-bottom:10px">Cartoes</div>' + cards.map((card) => {
              const isRed = String(card.type || '').toLowerCase().includes('red');
              const color = isRed ? '#ef4444' : '#facc15';
              const minute = card.minute ? card.minute + "'" + (card.extra ? '+' + card.extra : '') : '';
              return '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;color:rgba(255,255,255,0.78);font-size:12px;padding:6px 0;border-top:1px solid rgba(255,255,255,0.05)"><span><span style="display:inline-block;width:10px;height:14px;background:' + color + ';border-radius:2px;margin-right:8px;vertical-align:-2px"></span>' + (card.player || 'Jogador') + ' · ' + (card.team || 'Equipa') + '</span><span style="color:rgba(255,255,255,0.45)">' + minute + '</span></div>';
            }).join('');
          }

          function renderLiveScore(score) {
            if (!score?.teams) return;
            document.getElementById('score-home-name') && (document.getElementById('score-home-name').textContent = score.teams.home?.name || 'Casa');
            document.getElementById('score-away-name') && (document.getElementById('score-away-name').textContent = score.teams.away?.name || 'Fora');
            document.getElementById('score-home-value') && (document.getElementById('score-home-value').textContent = score.teams.home?.score ?? 0);
            document.getElementById('score-away-value') && (document.getElementById('score-away-value').textContent = score.teams.away?.score ?? 0);
            document.getElementById('score-status') && (document.getElementById('score-status').textContent = getScoreStatusText(score.status));
            document.getElementById('score-source') && (document.getElementById('score-source').textContent = score.source === 'external' ? 'Atualizado por API externa' : 'Dados locais');
            setScoreLogo('score-home-logo', score.teams.home?.logo, score.teams.home?.name);
            setScoreLogo('score-away-logo', score.teams.away?.logo, score.teams.away?.name);
            renderFootballCards(score.cards || []);
          }

          async function refreshFootballLiveScore() {
            if (!isFootballEvent) return;
            try {
              const response = await fetch(apiBaseUrl + '/events/${event.id}/live-score');
              const payload = await response.json();
              if (payload?.success) renderLiveScore(payload.data);
            } catch (_) {
              const source = document.getElementById('score-source');
              if (source) source.textContent = 'Dados locais';
            }
          }

          refreshFootballLiveScore();
          if (isFootballEvent) setInterval(refreshFootballLiveScore, 45000);
          
          const eventKey = 'sportplus:event:${event.id}';
          const channelKey = 'sportplus:channel:${event.channel.id}';

          function readJson(key, fallback) {
            try {
              const value = localStorage.getItem(key);
              return value ? JSON.parse(value) : fallback;
            } catch (_) {
              return fallback;
            }
          }

          function writeJson(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
          }

          function formatCompact(value) {
            const number = Number(value || 0);
            if (number >= 1000000) return (number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace('.0', '') + 'M';
            if (number >= 1000) return (number / 1000).toFixed(number >= 10000 ? 0 : 1).replace('.0', '') + 'K';
            return String(number);
          }

          function getUser() {
            const user = readJson('sportplus_user', null);
            const name = user?.name || 'Você';
            return {
              id: user?.id || 'local-user',
              name,
              initial: (name.trim().charAt(0) || 'V').toUpperCase(),
              verified: Boolean(user?.isVerified),
            };
          }

          function escapeHtml(value) {
            return String(value)
              .replaceAll('&', '&amp;')
              .replaceAll('<', '&lt;')
              .replaceAll('>', '&gt;')
              .replaceAll('"', '&quot;')
              .replaceAll("'", '&#039;');
          }

          function getEventState() {
            return {
              liked: false,
              comments: [],
              reactions: {},
              shares: 0,
              ...readJson(eventKey, {}),
            };
          }

          function saveEventState(state) {
            writeJson(eventKey, state);
          }

          function getChannelState() {
            return { followed: false, ...readJson(channelKey, {}) };
          }

          function saveChannelState(state) {
            writeJson(channelKey, state);
          }

          function renderLike() {
            const state = getEventState();
            const button = document.getElementById('like-btn');
            const count = document.getElementById('like-count');
            const baseLikes = Number(button?.dataset.baseLikes || 0);
            if (count) count.textContent = formatCompact(baseLikes + (state.liked ? 1 : 0));
            if (button) {
              button.style.background = state.liked ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.08)';
              button.style.borderColor = state.liked ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.12)';
              button.style.color = state.liked ? '#fecaca' : 'white';
            }
          }

          function renderFollow() {
            const state = getChannelState();
            const button = document.getElementById('follow-btn');
            const count = document.getElementById('followers-count');
            const baseFollowers = Number(button?.dataset.baseFollowers || 0);
            if (count) count.textContent = formatCompact(baseFollowers + (state.followed ? 1 : 0));
            if (button) {
              button.textContent = state.followed ? 'Seguindo' : '+ Seguir';
              button.style.background = state.followed ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#ef4444,#dc2626)';
              button.style.border = state.followed ? '1px solid rgba(255,255,255,0.16)' : 'none';
            }
          }

          function renderComments() {
            const chatDiv = document.getElementById('chat-messages');
            if (!chatDiv) return;
            const state = getEventState();
            chatDiv.innerHTML = '';
            if (!state.comments.length) {
              const empty = document.createElement('div');
              empty.id = 'empty-chat';
              empty.style = 'height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:rgba(255,255,255,0.38);font-size:13px;line-height:1.5;padding:24px';
              empty.textContent = 'Ainda nao ha comentarios. Seja o primeiro a comentar.';
              chatDiv.appendChild(empty);
              return;
            }
            state.comments.forEach((comment) => {
              const div = document.createElement('div');
              div.style = comment.type === 'superchat'
                ? 'display:flex;gap:8px;background:linear-gradient(135deg,rgba(239,68,68,0.15),rgba(220,38,38,0.1));border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:8px;'
                : 'display:flex;gap:8px;';
              const badge = comment.type === 'superchat' ? '<span style="color:#ef4444;font-size:10px;font-weight:700">Super Chat</span>' : '';
              div.innerHTML = \`<div style="width:28px;height:28px;background:#ef4444;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;margin-top:2px;">\${escapeHtml(comment.initial)}</div><div><div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#ef4444;font-size:12px;font-weight:600;">\${escapeHtml(comment.name)}</span>\${badge}<span style="color:rgba(255,255,255,0.32);font-size:10px;">\${escapeHtml(comment.timeLabel || 'agora')}</span></div><p style="color:rgba(255,255,255,0.85);font-size:13px;margin:0;line-height:1.4;">\${escapeHtml(comment.content)}</p></div>\`;
              chatDiv.appendChild(div);
            });
            chatDiv.scrollTop = chatDiv.scrollHeight;
          }

          function renderReactions() {
            const state = getEventState();
            document.querySelectorAll('[data-reaction-count]').forEach((el) => {
              const reaction = el.getAttribute('data-reaction-count');
              el.textContent = formatCompact(state.reactions?.[reaction] || 0);
            });
          }

          document.getElementById('like-btn')?.addEventListener('click', () => {
            const state = getEventState();
            state.liked = !state.liked;
            saveEventState(state);
            renderLike();
            window.showToast?.(state.liked ? 'Curtida adicionada.' : 'Curtida removida.', 'success');
          });

          document.getElementById('follow-btn')?.addEventListener('click', () => {
            const state = getChannelState();
            state.followed = !state.followed;
            saveChannelState(state);
            renderFollow();
            window.showToast?.(state.followed ? 'Canal seguido.' : 'Voce deixou de seguir o canal.', 'success');
          });

          document.getElementById('share-btn')?.addEventListener('click', async () => {
            const state = getEventState();
            const shareData = { title: document.title, text: '${event.title.replace(/'/g, "\\'")}', url: window.location.href };
            try {
              if (navigator.share) await navigator.share(shareData);
              else await navigator.clipboard.writeText(window.location.href);
              state.shares = Number(state.shares || 0) + 1;
              saveEventState(state);
              window.showToast?.(navigator.share ? 'Partilha aberta.' : 'Link copiado.', 'success');
            } catch (_) {
              window.showToast?.('Partilha cancelada.', 'error');
            }
          });

          function sendComment(type = 'message') {
            const input = document.getElementById('chat-input');
            const content = input?.value.trim();
            if (!content) {
              window.showToast?.('Escreva uma mensagem antes de enviar.', 'error');
              return;
            }
            const user = getUser();
            const state = getEventState();
            state.comments = Array.isArray(state.comments) ? state.comments : [];
            state.comments.push({
              id: 'comment_' + Date.now(),
              userId: user.id,
              name: user.name,
              initial: user.initial,
              content,
              type,
              createdAt: new Date().toISOString(),
              timeLabel: 'agora',
            });
            saveEventState(state);
            input.value = '';
            input.dataset.commentType = 'message';
            renderComments();
            window.showToast?.(type === 'superchat' ? 'Super Chat enviado.' : 'Comentario enviado.', 'success');
          }

          document.getElementById('send-btn')?.addEventListener('click', () => {
            const input = document.getElementById('chat-input');
            sendComment(input?.dataset.commentType || 'message');
          });

          document.getElementById('chat-input')?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              sendComment(event.currentTarget.dataset.commentType || 'message');
            }
          });

          document.getElementById('superchat-btn')?.addEventListener('click', () => {
            const input = document.getElementById('chat-input');
            if (input) {
              input.dataset.commentType = 'superchat';
              input.focus();
              window.showToast?.('Escreva a mensagem do Super Chat e envie.', 'success');
            }
          });

          document.getElementById('reactions-toggle')?.addEventListener('click', () => {
            const panel = document.getElementById('reactions-panel');
            if (panel) panel.style.display = panel.style.display === 'grid' ? 'none' : 'grid';
          });

          document.querySelectorAll('.reaction-btn').forEach((button) => {
            button.addEventListener('click', () => {
              const reaction = button.getAttribute('data-reaction');
              const state = getEventState();
              state.reactions = state.reactions || {};
              state.reactions[reaction] = Number(state.reactions[reaction] || 0) + 1;
              saveEventState(state);
              renderReactions();
            });
          });

          renderLike();
          renderFollow();
          renderComments();
          renderReactions();
        `}} />
      </body>
    </html>
  )
}
