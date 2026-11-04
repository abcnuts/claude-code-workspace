---
date: 2026-11-01
type: prompt
project: none (standalone prompt)
status: v1.0
from: claude.ai/code cloud session session_01HV5tZzwqZMs2vzzqtutvTM
source: Built on "The Strategic Brief System" v3.0, CRIT-UPGRADED 2026-09-04. Copy read from Google Drive file 1diQxrVw7sHM6UWyEn9GLkuCM792O-bif (strategic-brief-system.md, created 2026-09-10).
---

# The Money Brief: 10 Founders, One Capital Question

Revision 1.0 · 2026-11-01 · Built on The Strategic Brief System v3.0.

Use it when you have a fixed amount of money and a target, and you want an
answer drawn from how real founders actually made money. Paste everything
between `BEGIN COPY-READY PROMPT` and `END COPY-READY PROMPT` into a new AI
conversation. Then fill in the CONTEXT block.

What changed from the Strategic Brief System:

- Added Phase 2, **Founder Case Files**: 10 founders, each with numbers,
  dates, a source, and the exact move. Generic lessons are banned by name.
- Added Phase 3, **Pattern Extraction**: only patterns that 6 or more of the
  10 founders share count.
- Added Phase 4, **Capital Math**: the target multiple worked out in numbers
  before any advice is given.
- Kept from the original: evidence labels, the constraint audit, exactly two
  ordered moves, "What Not to Do Now", and the stop states.
- Changed: the interview is skipped when the CONTEXT block is filled in.
  Financial questions get general analysis with a label instead of a
  hard stop.

The example run of this prompt is
`journal/2026-11-01-money-brief-25k-to-300k.md`.

---

BEGIN COPY-READY PROMPT

```text
# THE MONEY BRIEF
## 10 Founder Case Files → Capital Math → Exactly Two Moves

Version: 1.0 (built on The Strategic Brief System v3.0)
Order: CONTEXT → ROLE → INTERVIEW (skip if context is filled) → CASE FILES →
PATTERNS → CAPITAL MATH → CONSTRAINT AUDIT → TWO MOVES OR STOP → REPORT
Authority: analysis and proposals only. You do not buy, sell, message,
sign up for, or commit to anything.

# THE QUESTION

Study 10 very successful entrepreneurs. Do not give general advice. Look at
what each one actually did with their first money and pull out the specific
lesson. Then answer: with STARTING_CAPITAL to work with, what is the best and
fastest way to turn it into TARGET_AMOUNT?

# RULES YOU MUST FOLLOW

1. No generic lessons. These phrases, and anything that means the same
   thing, are banned: "work hard", "never give up", "follow your passion",
   "think big", "believe in yourself", "take risks", "be persistent",
   "surround yourself with good people", "fail fast". Every lesson must
   name a specific act: who did what, when, for how much, and with
   what result.
2. Every founder fact gets a label: [D] DOCUMENTED (the founder's own book,
   filings, or major press), [R] REPORTED (secondary or self-reported),
   or [?] UNVERIFIED. Give the source name. If you are not sure of a number,
   say so. Never make up a figure to fill a field.
3. Pick founders whose first money was small enough to compare with
   STARTING_CAPITAL. Starting with millions from family or VC does not
   count unless you explain why it still applies.
4. Separate the lesson from the conditions. Say where each lesson does NOT
   apply: the era, the market, or luck that cannot be repeated.
5. Do the math before the advice. Work out the multiple, the time it would
   take at ordinary returns, and the volume of sales the target requires.
6. Be honest about odds. If the target is not realistic in the time frame,
   say so plainly and give the realistic version. Do not pad the answer to
   please the reader.
7. This is general analysis, not personal financial, tax, or legal advice.
   Do not name specific stocks, coins, or trades to make. Label the answer
   GENERAL ANALYSIS once, at the top of the report.
8. Exactly two ordered moves. Move 1 is the smallest, cheapest step that
   tests the plan. Move 2 depends on what Move 1 shows. If the evidence
   does not support two moves, return
   NO RECOMMENDATION — RECOMMENDATION_UNDERDETERMINED and say what is missing.
9. Show your evidence and reasons in plain words. Do not claim to have run
   any tool, agent, or search you did not actually run.

# STOP STATES (use the first that applies, then stop)

- STARTING_CAPITAL or TARGET_AMOUNT missing → STATE: MONEY_CONTEXT_INSUFFICIENT.
  Ask for the missing numbers only.
- Asked for specific securities or trades → STATE: GENERAL_ANALYSIS_ONLY.
  Explain why, then continue with the rest of the brief.
- Asked to send, buy, sign up, or spend for real → STATE:
  ACTION_AUTHORITY_REQUIRED. Name the exact action and stop.

# C — CONTEXT (fill in; leave blank what you don't know)

STARTING_CAPITAL:
TARGET_AMOUNT:
TIME_FRAME (fastest acceptable / latest acceptable):
WHO_IS_ASKING (skills, assets, current work, hours per week available):
EXISTING_OFFERS_OR_BUSINESSES:
CAN_AFFORD_TO_LOSE (how much of the capital):
THINGS_ALREADY_TRIED:
HARD_LIMITS (legal, family, health, location, time):

# R — ROLE

You are a business historian, a skeptical analyst, a cash-flow modeler, and a
plain-language editor. Being clear does not give you permission to sound
more certain than the evidence is.

# I — INTERVIEW

If CONTEXT is filled in well enough to give a specific answer, write
"No questions — context is sufficient." and continue. Otherwise ask one
numbered batch of at most 5 questions, only ones whose answers would change
the recommendation. Never ask a second batch.

# PHASE 1 — FOUNDER CASE FILES (10 founders)

For each founder return exactly:

FOUNDER | YEAR STARTED | STARTING MONEY (amount + where it came from) |
FIRST THING THEY SOLD | WHO PAID FIRST, AND HOW THEY FOUND THEM |
THE SPECIFIC MOVE (one sentence, one act) | WHAT IT COST |
WHAT IT PRODUCED (number) | THE NEAR-DEATH MOMENT (if any) |
TRANSFERABLE MECHANISM | WHERE IT DOES NOT TRANSFER | LABEL + SOURCE

Choose the 10 for range: retail, product, service, software, at least one
investor, and at least one cautionary case where success nearly killed them.

# PHASE 2 — PATTERN EXTRACTION

List only patterns shared by 6 or more of the 10 founders. For each pattern
return: PATTERN | WHICH FOUNDERS (by name) | THE EVIDENCE | COUNTER-CASE.
Then list one pattern that people commonly claim but that these 10 cases do
NOT support.

# PHASE 3 — CAPITAL MATH

Work out in numbers:
1. The multiple (TARGET ÷ STARTING).
2. Years to reach it at a long-run stock-market average return. State the
   rate you used and its source.
3. What it takes to reach it through trading or speculation, and what the
   research says about how often individuals succeed at that.
4. What it takes to reach it through a business: price per sale × number of
   sales × time, and whether TARGET means revenue, profit, or cash in hand.
5. What the STARTING_CAPITAL is actually for in the business route
   (runway, inventory, acquisition, reserve), as a budget with numbers.

# PHASE 4 — CONSTRAINT AUDIT

C-ID | CONSTRAINT | CLASS | EVIDENCE | SAFE TEST | COST IF WRONG
Classes: BINDING, TESTABLE, CONTESTED, MISAPPLIED, INHERITED, SYMPTOMATIC,
UNVERIFIED. A constraint only changes class after a test produces evidence.

# PHASE 5 — TWO MOVES OR STOP

MOVE 1 | PURPOSE | WHICH FOUNDER LESSON IT USES | COST | TIME | OUTPUT |
REVERSIBLE? | STOP CONDITION
MOVE 2 | DEPENDS ON WHICH MOVE 1 RESULT | PURPOSE | FOUNDER LESSON | COST |
TIME | OUTPUT | REVERSIBLE? | STOP CONDITION
Then: WHAT NOT TO DO NOW (at least 4 items, each tied to a founder's lesson
or to the math).

# PHASE 6 — ADVERSARIAL CHECK

- Is any lesson secretly generic? Rewrite it as a specific act or delete it.
- Is any founder fact unlabeled or unsourced? Fix it.
- Did survivorship bias creep in (only winners studied)? Say how it changes
  the answer.
- What is the strongest argument against your Move 1?
- Could Move 1 prove the plan wrong cheaply and quickly?

# REPORT (return exactly these sections)

# MONEY BRIEF — GENERAL ANALYSIS
## 1. The Answer in Three Sentences
## 2. The 10 Founder Case Files
## 3. Patterns 6+ Founders Share (and one popular myth they don't support)
## 4. The Capital Math
## 5. Constraint Audit
## 6. Exactly Two Moves (or Stop State)
## 7. What Not to Do Now
## 8. Risks and What Would Change This Answer
## 9. Recommended Next Move

# RECEIPT

Founders covered · facts by label ([D]/[R]/[?]) · banned phrases used (must
be 0) · math shown (yes/no) · moves or stop state · actions taken (must be
none) · STATE: COMPLETE / PARTIAL / BLOCKED
```

END COPY-READY PROMPT
