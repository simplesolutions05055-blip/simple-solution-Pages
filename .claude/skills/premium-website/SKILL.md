---
name: premium-website
description: Design and build complete premium custom websites — multi-page, fully responsive, SEO-ready, CMS-enabled. Covers site architecture, page templates, design system, performance, and clean Next.js / Astro / Webflow output. Use when the user wants a full website (not a single landing page) for a business, brand, agency, professional, or e-commerce. Trigger phrases include "build a website", "design a website", "אתר אינטרנט", "תבנה לי אתר", "תעצב אתר", "אתר תדמית", "אתר עסקי", "premium website", "multi-page site".
---

# Premium Website Builder

Design and build complete, multi-page, premium custom websites for businesses. End deliverable is a production-ready site with consistent design system, CMS-friendly structure, and SEO foundations.

## When to use

Trigger phrases:
- "build a website", "design a custom website", "multi-page site", "full corporate site"
- "תבנה לי אתר", "תעצב אתר", "אתר תדמית", "אתר עסקי", "אתר חברה", "אתר לעסק"

**Use `premium-landing-page` instead when:** the client only needs ONE page for a campaign.

## Inputs to gather

1. **Client / business** — name, industry, services, geography
2. **Site goals** — generate leads, showcase portfolio, sell products, build authority
3. **Target audience** — segments and what each one cares about
4. **Page list** — start from typical (Home, About, Services, Portfolio, Blog, Contact) and adapt
5. **Content readiness** — does the client have copy/photos, or do we need to produce them?
6. **CMS need** — will the client edit blog/services themselves? (Yes → Sanity/Payload/Webflow)
7. **E-commerce** — products to sell? (Yes → Shopify / WooCommerce / custom Stripe)
8. **Multi-language** — Hebrew + English? Use `next-intl` or Webflow Localization
9. **Brand assets** — logo, colors, fonts. If missing → run `brand-book-creator` first
10. **Inspiration / references** — 3-5 sites the client loves
11. **Stack preference** — Next.js, Astro, Webflow, Framer, WordPress

## Default stacks by use case

| Use case | Recommended stack |
|---------|-------------------|
| Marketing + blog site, client wants to edit content | **Next.js + Sanity CMS** or **Webflow** |
| Portfolio / agency site, high design freedom | **Next.js + MDX** or **Framer** |
| Content-heavy site (>50 pages) | **Astro + headless CMS** |
| E-commerce | **Shopify Hydrogen** or **Next.js + Stripe** |
| Quick turnaround, non-technical client | **Webflow** or **Framer** |

## Site architecture

Standard small-business site:
```
/                  Home
/about             About / Story / Team
/services          Services overview (+ /services/[slug] per service)
/work or /portfolio Case studies (+ /work/[slug])
/blog              Blog index (+ /blog/[slug])
/contact           Contact + form + map
/privacy           Privacy policy
/terms             Terms of service
```

Adapt: add `/pricing`, `/testimonials`, `/faq`, `/careers`, language switcher `/en`, `/he`.

## Design system (lock these early)

```css
/* Typography */
--font-display: 'Font A'    /* H1-H3 */
--font-body: 'Font B'       /* paragraphs, UI */
--scale: 1.25 (major third) /* type scale ratio */

/* Color */
--brand-primary
--brand-secondary
--neutral-50 to 950 (9 steps)
--accent

/* Spacing (8pt) */
4, 8, 12, 16, 24, 32, 48, 64, 96, 128

/* Radius */
sm: 8px, md: 12px, lg: 16px, xl: 24px

/* Shadows */
sm / md / lg / xl (subtle, never harsh)

/* Motion */
duration-fast: 150ms
duration-base: 250ms
duration-slow: 400ms
ease: cubic-bezier(0.16, 1, 0.3, 1)
```

## Workflow

### 1. Brief & discovery
Run inputs checklist. Don't build until brand, pages, and goals are clear.

### 2. Information architecture
Output a sitemap doc — pages, sub-pages, navigation structure.

### 3. Wireframe each page
Section-by-section outline per page (text only, no code).

### 4. Brand application
If no brand book → run `brand-book-creator`. Otherwise, lock design tokens.

### 5. Build foundation
```bash
npx create-next-app@latest <name> --typescript --tailwind --app
cd <name>
npx shadcn@latest init
npm i framer-motion next-intl @sanity/client next-sanity
```

### 6. Component library (build once, reuse)
- `<Nav />` with mobile drawer
- `<Footer />`
- `<Hero variants={...} />`
- `<Section />` wrapper with consistent padding
- `<CTA />` reusable
- `<Card />` for services / portfolio
- `<TestimonialCard />`
- `<BlogCard />`
- `<Form />` with validation + submit handler
- `<LanguageSwitcher />` if multilingual

### 7. Build pages
Use `marketing-copywriting` for all section copy. Use `premium-landing-page` design principles for hero sections.

### 8. SEO foundations
- Unique `<title>` and `<meta description>` per page
- OG image per page (or template-generated)
- `sitemap.xml` and `robots.txt`
- Structured data (JSON-LD): `Organization`, `LocalBusiness`, `Article` (blog), `BreadcrumbList`
- Canonical URLs
- Image alt text
- Hebrew sites: `<html lang="he" dir="rtl">`
- Schema.org markup for services / reviews
- Verified Search Console + Bing Webmaster

### 9. Performance
- Image optimization (next/image with proper sizes)
- Font: `next/font/google` with `display: swap`
- Code splitting (route-based, automatic in Next)
- Lighthouse target: Performance ≥90, Accessibility ≥95, SEO 100
- No third-party scripts on critical path

### 10. CMS setup (if needed)
- Sanity Studio with schemas for `service`, `caseStudy`, `blogPost`, `teamMember`, `testimonial`
- Hand off client training: how to add a blog post, edit a service

### 11. Forms & integrations
- Contact form → email via Resend
- Newsletter → Mailchimp / Brevo / ConvertKit
- Analytics: GA4 + PostHog + Meta Pixel
- Cookie banner if EU traffic

### 12. Pre-launch checklist
- [ ] All pages render, no broken links (run `linkinator`)
- [ ] Mobile + tablet + desktop tested
- [ ] Lighthouse ≥90 across the board
- [ ] All forms submit and trigger email
- [ ] 404 page styled
- [ ] Favicon + apple-touch-icon
- [ ] OG previews render correctly (test on Facebook Debugger, Twitter Card Validator)
- [ ] Analytics firing
- [ ] DNS pointed, SSL active
- [ ] Backup / version control (push to Git)

## Deliverables

1. Sitemap doc
2. Wireframes (text or Figma link)
3. Design tokens locked
4. Production code or Webflow project
5. CMS access + client guide (if applicable)
6. SEO audit baseline
7. Handover doc: how to update content, who to call for hosting issues

## Pricing context (Israeli market)

Premium custom website typical range: ₪8,000–₪35,000 depending on page count, design complexity, CMS, e-commerce. Multi-language adds 30–50%.

## Anti-patterns

- Building the homepage first and the rest as afterthought — design system first
- Skipping the design tokens step — leads to inconsistency
- Sliders on the homepage (low engagement, hurt LCP)
- Overuse of animations on scroll — annoying and bad for performance
- Embedded YouTube on hero (3MB+ load cost)
- Generic "we are passionate about" About pages
- Forgetting Hebrew sites need RTL testing throughout
