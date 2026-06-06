/** @jsxImportSource hono/jsx */
import { analyticsData, mockCampaigns } from '../../data/mockData'
import { formatNumber, formatCurrency } from '../../lib/utils'

export function CreatorDashboard() {
  const data = analyticsData
  const maxHourViews = Math.max(...data.viewsByHour.map(h => h.views))
  const maxDayRevenue = Math.max(...data.revenueByDay.map(d => d.revenue))

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard do Criador | SPORT+</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh">
        
        {/* Sidebar + Main Layout */}
        <div style="display:flex;min-height:100vh">
          
          {/* Sidebar */}
          <div style="width:240px;background:#0d0d0d;border-right:1px solid rgba(255,255,255,0.06);padding:20px 16px;flex-shrink:0;position:fixed;top:0;left:0;bottom:0;display:flex;flex-direction:column" class="creator-sidebar">
            
            {/* Logo */}
            <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:32px;padding:0 8px">
              <div style="width:32px;height:32px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:6px;display:flex;align-items:center;justify-content:center">
                <span style="color:white;font-weight:900;font-size:16px">S</span>
              </div>
              <span style="color:white;font-weight:900;font-size:18px">SPORT<span style="color:#ef4444">+</span></span>
              <span style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px">CREATOR</span>
            </a>

            {/* Nav */}
            <nav style="flex:1">
              {[
                { icon: '📊', label: 'Dashboard', href: '/criador', active: true },
                { icon: '🎥', label: 'Transmissões', href: '/criador/transmissoes', active: false },
                { icon: '📹', label: 'Vídeos', href: '/criador/videos', active: false },
                { icon: '💰', label: 'Monetização', href: '/criador/monetizacao', active: false },
                { icon: '📈', label: 'Analytics', href: '/criador/analytics', active: false },
                { icon: '⚙️', label: 'Configurações', href: '/criador/config', active: false },
              ].map(item => (
                <a key={item.label} href={item.href} style={`display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;text-decoration:none;margin-bottom:4px;transition:all 0.2s;${item.active ? 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.2);color:white;' : 'color:rgba(255,255,255,0.5);'}`} class={item.active ? '' : 'sidebar-item'}>
                  <span style="font-size:16px">{item.icon}</span>
                  <span style="font-size:14px;font-weight:500">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* User Info */}
            <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:16px">
              <div style="display:flex;align-items:center;gap:10px;padding:10px 12px">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" alt="Criador" style="width:36px;height:36px;border-radius:50%" />
                <div>
                  <div style="color:white;font-size:13px;font-weight:600">Carlos Drummond</div>
                  <div style="color:rgba(255,255,255,0.3);font-size:11px">48.2K seguidores</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style="margin-left:240px;flex:1;padding:32px">
            
            {/* Header */}
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px">
              <div>
                <h1 style="color:white;font-size:26px;font-weight:800;margin:0 0 4px">Dashboard</h1>
                <p style="color:rgba(255,255,255,0.4);font-size:14px;margin:0">Bem-vindo, Carlos! Hoje é um bom dia para transmitir.</p>
              </div>
              <a href="/criador/transmissoes/nova" style="display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:700">
                🔴 Nova Transmissão
              </a>
            </div>

            {/* Stats Cards */}
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px" class="stats-grid">
              {[
                { label: 'Visualizações Hoje', value: formatNumber(data.today.views), change: '+12.4%', icon: '👁', color: '#3b82f6' },
                { label: 'Receita Hoje', value: formatCurrency(data.today.revenue), change: '+8.2%', icon: '💰', color: '#22c55e' },
                { label: 'Espectadores Pico', value: formatNumber(data.today.viewers), change: '+24.1%', icon: '📡', color: '#f59e0b' },
                { label: 'Tempo Médio', value: data.today.watchTime + ' min', change: '+5.8%', icon: '⏱', color: '#ef4444' },
              ].map(stat => (
                <div key={stat.label} style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                    <span style={`font-size:24px;width:40px;height:40px;background:${stat.color}15;border-radius:8px;display:flex;align-items:center;justify-content:center`}>{stat.icon}</span>
                    <span style="color:#22c55e;font-size:12px;font-weight:600;background:rgba(34,197,94,0.1);padding:3px 8px;border-radius:50px">{stat.change}</span>
                  </div>
                  <div style={`color:${stat.color};font-size:24px;font-weight:800;margin-bottom:4px`}>{stat.value}</div>
                  <div style="color:rgba(255,255,255,0.4);font-size:12px">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:32px" class="charts-grid">
              {/* Views Chart */}
              <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
                  <h3 style="color:white;font-size:16px;font-weight:700;margin:0">Visualizações por Hora</h3>
                  <select style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-size:12px;padding:4px 8px;border-radius:6px">
                    <option>Hoje</option>
                    <option>Semana</option>
                    <option>Mês</option>
                  </select>
                </div>
                <div style="display:flex;align-items:flex-end;gap:4px;height:120px">
                  {data.viewsByHour.map(h => (
                    <div key={h.hour} style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px" title={`${h.hour}: ${formatNumber(h.views)} views`}>
                      <div style={`width:100%;background:linear-gradient(180deg,#ef4444,#dc2626);border-radius:2px 2px 0 0;height:${(h.views / maxHourViews * 100)}%;min-height:2px;transition:all 0.3s`} class="chart-bar"></div>
                      {['06h','12h','18h','23h'].includes(h.hour) && <span style="color:rgba(255,255,255,0.3);font-size:9px">{h.hour}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Chart */}
              <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px">
                <h3 style="color:white;font-size:16px;font-weight:700;margin:0 0 20px">Receita por Dia</h3>
                <div style="display:flex;align-items:flex-end;gap:8px;height:120px">
                  {data.revenueByDay.map(d => (
                    <div key={d.date} style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                      <div style={`width:100%;background:linear-gradient(180deg,#22c55e,#16a34a);border-radius:2px 2px 0 0;height:${(d.revenue / maxDayRevenue * 100)}%;min-height:2px`} class="chart-bar"></div>
                      <span style="color:rgba(255,255,255,0.4);font-size:10px">{d.date}</span>
                    </div>
                  ))}
                </div>
                <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06)">
                  <div style="color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:4px">Total da Semana</div>
                  <div style="color:#22c55e;font-size:20px;font-weight:800">{formatCurrency(data.week.revenue)}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px" class="actions-grid">
              <a href="/criador/transmissoes/nova" style="text-decoration:none">
                <div style="background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(220,38,38,0.05));border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s" class="action-card">
                  <div style="font-size:32px;margin-bottom:10px">🔴</div>
                  <div style="color:white;font-size:15px;font-weight:700;margin-bottom:4px">Iniciar Transmissão</div>
                  <div style="color:rgba(255,255,255,0.4);font-size:13px">Transmita ao vivo agora</div>
                </div>
              </a>
              <a href="/criador/videos/upload" style="text-decoration:none">
                <div style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(37,99,235,0.05));border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s" class="action-card">
                  <div style="font-size:32px;margin-bottom:10px">📹</div>
                  <div style="color:white;font-size:15px;font-weight:700;margin-bottom:4px">Enviar Vídeo</div>
                  <div style="color:rgba(255,255,255,0.4);font-size:13px">Upload de highlights</div>
                </div>
              </a>
              <a href="/criador/monetizacao" style="text-decoration:none">
                <div style="background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(22,163,74,0.05));border:1px solid rgba(34,197,94,0.2);border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s" class="action-card">
                  <div style="font-size:32px;margin-bottom:10px">💰</div>
                  <div style="color:white;font-size:15px;font-weight:700;margin-bottom:4px">Monetização</div>
                  <div style="color:rgba(255,255,255,0.4);font-size:13px">Sacar {formatCurrency(8420.50)}</div>
                </div>
              </a>
            </div>

            {/* Recent Streams */}
            <div style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px">
              <h3 style="color:white;font-size:16px;font-weight:700;margin:0 0 16px">Transmissões Recentes</h3>
              <table style="width:100%;border-collapse:collapse">
                <thead>
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
                    {['Título', 'Data', 'Pico de Espectadores', 'Duração', 'Receita', 'Status'].map(h => (
                      <th key={h} style="text-align:left;color:rgba(255,255,255,0.4);font-size:12px;font-weight:600;padding:8px 12px;text-transform:uppercase;letter-spacing:0.5px">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'Flamengo vs Palmeiras - AO VIVO', date: 'Hoje, 20:00', peak: 48320, duration: '2h 15min', revenue: 2840.50, status: 'live' },
                    { title: 'Copa do Mundo de Futsal', date: 'Ontem, 18:00', peak: 12400, duration: '1h 45min', revenue: 980.00, status: 'ended' },
                    { title: 'Brasileirão - Rodada 29', date: '3 dias atrás', peak: 28900, duration: '3h 10min', revenue: 1720.00, status: 'ended' },
                    { title: 'Especial Champions League', date: '5 dias atrás', peak: 41200, duration: '4h 00min', revenue: 3240.00, status: 'ended' },
                  ].map((stream, i) => (
                    <tr key={i} style="border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.1s" class="table-row">
                      <td style="padding:12px;color:white;font-size:13px;font-weight:500">{stream.title}</td>
                      <td style="padding:12px;color:rgba(255,255,255,0.5);font-size:13px">{stream.date}</td>
                      <td style="padding:12px;color:rgba(255,255,255,0.8);font-size:13px">{formatNumber(stream.peak)}</td>
                      <td style="padding:12px;color:rgba(255,255,255,0.5);font-size:13px">{stream.duration}</td>
                      <td style="padding:12px;color:#22c55e;font-size:13px;font-weight:600">{formatCurrency(stream.revenue)}</td>
                      <td style="padding:12px">
                        <span style={`font-size:11px;font-weight:700;padding:3px 8px;border-radius:50px;${stream.status === 'live' ? 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;' : 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);'}`}>
                          {stream.status === 'live' ? '● AO VIVO' : '✓ Encerrado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('mouseenter', () => { item.style.background = 'rgba(255,255,255,0.06)'; item.style.color = 'white'; });
            item.addEventListener('mouseleave', () => { item.style.background = ''; item.style.color = 'rgba(255,255,255,0.5)'; });
          });
          document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-2px)'; });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
          });
          document.querySelectorAll('.table-row').forEach(row => {
            row.addEventListener('mouseenter', () => { row.style.background = 'rgba(255,255,255,0.02)'; });
            row.addEventListener('mouseleave', () => { row.style.background = ''; });
          });
          document.querySelectorAll('.chart-bar').forEach((bar, i) => {
            bar.style.opacity = '0';
            setTimeout(() => { bar.style.transition = 'all 0.4s'; bar.style.opacity = '1'; }, i * 20);
          });
        `}} />
      </body>
    </html>
  )
}
