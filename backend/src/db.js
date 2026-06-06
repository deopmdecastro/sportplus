import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function query(text, params) {
  const result = await pool.query(text, params)
  return result.rows
}

export async function getDatabaseHealth() {
  const rows = await query('select now() as now')
  return { ok: true, now: rows[0].now }
}
