import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const DEFAULT_UPLOAD_DIR = path.resolve(process.cwd(), 'public', 'static', 'uploads')

function getUploadDir() {
  return process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : DEFAULT_UPLOAD_DIR
}

function randomName(ext = '') {
  return `${Date.now()}_${crypto.randomBytes(10).toString('hex')}${ext}`
}

function getExtFromMime(mime = '') {
  if (mime === 'image/jpeg') return '.jpg'
  if (mime === 'image/png') return '.png'
  if (mime === 'image/webp') return '.webp'
  return ''
}

export async function ensureUploadDir() {
  const dir = getUploadDir()
  await fs.mkdir(dir, { recursive: true })
  return dir
}

export async function saveUploadedImage({ file, originalName, mimeType, field = 'image' }) {
  if (!file) throw new Error(`Missing file in field '${field}'`)

  // `file` from Hono multipart is a Blob-like with arrayBuffer()
  const buf = Buffer.from(await file.arrayBuffer())
  const ext = getExtFromMime(mimeType) || path.extname(originalName || '') || '.webp'

  const dir = await ensureUploadDir()
  const name = randomName(ext)
  const absolutePath = path.join(dir, name)

  await fs.writeFile(absolutePath, buf)

  // public/static/uploads is served by the main sportplus app; backend can only return a URL path.
  // In this monorepo the static route is relative to the sportplus root.
  return {
    url: `/static/uploads/${name}`,
    filename: name,
    size: buf.byteLength,
  }
}

