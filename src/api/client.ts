export interface ApiClientOptions {
  baseUrl?: string
  timeoutMs?: number
  retries?: number
  headers?: Record<string, string>
}

export interface ApiResult<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

const defaultTimeoutMs = 3500

export function resolveApiBaseUrl(env?: Record<string, string | undefined>) {
  return env?.SPORTPLUS_API_BASE
    || import.meta.env.SPORTPLUS_API_BASE
    || import.meta.env.VITE_SPORTPLUS_API_BASE
    || 'http://localhost:4000/api'
}

export class ApiClient {
  private baseUrl: string
  private timeoutMs: number
  private retries: number
  private headers: Record<string, string>

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = (options.baseUrl || resolveApiBaseUrl()).replace(/\/$/, '')
    this.timeoutMs = options.timeoutMs || defaultTimeoutMs
    this.retries = options.retries ?? 1
    this.headers = options.headers || {}
  }

  async get<T>(endpoint: string, fallback: T): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, fallback)
  }

  async post<T>(endpoint: string, body: unknown, fallback: T): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }, fallback)
  }

  private async request<T>(endpoint: string, init: RequestInit, fallback: T): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
    let lastError: unknown = null

    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

      try {
        const response = await fetch(url, {
          ...init,
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            ...this.headers,
            ...(init.headers || {}),
          },
        })
        clearTimeout(timeout)

        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`)
          continue
        }

        const payload = await response.json() as Partial<ApiResult<T>>
        if (payload?.success === false) {
          lastError = new Error(payload.message || 'API request failed')
          continue
        }

        return (payload.data ?? payload) as T
      } catch (error) {
        clearTimeout(timeout)
        lastError = error
      }
    }

    console.warn('[sportplus-api] fallback used', endpoint, lastError)
    return fallback
  }
}
