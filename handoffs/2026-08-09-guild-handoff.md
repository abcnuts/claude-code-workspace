---
date: 2026-08-09
type: handoff
project: the-guild
status: active
from: claude.ai/code remote session (build-phase + direction-lock session)
supersedes: handoffs/2026-08-07-guild-handoff.md
---

# HANDOFF — The Guild — 2026-08-09 (canonical)

Read this cold and you can continue. Everything below is verified state
or Brandon's explicit decision — receipts cited per line.

## 1. Mission state in one paragraph

The Guild sells local businesses measure → improve → prove: a measured
AI appearance rate, the fix work, and a before/after report — guaranteeing
only the work and the report, never placement or score. The business shape
is wedge → ladder → referral flywheel; the small offer is customer
acquisition. Strategy is CLOSED, the toolchain is BUILT, and the next
actions are physical: GHL funnel build, card printing, and the first
20-door learn sprint in **Lehi, Utah**. The door demo is ordinary
subscription ChatGPT on the prospect's own phone; the paid API probe is
an internal proof lane that activates at the first close — until then no
API key, no paid calls.

## 2. State of assets (receipts)

| Asset | Where | State |
|---|---|---|
| Probe MVP | `brandonwadepackard-cell/guild-visibility-probe` (private) `main` @ `0e455bfd200da0d3f64892c6f6915de9cb77d882` | live; default `gpt-5.6-terra`; 8/8 tests; import + secret scan clean; Lehi wave-one trades in `questions.yaml` (added sprinkler, garage_door, auto_repair) — Brandon-confirmed 2026-08-09; search-required + invalid-run protections intact |
| Journals, handoffs, playbook, plans | `abcnuts/claude-code-workspace` `main` @ `e0d801b` + PR #6 (draft, unmerged) | durable custody |
| Fulfillment playbook v1 + price tiers | `playbooks/fulfillment-playbook-v1.md` | **approved** by Brandon |
| Build plan (revised) | `plans/2026-08-08-build-phase-plan.md` | active |
| Lehi sprint plan | `plans/2026-08-09-lehi-learn-sprint.md` | ready-when-funnel-live |
| GHL build sheet + consent language | `playbooks/ghl-funnel-build-sheet.md` | ready to execute |
| Price card (honesty-fixed) | `playbooks/price-card-print.html` + artifact 9302a24e-24a1-48b2-8e29-aa83476edcea | print-ready minus phone/QR |
| One-pager v2 / Script Book v1 | artifacts d51a71b4… / c6c4dfb3… | live (from 8/7) |
| Codex Mac work order | `handoffs/2026-08-08-codex-phase4-handoff.md` (revised) | **COMPLETE** — Lehi trades list done @ `0e455bfd`; no remaining Codex launch task; skills (reference only) + probe lane deferred |

## 3. Locked decisions (authority: Brandon, 8/7 + 8/9 — do not reopen)

- Wedge → ladder → referral flywheel; small offer = acquisition.
- Door demo = subscription ChatGPT, prospect's phone, live. Probe = internal
  proof lane, activates at first close. No key/no paid calls until then.
- Prices $497 / $997 / $149-mo, fee credits toward month one. Approved.
- Territory: Lehi, Utah.
- Promise language: measure → improve → prove; the no-guarantee line is
  doctrine. Customer-facing text never says or implies "we make AI say
  your name," guaranteed placement, or guaranteed score.
- Channels: humans open cold doors; AI touches only consented contacts;
  never AI voice/SMS/RVM on cold lists. Voice = rent (GHL $97 inbound).
- FLEXX separate. No new scripts, tiers, legal architecture, or
  automation beyond what's approved.
- Skill creation/install: deferred — not a launch item; the mined skills
  are reference only (`journal/2026-08-07-skill-mining-register.md`).
  Any future skill work Brandon triggers uses the canonical
  `~/Projects/skills` store (both skill dirs point there), dedupes once,
  and runs the canonical backup workflow.

## 4. Next actions (all Brandon's world; docs are ready)

1. **GHL funnel build** — follow `playbooks/ghl-funnel-build-sheet.md`;
   buy a Utah (801/385) number; pass the 5-step test incl. the
   unchecked-box negative test.
2. **Print cards** — drop the new Guild line + QR into the card, print.
3. **Joey dry run** — lanes 1–3 + 5 on a friendly business, timed.
4. **Lehi sprint** — 20 doors per `plans/2026-08-09-lehi-learn-sprint.md`.
   Output: close-rate by cohort + complete objection log in GHL.
5. Crew decisions before first dollar: rev split, referral reward.

## 5. Unavoidable blockers (only these)

GHL login (funnel) · print shop + payment (cards) · physical doors
(sprint) · Brandon's crew (splits). Nothing is blocked on cloud sessions,
Codex, repos, or API billing.

## 6. Session-type capabilities (learned the hard way, still true)

- Cloud Claude authenticates GitHub as `abcnuts`; cannot create repos
  (403 by platform design), cannot reach `brandonwadepackard-cell` repos;
  mid-session repo attach, Drive writes, send_later are approval-walled.
- Codex on the Mac holds Brandon's credentials: it owns the probe repo
  and `~/Projects/skills`.
- Handoffs between the two travel through Brandon (chat file drops +
  this repo).

## 7. Re-entry points (say one of these to a Claude session)

1. **"GHL is live"** → verify test protocol results, journal, clear N1.
2. **"Sprint results: …"** (+ GHL export) → mine objections, pricing
   verdict, script edits by panel ID, wave-two cohorts.
3. **"First close"** → activate the probe lane: Codex calibration
   protocol + customer baseline within the week.

Recommended next move: N1, the GHL build — every other lane queues
behind the phone number.
