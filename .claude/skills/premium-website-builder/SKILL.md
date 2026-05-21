---
name: premium-website-builder
description: Build complete production-grade multi-page websites for Israeli businesses — Hebrew RTL first, SEO-ready from day one, Core Web Vitals green, WCAG AA accessible, CMS-driven when content needs ownership, bilingual HE+EN when needed. Covers discovery, sitemap, page templates library, stack decision (Next.js / Astro / Webflow / Framer), CMS choice (Sanity / Payload / Webflow / Strapi), Hebrew typography, hreflang, Israeli legal context (חוק 13, תקן 5568), Cardcom payments, LiveDNS + Cloudflare + Vercel deployment. Trigger phrases include "תבנה לי אתר", "אתר אינטרנט", "אתר תדמית", "אתר עסקי", "אתר ללקוח", "אתר רב-עמודים", "אתר חברה", "אתר מולטי-פייג'", "אתר דו-לשוני", "build a website", "multi-page site", "corporate site", "business website". Use this for sites of 3+ pages. For a single campaign page use `ultra-premium-landing-page` instead.
---

# Premium Website Builder — Israeli Edition

Build production-grade multi-page websites for Israeli clients of Simple Solutions. Output is not a pretty mockup — it is a deployed, indexed, accessible, fast, RTL-perfect site that earns conversions on day one.

## When to use vs. landing page

| Need | Use |
|------|-----|
| Single campaign page, one CTA | `ultra-premium-landing-page` |
| 3-30 pages, brand presence | **this skill** |
| Brand identity first (no logo/colors yet) | `brand-book-creator` first |
| Copy only | `marketing-copywriting` |

## 1. What "premium" means here

Not just visual polish. A premium site is judged on **6 axes** — all must be green before launch:

1. **Performance** — LCP <2.0s, INP <200ms, CLS <0.05, Lighthouse Mobile ≥95.
2. **SEO** — every page indexable, structured data validates, sitemap submitted, hreflang correct on bilingual.
3. **Accessibility** — WCAG 2.1 AA minimum, keyboard fully usable, contrast 4.5:1 body / 7:1 ideal, תקן ישראלי 5568 awareness.
4. **RTL correctness** — no English-leftover paddings, no flipped chevrons, no LTR phone numbers breaking mid-line.
5. **Content ownership** — if client edits ≥5 pages/month, CMS is mandatory. Hardcoded text = ticking bomb.
6. **Conversion** — every page has an intended next action; bounces have a recovery path (sticky WhatsApp, exit-intent).

If any axis fails → it isn't premium yet, regardless of how it looks.

## 2. Discovery brief — 20 questions

Run these BEFORE touching code. Send to client as a doc, do not paraphrase from a phone call.

**Business**
1. שם העסק, תחום, ותק, מיקום (כתובת מלאה אם יש סניף פיזי).
2. מה הלקוח אמור לעשות אחרי שהוא יוצא מהאתר? (התקשרות / טופס / רכישה / WhatsApp / הגעה לסניף)
3. מה ה-USP — מה אתם עושים שאף אחד אחר לא?
4. 3 מתחרים שאתם מסתכלים עליהם, ומה אתם אוהבים/לא אוהבים אצלם.

**Audience**
5. פרסונה ראשית — גיל, מגדר, אזור, רמת מקצועיות בתחום.
6. ההתנגדות הכי גדולה שצריך לפרק לפני שיוצרים קשר?

**Scope**
7. רשימת עמודים נדרשים (התחל מה-default ב-§3, התאם).
8. כמה שירותים/מוצרים/לוקיישנים יש בפועל? (קובע אם צריך עמודי-פירוט דינמיים).
9. בלוג — כן/לא, ומי כותב?
10. תיק עבודות / Case studies — כמה יש, ובאיזה פורמט?

**SEO ambition**
11. SEO מקומי (אזור גיאוגרפי) / ארצי / בינלאומי?
12. מילות מפתח עיקריות שאתם רוצים לדרג בהן בגוגל ישראל?
13. Google Business Profile קיים? (חובה לעסק פיזי)

**Content**
14. תוכן קיים? תמונות מקצועיות? לוגו וקטורי? פונטים?
15. מי כותב את הטקסטים — אנחנו, הלקוח, או שילוב?

**Languages**
16. עברית בלבד / עברית+אנגלית / שפות נוספות?

**Tech**
17. דומיין רשום? אצל איזה רשם? (LiveDNS / GoDaddy / Cloudflare Registrar)
18. מערכת CRM/דוא"ל קיימת לחיבור טפסים?
19. כפתור WhatsApp Business עם מספר ייעודי? (חובה דה-פקטו בישראל)
20. תקציב + דדליין + מי מאשר עיצוב מצד הלקוח (איש אחד, לא ועדה).

## 3. Site architecture patterns — 5 patterns

### A. Local Service Business (5 pages) — שרברב, עו"ד, מרפאה
```
/                    Home (hero + 3 שירותים + ביקורות + CTA)
/about               אודות + תעודות + צוות
/services            שירותים מפורטים (anchor-links, לא sub-routes)
/contact             פרטים + מפה + טופס + WhatsApp
/privacy             מדיניות פרטיות (חוק 13)
```
SEO focus: **Local** — LocalBusiness schema, Google Business Profile, רישומים ב-Waze/Zap/דפי זהב.

### B. Professional Authority Site (7 pages) — יועץ, מאמן, מומחה
```
/                    Home
/about               סיפור אישי
/methodology         השיטה / הגישה (מבדל הסמכותיות)
/services            שירותים (+ /services/[slug] לכל אחד)
/case-studies        תיקי לקוחות (+ /case-studies/[slug])
/blog                בלוג / מאמרים (+ /blog/[slug])
/contact             קשר + לוח זמנים (Calendly/Cal.com)
```
SEO focus: **Topical authority** — Article schema, Author markup, Long-form content.

### C. Mid-size B2B Company (15-25 pages)
```
/
/about              + /about/team, /about/careers, /about/news
/solutions          + /solutions/[industry] x 4-8 (per vertical)
/products           + /products/[product] x 3-10
/customers          + /customers/[case] x 6-12
/resources          + /resources/[type]/[slug] (whitepapers, webinars)
/blog               + /blog/[slug]
/contact            + /contact/sales, /contact/support
/legal              /legal/privacy, /legal/terms, /legal/dpa
```
**CMS mandatory.** Translated routes for bilingual.

### D. Multi-location Retail (אופנה / מסעדה / רשת)
```
/
/locations           index של כל הסניפים
/locations/[city]    עמוד-עמיק לכל סניף (שעות, מפה, צילומים, תפריט/מלאי)
/menu או /products
/about
/contact
```
SEO focus: **Local SEO ×N** — LocalBusiness schema per location, NAP consistency, Google Business per סניף.

### E. Bilingual Corporate (HE + EN)
```
/he/...              עץ עברי מלא
/en/...              עץ אנגלי מלא (URLs מתורגמים, לא זהים)
```
- `<html lang="he" dir="rtl">` ב-/he, `<html lang="en" dir="ltr">` ב-/en
- `<link rel="alternate" hreflang="he-IL" href="...">` + `hreflang="en"` + `hreflang="x-default"`
- שני sitemaps נפרדים או אחד מאוחד עם xhtml:link
- Language toggle תמיד נשמר לאותו URL מקביל (לא חוזר ל-home)

## 4. Page templates library

לכל template: **חתכים מחייבים | תוכן חובה | SEO essentials**.

### Home
- חתכים: Hero (H1 + CTA ראשי), 3 USPs, שירותים-tease, פרוף סוציאלי (לוגואים/מספרים), ביקורות, FAQ מצומצם, CTA סוגר.
- SEO: H1 יחיד, title 50-60 תווים (עברית קצרה יותר), meta description 150-160, Organization schema + WebSite + SearchAction.

### About
- חובה: סיפור אמיתי (לא "אנחנו נלהבים"), תאריך הקמה, תעודות, צוות עם תמונות אמיתיות.
- SEO: AboutPage schema.

### Services hub
- רשימת כל השירותים עם מעבר ל-detail.
- SEO: ItemList schema.

### Service detail
- חובה: בעיה → פתרון → תהליך → תוצאה → מחיר/מהיכן מתחילים → CTA + FAQ ספציפי.
- SEO: Service schema + FAQPage + BreadcrumbList.

### Pricing
- 3 חבילות (Tier psychology), highlight על האמצעי, FAQ, אם אין מחיר ציבורי → Lead-gen form עם quote.
- SEO: Product/Service schema with Offer.

### Case studies hub + detail
- detail: Client / Challenge / Approach / Results (מספרים), ציטוט, גלריה, CTA "פרויקט דומה?".
- SEO: CaseStudy → Article schema, Review/AggregateRating כשרלוונטי.

### Blog hub + post
- post חובה: H1, תאריך פרסום + עדכון, מחבר, זמן קריאה, TOC לפוסטים >1200 מילים, related posts.
- SEO: Article schema (headline, datePublished, dateModified, author, image), BreadcrumbList.

### Contact
- טופס + טלפון לחיץ + WhatsApp + כתובת + מפה (LazyLoad), שעות פעילות, מענה למייל בתוך X.
- SEO: ContactPage schema, LocalBusiness עם openingHoursSpecification.

### Locations / Locations detail
- per location: NAP, מפה, תמונות, שירותים זמינים, שעות, הוראות הגעה, טלפון ייעודי.
- SEO: LocalBusiness per page with unique `@id`.

### Team
- per member: שם, תפקיד, תמונה, ביו קצר, LinkedIn.
- SEO: Person schema.

### FAQ
- accordion, פתוח-ראשון, anchor-links לכל שאלה (`#question-slug`).
- SEO: FAQPage schema (חובה — מופיע ב-Rich Results).

### Privacy / Terms (חוק 13 compliant)
- חובה: איזה מידע נאסף, למה, איפה נשמר, איך מוחקים, פרטי בעל המאגר.
- **המלץ ללקוח להעביר לעו"ד פרטיות לאישור.** Claude is not a lawyer.

### Thank-you pages
- אחרי טופס/רכישה: confirmation + מה עכשיו + next steps + cross-sell עדין.
- SEO: noindex (אחרת הם מתורגמים ל-keywords).

## 5. Stack decision tree

```
האם הלקוח (לא אנחנו) יערוך תוכן 5+ פעמים בחודש?
├─ לא  →  Next.js 15 + MDX (גמיש, מהיר, חינם)
└─ כן  →  האם הלקוח טכנולוגי?
         ├─ לא  →  האם תקציב >₪25K?
         │       ├─ כן  →  Next.js 15 + Sanity (best of both)
         │       └─ לא  →  Webflow (no-code לכל הצוות)
         └─ כן  →  האם הסייט תוכן-כבד (200+ עמודים)?
                  ├─ כן  →  Astro + Sanity (SSG, build-time מהיר)
                  └─ לא  →  Next.js 15 + Sanity

אם יצירתיות-מקסימלית portfolio עם הרבה motion → Framer.
```

**Default for Simple Solutions: Next.js 15 + Sanity + Tailwind + shadcn.**

| Stack | מתי | יתרון | חסרון |
|-------|-----|-------|--------|
| Next.js 15 App Router | רוב המקרים | SSR/ISR, SEO מושלם, גמישות מלאה | דורש מפתח |
| Astro | תוכן-כבד, blog-first | HTML טהור, מהיר ביותר | פחות interactivity |
| Webflow | לקוח עורך לבד, אין מפתח | UI לא-טכני | LTR-first, RTL דורש hacks |
| Framer | פורטפוליו מוטיון-כבד | motion מובנה | מוגבל ב-CMS וב-SEO מתקדם |

## 6. CMS options

| CMS | מתי | RTL | Hebrew | מחיר |
|-----|-----|-----|--------|------|
| **Sanity** (default) | רוב הלקוחות | ✓ ב-Studio | ✓ מלא | חינם עד 3 users |
| Payload | self-hosted חובה (פרטיות/רגולציה) | ✓ | ✓ | open-source |
| Webflow CMS | no-code לחלוטין | חלקי | ✓ | $23+/mo |
| Strapi | על Supabase Postgres קיים | ✓ | ✓ | open-source |
| Contentful | enterprise בלבד | ✓ | ✓ | יקר ($300+) |

**Sanity schema example for service:**
```ts
// sanity/schemas/service.ts
export default {
  name: 'service', type: 'document',
  fields: [
    { name: 'titleHe', type: 'string', validation: r => r.required() },
    { name: 'titleEn', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'titleHe' } },
    { name: 'descHe', type: 'text' },
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'priceFrom', type: 'number' },
    { name: 'faq', type: 'array', of: [{ type: 'object', fields: [...] }] }
  ]
}
```

## 7. Hebrew RTL deep dive

### Setup
```tsx
// app/[locale]/layout.tsx
<html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
```
Tailwind: enable `dir-aware` utilities (`ps-4` / `pe-4` instead of `pl-4` / `pr-4`).

### Logical CSS — חובה
```css
/* ❌ */ margin-left: 16px; padding-right: 24px;
/* ✓  */ margin-inline-start: 16px; padding-inline-end: 24px;
```

### Hebrew typography stack — mood mapping
| מצב רוח | פונט עברי | משקל body מומלץ |
|---------|-----------|----------------|
| טק / מודרני / סטארטאפ | **Heebo** | 400 |
| חם / שירותי / קליני | **Assistant** | 400 |
| ידידותי / B2C / קמעונאות | **Rubik** | 400 |
| עריכותי / יוקרה / משפט | **Ploni** או **Narkis** | 400 |
| Impact / כותרות חזקות | **Suez One**, **Frank Ruhl Libre** | 700+ |
| Corporate / פיננסי | **FbReforma**, **Open Sans Hebrew** | 400 |

טיפ: עברית נראית כבדה מאנגלית באותו משקל. **תמיד 400 ב-body**, לא 500.
Line-height עברית: **1.6-1.75** (לעומת 1.4-1.5 באנגלית).

### Numbers, dates, phones — LTR pockets
```html
<span dir="ltr">050-1234567</span>
<span dir="ltr">20/05/2026</span>
<span dir="ltr">$1,234.56</span>
```
אחרת — סדר הספרות נשבר מימין לשמאל.

### Icon mirroring rules
- **למרר**: chevrons, arrows, back/forward, list-bullets עם חץ.
- **לא למרר**: לבבות, כוכבים, פנים, לוגואים, אייקונים סימטריים.
- Tailwind: `rtl:-scale-x-100` לאיקון שצריך mirroring.

### Breadcrumbs
חץ מצביע **שמאלה** בעברית: `דף הבית ← שירותים ← ייעוץ`.

## 8. Bilingual setup (HE + EN)

### Routing — Next.js App Router
```
app/
  [locale]/
    layout.tsx
    page.tsx              → /he או /en
    about/page.tsx        → /he/אודות או /en/about (translated)
    services/[slug]/...
  middleware.ts           → detect & redirect
```

### Translated URLs (recommended)
- HE: `/he/שירותים/יעוץ-עסקי` — טוב ל-SEO ישראלי.
- EN: `/en/services/business-consulting`.
- Library: `next-intl` עם `pathnames` config.

### hreflang tags (חובה)
```html
<link rel="alternate" hreflang="he-IL" href="https://site.co.il/he/about" />
<link rel="alternate" hreflang="en" href="https://site.co.il/en/about" />
<link rel="alternate" hreflang="x-default" href="https://site.co.il/he/about" />
```

### Language toggle UX
- שמירת עמוד מקביל (לא חזרה ל-home).
- Cookie persistence (`NEXT_LOCALE`).
- אייקון: לא דגלים (פוליטי) — קוד שפה: `HE | EN`.

### Font swap per language
```css
:lang(he) { font-family: 'Heebo', sans-serif; }
:lang(en) { font-family: 'Inter', sans-serif; }
```

## 9. SEO foundation — Israeli specifics

### Files
- `app/sitemap.ts` — dynamic, מכלול CMS content.
- `app/robots.ts` — allow all, link to sitemap.
- `public/site.webmanifest`, `favicon.ico`, `apple-touch-icon.png` (180×180), `icon.svg`.

### Structured data (JSON-LD) — חובה לדרג
- `Organization` (home) + logo + sameAs (כל הסושיאל).
- `LocalBusiness` עם `address` בפורמט ישראלי: `streetAddress`, `addressLocality` (העיר), `addressRegion` (מחוז), `postalCode`, `addressCountry: "IL"`, `telephone: "+972-..."`, `openingHoursSpecification`.
- `Service`, `Product`, `Article`, `FAQPage`, `BreadcrumbList`, `Person` (team).
- בדיקה: https://search.google.com/test/rich-results

### Title/description — Hebrew constraints
- Title: 50-60 תווים (עברית רחבה יותר → גבול נמוך).
- Description: 150-160. Emoji דרך-אמצע נחתך ב-SERP.

### OG + Twitter cards
- OG image 1200×630, וכן גרסה Hebrew אם הכותרת באנגלית לא משקפת.
- בדיקה: https://www.opengraph.xyz, https://cards-dev.twitter.com/validator.

### Local SEO checklist for Israeli physical businesses
- [ ] Google Business Profile מאומת + 10+ תמונות.
- [ ] Waze listing (חובה — חיפוש בנייד).
- [ ] רישום ב-Zap.co.il, B144, Easy.co.il.
- [ ] NAP (Name/Address/Phone) זהה בכל המקומות — אפילו "רח'" מול "רחוב" יכול לפגוע.
- [ ] ביקורות גוגל — בקש מ-5 לקוחות מרוצים בשבוע הראשון.

## 10. Performance targets & strategy

| Metric | Target | חמור אם |
|--------|--------|---------|
| LCP | <2.0s | >2.5s |
| INP | <200ms | >500ms |
| CLS | <0.05 | >0.1 |
| TTFB | <600ms | >1.2s |
| Lighthouse Mobile Perf | ≥95 | <80 |
| JS initial | <100KB gzip | >250KB |

### Image strategy
```tsx
import Image from 'next/image';
<Image src="/hero.jpg" alt="..." fill priority sizes="100vw"
       placeholder="blur" blurDataURL="..." />
```
- WebP + AVIF דרך `next/image` אוטומטית.
- Hero image: `priority`, אחרים: lazy by default.
- Photos: דחוס דרך Squoosh/Sharp, מקסימום 200KB ל-hero.

### Font loading
```tsx
import { Heebo } from 'next/font/google';
const heebo = Heebo({ subsets: ['hebrew', 'latin'], display: 'swap' });
```
- `subsets: ['hebrew']` — חוסך 60% מהמשקל.
- `display: swap` — אין FOIT.

### JS budget discipline
- אין jQuery. אין moment.js. אין lodash שלם (import per-function).
- בדיקת bundle: `npx @next/bundle-analyzer`.
- Lazy load מעל ה-fold: `dynamic(() => import('...'), { ssr: false })`.

## 11. Accessibility — תקן ישראלי 5568 + WCAG 2.1 AA

### חוק ישראלי
- אתר עסקי בישראל חייב להיות נגיש לפי **תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013** — הפניה לתקן **ישראלי 5568** (מבוסס WCAG 2.0 AA, גרסה עדכנית קרובה ל-2.1).
- חובה **הצהרת נגישות** בעמוד נפרד (`/accessibility`) — שם רכז נגישות, תאריך, פרטי קשר.
- **המלץ ללקוח על יועץ נגישות מוסמך** לחתימה על ההצהרה הרשמית. Claude לא מוסמך לכך.

### Practical checklist
- [ ] HTML semantic — `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, headings רציפים H1→H2→H3.
- [ ] `alt` לכל תמונה (ריק `alt=""` לדקורציה).
- [ ] Focus visible — `:focus-visible` ring ברור.
- [ ] Keyboard navigation מלאה — tab order הגיוני, skip-to-content link.
- [ ] aria-labels בעברית: `aria-label="פתח תפריט"`.
- [ ] Contrast: body 4.5:1 minimum, headlines large 3:1. שאיפה: 7:1 (AAA) ב-body.
- [ ] Form labels קשורים ב-`htmlFor`.
- [ ] שגיאות טופס בטקסט + צבע (לא רק אדום — עיוורי-צבע).
- [ ] No autoplay video עם סאונד.
- [ ] תוסף נגישות (כמו Equally.ai / נגישבוט) — נחמד אך **לא תחליף** לקוד נגיש.

## 12. Forms & lead capture — Israeli playbook

### Stack
- **Resend** — transactional email (welcome, confirmation, internal alert).
- **Supabase** — שמירת lead ב-table `leads` עם RLS.
- **WhatsApp Business** — חובה. Deep link: `https://wa.me/972501234567?text=...` (encodeURIComponent על הטקסט).
- **reCAPTCHA v3** invisible — לפני submit. אם score <0.5 → block.
- **Cardcom** — אם יש checkout. Stripe לא עובד בישראל.

### Sticky bottom-bar (mobile)
חובה לעסק שירותי: bar קבוע עם 2 כפתורים: **WhatsApp** + **התקשר**.

### Form sample
```tsx
// app/api/lead/route.ts
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
export async function POST(req: Request) {
  const data = await req.json();
  const supabase = createClient();
  await supabase.from('leads').insert(data);
  await resend.emails.send({
    from: 'leads@simple-solution.co.il',
    to: 'gili@...',
    subject: `ליד חדש: ${data.name}`,
    html: `<div dir="rtl">...</div>`
  });
  return Response.json({ ok: true });
}
```

## 13. Hosting & deployment

### Architecture
```
User → Cloudflare (DNS + WAF + CDN 300+ POPs)
     → Vercel (Edge/Node runtime, ISR cache)
     → Supabase (Postgres + Storage)
```

### Steps
1. `git init` + push ל-GitHub repo (privacy: private).
2. `vercel link` או חבר מ-Vercel dashboard.
3. Env vars ב-Vercel: `SANITY_PROJECT_ID`, `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE` (server-only), `NEXT_PUBLIC_GA_ID`, וכו'.
4. Preview deploy אוטומטי לכל PR.
5. Custom domain: `.co.il` רשום אצל **LiveDNS** (https://domains.livedns.co.il). הרשם נשאר LiveDNS, אבל DNS-NS מועבר ל-Cloudflare:
   - ב-LiveDNS: שינוי nameservers ל-Cloudflare (`x.ns.cloudflare.com`, `y.ns.cloudflare.com`).
   - ב-Cloudflare: A record + CNAME `www` → `cname.vercel-dns.com`.
   - ב-Vercel: Domain → verify.
6. SSL — אוטומטי דרך Vercel + CF.
7. Force HTTPS ב-CF SSL settings → Full (strict).

### Cloudflare benefits ב-Israel
- WAF: חסימת bot ישראלי spam.
- DDoS: חינמי בכל תוכנית.
- Cache: 300+ POPs, אחד ב-Tel Aviv.

## 14. Analytics stack

| Tool | תפקיד |
|------|-------|
| **GA4** | קהל + acquisition + events |
| **Meta Pixel** | retargeting פייסבוק/אינסטה |
| **PostHog** | session recording, funnels, heatmaps |
| **Vercel Analytics** | Core Web Vitals real-user |
| **Sentry** | client + server errors |
| **Google Search Console** | indexability, queries, errors |
| **Bing Webmaster** | יותר חשוב משחושבים בישראל |

חיבור דרך `next/script` עם `strategy="afterInteractive"` (לא לחסום LCP).

## 15. Pre-launch checklist (30 items)

### Content
- [ ] כל העמודים מאוכלסים — אין Lorem.
- [ ] כל הטקסטים מוגהים (גיגי קורא + עוד עין).
- [ ] תמונות אמיתיות (לא רק stock).
- [ ] לוגו וקטורי SVG, לא PNG מטושטש.

### Tech
- [ ] `<html lang="he" dir="rtl">` בכל עמוד עברי.
- [ ] hreflang תקין אם דו-לשוני.
- [ ] favicon + apple-touch-icon + manifest.
- [ ] 404 + 500 מעוצבים עם נאב חזרה.
- [ ] robots.txt מצביע ל-sitemap.
- [ ] sitemap.xml מוגש ל-Search Console + Bing.
- [ ] structured data בכל page-type עוברת ב-Rich Results Test.

### Performance
- [ ] Lighthouse Mobile ≥95 בכל קטגוריה.
- [ ] LCP <2.0s על 4G simulated.
- [ ] תמונות ב-WebP/AVIF, כולן `next/image`.

### Analytics
- [ ] GA4 firing — Realtime view מאשר.
- [ ] Meta Pixel test events דרך Events Manager.
- [ ] PostHog autocapture פועל.
- [ ] Sentry receiving — שלח error מבחן.
- [ ] Search Console + Bing מאומתים.

### Forms & CTAs
- [ ] כל טופס נשלח → מייל נכנס תוך 30 שניות.
- [ ] WhatsApp link עובד במובייל אמיתי (לא דמו).
- [ ] reCAPTCHA חוסם spam test.
- [ ] Thank-you page — noindex.

### Mobile / RTL
- [ ] בדיקה ב-375 / 414 / 768 / 1024 / 1440.
- [ ] RTL spot-check בכל עמוד — אין paddings הפוכים.
- [ ] מספרי טלפון בלי שבירה.

### Social
- [ ] OG preview נראה טוב ב-WhatsApp, פייסבוק, לינקדאין.
- [ ] Twitter card עובדת.

### Legal
- [ ] עמוד פרטיות (חוק 13) + תנאי שימוש + הצהרת נגישות.
- [ ] Cookie banner אם יש visitors מ-EU.

### Backup
- [ ] Production branch protected ב-GitHub.

## 16. Pricing & timeline (Israeli market)

| Type | מחיר | זמן | Stack |
|------|------|-----|-------|
| Local service site (5 עמודים) | ₪8K-₪18K | 2-4 שבועות | Next.js + MDX |
| Professional authority (7 עמודים) | ₪15K-₪35K | 4-6 שבועות | Next.js + Sanity |
| Mid-size B2B (15-25 עמודים) | ₪30K-₪80K | 6-10 שבועות | Next.js + Sanity |
| Multi-location retail | ₪25K-₪60K | 5-8 שבועות | Next.js + Sanity |
| Bilingual corporate | **+30-50%** | +2-3 שבועות | + next-intl |

מודל תשלום מומלץ: 50% ב-kickoff, 30% באישור עיצוב, 20% בעלייה לאוויר.

## 17. Anti-patterns — אל תעשה

- ❌ עיצוב גנרי תבנית-Wix-ic.
- ❌ Hero עם תמונת-צוות-מחויך-stock.
- ❌ כפתור "קבל הצעת מחיר" שלא מוביל לטופס.
- ❌ ניווט באנגלית באתר עברי ("Home / About" — לא, "דף הבית / אודות").
- ❌ Bilingual בלי hreflang — Google רואה duplicate.
- ❌ הודעות שגיאה בטופס נשארות "Required field" באתר עברי.
- ❌ הצהרת נגישות מועתקת מאתר אחר — חשוף משפטית.
- ❌ Slider בהירו (LCP נהרס, engagement נמוך).
- ❌ YouTube embed ב-fold — 3MB+.
- ❌ "אנחנו נלהבים מ..." בעמוד About.
- ❌ אין WhatsApp button ב-mobile.
- ❌ פונט עברי במשקל 500 ב-body — נראה כבד מדי.
- ❌ Slider של לוגואים שזז — annoying + CLS.
- ❌ Form fields בלי `autocomplete` (UX רע במובייל).
- ❌ הכל hardcoded כשהלקוח אמר "אני אערוך לבד".

## Deliverables to hand to client

1. **Sitemap doc** (notion / docx).
2. **Wireframes** (Figma או טקסט).
3. **Design tokens** נעולים.
4. **Repo** ב-GitHub עם README + run instructions.
5. **CMS access** + מדריך וידאו 5 דקות איך להוסיף פוסט.
6. **SEO baseline** — screenshot של Lighthouse + Rich Results + Search Console.
7. **Handover doc**: hosting אצל מי, מי לפנות אליו, מה ה-SLA, איך להחליף תוכן, איך לקנות domain renewal.
8. **Accessibility statement** — המלצה לעו"ד/יועץ לאישור.

## Workflow summary (one-command flow)

1. Discovery brief (20 שאלות) → לקוח ממלא → אישור.
2. Sitemap + wireframes → אישור.
3. Brand check (אם אין → `brand-book-creator`).
4. Stack decision (decision tree §5).
5. CMS schema setup.
6. Component library build.
7. Page-by-page build (כל עמוד עובר QA לפני הבא).
8. SEO + structured data per page.
9. Performance pass (Lighthouse).
10. Accessibility pass + spot-check RTL.
11. Forms + analytics + Sentry.
12. Deploy to Vercel + Cloudflare in front.
13. Pre-launch checklist (30 items).
14. Go live → submit sitemap.
15. Handover docs + training.
