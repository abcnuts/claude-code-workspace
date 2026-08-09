---
date: 2026-08-08
revised: 2026-08-09 (direction lock + verification follow-up — skills install removed, Phase 4 deferred)
type: handoff
project: the-guild
audience: codex (local session on Brandon's Mac)
task: Lehi trades list now; skills and probe calibration DEFERRED
from: claude.ai/code remote session (build-phase session)
supersedes: handoffs/2026-08-08-codex-repo-seed-handoff.md (seed mission COMPLETE)
---

# HANDOFF → CODEX #2 (revised) — Mac-side lane — 2026-08-09

You are the local agent with Brandon's credentials and his Mac. Seed
mission complete. This revision reflects Brandon's locked direction of
2026-08-09: exactly ONE active mission (the Lehi trades list). The API
calibration and the skill installs are both DEFERRED — read those
sections before doing anything beyond Mission 1.

## Direction lock (Brandon's authority — do not reopen)

- The first-door demo is **ordinary subscription ChatGPT on the
  prospect's phone**. The paid Responses-API probe is a separate INTERNAL
  baseline/proof lane, not a pre-door blocker.
- **Do not request an API key. Do not make paid API calls.** The probe
  lane activates at the first close, or when Brandon explicitly says so.
- **Do not create or install skills.** Skill work is deferred reference,
  not a launch gate.
- First learn-sprint territory: **Lehi, Utah**.
- Approved playbook and price tiers stand; invent no new scripts, tiers,
  legal architecture, or automation.

## Probe state of record (confirmed by Brandon, 2026-08-09)

- Repo: `brandonwadepackard-cell/guild-visibility-probe`, `main` at
  `450f25da0f049f84f96d93ef6460be27e5375a1c`.
- Default model: `gpt-5.6-terra`. Tests: **8/8 passing**.
- The search-required and invalid-run protections are load-bearing
  doctrine. **Do not revert or weaken them** — not for convenience, not
  to make a future run pass, not in any refactor.

## MISSION 1 (the only active mission) — Lehi trades list

`git pull` first. Tune `probe/questions.yaml` to the Lehi first wave
(cohort table lives in the workspace repo's
`plans/2026-08-09-lehi-learn-sprint.md`; Brandon can read it to you —
you cannot reach that repo):

- Priority 1: hvac, plumber, electrician
- Priority 2: sprinkler/landscaper, pest_control, garage_door
- Priority 3: roofer, auto_repair, barber
- Hold for wave two: dentist, chiropractor, restaurant (keep the lines,
  they cost nothing — just ensure wave-one trades are all present).

One line per trade; question must read like a real customer ask and
include `{town}`; town values always carry the state ("Lehi, UT").
Commit and push. This costs zero API calls — it's a YAML edit.

## DEFERRED — skills (reference only; do NOT create or install)

The three mined skills (`appearance-rate-probe`,
`four-elements-sales-scripts`, `cold-outreach-legality-gate`) are
deferred reference material, not launch work. Their full text lives in
the workspace repo at `journal/2026-08-07-skill-mining-register.md`
(reachable through Brandon). If Brandon explicitly triggers skill work
later, the standing rules for it are: this Mac's `~/.claude/skills` and
`~/.codex/skills` both point to the canonical store
**`~/Projects/skills`** — install once into the canonical store only,
reconcile (never blindly overwrite) if a same-named skill exists, and
run the store's canonical backup workflow. Until that trigger: nothing.

## DEFERRED — probe calibration + customer baselines (do NOT start)

Previously "Phase 4." It activates ONLY when Brandon says "first close"
or explicitly triggers the probe lane. Until then: no `.env` key, no
paid calls, no calibration runs. When activated, the protocol is:
smoke run one business → five known businesses hand-verified with
Brandon (≥4/5 same direction) → franchise-high / new-biz-zero
calibration pair → web UI click-through → then the first real customer
baseline within the week promised at the close. Integrity rules
(search-on, no partial runs, append-only, locked baselines) apply
unchanged; fix API drift forward in normal commits, never by weakening
a rule. Stochastic scores are the product, not a bug.

## Rules (all missions)

- Never commit `.env`, keys, or passcodes.
- Only touch `brandonwadepackard-cell/guild-visibility-probe`.
  Nothing under `abcnuts` (unreachable anyway); no skills directories
  unless Brandon triggers skill work.
- No force pushes. No new repos. No probe v2 features.

## Report back to Brandon (he relays to the cloud Claude session)

```
Mac lane results:
- Trades list: <edited for Lehi wave one, commit SHA | already correct>
- Probe lane: NOT activated (per direction lock) | activated by Brandon
  on <date>: <calibration + baseline results per protocol>
- Skills: deferred, none created (per direction lock)
```
