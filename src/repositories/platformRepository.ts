import { ApiClient } from '../api/client'
import type { Channel, Event, Game, PlatformStats, Sport, Video } from '../types'

export interface PlatformSnapshot {
  liveEvents: Event[]
  upcomingEvents: Event[]
  highlights: Video[]
  sports: Sport[]
  channels: Channel[]
  games: Game[]
  stats: PlatformStats
}

export class PlatformRepository {
  constructor(private readonly api: ApiClient) {}

  async getSnapshot(fallback: PlatformSnapshot): Promise<PlatformSnapshot> {
    const [liveEvents, upcomingEvents, highlights, sports, channels, games, stats] = await Promise.all([
      this.api.get<Event[]>('/events/live', fallback.liveEvents),
      this.api.get<Event[]>('/events/upcoming', fallback.upcomingEvents),
      this.api.get<Video[]>('/videos?limit=12&sort=views', fallback.highlights),
      this.api.get<Sport[]>('/sports', fallback.sports),
      this.api.get<Channel[]>('/channels', fallback.channels),
      this.api.get<Game[]>('/sports-catalog/trending', fallback.games),
      this.api.get<PlatformStats>('/platform/stats', fallback.stats),
    ])

    return { liveEvents, upcomingEvents, highlights, sports, channels, games, stats }
  }

  async getGames(fallback: Game[]): Promise<Game[]> {
    return this.api.get<Game[]>('/sports-catalog', fallback)
  }
}
