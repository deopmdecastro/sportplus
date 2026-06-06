/** @jsxImportSource hono/jsx */
import type { Ad } from '../../types'

interface AdBannerProps {
  ad: Ad
  onClose?: () => void
}

export function AdBanner({ ad }: AdBannerProps) {
  return (
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px" class="ad-banner">
      <div style="display:flex;align-items:center;gap:12px;flex:1">
        <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">AD</span>
        {ad.imageUrl ? (
          <img src={ad.imageUrl} alt={ad.advertiser} style="height:60px;border-radius:4px;object-fit:cover" />
        ) : (
          <div style="flex:1">
            <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0">{ad.advertiser}</p>
            <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:4px 0 0">Anúncio Patrocinado</p>
          </div>
        )}
      </div>
      <a href={ad.clickUrl} target="_blank" style="padding:8px 16px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;border-radius:6px;font-size:12px;font-weight:700;white-space:nowrap">
        Saiba Mais
      </a>
    </div>
  )
}

export function AdOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div id="ad-overlay" style="position:absolute;bottom:64px;left:16px;right:16px;background:rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:50">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.2);padding:2px 5px;border-radius:3px">ANÚNCIO</span>
        <div>
          <p style="color:white;font-size:13px;font-weight:600;margin:0">Betano Sports</p>
          <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:3px 0 0">Aposte nos seus esportes favoritos</p>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <a href="#" style="padding:6px 12px;background:#ef4444;color:white;text-decoration:none;border-radius:4px;font-size:12px;font-weight:600">Ver Oferta</a>
        <button onclick="document.getElementById('ad-overlay').style.display='none'" style="background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.6);width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">✕</button>
      </div>
    </div>
  )
}
