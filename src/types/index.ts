// ===========================
// sportplus TYPE DEFINITIONS
// ===========================

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'viewer' | 'creator' | 'admin'
  plan: 'free' | 'pro' | 'premium'
  followersCount: number
  followingCount: number
  createdAt: string
  isVerified: boolean
}

export interface Sport {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  liveCount: number
  totalEvents: number
}

export interface Channel {
  id: string
  name: string
  slug: string
  description: string
  avatar: string
  banner: string
  owner: User
  sport: Sport
  followersCount: number
  isVerified: boolean
  isLive: boolean
  totalViews: number
}

export interface Event {
  id: string
  title: string
  description: string
  thumbnail: string
  sport: Sport
  channel: Channel
  status: 'live' | 'upcoming' | 'ended' | 'replay'
  startTime: string
  endTime?: string
  viewers: number
  likes: number
  views: number
  tags: string[]
  streamUrl?: string
  streamServers?: { id?: string; name: string; url: string }[]
  isFeatured: boolean
  isPremium: boolean
  teams?: { home: TeamInfo; away: TeamInfo }
}

export interface TeamInfo {
  name: string
  logo: string
  score?: number
}

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  views: number
  likes: number
  sport: Sport
  channel: Channel
  type: 'highlight' | 'replay' | 'clip' | 'documentary'
  publishedAt: string
  tags: string[]
}

export interface Ad {
  id: string
  type: 'pre-roll' | 'mid-roll' | 'overlay' | 'banner' | 'display'
  videoUrl?: string
  imageUrl?: string
  clickUrl: string
  duration?: number
  advertiser: string
  sport?: string
  skipAfter?: number
}

export interface ChatMessage {
  id: string
  user: Pick<User, 'id' | 'name' | 'avatar' | 'isVerified'>
  content: string
  timestamp: string
  type: 'message' | 'superchat' | 'system'
  amount?: number
}

export interface Analytics {
  totalViews: number
  totalRevenue: number
  activeViewers: number
  avgWatchTime: number
  ctr: number
  rpm: number
  topContent: Video[]
  viewsByHour: { hour: string; views: number }[]
  revenueByDay: { date: string; revenue: number }[]
}

export interface Campaign {
  id: string
  name: string
  advertiser: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  ctr: number
  cpm: number
  status: 'active' | 'paused' | 'ended' | 'scheduled'
  startDate: string
  endDate: string
  targetSports: string[]
  targetCountries: string[]
}

export interface Game {
  id: string
  name: string
  slug: string
  category: string
  cover: string
  heroImage: string
  accentColor: string
  liveStreams: number
  viewers: number
  followers: number
  isFeatured: boolean
}

export interface PlatformStats {
  liveStreams: number
  activeViewers: number
  games: number
  creators: number
  totalViews: number
}
