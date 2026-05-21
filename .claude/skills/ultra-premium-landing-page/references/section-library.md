# Section Library

Reusable section blueprints. The `lp-section-architect` agent picks 4-12 of these per page based on the LP type from `lp-type-decision-matrix.md`. Every section MUST have a job — if it doesn't move the user toward the conversion, kill it.

---

## Hero variations

### `hero-manifesto`
**Used in:** sales-high-ticket-service, product-launch
**Pattern:** Oversized headline (8 words max) stating a worldview or promise. No product shot. One CTA. Optional thin subhead.
**Example copy:** "השיווק של החברה שלך לא צריך מומחה. הוא צריך מערכת."

### `hero-product`
**Used in:** sales-product, sales-high-ticket-service (sometimes)
**Pattern:** Headline + sub + product photography (real, not 3D-rendered template) + price + primary CTA + secondary "see details" link.

### `hero-form`
**Used in:** lead-gen-simple, lead-gen-with-services
**Pattern:** Headline + sub + 2-3 field form above-the-fold + trust microcopy ("פרטיך מאובטחים, ללא ספאם").

### `hero-magnet`
**Used in:** lead-gen-simple for PDF / checklist / free webinar offers
**Pattern:** Headline + magnet mockup (PDF cover or video thumbnail) + single email field + CTA.

### `hero-event`
**Used in:** event-webinar
**Pattern:** Headline + date/location/duration in a single line + hero image of the venue/host + register CTA + spots remaining.

### `hero-saas`
**Used in:** product-launch, sales-product (digital)
**Pattern:** Headline + sub + real UI screenshot or 5-second autoplay loop + email-only signup OR "start free trial" CTA.

---

## Value & proof sections

### `three-benefit-strip`
3 short benefits with custom (not Heroicons) iconography. Used in sales-product, event-webinar.
**Anti-pattern:** Heroicons + 5-word headline + 1-sentence body = template tell. Custom illustrations or oversized typography only.

### `thesis-manifesto`
200-word philosophy section. Used in sales-high-ticket-service.
**Tone:** First person, opinionated, takes a stance. Not "we help X do Y".

### `pain-then-solution`
Two-column or stacked. Left = current pain, right = new reality. Used in lead-gen-with-services, sales-product.

### `selected-work-narrative`
3-5 case studies told as STORIES, not bullets. Each: 80-word setup → outcome with real number → optional pull quote. Used in sales-high-ticket-service.

### `credibility-wall`
Logos of clients OR press OR named credentials. Avoid greyscale-logo template look — use full-color, asymmetric layout, real claims only.

### `ugc-wall`
4-12 real customer photos in a Pinterest-style masonry. Used in sales-product. Avoid fake photos.

### `testimonials-long-form`
2-3 testimonials of 80+ words each. Real name + real role + real photo. NO carousels. Used in sales-high-ticket-service.

### `testimonials-aggregate`
Star average + count + 3-5 short reviews. Used in sales-product.

### `founder-story`
Photo + first-person paragraph + "why I do this". Used in sales-high-ticket-service, product-launch.

---

## Mechanism sections

### `process-steps`
3-5 phases written in first person ("First, I do X. Then we…"). Used in sales-high-ticket-service.

### `feature-deep-dive`
3 killer features with real UI screenshots (not icons). Each gets its own row with copy + visual. Used in product-launch, sales-product (digital).

### `service-grid`
3-6 services with icon/photo + name + 1-sentence description + "ask about this" mini-CTA. Used in lead-gen-with-services.

### `agenda-lineup`
For events/webinars — time-blocked agenda OR speaker grid with photos.

### `comparison-vs-status-quo`
Two-column table comparing "the old way" vs "the new way". Used in sales-product (digital), product-launch.

### `ingredients-or-specs`
Visual breakdown of what's inside the product. Used in sales-product (physical), sales-product (digital — as "feature list").

---

## Conversion sections

### `engagement-tiers`
2-3 tier cards for high-ticket service. Each tier = name + price-bracket + what's included + "schedule a call". NEVER elevate the middle one with "Most Popular" — template tell.

### `pricing-table`
For sales-product / product-launch. 2-3 tiers with annual toggle (if SaaS). Clear "what's included" + CTA. Avoid template elevation patterns.

### `buy-block-with-variants`
Product photo + variant picker (size / color / quantity) + price + Add-to-Cart + reassurance microcopy (shipping, returns, secure checkout).

### `register-tickets`
Tiered tickets (early-bird, regular, VIP) for events. Show remaining counts for urgency. Used in event-webinar.

### `waitlist-form`
Single email field for product-launch. Optional "tell us about your role" qualifier.

### `final-cta`
Echo of the hero promise + single big button. Used as the last section on every page.

---

## Trust & objection-handling

### `faq-objections`
Accordion of 6-10 questions answering REAL buyer objections — pricing, timeline, who-this-is-for, refund/cancellation. Hebrew copy must read like real client questions, not marketing fluff.

### `shipping-returns`
Used in sales-product (physical). Plain-language shipping cost, delivery window, return policy.

### `security-compliance`
Used in product-launch (SaaS), sales-product (digital). Trust badges, GDPR, Israeli privacy law clauses.

### `venue-logistics`
Used in event-webinar. Map + parking + kosher + accessibility + dress code if relevant.

---

## Auxiliary

### `countdown-urgency`
Real countdown to a real deadline. NEVER fake countdowns — they erode trust. Used in event-webinar, product-launch (during pre-order window).

### `nav-minimal`
Logo + 1 CTA. No menu. Used on most LP types — LPs shouldn't have site navigation.

### `footer-legal`
Privacy policy link + terms link + business info + Simple Solutions credit (small). Required on every page.

### `bilingual-toggle`
If client wants HE+EN — language toggle in nav. Only if requested at GATE 3.

---

## Section selection rules (for the architect)

1. **Match architecture to LP type** from `lp-type-decision-matrix.md`.
2. **Every section must have a measurable job** — move the user toward the conversion or remove an objection.
3. **No more than 12 sections.** If you have more, the offer isn't focused.
4. **No fewer than 4 sections** (except `lead-gen-simple` which can be 3).
5. **Final CTA always last.** Always echoes the hero promise.
6. **Order = trust ladder.** Promise → proof → mechanism → details → conversion.
