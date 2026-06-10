import { ApiClient, resolveApiBaseUrl } from '../api/client'
import { highlights, liveEvents, mockChannels, sports, upcomingEvents } from '../data/mockData'
import { PlatformRepository, type PlatformSnapshot } from '../repositories/platformRepository'
import { normalizeEvent, normalizeGame, normalizeSnapshot, normalizeVideo } from '../services/platformService'
import type { Channel, Event, Game, PlatformStats, Sport, Video } from '../types'

export interface HomePageData {
  liveEvents: Event[]
  upcomingEvents: Event[]
  highlights: Video[]
  sports: Sport[]
  channels: Channel[]
  games: Game[]
  stats: PlatformStats
}

const fallbackGames: Game[] = [
  {
    id: 'sport_football',
    name: 'Futebol',
    slug: 'futebol',
    category: 'Jogos ao vivo',
    cover: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80',
    accentColor: '#22c55e',
    liveStreams: 12,
    viewers: 248000,
    followers: 3400000,
    isFeatured: true,
  },
  {
    id: 'sport_champions',
    name: 'Liga dos Campeoes',
    slug: 'liga-dos-campeoes',
    category: 'Futebol europeu',
    cover: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&q=80',
    accentColor: '#3b82f6',
    liveStreams: 6,
    viewers: 186000,
    followers: 2600000,
    isFeatured: true,
  },
  {
    id: 'sport_basketball',
    name: 'Basquete',
    slug: 'basquete',
    category: 'Ligas e finais',
    cover: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1600&q=80',
    accentColor: '#f97316',
    liveStreams: 8,
    viewers: 124000,
    followers: 1800000,
    isFeatured: false,
  },
]

export function getMockHomePageData(): HomePageData {
  return normalizeSnapshot({
    liveEvents,
    upcomingEvents,
    highlights,
    sports,
    channels: mockChannels,
    games: fallbackGames,
    stats: {
      liveStreams: liveEvents.length,
      activeViewers: liveEvents.reduce((sum, event) => sum + Number(event.viewers || 0), 0),
      games: fallbackGames.length,
      creators: mockChannels.length,
      totalViews: highlights.reduce((sum, video) => sum + Number(video.views || 0), 0),
    },
  } satisfies PlatformSnapshot)
}

export function getServerApiBaseUrl(env?: Record<string, string | undefined>): string {
  return resolveApiBaseUrl(env)
}

async function fetchJson<T>(baseUrl: string, endpoint: string): Promise<T | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2500)
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!response.ok) return null
    const payload = await response.json()
    return payload?.success ? payload : null
  } catch {
    return null
  }
}

function payloadData<T>(payload: { data?: T } | null, fallback: T): T {
  return payload?.data ?? fallback
}

export async function loadHomePageData(apiBaseUrl: string): Promise<HomePageData> {
  const fallback = getMockHomePageData()
  const api = new ApiClient({ baseUrl: apiBaseUrl })
  const repository = new PlatformRepository(api)
  return normalizeSnapshot(await repository.getSnapshot(fallback))
}

export async function loadEventData(apiBaseUrl: string, eventId: string): Promise<Event> {
  const payload = await fetchJson<{ data: Event }>(apiBaseUrl, `/events/${encodeURIComponent(eventId)}`)
  return normalizeEvent(payloadData(payload, [...liveEvents, ...upcomingEvents].find((event) => event.id === eventId) || liveEvents[0]))
}

export interface VideoPageData {
  video: Video
  videos: Video[]
}

export async function loadVideoPageData(apiBaseUrl: string, videoId: string): Promise<VideoPageData> {
  const [videoPayload, videosPayload] = await Promise.all([
    fetchJson<{ data: Video }>(apiBaseUrl, `/videos/${encodeURIComponent(videoId)}`),
    fetchJson<{ data: Video[] }>(apiBaseUrl, '/videos?limit=12&sort=views'),
  ])

  const fallbackVideo = highlights.find((video) => video.id === videoId) || highlights[0]
  return {
    video: normalizeVideo(payloadData(videoPayload, fallbackVideo)),
    videos: payloadData(videosPayload, highlights).map(normalizeVideo),
  }
}

export async function loadGamesData(apiBaseUrl: string): Promise<Game[]> {
  const api = new ApiClient({ baseUrl: apiBaseUrl })
  const repository = new PlatformRepository(api)
  return (await repository.getGames(getMockHomePageData().games)).map(normalizeGame)
}
