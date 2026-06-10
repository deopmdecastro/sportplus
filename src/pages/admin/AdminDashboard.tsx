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
      { id: 'admin', name: 'Admin sportplus', email: adminEmail, role: 'admin', plan: 'premium', status: 'verified' },
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

  const sectionSingular = {
    users: 'usuario',
    events: 'evento',
    videos: 'video',
    channels: 'canal',
    campaigns: 'campanha',
    ads: 'anuncio',
    sports: 'esporte',
    settings: 'configuracao',
  }

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Painel Admin | sportplus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
                colors: {
                  sport: {
                    red: '#ef4444',
                    ink: '#06080c',
                    panel: '#10141c',
                  },
                },
              },
            },
          };
        `}} />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
        <link href="/static/style.css" rel="stylesheet" />

        <script src="/static/notifications.js" defer></script>




      </head>


      <body class="min-h-screen bg-sport-ink text-white antialiased">
        <div id="admin-guard" class="min-h-screen" style="display:none">
          <aside class="admin-sidebar fixed inset-y-0 left-0 z-30 flex w-[270px] flex-col border-r border-white/10 bg-[#070a10]/95 px-4 py-5 shadow-2xl">
            <a href="/" class="admin-brand group">
              <div class="admin-brand-mark transition-transform group-hover:scale-105">
                <span>S+</span>
              </div>
              <div>
                <strong>sportplus</strong>
                <small>Painel admin</small>
              </div>
            </a>
            <nav id="admin-tabs" class="flex flex-1 flex-col gap-1"></nav>
            <div class="border-t border-white/10 pt-3">
              <div class="admin-user-card">
                <span>A</span>
                <div>
                  <strong>Administrador</strong>
                  <small id="admin-email-label">{adminEmail}</small>
                </div>
              </div>
              <button id="admin-logout" type="button" class="admin-action admin-logout-action w-full justify-center"><i class="ph ph-sign-out"></i>Sair</button>
            </div>
          </aside>

          <main class="admin-main ml-[270px] min-h-screen p-7">
            <header class="admin-topbar">
              <div>
                <h1 id="admin-title">Gestao sportplus</h1>
                <p id="admin-subtitle">Crie, visualize, edite e remova dados da plataforma.</p>
              </div>
              <div class="admin-top-actions">
                <button id="admin-report" class="admin-action"><i class="ph ph-chart-bar"></i>Relatorio</button>
                <button id="admin-reset" class="admin-action"><i class="ph ph-arrow-counter-clockwise"></i>Repor dados</button>
                <button id="admin-export" class="admin-action"><i class="ph ph-file-json"></i>Exportar JSON</button>
                <button id="admin-create" class="admin-action admin-action-primary"><i class="ph ph-plus"></i><span>+ Criar</span></button>
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
              <div id="admin-section-summary" class="admin-section-summary"></div>
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
              <div id="admin-table-footer" class="admin-table-footer"></div>
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
          const ADMIN_SINGULAR = ${JSON.stringify(sectionSingular).replace(/</g, '\\u003c')};
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

          const ADMIN_ICONS = {
            overview: 'ph-squares-four',
            users: 'ph-users-three',
            events: 'ph-calendar-blank',
            videos: 'ph-video-camera',
            channels: 'ph-monitor-play',
            campaigns: 'ph-briefcase',
            ads: 'ph-megaphone',
            sports: 'ph-soccer-ball',
            settings: 'ph-gear-six',
          };

          function formatNumber(value) {
            const number = Number(value || 0);
            return new Intl.NumberFormat('pt-PT').format(number);
          }

          function activateSection(section) {
            currentSection = section;
            document.body.dataset.adminSection = section;
            document.querySelectorAll('.admin-tab').forEach((tab) => tab.classList.toggle('admin-tab-active', tab.dataset.section === section));
            document.getElementById('admin-overview').classList.toggle('is-active', section === 'overview');
            document.getElementById('admin-manager').classList.toggle('is-active', section !== 'overview');
            document.getElementById('admin-create').style.display = section === 'overview' ? 'none' : 'inline-flex';
            document.getElementById('admin-create').innerHTML = '<i class="ph ph-plus"></i><span>Criar ' + (ADMIN_SINGULAR[section] || 'registo') + '</span>';
            document.getElementById('admin-title').textContent = section === 'overview' ? 'Gestao sportplus' : ADMIN_LABELS[section];
            document.getElementById('admin-subtitle').textContent = section === 'overview' ? 'Crie, visualize, edite e remova dados da plataforma.' : 'Gestao de ' + ADMIN_LABELS[section].toLowerCase() + '.';
            document.getElementById('admin-search').placeholder = section === 'overview' ? 'Pesquisar...' : 'Buscar ' + ADMIN_LABELS[section].toLowerCase() + '...';

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

          function renderKpiCard(item) {
            const section = sectionIdFromLabel(item[0]);
            const icon = ADMIN_ICONS[section] || 'ph-circle';
            return '<button type="button" class="admin-card admin-kpi-button" data-jump="' + section + '">' +
              '<span class="admin-kpi-icon"><i class="ph ' + icon + '"></i></span>' +
              '<div class="admin-kpi-copy">' +
                '<div class="admin-kpi-label">' + item[0] + '</div>' +
                '<div class="admin-kpi-value">' + formatNumber(item[1]) + '</div>' +
                '<div class="admin-kpi-sub">Gerir agora</div>' +
              '</div>' +
            '</button>';
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
                '<span><i class="ph ' + (ADMIN_ICONS[tab.id] || 'ph-circle') + '"></i>' + tab.label + '</span><small>' + tab.count + '</small>' +
              '</button>'
            ).join('');

            document.querySelectorAll('.admin-tab').forEach((tab) => tab.addEventListener('click', () => activateSection(tab.dataset.section)));
          }

          async function renderOverview() {
            const kpiRoot = document.getElementById('admin-kpis');
            if (kpiRoot) {
              kpiRoot.innerHTML = '<div style="color:rgba(255,255,255,0.55);font-size:13px">Carregando stats...</div>';
            }

            let res;
            try {
              res = await apiFetchJSON('/api/admin/stats');
            } catch (e) {
              res = null;
            }

            const hasData = !!(res?.ok && res?.data?.data);
            if (hasData) {
              const d = res.data.data;
              const kpis = [
                ['Usuarios', d.totalUsers ?? 0],
                ['Eventos', d.totalEvents ?? 0],
                ['Videos', (storeFallback('videos') || []).length || 0],
                ['Campanhas ativas', (d.campaigns || []).filter((item) => item.status === 'active').length || 0],
                ['Anuncios', (storeFallback('ads') || []).length || 0],
                ['Canais', (storeFallback('channels') || []).length || 0],
                ['Esportes', (storeFallback('sports') || []).length || 0],
                ['Configuracoes', (storeFallback('settings') || []).length || 0],
              ];

              if (kpiRoot) {
                kpiRoot.innerHTML = kpis.map(renderKpiCard).join('');

                document.querySelectorAll('[data-jump]').forEach((button) =>
                  button.addEventListener('click', () => activateSection(button.dataset.jump))
                );
              }
            } else {
              // fallback local + mensagem de erro
              window.showToast?.('Falha ao carregar stats da API. A usar dados locais.', 'error');
              renderOverviewLocal();
            }

            // Se o store local estiver vazio, mostramos uma mensagem amigável.
            try {
              const store = getStore();
              const overviewEmpty =
                !store?.users?.length && !store?.events?.length && !store?.campaigns?.length;
              if (kpiRoot && overviewEmpty) {
                kpiRoot.innerHTML = '<div style="color:rgba(255,255,255,0.55);font-size:13px">Sem dados para mostrar.</div>';
              }
            } catch (_) {}

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

            document.getElementById('admin-kpis').innerHTML = kpis.map(renderKpiCard).join('');

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

              let res;
              try {
                res = await apiFetchJSON('/api/admin/campaigns');
              } catch (e) {
                res = null;
              }

              if (!res?.ok || !res?.data?.data) {
                window.showToast?.('Falha ao carregar campanhas da API. A usar dados locais.', 'error');
              }

              const rows = (res?.ok && res?.data?.data) ? res.data.data : (storeFallback(currentSection) || []);


              const filtered = rows.filter((row) => {
                const textMatch = !query || Object.values(row).join(' ').toLowerCase().includes(query);
                const statusMatch = !statusFilter || row[statusKey] === statusFilter;
                return textMatch && statusMatch;
              });

              renderSectionSummary(rows, filtered, statusKey);
              tableBody.innerHTML = filtered.length ? filtered.map((row) =>
                '<tr>' +
                  visibleFields.map((field) => '<td>' + formatCell(row[field.key], field, row) + '</td>').join('') +
                  '<td>' + renderRowActions(row.id, true) + '</td>' +
                '</tr>'
              ).join('') : renderEmptyRow(visibleFields.length + 1);

              countEl.textContent = filtered.length + ' de ' + rows.length + ' registos';
              renderStatusFilter(rows, statusKey);
              renderTableFooter(filtered.length, rows.length);
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
            renderSectionSummary(rows, filtered, statusKey);
            document.getElementById('admin-table-body').innerHTML = filtered.length ? filtered.map((row) =>
              '<tr>' +
                visibleFields.map((field) => '<td>' + formatCell(row[field.key], field, row) + '</td>').join('') +
                '<td>' + renderRowActions(row.id, false) + '</td>' +
              '</tr>'
            ).join('') : renderEmptyRow(visibleFields.length + 1);

            document.getElementById('admin-count').textContent = filtered.length + ' de ' + rows.length + ' registos';
            renderStatusFilter(rows, statusKey);
            renderTableFooter(filtered.length, rows.length);
            wireRowActions();
          }

          function renderSectionSummary(rows, filtered, statusKey) {
            const root = document.getElementById('admin-section-summary');
            if (!root) return;
            const activeValues = ['live', 'active', 'published', 'verified'];
            const pendingValues = ['upcoming', 'pending', 'review', 'scheduled', 'draft'];
            const active = statusKey ? rows.filter((row) => activeValues.includes(row[statusKey])).length : rows.length;
            const pending = statusKey ? rows.filter((row) => pendingValues.includes(row[statusKey])).length : 0;
            root.innerHTML =
              '<div class="admin-summary-card">' +
                '<i class="ph ' + (ADMIN_ICONS[currentSection] || 'ph-stack') + '"></i>' +
                '<div><strong>' + formatNumber(rows.length) + '</strong><span>Total em ' + ADMIN_LABELS[currentSection].toLowerCase() + '</span></div>' +
              '</div>' +
              '<div class="admin-summary-card">' +
                '<i class="ph ph-pulse"></i>' +
                '<div><strong>' + formatNumber(active) + '</strong><span>Ativos agora</span></div>' +
              '</div>' +
              '<div class="admin-summary-card">' +
                '<i class="ph ph-funnel"></i>' +
                '<div><strong>' + formatNumber(filtered.length) + '</strong><span>Resultados filtrados</span></div>' +
              '</div>' +
              '<div class="admin-summary-card">' +
                '<i class="ph ph-clock-countdown"></i>' +
                '<div><strong>' + formatNumber(pending) + '</strong><span>Pendentes</span></div>' +
              '</div>';
          }

          function renderTableFooter(filteredCount, totalCount) {
            const root = document.getElementById('admin-table-footer');
            if (!root) return;
            root.innerHTML =
              '<span>Mostrando ' + formatNumber(filteredCount) + ' de ' + formatNumber(totalCount) + ' registos</span>' +
              '<div class="admin-pagination">' +
                '<button type="button" disabled><i class="ph ph-caret-left"></i></button>' +
                '<button type="button" class="is-active">1</button>' +
                '<button type="button" disabled><i class="ph ph-caret-right"></i></button>' +
              '</div>';
          }

          function renderEmptyRow(colspan) {
            return '<tr><td colspan="' + colspan + '"><div class="admin-empty-state">' +
              '<i class="ph ph-magnifying-glass"></i>' +
              '<strong>Nenhum registo encontrado</strong>' +
              '<span>Ajuste a pesquisa ou remova o filtro de status.</span>' +
            '</div></td></tr>';
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

          function renderRowActions(id, readonly = false) {
            const disabled = readonly ? ' disabled style="opacity:0.52;cursor:not-allowed"' : '';
            return '<div class="admin-row-actions">' +
              '<button class="admin-row-action" data-view="' + id + '"><i class="ph ph-eye"></i>Ver</button>' +
              '<button class="admin-row-action" data-edit="' + id + '"' + disabled + '><i class="ph ph-pencil-simple"></i>Editar</button>' +
              '<button class="admin-row-action admin-row-danger" data-delete="' + id + '"' + disabled + '><i class="ph ph-trash"></i></button>' +
            '</div>';
          }

          function renderSparkline(value, status) {
            const isLive = status === 'live' || status === 'active';
            return '<span class="admin-sparkline ' + (isLive ? 'is-live' : 'is-calm') + '"></span>';
          }

          function statusLabel(value) {
            const labels = {
              live: 'AO VIVO',
              upcoming: 'UPCOMING',
              ended: 'ENCERRADO',
              active: 'ATIVO',
              paused: 'PAUSADO',
              scheduled: 'AGENDADO',
              published: 'PUBLICADO',
              draft: 'RASCUNHO',
              blocked: 'BLOQUEADO',
              pending: 'PENDENTE',
              verified: 'VERIFICADO',
              review: 'REVISAO',
              hidden: 'OCULTO',
            };
            return labels[value] || String(value).toUpperCase();
          }

          function detailLabel(key) {
            const labels = {
              id: 'ID',
              title: 'Titulo',
              name: 'Nome',
              thumbnail: 'Thumbnail',
              avatar: 'Avatar',
              imageUrl: 'Imagem',
              streamUrl: 'Stream URL',
              videoUrl: 'Video URL',
              description: 'Descricao',
              sport: 'Esporte',
              channel: 'Canal',
              owner: 'Dono',
              status: 'Status',
              viewers: 'Viewers',
              views: 'Views',
              followers: 'Seguidores',
              premium: 'Premium',
              role: 'Perfil',
              plan: 'Plano',
              email: 'Email',
              advertiser: 'Anunciante',
              budget: 'Budget',
              spent: 'Gasto',
              ctr: 'CTR',
              type: 'Tipo',
              clickUrl: 'URL destino',
              duration: 'Duracao',
              slug: 'Slug',
              color: 'Cor',
              liveCount: 'Ao vivo',
              totalEvents: 'Eventos',
              value: 'Valor',
              category: 'Categoria',
            };
            return labels[key] || key;
          }

          function formatDetailValue(key, value) {
            if (value === undefined || value === null || value === '') return '-';
            if (['viewers', 'views', 'followers', 'budget', 'spent', 'liveCount', 'totalEvents'].includes(key)) return formatNumber(value);
            if (key === 'status') return '<span class="admin-status-pill admin-status-' + String(value).toLowerCase() + '"><i></i>' + statusLabel(value) + '</span>';
            if (key === 'color') return '<span class="admin-color-cell"><span style="background:' + escapeAttr(value) + '"></span>' + escapeHtml(value) + '</span>';
            return escapeHtml(String(value));
          }

          function renderDetailCard(key, value) {
            const isUrl = /(url|thumbnail|avatar|image|stream)/i.test(key) && value;
            return '<div class="admin-view-detail-card">' +
              '<dt>' + detailLabel(key) + '</dt>' +
              '<dd>' + formatDetailValue(key, value) + '</dd>' +
              (isUrl ? '<button type="button" class="admin-copy-detail" data-copy="' + escapeAttr(String(value)) + '" aria-label="Copiar"><i class="ph ph-copy"></i></button>' : '') +
            '</div>';
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
            if (field.key === 'status') return '<span class="admin-status-pill admin-status-' + String(value).toLowerCase() + '"><i></i>' + statusLabel(value) + '</span>';
            if (field.type === 'url') return '<a class="admin-url-cell" href="' + value + '" target="_blank" rel="noreferrer">Abrir</a>';
            if (['viewers', 'views', 'followers', 'budget', 'spent', 'liveCount', 'totalEvents'].includes(field.key)) {
              return '<span class="admin-number-cell">' + formatNumber(value) + '</span>' + (field.key === 'viewers' ? renderSparkline(value, row.status) : '');
            }
            if (['sport', 'channel', 'owner', 'role', 'plan', 'type'].includes(field.key)) return '<span class="admin-meta-cell">' + String(value) + '</span>';
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
            if (!item) {
              window.showToast?.('Registo nao encontrado.', 'error');
              return;
            }
            const media = getMediaUrl(item);
            const playableUrl = getPlayableUrl(item);
            document.getElementById('admin-modal-title').textContent = 'Visualizar ' + ADMIN_LABELS[currentSection];
            document.getElementById('admin-modal-subtitle').textContent = getItemLabel(item);
            document.getElementById('admin-modal-body').innerHTML =
              '<div class="admin-view-layout">' +
                '<section class="admin-view-media">' +
                  (media ? '<img src="' + escapeAttr(media) + '" alt="' + escapeAttr(getItemLabel(item)) + '" />' : '<div class="admin-preview-empty"><i class="ph ph-image"></i><span>Sem imagem</span></div>') +
                  '<div class="admin-view-preview">' +
                    (playableUrl ? '<video id="admin-view-video" controls preload="metadata"></video>' : '<div class="admin-preview-empty"><strong>Preview</strong><span>Not Available</span></div>') +
                  '</div>' +
                '</section>' +
                '<section class="admin-view-details">' +
                  Object.entries(item).map(([key, value]) => renderDetailCard(key, value)).join('') +
                '</section>' +
              '</div>';
            document.getElementById('admin-modal-actions').innerHTML =
              '<button class="admin-action admin-view-edit" id="admin-modal-edit"><i class="ph ph-pencil-simple"></i>Editar</button><button class="admin-action" id="admin-modal-dismiss"><i class="ph ph-x"></i>Fechar</button>';
            document.getElementById('admin-modal-edit').addEventListener('click', () => openForm('edit', id));
            document.getElementById('admin-modal-dismiss').addEventListener('click', closeModal);
            document.querySelectorAll('[data-copy]').forEach((button) => {
              button.addEventListener('click', () => {
                navigator.clipboard?.writeText(button.dataset.copy || '');
                window.showToast?.('Valor copiado.', 'success');
              });
            });
            showModal();
            attachAdminVideo('admin-view-video', playableUrl);
          }

          function openForm(mode, id) {
            const store = getStore();
            const schema = ADMIN_SCHEMAS[currentSection];
            const item = mode === 'edit' ? store[currentSection].find((row) => row.id === id) : {};
            const isEditMode = mode === 'edit';
            const singularLabel = ADMIN_SINGULAR[currentSection] || 'registo';
            const modalLabel = singularLabel.charAt(0).toUpperCase() + singularLabel.slice(1);
            const itemLabel = getItemLabel(item) || 'Novo conteudo';
            const titleIcon = isEditMode ? 'ph-pencil-simple' : 'ph-plus-circle';
            editingId = id || null;

            document.getElementById('admin-modal-title').innerHTML =
              '<span class="admin-modal-title-icon"><i class="ph ' + titleIcon + '"></i></span>' +
              (isEditMode ? 'Editar ' : 'Criar ') + modalLabel;
            document.getElementById('admin-modal-subtitle').textContent = isEditMode
              ? 'Faca as alteracoes necessarias para "' + itemLabel + '".'
              : 'Preencha os dados para criar um novo ' + singularLabel + '.';
            document.getElementById('admin-modal-body').innerHTML =
              '<form id="admin-crud-form" class="admin-crud-form admin-crud-form-refined admin-crud-form-compact">' +
                schema.map((field) => renderField(field, item[field.key])).join('') +
              '</form>';
            document.getElementById('admin-modal-actions').innerHTML =
              '<button type="button" class="admin-action" id="admin-modal-cancel"><i class="ph ph-x"></i>Cancelar</button>' +
              '<button type="button" class="admin-action admin-action-primary" id="admin-modal-save"><i class="ph ph-floppy-disk"></i>' + (isEditMode ? 'Salvar Alteracoes' : 'Criar Registo') + '</button>';
            document.getElementById('admin-modal-cancel').addEventListener('click', closeModal);
            document.getElementById('admin-modal-save').addEventListener('click', saveForm);
            wireMediaPreview();
            showModal();
          }

          function renderField(field, value) {
            const required = field.required ? 'required' : '';
            const safeValue = value ?? '';
            const isWideField = ['title', 'name', 'thumbnail', 'avatar', 'imageUrl', 'videoUrl', 'streamUrl', 'clickUrl'].includes(field.key);
            const fieldClass = ' class="admin-field-card' + (isWideField ? ' admin-form-wide' : '') + '"';
            const isImageField = ['thumbnail', 'avatar', 'imageUrl', 'cover', 'capa'].includes(field.key);
            if (isImageField) {
              return (
                '<label' + fieldClass + '>' +
                '<span>' + field.label + '</span>' +
                '<input type="hidden" name="' + field.key + '" value="' + escapeAttr(String(safeValue)) + '" ' + (field.required ? 'required' : '') + ' />' +
                '<div class="admin-filezone" data-filezone-for="' + field.key + '">' +
                  '<div class="admin-filezone-previewrow">' +
                    '<div class="admin-filezone-thumb" data-thumb-for="' + field.key + '">' +
                      (safeValue ? '<img src="' + escapeAttr(String(safeValue)) + '" alt="" />' : '<div class="admin-preview-empty"><i class="ph ph-image-square"></i></div>') +
                    '</div>' +
                    '<div class="admin-filezone-main">' +
                      '<input type="url" class="admin-filezone-url" data-url-input="' + field.key + '" placeholder="Cole a URL da imagem" value="' + escapeAttr(String(safeValue)) + '" />' +
                      '<div class="admin-filezone-cta">' +
                        '<button type="button" class="admin-filezone-pick"><i class="ph ph-upload-simple"></i>Mudar imagem</button>' +
                        '<span class="admin-filezone-hint">JPG, PNG ou WEBP</span>' +
                      '</div>' +
                      '<div class="admin-filezone-status" data-status-for="' + field.key + '"></div>' +
                    '</div>' +
                  '</div>' +
                  '<input class="admin-filezone-input" type="file" accept="image/jpeg,image/png,image/webp" style="display:none" />' +
                '</div>' +
                '</label>'
              );
            }
            if (field.type === 'textarea') {
              return '<label class="admin-field-card admin-form-wide"><span>' + field.label + '</span><textarea name="' + field.key + '" ' + required + '>' + escapeHtml(String(safeValue)) + '</textarea></label>';
            }
            if (field.type === 'select') {
              const value = safeValue || field.options[0] || '';
              return '<label class="admin-field-card"><span>' + field.label + '</span><input type="hidden" name="' + field.key + '" value="' + escapeAttr(value) + '" ' + required + ' />' +
                '<div class="admin-custom-select" data-select-name="' + field.key + '">' +
                  '<button type="button" class="admin-custom-select-trigger"><span>' + escapeHtml(value) + '</span><b></b></button>' +
                  '<div class="admin-custom-select-menu">' +
                    field.options.map((option) => '<button type="button" data-value="' + escapeAttr(option) + '" class="' + (value === option ? 'is-selected' : '') + '">' + escapeHtml(option) + '</button>').join('') +
                  '</div>' +
                '</div></label>';
            }
            return '<label' + fieldClass + '><span>' + field.label + '</span><input name="' + field.key + '" type="' + field.type + '" value="' + escapeAttr(String(safeValue)) + '" ' + required + ' /></label>';
          }

          function wireMediaPreview() {
            const form = document.getElementById('admin-crud-form');
            const videoInput = form?.elements.videoUrl || form?.elements.streamUrl;

            // Wire custom selects
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

            // Wire image upload zones (file + URL fallback)
            document.querySelectorAll('.admin-filezone').forEach((zone) => {
              const fieldKey = zone.dataset.filezoneFor;
              if (!fieldKey) return;
              wireImageUploadZone(zone, fieldKey);
            });

            // Video preview from URL
            videoInput?.addEventListener('input', () => {
              const video = document.getElementById('admin-live-video');
              if (!video) return;
              attachAdminVideo(video, videoInput.value || '');
            });
          }

          function updateImagePreview(url) {
            const frame = document.querySelector('.admin-edit-preview-frame');
            if (!frame) return;
            frame.innerHTML = url
              ? '<img id="admin-live-preview" src="' + escapeAttr(url) + '" alt="" />'
              : '<div id="admin-live-preview-empty" class="admin-preview-empty">Sem imagem</div>';
          }

          function setZoneStatus(zone, statusText, statusType = '') {
            const statusEl = zone.querySelector('[data-status-for]');
            if (!statusEl) return;
            statusEl.textContent = statusText || '';
            statusEl.className = 'admin-filezone-status ' + (statusType ? 'is-' + statusType : '');
          }

          function wireImageUploadZone(zone, fieldKey) {
            const inputFile = zone.querySelector('.admin-filezone-input');
            const pickBtn = zone.querySelector('.admin-filezone-pick');
            const urlInput = zone.querySelector('.admin-filezone-url');
            const hidden = document.getElementById('admin-crud-form')?.elements?.[fieldKey];
            const thumbWrap = zone.querySelector('[data-thumb-for]');

            const updateThumb = (url) => {
              if (!thumbWrap) return;
              thumbWrap.innerHTML = url
                ? '<img src="' + escapeAttr(String(url)) + '" alt="" />'
                : '<div class="admin-preview-empty">Sem imagem</div>';
            };

            const currentValue = hidden?.value || urlInput?.value || '';
            updateThumb(currentValue ? currentValue : '');

            // URL fallback
            urlInput?.addEventListener('input', () => {
              if (hidden) hidden.value = urlInput.value || '';
              updateThumb(urlInput.value || '');
              if (urlInput.value) setZoneStatus(zone, 'URL definida.', 'success');
            });

            pickBtn?.addEventListener('click', () => inputFile?.click());

            zone.addEventListener('dragover', (e) => {
              e.preventDefault();
              zone.classList.add('is-dragover');
            });
            zone.addEventListener('dragleave', () => zone.classList.remove('is-dragover'));
            zone.addEventListener('drop', (e) => {
              e.preventDefault();
              zone.classList.remove('is-dragover');
              const files = e.dataTransfer?.files;
              if (files && files.length) handleImageFiles(files, zone, fieldKey);
            });

            inputFile?.addEventListener('change', () => {
              const files = inputFile.files;
              if (files && files.length) handleImageFiles(files, zone, fieldKey);
            });

            async function handleImageFiles(files, zoneEl, key) {
              const file = files[0];
              if (!file) return;

              const statusBase = document.querySelector('.admin-filezone-status');
              setZoneStatus(zoneEl, 'A preparar imagem...', '');
              zoneEl.classList.add('is-uploading');

              try {
                validateImageFile(file);
                const webpBlob = await optimizeImageToWebp(file);

                setZoneStatus(zoneEl, 'A enviar...', '');
                const formData = new FormData();
                formData.append('image', webpBlob, file.name.replace(/\.[^.]+$/, '') + '.webp');
                formData.append('field', key);

                // Persistently store image and get URL
                const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData });
                const json = await res.json().catch(() => ({}));
                if (!res.ok || !json?.success || !json?.url) {
                  throw new Error(json?.error || 'Upload falhou');
                }

                const url = json.url;
                if (hidden) hidden.value = url;
                updateThumb(url);
                setZoneStatus(zoneEl, 'Upload concluido.', 'success');

                // Update modal big preview if this field is the main preview
                if (['thumbnail', 'avatar', 'imageUrl', 'cover', 'capa'].includes(key)) {
                  updateImagePreview(url);
                }
              } catch (err) {
                console.error(err);
                setZoneStatus(zoneEl, String(err?.message || err || 'Erro ao processar imagem'), 'error');
              } finally {
                zoneEl.classList.remove('is-uploading');
              }
            }
          }

          function validateImageFile(file) {
            const allowed = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowed.includes(file.type)) {
              throw new Error('Formato invalido. Use JPG, PNG ou WEBP.');
            }
            const maxBytes = 8 * 1024 * 1024; // 8MB
            if (file.size > maxBytes) {
              throw new Error('Imagem demasiado grande. Max 8MB.');
            }
          }

          async function optimizeImageToWebp(file) {
            // Resize large images for better performance
            const imgBitmap = await createImageBitmap(file);
            const maxW = 1400;
            const maxH = 900;

            const scale = Math.min(1, maxW / imgBitmap.width, maxH / imgBitmap.height);
            const targetW = Math.max(1, Math.round(imgBitmap.width * scale));
            const targetH = Math.max(1, Math.round(imgBitmap.height * scale));

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(imgBitmap, 0, 0, targetW, targetH);

            // WEBP quality 0.78 is a good compromise
            const blob = await new Promise((resolve, reject) => {
              canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao gerar WEBP'))), 'image/webp', 0.78);
            });

            // Basic sanity check
            if (!blob || !blob.size) throw new Error('Falha ao otimizar imagem.');
            return blob;
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
          document.getElementById('admin-report').addEventListener('click', () => {
            window.showToast?.('Relatorio preparado com os dados atuais do painel.', 'success');
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
