/** @jsxImportSource hono/jsx */

export function LoginPage() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Entrar | SPORT+</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh;display:flex;align-items:center;justify-content:center">
        
        {/* Background */}
        <div style="position:fixed;inset:0;overflow:hidden;z-index:0">
          <div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 20% 50%,rgba(239,68,68,0.12) 0%,transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(220,38,38,0.08) 0%,transparent 50%)"></div>
        </div>

        <div style="position:relative;z-index:1;width:100%;max-width:440px;padding:24px">
          {/* Logo */}
          <div style="text-align:center;margin-bottom:40px">
            <a href="/" style="text-decoration:none;display:inline-flex;align-items:center;gap:10px">
              <div style="width:48px;height:48px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:12px;display:flex;align-items:center;justify-content:center">
                <span style="color:white;font-weight:900;font-size:24px">S</span>
              </div>
              <span style="color:white;font-weight:900;font-size:28px">SPORT<span style="color:#ef4444">+</span></span>
            </a>
          </div>

          {/* Card */}
          <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px">
            <h1 style="color:white;font-size:24px;font-weight:800;margin:0 0 6px;text-align:center">Bem-vindo de volta</h1>
            <p style="color:rgba(255,255,255,0.4);font-size:14px;text-align:center;margin:0 0 28px">Entre para continuar assistindo</p>
            <div id="admin-login-hint" style="display:none;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.22);border-radius:8px;padding:10px 12px;margin-bottom:18px;color:#fca5a5;font-size:12px;line-height:1.5">
              Admin: admin@sportplus.test / Admin@123
            </div>

            {/* Social Login */}
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
              {[
                { icon: 'G', name: 'Google', color: '#ea4335' },
                { icon: 'f', name: 'Facebook', color: '#1877f2' },
                { icon: '🍎', name: 'Apple', color: '#000' },
              ].map(social => (
                <button key={social.name} style={`display:flex;align-items:center;gap:12px;padding:12px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;font-weight:600;cursor:pointer;width:100%;transition:all 0.2s`} class="social-btn">
                  <span style={`font-size:18px;font-weight:900;color:${social.color};width:24px;text-align:center`}>{social.icon}</span>
                  Continuar com {social.name}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
              <div style="flex:1;height:1px;background:rgba(255,255,255,0.08)"></div>
              <span style="color:rgba(255,255,255,0.3);font-size:12px">ou entre com email</span>
              <div style="flex:1;height:1px;background:rgba(255,255,255,0.08)"></div>
            </div>

            {/* Form */}
            <form id="login-form">
              <div style="margin-bottom:16px">
                <label style="display:block;color:rgba(255,255,255,0.6);font-size:13px;font-weight:500;margin-bottom:6px">Email</label>
                <input type="email" placeholder="seu@email.com" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 14px;color:white;font-size:14px;outline:none;box-sizing:border-box;transition:border-color 0.2s" class="form-input" />
              </div>
              <div style="margin-bottom:8px">
                <label style="display:block;color:rgba(255,255,255,0.6);font-size:13px;font-weight:500;margin-bottom:6px">Senha</label>
                <div style="position:relative">
                  <input id="password-input" type="password" placeholder="••••••••" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 44px 12px 14px;color:white;font-size:14px;outline:none;box-sizing:border-box;transition:border-color 0.2s" class="form-input" />
                  <button type="button" id="toggle-pass" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:14px">👁</button>
                </div>
              </div>
              <div style="text-align:right;margin-bottom:24px">
                <a href="#" style="color:#ef4444;font-size:13px;text-decoration:none">Esqueceu a senha?</a>
              </div>

              <button type="submit" style="width:100%;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:14px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.2s" class="submit-btn">
                Entrar
              </button>
            </form>
          </div>

          <p style="text-align:center;color:rgba(255,255,255,0.4);font-size:14px;margin-top:20px">
            Não tem conta? <a href="/cadastro" style="color:#ef4444;font-weight:600;text-decoration:none">Criar conta grátis</a>
          </p>
          <p style="text-align:center;margin-top:8px">
            <a href="/criador/login" style="color:rgba(255,255,255,0.3);font-size:12px;text-decoration:none">Sou Criador de Conteúdo →</a>
          </p>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => { input.style.borderColor = 'rgba(239,68,68,0.5)'; });
            input.addEventListener('blur', () => { input.style.borderColor = 'rgba(255,255,255,0.1)'; });
          });
          document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => { btn.style.borderColor = 'rgba(239,68,68,0.3)'; btn.style.background = 'rgba(255,255,255,0.09)'; });
            btn.addEventListener('mouseleave', () => { btn.style.borderColor = 'rgba(255,255,255,0.1)'; btn.style.background = 'rgba(255,255,255,0.06)'; });
            btn.addEventListener('click', () => window.showToast?.('Login social ainda nao configurado.', 'error'));
          });
          document.getElementById('toggle-pass')?.addEventListener('click', () => {
            const inp = document.getElementById('password-input');
            inp.type = inp.type === 'password' ? 'text' : 'password';
          });
          document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn');
            const email = document.querySelector('#login-form input[type="email"]')?.value?.trim();
            const password = document.getElementById('password-input')?.value;
            if (!email || !password) {
              window.showToast?.('Preencha email e senha.', 'error');
              return;
            }
            const isAdmin = email.toLowerCase() === 'admin@sportplus.test' && password === 'Admin@123';
            if (email.toLowerCase() === 'admin@sportplus.test' && !isAdmin) {
              window.showToast?.('Credencial admin invalida.', 'error');
              return;
            }
            const demoAccounts = [
              { id: '1', name: 'Carlos Drummond', email: 'carlos@sport.com', password: 'User@123', role: 'creator', plan: 'premium' },
              { id: '2', name: 'Ana Beatriz', email: 'ana@sport.com', password: 'User@123', role: 'creator', plan: 'pro' },
              { id: '3', name: 'Joao Silva', email: 'joao@sport.com', password: 'User@123', role: 'viewer', plan: 'free' }
            ];
            let registeredAccounts = [];
            try {
              registeredAccounts = JSON.parse(localStorage.getItem('sportplus_accounts') || '[]');
            } catch (_) {
              registeredAccounts = [];
            }
            const account = [...demoAccounts, ...registeredAccounts].find((item) => item.email?.toLowerCase() === email.toLowerCase());
            if (!isAdmin && (!account || account.password !== password)) {
              window.showToast?.('Email ou senha invalidos. Crie uma conta antes de entrar.', 'error');
              return;
            }
            btn.textContent = 'Entrando...';
            btn.style.opacity = '0.8';
            localStorage.setItem('sportplus_token', isAdmin ? 'sport_admin_demo_token' : 'sport_demo_token');
            localStorage.setItem('sportplus_user', JSON.stringify({
              id: isAdmin ? 'admin' : account.id,
              name: isAdmin ? 'Admin SPORT+' : account.name,
              email,
              role: isAdmin ? 'admin' : account.role,
              plan: isAdmin ? 'premium' : account.plan
            }));
            window.showToast?.(isAdmin ? 'Login admin efetuado com sucesso.' : 'Login efetuado com sucesso.', 'success');
            setTimeout(() => { window.location.href = isAdmin ? '/admin' : '/perfil'; }, 900);
          });
          if (new URLSearchParams(window.location.search).get('admin') === '1') {
            document.getElementById('admin-login-hint').style.display = 'block';
            const emailInput = document.querySelector('#login-form input[type="email"]');
            if (emailInput) emailInput.value = 'admin@sportplus.test';
          }
        `}} />
      </body>
    </html>
  )
}
