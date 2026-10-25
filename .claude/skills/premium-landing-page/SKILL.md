---
name: premium-landing-page
description: Design and build premium custom landing pages — conversion-optimized, visually striking, fully responsive. Covers wireframe, visual design, copy structure, and clean HTML/Tailwind or Next.js code. Use when the user wants a high-end landing page for a service, product, lead magnet, event, or campaign. Trigger phrases include "build a landing page", "design a landing page", "dpנחיתה", "דף נחיתה", "תעצב לי דף נחיתה", "premium landing page", "high-converting page", "תבנה דף מכירה".
---

# Premium Landing Page Designer

Design and build conversion-optimized, premium-looking landing pages for clients. Output is a complete deliverable: structure, copy, design tokens, and production-ready code.

## When to use

Trigger phrases:
- "build a landing page", "design a landing page for X", "create a high-converting page"
- "דף נחיתה", "דף מכירה", "תעצב לי דף נחיתה", "תבנה לי דף נחיתה", "עמוד הרשמה", "דף קמפיין"

**Don't use for:** multi-page websites (use `premium-website`), pure copy without design (use `marketing-copywriting`), SaaS app UIs (use `saas-builder`).

## Inputs to gather (the brief)

1. **Client / business** — name, industry, what they sell
2. **Goal of the page** — booking, purchase, lead capture, webinar signup
3. **Audience** — who is landing on this page
4. **Offer** — the one thing being sold/given
5. **Price / value** — and any urgency (limited spots, deadline, bonus)
6. **Brand assets** — logo, colors, fonts (if no brand book, use `brand-book-creator` first)
7. **Reference / inspiration** — sites they like
8. **Mood** — luxury / techy / playful / clinical / bold
9. **Language** — Hebrew (RTL) / English / Both
10. **Stack** — static HTML+Tailwind / Next.js / Webflow / Framer

## Premium-look principles

What separates premium from generic:
- **White space** — generous padding, never cramped (min `py-24` on sections, `gap-12` in grids)
- **Typography** — display font + body font pairing; tight tracking on headlines, comfortable on body
- **Color discipline** — 1 brand color + neutrals + 1 accent. Never more than 3 colors.
- **Photography or motion** — high-quality hero visual; not stock-photo cliche
- **Micro-interactions** — subtle hover states, smooth scroll reveals, no jarring animations
- **Consistent grid** — 8pt or 4pt spacing system
- **Mobile-first** — design mobile, then expand
- **Dark mode optional** — but if used, get the contrasts right
- **Real numbers** — testimonials with real names, real results, real photos

## Anatomy of a premium landing page

```
1. NAV          (logo, optional 2-3 links, CTA button)
2. HERO         (headline + subheadline + CTA + supporting visual)
3. SOCIAL PROOF (logos / stat bar / "as seen in")
4. PROBLEM      (agitate the pain — 2-3 short paragraphs or visual)
5. SOLUTION     (the product/service revealed)
6. FEATURES → BENEFITS (3-6 items, icon + headline + one line)
7. HOW IT WORKS (3-4 steps, numbered)
8. TESTIMONIALS (2-4 with photo, name, role, real quote)
9. CASE STUDIES / RESULTS (numbers, before/after)
10. PRICING / OFFER (clear stack: what they get, anchored value)
11. FAQ          (5-8 real objections handled)
12. GUARANTEE    (risk reversal)
13. FINAL CTA    (urgency + clear next step)
14. FOOTER       (minimal)
```

Adjust for length: lead magnet pages can be sections 1-3-5-13. Sales pages use all.

## Workflow

### 1. Collect brief (one message)
Ask only what's missing.

### 2. If no brand book exists
Suggest running `brand-book-creator` first OR ask for: primary color, secondary, fonts, logo.

### 3. Produce copy
Use `marketing-copywriting` patterns for headline, sub-headline, CTAs, bullets.

### 4. Sketch the structure
Output a section-by-section outline with copy and visual notes before writing code.

### 5. Design tokens
Define and lock at the top of the code:
```css
--brand: <hex>
--accent: <hex>
--text: <hex>
--muted: <hex>
--bg: <hex>
--font-display: '<Font>', sans-serif
--font-body: '<Font>', sans-serif
--radius: 16px
```

### 6. Build the code

**Default stack:** Next.js 15 + Tailwind + shadcn/ui + Framer Motion for entrance animations.

For one-off static pages: single `index.html` with Tailwind CDN + minimal vanilla JS.

**Mandatory:**
- Semantic HTML (`<section>`, `<header>`, `<main>`, `<footer>`)
- `lang` and `dir` attributes (`lang="he" dir="rtl"` for Hebrew)
- Meta tags: title, description, OG image, favicon
- Accessible: alt text on every image, aria-labels on icon buttons, color contrast AA+
- Performance: lazy-load below-fold images, preload fonts, no render-blocking scripts
- Analytics snippet stub (Google/Meta/PostHog) ready to fill in
- Pixel/conversion tracking on CTAs (`data-cta="hero"`, `data-cta="pricing"` etc.)

### 7. RTL specifics for Hebrew
- `dir="rtl"` on `<html>`
- `text-right` instead of `text-left` by default
- Mirror padding/margin (`ps-` / `pe-` over `pl-` / `pr-` if using Tailwind logical props)
- Number-only blocks stay LTR (use `dir="ltr"` on phone numbers, prices)
- Test buttons and form fields visually

### 8. Self-check before delivery
- [ ] Hero CTA visible without scrolling on mobile
- [ ] Every section has ONE clear purpose
- [ ] CTA repeats at least 3 times down the page
- [ ] No section dies for lack of visual interest
- [ ] Loads in <2s on 4G
- [ ] Lighthouse score ≥90 Performance, ≥95 Accessibility, ≥95 SEO
- [ ] Form submit works (Formspree / Resend / webhook stub)
- [ ] Confirmation / thank-you state defined

## Deliverables

1. Section outline doc (`STRUCTURE.md`)
2. Design tokens block
3. Production code (HTML/Next.js)
4. Asset list (images, icons, fonts to source)
5. Deployment instructions (Vercel / Netlify / static hosting)

## Pricing context (for the agency)

Premium landing pages in the Israeli market typically: ₪3,500–₪12,000 depending on scope (single hero vs full sales page). Anchor the deliverable to that quality tier.

## Anti-patterns

- 10-color rainbow palettes
- Stock photos of people on laptops looking at the camera
- Animated backgrounds that hurt readability
- Carousels for testimonials (people don't click them — show 2-3 in a grid)
- "Get started" with no destination
- Headlines longer than 12 words
- Page weight >2MB
