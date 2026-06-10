import { randomUUID } from 'node:crypto'

export const ok = (c, { data = null, message = 'Operation completed successfully', status = 200, meta } = {}) =>
  c.json({
    success: true,
    message,
    data,
    errors: [],
    ...(meta ? { meta } : {}),
  }, status)

export const fail = (c, { message = 'Request failed', status = 400, errors = [] } = {}) =>
  c.json({
    success: false,
    message,
    data: null,
    errors: Array.isArray(errors) ? errors : [errors],
  }, status)

export const requestContext = async (c, next) => {
  const startedAt = Date.now()
  const requestId = c.req.header('x-request-id') || randomUUID()
  c.set('requestId', requestId)
  c.header('x-request-id', requestId)

  await next()

  const durationMs = Date.now() - startedAt
  c.header('x-response-time', `${durationMs}ms`)

  const log = {
    requestId,
    method: c.req.method,
    path: new URL(c.req.url).pathname,
    status: c.res.status,
    durationMs,
  }
  const level = c.res.status >= 500 ? 'error' : c.res.status >= 400 ? 'warn' : 'info'
  console[level === 'error' ? 'error' : 'log'](JSON.stringify({ level, ...log }))
}

export const createRateLimiter = ({ windowMs = 60_000, max = 240 } = {}) => {
  const hits = new Map()

  return async (c, next) => {
    const path = new URL(c.req.url).pathname
    if (path.endsWith('/health')) {
      await next()
      return
    }

    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'local'
    const key = `${ip}:${path}`
    const now = Date.now()
    const current = hits.get(key)

    if (!current || current.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      await next()
      return
    }

    current.count += 1
    if (current.count > max) {
      c.header('retry-after', String(Math.ceil((current.resetAt - now) / 1000)))
      return fail(c, { status: 429, message: 'Too many requests', errors: ['rate_limit_exceeded'] })
    }

    await next()
  }
}

export const getJsonBody = async (c) => {
  const body = await c.req.json().catch(() => null)
  return body && typeof body === 'object' && !Array.isArray(body) ? body : {}
}
