// ===========================
// SPORT+ MOCK DATA
// ===========================

import type { Sport, Event, Video, Channel, User, Ad, Campaign, ChatMessage } from '../types'

export const sports: Sport[] = [
  { id: '1', name: 'Futebol', slug: 'futebol', icon: '⚽', color: '#22c55e', liveCount: 12, totalEvents: 340 },
  { id: '2', name: 'Basquete', slug: 'basquete', icon: '🏀', color: '#f97316', liveCount: 8, totalEvents: 210 },
  { id: '3', name: 'UFC/MMA', slug: 'mma', icon: '🥊', color: '#ef4444', liveCount: 2, totalEvents: 85 },
  { id: '4', name: 'Tênis', slug: 'tenis', icon: '🎾', color: '#eab308', liveCount: 6, totalEvents: 180 },
  { id: '5', name: 'Fórmula 1', slug: 'formula1', icon: '🏎️', color: '#e11d48', liveCount: 1, totalEvents: 44 },
  { id: '6', name: 'Vôlei', slug: 'volei', icon: '🏐', color: '#3b82f6', liveCount: 4, totalEvents: 120 },
  { id: '7', name: 'Natação', slug: 'natacao', icon: '🏊', color: '#06b6d4', liveCount: 3, totalEvents: 90 },
  { id: '8', name: 'E-Sports', slug: 'esports', icon: '🎮', color: '#8b5cf6', liveCount: 15, totalEvents: 520 },
  { id: '9', name: 'Atletismo', slug: 'atletismo', icon: '🏃', color: '#d97706', liveCount: 2, totalEvents: 75 },
  { id: '10', name: 'Ciclismo', slug: 'ciclismo', icon: '🚴', color: '#10b981', liveCount: 1, totalEvents: 60 },
]

export const mockUsers: User[] = [
  { id: '1', name: 'Carlos Drummond', email: 'carlos@sport.com', role: 'creator', plan: 'premium', followersCount: 48200, followingCount: 120, createdAt: '2023-01-15', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
  { id: '2', name: 'Ana Beatriz', email: 'ana@sport.com', role: 'creator', plan: 'pro', followersCount: 22100, followingCount: 85, createdAt: '2023-03-22', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
  { id: '3', name: 'João Silva', email: 'joao@sport.com', role: 'viewer', plan: 'free', followersCount: 0, followingCount: 45, createdAt: '2024-01-10', isVerified: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao' },
]

export const mockChannels: Channel[] = [
  { id: '1', name: 'Futebol Brasil', slug: 'futebol-brasil', description: 'O melhor futebol do Brasil', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=FutebolBrasil&backgroundColor=ef4444', banner: '', owner: mockUsers[0], sport: sports[0], followersCount: 125000, isVerified: true, isLive: true, totalViews: 4200000 },
  { id: '2', name: 'NBA Highlights', slug: 'nba-highlights', description: 'Melhores momentos da NBA', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=NBAHighlights&backgroundColor=f97316', banner: '', owner: mockUsers[1], sport: sports[1], followersCount: 87000, isVerified: true, isLive: false, totalViews: 2900000 },
  { id: '3', name: 'UFC BR', slug: 'ufc-br', description: 'Tudo sobre MMA e UFC', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=UFCBR&backgroundColor=7c3aed', banner: '', owner: mockUsers[0], sport: sports[2], followersCount: 63000, isVerified: true, isLive: true, totalViews: 1800000 },
  { id: '4', name: 'Tennis World', slug: 'tennis-world', description: 'Tênis mundial ao vivo', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=TennisWorld&backgroundColor=eab308', banner: '', owner: mockUsers[1], sport: sports[3], followersCount: 41000, isVerified: false, isLive: false, totalViews: 980000 },
  { id: '5', name: 'F1 Nation', slug: 'f1-nation', description: 'Fórmula 1 em alta velocidade', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=F1Nation&backgroundColor=e11d48', banner: '', owner: mockUsers[0], sport: sports[4], followersCount: 198000, isVerified: true, isLive: false, totalViews: 8100000 },
  { id: '6', name: 'E-Sports Arena', slug: 'esports-arena', description: 'O maior canal de e-sports do Brasil', avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=ESportsArena&backgroundColor=8b5cf6', banner: '', owner: mockUsers[1], sport: sports[7], followersCount: 312000, isVerified: true, isLive: true, totalViews: 12500000 },
]

export const liveEvents: Event[] = [
  {
    id: '1',
    title: 'Flamengo vs Palmeiras - Brasileirão 2024',
    description: 'Clássico nacional pela 30ª rodada do Campeonato Brasileiro',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    streamUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    sport: sports[0],
    channel: mockChannels[0],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 48320,
    likes: 12400,
    views: 248000,
    tags: ['brasileirao', 'flamengo', 'palmeiras', 'futebol'],
    isFeatured: true,
    isPremium: false,
    teams: {
      home: { name: 'Flamengo', logo: '🔴', score: 2 },
      away: { name: 'Palmeiras', logo: '🟢', score: 1 }
    }
  },
  {
    id: '2',
    title: 'UFC 300 - Campeonato Peso Mosca',
    description: 'Disputa do cinturão peso mosca com dois campeões invictos',
    thumbnail: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    sport: sports[2],
    channel: mockChannels[2],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 31200,
    likes: 8900,
    views: 89000,
    tags: ['ufc', 'mma', 'luta', 'campeonato'],
    isFeatured: true,
    isPremium: false,
    teams: {
      home: { name: 'Alexandre Pantoja', logo: '🇧🇷', score: undefined },
      away: { name: 'Brandon Royval', logo: '🇺🇸', score: undefined }
    }
  },
  {
    id: '3',
    title: 'CS2 Major - Grand Final',
    description: 'Grande final do CS2 Major com as melhores equipes do mundo',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    streamUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8',
    sport: sports[7],
    channel: mockChannels[5],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 127500,
    likes: 42100,
    views: 890000,
    tags: ['cs2', 'esports', 'major', 'gaming'],
    isFeatured: true,
    isPremium: false,
    teams: {
      home: { name: 'FURIA', logo: '🐆', score: 14 },
      away: { name: 'Natus Vincere', logo: '⚡', score: 11 }
    }
  },
  {
    id: '4',
    title: 'NBA Finals - Game 7',
    description: 'Jogo decisivo das Finais da NBA - Boston Celtics vs Golden State Warriors',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    streamUrl: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
    sport: sports[1],
    channel: mockChannels[1],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 89400,
    likes: 28700,
    views: 412000,
    tags: ['nba', 'basquete', 'finals', 'game7'],
    isFeatured: false,
    isPremium: true,
    teams: {
      home: { name: 'Boston Celtics', logo: '🍀', score: 102 },
      away: { name: 'Golden State', logo: '⭐', score: 98 }
    }
  },
  {
    id: '5',
    title: 'Gran Premio de Mônaco - F1 2024',
    description: 'A corrida mais famosa da Fórmula 1 pelas ruas de Mônaco',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    streamUrl: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
    sport: sports[4],
    channel: mockChannels[4],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 204000,
    likes: 91200,
    views: 1800000,
    tags: ['f1', 'formula1', 'monaco', 'gp'],
    isFeatured: true,
    isPremium: false,
  },
  {
    id: '6',
    title: 'Wimbledon - Semifinal Masculina',
    description: 'Semifinal de Wimbledon com jogadores top 3 do ranking mundial',
    thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    streamUrl: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8',
    sport: sports[3],
    channel: mockChannels[3],
    status: 'live',
    startTime: new Date().toISOString(),
    viewers: 42800,
    likes: 11300,
    views: 187000,
    tags: ['wimbledon', 'tenis', 'grandslan'],
    isFeatured: false,
    isPremium: true,
    teams: {
      home: { name: 'Carlos Alcaraz', logo: '🇪🇸', score: 2 },
      away: { name: 'Jannik Sinner', logo: '🇮🇹', score: 1 }
    }
  },
]

export const upcomingEvents: Event[] = [
  {
    id: '7',
    title: 'Copa Libertadores - Final',
    description: 'Final da Libertadores da América entre os melhores clubes do continente',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    streamUrl: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multichannel_subs.m3u8',
    sport: sports[0],
    channel: mockChannels[0],
    status: 'upcoming',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    viewers: 0,
    likes: 4500,
    views: 0,
    tags: ['libertadores', 'final', 'futebol'],
    isFeatured: true,
    isPremium: false,
  },
  {
    id: '8',
    title: 'Volta a Portugal em Bicicleta',
    description: 'Etapa decisiva da Volta a Portugal',
    thumbnail: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
    streamUrl: 'http://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=m3u8-aapl)',
    sport: sports[9],
    channel: mockChannels[0],
    status: 'upcoming',
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    viewers: 0,
    likes: 890,
    views: 0,
    tags: ['ciclismo', 'volta', 'portugal'],
    isFeatured: false,
    isPremium: false,
  },
]

export const highlights: Video[] = [
  {
    id: '1',
    title: 'Melhores Gols da Semana - Brasileirão',
    description: 'Os 10 gols mais bonitos da semana no Campeonato Brasileiro',
    thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc595d7408?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 485,
    views: 1240000,
    likes: 48200,
    sport: sports[0],
    channel: mockChannels[0],
    type: 'highlight',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['gols', 'brasileirao', 'melhores', 'semana']
  },
  {
    id: '2',
    title: 'Nocautes Impossíveis - UFC 2024',
    description: 'Os knockouts mais brutais do UFC em 2024',
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 312,
    views: 890000,
    likes: 36700,
    sport: sports[2],
    channel: mockChannels[2],
    type: 'highlight',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['ufc', 'nocaute', 'ko', 'mma']
  },
  {
    id: '3',
    title: 'LeBron James - Top 10 Plays All-Time',
    description: 'As 10 jogadas mais incríveis da carreira de LeBron James',
    thumbnail: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 720,
    views: 4200000,
    likes: 182000,
    sport: sports[1],
    channel: mockChannels[1],
    type: 'highlight',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['lebron', 'nba', 'top10', 'basquete']
  },
  {
    id: '4',
    title: 'Verstappen - Overtakes Impossíveis 2024',
    description: 'As ultrapassagens mais arriscadas de Max Verstappen na temporada',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 540,
    views: 3100000,
    likes: 124000,
    sport: sports[4],
    channel: mockChannels[4],
    type: 'highlight',
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['verstappen', 'f1', 'formula1', 'ultrapassagem']
  },
  {
    id: '5',
    title: 'FURIA - Clutches Impossíveis CS2',
    description: 'Os melhores clutches da FURIA no CS2 Major',
    thumbnail: 'https://images.unsplash.com/photo-1606318313647-17e72e977753?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration: 290,
    views: 780000,
    likes: 42100,
    sport: sports[7],
    channel: mockChannels[5],
    type: 'clip',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ['furia', 'cs2', 'clutch', 'esports']
  },
  {
    id: '6',
    title: 'Alcaraz vs Djokovic - Melhores Pontos',
    description: 'Os pontos mais disputados do épico confronto em Roland Garros',
    thumbnail: 'https://images.unsplash.com/photo-1593766788306-28561086694e?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: 620,
    views: 1900000,
    likes: 78400,
    sport: sports[3],
    channel: mockChannels[3],
    type: 'highlight',
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['alcaraz', 'djokovic', 'tenis', 'rolandgarros']
  },
]

export const mockAds: Ad[] = [
  {
    id: '1',
    type: 'pre-roll',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    clickUrl: 'https://example.com/ad1',
    duration: 30,
    advertiser: 'Betano Sports',
    skipAfter: 5
  },
  {
    id: '2',
    type: 'overlay',
    imageUrl: 'https://via.placeholder.com/728x90/ef4444/ffffff?text=SPORTSBETS+-+Aposte+Agora',
    clickUrl: 'https://example.com/ad2',
    advertiser: 'SportsBets',
    sport: 'futebol'
  },
  {
    id: '3',
    type: 'banner',
    imageUrl: 'https://via.placeholder.com/300x250/1a1a2e/ef4444?text=RedBull+Energy',
    clickUrl: 'https://example.com/ad3',
    advertiser: 'Red Bull',
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campanha Betano Q4 2024',
    advertiser: 'Betano',
    budget: 50000,
    spent: 32400,
    impressions: 1240000,
    clicks: 24800,
    ctr: 2.0,
    cpm: 26.13,
    status: 'active',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    targetSports: ['futebol', 'basquete'],
    targetCountries: ['BR', 'PT']
  },
  {
    id: '2',
    name: 'Red Bull - Esportes Radicais',
    advertiser: 'Red Bull',
    budget: 30000,
    spent: 18900,
    impressions: 890000,
    clicks: 13350,
    ctr: 1.5,
    cpm: 21.24,
    status: 'active',
    startDate: '2024-09-01',
    endDate: '2024-11-30',
    targetSports: ['mma', 'formula1'],
    targetCountries: ['BR', 'AR', 'CO']
  },
  {
    id: '3',
    name: 'Nike - Just Do It Sports',
    advertiser: 'Nike',
    budget: 75000,
    spent: 75000,
    impressions: 3100000,
    clicks: 62000,
    ctr: 2.0,
    cpm: 24.19,
    status: 'ended',
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    targetSports: ['futebol', 'atletismo', 'tenis'],
    targetCountries: ['BR']
  },
]

export const chatMessages: ChatMessage[] = [
  { id: '1', user: { id: '1', name: 'Pedro F.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', isVerified: false }, content: 'QUE GOLAÇO!!! 🔥🔥🔥', timestamp: new Date(Date.now() - 30000).toISOString(), type: 'message' },
  { id: '2', user: { id: '2', name: 'Ana P.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaP', isVerified: true }, content: 'Palmeiras vai ganhar esse jogo! 💪', timestamp: new Date(Date.now() - 25000).toISOString(), type: 'message' },
  { id: '3', user: { id: '3', name: 'Lucas M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', isVerified: false }, content: 'MENGÃO RAÇA PURA! ❤️🖤', timestamp: new Date(Date.now() - 20000).toISOString(), type: 'message' },
  { id: '4', user: { id: '4', name: 'SuperFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Super', isVerified: false }, content: 'Super Chat R$50 - Esse jogo tá incrível! Obrigado pela transmissão!', timestamp: new Date(Date.now() - 15000).toISOString(), type: 'superchat', amount: 50 },
  { id: '5', user: { id: '5', name: 'João V.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao', isVerified: false }, content: 'Alguém viu aquele pênalti? Absurdo!', timestamp: new Date(Date.now() - 10000).toISOString(), type: 'message' },
  { id: '6', user: { id: '6', name: 'SportFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sport', isVerified: false }, content: 'Melhor jogo do ano com certeza 👏', timestamp: new Date(Date.now() - 5000).toISOString(), type: 'message' },
  { id: '7', user: { id: '7', name: 'Carlos E.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', isVerified: true }, content: 'Arbitragem precisava ter apitado falta ali!', timestamp: new Date().toISOString(), type: 'message' },
]

export const analyticsData = {
  today: { views: 48240, revenue: 2840.50, viewers: 12400, watchTime: 3.2 },
  week: { views: 312000, revenue: 18420.00, viewers: 48700, watchTime: 3.8 },
  month: { views: 1240000, revenue: 74800.00, viewers: 187000, watchTime: 4.1 },
  viewsByHour: [
    { hour: '00h', views: 1200 }, { hour: '01h', views: 890 }, { hour: '02h', views: 620 },
    { hour: '03h', views: 410 }, { hour: '04h', views: 280 }, { hour: '05h', views: 320 },
    { hour: '06h', views: 890 }, { hour: '07h', views: 1800 }, { hour: '08h', views: 2400 },
    { hour: '09h', views: 3200 }, { hour: '10h', views: 4100 }, { hour: '11h', views: 5200 },
    { hour: '12h', views: 7800 }, { hour: '13h', views: 6900 }, { hour: '14h', views: 5800 },
    { hour: '15h', views: 6400 }, { hour: '16h', views: 7200 }, { hour: '17h', views: 9100 },
    { hour: '18h', views: 12400 }, { hour: '19h', views: 15800 }, { hour: '20h', views: 18200 },
    { hour: '21h', views: 16400 }, { hour: '22h', views: 12100 }, { hour: '23h', views: 8200 },
  ],
  revenueByDay: [
    { date: 'Seg', revenue: 2100 }, { date: 'Ter', revenue: 2450 }, { date: 'Qua', revenue: 2200 },
    { date: 'Qui', revenue: 2890 }, { date: 'Sex', revenue: 3400 }, { date: 'Sáb', revenue: 4100 },
    { date: 'Dom', revenue: 3800 },
  ]
}
