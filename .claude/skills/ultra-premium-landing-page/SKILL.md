---
name: ultra-premium-landing-page
description: Build ULTRA-PREMIUM, UNIQUELY-TAILORED landing pages end-to-end — discovery, copy, design DNA blending from 70+ world-class brand references, fully custom visual language per client, Hebrew RTL, Next.js 15 + Tailwind 4 + shadcn + Framer Motion. Auto-detects LP type from goal (lead-gen / sales / event / launch / custom). Auto-creates Google Sheet via MCP for lead capture with Zapier/Make webhook. Surfaces payment provider question only when checkout is needed (Cardcom / Grow / משולם / Stripe). Auto-loads `brand-context.json` if the client has a brand book. Pauses before going live — asks where to host (Simple Solutions subdomain / client-owned domain / files-only handoff). Replaces the older `premium-landing-page` skill. Trigger phrases — Hebrew "דף נחיתה", "תעצב לי דף נחיתה", "דף נחיתה ללקוח", "דף נחיתה ייחודי", "דף נחיתה אולטרה פרימיום", "דף נחיתה לא גנרי", "דף נחיתה בוטיק", "דף נחיתה מותאם אישית", "דף מכירה", "דף לידים". English: "landing page", "build a landing page", "design a landing page", "ultra premium landing page", "unique landing page", "bespoke landing page", "boutique landing page", "custom landing page", "one-of-a-kind landing page", "high-converting landing page".
---

# Ultra-Premium Landing Page Builder

End-to-end pipeline that takes a project brief and ships a **landing page that could only belong to this one specific client**. If you can swap the logo and copy for any other business in the same vertical — it failed. Restart.

This skill is the unified successor of `premium-landing-page` and the previous `ultra-premium-landing-page`. **Per-client uniqueness is the product.** Conversion, performance, accessibility are table stakes.

---

## When to use

Trigger phrases — Hebrew:
- "תעצב לי דף נחיתה", "תבנה דף נחיתה", "דף נחיתה ל[שם לקוח]"
- "דף לידים", "דף מכירה", "דף השקה", "דף לוובינר"
- "דף נחיתה ייחודי", "אולטרה פרימיום", "בוטיק", "לא גנרי"

English: "landing page", "build/design a landing page", "ultra-premium / bespoke / boutique / unique landing page".

**Use this for ALL landing-page work.** The single-page (`premium-landing-page`) skill is being deprecated.

**Use `premium-website-builder` instead when:** the client needs 3+ pages (about / services / contact / blog). This skill is for ONE focused campaign page.

---

## The 6-stop pipeline

Unlike `brand-book-creator` (single autonomous run), LP work has more decision points that affect cost, integration, and hosting. The skill stops at 6 explicit gates and asks Gili. Between gates, sub-agents run autonomously.

```
[trigger]
   ↓
═══ GATE 1 — Project intake ═══
   • Client/project name
   • Is there an existing brand book?  → if YES, load brand-context.json
   • Goal of the page (one sentence)
   • Business field + target audience
   ↓
[auto] lp-discovery-runner
   → diagnoses LP type (lead-gen / sales / event / launch / custom)
   → drafts a "Page Brief" — type, length, sections, conversion mechanism
   ↓
═══ GATE 2 — Page Brief approval ═══
   • Shows: page type, proposed sections, conversion mechanism, est. length
   • Gili approves or steers
   ↓
═══ GATE 3 — Type-specific questions ═══
   • If form on page:
       - Which fields to collect? (phone / email / full name / area / city / …)
       - Service-selector needed? Which services to offer?
   • If checkout on page:
       - Payment provider? (Cardcom / Grow / משולם / Stripe)
       - Product name + price
   • Tracking pixels needed? (Meta / GA4 / PostHog)
   • Bilingual (HE+EN)?
   ↓
[auto, parallel where possible]
   lp-copy-architect          → all Hebrew copy
   lp-design-dna-blender      → picks 2-3 references, defines visual DNA
   lp-section-architect       → final section blueprint + tokens
   lp-form-builder            → Google Sheet (MCP) + Webhook + Zapier brief
   lp-payment-integrator      → (only if checkout) Cardcom/Grow/Stripe wiring
   lp-tracking-installer      → Meta Pixel + GA4 + PostHog
   lp-builder-compiler        → full Next.js 15 project
   ↓
═══ GATE 4 — Local preview + self-uniqueness audit ═══
   • Compiler runs the swap-test and fingerprint-test
   • Shows Gili the file tree + local URL + screenshots
   • Revisions handled by re-running only the relevant agent
   ↓
═══ GATE 5 — Deployment choice ═══
   "Where do we host this page?"
   (a) אצלנו — Simple Solutions subdomain (lp.simple-solution.co.il/[client])
   (b) אצל הלקוח — buy a domain and wire it to Vercel under client's account
   (c) קבצים בלבד — produce a zip + handoff guide for client's own dev
   ↓
[auto] lp-deployer
   → push to GitHub, deploy to Vercel Preview, show URL for client review
   ↓
═══ GATE 6 — Go live + optional custom domain ═══
   • After Gili (or client) approves Preview → promote to Production
   • Asks: "Connect a custom domain too?"  → if YES, walks through DNS via MCP
   • Hands over the Google Sheet link + production URL + Zapier setup notes
```

**Why 6 gates and not autonomous like the brand book:** LP work hits more real-world hooks — payment, Sheet, Zapier, DNS, hosting. Silent failure here costs Gili a client. Brand books fail safely; landing pages fail visibly.

---

## Files in this skill

| File | Purpose |
|---|---|
| `SKILL.md` | This orchestrator |
| `references/lp-type-decision-matrix.md` | Rules for auto-diagnosing LP type from goal + audience |
| `references/section-library.md` | Reusable section blueprints + when to use each |
| `references/anti-template-playbook.md` | Concrete moves to escape the SaaS-template look |
| `references/hebrew-rtl-checklist.md` | The full RTL treatment — fonts, logical props, punctuation, validation copy |
| `references/design-references-index.md` | Index of the 70+ brand references in `.claude/references/awesome-design-md/` |
| `references/payment-providers-il.md` | Cardcom / Grow / משולם / Stripe — when each, how to integrate |
| `references/deployment-playbook.md` | The 3 hosting paths + DNS via LiveDNS + Cloudflare + Vercel |
| `references/self-uniqueness-audit.md` | The pre-delivery checklist (swap test, fingerprint test, DNA test) |
| `references/senior-designer-vs-ai-tells.md` | **CRITICAL** — diagnoses the 10 AI-luxury fingerprints + the 5 senior-master moves. The compiler runs this audit before GATE 4. Added May 2026 after the Amir Sudai diagnosis. |
| `references/signature-moments-library.md` | **CRITICAL** — the WOW-moment catalog (Part 1), asymmetric layouts (Part 2), background depth SVGs per industry (Part 3), headline effects (Part 4). The blender picks from each; compiler enforces. |
| `references/israeli-boutique-references.md` | Real Israeli boutique sites (s-pixel.co.il, bluebee.co.il, alexgorbachov.co.il, webiztlv.co.il) that set the quality bar. Blender consults for every Israeli client. |

Sub-agents live in `.claude/agents/` (project-level) — invoked by the orchestrator via the Agent tool:

| Agent | Role |
|---|---|
| `lp-discovery-runner` | Sub-agent 1 — GATE 1 intake + LP type diagnosis + GATE 3 type-specific questions |
| `lp-copy-architect` | Sub-agent 2 — Hebrew conversion copy (uses `marketing-copywriting` patterns) |
| `lp-design-dna-blender` | Sub-agent 3 — blends 2-3 brand references into a unique DNA |
| `lp-section-architect` | Sub-agent 4 — final section blueprint + tokens |
| `lp-form-builder` | Sub-agent 5 — Google Sheet (MCP) + Webhook + Zapier/Make brief |
| `lp-payment-integrator` | Sub-agent 6 — Cardcom / Grow / Meshulam / Stripe (only when checkout is needed) |
| `lp-tracking-installer` | Sub-agent 7 — Meta Pixel + GA4 + PostHog |
| `lp-builder-compiler` | Sub-agent 8 — Next.js 15 project compilation + Lighthouse + self-uniqueness audit |
| `lp-deployer` | Sub-agent 9 — GitHub + Vercel + DNS (handles GATE 5 + GATE 6) |

---

## Critical rules (read every time)

1. **One client = one folder.** Output goes to `clients/<client-slug>/landing-page/` (created at GATE 1).

2. **Brand book is the truth if it exists.** GATE 1 asks "is there a brand book?" If YES → load `clients/<client-slug>/brand-book/brand-context.json` and use its colors/fonts/voice/USP/archetype. The design-DNA-blender takes the brand book as a hard constraint, not a suggestion. If NO → the discovery agent extracts enough DNA in GATE 1+2 to design from scratch.

3. **Never copy a reference brand.** Blend 2-3 from `.claude/references/awesome-design-md/` into something new. If the result looks like Linear or Stripe — restart.

4. **No template fingerprints.** No Poppins/Inter/Montserrat as the display face. No default shadcn purple. No three-icon feature row. No fake testimonial avatars. No gradient blob hero. See `references/anti-template-playbook.md` for the full list.

5. **Hebrew RTL is mandatory** when the client operates in Hebrew. `<html lang="he" dir="rtl">`, Tailwind logical properties (`ps-*`, `me-*`, `start-*`), Hebrew-tuned line-heights (≥1.6 body, ≥1.15 display), `hyphens: none` for Hebrew. See `references/hebrew-rtl-checklist.md`.

6. **Every page with a form gets a Google Sheet — no exceptions.** The form-builder agent creates the Sheet via the Google Sheets MCP at the start of the build, with columns matching the chosen form fields. A Zapier/Make webhook brief is produced. Gili wires the actual Zap/Scenario (it needs his Google account).

7. **Payment provider is asked, never assumed.** When the LP needs checkout, GATE 3 surfaces the question. Cardcom is the default suggestion for Israeli clients per CLAUDE.md, but the choice is Gili's per project. Stripe is offered only when the client takes international payments.

8. **Pause before going live.** Never deploy to Production without explicit approval at GATE 6. Preview URL is fine to share; Production is not.

9. **Self-uniqueness audit is non-negotiable** before GATE 4. The compiler MUST run the swap-test and fingerprint-test from `references/self-uniqueness-audit.md`. If anything fails, the relevant agent re-runs before Gili sees the preview.

10. **Performance gate before GATE 5.** Lighthouse mobile must hit Performance ≥95, Accessibility ≥95, Best Practices 100, SEO 100. LCP ≤1.8s, CLS ≤0.05, INP ≤200ms. Total transfer ≤1.2MB.

11. **AI-tells audit is mandatory before GATE 4** (added May 2026). The compiler runs `references/senior-designer-vs-ai-tells.md` Part 3 audit. Every fingerprint check must be FALSE; every senior-moves check must be TRUE. The page fails GATE 4 otherwise.

12. **The 4 mandatory design elements** (no exceptions):
    - **Asymmetric layouts** in ≥2 sections (see `signature-moments-library.md` § Part 2)
    - **Background depth** — one industry-specific SVG outline (see § Part 3). NEVER halftone/dot-pattern.
    - **Headline effects** on h1 + ≥2 h2s (see § Part 4). NEVER plain static headlines.
    - **One signature WOW moment** from § Part 1. Exactly one — never more, never zero.

13. **Hebrew copy must NOT use em-dashes (`—`) in body.** This is the #1 AI Hebrew fingerprint. Allowed only in h1/h2 max once per page. The compiler greps and rejects violations. See `lp-copy-architect.md` rules 7-12.

14. **Banned palette combinations** — Navy + Gold + shimmer text (the "luxury finance template"); default Tailwind indigo/violet; black + neon-purple; three-stop gradient hero. See `lp-design-dna-blender.md` § M6.

---

## Output structure

```
clients/<client-slug>/landing-page/
├── PAGE-BRIEF.md                 ← LP type, sections, conversion mechanism (from GATE 2)
├── DESIGN-LANGUAGE.md            ← Blend brief — references + reasoning + tokens
├── STRUCTURE.md                  ← Section-by-section outline with copy + visual notes
├── code/                         ← The Next.js 15 project (ready to deploy)
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
├── assets/
│   ├── hero.webp
│   ├── og.png
│   └── ...
├── integrations/
│   ├── google-sheet-link.md      ← URL + Zapier/Make wiring instructions for Gili
│   ├── payment-config.md         ← (if checkout) provider creds checklist
│   └── tracking-pixels.md        ← Meta/GA4/PostHog IDs + verification steps
├── deployment/
│   ├── vercel-preview-url.md     ← After GATE 5
│   ├── production-url.md         ← After GATE 6
│   └── dns-setup.md              ← (if custom domain) DNS records + status
├── reports/
│   ├── lighthouse-mobile.pdf
│   ├── self-uniqueness-audit.md  ← Filled checklist
│   └── revision-log.md
└── handoff/                      ← Only if Gili chose deployment option (c)
    ├── client-handoff-guide.md
    └── landing-page.zip
```

---

## Quality bar (must pass before GATE 5)

- [ ] PAGE-BRIEF approved by Gili at GATE 2
- [ ] If brand book exists: colors, fonts, voice all match `brand-context.json`
- [ ] If no brand book: DNA card built from GATE 1+2 answers, documented in DESIGN-LANGUAGE.md
- [ ] 2-3 reference brands picked and documented; none dominant — it's a blend
- [ ] Every design decision traceable to an answer in the brief
- [ ] Display font is NOT Poppins/Inter/Montserrat/Roboto
- [ ] Primary color is NOT default Tailwind indigo/violet/shadcn-zinc
- [ ] Hebrew RTL checklist 100% green
- [ ] Form (if any) has Google Sheet wired + Zapier/Make brief written
- [ ] Payment (if any) tested in sandbox mode, IPN/webhook reachable
- [ ] Self-uniqueness audit passed — swap test, fingerprint test, DNA test
- [ ] Lighthouse mobile ≥95/95/100/100
- [ ] 404 + thank-you pages designed (not default)
- [ ] OG image + favicon generated per client

---

## Anti-patterns (see `references/anti-template-playbook.md` for full list)

- Stock photos of people on laptops looking at camera
- Gradient blob hero shapes
- Default `bg-violet-600` shadcn buttons
- Three-icon feature row with Heroicons
- Fake testimonial avatars from UI Faces / RandomUser
- Pricing cards with the middle one elevated + "Most Popular" badge
- Animated number counters
- "Trusted by" greyscale logo bar with companies the client never worked with
- Founder photo on right, arms crossed in blazer
- Carousels for testimonials
- Hyphenated Hebrew
- "Get started" CTAs with no destination
- Hero headline >12 words
- Default rounded-full team avatars
- Identical bento grids with `rounded-2xl`

---

## After delivery — feed back into the agency

After Gili approves Production:
1. Ask: "Save the chosen design blend to the design-references-index as a successful pattern?" (yes/no)
2. Commit the client folder
3. If brand book existed → push updated `brand-context.json` if any palette was extended
4. Update `revision-log.md` with the final state

This grows the agency's pattern library across projects — same idea as `master-fonts-library.md` in `brand-book-creator`.
