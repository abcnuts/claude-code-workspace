---
date: 2026-11-01
type: handoff
project: cloud-migration
status: active
from: claude.ai/code cloud session session_01HV5ta2DccHWb7xMws9459j
to: Grok bot (agent_id grok-bots), on Brandons-Mac-Studio
supersedes: handoffs/2026-11-01-cloud-migration-phase-c2-handoff.md
---

# Handoff: Grok bot builds "probe-status" on the Mac (step C2(c), Mac half)

**Date:** 2026-11-01 · **From:** cloud Claude, session session_01HV5ta2DccHWb7xMws9459j · **For:** Grok bot (agent_id grok-bots), on Brandons-Mac-Studio · **Approved by:** Brandon, 2026-11-01 ("go relay", then "try grok bot" in place of Muse) · **Plan:** `plans/2026-10-31-cloud-sessions-addendum.md`, step C2(c)

## Why

The Mac's credential probes run at 8am and 8pm, but a failure only shows as a macOS pop-up and a log line on the Mac. Brandon does not see it when he is away. The probes read tokens from the Keychain, so they must stay on the Mac (Mac-only list, §5 item 3). The fix copies what already works for Arq: the Mac writes one small status file to Drive, and a cloud scheduled task reads it and sends Brandon a phone push.

## Finish line for the Grok bot

`probe-status.json` exists on Google Drive next to `arq-status.json`, is rewritten at 08:05 and 20:05 Mac local time, and one hand run has been reported to Brandon.

## What I know (read from claude-config CLAUDE.md and memory files, not checked on the Mac)

| Probe LaunchAgent | CLI | Exit codes |
| --- | --- | --- |
| com.mythos.railway-token-probe | ~/.local/bin/railway-token-probe | 0 healthy · 1 stash missing · 2 token revoked |
| com.mythos.n8n-probe | ~/.local/bin/n8n-probe | 0 healthy · 1 no token · 2 rejected · 3 unreachable · 4 expiring |
| com.mythos.nlm-probe | ~/.local/bin/nlm-probe | 0 healthy · 1 missing · 2 auth-expired · 3 unreachable |
| com.mythos.litellm-proxy-probe | ~/.local/bin/litellm-proxy-probe | not recorded |
| com.mythos.airtable-probe | airtable-probe | 0 / 1 / 2, meanings not recorded |
| com.mythos.archmythos-probe | not recorded | not recorded |

Not a credential probe, leave it out: com.mythos.probe-runner (runs every 15 minutes for the Bahir bridge).

## Steps

1. Run `launchctl list | grep -E 'com\.mythos\..*probe'`. Record which of the six above are loaded. Do not load, unload or edit any of them.
2. For each loaded probe, find its CLI. Run it once with `--json` if it supports that, otherwise plain. Never pass `--notify`. Record the exit code.
3. Write `~/.local/bin/probe-status`. Each run, it runs every probe from step 1 and writes `~/Library/Application Support/MYTHOS/probe-status.json`:

   ```json
   {
     "generated_at": "2026-11-01T08:05:00-07:00",
     "source": "probe-status on Brandons-Mac-Studio",
     "all_ok": true,
     "probes": [
       {"name": "railway-token-probe", "exit_code": 0, "status": "ok", "meaning": "healthy", "fix": ""}
     ]
   }
   ```

   - `status` is exactly `ok` (exit 0), `fail` (any other exit) or `missing` (CLI not found).
   - `meaning` comes from the exit-code table above, or "exit N" if unknown.
   - `fix` is the remediation the probe prints, cut to 200 characters. Leave it empty on `ok`.
   - **Never write a token, key, secret or full probe output into the file.** Exit code, status, meaning and fix only.
4. Upload the file to Google Drive into the folder that already holds `arq-status.json`: "MYTHOS-MIGRATION", id `1iritYNIX6p6AHSr1YS87wSL9xIDx1zbb`. Use the same upload method `~/.local/bin/arq-status` uses. Update the same Drive file on every run. Never create a second copy or a new folder.
5. Add LaunchAgent `com.mythos.probe-status`, running `probe-status` at 08:05 and 20:05 local time, log `~/Library/Logs/probe-status.log`.
6. Run `probe-status` once by hand. Confirm on Drive that `probe-status.json` has a `generated_at` within the last 5 minutes.

## Stop conditions (stop and tell Brandon, do not work around)

- A probe CLI does not exist: mark it `missing`. Do not write a new probe.
- The Drive upload fails: stop and report the exact error. Do not create folders.
- Anything asks for sudo, a password, or a credential re-auth: stop. Do not rotate or re-authorize any credential.

## Report back to Brandon (he relays it to cloud Claude)

1. The Drive file id of `probe-status.json`.
2. The LaunchAgent label and its two run times.
3. The hand run: `all_ok`, and each probe's name and status.

## Cloud half (cloud Claude does this after the Grok bot reports)

A scheduled task in the "autonomous" environment at 08:20 and 20:20 America/Denver reads `probe-status.json` and pushes OK, ALERT (names the failing probe and its fix) or STALE (file older than 13 hours, which also catches the Mac being off). Google Drive must be attached to that task in claude.ai (Scheduled tasks → task → Edit → Advanced settings → **Connectors** → **Save changes**).

## Project state (unchanged from the previous handoff unless noted)

- Phases A and B done. C1 done (PR 9, e32318c). C2(b) "Weekly Arq receipt" live and green 2026-11-01 (PR 11, 774633d).
- **C2(c) in progress:** this handoff.
- Next after C2(c): C4, the weekly count of cloud vs Mac sessions toward 32 of 40.
- Deferred, owed: the Supabase `agent_activity_log` receipt (needs a cloud agent token); the receipt line in the plan file (scheduled sessions have no repo).
- **New open item:** Drive folder "MYTHOS-MIGRATION" (`1iritYNIX6p6AHSr1YS87wSL9xIDx1zbb`, top level of My Drive) is not in `folder_registry` or `duplicate_folders`. MYTHOS rule 1 says agents write only to registered folders. arq-status already writes there. Registering it is Brandon's call.
- Still open: on the Mac, `git -C ~/.claude pull --ff-only`. PRs 6, 1 and 10 are untouched drafts.

## Whose move

Brandon: merge this PR, then give this file to the Grok bot. Grok bot: steps 1 to 6, then report to Brandon. Cloud Claude: the cloud half, after the Grok bot's report.
