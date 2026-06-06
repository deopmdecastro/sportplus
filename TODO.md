# TODO - Melhorias SPORT+ (Admin CRUD real)

## Passo 1
- [ ] Atualizar `src/pages/admin/AdminDashboard.tsx` para carregar KPIs e lista de `campaigns` via backend endpoints:
  - `GET /api/admin/stats`
  - `GET /api/admin/campaigns`
  - `POST /api/admin/campaigns`
- [ ] Incluir estados: loading/error/empty na UI do Admin

## Passo 2
- [ ] (Opcional) Estender CRUD real para outros recursos (events/videos/users/channels) quando endpoints existirem

## Passo 3
- [ ] Testar manualmente no browser:
  - Abrir `/admin`
  - Ver KPIs
  - Ver tabela de campanhas
  - Criar campanha

