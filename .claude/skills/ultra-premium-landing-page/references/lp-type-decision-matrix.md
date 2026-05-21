# LP Type Decision Matrix

Auto-diagnoses landing page TYPE from the GATE 1 answers (goal, audience, business field, budget). Used by `lp-discovery-runner` to lock the architecture before design starts.

---

## Inputs (collected at GATE 1)

- **Goal one-liner** — what the page must accomplish (the conversion event)
- **Audience** — age, role, decision-making style (cold traffic vs. warm referral)
- **Business field** — service / product / event / SaaS / digital good / hybrid
- **Budget / price point** — free, ₪50-500, ₪500-5K, ₪5K+, custom-quote
- **Expected traffic source** — Meta ads, Google search, organic, list, referral

---

## The 7 LP types

### 1. `lead-gen-simple`
**Signal:** Goal is "get a phone number / email" with no service-selector. Typical for high-volume verticals (real-estate, weight-loss, financial services).

**Architecture:** 4-6 sections. Hero with form + value prop + 3-bullet benefits + light social proof + final CTA.

**Form fields default:** שם, טלפון, [אזור OR מייל]. Max 3 fields.

**Length:** 1 screen on mobile if possible, 2 max.

---

### 2. `lead-gen-with-services`
**Signal:** The client offers multiple services and the page needs the lead to declare interest. Typical for clinics (laser / facial / nails), garages, multi-service consultancies.

**Architecture:** 5-7 sections. Hero → services grid (3-6 services with icon/photo + short description) → form with service-selector → proof → FAQ → CTA.

**Form fields default:** שם, טלפון, **בחירת שירות (radio or dropdown)**, אזור (optional).

**Service-selector question is ALWAYS asked at GATE 3.**

---

### 3. `sales-product`
**Signal:** Direct purchase of a physical or digital product, ₪50-₪3,000. E-commerce, beauty, food, info-products.

**Architecture:** 8-12 sections. Hero with product photography + price + buy CTA → 3-benefit strip → editorial story → specs/ingredients → UGC wall → reviews aggregate → bundle suggestions → buy block with variant picker → shipping/returns → final echo.

**Payment integration: REQUIRED.** Surface payment question at GATE 3.

**Default payment for IL:** Cardcom. Stripe ONLY if client takes international.

---

### 4. `sales-high-ticket-service`
**Signal:** Service engagement ₪5K-₪100K+. Lawyer for tech founders, surgeon, agency, consultant, executive coach.

**Architecture:** 9-11 sections. Nav with single CTA → manifesto hero → credibility wall → 200-word thesis → selected work narrative → process in first person → founder story → long-form testimonials (80+ words) → engagement options (2-3 tiers) → high-ticket FAQ → booking widget.

**No "buy now" button — only "schedule a call" / "request a proposal".**

**Form fields default:** שם, טלפון, מייל, חברה (B2B) or תקציב (B2C). Optional message field.

---

### 5. `event-webinar`
**Signal:** One-time event signup — webinar, course launch, conference, in-person event, masterclass.

**Architecture:** 7-9 sections. Hero with date/location/register → countdown + spots remaining → agenda → speakers grid → venue/logistics → past attendees proof → tiered tickets (early bird / regular / VIP) → event FAQ → final register CTA.

**Form fields default:** שם, טלפון, מייל. If paid event → add payment.

**Calendar embed:** Optional — ask at GATE 3 if a calendar tool (Cal.com / Calendly) is preferred over a registration form.

---

### 6. `product-launch`
**Signal:** Hype build for a new product / SaaS / app / brand drop. Often pre-order or waitlist.

**Architecture:** 6-8 sections. Hero with teaser visual + launch date → countdown → "what is it" reveal sequence (scroll-triggered) → 3 killer features with real UI / product shots → founders + backstory → early-access waitlist OR pre-order with payment → social proof from beta users.

**Form fields default:** מייל, [טלפון optional]. Keep ultra-light to maximize waitlist signups.

---

### 7. `custom`
**Signal:** Client's offer doesn't fit any of the above. Hybrid (e.g., free consultation that becomes a workshop), multi-step funnel, qualifying questionnaire, ungated PDF + retargeting, etc.

**Action:** The discovery agent writes a custom architecture proposal at GATE 2 with explicit reasoning, then waits for Gili to approve before building.

---

## Diagnosis logic (pseudo-code for the discovery agent)

```
IF goal contains "buy" OR "purchase" OR "checkout" OR "shop":
  IF price <= 3000 AND product is physical/digital good:
    → sales-product
  IF price > 5000 AND offer is service/engagement:
    → sales-high-ticket-service
  ELSE:
    → ambiguous → ask Gili

IF goal contains "lead" OR "phone" OR "consultation" OR "השארת פרטים":
  IF business offers >1 distinct services AND service-selector helps qualify:
    → lead-gen-with-services
  ELSE:
    → lead-gen-simple

IF goal contains "register" OR "webinar" OR "event" OR "course":
  → event-webinar

IF goal contains "launch" OR "waitlist" OR "early access" OR "השקה":
  → product-launch

ELSE:
  → custom
```

---

## What the discovery agent OUTPUTS to GATE 2

```
PAGE TYPE: <one of the 7>
RATIONALE: <2-3 sentences — why this type>
EXPECTED LENGTH: <number of sections + scroll height estimate>
CONVERSION MECHANISM: <form / form with selector / checkout / register / waitlist>
SECTIONS PROPOSED: <ordered list — see section-library.md>
FORM FIELDS (if any): <field list>
PAYMENT (if any): <provider question to ask at GATE 3>
TRACKING NEEDED: <Meta / GA4 / PostHog — usually all three>
```

Gili approves or steers. Once approved → GATE 3 type-specific questions.
