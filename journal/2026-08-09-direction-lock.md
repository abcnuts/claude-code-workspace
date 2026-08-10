---
date: 2026-08-09
type: log
project: the-guild
status: source
tags:
- type/log
- project/the-guild
- direction-lock
---

# 2026-08-09 — Direction Lock — Brandon's Confirmed Decisions

Brandon confirmed the governing direction. These carry decision authority;
do not reopen.

## Locked

1. **Business shape:** wedge → ladder → referral flywheel. The small offer
   is customer acquisition, not the whole business.
2. **Door demo = ordinary subscription ChatGPT on the prospect's phone,**
   live in front of them. The paid Responses-API probe is a separate
   INTERNAL baseline/before-after proof lane. It is NOT a pre-door
   blocker. No API key requests and no paid API calls in this phase —
   the probe lane activates at first close or on Brandon's explicit
   trigger.
3. Fulfillment playbook v1 and price tiers ($497/$997/$149-mo): approved.
4. First learn-sprint territory: **Lehi, Utah.**

## Corrections applied this session (receipts)

- `plans/2026-08-08-build-phase-plan.md` revised: Phase 4 API calibration
  removed as launch gate → deferred lane; territory recorded; gating
  items now GHL build → cards → dry run → Lehi sprint.
- `plans/2026-08-09-lehi-learn-sprint.md` created: first-wave scope,
  trade cohorts, ChatGPT-on-their-phone demo procedure with honest
  handling of both outcomes, GHL recording spec (adds demo_result
  field), pass/fail evidence after 20 doors.
- `handoffs/2026-08-08-codex-phase4-handoff.md` revised: Lehi trades
  list is the only active mission; Phase 4 explicitly DEFERRED with
  no-key/no-paid-calls rule.
- `playbooks/price-card-print.html`: "We work to make it yours" →
  "We measure where you stand, do the work, and prove what changed"
  (honesty rule: measure → improve → prove; guarantee only the work and
  the report). Artifact republished at the same URL. Repo-wide scan
  found no other customer-facing violations.

## Verification follow-up corrections (same day, Brandon's review)

1. Lehi sprint plan door script: "That's who's getting the call instead
   of you" → "That's who ChatGPT named in this answer instead of you"
   (one answer proves naming, not call-flow).
2. Same file: "the monthly plan is how you stay there…" → "the monthly
   plan is how we keep doing the work and remeasure as it changes"
   (no implied visibility guarantee).
3. Skill creation/install removed from the Codex work order and canonical
   handoff entirely — the mined skills are deferred reference only
   (`journal/2026-08-07-skill-mining-register.md`), not a launch gate.
   No skills are to be created. The canonical-store rule
   (`~/Projects/skills`, dedupe once, canonical backup) stands for any
   future skill work Brandon explicitly triggers.

## Probe state of record (per Brandon, 2026-08-09 — updated same day)

`brandonwadepackard-cell/guild-visibility-probe` (private), `main` at
`0e455bfd200da0d3f64892c6f6915de9cb77d882`, default model
`gpt-5.6-terra`, tests 8/8 passing. Search-required and invalid-run
protections intact and to remain so.

## Codex-local lane COMPLETE (2026-08-09, Brandon's receipt)

`probe/questions.yaml` updated with exactly sprinkler, garage_door,
auto_repair (Lehi wave-one set complete); pushed to `main` @
`0e455bfd200da0d3f64892c6f6915de9cb77d882`; pytest 8/8; `import app,
cli` clean; secret scan clean; repo confirmed private. No remaining
Codex launch task. Skills and the paid API lane remain deferred,
unchanged.

## Lean correction (Brandon-verified authority, 2026-08-09)

- **No personal/Guild GoHighLevel account exists** — Mac browser and
  connected mail show no account/signup/billing evidence. The only live
  HighLevel access on the Mac is a location-scoped integration into a
  client's sub-account: a separate client system, explicitly OFF-LIMITS
  for Guild use. The "GHL login/build" launch prerequisite was a false
  assumption and is removed from the first-sprint path.
- No GHL account creation, trial, number purchase, or paid service in
  this phase. GHL (or equivalent) is a post-validation procurement
  decision AFTER a close; `playbooks/ghl-funnel-build-sheet.md` remains
  the ready spec for that day.
- Cards and a dedicated line/QR are post-signal infrastructure, not
  prerequisites for the first 20 doors. Prices and doctrine unchanged.
- **Zero-cost first-sprint path built:** `playbooks/lehi-field-log.html`
  — self-contained offline field log (no backend, login, libraries, or
  network calls; localStorage autosave; progress /20; CSV export with
  proper escaping; typed-RESET-gated erase; business info only, no
  customer PII) + `playbooks/lehi-field-log-template.csv` fallback.
  Private artifact: e52d93c2-62b6-464c-9c9b-8c6eb0208edb.
- **Protocol-integrity revision (same day, independent verification):**
  door number enforced 1–20 with duplicate rejection and a completion
  lock after 20 unique doors (progress counts unique doors); price
  cohort is derived from door parity (odd $497 / even $997), displayed
  read-only, never manually selectable, still exported as
  `price_cohort`; demo consistency enforced by UI locks (no → result
  locked to "not run"; yes → "not run" unselectable, Present/Absent
  required; switching clears incompatible state) with a second guard in
  submit validation. Verified with a **71/71 Playwright behavioral
  pass** covering duplicate rejection, out-of-range rejection,
  21st-entry rejection and completion lock, cohort derivation in UI and
  CSV, both invalid demo combinations, persistence, draft restore, CSV
  escaping, gated reset, 390px layout, and zero external requests.

## Guild Command Center built (2026-08-09, authorized)

- **`playbooks/guild-command-center.html`** — one self-contained,
  phone-first cockpit (no libraries, backend, login, or network calls;
  sticky bottom nav on phone, rail on desktop): COMMAND (mission,
  phases with you-are-here, zero-cost readiness, immediate sequence),
  WORKFLOW (8-step door flow with the locked honest PRESENT/ABSENT
  wording + fulfillment lanes tagged $497/$997/$149-mo), LOG (the full
  field log, same localStorage keys), CLIENT (6-card presentation mode
  for the prospect's hands — editable prompt, copyable question,
  honest interpretation, tier for the current door, no internal
  experiment language), RESULTS (live counts, correct-denominator demo
  rate, cohort direction, and a decision gate that never labels a
  partial run). Private artifact d2fe8d92-9c56-4a56-bb3a-20f91a8f4cb7.
- **Schema mismatch resolved:** the documented learn gates required
  "demo rate among answered owner-present conversations" and "sit-downs
  booked" — fields the log couldn't record. Added `owner_present`
  (yes/no/not applicable) and `sit_down_booked` (yes/no) with enforced
  truth cascades ("no answer" forces N/A + demo not run + sit no;
  leaving "no answer" clears the forced values for fresh answers;
  sit-down=yes requires a conversation). CSV header + template updated.
  Legacy fallback-logger entries migrate non-destructively at read time
  (no-answer doors derive their values; answered doors export empty
  owner/sit fields and are flagged incomplete by the gate — the run
  cannot be judged until every entry is complete).
- **Verification drift fixes (same day):** CLIENT price now follows the
  LOG's active door (valid unlogged 1–20) with nextDoor() fallback, so
  out-of-sequence doors show the correct locked price; close copy
  corrected to the approved "within the week" timeframe, with committed
  copy assertions preventing regression.
- **Verified: 130/130 behavioral checks** via the committed suite
  `playbooks/tests/command-center-smoke.js`, run at 390×844 and
  1280×800: navigation + client-mode chrome, all prior field-log
  integrity behaviors, the new cascades, migration, denominator math,
  both complete-run gate verdicts, partial-run no-verdict, tier
  mapping, client copy honesty scan, zero external requests, no
  horizontal overflow.
- The standalone `lehi-field-log.html` is demoted to EMERGENCY fallback
  (pre-revision schema; its entries read incomplete in the gate).

## PWA production release proof (2026-08-09, Codex deployment)

- Live at **https://guild-command-center.brandonwadepackard.workers.dev**
  — app source commit `ff79f94bceb6b8f3370b81abb2eaf020d38cd7a9`,
  Cloudflare Worker upload etag
  `da46db5184907c97fe092918e8d6378a6ba42f3384dd4343af6792da610c4c12`.
- Automated proof at that commit: Command Center smoke 130/130 + PWA
  smoke 22/22 = **152/152**; `npm audit --omit=dev` 0 vulnerabilities;
  secret-shape scan clean.
- Live-asset SHA-256: HTML `3ee0809261cf3ebfe8b0e4f5fba9fa96b3bb4578
  f3b6a485a34701954ae91308` · manifest `dbf2432f33834797c5fa2645dc154b
  3ca123882df7fd48c4a5c1750983d6aa2a` · SW `c0c2f4a9e65eadbb3d5019eae3
  346f4921ad8d38b606aef81b3b13c1c3d06e0a`.
- Live checks: HTTPS 200; service worker controls; saved state survives
  close/reopen and offline reload; zero external requests; unknown
  routes 404; POST 405; CSP self-only, X-Frame-Options DENY, no-cache;
  `X-Guild-Commit: ff79f94…`.
- Transport: static Cloudflare Worker — no bindings, storage,
  analytics, API, payment, CRM, or OpenAI dependency. Public-by-URL;
  all field data remains device-local.
- Source of truth stays `playbooks/guild-command-center.html`; `dist/`
  stays generated and gitignored.
- **Verdict: LIMITED_TEST_READY** until Brandon's actual-iPhone proof:
  Safari Add to Home Screen + airplane-mode open/reload + save/export.
  Durable receipt: `pwa/RELEASE-2026-08-09.md`.

## Next actions (in order)

1. Finish on-phone release proof (refresh v1.0.1 → open saved row →
   export → airplane-mode reopen → reset).
2. Joey dry run (lanes 1–3 + 5, timed).
3. Lehi 20-door sprint — field log is the canonical record.
4. Crew decisions before first dollar.

Not next: any purchase (GHL, number, printing until post-signal), OpenAI
billing, probe calibration, new scripts/tiers/automation.

## v1.0.1 saved-log retrieval fix (2026-08-10)

- Brandon reported iPhone install + first save complete, then correctly found
  that saved rows were summaries with no open action. This was a confirmed
  client UX defect, not evidence of server loss; the app has no server store.
- Source commits: read-only disclosure `30820cf8774b2645264f4642f3cd07913ea28680`;
  deterministic offline proof `a46c2ba8145e0414c3263c8ad2e1b448ecc3fe17`.
- Every saved door now opens natively to all recorded fields. The detail view
  contains no input, edit, or delete controls, preserving the one-door-once
  experiment contract. Version/footer/SW cache advanced to v1.0.1.
- Automated proof: Command Center 137/137 + PWA 27/27 = **164/164**;
  three consecutive offline PWA runs passed; audit 0 vulnerabilities;
  secret-shape scan clean.
- Live Worker etag `e052dbf494c33e2e7bd862ecd5ad00a16456153afc78bba077bd6acb5fa81b7c`;
  HTML SHA-256 `4fb41f047739923855023eba3c7260f0d00f33ded2332e93868a7de0a353f8ae`;
  SW SHA-256 `59feb26d312c47d6439718c5706640833f35c2f1f250db337a7857d82790f9af`.
- Fresh live mobile proof passed: v1.0.1 visible, SW control, disclosure starts
  closed and opens read-only, state survives close/reopen, details open
  offline, zero external requests, unknown route 404, POST 405, and
  `X-Guild-Commit: a46c2ba…`.
- **Verdict remains LIMITED_TEST_READY** until Brandon refreshes the installed
  app, opens his saved row, exports, and proves airplane-mode reopen on the
  actual phone. No OpenAI/API/GHL/payment work was introduced.
