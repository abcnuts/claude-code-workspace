---
date: 2026-08-08
type: research-synthesis
project: the-guild
status: decided
tags:
- type/research
- project/the-guild
- topic/ai-visibility
- topic/fulfillment
---

# AI-Visibility Sweep — Synthesis — 2026-08-08

Five lanes (Yelp→ChatGPT, GBP→Gemini, Bing/Copilot, Reviews/NAP, GEO industry).
Raw receipts: `journal/2026-08-08-ai-visibility-sweep-lanes.md`. Product of this
synthesis: `playbooks/fulfillment-playbook-v1.md`.

## The eight conclusions that survived cross-checking

**1. Yelp-first is validated — but the date and the tactic both needed
correction.** The Yelp–OpenAI deal is real: signed earlier, disclosed in Yelp's
FY2025 results (Feb 12, 2026), integration announced July 23, 2026, and live "in
relevant categories" per Yelp's Aug 6 earnings letter. Non-exclusive; 330M
reviews + 8M listings. The handoff's shorthand "licensed July 2026" was close
but the pipeline is weeks old and partially rolled out — sell it as "Yelp now
feeds ChatGPT," not "everything is Yelp now." The bigger correction: **Yelp
prohibits ALL review solicitation** (even unincentivized) and filters violators,
so the Yelp lane of fulfillment is claim/complete/respond/photos/accuracy —
review *generation* belongs to Google, where asking is allowed (incentives and
gating are not).

**2. ChatGPT's local stack is now mapped, and it's five surfaces, not one.**
Foursquare Places is the POI backbone (official partner since Dec 2024; the
"70% of results" figure is vendor folklore), Yelp is the licensed review feed,
Mapbox draws the map, Bing's index carries the web search (87% of citations
matched Bing top-10 in the strongest study), and Google SERP data is a reported
fallback. Fulfillment for ChatGPT = Foursquare + Yelp + Bing Places + a
Bing-indexed website that doesn't block OAI-SearchBot.

**3. Gemini is where fixes show first.** Gemini renders Google Maps place cards
directly (Dec 2025) and GBP got a native Gemini management integration (June
2026). SOCi measured 100% business-data accuracy on Gemini vs ~68% on
ChatGPT/Perplexity. GBP hygiene → Gemini is the fastest visible win; confirms
the original handoff claim.

**4. Reviews gate inclusion; the levers are volume, recency, and staying above
~4.0.** Vendor studies consistently find rating floors (~4.3 ChatGPT, ~4.1
Perplexity, ~3.9 Gemini — restaurant data, treat as directional) and large
review-volume multiples (3.6x) among AI-recommended businesses. Compliance
rails: FTC 16 CFR 465 (up to $53,088/violation for fake/incentivized reviews),
Google bans incentives and gating, Yelp bans solicitation outright.

**5. The business's own website matters more than we assumed.** Yext's 6.8M
citation study: 86% of AI citations come from brand-managed sources, 44% from
first-party websites. Whitespark's 2026 expert survey weights on-page (24%)
ABOVE GBP signals (12%) for AI visibility, with best-of lists and local
mentions in the top factors. Copilot dining answers cite editorial "best of"
publishers ~40% of the time. A minimal website lane and a get-on-local-lists
lane join the playbook. Schema markup is the documented null (Ahrefs
interventional study: indistinguishable from noise) — we do NOT sell it as AI
magic.

**6. Nobody sells what we sell.** Monitoring is commoditized ($29–99/mo tools);
agencies bundle GEO into $1.5k–5k/mo retainers of repackaged SEO; the only
measured-appearance-rate analog (AIVO PSOS) targets enterprise governance. No
local-SMB product couples a sampled, measured appearance rate with an explicit
no-guarantee doctrine. Our lane is open.

**7. The science says our doctrine is the correct one.** The strongest
controlled study (SIGIR '26, 252k trials) found relevance and position dominate
content tricks; the academic survey literature grades "ranking in ChatGPT"
guarantees as claims to reject; the only clean before/after demos are
adversarial fakes that Google now penalizes as spam. Independent evidence for
any specific intervention reliably lifting AI appearance: none published. That
is exactly why we sell the measurement and the work, never the outcome.

**8. Door ammunition, with dates.** 45% of consumers now use AI to find local
businesses (up from 6% in one year — BrightLocal 2026). ChatGPT recommends only
1.2% of business locations vs 35.9% appearing in Google's 3-pack (SOCi, 350k
locations). Wrong-AI-info horror stories are real and citable (Stefanina's
fake AI specials; Wolf River Electric's $100M defamation suit). And AI-answer
poisoning attacks mean an unclaimed listing is not just lost visibility — it's
an open attack surface.

## Corrections to prior doctrine

- "Yelp licensed into ChatGPT July 2026" → announced Jul 23, 2026; deal
  disclosed Feb 12, 2026; live in limited categories as of early Aug 2026.
- "Yelp-first fulfillment" → Yelp-first in *data custody*, Google-first in
  *review generation* (Yelp solicitation ban).
- Facebook reviews: no evidence any non-Meta assistant reads them. Facebook
  effort pays only inside Meta AI surfaces + as a consumer discovery channel —
  demoted to hygiene tier in the playbook.
- Bing indexation: keep, and it got cheaper — new Bing Places portal imports
  from GBP (often instant verify), Bing Webmaster Tools imports from Google
  Search Console in minutes, and the free AI Performance report (Feb 2026) is
  an independent corroboration channel for our probe numbers.

## Standing unknowns (carry into sales language carefully)

- Propagation latency from any fix to any AI surface: unmeasured by anyone.
  Keep the 90-day proof window; promise measurement dates, not effect dates.
- All rating-floor/volume numbers are vendor-produced and correlational.
  Usable at the door as "the pattern the data shows," never as thresholds we
  guarantee.
- Every lane ran behind an egress proxy that blocked most primary pages;
  numbers came from search-result summaries. Re-verify any figure before it
  goes on printed material.
