# Guild Visibility Probe

Asks ChatGPT what it tells customers about a local business — 10 independent times —
and turns the answers into an honest, sampled report:

> **"You showed up 2 of 10. Here's who showed up instead."**

Run it again after the fix work and any two runs of the same business become the
before/after page a customer can hold.

Internal tool for The Guild crew. Not a customer-facing product. Separate from FLEXX.

## The three integrity rules

1. **Search-on, always.** Every ask goes through ChatGPT's web-search-enabled API.
   The bare model answers from stale training data and would never reflect fix work.
2. **No partial runs, no deletions.** A run is valid only if every sample completed.
   There is deliberately no code path that edits or deletes a saved run.
3. **Apples to apples.** Re-running a business automatically reuses the baseline's
   exact question, model, and sample count. Model changes are footnoted on reports.

## Quickstart

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # add your OpenAI API key + crew passcode
python cli.py "Joe's Plumbing" plumber "Beaumont, TX"   # engine, no UI
uvicorn app:app --reload   # crew web page at http://localhost:8000
```

## What the report shows

- Appearance score: `target named in X of N asks`
- Competitor tally: every other business named, with counts
- The raw answer text per ask (collapsible) — humans catch name-match misses
  and wrong facts (bad hours, wrong address) the AI states about the business
- Question, model, date, and the method footnote
- For clinics: "no recommendation given" is its own outcome, not a zero

## Manual correction (the human backstop)

A false "0 of 10" caused by a name mismatch is the worst bug this tool can have.
The report page lets a crew member flag a sample as "actually a hit / actually a miss"
with a note. Corrections are **append-only**: reports show both the original count
and the corrected count. Nothing is ever silently rewritten.

## Configuration

- `probe/questions.yaml` — the trade → customer-question map. Edit freely; adding a
  trade is one line. Always include town **and state**.
- `.env` — `OPENAI_API_KEY`, `OPENAI_MODEL` (default `gpt-4o-mini`), `PROBE_PASSCODE`,
  `DAILY_RUN_LIMIT` (default 50).

## MVP boundaries (v2 waits for door feedback)

ChatGPT only · one phrasing per trade · one business at a time · no logins ·
no PDF export · no GHL integration · 90-day re-runs via calendar reminder.

## Cost

~10 search-enabled asks + 10 tiny extraction calls per report — well under $1.
`DAILY_RUN_LIMIT` is the accident brake.
