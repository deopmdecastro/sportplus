/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { EventCard } from '../components/cards/EventCard'
import { VideoCard } from '../components/cards/VideoCard'
import { getMockHomePageData, type HomePageData } from '../lib/apiClient'
import { formatNumber } from '../lib/utils'

interface HomePageProps {
  data?: HomePageData
}

export function HomePage({ data = getMockHomePageData() }: HomePageProps) {
  const { liveEvents, upcomingEvents, highlights, sports, channels, games, stats } = data
  const fallback = getMockHomePageData()
  const allEvents = [...liveEvents, ...upcomingEvents]
  const featuredEvent = liveEvents.find((event) => event.isFeatured) || liveEvents[0] || upcomingEvents[0] || fallback.liveEvents[0]
  const featuredSport = games.find((game) => game.isFeatured) || games[0]
  const heroImage = featuredEvent.thumbnail || featuredSport?.heroImage
  const heroTags = ['Ao vivo', featuredSport?.category || featuredEvent.sport.name, 'HD', 'Multicamera']
  const continueWatching = allEvents.length ? allEvents.slice(0, 4) : [...fallback.liveEvents.slice(0, 2), ...fallback.upcomingEvents.slice(0, 2)]
  const recommended = (allEvents.length ? allEvents : [...fallback.liveEvents, ...fallback.upcomingEvents]).filter((event) => event.id !== featuredEvent.id).slice(0, 8)
  const popularThisWeek = [...highlights].sort((a, b) => b.views - a.views).slice(0, 8)

  return (
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>sportplus | Streaming Desportivo Ao Vivo</title>
        <meta name="theme-color" content="#080808" />
        <link rel="canonical" href="https://sportplus.example/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="sportplus | Streaming Desportivo Ao Vivo" />
        <meta property="og:description" content="Eventos ao vivo, jogos de futebol, modalidades em destaque e highlights numa experiencia premium." />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content="https://sportplus.example/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="sportplus | Streaming Desportivo Ao Vivo" />
        <meta name="twitter:description" content="Assista jogos, descubra eventos e acompanhe canais desportivos em uma plataforma moderna." />
        <meta name="twitter:image" content={heroImage} />
        <meta name="description" content="Streaming desportivo premium com eventos ao vivo, jogos de futebol, modalidades, canais e highlights." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'sportplus',
          url: 'https://sportplus.example/',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://sportplus.example/explorar?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }).replace(/</g, '\\u003c')}} />
      </head>
      <body class="stream-home">
        <Navbar currentPage="home" />

        <main>
          <section class="stream-hero gaming-hero" aria-labelledby="hero-title" style={`--hero-image:url("${heroImage}");--game-accent:${featuredSport?.accentColor || '#ef4444'}`}>
            <img class="stream-hero-bg" src={heroImage} alt="" loading="eager" />
            <div class="stream-hero-vignette"></div>
            <div class="stream-hero-content">
              <div class="stream-live-chip">
                <span></span>
                Ao vivo agora
              </div>
              <h1 id="hero-title">{featuredEvent.title}</h1>
              <p>{featuredEvent.description || 'Acompanhe jogos, competicoes e canais desportivos com transmissao ao vivo, highlights e agenda completa.'}</p>
              <div class="stream-meta-row" aria-label="Metadados do evento">
                <span>{featuredEvent.sport.icon} {featuredEvent.sport.name}</span>
                <span>{formatNumber(stats.activeViewers || featuredEvent.viewers || featuredEvent.views || 0)} assistindo</span>
                <span>HD</span>
                <span>{featuredEvent.isPremium ? 'Premium' : 'Livre'}</span>
              </div>
              <div class="stream-tag-row">
                {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div class="stream-hero-actions">
                <a class="stream-btn stream-btn-primary" href={`/evento/${featuredEvent.id}`} aria-label={`Assistir ${featuredEvent.title} agora`}>
                  <span class="stream-play-icon">▶</span>
                  Assistir agora
                </a>
                <a class="stream-btn stream-btn-secondary" href="/jogos">Explorar jogos</a>
              </div>
            </div>
            <div class="stream-hero-preview" aria-label="Destaques da plataforma">
              {[
                { label: 'Eventos ao vivo', value: stats.liveStreams || liveEvents.length },
                { label: 'Highlights', value: highlights.length },
                { label: 'Modalidades', value: stats.games || games.length },
              ].map((item) => (
                <div class="stream-hero-stat" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section class="gaming-stats-row" aria-label="Metricas da plataforma">
            {[
              { label: 'Assistindo agora', value: stats.activeViewers },
              { label: 'Canais', value: stats.creators },
              { label: 'Views totais', value: stats.totalViews },
            ].map((item) => (
              <div class="gaming-stat-tile" key={item.label}>
                <strong>{formatNumber(item.value)}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </section>

          <section class="stream-quick-genres" aria-label="Categorias em destaque">
            {games.slice(0, 6).map((game) => (
              <a href={`/jogos/${game.slug}`} class="stream-genre-pill gaming-pill" key={game.id}>
                <span>🏟</span>
                {game.name}
                {game.liveStreams > 0 && <b>{game.liveStreams}</b>}
              </a>
            ))}
            {sports.slice(0, 10).map((sport) => (
              <a href={`/esportes/${sport.slug}`} class="stream-genre-pill" key={sport.id}>
                <span>{sport.icon}</span>
                {sport.name}
                {sport.liveCount > 0 && <b>{sport.liveCount}</b>}
              </a>
            ))}
          </section>

          <section class="stream-section" aria-labelledby="sports-title">
            <div class="stream-section-head">
              <div>
                <span>Jogos e modalidades em alta</span>
                <h2 id="sports-title">Onde o desporto esta agora</h2>
              </div>
              <a href="/jogos">Ver catalogo</a>
            </div>
            <div class="gaming-grid">
              {games.slice(0, 8).map((game) => (
                <a href={`/jogos/${game.slug}`} class="gaming-card" style={`--game-accent:${game.accentColor}`} key={game.id}>
                  <img src={game.cover} alt={game.name} loading="lazy" />
                  <div>
                    <strong>{game.name}</strong>
                    <span>{game.category}</span>
                    <small>{formatNumber(game.viewers)} assistindo - {game.liveStreams} transmissao{game.liveStreams === 1 ? '' : 'es'}</small>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section class="stream-ad-strip" aria-label="Conteudo patrocinado">
            <span>Patrocinado</span>
            <strong>Pacote sportplus PRO</strong>
            <p>Transmissoes exclusivas, replays sem anuncios e qualidade maxima nos grandes eventos.</p>
            <a href="/cadastro">Experimentar</a>
          </section>

          <section class="stream-section" aria-labelledby="continue-title">
            <div class="stream-section-head">
              <div>
                <span>Retome de onde parou</span>
                <h2 id="continue-title">Continuar assistindo</h2>
              </div>
              <a href="/perfil">Ver historico</a>
            </div>
            <div class="stream-rail stream-rail-compact">
              {continueWatching.map((event, index) => (
                <a href={`/evento/${event.id}`} class="stream-progress-card" key={event.id}>
                  <span
                    class="stream-progress-thumb"
                    style={`background-image:url("${event.thumbnail}")`}
                    aria-hidden="true"
                  ></span>
                  <div>
                    <strong>{event.title}</strong>
                    <span>{event.channel.name}</span>
                    <i style={`--progress:${38 + index * 14}%`}></i>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section class="stream-section" aria-labelledby="live-title">
            <div class="stream-section-head">
              <div>
                <span>Agora na sportplus</span>
                <h2 id="live-title">Ao vivo agora</h2>
              </div>
              <a href="/ao-vivo">Ver todos</a>
            </div>
            <div class="stream-rail">
              {liveEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </section>

          <section class="stream-section" aria-labelledby="recommended-title">
            <div class="stream-section-head">
              <div>
                <span>Selecao editorial</span>
                <h2 id="recommended-title">Recomendado para voce</h2>
              </div>
              <a href="/explorar">Explorar</a>
            </div>
            <div class="stream-rail">
              {recommended.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </section>

          <section class="stream-feature-band">
            <div>
              <span>Experiencia premium</span>
              <h2>Grandes momentos do esporte em uma interface feita para descoberta.</h2>
              <p>Rails horizontais, previews rapidos, historico, canais favoritos e recomendacoes por modalidade ajudam o usuario a encontrar o proximo evento em segundos.</p>
            </div>
            <div class="stream-feature-grid">
              {['HD', 'Replay', 'Watchlist', 'Sem anuncios'].map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>

          <section class="stream-section" aria-labelledby="popular-title">
            <div class="stream-section-head">
              <div>
                <span>Clipes e replays</span>
                <h2 id="popular-title">Popular esta semana</h2>
              </div>
              <a href="/highlights">Ver highlights</a>
            </div>
            <div class="stream-rail">
              {popularThisWeek.map((video) => <VideoCard key={video.id} video={video} />)}
            </div>
          </section>

          <section class="stream-section" aria-labelledby="upcoming-title">
            <div class="stream-section-head">
              <div>
                <span>Agenda</span>
                <h2 id="upcoming-title">Chegando em breve</h2>
              </div>
              <a href="/explorar">Ver agenda</a>
            </div>
            <div class="stream-rail">
              {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </section>

          <section class="stream-section" aria-labelledby="channels-title">
            <div class="stream-section-head">
              <div>
                <span>Canais e criadores</span>
                <h2 id="channels-title">Canais em destaque</h2>
              </div>
              <a href="/explorar">Descobrir</a>
            </div>
            <div class="stream-channel-row">
              {channels.map((channel) => (
                <a href={`/canal/${channel.slug}`} class="stream-channel-card" key={channel.id}>
                  <img src={channel.avatar} alt={channel.name} loading="lazy" />
                  <strong>{channel.name}</strong>
                  <span><span data-channel-followers={channel.id}>{formatNumber(channel.followersCount)}</span> seguidores</span>
                  {channel.isLive && <b>Ao vivo</b>}
                </a>
              ))}
            </div>
          </section>
        </main>

        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          const apiBaseUrl = window.SPORTPLUS_API_BASE || 'http://localhost:4000/api';

          function formatCompact(value) {
            const number = Number(value || 0);
            if (number >= 1000000) return (number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace('.0', '') + 'M';
            if (number >= 1000) return (number / 1000).toFixed(number >= 10000 ? 0 : 1).replace('.0', '') + 'K';
            return String(number);
          }

          function updateLiveEventViews(events) {
            events.forEach((event) => {
              document.querySelectorAll('[data-event-views="' + event.id + '"]').forEach((el) => {
                el.textContent = formatCompact(event.views || 0);
              });
              document.querySelectorAll('[data-event-views-label="' + event.id + '"]').forEach((el) => {
                el.textContent = formatCompact(event.views || 0) + ' visualizacoes';
              });
            });
          }

          function updateChannels(channels) {
            channels.forEach((channel) => {
              document.querySelectorAll('[data-channel-followers="' + channel.id + '"]').forEach((el) => {
                el.textContent = formatCompact(channel.followersCount || 0);
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

          async function refreshChannels() {
            try {
              const response = await fetch(apiBaseUrl + '/channels');
              const payload = await response.json();
              if (payload?.success) updateChannels(payload.data || []);
            } catch (_) {}
          }

          document.querySelectorAll('.stream-rail').forEach((rail) => {
            rail.addEventListener('wheel', (event) => {
              if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
              event.preventDefault();
              rail.scrollLeft += event.deltaY;
            }, { passive: false });
          });

          refreshLiveViews();
          refreshChannels();
          setInterval(refreshLiveViews, 30000);
          setInterval(refreshChannels, 60000);
        `}} />
      </body>
    </html>
  )
}
