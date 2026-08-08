---
date: 2026-08-07
type: handoff
project: the-guild
status: active
from: claude.ai/code remote session (Guild strategy → build session)
supersedes: none (first Guild handoff)
---

# HANDOFF — The Guild — 2026-08-07

Read this cold and you can continue. Companion debrief: `journal/2026-08-07-guild-session-journal.md` (same branch). Everything below is verified state, not intention.

## 1. Mission state in one paragraph

The Guild sells local businesses one outcome: "when a customer asks ChatGPT for a business like yours, you come up" — sold as **measured appearance rate**, never a guaranteed ranking. Strategy phase is CLOSED (pricing, channels, compliance, scripts all locked with research receipts). Build phase is OPEN: the Visibility Probe MVP is coded and tested but not yet in its own repo; the GHL sealed funnel, printed price card, and fulfillment playbook are not started. Nothing has been sold at the new prices. FLEXX is a separate product — the Guild only uses it for pitch training.

## 2. Live assets (verified links)

| Asset | Where | State |
|---|---|---|
| One-pager v2 (plan, price card, channels) | https://claude.ai/code/artifact/d51a71b4-57bb-418d-9495-8b461be1804f | live |
| Sales Script Book v1 (4 elements, panel-ID editable) | https://claude.ai/code/artifact/c6c4dfb3-ffd3-448d-93d5-ccdcded1c73a | live |
| Session journal + skill-mining register | `journal/` on branch `claude/last-guild-project-vvmcl2`, PR #2 (draft) | pushed |
| Visibility Probe MVP source | `probe-staging/` on same branch (TEMPORARY custody) + original git repo at `/home/user/guild-visibility-probe` (container-local, commit 2a62f66) | staged |
| One-pager email copy | Brandon's Gmail drafts ("The Guild — One-Page Plan (copy)") | unsent draft |

## 3. Locked decisions (do not re-litigate)

- **Prices:** $497 setup / $997 setup + 90-day proof / $149-mo Stay Visible. Spoken at doors: "five hundred" / "a grand." Setup fee credits toward month one.
- **Promise language:** appearance rate across repeated sampled asks. The no-guarantee line is doctrine: "Anyone who guarantees a ranking is lying to you. I guarantee the work and a before/after you can hold."
- **Channels:** humans open cold doors; AI touches only consented contacts. Cold lists (51K contractors / 3K clinics) may be reached by mail, enriched email, DNC-scrubbed human calls, doors, and ad custom audiences. NEVER by AI voice, SMS, or ringless voicemail.
- **Voice stack:** rent live calls — GHL AI Employee $97/mo unlimited inbound first; warm outbound only. Hermes/OpenClaw = back office only (research, CRM enrichment, reports). No DIY voice stack (break-even ~50K min/mo; we're nowhere near).
- **FLEXX:** separate product, separate repo, separate brand. Guild = internal training user only.

## 4. Blockers and their exact unblocks

1. **`guild-visibility-probe` repo does not exist** (GitHub App can't create repos — 403). → Brandon creates private empty repo `abcnuts/guild-visibility-probe` (no README). Next session then: `add_repo` (push access) → push from `/home/user/guild-visibility-probe` if this container survives, else seed from `probe-staging/` (then delete `probe-staging/`).
2. **No OpenAI API key in any environment.** → Brandon adds a billing-enabled key; goes into `.env` (never committed). Blocks Phase 4 (first live probe run).
3. **Approval-walled MCP calls in this session type:** Drive writes/reads, remote-session listing, send_later scheduling. Workaround that works: repo custody + artifacts + Gmail drafts.

## 5. Build queue (in order, with acceptance gates)

1. **Probe Phase 4 — reality check** (after unblocks 1+2): run 5 real businesses; hand-verify vs a real phone (pass = same direction on ≥4/5); calibration: known franchise scores high, brand-new business scores ~0. Trades list in `probe/questions.yaml` needs Brandon's review (10 starter trades shipped).
2. **Sealed funnel in GHL:** AI Employee inbound answering + booking on the Guild line; consent language on every form/QR; speed-to-lead callback under 60s for consented leads.
3. **Price card print:** $497/$997/$149-mo, fee-credit mechanic, honest-line footer.
4. **Joey's fulfillment playbook v1 (Yelp-first):** GBP + Yelp + Facebook reviews + Bing indexation + NAP consistency. (Yelp licensed into ChatGPT July 2026 — the highest-leverage input. Gemini reads GBP directly — earliest visible wins.)
5. **Learn sprint:** 20-door week, $497 vs $997 cohorts, objections logged in GHL. This produces the close-rate data nobody in the market has.

## 6. Open decisions (Brandon's, unmade)

Starting territory · rev split across the seven · referral reward now ($10–20 stated) vs after first customers · when to enter clinics (AI hedges on health queries; sell via directory layer).

## 7. Doctrine seals (carry forward)

- **Sell the odds, prove the delta, never promise the coin flip.**
- **Consent is the asset, not the list.**
- **Rent the commodity (live calls), own the intelligence (playbooks, prompts, back office).**
- **No partial runs, no deletions, no cherry-picking — the probe's integrity rules are the brand.**

## 8. Exact next commands (for the next agent)

```
# once Brandon confirms the repo exists:
add_repo abcnuts/guild-visibility-probe (push access)
cd /home/user/guild-visibility-probe && git remote add origin <clone-url> && git push -u origin main
# if this container is gone, seed instead:
#   clone empty repo, copy probe-staging/* in, commit "Visibility probe MVP (restored from staging)", push,
#   then delete probe-staging/ from claude-code-workspace and update PR #2.
# then: request OPENAI_API_KEY from Brandon → cp .env.example .env → run Phase 4 checklist (§5.1)
```

Recommended next move: unblock #1 — the repo — before anything else; every other lane queues behind durable custody of the probe.
