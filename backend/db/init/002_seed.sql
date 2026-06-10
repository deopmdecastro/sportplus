insert into sports (id, name, slug, icon, color, "liveCount", "totalEvents") values
  ('1', 'Futebol', 'futebol', 'bola', '#22c55e', 12, 340),
  ('2', 'Basquete', 'basquete', 'cesto', '#f97316', 8, 210),
  ('3', 'UFC/MMA', 'mma', 'luta', '#ef4444', 2, 85),
  ('4', 'Tenis', 'tenis', 'raquete', '#eab308', 6, 180),
  ('5', 'Formula 1', 'formula1', 'carro', '#e11d48', 1, 44),
  ('8', 'Volei', 'volei', 'bola', '#3b82f6', 4, 96),
  ('10', 'Ciclismo', 'ciclismo', 'bike', '#10b981', 1, 60)
on conflict (id) do nothing;

insert into games (id, name, slug, category, cover, "heroImage", "accentColor", "liveStreams", viewers, followers, "isFeatured") values
  ('sport_football', 'Futebol', 'futebol', 'Jogos ao vivo', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80', '#22c55e', 12, 248000, 3400000, true),
  ('sport_champions', 'Liga dos Campeoes', 'liga-dos-campeoes', 'Futebol europeu', 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=80', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&q=80', '#3b82f6', 6, 186000, 2600000, true),
  ('sport_basketball', 'Basquete', 'basquete', 'Ligas e finais', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80', 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1600&q=80', '#f97316', 8, 124000, 1800000, false),
  ('sport_formula_1', 'Formula 1', 'formula-1', 'Grandes premios', 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&q=80', 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=1600&q=80', '#ef4444', 4, 204000, 2100000, true),
  ('sport_ufc', 'UFC/MMA', 'ufc-mma', 'Combates ao vivo', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&q=80', 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=1600&q=80', '#dc2626', 2, 68000, 1200000, false),
  ('sport_tennis', 'Tenis', 'tenis', 'Torneios internacionais', 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=900&q=80', 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=1600&q=80', '#eab308', 5, 42800, 840000, false),
  ('sport_cycling', 'Ciclismo', 'ciclismo', 'Etapas e grandes voltas', 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=900&q=80', 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1600&q=80', '#10b981', 1, 18500, 360000, false)
on conflict (id) do nothing;

insert into users (id, name, email, role, plan, "followersCount", "followingCount", "createdAt", "isVerified", avatar) values
  ('admin', 'Admin sportplus', 'admin@sportplus.test', 'admin', 'premium', 0, 0, '2026-06-06', true, null),
  ('1', 'Carlos Drummond', 'carlos@sport.com', 'creator', 'premium', 48200, 120, '2023-01-15', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'),
  ('2', 'Ana Beatriz', 'ana@sport.com', 'creator', 'pro', 22100, 85, '2023-03-22', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'),
  ('3', 'Joao Silva', 'joao@sport.com', 'viewer', 'free', 0, 45, '2024-01-10', false, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao')
on conflict (id) do nothing;

insert into channels (id, name, slug, description, avatar, banner, owner_id, sport_id, "followersCount", "isVerified", "isLive", "totalViews") values
  ('1', 'Futebol Brasil', 'futebol-brasil', 'O melhor futebol do Brasil', 'https://api.dicebear.com/7.x/shapes/svg?seed=FutebolBrasil', '', '1', '1', 125000, true, true, 4200000),
  ('2', 'NBA Highlights', 'nba-highlights', 'Melhores momentos da NBA', 'https://api.dicebear.com/7.x/shapes/svg?seed=NBAHighlights', '', '2', '2', 87000, true, false, 2900000),
  ('3', 'UFC BR', 'ufc-br', 'Tudo sobre MMA e UFC', 'https://api.dicebear.com/7.x/shapes/svg?seed=UFCBR', '', '1', '3', 63000, true, true, 1800000),
  ('4', 'Tennis World', 'tennis-world', 'Tenis mundial ao vivo', 'https://api.dicebear.com/7.x/shapes/svg?seed=TennisWorld', '', '2', '4', 41000, false, false, 980000),
  ('5', 'F1 Nation', 'f1-nation', 'Formula 1 em alta velocidade', 'https://api.dicebear.com/7.x/shapes/svg?seed=F1Nation', '', '1', '5', 198000, true, false, 8100000),
  ('6', 'Volei Brasil', 'volei-brasil', 'Jogos, ligas e highlights de volei', 'https://api.dicebear.com/7.x/shapes/svg?seed=VoleiBrasil', '', '2', '8', 112000, true, true, 4200000)
on conflict (id) do nothing;

insert into events (id, title, description, thumbnail, sport_id, channel_id, status, "startTime", viewers, likes, views, tags, "isFeatured", "isPremium", teams) values
  ('1', 'Flamengo vs Palmeiras - Brasileirao', 'Classico nacional pelo Campeonato Brasileiro', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80', '1', '1', 'live', now(), 48320, 12400, 248000, '["brasileirao","flamengo","palmeiras","futebol"]', true, false, '{"home":{"name":"Flamengo","logo":"FLA","score":2},"away":{"name":"Palmeiras","logo":"PAL","score":1}}'),
  ('2', 'UFC 300 - Campeonato Peso Mosca', 'Disputa do cinturao peso mosca', 'https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80', '3', '3', 'live', now(), 31200, 8900, 89000, '["ufc","mma","luta"]', true, false, '{"home":{"name":"Alexandre Pantoja","logo":"BR"},"away":{"name":"Brandon Royval","logo":"US"}}'),
  ('3', 'Superliga de Volei - Final', 'Final nacional com as melhores equipas da temporada', 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80', '8', '6', 'live', now(), 76500, 22100, 390000, '["volei","final","superliga"]', true, false, '{"home":{"name":"Benfica","logo":"BEN","score":2},"away":{"name":"Sporting","logo":"SCP","score":1}}'),
  ('4', 'NBA Finals - Game 7', 'Jogo decisivo das Finais da NBA', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', '2', '2', 'live', now(), 89400, 28700, 412000, '["nba","basquete","finals"]', false, true, '{"home":{"name":"Boston Celtics","logo":"BOS","score":102},"away":{"name":"Golden State","logo":"GSW","score":98}}'),
  ('5', 'Gran Premio de Monaco - F1', 'Corrida de Formula 1 em Monaco', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', '5', '5', 'live', now(), 204000, 91200, 1800000, '["f1","formula1","monaco"]', true, false, null),
  ('7', 'Copa Libertadores - Final', 'Final da Libertadores da America', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', '1', '1', 'upcoming', now() + interval '2 hours', 0, 4500, 0, '["libertadores","final","futebol"]', true, false, null),
  ('8', 'Volta a Portugal em Bicicleta', 'Etapa decisiva da Volta a Portugal', 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', '10', '1', 'upcoming', now() + interval '4 hours', 0, 890, 0, '["ciclismo","volta","portugal"]', false, false, null)
on conflict (id) do nothing;

insert into videos (id, title, description, thumbnail, "videoUrl", duration, views, likes, sport_id, channel_id, type, "publishedAt", tags) values
  ('1', 'Melhores Gols da Semana - Brasileirao', 'Os 10 gols mais bonitos da semana', 'https://images.unsplash.com/photo-1551958219-acbc595d7408?w=800&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 485, 1240000, 48200, '1', '1', 'highlight', now() - interval '2 days', '["gols","brasileirao","melhores"]'),
  ('2', 'Nocautes Impossiveis - UFC', 'Os knockouts mais fortes do UFC', 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 312, 890000, 36700, '3', '3', 'highlight', now() - interval '1 day', '["ufc","nocaute","mma"]'),
  ('3', 'LeBron James - Top 10 Plays', 'As melhores jogadas de LeBron James', 'https://images.unsplash.com/photo-1627627256672-027a4613d028?w=800&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 720, 4200000, 182000, '2', '2', 'highlight', now() - interval '3 days', '["lebron","nba","basquete"]'),
  ('4', 'Verstappen - Overtakes Impossiveis', 'Ultrapassagens arriscadas da temporada', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 540, 3100000, 124000, '5', '5', 'highlight', now() - interval '4 days', '["verstappen","f1","formula1"]')
on conflict (id) do nothing;

insert into ads (id, type, "videoUrl", "imageUrl", "clickUrl", duration, advertiser, sport, "skipAfter") values
  ('1', 'pre-roll', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', null, 'https://example.com/ad1', 30, 'Betano Sports', null, 5),
  ('2', 'overlay', null, 'https://via.placeholder.com/728x90/ef4444/ffffff?text=SPORTSBETS', 'https://example.com/ad2', null, 'SportsBets', 'futebol', null),
  ('3', 'banner', null, 'https://via.placeholder.com/300x250/1a1a2e/ef4444?text=RedBull', 'https://example.com/ad3', null, 'Red Bull', null, null)
on conflict (id) do nothing;

insert into campaigns (id, name, advertiser, budget, spent, impressions, clicks, ctr, cpm, status, "startDate", "endDate", "targetSports", "targetCountries") values
  ('1', 'Campanha Betano Q4', 'Betano', 50000, 32400, 1240000, 24800, 2.0, 26.13, 'active', '2024-10-01', '2024-12-31', '["futebol","basquete"]', '["BR","PT"]'),
  ('2', 'Red Bull - Esportes Radicais', 'Red Bull', 30000, 18900, 890000, 13350, 1.5, 21.24, 'active', '2024-09-01', '2024-11-30', '["mma","formula1"]', '["BR","AR","CO"]'),
  ('3', 'Nike - Just Do It Sports', 'Nike', 75000, 75000, 3100000, 62000, 2.0, 24.19, 'ended', '2024-06-01', '2024-09-30', '["futebol","atletismo","tenis"]', '["BR"]')
on conflict (id) do nothing;
