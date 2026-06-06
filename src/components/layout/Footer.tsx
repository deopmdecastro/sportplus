/** @jsxImportSource hono/jsx */

export function Footer() {
  return (
    <footer style="background:#0a0a0a;border-top:1px solid rgba(239,68,68,0.15);padding:60px 0 32px">
      <div style="max-width:1400px;margin:0 auto;padding:0 24px">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px" class="footer-grid">
          {/* Brand */}
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
              <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:8px">
                <span style="color:white;font-weight:900;font-size:18px">S</span>
              </div>
              <span style="color:white;font-weight:900;font-size:22px;letter-spacing:-0.5px">SPORT<span style="color:#ef4444">+</span></span>
            </div>
            <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;margin-bottom:20px;max-width:280px">
              A maior plataforma de streaming esportivo do Brasil. Assista ao vivo, replays e highlights dos seus esportes favoritos.
            </p>
            <div style="display:flex;gap:12px">
              {['twitter', 'instagram', 'youtube', 'facebook'].map(social => (
                <a key={social} href="#" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:rgba(255,255,255,0.6);text-decoration:none;font-size:12px;font-weight:600">
                  {social === 'twitter' ? 'X' : social === 'instagram' ? 'IG' : social === 'youtube' ? 'YT' : 'FB'}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style="color:white;font-size:14px;font-weight:700;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px">Plataforma</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
              {['Ao Vivo', 'Highlights', 'Explorar', 'Esportes', 'Criadores'].map(link => (
                <li key={link}><a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px;transition:color 0.2s" class="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style="color:white;font-size:14px;font-weight:700;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px">Empresa</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
              {['Sobre Nós', 'Carreiras', 'Imprensa', 'Blog', 'Parceiros'].map(link => (
                <li key={link}><a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px" class="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style="color:white;font-size:14px;font-weight:700;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px">Suporte</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
              {['Central de Ajuda', 'Contato', 'Status', 'Comunidade', 'API'].map(link => (
                <li key={link}><a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px" class="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style="color:white;font-size:14px;font-weight:700;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px">Legal</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
              {['Privacidade', 'Termos', 'Cookies', 'Licenças', 'DMCA'].map(link => (
                <li key={link}><a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px" class="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
          <p style="color:rgba(255,255,255,0.3);font-size:13px">© 2024 SPORT+. Todos os direitos reservados.</p>
          <div style="display:flex;align-items:center;gap:16px">
            <span style="display:flex;align-items:center;gap:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:20px;padding:4px 12px">
              <span style="width:6px;height:6px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite"></span>
              <span style="color:#ef4444;font-size:12px;font-weight:600">12 eventos ao vivo</span>
            </span>
            <span style="color:rgba(255,255,255,0.3);font-size:12px">Disponível em iOS, Android e Web</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
