/** @jsxImportSource hono/jsx */

export function RegisterPage() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Criar Conta | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 0">
        
        <div style="position:fixed;inset:0;overflow:hidden;z-index:0">
          <div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 80% 50%,rgba(239,68,68,0.1) 0%,transparent 60%)"></div>
        </div>

        <div style="position:relative;z-index:1;width:100%;max-width:480px;padding:24px">
          <div style="text-align:center;margin-bottom:32px">
            <a href="/" style="text-decoration:none;display:inline-flex;align-items:center;gap:10px">
              <div style="width:44px;height:44px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:10px;display:flex;align-items:center;justify-content:center">
                <span style="color:white;font-weight:900;font-size:22px">S</span>
              </div>
              <span style="color:white;font-weight:900;font-size:26px">SPORT<span style="color:#ef4444">+</span></span>
            </a>
          </div>

          {/* Plan Selection */}
          <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;margin-bottom:16px">
            <h1 style="color:white;font-size:22px;font-weight:800;margin:0 0 4px;text-align:center">Criar conta grátis</h1>
            <p style="color:rgba(255,255,255,0.4);font-size:14px;text-align:center;margin:0 0 28px">Assista esportes ao vivo, grátis para sempre</p>

            {/* Benefits */}
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:28px">
              {['Acesso gratuito a transmissões ao vivo', 'Highlights e replays ilimitados', 'Chat ao vivo com outros fãs', '7 dias de PRO grátis no cadastro'].map(benefit => (
                <div key={benefit} style="display:flex;align-items:center;gap:10px">
                  <div style="width:20px;height:20px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="3">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <span style="color:rgba(255,255,255,0.7);font-size:13px">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Social Signup */}
            <div style="display:flex;gap:10px;margin-bottom:20px">
              {['G', 'f'].map((icon, i) => (
                <button key={i} style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:14px;cursor:pointer" class="social-btn">
                  <span style={`font-weight:900;color:${i === 0 ? '#ea4335' : '#1877f2'}`}>{icon}</span>
                  {i === 0 ? 'Google' : 'Facebook'}
                </button>
              ))}
            </div>

            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
              <div style="flex:1;height:1px;background:rgba(255,255,255,0.08)"></div>
              <span style="color:rgba(255,255,255,0.3);font-size:11px">ou com email</span>
              <div style="flex:1;height:1px;background:rgba(255,255,255,0.08)"></div>
            </div>

            {/* Form */}
            <form id="register-form">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
                <div>
                  <label style="display:block;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;margin-bottom:5px">Nome</label>
                  <input type="text" placeholder="João" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;color:white;font-size:13px;outline:none;box-sizing:border-box" class="form-input" />
                </div>
                <div>
                  <label style="display:block;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;margin-bottom:5px">Sobrenome</label>
                  <input type="text" placeholder="Silva" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;color:white;font-size:13px;outline:none;box-sizing:border-box" class="form-input" />
                </div>
              </div>
              <div style="margin-bottom:14px">
                <label style="display:block;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;margin-bottom:5px">Email</label>
                <input type="email" placeholder="joao@email.com" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;color:white;font-size:13px;outline:none;box-sizing:border-box" class="form-input" />
              </div>
              <div style="margin-bottom:14px">
                <label style="display:block;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;margin-bottom:5px">Senha</label>
                <input type="password" placeholder="Mínimo 8 caracteres" required style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;color:white;font-size:13px;outline:none;box-sizing:border-box" class="form-input" />
              </div>
              <div style="margin-bottom:14px">
                <label style="display:block;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;margin-bottom:5px">Esportes favoritos</label>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  {['⚽ Futebol', '🏀 Basquete', '🥊 MMA', '🎾 Tênis', '🏎️ F1', '🚴 Ciclismo'].map(sport => (
                    <label key={sport} style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:5px 10px;cursor:pointer" class="sport-checkbox">
                      <input type="checkbox" style="accent-color:#ef4444" />
                      <span style="color:rgba(255,255,255,0.7);font-size:12px">{sport}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:24px">
                <input type="checkbox" id="terms" required style="margin-top:2px;accent-color:#ef4444" />
                <label for="terms" style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.5">
                  Concordo com os <a href="/termos" style="color:#ef4444">Termos de Uso</a> e <a href="/privacidade" style="color:#ef4444">Política de Privacidade</a> do sportplus
                </label>
              </div>

              <button type="submit" style="width:100%;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:14px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer" class="submit-btn">
                Criar Conta Grátis 🚀
              </button>
            </form>
          </div>

          <p style="text-align:center;color:rgba(255,255,255,0.4);font-size:14px">
            Já tem conta? <a href="/login" style="color:#ef4444;font-weight:600;text-decoration:none">Entrar</a>
          </p>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => { input.style.borderColor = 'rgba(239,68,68,0.5)'; });
            input.addEventListener('blur', () => { input.style.borderColor = 'rgba(255,255,255,0.1)'; });
          });
          document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn');
            const inputs = document.querySelectorAll('#register-form .form-input');
            const firstName = inputs[0]?.value?.trim();
            const lastName = inputs[1]?.value?.trim();
            const email = inputs[2]?.value?.trim();
            const password = inputs[3]?.value;
            if (!firstName || !lastName || !email || !password) {
              window.showToast?.('Preencha todos os campos obrigatorios.', 'error');
              return;
            }
            let registeredAccounts = [];
            try {
              registeredAccounts = JSON.parse(localStorage.getItem('sportplus_accounts') || '[]');
            } catch (_) {
              registeredAccounts = [];
            }
            const demoEmails = ['carlos@sport.com', 'ana@sport.com', 'joao@sport.com', 'admin@sportplus.test'];
            const emailExists = demoEmails.includes(email.toLowerCase()) || registeredAccounts.some((account) => account.email?.toLowerCase() === email.toLowerCase());
            if (emailExists) {
              window.showToast?.('Este email ja tem conta. Faca login.', 'error');
              return;
            }
            const account = {
              id: 'user_' + Date.now(),
              name: firstName + ' ' + lastName,
              email,
              password,
              role: 'viewer',
              plan: 'free'
            };
            registeredAccounts.push(account);
            localStorage.setItem('sportplus_accounts', JSON.stringify(registeredAccounts));
            btn.textContent = 'Criando conta...';
            btn.style.opacity = '0.8';
            localStorage.setItem('sportplus_token', 'sport_demo_token');
            localStorage.setItem('sportplus_user', JSON.stringify({
              id: account.id,
              name: account.name,
              email: account.email,
              role: account.role,
              plan: account.plan
            }));
            window.showToast?.('Conta criada com sucesso.', 'success');
            setTimeout(() => { window.location.href = '/perfil'; }, 900);
          });
        `}} />
      </body>
    </html>
  )
}
