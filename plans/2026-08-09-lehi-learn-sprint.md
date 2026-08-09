---
date: 2026-08-09
type: sprint-plan
project: the-guild
status: ready-now-zero-cost
territory: Lehi, Utah
prerequisites: a phone with subscription ChatGPT + the offline field log (playbooks/lehi-field-log.html) — no paid infrastructure
---

# Lehi Learn Sprint — First-Wave Plan

Twenty doors in Lehi, Utah. The output is data: close-rate by price point
and the objection log. Doctrine on every doorstep: measure → improve →
prove; guarantee only the work and the report.

## Why Lehi plays differently (walk in knowing this)

Lehi sits in Utah County — the home turf of the American door-to-door
industry (pest control, alarms, solar all recruit and sell here). Two
consequences:

1. **Owners are pitch-literate.** Expect a high share of WATER reads
   (been-burned, arms crossed) and fast pattern-matching to "another
   door guy." The honest no-guarantee line is the pattern-break — lead
   with what we won't promise sooner than the script book's default.
2. **Fast-growth market.** New rooftops and new businesses every quarter
   mean AI answers churn — being measured beats being established. That's
   the FIRE/AIR angle for newer shops competing with legacy names.

## First-wave scope

- **20 doors, one week.** Cohorts locked: 10 pitched at $497, 10 at $997,
  assigned by alternating door BEFORE the knock — never by the driveway.
- Geography: Lehi city proper — Main Street / State Street corridor for
  storefronts, plus the trades' shops and yards off Pioneer Crossing and
  SR-92 approaches. Skip Silicon Slopes office towers — wrong buyer.
- Every door logged, including no-answers. The dataset only works
  complete — same integrity rule as everything else.

## Trade cohorts (first wave)

Home services first — highest "who do I call" AI-query fit, dense in
Utah County, owner reachable at the shop:

| Priority | Trades | Why |
|---|---|---|
| 1 | HVAC · plumbing · electrical | Emergency "who do I call" queries; hot/cold climate; owner-operated shops |
| 2 | Sprinkler/landscape · pest control · garage door | Utah-dense trades; seasonal urgency now (August) |
| 3 | Roofing · auto repair · barber | Roofers post-storm; walk-in retail for demo practice |

Dentists/chiropractors/restaurants: hold for wave two — clinic-adjacent
AI hedging and lunch-rush timing complicate the first reps. (Trades list
in `probe/questions.yaml` gets tuned to this table — Codex Mac lane.)

## The door demo — ChatGPT on THEIR phone (locked procedure)

The demo is ordinary subscription ChatGPT, live, their thumbs. No API,
no probe, no staging. Best case their phone; Brandon's phone is the
fallback if they won't install or don't have it.

1. Element read first 30 seconds (script book governs the pitch itself).
2. Ask permission: "Grab your phone — I want to show you something about
   your business, takes 45 seconds."
3. They open ChatGPT (App Store install if needed and they're willing;
   otherwise fallback phone). Web search on if the toggle is visible.
4. **They type or dictate:** "Who should I call for a [their trade] in
   Lehi, Utah?" — their trade, exact wording, their thumbs on the send.
5. Read the answer together, out loud, whatever it says.

Handling the two outcomes — honestly, per doctrine:

- **They're not in the answer:** "That's who ChatGPT named in this
  answer instead of you. And here's the honest part — one ask is one
  flip of the coin.
  We measure it properly: ten separate asks, counted. Then we do the
  work, measure again in ninety days, and you hold both reports."
- **They ARE in the answer:** "Good — today's flip went your way. It
  doesn't always; the answer changes ask to ask. We measure the real
  rate, and the monthly plan is how we keep doing the work and
  remeasure as it changes."

Forbidden at the door: re-rolling the demo until it "shows the right
thing" · promising the demo will or won't show anyone · any wording that
implies we make the AI say their name or guarantee placement or score.
The demo shows what the AI says today; the offer is measure → improve →
prove.

## What to record (canonical: the offline field log, per door, 60 seconds)

**`playbooks/lehi-field-log.html` is the canonical record for the first
20 doors.** It runs offline on the phone — no backend, no login, no
network — autosaves locally, tracks progress out of 20, and exports CSV
(`playbooks/lehi-field-log-template.csv` is the same header as a
paper/spreadsheet fallback). Fields per door:

- door number · timestamp (auto) · business name · trade
- price_cohort ($497/$997) · demo_shown (y/n)
- **demo_result: present / absent / not run**
- outcome (closed / callback set / soft no / hard no / no answer)
- element read (Fire/Earth/Water/Air/unread) · notes with objection
  verbatim · optional callback date

No customer PII goes in the log — business info only. Export the CSV at
the end of each day.

## On a close

- Consent captured at the table using the approved verbatim consent
  language (`playbooks/ghl-funnel-build-sheet.md` §3) on a simple form —
  paper or a notes form on their phone; keep the record. Follow-up is
  human and manual until infrastructure exists.
- **A close is the procurement trigger.** GHL (or equivalent) becomes a
  post-validation purchasing decision AFTER the first close — the build
  sheet is the ready spec for that day. It is not a launch prerequisite.
- Fulfillment starts per approved playbook v1. The internal probe
  baseline is part of the proof lane — **first close is what activates
  that lane** (Brandon triggers it; until then no API key, no paid calls).
  Promise the customer a measured baseline "within the week," which the
  activated lane comfortably meets.

## Pass/fail evidence after the first reps

Hard gate (sprint validity): **all 20 doors logged, complete fields** —
an incomplete dataset is an invalid run, same as the probe.

Read after 20 doors (learn gates, not success guarantees):

- **Demo lands:** demo_shown on ≥50% of real conversations (door answered,
  owner present). Below that → the ask-permission line needs work before
  more doors, not more doors.
- **Offer signal:** ≥3 sit-downs booked or ≥1 close across 20 doors →
  continue to the next 20 at the same prices. Zero sits AND zero closes →
  stop, mine the objection log with a Claude session before spending
  more doors.
- **Cohort read:** close/sit rate by $497 vs $997 cohort + objection mix
  by element → the pricing verdict input. 20 doors is a small sample;
  treat differences as direction, not proof — the next 20 confirm.

Bring "Sprint results: …" with the field-log CSV to a Claude session and
it gets mined: pricing verdict, script edits by panel ID, wave-two
cohorts.
