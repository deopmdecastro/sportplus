// ===========================
// sportplus UTILITY FUNCTIONS
// ===========================

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'agora'
  if (diffMins < 60) return `${diffMins}min atrás`
  if (diffHours < 24) return `${diffHours}h atrás`
  if (diffDays < 7) return `${diffDays}d atrás`
  return date.toLocaleDateString('pt-BR')
}

export function formatEventTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)

  if (diffMs < 0) return 'AO VIVO'
  if (diffMins < 60) return `Em ${diffMins} min`
  if (diffHours < 24) return `Em ${diffHours}h`
  return `Em ${Math.floor(diffHours / 24)}d`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    live: 'text-red-500',
    upcoming: 'text-yellow-500',
    ended: 'text-gray-500',
    replay: 'text-blue-500',
  }
  return colors[status] || 'text-gray-400'
}

export function getStatusBadge(status: string): string {
  const labels: Record<string, string> = {
    live: '🔴 AO VIVO',
    upcoming: '⏰ EM BREVE',
    ended: '✔ ENCERRADO',
    replay: '▶ REPLAY',
  }
  return labels[status] || status
}
