/** @jsxImportSource hono/jsx */
import type { Event } from '../../types'
import { formatNumber, formatTimeAgo, formatEventTime } from '../../lib/utils'

interface EventCardProps {
  event: Event
  size?: 'sm' | 'md' | 'lg'
}

export function EventCard({ event, size = 'md' }: EventCardProps) {
  const isLive = event.status === 'live'
  const isUpcoming = event.status === 'upcoming'

  return (
    <a href={`/evento/${event.id}`} data-event-card={event.id} style="text-decoration:none;display:block" class="event-card-link">
      <div class="event-card" style="background:#111;border-radius:10px;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;cursor:pointer;border:1px solid rgba(255,255,255,0.08);box-shadow:0 10px 28px rgba(0,0,0,0.22)">
        {/* Thumbnail */}
        <div style="position:relative;aspect-ratio:16/9;overflow:hidden;background:#1a1a1a">
          <img 
            src={event.thumbnail} 
            alt={event.title}
            style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s"
            class="card-img"
          />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.08) 42%,rgba(0,0,0,0.82) 100%)"></div>

          {/* Status Badge */}
          <div style="position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px">
            {isLive && (
              <span style="display:flex;align-items:center;gap:5px;background:#ef4444;color:white;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:0.5px">
                <span style="width:6px;height:6px;background:white;border-radius:50%;animation:pulse 1.5s infinite"></span>
                AO VIVO
              </span>
            )}
            {isUpcoming && (
              <span style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.3);color:white;font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px">
                {formatEventTime(event.startTime)}
              </span>
            )}
            {event.isPremium && (
              <span style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px">
                PRO
              </span>
            )}
          </div>

          {/* Sport Badge */}
          <div style="position:absolute;top:10px;right:10px">
            <span style="background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.9);font-size:12px;padding:3px 8px;border-radius:4px">
              {event.sport.icon} {event.sport.name}
            </span>
          </div>

          {/* Teams Score */}
          {event.teams && isLive && (
            <div style="position:absolute;bottom:10px;left:10px;right:10px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;background:rgba(0,0,0,0.78);border:1px solid rgba(255,255,255,0.16);border-radius:8px;padding:8px 10px;backdrop-filter:blur(10px)">
              <span style="color:white;font-size:12px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left">{event.teams.home.logo} {event.teams.home.name}</span>
              <span style="color:white;font-size:17px;font-weight:900;min-width:52px;text-align:center">{event.teams.home.score ?? ''} - {event.teams.away.score ?? ''}</span>
              <span style="color:white;font-size:12px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right">{event.teams.away.name} {event.teams.away.logo}</span>
            </div>
          )}

          {/* Viewers */}
          {isLive && !event.teams && (
            <div style="position:absolute;bottom:10px;right:10px;display:flex;align-items:center;gap:4px;background:rgba(0,0,0,0.7);border-radius:4px;padding:3px 8px">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span data-event-views={event.id} style="color:rgba(255,255,255,0.9);font-size:11px;font-weight:600">{formatNumber(event.views || 0)}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style="padding:12px 14px">
          <h3 style="color:white;font-size:14px;font-weight:600;margin:0 0 6px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
            {event.title}
          </h3>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:6px">
              {event.channel.avatar ? (
                <img src={event.channel.avatar} alt="" loading="lazy" style="width:20px;height:20px;border-radius:50%;object-fit:cover;background:#ef4444" />
              ) : (
                <div style="width:20px;height:20px;border-radius:50%;background:#ef4444;display:flex;align-items:center;justify-content:center;font-size:10px">
                  {event.channel.name.charAt(0)}
                </div>
              )}
              <span style="color:rgba(255,255,255,0.5);font-size:12px">{event.channel.name}</span>
            </div>
            <span data-event-views-label={event.id} style="color:rgba(255,255,255,0.4);font-size:12px">
              {isLive ? `👁 ${formatNumber(event.views || 0)}` : formatTimeAgo(event.startTime)}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
