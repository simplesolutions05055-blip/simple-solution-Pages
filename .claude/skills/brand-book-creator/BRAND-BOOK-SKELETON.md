# Brand Book Skeleton — Structural Specification

This file defines **WHAT** every brand book contains. It does NOT define **HOW** it looks — visual design is generated fresh per client by `brand-visual-system-designer`.

The chapter list is fixed. Mini and Full books share chapters 01-08 + 14. Full adds 09-13.

---

## Chapter index

| # | Chapter | Mini | Full |
|---|---|:---:|:---:|
| 00 | Cover page | ✓ | ✓ |
| TOC | Table of contents | ✓ | ✓ |
| 01 | Brand Foundations | ✓ | ✓ |
| 02 | Audience & Positioning | ✓ | ✓ |
| 03 | Verbal Identity (voice, tagline, vocabulary) | ✓ | ✓ |
| 04 | Logo System | ✓ | ✓ |
| 05 | Color Palette | ✓ | ✓ |
| 06 | Typography | ✓ | ✓ |
| 07 | Visual Language (icons, patterns, shapes) | ✓ | ✓ |
| 08 | Do's & Don'ts + Tips | ✓ | ✓ |
| 09 | Strategy & Positioning Depth | — | ✓ |
| 10 | Channel Examples — Meta / IG / TikTok | (1 channel) | (3 channels) |
| 11 | WhatsApp Pack + Bot Scripts | — | ✓ |
| 12 | Ad Copy Templates + CTA Library | — | ✓ |
| 13 | Motion Principles + Applications | — | ✓ |
| 14 | AI Ingestion — brand-context.json | ✓ | ✓ |
| 15 | Credits — Simple Solutions footer | ✓ | ✓ |

---

## Chapter-by-chapter contents

### 00 — Cover

- Client logo (large, centered)
- Brand name (display font, large)
- Subtitle: "[Brand Name] — Brand Guide" (bilingual if relevant)
- Version stamp: `v1.0 — [Month Year]`
- Background: hero-treatment that reflects the brand's chosen color/personality (NOT a copy of Simple Solution's navy-purple gradient)

### TOC — Table of Contents

Auto-generated from chapter list. Indicate chapter number + page number.

### 01 — Brand Foundations

- **Brand Story** — the founder narrative, 1-2 paragraphs
- **Mission** — single sentence, why we exist
- **Vision** — where we're going
- **Values** — 3-5 values, each with a short clarifying sentence
- **Brand Promise** — the one-liner

**AI block:** `<brand:foundations>` — Mission/Vision/Values as plain text fields.

### 02 — Audience & Positioning

- **Primary Persona** — demographics + psychographics card
- **Secondary Persona** (if relevant)
- **Top 3 Pains**
- **Top 3 Desires**
- **Competitor Map** — 3 competitors + 1 sentence on how we differ from each
- **Unique Selling Proposition** — final positioning sentence

**AI block:** `<brand:audience>` — persona snapshot + USP.

### 03 — Verbal Identity

- **Tagline** — primary + 2 alternates (Hebrew + English when bilingual)
- **Tone of Voice** — 3 traits with a short example sentence for each (e.g. "Warm but professional → 'נשמח לעזור, רק תגיד מה אתה צריך'")
- **Vocabulary** — preferred words / banned words / never-say list
- **Sample Sentences** — 5 model sentences showing voice in action
- **Bilingual Notes** — if HE+EN, how the voice translates between languages

**AI block:** `<brand:voice>` — voice + vocabulary + sample sentences.

### 04 — Logo System

- **Primary Logo** — full version, with clear-space rules
- **Logo Mark** — icon-only
- **Wordmark** — text-only
- **Acceptable Variations** — dark / light / monochrome / inverse
- **Clear Space** — using x-height as the unit
- **Minimum Size** — 16px digital, 10mm print
- **Logo Don'ts** — visual gallery of 4-6 common misuses

**AI block:** `<brand:logo>` — file paths + usage rules.

### 05 — Color Palette

- **Primary Colors** (1-2) — HEX, RGB, name, semantic meaning
- **Secondary Colors** (2-3) — HEX, RGB, name, when-to-use
- **Neutrals** — 3-5 grays from off-white to near-black
- **Accent / Functional** — success / warning / error / info colors
- **Usage Ratios** — 60/30/10 rule mapped to the actual palette
- **WCAG AA Pairings Table** — which color goes on which background safely

**AI block:** `<brand:colors>` — all HEX values + usage rules + accessible pairings.

### 06 — Typography

- **Display Font** — for headlines (Hebrew + Latin version)
- **Body Font** — for paragraphs (Hebrew + Latin version)
- **Type Scale** — H1 → H6 + body + caption + UI sizes
- **Line Heights** — display 1.1, body 1.6+
- **Font Weights Used** — only specify what's licensed
- **License Notes** — Google Fonts free / FontBit licensed / paid commercial

**AI block:** `<brand:typography>` — font names + scale + weights.

### 07 — Visual Language

- **Iconography Style** — line / filled / 2-tone, stroke width, corner radius
- **Shape Language** — rounded / square / organic / geometric — picked to match personality (cosmetics = rounded; finance = square)
- **Patterns / Textures** (if used)
- **Photography Style** — natural light / studio / candid / editorial; subjects; what to avoid
- **Illustration Style** (if used) — line work / flat / 3D / hand-drawn

**AI block:** `<brand:visual-language>` — shape + iconography + photo direction (usable as Midjourney/Nano Banana prompt prefix).

### 08 — Do's & Don'ts + Pro Tips

- **Do** (left column, green) — 6-8 practical rules with check icons
- **Don't** (right column, red) — 6-8 anti-patterns with X icons
- **Pro Tips** (full-width below) — 3-5 of *MY* (Claude's) field-tested tips the client should know — derived from the agency's own marketing playbook, not generic advice

**AI block:** `<brand:rules>` — do/don't as bullet lists.

---

## FULL-only chapters (09-13)

### 09 — Strategy & Positioning Depth

- **Market Map** — visual positioning vs. 3 competitors (X-axis: cheap↔premium, Y-axis: traditional↔innovative)
- **SWOT** — strengths / weaknesses / opportunities / threats
- **Strategic Choices** — what we say YES to, what we say NO to
- **Brand Manifesto** — 1-page emotional declaration

**AI block:** `<brand:strategy>`

### 10 — Channel Examples

For Mini: 1 channel (whichever is most important to the client).
For Full: all 3 below.

Each channel includes:
- **Feed Post Example** (1080×1080) — mock design with brand fonts + colors + copy
- **Story Example** (1080×1920) — same brand DNA, story-format
- **Caption Template** — formula + hashtag bank

#### 10.A — Meta (Facebook + Instagram feed)
#### 10.B — Instagram Stories + Reels
#### 10.C — TikTok

**AI block:** `<brand:channels>` — per channel: dimensions, hook templates, hashtag bank.

### 11 — WhatsApp Pack + Bot Scripts

- **Greeting templates** — first contact, returning customer, after purchase, after-hours
- **Status updates** — what good status content looks like for this brand
- **Bot script library** — opening menu, FAQ tree, hand-off-to-human triggers
- **WhatsApp Business profile copy** — about section, business description, away message

**AI block:** `<brand:whatsapp>`

### 12 — Ad Copy Templates + CTA Library

- **Hook formulas** — 5-7 proven hook patterns rewritten for this brand's voice
- **Headline bank** — 10 reusable headlines
- **CTA library** — 15+ CTA variations sorted by funnel stage (TOFU / MOFU / BOFU)
- **Ad copy template** — Meta single-image, Meta carousel, TikTok video script

**AI block:** `<brand:ctas>` — CTA variations + hook formulas.

### 13 — Motion Principles + Applications

- **Animation philosophy** — fast/slow, snappy/smooth, energetic/calm
- **Easing curves** — recommended Framer Motion presets
- **Standard durations** — micro-interaction 150ms, page 400ms, hero 800ms
- **Applications gallery** — business card, email signature, presentation cover, social profile setup, favicon, app icon

**AI block:** `<brand:motion>` + `<brand:applications>`

---

## Final mandatory chapters (every book)

### 14 — AI Ingestion: brand-context.json

Single consolidated JSON containing every `<brand:...>` block as structured fields. Format defined in `AI-INGESTION-FORMAT.md`.

This is the "AI feed" — when the client uploads the brand book to Claude/GPT and asks for content, the AI reads this chapter first.

### 15 — Credits Footer

Simple Solutions credit, defined in `CREDITS-FOOTER.html`. Small, last page, always present.

---

## What this skeleton is NOT

- ❌ Not an HTML template — design is per-client
- ❌ Not a fixed page-count — Mini and Full vary
- ❌ Not a CSS spec — `brand-visual-system-designer` makes those decisions
- ❌ Not a writing template — `brand-verbal-identity-architect` produces the voice
