import type { Channel, Event, Sport, Video } from '../types'
import { highlights, liveEvents, mockChannels, sports, upcomingEvents } from '../data/mockData'

const sportIconMap: Record<string, string> = {
  atletismo: '🏃',
  basquete: '🏀',
  bike: '🚴',
  bola: '⚽',
  carro: '🏎️',
  cesto: '🏀',
  ciclismo: '🚴',
  esports: '🎮',
  formula1: '🏎️',
  futebol: '⚽',
  game: '🎮',
  luta: '🥊',
  mma: '🥊',
  natacao: '🏊',
  raquete: '🎾',
  tenis: '🎾',
  ufc: '🥊',
  volei: '🏐',
}

const fallbackEventImage = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80'
const fallbackVideoImage = 'https://images.unsplash.com/photo-1551958219-acbc595d7408?w=1200&q=80'

export interface HomePageData {
  liveEvents: Event[]
  upcomingEvents: Event[]
  highlights: Video[]
  sports: Sport[]
  channels: Channel[]
}

function normalizeSport(sport: Sport): Sport {
  if (!sport) return sport
  const iconKey = String(sport.icon || sport.slug || sport.name || '').toLowerCase()
  return {
    ...sport,
    icon: sportIconMap[iconKey] || sport.icon || '🏆',
  }
}

function normalizeChannel(channel: Channel): Channel {
  if (!channel) return channel
  return {
    ...channel,
    avatar: channel.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(channel.name || channel.id || 'sportplus')}`,
    sport: normalizeSport(channel.sport),
  }
}

function normalizeEvent(event: Event): Event {
  if (!event) return event
  return {
    ...event,
    thumbnail: event.thumbnail || fallbackEventImage,
    sport: normalizeSport(event.sport),
    channel: normalizeChannel(event.channel),
  }
}

function normalizeVideo(video: Video): Video {
  if (!video) return video
  return {
    ...video,
    thumbnail: video.thumbnail || fallbackVideoImage,
    sport: normalizeSport(video.sport),
    channel: normalizeChannel(video.channel),
  }
}

function normalizeHomePageData(data: HomePageData): HomePageData {
  return {
    liveEvents: data.liveEvents.map(normalizeEvent),
    upcomingEvents: data.upcomingEvents.map(normalizeEvent),
    highlights: data.highlights.map(normalizeVideo),
    sports: data.sports.map(normalizeSport),
    channels: data.channels.map(normalizeChannel),
  }
}

export function getMockHomePageData(): HomePageData {
  return normalizeHomePageData({
    liveEvents,
    upcomingEvents,
    highlights,
    sports,
    channels: mockChannels,
  })
}

export function getServerApiBaseUrl(env?: Record<string, string | undefined>): string {
  return env?.SPORTPLUS_API_BASE
    || import.meta.env.SPORTPLUS_API_BASE
    || import.meta.env.VITE_SPORTPLUS_API_BASE
    || 'http://localhost:4000/api'
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
  const [livePayload, upcomingPayload, videosPayload, sportsPayload, channelsPayload] = await Promise.all([
    fetchJson<{ data: Event[] }>(apiBaseUrl, '/events/live'),
    fetchJson<{ data: Event[] }>(apiBaseUrl, '/events/upcoming'),
    fetchJson<{ data: Video[] }>(apiBaseUrl, '/videos?limit=12&sort=views'),
    fetchJson<{ data: Sport[] }>(apiBaseUrl, '/sports'),
    fetchJson<{ data: Channel[] }>(apiBaseUrl, '/channels'),
  ])

  return normalizeHomePageData({
    liveEvents: payloadData(livePayload, fallback.liveEvents),
    upcomingEvents: payloadData(upcomingPayload, fallback.upcomingEvents),
    highlights: payloadData(videosPayload, fallback.highlights),
    sports: payloadData(sportsPayload, fallback.sports),
    channels: payloadData(channelsPayload, fallback.channels),
  })
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
