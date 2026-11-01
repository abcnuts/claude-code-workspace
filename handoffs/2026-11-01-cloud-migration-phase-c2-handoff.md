---
date: 2026-11-01
type: handoff
project: cloud-migration
status: active
from: claude.ai/code cloud session session_01HV5ta2DccHWb7xMws9459j
supersedes: handoffs/2026-11-01-cloud-migration-phase-c-handoff.md
---

# Handoff: cloud migration, Phase C after C1 and C2(b)

**Date:** 2026-11-01 · **From:** cloud session session_01HV5ta2DccHWb7xMws9459j · **Plan (canonical checklist):** `plans/2026-10-31-cloud-sessions-addendum.md`, see "Phase C status"

## Where it stands (checked by that session on 2026-11-01)

- **Phases A and B done.** Unchanged from the previous handoff.
- **C1 done.** Routing rule merged to main as e32318c (PR 9).
- **C2(b) done.** Scheduled task "Weekly Arq receipt" (trig_01C2abnFtzccaa3ULtzwjPbr), Mondays 11:43 America/Denver, environment "autonomous", read-only. Green run 2026-11-01 09:49 UTC. Next scheduled run 2026-11-02 11:43 MST.
- **How scheduled tasks get connectors here:** create_trigger cannot attach connectors for this organization. Brandon attaches them in claude.ai: Scheduled tasks, then the task, then Edit, then Advanced settings, then the **Connectors** tab, then **Save changes**. Fire once by hand afterward and judge the run by its receipt line; the platform marks a run "SUCCEEDED" whenever the session finishes, even if the job reported FAILED.

## Next, in order

1. **C2 (Brandon names the next job).** Candidates left: (a) nightly Finn reader for true-north-financial, if it is API-only; (c) the 08:00 and 20:00 credential probes, so they page.
2. **C4 (Claude).** Weekly count of cloud vs Mac sessions toward 32 of 40.

## Deferred, owed (named so they are not dropped)

- Arq receipt into Supabase `agent_activity_log` (canonical plan Phase 6). Blocked on a cloud agent identity with a registered token: inserts pass `credential_gate` and `directive_compliance_gate`, and only archivist, bahir, claude-code and clio have active tokens. Brandon decides if and when a token goes into the "autonomous" environment.
- Arq receipt line written into the plan file. Scheduled sessions have no repo.

## Open items, not started

- On the Mac, run `git -C ~/.claude pull --ff-only` so the claude-config merge reaches the Mac.
- Railway token stays out of the cloud environment until a cloud task needs it.
- PRs 6, 1 and 10 on this repo are open drafts, untouched by this session.
- Disk on the Mac Studio: 76.0 GB free (92.4% used) per arq-status.json at 2026-11-01 02:21 MST, down from 93.5 GB right after the 2026-10-31 restart.

## Whose move

Brandon: merge this PR, then name the next C2 job. Done for Phase C looks like one more recurring job green in the cloud (or a decision to stop at C2(b)), and 4 weekdays in a row at 32 of 40 cloud sessions.
