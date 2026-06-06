/** @jsxImportSource hono/jsx */
import {
  highlights,
  liveEvents,
  mockAds,
  mockCampaigns,
  mockChannels,
  mockUsers,
  sports,
  upcomingEvents,
} from '../../data/mockData'

const adminEmail = 'admin@sportplus.test'

export function AdminDashboard() {
  const seed = {
    users: [
      ...mockUsers.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
        status: user.isVerified ? 'verified' : 'pending',
      })),
      { id: 'admin', name: 'Admin SPORT+', email: adminEmail, role: 'admin', plan: 'premium', status: 'verified' },
    ],
    events: [...liveEvents, ...upcomingEvents].map((event) => ({
      id: event.id,
      title: event.title,
      thumbnail: event.thumbnail,
      streamUrl: event.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: event.description,
      sport: event.sport.name,
      channel: event.channel.name,
      status: event.status,
      viewers: event.viewers,
      premium: event.isPremium ? 'yes' : 'no',
    })),
    videos: highlights.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      videoUrl: video.videoUrl,
      description: video.description,
      sport: video.sport.name,
      channel: video.channel.name,
      type: video.type,
      views: video.views,
      status: 'published',
    })),
    channels: mockChannels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      avatar: channel.avatar,
      description: channel.description,
      owner: channel.owner.name,
      sport: channel.sport.name,
      followers: channel.followersCount,
      live: channel.isLive ? 'yes' : 'no',
      status: channel.isVerified ? 'verified' : 'review',
    })),
    campaigns: mockCampaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      advertiser: campaign.advertiser,
      budget: campaign.budget,
      spent: campaign.spent,
      ctr: campaign.ctr,
      status: campaign.status,
    })),
    ads: mockAds.map((ad) => ({
      id: ad.id,
      type: ad.type,
      advertiser: ad.advertiser,
      imageUrl: ad.imageUrl || '',
      videoUrl: ad.videoUrl || '',
      clickUrl: ad.clickUrl,
      duration: ad.duration || '',
      status: 'active',
    })),
    sports: sports.map((sport) => ({
      id: sport.id,
      name: sport.name,
      slug: sport.slug,
      color: sport.color,
      liveCount: sport.liveCount,
      totalEvents: sport.totalEvents,
      status: 'active',
    })),
    settings: [
      { id: 'maintenance', name: 'Maintenance mode', value: 'off', category: 'system' },
      { id: 'moderation', name: 'Content moderation', value: 'on', category: 'security' },
      { id: 'ad-fill-rate', name: 'Minimum ad fill rate', value: '90', category: 'monetization' },
    ],
  }

  const schemas = {
    users: [
      { key: 'name', label: 'Nome', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'role', label: 'Perfil', type: 'select', options: ['viewer', 'creator', 'admin'], required: true },
      { key: 'plan', label: 'Plano', type: 'select', options: ['free', 'pro', 'premium'], required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'verified', 'blocked'], required: true },
    ],
    events: [
      { key: 'title', label: 'Titulo', type: 'text', required: true },
      { key: 'thumbnail', label: 'Capa', type: 'url', required: true },
      { key: 'streamUrl', label: 'Link da transmissao', type: 'url', required: true },
      { key: 'description', label: 'Descricao', type: 'textarea', required: true },
      { key: 'sport', label: 'Esporte', type: 'text', required: true },
      { key: 'channel', label: 'Canal', type: 'text', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['live', 'upcoming', 'ended', 'replay'], required: true },
      { key: 'viewers', label: 'Viewers', type: 'number', required: true },
      { key: 'premium', label: 'Premium', type: 'select', options: ['no', 'yes'], required: true },
    ],
    videos: [
      { key: 'title', label: 'Titulo', type: 'text', required: true },
      { key: 'thumbnail', label: 'Capa', type: 'url', required: true },
      { key: 'videoUrl', label: 'URL do video', type: 'url', required: true },
      { key: 'description', label: 'Descricao', type: 'textarea', required: true },
      { key: 'sport', label: 'Esporte', type: 'text', required: true },
      { key: 'channel', label: 'Canal', type: 'text', required: true },
      { key: 'type', label: 'Tipo', type: 'select', options: ['highlight', 'replay', 'clip', 'documentary'], required: true },
      { key: 'views', label: 'Views', type: 'number', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'blocked'], required: true },
    ],
    channels: [
      { key: 'name', label: 'Canal', type: 'text', required: true },
      { key: 'avatar', label: 'Avatar/Capa', type: 'url', required: true },
      { key: 'description', label: 'Descricao', type: 'textarea', required: true },
      { key: 'owner', label: 'Dono', type: 'text', required: true },
      { key: 'sport', label: 'Esporte', type: 'text', required: true },
      { key: 'followers', label: 'Seguidores', type: 'number', required: true },
      { key: 'live', label: 'Ao vivo', type: 'select', options: ['no', 'yes'], required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['review', 'verified', 'blocked'], required: true },
    ],
    campaigns: [
      { key: 'name', label: 'Campanha', type: 'text', required: true },
      { key: 'advertiser', label: 'Anunciante', type: 'text', required: true },
      { key: 'budget', label: 'Budget', type: 'number', required: true },
      { key: 'spent', label: 'Gasto', type: 'number', required: true },
      { key: 'ctr', label: 'CTR', type: 'number', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['scheduled', 'active', 'paused', 'ended'], required: true },
    ],
    ads: [
      { key: 'type', label: 'Tipo', type: 'select', options: ['pre-roll', 'mid-roll', 'overlay', 'banner', 'display'], required: true },
      { key: 'advertiser', label: 'Anunciante', type: 'text', required: true },
      { key: 'imageUrl', label: 'Imagem do anuncio', type: 'url', required: false },
      { key: 'videoUrl', label: 'Video do anuncio', type: 'url', required: false },
      { key: 'clickUrl', label: 'URL destino', type: 'url', required: true },
      { key: 'duration', label: 'Duracao', type: 'number', required: false },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'active', 'paused'], required: true },
    ],
    sports: [
      { key: 'name', label: 'Nome', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'color', label: 'Cor', type: 'color', required: true },
      { key: 'liveCount', label: 'Ao vivo', type: 'number', required: true },
      { key: 'totalEvents', label: 'Eventos', type: 'number', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['active', 'hidden'], required: true },
    ],
    settings: [
      { key: 'name', label: 'Configuracao', type: 'text', required: true },
      { key: 'value', label: 'Valor', type: 'text', required: true },
      { key: 'category', label: 'Categoria', type: 'select', options: ['system', 'security', 'monetization'], required: true },
    ],
  }

  const sectionLabels = {
    users: 'Usuarios',
    events: 'Eventos',
    videos: 'Videos',
    channels: 'Canais',
    campaigns: 'Campanhas',
    ads: 'Anuncios',
    sports: 'Esportes',
    settings: 'Sistema',
  }

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Painel Admin | SPORT+</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js"></script>
        <script src="/static/notifications.js" defer></script>
      </head>
      <body style="background:#080808;min-height:100vh">
        <div id="admin-guard" style="display:none;min-height:100vh">
          <aside class="admin-sidebar" style="width:270px;background:#0a0a0a;border-right:1px solid rgba(255,255,255,0.06);padding:20px 16px;position:fixed;inset:0 auto 0 0;display:flex;flex-direction:column">
            <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:8px;padding:0 8px">
              <div style="width:32px;height:32px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:6px;display:flex;align-items:center;justify-content:center">
                <span style="color:white;font-weight:900;font-size:16px">S</span>
              </div>
              <span style="color:white;font-weight:900;font-size:18px">SPORT<span style="color:#ef4444">+</span></span>
            </a>
            <div style="color:rgba(255,255,255,0.35);font-size:11px;font-weight:700;letter-spacing:1px;padding:0 8px 16px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:16px">PAINEL ADMIN</div>
            <nav id="admin-tabs" style="display:flex;flex-direction:column;gap:4px;flex:1"></nav>
            <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:12px">
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.18);border-radius:8px;padding:10px 12px;margin-bottom:10px">
                <div style="color:white;font-size:13px;font-weight:800">Administrador</div>
                <div id="admin-email-label" style="color:rgba(255,255,255,0.42);font-size:11px">{adminEmail}</div>
              </div>
              <button id="admin-logout" type="button" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;padding:10px 12px;cursor:pointer;font-weight:700">Sair</button>
            </div>
          </aside>

          <main class="admin-main" style="margin-left:270px;padding:28px;min-height:100vh">
            <header class="admin-topbar">
              <div>
                <h1 id="admin-title">Gestao SPORT+</h1>
                <p id="admin-subtitle">Crie, visualize, edite e remova dados da plataforma.</p>
              </div>
              <div class="admin-top-actions">
                <button id="admin-reset" class="admin-action">Repor dados</button>
                <button id="admin-export" class="admin-action">Exportar JSON</button>
                <button id="admin-create" class="admin-action admin-action-primary">Criar</button>
              </div>
            </header>

            <section id="admin-overview" class="admin-panel is-active">
              <div id="admin-kpis" class="admin-kpi-grid"></div>
              <div class="admin-grid-2">
                <div class="admin-card">
                  <h2>Atividade recente</h2>
                  <div id="admin-audit" class="admin-audit"></div>
                </div>
                <div class="admin-card">
                  <h2>Operacao</h2>
                  <div class="admin-health-row"><span>API</span><strong>Online</strong></div>
                  <div class="admin-health-row"><span>Base de dados</span><strong>Postgres ativo</strong></div>
                  <div class="admin-health-row"><span>Persistencia do painel</span><strong>localStorage</strong></div>
                  <div class="admin-health-row"><span>Permissao</span><strong>Admin</strong></div>
                </div>
              </div>
            </section>

            <section id="admin-manager" class="admin-panel">
              <div class="admin-toolbar">
                <div class="admin-search-wrap">
                  <input id="admin-search" type="search" placeholder="Pesquisar..." />
                  <select id="admin-status-filter" class="admin-native-select">
                    <option value="">Todos os status</option>
                  </select>
                </div>
                <div id="admin-count" class="admin-count"></div>
              </div>
              <div class="admin-table-shell">
                <table class="admin-table">
                  <thead id="admin-table-head"></thead>
                  <tbody id="admin-table-body"></tbody>
                </table>
              </div>
            </section>
          </main>
        </div>

        <div id="admin-modal" class="admin-modal" hidden>
          <div class="admin-modal-panel">
            <div class="admin-modal-head">
              <div>
                <h2 id="admin-modal-title">Editar</h2>
                <p id="admin-modal-subtitle">Atualize os campos abaixo.</p>
              </div>
              <button id="admin-modal-close" type="button">x</button>
            </div>
            <div id="admin-modal-body"></div>
            <div id="admin-modal-actions" class="admin-modal-actions"></div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          const ADMIN_SEED = ${JSON.stringify(seed).replace(/</g, '\\u003c')};
          const ADMIN_SCHEMAS = ${JSON.stringify(schemas).replace(/</g, '\\u003c')};
          const ADMIN_LABELS = ${JSON.stringify(sectionLabels).replace(/</g, '\\u003c')};
          const ADMIN_STORAGE_KEY = 'sportplus_admin_store_v6';
          const ADMIN_AUDIT_KEY = 'sportplus_admin_audit_v2';
          let currentSection = 'overview';
          let editingId = null;
          let adminPreviewHls = null;
          let adminHlsFallbackRequested = false;

          const adminRawUser = localStorage.getItem('sportplus_user');
          let adminUser = null;
          try { adminUser = adminRawUser ? JSON.parse(adminRawUser) : null; } catch (_) {}

          if (!adminUser || adminUser.role !== 'admin') {
            window.showToast?.('Acesso admin restrito. Use a credencial admin.', 'error');
            setTimeout(() => { window.location.href = '/login?admin=1'; }, 700);
          } else {
            document.getElementById('admin-guard').style.display = 'block';
            document.getElementById('admin-email-label').textContent = adminUser.email || '${adminEmail}';
          }

          function clone(value) {
            return JSON.parse(JSON.stringify(value));
          }

          function getStore() {
            try {
              return JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)) || clone(ADMIN_SEED);
            } catch (_) {
              return clone(ADMIN_SEED);
            }
          }

          function saveStore(store) {
            localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(store));
          }

          function getAudit() {
            try {
              return JSON.parse(localStorage.getItem(ADMIN_AUDIT_KEY)) || [];
            } catch (_) {
              return [];
            }
          }

          function addAudit(action, section, label) {
            const audit = getAudit();
            audit.unshift({
              id: 'log_' + Date.now(),
              action,
              section,
              label,
              at: new Date().toLocaleString('pt-PT'),
              by: adminUser?.email || '${adminEmail}',
            });
            localStorage.setItem(ADMIN_AUDIT_KEY, JSON.stringify(audit.slice(0, 30)));
            renderAudit();
          }

          function getItemLabel(item) {
            return item.name || item.title || item.email || item.advertiser || item.id;
          }

          function activateSection(section) {
            currentSection = section;
            document.querySelectorAll('.admin-tab').forEach((tab) => tab.classList.toggle('admin-tab-active', tab.dataset.section === section));
            document.getElementById('admin-overview').classList.toggle('is-active', section === 'overview');
            document.getElementById('admin-manager').classList.toggle('is-active', section !== 'overview');
            document.getElementById('admin-create').style.display = section === 'overview' ? 'none' : 'inline-flex';
            document.getElementById('admin-title').textContent = section === 'overview' ? 'Gestao SPORT+' : ADMIN_LABELS[section];
            document.getElementById('admin-subtitle').textContent = section === 'overview' ? 'Crie, visualize, edite e remova dados da plataforma.' : 'Gestao de ' + ADMIN_LABELS[section].toLowerCase() + '.';

            if (section === 'overview') renderOverview();
            else renderManager();
          }

          function apiFetchJSON(path, init = {}) {
            return fetch(path, {
              ...init,
              headers: {
                'Content-Type': 'application/json',
                ...(init.headers || {}),
              },
            }).then((r) => r.json().then((data) => ({ ok: r.ok, status: r.status, data }))).catch((err) => ({ ok: false, status: 0, data: { error: String(err?.message || err) } }));
          }

          function renderTabs() {
            const store = getStore();
            const tabs = [{ id: 'overview', label: 'Overview', count: 'live' }].concat(Object.keys(ADMIN_SCHEMAS).map((id) => ({
              id,
              label: ADMIN_LABELS[id],
              count: store[id]?.length || 0,
            })));

            document.getElementById('admin-tabs').innerHTML = tabs.map((tab) =>
              '<button type="button" class="admin-tab ' + (tab.id === currentSection ? 'admin-tab-active' : '') + '" data-section="' + tab.id + '">' +
                '<span>' + tab.label + '</span><small>' + tab.count + '</small>' +
              '</button>'
            ).join('');

            document.querySelectorAll('.admin-tab').forEach((tab) => tab.addEventListener('click', () => activateSection(tab.dataset.section)));
          }

          async function renderOverview() {
            // Quando disponível, usar backend real.
            const kpiRoot = document.getElementById('admin-kpis');
            if (kpiRoot) kpiRoot.innerHTML = '<div style="color:rgba(255,255,255,0.55);font-size:13px">Carregando stats...</div>';

            const res = await apiFetchJSON('/api/admin/stats');
            if (res?.ok && res.data?.data) {
              const d = res.data.data;
              const kpis = [
                ['Usuarios', d.totalUsers],
                ['Eventos', d.totalEvents],
                ['Videos', (storeFallback('videos') || []).length || 0],
                ['Campanhas ativas', (d.campaigns || []).filter((item) => item.status === 'active').length],
                ['Anuncios', (storeFallback('ads') || []).length || 0],
                ['Canais', (storeFallback('channels') || []).length || 0],
                ['Esportes', (storeFallback('sports') || []).length || 0],
                ['Configuracoes', (storeFallback('settings') || []).length || 0],
              ];

              kpiRoot.innerHTML = kpis.map((item) =>
                '<button type="button" class="admin-card admin-kpi-button" data-jump="' + sectionIdFromLabel(item[0]) + '">' +
                  '<div class="admin-kpi-label">' + item[0] + '</div>' +
                  '<div class="admin-kpi-value">' + item[1] + '</div>' +
                  '<div class="admin-kpi-sub">Gerir agora</div>' +
                '</button>'
              ).join('');

              document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => activateSection(button.dataset.jump)));
            } else {
              // fallback local
              renderOverviewLocal();
            }
            renderAudit();
          }

          function storeFallback(section) {
            try {
              const store = getStore();
              return store?.[section];
            } catch (_) {
              return [];
            }
          }

          function renderOverviewLocal() {
            const store = getStore();
            const kpis = [
              ['Usuarios', store.users.length],
              ['Eventos', store.events.length],
              ['Videos', store.videos.length],
              ['Campanhas ativas', store.campaigns.filter((item) => item.status === 'active').length],
              ['Anuncios', store.ads.length],
              ['Canais', store.channels.length],
              ['Esportes', store.sports.length],
              ['Configuracoes', store.settings.length],
            ];

            document.getElementById('admin-kpis').innerHTML = kpis.map((item) =>
              '<button type="button" class="admin-card admin-kpi-button" data-jump="' + sectionIdFromLabel(item[0]) + '">' +
                '<div class="admin-kpi-label">' + item[0] + '</div>' +
                '<div class="admin-kpi-value">' + item[1] + '</div>' +
                '<div class="admin-kpi-sub">Gerir agora</div>' +
              '</button>'
            ).join('');

            document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => activateSection(button.dataset.jump)));
          }

          function sectionIdFromLabel(label) {
            const map = {
              Usuarios: 'users',
              Eventos: 'events',
              Videos: 'videos',
              'Campanhas ativas': 'campaigns',
              Anuncios: 'ads',
              Canais: 'channels',
              Esportes: 'sports',
              Configuracoes: 'settings',
            };
            return map[label] || 'overview';
          }

          function renderAudit() {
            const audit = getAudit();
            document.getElementById('admin-audit').innerHTML = audit.length ? audit.slice(0, 8).map((log) =>
              '<div class="admin-audit-row"><div><strong>' + log.action + '</strong><span>' + ADMIN_LABELS[log.section] + ' - ' + log.label + '</span></div><small>' + log.at + '</small></div>'
            ).join('') : '<p style="color:rgba(255,255,255,0.45);font-size:13px;margin:0">Ainda nao ha acoes registadas.</p>';
          }

          async function renderManager() {
            if (currentSection === 'campaigns') {
              const tableHead = document.getElementById('admin-table-head');
              const tableBody = document.getElementById('admin-table-body');
              const countEl = document.getElementById('admin-count');
              const schema = ADMIN_SCHEMAS[currentSection];
              const visibleFields = getVisibleFields(schema);

              const query = document.getElementById('admin-search').value.trim().toLowerCase();
              const statusFilter = document.getElementById('admin-status-filter').value;
              const statusKey = 'status';

              tableHead.innerHTML = '<tr>' + visibleFields.map((field) => '<th>' + field.label + '</th>').join('') + '<th>Acoes</th></tr>';
              tableBody.innerHTML = '<tr><td colspan="' + (visibleFields.length + 1) + '" style="color:rgba(255,255,255,0.55)">Carregando campanhas...</td></tr>';
              countEl.textContent = '';

              const res = await apiFetchJSON('/api/admin/campaigns');
              const rows = (res?.ok && res?.data?.data) ? res.data.data : [];

              const filtered = rows.filter((row) => {
                const textMatch = !query || Object.values(row).join(' ').toLowerCase().includes(query);
                const statusMatch = !statusFilter || row[statusKey] === statusFilter;
                return textMatch && statusMatch;
              });

              tableBody.innerHTML = filtered.map((row) =>
                '<tr>' +
                  visibleFields.map((field) => '<td>' + formatCell(row[field.key], field, row) + '</td>').join('') +
                  '<td><div class="admin-row-actions">' +
                    '<button class="admin-row-action" data-view="' + row.id + '">Ver</button>' +
                    // CRUD update/delete ainda nao implementado no backend -> manter apenas visual
                    '<button class="admin-row-action" data-edit="' + row.id + '" disabled style="opacity:0.5;cursor:not-allowed">Editar</button>' +
                    '<button class="admin-row-action admin-row-danger" data-delete="' + row.id + '" disabled style="opacity:0.5;cursor:not-allowed">Apagar</button>' +
                  '</div></td>' +
                '</tr>'
              ).join('');

              countEl.textContent = filtered.length + ' de ' + rows.length + ' registos';
              renderStatusFilter(rows, statusKey);
              wireRowActions();
              return;
            }

            // fallback para mock/other sections
            const store = getStore();
            const rows = store[currentSection] || [];
            const schema = ADMIN_SCHEMAS[currentSection];
            const query = document.getElementById('admin-search').value.trim().toLowerCase();
            const statusFilter = document.getElementById('admin-status-filter').value;
            const statusKey = schema.find((field) => field.key === 'status') ? 'status' : '';
            const visibleFields = getVisibleFields(schema);

            const filtered = rows.filter((row) => {
              const textMatch = !query || Object.values(row).join(' ').toLowerCase().includes(query);
              const statusMatch = !statusFilter || row[statusKey] === statusFilter;
              return textMatch && statusMatch;
            });

            document.getElementById('admin-table-head').innerHTML = '<tr>' + visibleFields.map((field) => '<th>' + field.label + '</th>').join('') + '<th>Acoes</th></tr>';
            document.getElementById('admin-table-body').innerHTML = filtered.map((row) =>
              '<tr>' +
                visibleFields.map((field) => '<td>' + formatCell(row[field.key], field, row) + '</td>').join('') +
                '<td><div class="admin-row-actions">' +
                  '<button class="admin-row-action" data-view="' + row.id + '">Ver</button>' +
                  '<button class="admin-row-action" data-edit="' + row.id + '">Editar</button>' +
                  '<button class="admin-row-action admin-row-danger" data-delete="' + row.id + '">Apagar</button>' +
                '</div></td>' +
              '</tr>'
            ).join('');

            document.getElementById('admin-count').textContent = filtered.length + ' de ' + rows.length + ' registos';
            renderStatusFilter(rows, statusKey);
            wireRowActions();
          }

          function getVisibleFields(schema) {
            const wanted = {
              users: ['name', 'email', 'role', 'plan', 'status'],
              events: ['title', 'sport', 'channel', 'status', 'viewers'],
              videos: ['title', 'type', 'sport', 'views', 'status'],
              channels: ['name', 'owner', 'sport', 'followers', 'status'],
              campaigns: ['name', 'advertiser', 'budget', 'spent', 'status'],
              ads: ['advertiser', 'type', 'clickUrl', 'duration', 'status'],
              sports: ['name', 'slug', 'color', 'totalEvents', 'status'],
              settings: ['name', 'value', 'category'],
            }[currentSection] || schema.slice(0, 5).map((field) => field.key);

            return wanted.map((key) => schema.find((field) => field.key === key)).filter(Boolean);
          }


          function getMediaUrl(row) {
            // Capa pode vir de diversas propriedades dependendo do recurso.
            return row.thumbnail || row.avatar || row.imageUrl || row.cover || row.capa || '';
          }


          function getPlayableUrl(row) {
            return row.videoUrl || row.streamUrl || '';
          }

          function formatCell(value, field, row) {
            if (value === undefined || value === null || value === '') return '-';
            if (['title', 'name', 'advertiser'].includes(field.key)) {
              const media = getMediaUrl(row);
              const description = row.description || row.email || row.clickUrl || row.channel || '';
              return '<div class="admin-content-cell">' +
                (media ? '<img src="' + media + '" alt="" loading="lazy" />' : '<span class="admin-content-fallback">' + String(value).charAt(0).toUpperCase() + '</span>') +
                '<div><strong>' + String(value) + '</strong><small>' + String(description).slice(0, 82) + '</small></div>' +
              '</div>';
            }
            if (field.type === 'color') return '<span class="admin-color-cell"><span style="background:' + value + '"></span>' + value + '</span>';
            if (field.key === 'status') return '<span class="admin-status-pill">' + value + '</span>';
            if (field.type === 'url') return '<a class="admin-url-cell" href="' + value + '" target="_blank" rel="noreferrer">Abrir</a>';
            return String(value);
          }

          function renderStatusFilter(rows, statusKey) {
            const select = document.getElementById('admin-status-filter');
            if (!statusKey) {
              select.style.display = 'none';
              return;
            }

            const current = select.value;
            const statuses = Array.from(new Set(rows.map((row) => row[statusKey]).filter(Boolean)));
            select.style.display = '';
            select.innerHTML = '<option value="">Todos os status</option>' + statuses.map((status) => '<option value="' + status + '">' + status + '</option>').join('');
            select.value = statuses.includes(current) ? current : '';
          }

          function wireRowActions() {
            document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.view)));
            document.querySelectorAll('[data-edit]').forEach((button) => button.addEventListener('click', (e) => {
              if (button.disabled) return;
              openForm('edit', button.dataset.edit);
            }));
            document.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', (e) => {
              if (button.disabled) return;
              openDelete(button.dataset.delete);
            }));
          }


          function openView(id) {
            const item = getStore()[currentSection].find((row) => row.id === id);
            const media = getMediaUrl(item);
            const playableUrl = getPlayableUrl(item);
            document.getElementById('admin-modal-title').textContent = 'Visualizar ' + ADMIN_LABELS[currentSection];
            document.getElementById('admin-modal-subtitle').textContent = getItemLabel(item);
            document.getElementById('admin-modal-body').innerHTML =
              '<div class="admin-preview-layout">' +
                '<div class="admin-preview-media">' +
                  (media ? '<img src="' + media + '" alt="' + getItemLabel(item) + '" />' : '<div class="admin-preview-empty">Sem imagem</div>') +
                  (playableUrl ? '<video id="admin-view-video" controls preload="metadata"></video>' : '') +
                '</div>' +
                '<dl class="admin-detail-list">' + Object.entries(item).map(([key, value]) =>
              '<div><dt>' + key + '</dt><dd>' + value + '</dd></div>'
                ).join('') + '</dl>' +
              '</div>';
            document.getElementById('admin-modal-actions').innerHTML =
              '<button class="admin-action" id="admin-modal-edit">Editar</button><button class="admin-action" id="admin-modal-dismiss">Fechar</button>';
            document.getElementById('admin-modal-edit').addEventListener('click', () => openForm('edit', id));
            document.getElementById('admin-modal-dismiss').addEventListener('click', closeModal);
            showModal();
            attachAdminVideo('admin-view-video', playableUrl);
          }

          function openForm(mode, id) {
            const store = getStore();
            const schema = ADMIN_SCHEMAS[currentSection];
            const item = mode === 'edit' ? store[currentSection].find((row) => row.id === id) : {};
            const media = getMediaUrl(item);
            const playableUrl = getPlayableUrl(item);
            editingId = id || null;

            document.getElementById('admin-modal-title').textContent = mode === 'edit' ? 'Editar ' + ADMIN_LABELS[currentSection] : 'Criar ' + ADMIN_LABELS[currentSection];
            document.getElementById('admin-modal-subtitle').textContent = mode === 'edit' ? getItemLabel(item) : 'Novo registo';
            document.getElementById('admin-modal-body').innerHTML =
              '<form id="admin-crud-form" class="admin-edit-layout">' +
                '<aside class="admin-edit-preview">' +
                  '<div class="admin-edit-preview-frame">' +
                    (media ? '<img id="admin-live-preview" src="' + escapeAttr(media) + '" alt="" />' : '<div id="admin-live-preview-empty" class="admin-preview-empty">Sem imagem</div>') +
                  '</div>' +
                  '<video id="admin-live-video" controls preload="metadata" style="' + (playableUrl ? '' : 'display:none') + '"></video>' +
                  '<div class="admin-edit-preview-meta"><strong>' + escapeHtml(getItemLabel(item) || 'Novo conteudo') + '</strong><span>' + escapeHtml(currentSection) + '</span></div>' +
                '</aside>' +
                '<div class="admin-crud-form">' + schema.map((field) => renderField(field, item[field.key])).join('') + '</div>' +
              '</form>';
            document.getElementById('admin-modal-actions').innerHTML =
              '<button type="button" class="admin-action" id="admin-modal-cancel">Cancelar</button><button type="button" class="admin-action admin-action-primary" id="admin-modal-save">Guardar</button>';
            document.getElementById('admin-modal-cancel').addEventListener('click', closeModal);
            document.getElementById('admin-modal-save').addEventListener('click', saveForm);
            wireMediaPreview();
            showModal();
            attachAdminVideo('admin-live-video', playableUrl);
          }

          function renderField(field, value) {
            const required = field.required ? 'required' : '';
            const safeValue = value ?? '';
            const wideClass = ['thumbnail', 'avatar', 'imageUrl', 'videoUrl', 'streamUrl', 'clickUrl'].includes(field.key) ? ' class="admin-form-wide"' : '';
            if (field.type === 'textarea') {
              return '<label class="admin-form-wide"><span>' + field.label + '</span><textarea name="' + field.key + '" ' + required + '>' + escapeHtml(String(safeValue)) + '</textarea></label>';
            }
            if (field.type === 'select') {
              const value = safeValue || field.options[0] || '';
              return '<label><span>' + field.label + '</span><input type="hidden" name="' + field.key + '" value="' + escapeAttr(value) + '" ' + required + ' />' +
                '<div class="admin-custom-select" data-select-name="' + field.key + '">' +
                  '<button type="button" class="admin-custom-select-trigger"><span>' + escapeHtml(value) + '</span><b></b></button>' +
                  '<div class="admin-custom-select-menu">' +
                    field.options.map((option) => '<button type="button" data-value="' + escapeAttr(option) + '" class="' + (value === option ? 'is-selected' : '') + '">' + escapeHtml(option) + '</button>').join('') +
                  '</div>' +
                '</div></label>';
            }
            return '<label' + wideClass + '><span>' + field.label + '</span><input name="' + field.key + '" type="' + field.type + '" value="' + escapeAttr(String(safeValue)) + '" ' + required + ' /></label>';
          }

          function wireMediaPreview() {
            const form = document.getElementById('admin-crud-form');
            const imageInput = form?.elements.thumbnail || form?.elements.avatar || form?.elements.imageUrl;
            const videoInput = form?.elements.videoUrl || form?.elements.streamUrl;

            imageInput?.addEventListener('input', () => {
              updateImagePreview(imageInput.value);
            });

            videoInput?.addEventListener('input', () => {
              const video = document.getElementById('admin-live-video');
              if (!video) return;
              attachAdminVideo(video, videoInput.value || '');
            });

            document.querySelectorAll('.admin-custom-select').forEach((select) => {
              const trigger = select.querySelector('.admin-custom-select-trigger');
              const hidden = form.elements[select.dataset.selectName];
              trigger?.addEventListener('click', () => {
                document.querySelectorAll('.admin-custom-select').forEach((other) => {
                  if (other !== select) other.classList.remove('is-open');
                });
                select.classList.toggle('is-open');
              });
              select.querySelectorAll('[data-value]').forEach((option) => {
                option.addEventListener('click', () => {
                  hidden.value = option.dataset.value;
                  trigger.querySelector('span').textContent = option.dataset.value;
                  select.querySelectorAll('[data-value]').forEach((item) => item.classList.remove('is-selected'));
                  option.classList.add('is-selected');
                  select.classList.remove('is-open');
                });
              });
            });
          }

          function updateImagePreview(url) {
            const frame = document.querySelector('.admin-edit-preview-frame');
            if (!frame) return;
            frame.innerHTML = url
              ? '<img id="admin-live-preview" src="' + escapeAttr(url) + '" alt="" />'
              : '<div id="admin-live-preview-empty" class="admin-preview-empty">Sem imagem</div>';
          }

          function attachAdminVideo(target, url) {
            const video = typeof target === 'string' ? document.getElementById(target) : target;
            if (!video) return;
            if (adminPreviewHls) {
              adminPreviewHls.destroy();
              adminPreviewHls = null;
            }
            video.pause?.();
            video.removeAttribute('src');
            video.load?.();
            video.style.display = url ? '' : 'none';
            if (!url) return;

            const isHls = /\\.m3u8(\\?|$|\\/)|format=m3u8/i.test(url);
            if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = url;
              return;
            }
            if (isHls) {
              waitForAdminHls(() => {
                adminPreviewHls = new window.Hls({ enableWorker: true, lowLatencyMode: true });
                adminPreviewHls.loadSource(url);
                adminPreviewHls.attachMedia(video);
                adminPreviewHls.on(window.Hls.Events.ERROR, (_, data) => {
                  if (data?.fatal) window.showToast?.('Erro ao carregar preview HLS.', 'error');
                });
              });
              return;
            }
            video.src = url;
          }

          function waitForAdminHls(callback, attempts = 0) {
            if (window.Hls?.isSupported()) {
              callback();
              return;
            }
            if (attempts === 10 && !adminHlsFallbackRequested) {
              adminHlsFallbackRequested = true;
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.6.13/hls.min.js';
              script.async = true;
              document.head.appendChild(script);
            }
            if (attempts < 80) {
              setTimeout(() => waitForAdminHls(callback, attempts + 1), 100);
              return;
            }
            window.showToast?.('Nao foi possivel carregar suporte HLS no browser.', 'error');
          }

          function escapeHtml(value) {
            return String(value ?? '').replace(/[&<>"']/g, (char) => ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;',
            })[char]);
          }

          function escapeAttr(value) {
            return escapeHtml(value).replace(/\\n/g, ' ');
          }

          async function saveForm() {
            const form = document.getElementById('admin-crud-form');
            if (!form) {
              window.showToast?.('Formulario nao encontrado.', 'error');
              return;
            }
            if (!form.reportValidity()) return;

            const schema = ADMIN_SCHEMAS[currentSection];
            const data = {};

            // Suporte para payloads quando o campo nao existe no form (ex: quando imagem vem do backend)
            try {
              schema.forEach((field) => {
                const input = form.elements[field.key];
                if (!input) {
                  // manter como vazio; o payload final decide o que enviar
                  data[field.key] = field.type === 'number' ? 0 : '';
                  return;
                }
                data[field.key] = field.type === 'number' ? Number(input.value || 0) : input.value;
              });


              // CRUD real: campaigns (criar)
              if (currentSection === 'campaigns' && !editingId) {
                const payload = {
                  name: data.name,
                  advertiser: data.advertiser,
                  budget: data.budget,
                  status: data.status,
                };

                const res = await apiFetchJSON('/api/admin/campaigns', {
                  method: 'POST',
                  body: JSON.stringify(payload),
                });

                if (!res?.ok) {
                  window.showToast?.('Erro ao criar campanha (API).', 'error');
                  return;
                }

                addAudit('Criou', currentSection, payload.name);
                window.showToast?.('Campanha criada com sucesso.', 'success');
                closeModal();
                renderTabs();
                await renderManager();
                return;
              }

              // fallback mock/local para outras seções
              const store = getStore();
              if (!Array.isArray(store[currentSection])) store[currentSection] = [];

              if (editingId) {
                const index = store[currentSection].findIndex((row) => String(row.id) === String(editingId));
                if (index < 0) {
                  window.showToast?.('Nao foi possivel encontrar este registo para editar.', 'error');
                  return;
                }
                const updated = { ...store[currentSection][index], ...data, id: store[currentSection][index].id };
                store[currentSection].splice(index, 1, updated);
                saveStore(store);
                addAudit('Editou', currentSection, getItemLabel(updated));
                window.showToast?.('Registo atualizado.', 'success');
              } else {
                const item = { id: currentSection.slice(0, 3) + '_' + Date.now(), ...data };
                store[currentSection].unshift(item);
                saveStore(store);
                addAudit('Criou', currentSection, getItemLabel(item));
                window.showToast?.('Registo criado.', 'success');
              }

              closeModal();
              renderTabs();
              renderManager();
            } catch (error) {
              console.error(error);
              window.showToast?.('Erro ao guardar. Verifica os campos e tenta novamente.', 'error');
            }
          }


          function openDelete(id) {
            const item = getStore()[currentSection].find((row) => row.id === id);
            document.getElementById('admin-modal-title').textContent = 'Apagar registo';
            document.getElementById('admin-modal-subtitle').textContent = getItemLabel(item);
            document.getElementById('admin-modal-body').innerHTML = '<p style="color:rgba(255,255,255,0.72);font-size:14px;margin:0">Esta acao remove o registo do painel local. Podes repor os dados pelo botao Repor dados.</p>';
            document.getElementById('admin-modal-actions').innerHTML =
              '<button class="admin-action" id="admin-modal-cancel">Cancelar</button><button class="admin-action admin-danger-button" id="admin-modal-delete">Apagar</button>';
            document.getElementById('admin-modal-cancel').addEventListener('click', closeModal);
            document.getElementById('admin-modal-delete').addEventListener('click', () => deleteItem(id));
            showModal();
          }

          function deleteItem(id) {
            const store = getStore();
            const item = store[currentSection].find((row) => row.id === id);
            store[currentSection] = store[currentSection].filter((row) => row.id !== id);
            saveStore(store);
            addAudit('Apagou', currentSection, getItemLabel(item));
            closeModal();
            renderTabs();
            renderManager();
            window.showToast?.('Registo apagado.', 'success');
          }

          function showModal() {
            document.getElementById('admin-modal').hidden = false;
          }

          function closeModal() {
            document.getElementById('admin-modal').hidden = true;
            if (adminPreviewHls) {
              adminPreviewHls.destroy();
              adminPreviewHls = null;
            }
            editingId = null;
          }

          document.getElementById('admin-create').addEventListener('click', () => {
            if (currentSection !== 'overview') {
              openForm('create');
            }
          });

          document.getElementById('admin-search').addEventListener('input', renderManager);
          document.getElementById('admin-status-filter').addEventListener('change', renderManager);
          document.getElementById('admin-modal-close').addEventListener('click', closeModal);
          document.getElementById('admin-modal').addEventListener('click', (event) => {
            if (event.target.id === 'admin-modal') closeModal();
          });
          document.addEventListener('click', (event) => {
            if (event.target.closest('.admin-custom-select')) return;
            document.querySelectorAll('.admin-custom-select').forEach((select) => select.classList.remove('is-open'));
          });
          document.getElementById('admin-export').addEventListener('click', () => {
            navigator.clipboard?.writeText(JSON.stringify(getStore(), null, 2));
            window.showToast?.('JSON copiado para a area de transferencia.', 'success');
          });
          document.getElementById('admin-reset').addEventListener('click', () => {
            localStorage.removeItem(ADMIN_STORAGE_KEY);
            localStorage.removeItem(ADMIN_AUDIT_KEY);
            window.showToast?.('Dados repostos.', 'success');
            renderTabs();
            activateSection('overview');
          });
          document.getElementById('admin-logout').addEventListener('click', () => {
            localStorage.removeItem('sportplus_user');
            localStorage.removeItem('sportplus_token');
            window.showToast?.('Sessao admin terminada.', 'success');
            setTimeout(() => { window.location.href = '/'; }, 400);
          });

          renderTabs();
          activateSection('overview');
        `}} />
      </body>
    </html>
  )
}
