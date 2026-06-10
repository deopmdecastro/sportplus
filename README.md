# SPORT+ — Plataforma de Streaming Esportivo

## Visão Geral
**SPORT+** é uma plataforma completa de streaming esportivo com foco em monetização através de anúncios, inspirada em Netflix, DAZN, ESPN e Twitch. Desenvolvida com tecnologias modernas para edge computing via Cloudflare Workers.

---

## 🚀 Funcionalidades Implementadas

### Plataforma Pública
- ✅ **Home** — Hero com evento em destaque, eventos ao vivo, highlights, canais em destaque
- ✅ **Explorar** — Grid de esportes, filtros, barra de busca
- ✅ **Ao Vivo** — Listagem de todos os eventos em transmissão
- ✅ **Highlights** — Galeria de vídeos com filtros e ordenação
- ✅ **Login** — Autenticação com email/senha e OAuth social (Google, Facebook, Apple)
- ✅ **Cadastro** — Registro com seleção de esportes favoritos
- ✅ **404** — Página de erro personalizada

### Player de Streaming
- ✅ **Player Customizado** — Controles personalizados com HTML5 Video API
- ✅ **Pre-roll Ads** — Anúncios antes do vídeo com countdown e botão "Pular"
- ✅ **Overlay Ads** — Anúncios sobrepostos durante a transmissão
- ✅ **Mid-roll Ads** — Banners de anúncios integrados
- ✅ **Controle de Qualidade** — Seletor 1080p/720p/480p/Auto
- ✅ **Velocidade de Reprodução** — 0.5x até 2x
- ✅ **Fullscreen** — Suporte completo
- ✅ **Barra de Progresso** — Interativa

### Chat ao Vivo
- ✅ **Chat em Tempo Real** — Simulação com mensagens automáticas
- ✅ **Super Chat** — Sistema de super doações
- ✅ **Contagem de Espectadores** — Exibição ao vivo

### Dashboard do Criador
- ✅ **Analytics** — Views, receita, espectadores, tempo médio
- ✅ **Gráficos** — Visualizações por hora e receita por dia
- ✅ **Transmissões Recentes** — Histórico com métricas
- ✅ **Ações Rápidas** — Nova transmissão, upload, monetização

### Dashboard Administrativo
- ✅ **KPIs Globais** — Receita, usuários, views, eventos ao vivo
- ✅ **Gestão de Campanhas** — Tabela com CTR, CPM, orçamento
- ✅ **Receita por Tipo de Ad** — Breakdown: Pre-roll, Mid-roll, Banner, Overlay
- ✅ **Eventos Ao Vivo** — Monitoramento em tempo real
- ✅ **Usuários Recentes** — Lista com plano de assinatura

### Sistema de Anúncios
- ✅ **Pre-roll Video Ads** — Antes de cada vídeo com skip
- ✅ **Mid-roll Video Ads** — Durante transmissões
- ✅ **Overlay Ads** — Banner sobrepostos com dismiss
- ✅ **Display Banners** — Integrados nas páginas
- ✅ **Sponsored Strips** — Barras de patrocínio
- ✅ **Ad Tracking API** — Impressões e cliques rastreados

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Framework | Hono.js (Edge) |
| Runtime | Cloudflare Workers/Pages |
| Frontend | HTML/CSS/JS via JSX + Hono |
| Tipagem | TypeScript |
| Build | Vite + @hono/vite-build |
| Estilos | CSS custom (design system próprio) |
| Deploy | Wrangler CLI |

---

## 📋 Rotas da Aplicação

### Páginas
| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/explorar` | Explorar esportes |
| `/ao-vivo` | Eventos ao vivo |
| `/highlights` | Highlights e vídeos |
| `/evento/:id` | Página de evento + player ao vivo |
| `/video/:id` | Player de vídeo/highlight |
| `/login` | Autenticação |
| `/cadastro` | Cadastro |
| `/criador` | Dashboard do criador |
| `/admin` | Dashboard administrativo |
| `/esportes` | Todos os esportes |

### API REST (`/api`)
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/health` | GET | Status da API |
| `/api/events` | GET | Lista de eventos |
| `/api/events/live` | GET | Eventos ao vivo |
| `/api/events/upcoming` | GET | Próximos eventos |
| `/api/events/:id` | GET | Evento por ID |
| `/api/videos` | GET | Vídeos/highlights |
| `/api/videos/:id` | GET | Vídeo por ID |
| `/api/sports` | GET | Lista de esportes |
| `/api/channels` | GET | Lista de canais |
| `/api/ads/serve` | GET | Servir anúncio |
| `/api/ads/track` | POST | Rastrear impressão |
| `/api/ads/click` | POST | Rastrear clique |
| `/api/analytics/overview` | GET | Analytics gerais |
| `/api/analytics/creator/:id` | GET | Analytics do criador |
| `/api/auth/login` | POST | Login |
| `/api/auth/register` | POST | Cadastro |
| `/api/admin/stats` | GET | Stats admin |
| `/api/admin/campaigns` | GET | Campanhas |
| `/api/search` | GET | Busca global |

---

## 🎨 Design System

| Elemento | Valor |
|----------|-------|
| Cor Principal | `#ef4444` (Vermelho) |
| Background | `#080808` (Preto profundo) |
| Cards | `#111111` |
| Fonte | Inter (Google Fonts) |
| Border-radius Cards | `12px` |
| Animações | CSS keyframes + transitions |

---

## 💰 Monetização — Tipos de Anúncios

| Tipo | Posição | Duração/Tamanho |
|------|---------|-----------------|
| Pre-roll | Antes do vídeo | 30s (skip após 5s) |
| Mid-roll | Durante transmissão | Banner fixo |
| Overlay | Sobre o player | Dismissível |
| Display Banner | Em páginas | 728x90 |
| Sponsored Strip | Topo/rodapé | Full-width |

---

## 🚀 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Build
npm run build

# Iniciar com PM2
pm2 start ecosystem.config.cjs

# Ou rodar diretamente
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

---

## 📦 Estrutura do Projeto

```
webapp/
├── src/
│   ├── index.tsx          # Roteador principal + todas as rotas
│   ├── routes/
│   │   └── api.ts         # Backend API REST
│   ├── pages/
│   │   ├── HomePage.tsx   # Home com hero, eventos, highlights
│   │   ├── ExplorePage.tsx
│   │   ├── HighlightsPage.tsx
│   │   ├── LiveEventPage.tsx  # Player ao vivo + chat
│   │   ├── VideoPlayerPage.tsx # Player de vídeo + ads
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── creator/
│   │   │   └── CreatorDashboard.tsx
│   │   └── admin/
│   │       └── AdminDashboard.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── cards/
│   │   │   ├── EventCard.tsx
│   │   │   └── VideoCard.tsx
│   │   └── ads/
│   │       └── AdBanner.tsx
│   ├── data/
│   │   └── mockData.ts    # Dados mock completos
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces
│   └── lib/
│       └── utils.ts       # Funções utilitárias
├── public/
│   └── static/
│       └── style.css      # CSS global + design system
├── wrangler.jsonc         # Cloudflare config
├── vite.config.ts         # Build config
├── package.json
└── ecosystem.config.cjs   # PM2 config
```

---

## 📊 Deployment Status

- **Plataforma**: Cloudflare Pages/Workers
- **Status**: ✅ Funcional (build passa, todas as rotas OK)
- **Build**: 189KB (minificado)
- **Páginas**: 10+ páginas completas
- **APIs**: 20+ endpoints REST

---

## Backend + base de dados com Docker

```bash
# Sobe Postgres + API local
npm run docker:up

# Testa a API
curl http://localhost:4000/api/health
curl http://localhost:4000/api/events/live

# Ver logs do backend
npm run docker:logs

# Parar containers
npm run docker:down
```

Servicos locais:

| Servico | URL |
|---------|-----|
| API Hono/Node | `http://localhost:4000/api` |
| Postgres | `localhost:5433` |

Credenciais da base de dados:

| Variavel | Valor |
|----------|-------|
| `POSTGRES_DB` | `sportplus` |
| `POSTGRES_USER` | `sportplus` |
| `POSTGRES_PASSWORD` | `sportplus` |
| `DATABASE_URL` | `postgres://sportplus:sportplus@localhost:5433/sportplus` |

Credencial admin para teste local:

| Campo | Valor |
|-------|-------|
| Email | `admin@sportplus.test` |
| Senha | `Admin@123` |

Credenciais de utilizadores demo:

| Email | Senha |
|-------|-------|
| `carlos@sport.com` | `User@123` |
| `ana@sport.com` | `User@123` |
| `joao@sport.com` | `User@123` |

Os scripts SQL em `backend/db/init/` criam as tabelas e dados de teste na primeira subida do volume Docker. Para recriar a base do zero:

```bash
docker compose down -v
npm run docker:up
```

*SPORT+ v1.0 — Desenvolvido com Hono + Cloudflare Workers*
#   s p o r t p l u s  
 #   s p o r t p l u s _  
 