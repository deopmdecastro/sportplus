- [x] Identified LiveEventPage loads HLS from jsDelivr (`https://cdn.jsdelivr.net/npm/hls.js@1/...`) which is blocked by Tracking Prevention.
- [x] Removed the jsDelivr HLS `<script>` tag from `src/pages/LiveEventPage.tsx`.
- [ ] Still seeing blocked jsDelivr requests + `Uncaught SyntaxError: Invalid or unexpected token (admin:440)`.
- [x] Identified AdminDashboard also loads HLS from jsDelivr (`src/pages/admin/AdminDashboard.tsx`).
- [x] Removed the jsDelivr HLS `<script>` tag from `src/pages/admin/AdminDashboard.tsx`.
- [ ] Verify runtime: open `/admin` and confirm console no longer shows jsDelivr blocked messages.
- [ ] If `Invalid or unexpected token (admin:440:81)` persists: inspect generated JS around line ~440 in the served admin script, and fix the offending string interpolation/escaping.

