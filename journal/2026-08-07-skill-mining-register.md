---
date: 2026-08-07
type: skill-mining-register
project: the-guild
status: draft-ready
tags:
- topic/skills
- project/the-guild
- topic/sales
- topic/ai-visibility
---

# Skill Mining Register — 2026-08-07 Guild Session

Five candidates surfaced. Top three drafted in full below, ready to install into
`~/.claude/skills/` or `~/.codex/skills/` (one folder per skill, file named SKILL.md).
Per doctrine: one highest-value asset first — that is Skill 1.

| # | Candidate | Type | Confidence | Call |
|---|-----------|------|------------|------|
| 1 | appearance-rate-probe | doctrine + workflow | HIGH | install now (working code exists) |
| 2 | four-elements-sales-scripts | identity + workflow | HIGH | install now |
| 3 | cold-outreach-legality-gate | doctrine | HIGH | install now (small, prevents lawsuits) |
| 4 | research-fan-out-contracts | process | MEDIUM | check overlap with existing MYTHOS research lanes first |
| 5 | panel-book-format | format workflow | MEDIUM | generalize later (COLE omnibus → script book pattern: numbered panels, balloons, coach notes, ID-addressable editing) |

---

## SKILL 1 (install first)

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

---

## SKILL 2

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

---

## SKILL 3

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

---

## Deferred sketches

**4. research-fan-out-contracts** — parallel background research agents, each
with a dense-findings contract ("your final message is data for synthesis, not
prose; source URL per claim; flag vendor vs independent"), synthesized only
after all land. Worked six times this session. Check for overlap with existing
MYTHOS research lanes before installing.

**5. panel-book-format** — any script/dialogue/process doc rendered as a comic
book: cover → TOC → episodes → numbered ID-addressable panels → balloons for
dialogue → caption boxes for scene → coach-note blocks for the why. Locked
layer vs editable layer marked. Source lineage: COLE omnibus → Guild Script
Book.

Recommended next move: install appearance-rate-probe into the live skills
directory and validate it against the probe repo's README on the next Mac
session.
