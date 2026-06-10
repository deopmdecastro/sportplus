import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS || 30_000),
  connectionTimeoutMillis: Number(process.env.PG_CONNECTION_TIMEOUT_MS || 5_000),
  statement_timeout: Number(process.env.PG_STATEMENT_TIMEOUT_MS || 15_000),
})

export async function query(text, params) {
  const startedAt = Date.now()
  try {
    const result = await pool.query(text, params)
    const durationMs = Date.now() - startedAt
    if (durationMs > Number(process.env.SLOW_QUERY_MS || 500)) {
      console.warn(JSON.stringify({ level: 'warn', type: 'slow_query', durationMs, query: text.replace(/\s+/g, ' ').trim().slice(0, 240) }))
    }
    return result.rows
  } catch (error) {
    console.error(JSON.stringify({ level: 'error', type: 'db_query_failed', message: error.message }))
    throw error
  }
}

export async function getDatabaseHealth() {
  const rows = await query('select now() as now')
  return { ok: true, now: rows[0].now }
}
