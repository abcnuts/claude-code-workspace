---
date: 2026-10-31
type: plan
project: cloud-migration
status: active
revised: 2026-11-01
parent: Google Doc "Mac Studio → Cloud Migration Plan — 2026-10-29"
evidence: handoffs/2026-11-01-cloud-migration-phase-c-handoff.md
---

# Addendum A: Claude sessions move to the cloud

**Date:** 2026-10-31, revised 2026-11-01 · **Author:** Claude (cloud session session_01HV5ta1Y7pNipPG167LAkuC) · **Status:** Phases A and B done 2026-11-01. Phase C in progress: C1, C2(b) and C2(c) done 2026-11-01. C4 started 2026-11-01, first scheduled count 2026-11-02 17:47 MST.
**Parent plan:** Google Doc "Mac Studio → Cloud Migration Plan — 2026-10-29" (https://docs.google.com/document/d/1oDM0JZ9Nfs3bjn1d_aH0QUQXmnZfWTFRLZ4pXrA1Yfo/edit). That Doc covers data. This file covers where Claude sessions run. **This file is the only full copy of Addendum A.** The Drive connector cannot edit a Doc body, so the Doc does not contain it.

---

## 0. The one sentence

The 2026-10-29 plan moves your **data** to the cloud. It does not say where **your Claude sessions** run. Right now they run on the Mac: 37 of the last 40 sessions (2026-10-20 to 2026-10-31) ran through Remote Control on Brandons-Mac-Studio, 3 ran in the cloud. This addendum flips that ratio, and names what must stay on the Mac.

## 1. Finish line

Four consecutive weekdays where at least 32 of every 40 Claude sessions run in an Anthropic cloud environment, every active repo opens in a cloud session with its own CLAUDE.md, and the Mac-only list in §5 is written and short.

Measured by: the session list (environment_kind cloud vs bridge), checked by Bahir weekly.

## 2. What I checked myself on 2026-10-31

| Item | Finding | Evidence |
| --- | --- | --- |
| Sessions, 2026-10-20 to 2026-10-31 | 40 listed. 37 bridge (Mac). 3 cloud. | list_sessions, checked it myself |
| Repos cloud sessions can open | 25 under github.com/abcnuts, 20 not archived | list_repos, checked it myself |
| Repos your daily work lives in | true-north-financial, collab, skills, claude-config, the-boogeyman. **None is under abcnuts.** collab's git remote is github.com/brandonwadepackard-cell/collab, a private repo. Cloud sessions are connected to GitHub as abcnuts and are refused access to it. | Session summaries 2026-10-20 to 2026-10-31; collab remote from session "Cloud migration plan architecture"; add_repo refused 2026-10-31, checked it myself |
| Cloud environments | "Default" (2025-10-31) and "autonomous" (2025-11-24). Both active. | list_environments, checked it myself |
| Remote Control folders | "Projects" and "Desktop" on Brandons-Mac-Studio are listed but not offered to cloud sessions. A third folder is hidden because its name has an emoji or symbol. | list_computer_folders, checked it myself |
| Scheduled tasks | 2 exist: "Ai tooling research digest" (daily 08:00 Denver) and "Hermes PR watch — 83153 & 83274" (daily 15:43 UTC). Both ran today and succeeded. | list_triggers, checked it myself |
| Connectors on cloud sessions | Gmail, Google Calendar, Google Drive, Google Sheets, Slack, Supabase, Vercel, Claude Docs, Wispr Flow attached. Airtable, Figma, Canva present but need sign-in. | This session's tool list, checked it myself |
| Mac Studio state | Disk 94.8% used, 51.4 GB free, swap 29.8 GB, as of 2026-10-31 16:47 MDT. Arq last pass finished 2026-10-31 08:43 MDT, 0 real errors. | arq-status.md on Drive, read it myself |
| Mac restart | Storage session freed 12 GB and asked you to restart. Not answered. | Session "Storage recovery handoff review" 2026-10-31 08:47, read from its papers |
| claude-code-workspace PR 7 | Open draft as of 2026-10-20. Adds CLAUDE.md, settings, SessionStart hook for cloud sessions. Not re-checked today: GitHub API is closed to this session until the repo is attached. | Session "Environment setup" 2026-10-20, read from its papers |
| Supabase project rjcoeoropwvqzvinopze | Paused on unpaid invoices as of 2026-10-20. Cloud environment network policy denied its host. | Same session, read from its papers |
| Arq trial | Expires 2026-11-27. Restore not yet verified. | Session "Arq backup access verification" 2026-10-31, read from its papers |

## 3. Three piles, today

**Works (cloud sessions can do this now)**
- Planning, research, writing, handoff drafting. Evidence: "Shared workspace for existing agents" ran in the cloud 2026-10-29 and uploaded 28 verified files to Drive.
- Drive, Gmail, Calendar, Sheets, Slack, Supabase, Vercel work through connectors.
- Scheduled tasks that only need the web and connectors. Evidence: the 2 tasks above.
- Any repo under abcnuts, once selected at session start.

**Likely works (needs one setup step)**
- Code work on true-north-financial, collab, skills, claude-config, the-boogeyman. Needs the Claude GitHub App installed on the account that owns them.
- Railway and Supabase calls from the cloud. Needs the account token and keys saved as environment secrets, and the hosts allowed.
- Memory carrying over between sessions. Needs Phase 2.6 of the canonical plan (agent state into a private repo).
- Airtable work for Muse and Lotus bases. Needs the Airtable connector signed in once.

**Still missing (Mac-only today, see §5 for which stay that way)**
- Graphify post-push sync. It is a local uv tool with a local script. Cloud sessions already follow the rule "GitHub saved; Graphify pending."
- Credential minting through the logged-in browser (Railway, GoHighLevel). Mac only.
- Keychain, stash, 1Password sync. Mac only.
- Video and media work (Boogeyman, Descript, 36 GB). Mac only.
- Local models, Docker, ComfyUI, the 75 launchd jobs. Mac only until Phase 4 of the canonical plan.

## 4. Phases

Each step: owner, done-test. Nothing here sends, charges, or changes an external system without your word on that step.

### Phase A. Unblock access (target: by 2026-11-03)

| # | Step | Owner | Done when |
| --- | --- | --- | --- |
| A1 | Install the Claude GitHub App on the GitHub account or org that owns true-north-financial, collab, skills, claude-config, the-boogeyman. Page: https://claude.ai/connect-github | Brandon | A cloud session's repo list shows all 5 |
| A2 | Decide PR 7 on abcnuts/claude-code-workspace: merge or close. It is the only thing giving cloud sessions a CLAUDE.md and session-start hook today. | Brandon | PR state is merged or closed |
| A3 | Update the Claude desktop app on Brandons-Mac-Studio. Rename the Remote Control folder whose name has an emoji or symbol. | Brandon | list_computer_folders shows Projects and Desktop as usable |
| A4 | Restart the Mac (open ask from the storage session). | Brandon | Free space above 80 GB, swap under 10 GB |
| A5 | Sign in the Airtable connector once in claude.ai connector settings. | Brandon | Airtable tools answer in a cloud session |

**Phase A status, checked 2026-10-31 at 23:20 UTC (17:20 MDT) by the cloud session**

| Step | Status | Evidence |
| --- | --- | --- |
| A1 GitHub access | **DONE 2026-11-01.** Brandon invited abcnuts as collaborator on all 5 repos and accepted as abcnuts. Cloud sessions now list true-north-financial, skills, collab, claude-config, the-boogeyman, all private, all with push access. collab cloned in this session: 1,793 files, 432 MB, default branch head 0f76e1e dated 2026-07-19. | list_repos and git clone, checked it myself |
| A2 PR 7 decision | **DONE 2026-11-01 00:26 UTC.** Brandon said "merge PR 7". Merged at commit ce18f7f into main as b00f884. main now has CLAUDE.md and the session-start hook. PRs 6 and 1 are still open drafts, untouched. | GitHub REST API, checked it myself |
| A3 Remote Control folders | **CLOSED, KNOWN LIMIT.** Claude app is up to date (Brandon, 2026-10-31). The unreadable name is "OPEN-CLAW:HERMES AGENTS" (colon); left in place on purpose because Hermes and OpenClaw are Mac-only. Projects and Desktop are still not offered to cloud sessions after the update and the restart, cause unknown. Not blocking: cloud sessions reach all 5 work repos through GitHub. | Brandon's Settings screenshots; list_computer_folders at 00:53 UTC 2026-11-01, checked it myself |
| A4 Mac restart | **DONE 2026-10-31 evening.** Free space 57.2 GB to 93.5 GB. Swap 29.9 GB to 0.0 GB. Disk 90.6% used. | arq-status.json on Drive, generated 18:50 MDT, read it myself |
| A5 Airtable | **DONE.** 38 bases listed from this cloud session, including "Manus Integration Starter" and "dot — Conversations & Artifacts". The sign-in was already in place. | Airtable list_bases, checked it myself |

### Phase B. Make cloud sessions self-sufficient (target: 2026-11-03 to 2026-11-07)

| # | Step | Owner | Done when |
| --- | --- | --- | --- |
| B1 | Pick one cloud environment as the working one. Recommendation: "autonomous". Retire "Default" from use. | Brandon decides, Bahir documents | CLAUDE.md names the environment |
| B2 | In that environment's settings (cloud environment menu in the session title bar, then Edit): add Allowed domains rjcoeoropwvqzvinopze.supabase.co and backboard.railway.app. Add secrets RAILWAY_TOKEN (from 1Password item railway-account-token) and the Supabase service key. | Brandon enters values. Bahir supplies the exact list, never the values. | A cloud session's railway probe returns your email; Supabase answers |
| B3 | One CLAUDE.md per active repo: finish line, pointer to newest handoff under handoffs/, the standing rules (credential doctrine, graphify rule, approval rule). Repos: true-north-financial, collab, skills, claude-config, the-boogeyman. One PR each. | Bahir, in cloud sessions | 5 PRs open, you merge |
| B4 | Settle the Supabase pause. Pay or let the project go. The MYTHOS protocol stack and the Phase 6 "Arq receipt into Supabase" both depend on it. | Brandon | Project state ACTIVE, or a written decision to retire it |

**Phase B status, checked 2026-11-01 at 00:58 UTC by the cloud session**

| Step | Status | Evidence |
| --- | --- | --- |
| B1 Working environment | **DECIDED: "autonomous"** (Brandon, 2026-11-01). "Default" is retired from use. This planning session itself runs in "Default". | Brandon's message; get_session, checked it myself |
| B2 Network and secrets | **PART 1 NOT NEEDED. PART 2 DEFERRED.** A probe session in "autonomous" (session_01HV5ta2DUvn8yeJnr3HQTPW, 2026-11-01 00:58 UTC) reached all 4 hosts: rjcoeoropwvqzvinopze.supabase.co 404, backboard.railway.app 200, mythos-hub-production.up.railway.app 404, brandonpackard.app.n8n.cloud 404. **Correction 2026-11-01 10:10 UTC:** those 404s were not "reached". n8n cloud answers "404 - No instance here", and mythos-hub-production.up.railway.app and mythos-litellm-production.up.railway.app answer Railway's "Application not found": the n8n instance and both Railway apps are gone at those addresses. Supabase and backboard.railway.app are reachable. No RAILWAY, SUPABASE, N8N or WADE_RAG variables are set. Railway token stays out of the cloud until a cloud task needs it (recommended; Brandon can override). No Supabase key needed; the Supabase connector covers database work. | Probe session output, checked it myself |
| B3 CLAUDE.md per repo | **DONE 2026-11-01 ~01:20 UTC.** Brandon said "merge all 5". Merged at the checked commits: collab#1 (dabb2686), claude-config#1 (4e50fa54), true-north-financial#2 (ebba3556), skills#5 (5ab3238e), the-boogeyman#1 (3d80d9b2). Cloud section confirmed on each main. claude-config reaches the Mac only when ~/.claude pulls. | GitHub REST API, checked it myself |
| B4 Supabase | **RESOLVED.** Project rjcoeoropwvqzvinopze is ACTIVE_HEALTHY. The other 4 projects in the org (exmo-staging, daisy, make-a-million-production, grandmaster-council) are INACTIVE; no action asked. | Supabase list_projects, checked it myself |

### Phase C. Route sessions to the cloud (target: 2026-11-07 to 2026-11-14)

| # | Step | Owner | Done when |
| --- | --- | --- | --- |
| C1 | Routing rule, one line, written into claude-code-workspace CLAUDE.md: "Start every session in the cloud from the repo. Use Remote Control only for a task on the Mac-only list." | Bahir drafts, you approve | Line is in main |
| C2 | Move recurring Claude work to scheduled tasks, one at a time, each named by you: (a) nightly Finn reader receipt for true-north-financial, if it is API-only; (b) weekly Arq receipt that reads arq-status.md on Drive and writes one line to the plan; (c) the 08:00 and 20:00 credential probes, so they page. | Bahir creates each after you name it | Each task has one green run |
| C3 | Agent state to a private repo (canonical plan Phase 2.6). This is what gives cloud sessions memory. | Bahir, after your authorization phrase | Repo pushed, secret scan clean |
| C4 | Weekday count: cloud vs bridge sessions, one row per weekday in the "C4 count log" below. (Changed 2026-11-01 from "weekly, in the canonical plan's §10": a weekly count cannot show 4 weekdays in a row, and the Drive connector cannot edit the Doc body.) | Bahir | 4 weekdays in a row at 32 of 40 or better |

**Phase C status, checked 2026-11-01 at 10:15 UTC by cloud session session_01HV5ta2DccHWb7xMws9459j**

| Step | Status | Evidence |
| --- | --- | --- |
| C1 Routing rule | **DONE 2026-11-01.** PR 9 merged as e32318c. The rule is in CLAUDE.md under "Where sessions run". The same section names "autonomous" as the cloud environment, which meets B1's done-test. PR 9 also corrected the stale "cannot reach brandonwadepackard-cell repos" line. | GitHub REST API and main's CLAUDE.md, checked it myself |
| C2(b) Weekly Arq receipt | **DONE 2026-11-01.** Scheduled task "Weekly Arq receipt" (trig_01C2abnFtzccaa3ULtzwjPbr): Mondays 11:43 America/Denver, environment "autonomous", Google Drive connector, push notification on, read-only. It reads arq-status.json (same data as arq-status.md, easier to parse) and returns OK, ALERT, STALE or FAILED with one receipt line. Green run 2026-11-01 09:49 UTC (session cse_01HV5tZziHjRTFYDmX4MEFpU): "Arq receipt 2026-11-01: OK", numbers match the Drive file exactly. The first run at 09:42 UTC correctly reported FAILED because the task had no Drive connector; Brandon attached it at 09:49 UTC. | Both run transcripts and arq-status.json, checked it myself |
| C2(b) deferred parts | **DEFERRED, owed.** (1) Writing the receipt to Supabase agent_activity_log (canonical plan Phase 6): every insert needs a registered agent token, and no cloud identity has one. Brandon chose "ship it without Supabase" on 2026-11-01. (2) Writing the line into this plan file: scheduled sessions have no repo attached. Today the receipt lives in the push notification and the run's session. | Supabase credential_gate and gov_verify_agent definitions, checked it myself |
| C2(c) Credential probe pager | **DONE 2026-11-01.** Mac half: the Grok bot (grok-bots) built LaunchAgent com.mythos.probe-status per `handoffs/2026-11-01-grok-probe-status-handoff.md` (PR 12, 3899e2d). It writes probe-status.json (Drive id 13N2PmS7EW8u2N22Ri_PNhgOqxJTcDTGR, folder MYTHOS-MIGRATION) with exit code and status only, no secrets; first file 2026-11-01 03:05:49 MST. Cloud half: scheduled task "Credential probe pager" (trig_01GEUcyhN5Qc5FynWw6F13hy), 08:20 and 20:20 America/Denver, environment "autonomous", Google Drive connector, push on, read-only; returns OK, ALERT, STALE (file older than 13 h) or FAILED. Test run 2026-11-01 10:12 UTC (session cse_01HV5ta1L4nBHmbm1kWkXid3): ALERT, 2 of 6 failing (n8n-probe exit 3, litellm-proxy-probe exit 2), matching the file. The LaunchAgent's own schedule is proven by the first unattended update at 20:05 MST. | The Drive file and the run transcript, checked it myself |
| C2(c) dead services | **ARCHIVED 2026-11-01** (Brandon: "archive those 3 items"). n8n cloud (brandonpackard.app.n8n.cloud, "No instance here"), Railway mythos-litellm and Railway mythos-hub ("Application not found"). The pager prompt was changed at 10:35 UTC: n8n-probe and litellm-proxy-probe are now "archived". They are left out of the status word and the count, and the pager says so if either one answers again. mythos-hub never had a probe. The wrong "reached" sentence in the 5 work repos' CLAUDE.md is corrected and merged (true-north-financial#4, collab#2, skills#6, claude-config#2, the-boogeyman#2). The Mac LaunchAgent still runs all 6 probes; dropping the two from the Mac is optional and Mac-only. Test run 10:35 UTC (session cse_01HV5tZz84SeL3JoGfoN1TUD): "OK, 4 of 4 active probes ok, 2 archived", matching the file. | Pager prompt, the Drive file and the run result, checked it myself |
| C2(a) | Not started. Brandon names it. | |
| C3 | Partly done: Claude memory is in claude-config. Codex, OpenClaw and Hermes memory are not in a repo. | Read from the Phase C handoff |
| C4 Weekday session count | **STARTED 2026-11-01.** Scheduled task "Weekday cloud session count (C4)" (trig_01T7prK6xbAKQvcvr1F3ncD7): weekdays 17:47 America/Denver. It fires into cloud session session_01HV5ta3v9gnfgBbySigCjyb, which counts with list_sessions, appends a row to the log below on branch claude/c4-count-log (one draft PR), and pushes the result to Brandon's phone. A first version that started a fresh session each time failed its test at 10:35 UTC: fresh scheduled sessions do not get the list_sessions tool. It was deleted. First scheduled count: 2026-11-02 17:47 MST. | Trigger definition and the failed test run, checked it myself |

**C4 count log** (40 most recent sessions, not counting the counting session. Cloud = anthropic_cloud, Mac = bridge. Target 32 of 40 on 4 weekdays in a row.)

| Date (America/Denver) | Status | Cloud of 40 | Mac | Other | Window (America/Denver) |
| --- | --- | --- | --- | --- | --- |
| 2026-10-31 (plan baseline) | BELOW | 3 | 37 | 0 | 2026-10-20 to 2026-10-31, read from §0 |
| 2026-11-01 (Sunday, not a weekday) | BELOW | 7 | 33 | 0 | 2026-10-20 13:42 to 2026-11-01 01:23 |
| 2026-11-02 (Monday, weekday 1) | BELOW | 9 | 31 | 0 | 2026-10-22 18:34 to 2026-11-02 03:51 |

### Phase D. The Mac becomes the Blue box

Already written as Phases 4 and 5 of the canonical plan. Not restated here. This addendum ends when C4 passes.

## 5. Mac-only list (stays on Remote Control)

1. Arq, storage cleanup, anything that reads the Mac's disk.
2. Logged-in browser work: Railway dashboard, GoHighLevel, any site where the session lives in Chrome.
3. Keychain, stash, 1Password sync, credential minting.
4. Video and media: the-boogeyman 36 GB, Descript, 4K passes.
5. Ollama, ComfyUI, Docker, chrome-cdp, embed-proxy, graphify-mcp, litellm-proxy (the Blue list from canonical plan Phase 4).
6. Hermes and OpenClaw local runs.

Everything not on this list starts in the cloud.

## 6. Risks specific to this addendum

| Risk | Mitigation |
| --- | --- |
| A1 stalls because the 5 repos are under an account the GitHub App cannot be installed on | Move the repos to abcnuts (GitHub transfer keeps history). Your call, named per repo. |
| Secrets typed into the environment drift from 1Password, the same failure as the Railway mirror | Environment secrets hold only tokens that 1Password also holds. The 08:00 and 20:00 probes page when one dies (C2c). |
| Cloud sessions and Codex both edit the same branch | Keep the current rule: one agent per branch, Codex branches named codex/. |
| Arq trial lapses 2026-11-27 before the data phases finish | Decide buy or drop by 2026-11-20. Separate line in the canonical plan. |

## 7. Whose move

**Brandon:** A1 through A5. A1 is the gate for everything else. Say "append it" and this file goes into the Google Doc as a new section after §6.

**Bahir (cloud):** nothing until A1 lands. Then B3 and C1 drafts.

## 8. What done looks like

C4 passes. The Mac-only list in §5 is the only reason a session runs on the Mac. Every active repo has a CLAUDE.md. Memory lives in a repo, not in one machine's home folder.
