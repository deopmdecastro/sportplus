/** @jsxImportSource hono/jsx */
interface NavbarProps {
  currentPage?: string
}

export function Navbar({ currentPage = 'home' }: NavbarProps) {
  return (
    <nav class="stream-nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:linear-gradient(180deg,rgba(0,0,0,0.98) 0%,rgba(0,0,0,0.85) 100%);backdrop-filter:blur(12px);border-bottom:1px solid rgba(239,68,68,0.2)">
      <div class="stream-nav-inner" style="max-width:1400px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:64px">
        {/* Logo */}
        <a href="/" class="stream-brand-link" style="display:flex;align-items:center;gap:8px;text-decoration:none">
          <div class="stream-brand-mark" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:8px">
            <span style="color:white;font-weight:900;font-size:18px">S</span>
          </div>
          <span class="stream-brand-name" style="color:white;font-weight:900;font-size:22px;letter-spacing:-0.5px">
            sportplus
          </span>
        </a>

        {/* Nav Links */}
        <div style="display:flex;align-items:center;gap:8px" class="nav-links">
          <a href="/" class={`nav-item ${currentPage === 'home' ? 'nav-active' : ''}`}>Início</a>
          <a href="/explorar" class={`nav-item ${currentPage === 'explorar' ? 'nav-active' : ''}`}>Explorar</a>
          <a href="/ao-vivo" class={`nav-item ${currentPage === 'aovivo' ? 'nav-active' : ''}`}>
            <span style="display:flex;align-items:center;gap:6px">
              <span style="width:8px;height:8px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite"></span>
              Ao Vivo
            </span>
          </a>
          <a href="/highlights" class={`nav-item ${currentPage === 'highlights' ? 'nav-active' : ''}`}>Highlights</a>
          <a href="/esportes" class={`nav-item ${currentPage === 'esportes' ? 'nav-active' : ''}`}>Esportes</a>
        </div>

        {/* Search */}
        <div style="display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:8px 16px" class="search-bar stream-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Buscar esportes, eventos..." style="background:none;border:none;outline:none;color:white;font-size:13px;width:180px" class="search-input"/>
        </div>

        {/* Actions */}
        <div style="display:flex;align-items:center;gap:12px" id="nav-actions">
          <a href="/notificacoes" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.08);color:white;text-decoration:none;position:relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;background:#ef4444;border-radius:50%;border:2px solid black"></span>
          </a>
          <a href="/login" style="padding:8px 20px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;color:white;text-decoration:none;font-size:14px;font-weight:500;transition:all 0.2s" class="btn-outline">Entrar</a>
          <a href="/cadastro" style="padding:8px 20px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:6px;color:white;text-decoration:none;font-size:14px;font-weight:700;transition:all 0.2s" class="btn-primary">Começar Grátis</a>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          const actions = document.getElementById('nav-actions');
          if (!actions) return;

          const rawUser = localStorage.getItem('sportplus_user');
          if (!rawUser) return;

          let user;
          try {
            user = JSON.parse(rawUser);
          } catch (_) {
            localStorage.removeItem('sportplus_user');
            localStorage.removeItem('sportplus_token');
            return;
          }

          const name = user.name || 'Utilizador';
          const initial = name.trim().charAt(0).toUpperCase() || 'U';
          actions.innerHTML = \`
            <a href="/notificacoes" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.08);color:white;text-decoration:none;position:relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;background:#ef4444;border-radius:50%;border:2px solid black"></span>
            </a>
            <a href="/perfil" style="display:flex;align-items:center;gap:10px;color:white;text-decoration:none;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:5px 12px 5px 5px">
              <span style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:800">\${initial}</span>
              <span style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600">\${name}</span>
            </a>
            <button type="button" id="logout-btn" style="padding:8px 14px;border:1px solid rgba(255,255,255,0.2);border-radius:6px;color:white;background:transparent;font-size:13px;font-weight:600;cursor:pointer">Sair</button>
          \`;

          document.getElementById('logout-btn')?.addEventListener('click', () => {
            localStorage.removeItem('sportplus_user');
            localStorage.removeItem('sportplus_token');
            window.showToast?.('Sessao terminada.', 'success');
            setTimeout(() => { window.location.href = '/'; }, 350);
          });
        })();
      `}} />
    </nav>
  )
}
