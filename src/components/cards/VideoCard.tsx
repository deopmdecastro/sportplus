/** @jsxImportSource hono/jsx */
import type { Video } from '../../types'
import { formatNumber, formatDuration, formatTimeAgo } from '../../lib/utils'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <a href={`/video/${video.id}`} style="text-decoration:none;display:block" class="video-card-link">
      <div class="video-card" style="background:#111;border-radius:12px;overflow:hidden;transition:transform 0.2s;cursor:pointer;border:1px solid rgba(255,255,255,0.06)">
        {/* Thumbnail */}
        <div style="position:relative;aspect-ratio:16/9;overflow:hidden;background:#1a1a1a">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s"
            class="card-img"
          />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.8) 100%)"></div>

          {/* Type Badge */}
          <div style="position:absolute;top:8px;left:8px">
            <span style={`background:${video.type === 'highlight' ? '#ef4444' : video.type === 'clip' ? '#8b5cf6' : '#3b82f6'};color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px`}>
              {video.type === 'highlight' ? 'Highlight' : video.type === 'clip' ? 'Clip' : video.type === 'replay' ? 'Replay' : video.type}
            </span>
          </div>

          {/* Duration */}
          <div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.85);color:white;font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px">
            {formatDuration(video.duration)}
          </div>

          {/* Play Icon Overlay */}
          <div class="play-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;background:rgba(0,0,0,0.3)">
            <div style="width:48px;height:48px;background:rgba(239,68,68,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div style="padding:12px 14px">
          <h3 style="color:white;font-size:14px;font-weight:600;margin:0 0 8px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
            {video.title}
          </h3>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
            <span style="font-size:14px">{video.sport.icon}</span>
            <span style="color:rgba(255,255,255,0.4);font-size:12px">{video.channel.name}</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.4);font-size:12px">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {formatNumber(video.views)}
              </span>
              <span style="display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.4);font-size:12px">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {formatNumber(video.likes)}
              </span>
            </div>
            <span style="color:rgba(255,255,255,0.3);font-size:12px">{formatTimeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
