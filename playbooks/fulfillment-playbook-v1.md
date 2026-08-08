---
date: 2026-08-08
type: playbook
project: the-guild
status: draft-v1
owner: Joey (fulfillment)
evidence: journal/2026-08-08-ai-visibility-sweep-synthesis.md
---

# Guild Fulfillment Playbook v1 — "Make the Robot Know You Exist"

What we do for a customer between the baseline probe and the 90-day re-probe.
Doctrine: sell the odds, prove the delta, never promise the coin flip. We
promise the WORK below and a before/after they can hold — never a ranking.

## Step 0 — Intake + baseline (day 1, before any fix work)

- [ ] Run the baseline probe (10 sampled asks, locked config). Save run ID.
- [ ] Screenshot/record current listings state: Google, Yelp, Bing, Foursquare,
      Apple. Wrong hours/address/phone found ANYWHERE gets logged — that's the
      before picture, and wrong AI answers trace back to these.
- [ ] Collect from owner: legal business name, exact NAP (one canonical form),
      hours, services list, 10+ photos, login/manager access to GBP and Yelp.

## Lane 1 — Google Business Profile (do first; Gemini shows fixes fastest)

- [ ] Claim/verify GBP if unclaimed. Fill EVERY field: primary category
      (exact trade), secondary categories, services, service area, hours,
      attributes, description with town + state.
- [ ] Upload 10+ real photos (storefront, team, jobs done).
- [ ] Respond to every existing review, oldest first — review responses feed
      the AI's text about the business.
- [ ] Fix any Google Maps data errors (pin location, duplicate listings).
- Why first: Gemini reads Google Maps directly and shows business data at
  ~100% accuracy vs ~68% on ChatGPT/Perplexity. Earliest visible win.

## Lane 2 — Yelp (data custody, NOT review generation)

- [ ] Claim the Yelp page (free tier). Complete: categories, hours, services,
      photos, business info. Yelp now licenses this data into ChatGPT.
- [ ] Respond to every review, good and bad, professionally.
- [ ] **NEVER solicit Yelp reviews. Not verbally, not by sign, not by email.**
      Yelp bans all solicitation and filters/penalizes violators. This is a
      hard rule; a Yelp penalty alert on their page would hurt the customer.

## Lane 3 — The ChatGPT stack (Foursquare + Bing + crawlability)

- [ ] Claim/create the Foursquare listing (ChatGPT's POI backbone since 2024).
      Correct NAP, category, hours.
- [ ] Claim Bing Places at bing.com/forbusiness using "Import from Google" —
      GBP-verified businesses often verify instantly.
- [ ] Verify their website in Bing Webmaster Tools (2-minute import from
      Google Search Console), submit sitemap, enable IndexNow (plugin or
      Cloudflare toggle).
- [ ] Check robots.txt/firewall does not block Bingbot or OAI-SearchBot.
- [ ] Claim Apple Business Connect while in the neighborhood (free, 10 min).

## Lane 4 — Review engine (Google-first, legal-first)

- [ ] Set up the Google review ask: QR card at point of service + follow-up
      message to consented customers. Asking is legal on Google.
- [ ] **Forbidden: paying/discounting for reviews, review gating (filtering
      who gets asked by sentiment), fake or AI-written reviews.** FTC fines up
      to $53,088 per violation; Google removes review batches.
- [ ] Target pattern from the data (directional, never promised): stay above
      4.0, keep reviews coming steadily — recency and volume are what the AI
      era rewards. A steady trickle beats a one-week blast.

## Lane 5 — NAP consistency sweep

- [ ] One canonical NAP everywhere: Google, Yelp, Bing, Foursquare, Apple,
      Facebook, website footer.
- [ ] Fix the top wrong citations found at intake. Direct platform control
      beats paying aggregators; aggregator lag is weeks-to-months.
- [ ] Why it sells: stale listings are how AI states wrong hours — and
      unclaimed listings are an open door for AI-answer poisoning scams.

## Lane 6 — Website + local mentions (the underrated 44%)

- [ ] Minimum viable site: one page per service naming town + state, visible
      NAP, hours, plain-language FAQ (the questions customers actually ask).
      44% of AI citations are first-party websites; on-page outweighs GBP in
      AI-visibility factor surveys.
- [ ] Pitch the business for local "best of" lists, chamber/association
      directories, and local news mentions — best-of publishers drive ~40% of
      Copilot recommendation citations.
- [ ] We do NOT sell schema markup as AI magic (best-documented null result).

## Measurement & proof

- Re-run the probe at 90 days with the locked baseline config. Two runs = the
  before/after page.
- Corroboration channel: Bing Webmaster Tools' free AI Performance report
  (Copilot grounding queries + citations) — an independent dashboard we don't
  control, shown alongside our probe numbers.
- Promise measurement dates, not effect dates. Nobody has published how fast
  any fix propagates into any AI surface — that's WHY we measure.

## The forbidden list (say no even if the customer asks)

- Guaranteeing a ranking, placement, or score ("anyone who guarantees a
  ranking is lying to you").
- Soliciting Yelp reviews in any form.
- Buying, incentivizing, gating, or fabricating reviews anywhere.
- Fake best-of listicles or self-published rankings (Google now treats
  AI-answer manipulation as spam).
- AI voice/SMS/ringless-voicemail to any cold list (see
  cold-outreach-legality-gate skill).

## Cadence by tier

- **$497 setup:** Step 0 + Lanes 1–3 + Lane 5 fixes + baseline probe.
  One 90-day re-probe.
- **$997 setup (90-day proof):** everything above + Lane 4 review engine
  + Lane 6 website/mentions work + mid-point check-in probe + the printed
  before/after page.
- **$149/mo Stay Visible:** monthly probe run + review responses + listing
  drift patrol + quarterly refresh of photos/posts.

*v2 waits for door feedback. Every claim's receipt lives in the sweep journal;
re-verify numbers before printing customer-facing material.*
