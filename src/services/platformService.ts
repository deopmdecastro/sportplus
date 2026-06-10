import type { PlatformSnapshot } from '../repositories/platformRepository'
import type { Channel, Event, Game, PlatformStats, Sport, Video } from '../types'

const iconMap: Record<string, string> = {
  esports: '🎮',
  game: '🎮',
  futebol: '⚽',
  bola: '⚽',
  basquete: '🏀',
  cesto: '🏀',
  mma: '🥊',
  luta: '🥊',
  formula1: '🏎️',
  carro: '🏎️',
  tenis: '🎾',
  raquete: '🎾',
  ciclismo: '🚴',
  bike: '🚴',
}

export const fallbackGameCover = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80'

export function normalizeSport(sport: Sport): Sport {
  if (!sport) return sport
  const key = String(sport.icon || sport.slug || sport.name || '').toLowerCase()
  return { ...sport, icon: iconMap[key] || sport.icon || '🎮' }
}

export function normalizeChannel(channel: Channel): Channel {
  if (!channel) return channel
  return {
    ...channel,
    avatar: channel.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(channel.name || channel.id || 'sportplus')}`,
    sport: normalizeSport(channel.sport),
  }
}

export function normalizeEvent(event: Event): Event {
  if (!event) return event
  return {
    ...event,
    thumbnail: event.thumbnail || fallbackGameCover,
    sport: normalizeSport(event.sport),
    channel: normalizeChannel(event.channel),
  }
}

export function normalizeVideo(video: Video): Video {
  if (!video) return video
  return {
    ...video,
    thumbnail: video.thumbnail || fallbackGameCover,
    sport: normalizeSport(video.sport),
    channel: normalizeChannel(video.channel),
  }
}

export function normalizeGame(game: Game): Game {
  return {
    ...game,
    cover: game.cover || fallbackGameCover,
    heroImage: game.heroImage || game.cover || fallbackGameCover,
    accentColor: game.accentColor || '#ef4444',
    liveStreams: Number(game.liveStreams || 0),
    viewers: Number(game.viewers || 0),
    followers: Number(game.followers || 0),
  }
}

export function normalizeStats(stats: PlatformStats): PlatformStats {
  return {
    liveStreams: Number(stats.liveStreams || 0),
    activeViewers: Number(stats.activeViewers || 0),
    games: Number(stats.games || 0),
    creators: Number(stats.creators || 0),
    totalViews: Number(stats.totalViews || 0),
  }
}

export function normalizeSnapshot(snapshot: PlatformSnapshot): PlatformSnapshot {
  return {
    liveEvents: snapshot.liveEvents.map(normalizeEvent),
    upcomingEvents: snapshot.upcomingEvents.map(normalizeEvent),
    highlights: snapshot.highlights.map(normalizeVideo),
    sports: snapshot.sports.map(normalizeSport),
    channels: snapshot.channels.map(normalizeChannel),
    games: snapshot.games.map(normalizeGame),
    stats: normalizeStats(snapshot.stats),
  }
}
