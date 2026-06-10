/** @jsxImportSource hono/jsx */
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import type { Game } from '../types'
import { formatNumber } from '../lib/utils'

interface GamesCatalogPageProps {
  games: Game[]
}

export function GamesCatalogPage({ games }: GamesCatalogPageProps) {
  const featured = games.find((game) => game.isFeatured) || games[0]

  return (
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jogos | sportplus</title>
        <meta name="description" content="Explore jogos, categorias e transmissões ao vivo na sportplus." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body class="stream-home">
        <Navbar currentPage="explorar" />
        <main>
          {featured && (
            <section class="gaming-catalog-hero" style={`--game-accent:${featured.accentColor};--game-hero:url("${featured.heroImage}")`}>
              <div>
                <span>Catalogo gaming</span>
                <h1>{featured.name}</h1>
                <p>{featured.category} em destaque, com {formatNumber(featured.viewers)} espectadores acompanhando agora.</p>
                <a href={`/games/${featured.slug}`}>Ver transmissões</a>
              </div>
            </section>
          )}

          <section class="stream-section" aria-labelledby="games-title">
            <div class="stream-section-head">
              <div>
                <span>Descobrir</span>
                <h2 id="games-title">Jogos em alta</h2>
              </div>
              <a href="/explorar">Explorar tudo</a>
            </div>
            <div class="gaming-grid">
              {games.map((game) => (
                <a href={`/games/${game.slug}`} class="gaming-card" style={`--game-accent:${game.accentColor}`} key={game.id}>
                  <img src={game.cover} alt={game.name} loading="lazy" />
                  <div>
                    <strong>{game.name}</strong>
                    <span>{game.category}</span>
                    <small>{formatNumber(game.viewers)} viewers · {game.liveStreams} lives</small>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
