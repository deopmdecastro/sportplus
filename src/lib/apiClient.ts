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
    id: 'game_valorant',
    name: 'Valorant',
    slug: 'valorant',
    category: 'Tactical FPS',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80',
    accentColor: '#ff4655',
    liveStreams: 42,
    viewers: 184000,
    followers: 2200000,
    isFeatured: true,
  },
  {
    id: 'game_fortnite',
    name: 'Fortnite',
    slug: 'fortnite',
    category: 'Battle Royale',
    cover: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80',
    accentColor: '#7c3aed',
    liveStreams: 37,
    viewers: 142000,
    followers: 3100000,
    isFeatured: true,
  },
  {
    id: 'game_cs2',
    name: 'Counter-Strike 2',
    slug: 'counter-strike-2',
    category: 'FPS',
    cover: 'https://images.unsplash.com/photo-1606318313647-17e72e977753?w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1600&q=80',
    accentColor: '#f59e0b',
    liveStreams: 58,
    viewers: 212000,
    followers: 2800000,
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
