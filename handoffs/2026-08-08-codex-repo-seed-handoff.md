---
date: 2026-08-08
type: handoff
project: the-guild
audience: codex (local session on Brandon's Mac)
task: seed the guild-visibility-probe repo
from: claude.ai/code remote session (handoff-review session)
companion-file: guild-visibility-probe-seed.tar.gz (sha256 d751a4b2bf9a2a24b331430056010410cc4379d4115f4907a45e3f01eecbccae)
---

# HANDOFF → CODEX — Seed guild-visibility-probe — 2026-08-08

You are a local agent with Brandon's own credentials. You can do the one thing
the remote Claude session cannot: push to a repo under Brandon's personal
GitHub account. This handoff is self-contained — you need no access to any
other repo to complete it.

## Mission

Populate the empty private repo **`brandonwadepackard-cell/guild-visibility-probe`**
with the Visibility Probe MVP from the companion tarball, verify tests pass,
and report the commit SHA back to Brandon.

## Context in three sentences

The probe measures a local business's "appearance rate" in AI answers (10
search-grounded asks, count appearances — never a guaranteed ranking). The
code was built and tested in a Claude remote session; its only durable copy
sits inside a private repo under a *different* GitHub account (`abcnuts`) that
you likely cannot read — hence the tarball. Brandon created the destination
repo empty on 2026-08-08; the Claude session cannot push to it (GitHub App
tokens can't reach that account, and mid-session repo attachment hit an
approval wall).

## Preconditions — check before acting

1. `gh auth status` (or `git config credential.helper` equivalent) shows you
   are authenticated as **brandonwadepackard-cell**. If not, stop and ask
   Brandon to run `gh auth login` as that account.
2. The destination repo exists and is **empty** (no commits). If it has any
   commits, STOP and report — do not force-push, do not merge blindly.

## Steps

```bash
sha256sum guild-visibility-probe-seed.tar.gz   # must match the frontmatter hash
tar xzf guild-visibility-probe-seed.tar.gz
cd guild-visibility-probe
git init -b main
git add -A
git commit -m "Visibility probe MVP (restored from Claude session staging, 2026-08-08)"
git remote add origin https://github.com/brandonwadepackard-cell/guild-visibility-probe.git
git push -u origin main
```

## Verify (all must pass before you call it done)

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt pytest
python -m pytest tests/ -v        # expected: 4 passed
python -c "import app, cli"       # expected: no output, exit 0
```

Expected test names: test_normalize, test_suffix_and_punctuation_variants_match,
test_different_businesses_do_not_match, test_target_in_names.
(`requirements.txt` already includes `python-multipart` — a fix applied
2026-08-08; without it the FastAPI login route cannot import.)

## Rules

- Never commit `.env` or any API key (`.gitignore` already covers it — keep it).
- Do not touch any repo under the `abcnuts` account.
- Do not change the destination repo's visibility (stays private).
- No force pushes anywhere.

## Optional follow-on (only if Brandon says go)

Phase 4 "reality check" needs `OPENAI_API_KEY` in a local `.env`
(`cp .env.example .env`, add key). Then: run 5 real businesses
(`python cli.py "Name" trade "Town, ST"`), hand-verify direction against a
real phone (pass = same direction ≥4/5), calibration = known franchise scores
high, brand-new business scores ~0. Full product doctrine is in the seeded
README.md — the integrity rules (search-on always, no partial runs, locked
before/after configs) are the brand; don't "improve" them away.

## Report back to Brandon when done

- Commit SHA pushed to main + test results (must be 4/4).
- Brandon then tells the Claude remote session "seeded at <SHA>" so it can
  delete the temporary `probe-staging/` copy from the workspace repo and close
  out PRs #2/#3 there.

Note for future Claude sessions reading this in-repo: the tarball is not
committed here; it was delivered to Brandon via chat. Its contents are exactly
`probe-staging/` from this branch minus STAGING-NOTE.md, with the
python-multipart fix included. Rebuild it from there if the download is lost.
