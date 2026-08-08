---
date: 2026-08-08
type: build-sheet
project: the-guild
status: ready-to-build
plan-item: B2 (with C sprint-kit appendix)
owner: Brandon (build), Claude (spec)
---

# GHL Sealed Funnel — Build Sheet (Plan item B2)

Everything to configure, in order, with the exact consent language. Gate:
test call answered + booking lands + consent stored.

## The machine in one sentence

Humans open cold doors; the moment a lead consents, the machine never lets
them go stale — AI answers every inbound ring and every consented lead gets
a callback in under 60 seconds.

## 1. The Guild line + AI Employee (inbound)

- [ ] Dedicated Guild tracking number in GHL (local area code for the
      chosen territory — wait for B1 before buying the number).
- [ ] AI Employee ($97/mo unlimited inbound) answers 24/7: greets, answers
      basic questions (what we do, pricing tiers by name and number —
      answer discipline applies to the robot too), books the sit-down
      directly onto the calendar.
- [ ] **Bot disclosure up front.** First line of the greeting identifies it
      as an AI assistant ("You've reached The Guild — this is our AI
      assistant..."). Several states require bot disclosure; we do it
      everywhere, always. Honesty is the brand.
- [ ] Fallback: any caller who asks for a human gets a transfer attempt +
      guaranteed human callback commitment, logged as a task.
- [ ] Calendar: sit-down slots only during real availability; confirmation
      SMS fires ONLY on consented contacts (see §3).

## 2. Intake surfaces (every one captures consent)

Build three, identical fields, one pipeline:

- [ ] **QR form** (on the price card, truck, leave-behind): name, business
      name, mobile, trade, town + the consent checkbox (§3).
- [ ] **Website form** (if/when site exists): same fields, same checkbox.
- [ ] **Door close** (Brandon's phone, at the kitchen table): same form,
      filled together with the customer — their thumb checks the box.

Pipeline stages: New consented lead → Speed-to-lead call → Sit-down booked
→ Closed ($497/$997) → Fulfillment (Joey) → 90-day proof.

## 3. The consent language (verbatim — do not paraphrase)

Checkbox, **unchecked by default**, directly above the submit button:

> ☐ By checking this box, I agree that The Guild may call and text me at
> the number I provided — including calls and texts placed by automated
> and AI-assisted technology — about my inquiry and services. Consent is
> not a condition of any purchase. Message and data rates may apply.
> Message frequency varies. Reply STOP to opt out, HELP for help.

Below the button, small print:

> We only contact people who ask us to. Your number is never sold or
> shared.

Rules that make the consent worth something:

- [ ] GHL stores the consent record (timestamp, form source, IP/device)
      — retain 4+ years. The record IS the asset.
- [ ] STOP handling on: any opt-out kills all automation for that contact
      immediately.
- [ ] No consent on file = no AI voice, no SMS, no automation. Ever. Cold
      contacts get humans only (see cold-outreach-legality-gate).
- [ ] Entering a new state later? Check its wrinkles first (TX telephone
      solicitation registration/bond, FL FTSA, quiet hours).

## 4. Speed-to-lead (<60 seconds)

- [ ] Trigger: consented form submission → AI callback within 60s ("You
      just asked about The Guild — want to grab a time with Brandon?") →
      books calendar → SMS confirmation with sit-down time.
- [ ] If call unanswered: one SMS immediately, one call retry next
      business morning, then human follow-up task. No infinite drip.

## 5. Test protocol (the B2 gate, run before first door)

1. Call the Guild line from a stranger phone → AI answers, discloses bot
   status, states prices straight when asked, books a real slot.
2. Submit the QR form with your own mobile, box checked → callback lands
   <60s → booking works → confirmation SMS arrives.
3. Check the contact record: consent timestamp + source stored.
4. Reply STOP → confirm all automation halts for that contact.
5. Submit the form with box UNCHECKED → confirm no call, no SMS fires.

Test 5 matters as much as test 2. The funnel is "sealed" because nothing
leaks past consent — that's what we're testing.

---

# Appendix — Learn Sprint Kit (Plan item C prep)

## GHL custom fields for the objection log

Per door (fill in the truck, 60 seconds max):

| Field | Type | Values |
|---|---|---|
| door_element | dropdown | Fire / Earth / Water / Air / unread |
| price_cohort | dropdown | $497 / $997 |
| outcome | dropdown | closed / callback set / soft no / hard no / no answer |
| objection_1 | dropdown | price / "AI is a fad" / been burned by SEO / need to ask partner / no time / already have a guy / other |
| objection_verbatim | text | their exact words (gold for script edits) |
| demo_shown | checkbox | did the 60-second phone demo happen? |
| notes | text | anything else |

## Sprint rules (locked from plan C1)

- 20 doors: 10 pitched at $497, 10 at $997. Cohort assigned BEFORE the
  knock (alternate doors) — no picking the price by the driveway.
- Element read first 30 seconds → matching script from the book.
- Every close: consent captured at the table → funnel takes over →
  baseline probe run same day.
- Log every door including no-answers. The dataset only works complete —
  same integrity rule as the probe: no partial runs, no cherry-picking.

## What the sprint outputs

Close-rate by price point · objection frequency by element · demo-shown
vs closed correlation · the verbatim objection list for script edits by
panel ID. Bring "Sprint done" to a Claude session and this gets mined.
