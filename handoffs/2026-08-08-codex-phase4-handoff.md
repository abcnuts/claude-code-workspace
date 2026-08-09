---
date: 2026-08-08
revised: 2026-08-09 (direction lock — Phase 4 deferred, missions reordered)
type: handoff
project: the-guild
audience: codex (local session on Brandon's Mac)
task: Lehi trades list + skills dedupe now; probe calibration DEFERRED until first close
from: claude.ai/code remote session (build-phase session)
supersedes: handoffs/2026-08-08-codex-repo-seed-handoff.md (seed mission COMPLETE)
---

# HANDOFF → CODEX #2 (revised) — Mac-side lane — 2026-08-09

You are the local agent with Brandon's credentials and his Mac. Seed
mission complete. This revision reflects Brandon's locked direction of
2026-08-09 — read the DEFERRED section carefully: the API calibration
that was previously Mission 1 is **no longer the next gate**.

## Direction lock (Brandon's authority — do not reopen)

- The first-door demo is **ordinary subscription ChatGPT on the
  prospect's phone**. The paid Responses-API probe is a separate INTERNAL
  baseline/proof lane, not a pre-door blocker.
- **Do not request an API key. Do not make paid API calls.** The probe
  lane activates at the first close, or when Brandon explicitly says so.
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

## MISSION 1 — Lehi trades list (do now, with Brandon)

`git pull` first. Tune `probe/questions.yaml` to the Lehi first wave
(see cohort table in the workspace repo's
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

## MISSION 2 — Skills install, deduplicated (do once)

On this Mac, `~/.claude/skills` and `~/.codex/skills` both point to the
same canonical store: **`~/Projects/skills`**. Therefore:

- Install each skill ONCE into `~/Projects/skills/<name>/SKILL.md`.
  Never write separate copies into the two pointer paths — that creates
  the duplicate problem this instruction exists to prevent.
- Before installing, check whether a skill of the same name already
  exists in the canonical store; if so, reconcile (newest doctrine wins,
  note what changed) rather than blindly overwrite.
- After installing, run the canonical backup workflow for
  `~/Projects/skills` (the store's established backup routine on this
  Mac). Any future skill work follows this same pattern: canonical
  store, dedupe once, backup.

The three skills, exact contents (validate `appearance-rate-probe`
against the probe repo README after install — if they disagree, the
README wins; report the discrepancy):

### ~/Projects/skills/appearance-rate-probe/SKILL.md

```markdown
---
name: appearance-rate-probe
description: "Use when measuring, proving, or selling AI visibility for any business: never trust one AI answer; sample N times with search-grounded asks, count appearances, report the percentage, and lock before/after configs so comparisons stay apples-to-apples."
type: doctrine-workflow
domain: AI visibility / GEO
source_artifact: "guild-visibility-probe repo + 2026-08-07 Guild session"
confidence: HIGH
delegation_ready: true
---

# Appearance-Rate Probe

## Purpose
Turn "what does AI say about this business" into an honest, sellable, repeatable number.

## Core Doctrine
1. One AI answer is a coin flip. Identical prompts almost never return identical
   business lists; only frequency across repeated asks is real.
2. Sell the odds, prove the delta, never promise the coin flip. The unit of
   proof is appearance rate: "named in X of N asks."
3. Search-on, always. Bare-model answers come from stale training data and will
   never reflect fix work. Every ask must be web-search grounded.
4. No partial runs, no deletions, no cherry-picking. A run with any failed
   sample is invalid. Saved runs are append-only. Corrections are append-only
   overrides shown alongside originals.
5. Apples to apples. A before/after is valid only with identical question,
   sample count, and model. Lock the baseline config; footnote model changes.
6. Humans backstop name matching. A false "0 of N" from a name mismatch is the
   worst possible failure; always show raw answers and allow one-click
   correction with a note.

## Workflow
1. Define the customer question per trade ("Who should I call for a plumber in
   {Town, ST}?"). Always include the state.
2. Ask N=10 independent, search-grounded times. Record every raw answer.
3. Extract business names per answer; fuzzy-match the target (strip
   apostrophes/punctuation/suffix noise; containment; ~0.9 similarity).
4. Score: appearances / N. Tally every other business named (competitor list).
   "No recommendation given" is its own outcome, not a miss (common for clinics).
5. Re-run later with the locked config. Two runs = the before/after page.

## Stop Conditions
- Never present a single screenshot as proof.
- Never guarantee a ranking, placement, or specific score.
```

### ~/Projects/skills/four-elements-sales-scripts/SKILL.md

```markdown
---
name: four-elements-sales-scripts
description: "Use when writing, editing, or drilling The Guild's doorstep sales scripts: read the buyer's element (Fire/Earth/Water/Air), pull the matching script, and keep every line inside FLEXX doctrine — answer discipline, receipts before closes, demo inside 60 seconds, the honest no-guarantee line."
type: identity-workflow
domain: door sales / The Guild
source_artifact: "Sales Script Book artifact (panel-ID editable) + 2026-08-07 session"
confidence: HIGH
delegation_ready: true
---

# Four Elements Sales Scripts

## Core Doctrine (Table Rules — locked)
1. Answer discipline: answer exactly what was asked, then stop. Price gets a
   straight number the moment it's asked. Dodging price is a forbidden move.
2. Receipts before closes: every buyer question opens a thread; a nod or
   "makes sense" closes it. Never close over an open thread.
3. The demo is the script: AI asked about their business, on a phone, inside
   60 seconds. Best version: their phone, their thumbs.
4. The honest line, said like a weapon: "Anyone who guarantees a ranking is
   lying to you. I guarantee the work and a before/after you can hold."

## The Element Read (first 30 seconds)
- FIRE — competitive, decisive, rival on the brain → Rivalry script: show who
  AI recommends instead; one-per-trade-per-area exclusivity; binary close.
- EARTH — analytical, wants paper → Numbers script: two-stage (gatekeeper →
  booked sit-down), sampled report on the desk, calendar close not card close.
- WATER — been burned, arms crossed → Been-burned script: lead with what we
  won't promise; flat price, no contract, local; two-visit callback close.
- AIR — curious, phone in hand → First-mover script: demo on THEIR phone;
  the new-Yellow-Pages window; identity close ("the shop the robot brags about").

## Editing Protocol
Scripts live in one place (the Script Book artifact). Every panel has an ID
(F-03, W-05...). Edits happen by naming the panel. Table Rules are doctrine —
edit with care. Script lines are Brandon's to rewrite freely.

## Training Loop
Load the four buyers as FLEXX roleplay personas (FLEXX stays a separate
product; the Guild is just a user). Drill until the Water callback close and
the Fire silence-after-demo are muscle memory.
```

### ~/Projects/skills/cold-outreach-legality-gate/SKILL.md

```markdown
---
name: cold-outreach-legality-gate
description: "Use before ANY outbound campaign, automation, or list purchase: run the channel-legality gate so no cold list is ever touched by AI voice, SMS, or ringless voicemail, and every legal channel is used with its required scrub."
type: doctrine
domain: outreach compliance (US)
source_artifact: "2026-08-07 Guild session compliance research"
confidence: HIGH
delegation_ready: true
---

# Cold Outreach Legality Gate

## The Gate (cold lists = no consent on file)
ALLOWED: direct mail (unrestricted) · cold email (CAN-SPAM opt-out rules:
honest headers, physical address, working unsubscribe, separate sending
domains) · live human calls (AFTER National DNC scrub — business cells are
presumptively residential per Chennette v. Porch.com) · door knocking ·
uploading lists as ad-platform custom audiences.

FORBIDDEN on cold lists: AI/prerecorded voice calls (FCC 2024: AI voice =
robocall; consent required) · SMS/MMS (prior express written consent;
$500–$1,500 per text) · ringless voicemail (treated as calls; settlements
exist).

## After Consent Is Captured (form fill, inbound call, QR scan)
AI voice callbacks, SMS follow-up, and automation are all legal on that
contact. The machine: humans open cold doors; AI never lets a warm lead go
stale. Capture consent language at every intake point; keep records 4+ years.

## Stop Conditions
- Any plan that dials or texts a purchased/scraped list with automation: stop
  and redesign. No exceptions for "but it's B2B."
- State wrinkles (TX registration + bond, FL FTSA, quiet hours): check before
  entering a new state.
```

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
- Only touch `brandonwadepackard-cell/guild-visibility-probe` and
  `~/Projects/skills`. Nothing under `abcnuts` (unreachable anyway).
- No force pushes. No new repos. No probe v2 features.

## Report back to Brandon (he relays to the cloud Claude session)

```
Mac lane results:
- Trades list: <edited for Lehi wave one, commit SHA | already correct>
- Skills: <installed to ~/Projects/skills: list> ; dedupe check: <clean |
  reconciled: what> ; backup workflow: <run | issue> ;
  README validation: <agrees | discrepancy: …>
- Probe lane: NOT activated (per direction lock) | activated by Brandon
  on <date>: <calibration + baseline results per protocol>
```
