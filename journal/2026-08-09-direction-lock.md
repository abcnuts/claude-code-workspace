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
- **Verified: 126/126 behavioral checks** via the committed suite
  `playbooks/tests/command-center-smoke.js`, run at 390×844 and
  1280×800: navigation + client-mode chrome, all prior field-log
  integrity behaviors, the new cascades, migration, denominator math,
  both complete-run gate verdicts, partial-run no-verdict, tier
  mapping, client copy honesty scan, zero external requests, no
  horizontal overflow.
- The standalone `lehi-field-log.html` is demoted to EMERGENCY fallback
  (pre-revision schema; its entries read incomplete in the gate).

## Next actions (in order)

1. Command Center on the phone; test door in LOG, export, reset.
2. Joey dry run (lanes 1–3 + 5, timed).
3. Lehi 20-door sprint — field log is the canonical record.
4. Crew decisions before first dollar.

Not next: any purchase (GHL, number, printing until post-signal), OpenAI
billing, probe calibration, new scripts/tiers/automation.
