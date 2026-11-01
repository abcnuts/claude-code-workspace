# Handoff: cloud migration, start of Phase C

**Date:** 2026-11-01 · **From:** cloud session session_01HV5ta1Y7pNipPG167LAkuC · **Plan:** `plans/2026-10-31-cloud-sessions-addendum.md`

## Where it stands (checked by that session on 2026-11-01)

- **Phase A done.** All 5 work repos (brandonwadepackard-cell/true-north-financial, collab, skills, claude-config, the-boogeyman) open in cloud sessions with push access. PR 7 on this repo merged. Airtable connector works. Mac restarted: swap 29.9 GB to 0.0 GB.
- **Phase B done.** Working cloud environment is "autonomous". It reaches the Primary Supabase project, Railway's API, mythos-hub and n8n cloud with no extra settings. Each of the 5 repos now has a cloud section in CLAUDE.md (cloud-section v1).
- **Known limit.** Remote Control folders "Projects" and "Desktop" are still not offered to cloud sessions. Cause unknown. Not blocking.

## Next, in order

1. **C1 (Claude).** Add the routing rule to this repo's CLAUDE.md as a draft PR: "Start every session in the cloud from the repo. Use Remote Control only for a task on the Mac-only list." The Mac-only list is §5 of the plan.
2. **C2 (Brandon names each job).** Move recurring work to scheduled tasks, one at a time. Candidates: nightly Finn reader for true-north-financial, weekly Arq receipt from `arq-status.md` on Drive, the 08:00 and 20:00 credential probes.
3. **C4 (Claude).** Weekly count of cloud vs Mac sessions toward 32 of 40.

## Open items, not started

- On the Mac, run `git -C ~/.claude pull --ff-only` so the claude-config merge reaches the Mac.
- Railway token stays out of the cloud environment until a cloud task needs it.
- C3 is partly done: claude-config already holds Claude's per-project memory. Codex, OpenClaw and Hermes memory are not in a repo.
- PRs 6 and 1 on this repo are open drafts, untouched. PR 6's `.gitignore` now conflicts with the merged PR 7; keep PR 7's version.

## Whose move

Brandon: say "go C1" and name the first recurring job for C2. Done for Phase C looks like the routing rule merged, one recurring job green in the cloud, and 4 weekdays in a row at 32 of 40 cloud sessions.
