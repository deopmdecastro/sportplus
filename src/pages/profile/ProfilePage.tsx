/** @jsxImportSource hono/jsx */
import { Navbar } from '../../components/layout/Navbar'

export function ProfilePage() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Perfil | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh;padding-top:64px">
        <Navbar currentPage="perfil" />
        <main style="max-width:1100px;margin:0 auto;padding:44px 24px">
          <section style="display:grid;grid-template-columns:280px 1fr;gap:24px" class="profile-layout">
            <aside style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px;text-align:center;height:max-content">
              <div id="profile-avatar" style="width:96px;height:96px;margin:0 auto 16px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;color:white;font-size:34px;font-weight:900">U</div>
              <h1 id="profile-name" style="color:white;font-size:22px;font-weight:800;margin:0 0 4px">Utilizador</h1>
              <p id="profile-email" style="color:rgba(255,255,255,0.45);font-size:13px;margin:0 0 16px">email</p>
              <span id="profile-plan" style="display:inline-flex;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);color:#fca5a5;border-radius:999px;padding:5px 12px;font-size:12px;font-weight:700">free</span>
            </aside>

            <div style="display:flex;flex-direction:column;gap:18px">
              <section style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px">
                <h2 style="color:white;font-size:18px;font-weight:800;margin:0 0 16px">A minha conta</h2>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px" class="profile-stats">
                  <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px">
                    <div style="color:white;font-size:22px;font-weight:800">0</div>
                    <div style="color:rgba(255,255,255,0.45);font-size:12px">Favoritos</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px">
                    <div style="color:white;font-size:22px;font-weight:800">0</div>
                    <div style="color:rgba(255,255,255,0.45);font-size:12px">A assistir</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px">
                    <div style="color:white;font-size:22px;font-weight:800">Free</div>
                    <div style="color:rgba(255,255,255,0.45);font-size:12px">Plano atual</div>
                  </div>
                </div>
              </section>

              <section style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px">
                <h2 style="color:white;font-size:18px;font-weight:800;margin:0 0 12px">Acoes rapidas</h2>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <a href="/ao-vivo" class="btn-primary" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:10px 16px;border-radius:6px;font-size:14px;font-weight:700">Ver ao vivo</a>
                  <a href="/highlights" class="btn-outline" style="color:white;text-decoration:none;padding:10px 16px;border:1px solid rgba(255,255,255,0.22);border-radius:6px;font-size:14px;font-weight:700">Highlights</a>
                  <button id="profile-logout" type="button" style="color:white;background:rgba(255,255,255,0.06);padding:10px 16px;border:1px solid rgba(255,255,255,0.12);border-radius:6px;font-size:14px;font-weight:700;cursor:pointer">Sair</button>
                </div>
              </section>
            </div>
          </section>
        </main>

        <script dangerouslySetInnerHTML={{__html: `
          const rawUser = localStorage.getItem('sportplus_user');
          if (!rawUser) {
            window.showToast?.('Entre na sua conta para ver o perfil.', 'error');
            setTimeout(() => { window.location.href = '/login'; }, 700);
          } else {
            const user = JSON.parse(rawUser);
            const name = user.name || 'Utilizador';
            document.getElementById('profile-avatar').textContent = name.trim().charAt(0).toUpperCase() || 'U';
            document.getElementById('profile-name').textContent = name;
            document.getElementById('profile-email').textContent = user.email || '';
            document.getElementById('profile-plan').textContent = user.plan || 'free';
          }

          document.getElementById('profile-logout')?.addEventListener('click', () => {
            localStorage.removeItem('sportplus_user');
            localStorage.removeItem('sportplus_token');
            window.showToast?.('Sessao terminada.', 'success');
            setTimeout(() => { window.location.href = '/'; }, 350);
          });
        `}} />
      </body>
    </html>
  )
}
