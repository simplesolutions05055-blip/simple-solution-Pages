---
name: paid-campaigns-builder
description: End-to-end paid media campaign blueprints for Israeli clients — Meta, Google Ads, TikTok. Covers funnel architecture, audiences, budgets, placements, tracking, optimization loops, and reporting. Use whenever the user wants to plan, structure, or launch a paid advertising campaign. Trigger phrases include "תבנה לי קמפיין", "תכנן קמפיין ממומן", "בנה קמפיין פייסבוק", "קמפיין מטא", "קמפיין גוגל", "קמפיין טיקטוק", "תכנון מדיה", "אסטרטגיית קמפיין", "פאנל פרסום", "תקציב קמפיין", "build a paid campaign", "Meta campaign structure", "Google Ads campaign", "media plan", "campaign strategy", "funnel build".
---

# Paid Campaigns Builder

Use this skill to produce a full paid-media campaign blueprint for an Israeli client — structure, audiences, budgets, placements, tracking, optimization. This skill plans the SYSTEM. For ad text use `ad-copywriting`. For ad visuals/video use `ad-design`.

## When to use

Trigger phrases:
- English: "build a paid campaign", "Meta campaign structure", "Google Ads campaign", "TikTok campaign", "media plan", "campaign strategy", "funnel build", "ad account setup"
- עברית: "תבנה לי קמפיין", "תכנן קמפיין ממומן", "בנה קמפיין פייסבוק", "קמפיין מטא", "קמפיין גוגל", "קמפיין טיקטוק", "תכנון מדיה", "אסטרטגיית קמפיין", "פאנל פרסום", "תקציב קמפיין"

**Don't use this skill for:** writing the ad copy itself (use `ad-copywriting`), designing creatives (use `ad-design`), organic content ideas (use `content-ideas`).

## Philosophy

**Campaigns are systems, not ads.** A great creative on a broken structure burns budget. A mediocre creative on a tight structure prints money. The order of leverage:

1. **Objective** (right campaign type for the business outcome)
2. **Audiences** (right people seeing it)
3. **Creatives** (right hook for those people — separate skills)
4. **Budget allocation** (right amount on the right ad set at the right time)
5. **Tracking** (you cannot optimize what you do not measure)
6. **Optimization loop** (kill losers fast, scale winners slow)

**Israeli market reality:**
- TAMs are small (population ~10M, Hebrew speakers ~7M). Narrow targeting strangles the algorithm faster than in US markets.
- Mobile-first — ~85% of traffic. Vertical creatives, mobile landing pages, mobile checkout.
- **WhatsApp is the universal funnel ending.** A Click-to-WhatsApp ad with a 2-minute response time converts 3-5× a generic lead form.
- Hebrew creative must feel native — not translated. RTL, idioms, cultural codes.
- Holidays drive massive swings — חגי תשרי, פסח, Black Friday IL, יום העצמאות sales.

## Workflow

### 1. Discovery — the 25-question intake

Do not proceed until these are answered. Push back if the client wants to "just launch".

**Business model & economics:**
1. What does the business sell? B2C / B2B / B2B2C?
2. Average Order Value (AOV) — what does a typical sale look like in ₪?
3. Lifetime Value (LTV) — repeat purchase rate, subscription, retention?
4. Profit margin per sale — this sets the CPA ceiling (you cannot pay more to acquire than you make).
5. Current Customer Acquisition Cost (CAC) — historical benchmark, if any?

**Funnel & sales cycle:**
6. Funnel stages defined: cold awareness → engaged → consideration → conversion → retention. Where do drop-offs happen today?
7. Sales cycle length — 1 day (impulse e-commerce) vs 14-90 days (high-ticket, B2B, real estate)?
8. Lead-to-customer ratio — out of 100 leads, how many close?
9. Internal team capacity — who handles incoming leads, and how fast? (under 2 min = gold, over 1 hour = wasted spend.)

**Audience & geography:**
10. Target audience(s) — demographic (age/gender/income), psychographic (values/identity), geographic (specific Israeli cities/regions — מרכז, צפון, ירושלים, באר שבע, ערים ספציפיות)?
11. Hebrew-speaking only? Arabic? Russian? English (olim, tourists)?

**Offer & assets:**
12. Offer(s) and price points — main offer + tripwires + upsells?
13. Landing pages available — list each URL. (If none — stop and build via `ultra-premium-landing-page` first.)
14. Past creatives that worked (screenshots/links) — and what tanked?

**Tracking infrastructure:**
15. Meta Pixel installed? Conversions API (CAPI) — server-side? Events deduplicated?
16. GA4 set up with custom events? Google Tag (gtag) or server-side GTM on a subdomain?
17. Google Ads conversion tracking — enhanced conversions enabled?
18. CRM/lead management — HubSpot, Pipedrive, Monday, Google Sheets, חוצפה?
19. WhatsApp Business API set up (Israeli must-have)?

**Account history:**
20. Existing ad accounts — Meta Business Manager, Google Ads, TikTok Business Center — access verified?
21. Ad fatigue history — accounts that ran heavy spend may need new pixels/audiences.

**Budget:**
22. Total monthly budget? Test budget vs scale budget separated?
23. Hard cap or flexible if performance is good?

**Compliance & brand:**
24. Regulated industry flags — pharma (משרד הבריאות), finance (רשות ניירות ערך), real estate (חוק המתווכים), gambling, cannabis? Meta personal-attribute rules apply ("אתה עם משכנתא" → reject).
25. Brand safety considerations — banned platforms, competitor handles to avoid, controversial topics?

**Bonus competitive recon:**
- Check Meta Ad Library for the client's competitors (active ads, run duration → what's working).
- Check Google Ads Transparency Report.
- Note their creative angles, offers, landing pages.

### 2. Funnel architecture — pick a pattern

Five named patterns. Pick the one matching the client's model:

**Pattern A — Direct Response B2C** (e-commerce, food delivery, restaurant booking, simple consumer purchases):
```
[Meta Advantage+ Shopping / TOF]  →  [Site visit + pixel]
[Google Search high-intent / BOF] →  [Product page → checkout]
                                  ↓
                        [Meta retargeting: ATC, VC, IC]
                        [Google Display + YouTube retargeting]
```
Sales cycle: 1-7 days. Heavy on direct conversion, light on awareness.

**Pattern B — Lead Generation B2B** (SaaS demos, consulting, agency services):
```
[Meta TOF: video views, traffic to value content] → engaged audience
                ↓
[Meta MOF: lead magnet — guide/checklist/calculator] → lead in CRM
                ↓
[Email/WhatsApp nurture: 5-7 touches over 2 weeks]
                ↓
[Meta BOF + Google Search: demo/consultation booking]
                ↓
[Sales call → close]
```
Sales cycle: 14-90 days. Multi-touch attribution matters.

**Pattern C — High-Ticket / Sales Call** (coaching, real estate, financial advisors, ₪10K+ services):
```
[Meta TOF: long-form VSL or 60-90s hook video]
                ↓
[Application form — 5-10 qualifying questions]
                ↓
[Auto-WhatsApp + auto-calendar link within 2 min]
                ↓
[Discovery call → close call]
```
Sales cycle: 7-30 days. Quality of lead > quantity. Add qualifying questions to filter early.

**Pattern D — Local Service** (plumber, lawyer, dental clinic, gym):
```
[Google Search exact-match for service+city] → call/form
[Google Local Services Ads]                  → call/booking
[Waze Local Ads — branded pin]               → foot traffic
[Meta retargeting + geo-radius]              → top-of-mind
[Click-to-WhatsApp ads]                      → instant chat
```
Sales cycle: 1-14 days. Geographic precision is everything.

**Pattern E — App Install:**
```
[Meta App Promotion campaign (AAA)]   → install + event
[Google App campaigns (UAC)]          → install + in-app events
[TikTok App Promotion + Spark Ads]    → install + retention
[Retargeting non-purchasers — Meta + Google]
```
Sales cycle: minutes (install) but optimize on D7/D30 retention or first purchase.

### 3. Platform allocation by objective

Decision matrix — pick platforms by what you need:

| Objective | Primary | Secondary | Notes |
|-----------|---------|-----------|-------|
| Cold awareness / video views | Meta + TikTok | YouTube Demand Gen | Cheap CPMs, build pixel audiences |
| Lead gen forms | Meta Instant Forms | LinkedIn (B2B only) | Meta auto-fills → lower friction |
| Site conversions (e-com) | Meta Advantage+ Shopping + Google P-Max | TikTok | Strong dual-platform synergy |
| High intent / "ready to buy" | Google Search | Bing Ads | SKAGs for top intent |
| Brand search defense | Google Search branded | — | Always-on, cheap, blocks competitors |
| Retargeting | Meta + Google Display | YouTube In-stream | Frequency caps critical |
| App install | Meta AAA + Google UAC | TikTok | Optimize for in-app event, not install |
| Local foot traffic | Google LSA + Waze Local | Meta location radius | Waze hugely underused in IL |
| WhatsApp conversations (IL) | Meta Click-to-WhatsApp | — | Highest converter in IL for services |

### 4. Meta campaign structure (deep)

**CBO vs ABO:**
- **CBO (Campaign Budget Optimization)** — Meta distributes budget across ad sets dynamically. Default for most cases. Use when you have 2-5 ad sets and trust the algorithm to pick winners.
- **ABO (Ad-Set Budget Optimization)** — Fixed budget per ad set. Use for testing (clean attribution per audience) or when you want to force spend on a specific audience.
- **Advantage+ Campaigns (ASC / AAA)** — Meta's full-automation play. Excellent for e-commerce with strong pixel data. Override with manual audiences when you have specific niches or compliance constraints.

**Audience strategy:**
- **Broad** — Israel, 18-65, no interests. Meta's algorithm in 2026 prefers this for most cases. Min audience ~500K (IL: broad 18-65 ≈ 5M users).
- **Interest-based** — still useful for niche Hebrew-speaking verticals (e.g., "אורגניק", "קרוספיט בישראל", specific religious communities). Stack 5-15 interests, audience size 200K-2M.
- **Lookalike Audiences (LAL)** — 1% on strongest source (rank: Purchasers > Leads > Add-to-Cart > Site visitors). Israel LAL 1% ≈ 70-90K users. Expand to 3-5% only after 1% is exhausted.
- **Custom Audiences:**
  - Website visitors — 30/60/90/180-day windows
  - Video viewers — 25%/50%/75%/95% completion
  - Instagram engagers — 365d
  - Lead form openers (didn't submit) — high-value retargeting
  - CRM uploads — customer list, lead list, churned list
- **Exclusions** — existing customers, completed-purchase 30d, employees, off-target geo. Always exclude purchasers from prospecting.

**Placement strategy:**
- **Advantage+ Placements** as default — Meta picks where it converts.
- Override when:
  - B2B / lead quality concerns → exclude Audience Network
  - Video-first creative → prioritize Reels + Stories
  - Carousel product → Feed + Stories
  - Brand safety → exclude Audience Network in-stream

**Naming convention** (consistent across all campaigns):
```
{Client}_{Funnel-stage}_{Objective}_{Audience}_{Creative-batch}_{YYYYMM}
```
Examples:
- `falafel-yossi_TOF_traffic_broad-IL_carousel-A_202605`
- `dentist-rosh-haayin_BOF_leads_lal1-purchasers_video-hook-B_202605`
- `saas-client_MOF_conv_retarget-30d_static-offer-C_202605`

**Budget rules:**
- Learning phase minimum: ₪70/day per ad set (need 50 conversions per 7d window to exit learning)
- Scale rule: +20% every 3-5 days while CPA holds within 20% of target
- Kill rule: 3× target CPA after 3 days with no conversions, or 0 conversions on 4× target CPA spend
- Never edit ads during learning phase (resets it)

### 5. Google Ads campaign structure (deep)

**Search campaigns:**
- **Match types:** Exact (highest intent), Phrase (broader). Avoid Broad unless paired with strong negatives.
- **Single Keyword Ad Groups (SKAG)** for top-tier intent terms — one keyword, dedicated ad, dedicated landing page.
- **Negative keyword lists per industry** — build a shared library:
  - Hebrew universal negatives: `חינם`, `משרה`, `תפקיד`, `דרושים`, `קריירה`, `שירות לקוחות` (if not relevant), `מתכון`, `איך לעשות לבד`
  - Industry-specific (e.g., legal): `סטודנט`, `קורס`, `משפט הרצאה`
- **Ad copy:** 15 headlines + 4 descriptions in Responsive Search Ads; pin 2 headlines if brand-critical.

**Performance Max (P-Max):**
- 5 asset groups by theme — split by audience persona or product category, NOT by keyword.
- Audience signals: customer lists (1st-party), in-market segments, custom intent (URLs + search terms of competitors).
- Exclude branded searches if you run a separate branded campaign.
- Brand exclusions list — set it up to prevent P-Max from cannibalizing brand.
- Monitor search terms via Insights tab — limited but available.

**Display + YouTube:**
- **Demand Gen campaigns** — replaced Discovery in 2024. Visual feed-style ads, great for engaged audiences.
- **YouTube In-stream Skippable** — for video-first awareness. Optimize for views first, then conversions.
- **YouTube Shorts ads** — vertical, mobile-first, growing fast in IL.

**Branded campaign:**
- Always run. Cheap (~₪0.5-2/click in IL), captures bottom-funnel, blocks competitor squatting on your brand.
- Separate from generic — different match types, different bids, different ad copy.

**Bidding strategy progression:**
1. Launch: Max Conversions (no tCPA cap) for first 30 conversions
2. After 30 conversions: tCPA at your target
3. With value tracking + 50+ conversions: Max Conversion Value with tROAS floor

**Conversion tracking:**
- Server-side via Google Tag Manager Server (subdomain like `gtm.client.co.il`)
- Enhanced Conversions — first-party data hashing, recovers lost attribution post-iOS
- Import offline conversions from CRM (closed deals, not just leads) — essential for lead-gen accounts

### 6. TikTok Ads structure

- **Spark Ads** (boosting organic content from the brand's TikTok account) — outperforms standard ads. Get permission codes from the creator's TikTok.
- **Standard ads** — direct creative upload. Good for testing without organic presence.
- **Audience:** Broad >> interests on TikTok. The algorithm is the strongest of all platforms. Interest targeting only when you have a very specific niche.
- **Hashtag Interests** — TikTok-specific signal, useful for trends.
- **Smart Performance Campaigns (SPC)** — TikTok's full-automation, comparable to Meta Advantage+. Good for accounts with limited creative variety.
- **Creative refresh cadence:** every 5-7 days. TikTok ad fatigue is the fastest of any platform.
- **Budget minimum:** ₪50/day per ad group for learning. Below this, no signal.
- **Israel-specific:** Hebrew creators with native voice >> dubbed/subtitled. UGC outperforms produced video 3:1.

### 7. Budget allocation framework

**The 70/20/10 rule:**
- **70%** on what's working — scale winners
- **20%** on optimization — variations of winning creatives, expanded audiences
- **10%** on innovation — totally new angles, new platforms, untested hooks

**TOF / MOF / BOF split by maturity:**
| Stage | Top-funnel | Mid-funnel | Bottom-funnel |
|-------|-----------|------------|---------------|
| Month 1-2 (cold start) | 60% | 30% | 10% |
| Month 3-5 (warming up) | 45% | 30% | 25% |
| Month 6+ (mature) | 30% | 30% | 40% |

**Minimum viable budgets for learning (Israel, 2026):**
- Meta: ₪3,000/month (about ₪100/day — enough for 1-2 ad sets)
- Google Search: ₪2,000/month
- Google P-Max: ₪3,000/month (P-Max needs volume to learn)
- TikTok: ₪3,000/month
- YouTube: ₪2,500/month

Below these floors the algorithm doesn't get enough signal — you waste the spend. If a client cannot afford the floor on multiple platforms, pick ONE.

**Israeli CPM benchmarks (rough, 2026):**
- Meta IL Feed: ₪25-60 CPM
- Meta IL Reels: ₪15-40 CPM
- Meta IL Stories: ₪20-50 CPM
- TikTok IL: ₪20-45 CPM
- Google Search CPC (varies by vertical):
  - Real estate: ₪15-50/click
  - Legal: ₪10-30/click
  - Medical/cosmetic: ₪8-25/click
  - E-commerce: ₪3-12/click
  - Local services: ₪5-20/click

### 8. Tracking & measurement stack

Non-negotiables before launch:
1. **Meta Pixel + Conversions API (CAPI)** with event deduplication. Post-iOS14, server-side recovers 20-40% of lost attribution.
2. **Google Tag (gtag) + Server-side GTM** on a client subdomain (e.g., `gtm.client.co.il`).
3. **GA4** with custom events mapped to business outcomes (lead_submit, purchase, demo_book).
4. **Consent Mode v2** for EU traffic if relevant.

**UTM convention** — consistent across every campaign on every platform:
```
utm_source=meta | google | tiktok | linkedin
utm_medium=cpc | display | video | social
utm_campaign={campaign-name}
utm_content={ad-name}
utm_term={audience-or-keyword}
```

**Attribution models:**
- Meta: 7-day-click + 1-day-view (default 2026)
- Google Ads: Data-driven attribution
- GA4: Data-driven (cross-platform comparison)
- Expect platforms to over-report vs GA4 by 20-50% — reconcile monthly, not daily.

**Offline conversion uploads:**
- Meta CAPI offline events — upload closed deals weekly for sales-call funnels
- Google Ads Enhanced Conversions for Leads — hash + upload from CRM
- Without these, lead-gen optimization is blind to deal quality

**CRM integration:**
- Meta Lead Ads → Zapier/Make → CRM
- Trigger auto-WhatsApp first response (Twilio / Green API / WhatsApp Business API)
- Target: first human response within 2 minutes

### 9. Israeli market specifics

- **WhatsApp as funnel ending** — Click-to-WhatsApp ads on Meta (`wa.me/972...` deep link or Meta WhatsApp campaign objective) convert 3-5× a generic lead form in Israel. Pre-script the first message. Response within 2 min target.
- **Waze Local Ads** — branded pins, takeover ads, zero-speed (red light) takeover. Massively underused. Pair with Google Local Services for foot-traffic businesses.
- **Mobile share** — ~85% of IL traffic is mobile. All campaigns mobile-first, all landing pages tested on mobile first.
- **Hebrew copy must be native** — see `ad-copywriting`. Translated English ads underperform 50%+.
- **Payment on landing pages** — Cardcom / Grow / משולם. NOT Stripe (Stripe does not work for Israeli merchants).
- **Compliance:**
  - Real estate — must include sqm + neighborhood in property listings (חוק המתווכים).
  - Pharma — משרד הבריאות approval for health claims.
  - Finance — רשות ניירות ערך for investment/credit products.
  - Meta personal-attribute rules — never address the viewer's assumed attributes ("אתה עם משכנתא", "את גרושה") → instant reject.
- **Holiday calendar (impact on spend & creative):**
  - **ראש השנה — חגי תשרי** (late Aug-Oct) — highest engagement of the year, but also highest CPMs. Plan creative weeks ahead.
  - **חנוכה** (Dec) — gift purchases, family.
  - **ט"ו בשבט** (Jan/Feb) — eco/health/agriculture.
  - **פסח** (Mar/Apr) — second-biggest commerce window. Cleaning, kitchen, travel.
  - **יום העצמאות** (Apr/May) — patriotic angles, BBQ/grilling, leisure.
  - **קיץ** (Jun-Aug) — B2B slow, B2C strong (travel, AC, leisure).
  - **Black Friday IL** (late Nov) — now massive in Israel, plan budgets 3× normal.
  - **חגיגות לקוחות / יום הולדת לחנות** — fabricated sale moments work in IL.

### 10. The 90-day campaign lifecycle

**Days 0-7 — Setup & launch:**
- Pixel + CAPI installed, events deduplicated, verified in Events Manager
- Audiences uploaded (CRM lists, lookalikes built, custom audiences seeded)
- Tracking verified end-to-end (test purchase, test lead — confirm in GA4 + platform)
- Launch: 5 ad sets × 4 creatives = 20 ads minimum
- Daily checks: spend pacing, delivery, no policy rejections

**Days 7-14 — Learning phase:**
- Hands off — let Meta/Google learn
- Kill only obvious losers: 0 conversions at 3× target CPA
- Watch frequency, CTR, CPM trends — don't act yet
- Wait for 50 conversions per ad set within 7d window to exit learning

**Days 14-30 — First scale:**
- Keep top 30% of ad sets, kill bottom 50%
- Scale winners +20% every 3-5 days while CPA holds
- Duplicate top creatives into new audiences (LAL 1% → 3%)
- Start retargeting layer if not already running

**Days 30-60 — Creative iteration:**
- Ad fatigue starts at 3-5M impressions per asset — refresh creatives
- Test new hooks, new angles (UGC, founder VSL, customer testimonial)
- Expand audiences (LAL 3-5%, new interest stacks)
- Test new placements (Reels-only, Stories-only)

**Days 60-90 — Funnel optimization:**
- Landing page conversion rate work (CRO) — A/B test hero, CTA, form length
- Test offer variants (price anchoring, bonuses, urgency)
- Retargeting frequency caps — exclude high-frequency non-converters
- Server-side tracking improvements (offline conversions, enhanced conv.)
- Begin building first-party data list for next quarter

### 11. Reporting cadence

**Daily** (during learning + scaling phases):
- Spend pacing vs plan
- CPA vs target
- CTR (creative health signal)
- Frequency (ad fatigue signal)
- Alerts on anomalies (spend 2× normal, CPA 2× target, delivery stalled)

**Weekly client report** (1-page PDF, every Sunday):
- Spend by platform/campaign
- Leads / sales count
- CAC + ROAS
- Top 3 creatives (screenshots + metrics)
- This week's tests + next week's planned tests
- Risks / blockers

**Monthly executive report:**
- Full breakdown by campaign / funnel stage / creative
- LTV trends + cohort analysis if data exists
- Channel attribution comparison (GA4 vs platform-reported)
- Strategic recommendations for next month

### 12. Diagnostic playbook

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| CPM rising 2× over baseline | Ad fatigue, audience saturation | Refresh creatives, expand audience |
| CTR good (>1.5%) but CPA high | Landing page issue | CRO on LP, not creative |
| CTR low (<0.8%) | Creative issue | Test new hooks, new formats |
| Lots of leads, low close rate | Wrong audience or weak qualification | Narrow targeting + add qualifying questions to form |
| Spend not delivering full budget | Learning phase stuck (<50 conv/7d) | Lower CPA cap, broaden audience, raise budget |
| Conversions report on platform but not GA4 | Tracking discrepancy | Audit pixel + CAPI dedup, check UTMs |
| Sudden CPA spike | Algorithm reset (edit/budget change) or seasonal CPM rise | Don't panic — check 7d trend, not day-over-day |
| High frequency (>3.5) on cold audience | Audience too small / wrongly excluded | Expand audience or move budget to MOF/BOF |

### 13. Pricing & retainer model (for the agency)

- **Setup fee:** ₪3,000-₪8,000 — account structure, tracking setup, initial creatives brief, first month management
- **Monthly management:** 10-15% of ad spend OR flat ₪3,000-₪8,000/mo for small accounts (under ₪30K/mo spend)
- **Performance bonus** (optional): 10-20% of revenue uplift on agreed KPIs, capped
- **Anti-pattern:** never run ads without proper tracking. If client refuses to fix tracking — refuse the engagement, or scope the first phase as "tracking + landing page" only.

### 14. Deliverables checklist (every engagement)

- [ ] Campaign Plan PDF — architecture diagram, audiences, budgets, KPIs, 90-day timeline
- [ ] Account setup checklist — Pixel, CAPI, GA4, GTM, conversion events, audiences, CRM integration
- [ ] Creative brief — handed off to `ad-design` and `ad-copywriting` skills
- [ ] Naming convention sheet — applied across all platforms
- [ ] Launch checklist — final QA before go-live (tracking verified, billing set, ad approvals checked)
- [ ] First-week monitoring template — Google Sheet with daily metrics
- [ ] Weekly client report template — pre-filled with the campaign's KPIs

### 15. Anti-patterns (do not do these)

- Launching without proper tracking → flying blind, cannot optimize
- Audiences under 500K → Meta's algorithm chokes
- Switching off ads during learning phase → all prior spend wasted
- Optimizing on Day 1 → panic-mode, no statistical signal
- Same creative running 3+ months → ad fatigue is real, even winners die
- No retargeting layer → leaving warm money on the table
- Equal budget split across all platforms → different platforms serve different funnel stages
- Ignoring WhatsApp as funnel endpoint in IL → 3-5× conversion loss
- Stripe checkout on Israeli landing pages → does not work, use Cardcom/Grow/משולם
- Translated English ads → 50%+ underperformance vs native Hebrew

## Output format

When invoked, produce in this order:
1. **Restate the 25-question intake** — fill what you know, flag what's missing, ask the gaps
2. **Recommended funnel pattern** (A-E) with rationale
3. **Platform allocation** with budget split
4. **Campaign-by-campaign structure** — naming, audiences, placements, creatives needed, budget, KPIs
5. **Tracking checklist** — what must be installed before launch
6. **90-day timeline** — week-by-week milestones
7. **Hand-off briefs** — for `ad-copywriting` (hooks + angles) and `ad-design` (formats + variations)
8. **Risks & open questions**

Stop after the plan. Do not launch anything without explicit approval from Gili.
