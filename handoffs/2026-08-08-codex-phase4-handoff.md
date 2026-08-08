---
date: 2026-08-08
type: handoff
project: the-guild
audience: codex (local session on Brandon's Mac)
task: Phase 4 reality check + trades review + skills install
from: claude.ai/code remote session (build-phase session)
supersedes: handoffs/2026-08-08-codex-repo-seed-handoff.md (seed mission COMPLETE at 450f25d)
---

# HANDOFF → CODEX #2 — Phase 4 + Mac-side lane — 2026-08-08

You are the local agent with Brandon's credentials and his Mac. Your seed
mission is complete (guild-visibility-probe pushed at `450f25da`, 4/4 tests).
This handoff is your next work order. It is self-contained: you cannot read
the Guild's workspace repo (different GitHub account), so everything you
need is in this file or in the probe repo you CAN reach.

## Context in five sentences

The Guild sells local businesses a **measured appearance rate** in AI
answers — "named in X of 10 asks" — never a guaranteed ranking. The probe
you seeded is the measurement instrument; it has never run against the live
OpenAI API. Your Mission 1 is the Phase 4 reality check that proves the
instrument tells the truth. Missions 2–3 are small: adjust the trades list
with Brandon, and install three skills into the local skills directories.
Everything you do is reported back to Brandon, who relays to the cloud
Claude session for journaling — you two cannot see each other's repos.

## Operating facts

- Repo: `brandonwadepackard-cell/guild-visibility-probe`, branch `main`.
  `git pull` before starting — do not assume your clone is current.
- Engine: OpenAI **Responses API** with the `web_search` tool
  (`probe/engine.py`); extraction pass is a second, cheap call. Model via
  `OPENAI_MODEL` env (default `gpt-4o-mini`), samples via
  `SAMPLES_PER_RUN` (default 10), `DAILY_RUN_LIMIT` (default 50) is the
  accident brake. Cost ≈ ten search asks + ten tiny extractions per
  report — well under $1.
- Storage: SQLite, append-only by design. There is deliberately no code
  path that edits or deletes a saved run. Do not add one.

## The four integrity rules (never weaken these, even to make a run pass)

1. **Search-on, always.** Every ask goes through web search. Bare-model
   answers are stale and would never reflect fix work.
2. **No partial runs, no deletions, no cherry-picking.** A run with any
   failed sample is invalid, and stays saved as invalid.
3. **Apples to apples.** Re-runs reuse the baseline's exact question,
   model, and sample count automatically. Model changes get footnoted.
4. **Humans backstop name matching.** A false "0 of 10" from a name
   mismatch is the worst failure; raw answers stay visible, corrections
   are append-only overrides.

If the OpenAI API surface has drifted since build (tool naming, response
shape), fix forward in normal commits with clear messages — never by
loosening a rule. Push fixes to `main` and record the SHAs for the report.

## MISSION 1 — Phase 4 reality check (PRE-AUTHORIZED by Brandon)

Setup:
1. `git pull` → fresh venv → `pip install -r requirements.txt` →
   `python -m pytest tests/ -v` (expect 4 passed).
2. `cp .env.example .env`; ask Brandon to paste his billing-enabled
   `OPENAI_API_KEY`. The key lives ONLY in `.env` (gitignored). Never
   commit it, never echo it into logs or output.
3. Smoke run ONE business first (any real local business Brandon names):
   `python cli.py "Business Name" trade "Town, ST"`. If it errors, this is
   where API drift shows up — fix forward, re-run, commit.

The check (after smoke passes):
4. Ask Brandon for **5 real businesses he personally knows** — name,
   trade, town + state. Spread across trades if possible.
5. Run each once. Record every run ID and score.
6. **Direction verification with Brandon:** for each business, ask him
   "does this score point the same direction as reality?" (a business he
   knows is well-known should score high; obscure should score low).
   PASS = same direction on **≥4 of 5**.
7. **Calibration pair:** run a known national franchise location (should
   score HIGH) and a brand-new/tiny business (should score ~0). Both
   behaving = the instrument isn't just noise.
8. While you're in there: have Brandon click through the web UI once
   (`uvicorn app:app --reload`, passcode from `.env`) — report page loads,
   raw answers visible, manual-correction flow works.

Rules during runs: no re-rolling a run because the number looks wrong
(that IS the data — AI answers are stochastic; frequency is the product).
If a sample fails mid-run, the run marks invalid — diagnose, fix, run
again as a NEW run. All runs stay in the database.

## MISSION 2 — Trades list review (plan item A3, with Brandon)

`probe/questions.yaml` ships with 10 starter trades (plumber, hvac,
roofer, electrician, landscaper, pest_control, dentist, chiropractor,
restaurant, barber). With Brandon, add/cut for his chosen territory. One
line per trade; the question must always include `{town}` and read like a
real customer ask ("Who should I call for a plumber in {town}?" — town
values always include the state). Commit and push the edited list.

## MISSION 3 — Install the three mined skills (standing lane)

Create one folder per skill in `~/.claude/skills/` AND `~/.codex/skills/`
(both, if both exist on this Mac), file named `SKILL.md`, exact contents
below. After installing, validate `appearance-rate-probe` against the
probe repo's README — they should agree; if they don't, the README wins
and report the discrepancy.

### ~/.claude/skills/appearance-rate-probe/SKILL.md

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

### ~/.claude/skills/four-elements-sales-scripts/SKILL.md

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

### ~/.claude/skills/cold-outreach-legality-gate/SKILL.md

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

## Rules (all missions)

- Never commit `.env`, keys, or passcodes. Never echo the key.
- Only touch `brandonwadepackard-cell/guild-visibility-probe` and the local
  skills directories. Nothing under `abcnuts` (you can't reach it anyway).
- No force pushes. No new repos. No probe v2 features (video audits, PDF
  export, multi-engine, GHL integration are deliberately out of scope).
- The stochastic scores are the product, not a bug to fix.

## Report back to Brandon (he relays it to the cloud Claude session)

Have Brandon paste this block, filled in, to Claude:

```
Phase 4 results:
- Smoke run: <ok | fixed drift, commits: SHAs>
- Businesses (name / trade / town / score / run-id):
  1..5
- Direction verdict: <N>/5 match Brandon's read → <PASS|FAIL>
- Calibration: franchise <score>, new-biz <score> → <PASS|FAIL>
- Web UI check: <ok | issues>
- Trades list: <unchanged | edited, commit SHA>
- Skills installed: <list> ; README validation: <agrees | discrepancy: …>
```

Claude then journals the results and updates the build-phase plan. If
Phase 4 PASSES, the probe is cleared for customer baselines and the next
gate is Brandon's territory decision (B1) and the GHL funnel (B2).
