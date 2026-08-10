# Guild Command Center PWA

The canonical application source is `playbooks/guild-command-center.html`.
The PWA shell in this directory adds installability, offline caching, icons,
security headers, guarded CSV restore, and update handling without adding a
backend, login, CRM, API call, or paid service.

## Live release

- **URL:** https://guild-command-center.brandonwadepackard.workers.dev
- **Status:** LIMITED_TEST_READY — automated + live checks passed at source
  commit `ff79f94`; awaiting Brandon's on-phone proof (Safari Add to Home
  Screen + airplane-mode open/reload/export) before full release.
- **Receipt:** `pwa/RELEASE-2026-08-09.md` (etag, byte hashes, live checks).
- Transport is a static Cloudflare Worker with no bindings, storage,
  analytics, API, payment, CRM, or OpenAI dependency. The URL is
  public-by-URL; all field data stays device-local.

## Build and test

```bash
npm ci
npm run build
npm test
```

`npm run build` stages only the public app files in ignored `dist/`. It copies
the canonical HTML byte-for-byte to `dist/index.html`, so the artifact and the
deployed app cannot silently become two different products.

## Data contract

- Door data stays in this browser/device's local storage.
- Export CSV at the end of every field session and before reset or restore.
- CSV restore validates the exact schema, unique doors 1–20, locked odd/even
  price cohorts, and demo/no-answer truth rules before showing a destructive
  confirmation. It never merges ambiguous records.
- The service worker caches the app shell, not the field log. Browser storage
  remains the canonical working copy; the exported CSV is the portable backup.

## Release proof

Desktop automation proves build identity, manifest/install assets, security
configuration, guarded restore, persistence across reopen, and offline reopen
after first load. A release remains limited-test ready until Brandon proves on
his actual phone: Add to Home Screen, save/export, close/reopen, airplane-mode
reopen, restore, then typed reset.

