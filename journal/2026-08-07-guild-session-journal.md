---
date: 2026-08-07
type: log
project: the-guild
status: source
agent: claude (claude.ai/code remote session)
tags:
- type/log
- project/the-guild
- topic/sales
- topic/ai-visibility
- session-debrief
---

# 2026-08-07 — Session Journal — The Guild: Strategy → Scripts → Probe Build

**Session score: 8/10**
**Verdict: STRONG** — strategy phase closed end-to-end with receipts; build phase started with tested code; two external blockers left open (repo creation permissions, live API key).

## SECTION 1 — SESSION SNAPSHOT

**Goal at start:** "Find the last guild project." Became: complete the Guild's decide-phase and start the build-phase.

**What actually got produced (receipts):**
- Research base: six sweeps — outbound voice platforms, inbound receptionists, calling compliance (TCPA/FCC), marketing channels, competitor pricing, LLM local-visibility mechanics
- Decisions locked: product promise = measured appearance rate (never guaranteed rankings); pricing $497 / $997 / $149-mo; channel plan (needles vs no-fly list); voice stack = rent live calls (GHL $97 inbound first), Hermes/OpenClaw = back office only
- One-pager artifact updated to v2 (same URL): price card, market facts, needles/noise, launch sequence
- Sales Script Book v1 shipped as artifact: four elemental scripts (Fire/Earth/Water/Air), pressure-tested against FLEXX Phase 5 doctrine, COLE comic format, panel-ID editing
- Visibility Probe MVP built: engine + web UI + before/after compare, 4/4 tests passing, committed locally at /home/user/guild-visibility-probe (NOT yet pushed — see blockers)
- Gmail draft of the one-pager placed in drafts folder (earlier in session)

**Boundary decision made:** FLEXX stays a separate product. The Guild uses it only as a training tool (four buyer personas to drill against).

**Gap between intention and reality:** Small. Everything decided got documented; everything buildable without external inputs got built.

## SECTION 2 — THE KEY FINDING (LOGOS compression)

The no-guarantee rule written on day one turned out to be the entire strategy — legally (TCPA kills AI cold calling), commercially (measured proof in a market of overselling), technically (AI answers are stochastic; only appearance-% is real). Doctrine seal: **sell the odds, prove the delta, never promise the coin flip.**

## SECTION 3 — FAILURE / BLOCKER REPORT

1. **GitHub repo creation 403** — the GitHub App integration cannot create repositories. Blocker on pushing guild-visibility-probe. Fix: Brandon creates private empty repo `guild-visibility-probe`; session then attaches and pushes. Code is committed locally and safe unless the container is reclaimed — push promptly.
2. **Approval-walled MCP calls** — several claude-code-remote and Drive calls hit approval prompts mid-session (list_sessions, read_file_content, create_file). Workarounds: artifact listing, Drive search snippets, repo custody for this journal. Cost: minor rework, no data loss.
3. **No live probe test** — engine untested against the real OpenAI API (no key in environment). Phase 4 reality-check pending the key. Risk: API surface drift; mitigation: model/config via env, defensive parsing.
4. **Skill/prompt discovery friction** — "strategic brief" and "los logos" prompts were located via Drive backups of the CLI skills, not the CLIs themselves (remote container can't see the Mac). Worked, but naming drift between spoken names and file names cost search rounds.

## SECTION 4 — MISSED OPPORTUNITIES / DEFERRED

- FLEXX personas for the four buyer archetypes: drafted conceptually, not built (Brandon said not yet)
- Video-audit generation: cut from probe MVP deliberately
- The 20-door price test ($497 vs $997): designed, not scheduled
- Open decisions still Brandon's: territory, rev split, referral reward timing, clinic vertical timing

## SECTION 5 — NEXT SESSION ENTRY POINT

1. Brandon creates `guild-visibility-probe` repo → push the existing commit
2. Add OPENAI_API_KEY → run Phase 4 reality check (5 businesses vs phone; franchise-high / new-biz-zero calibration)
3. Configure GHL sealed funnel ($97 AI Employee inbound + consent capture)
4. Print price card; schedule the learn sprint

Recommended next move: create the repo and push before the container is reclaimed — the probe commit is the only session receipt not yet in durable custody.
