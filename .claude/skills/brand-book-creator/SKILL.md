---
name: brand-book-creator
description: Create complete, professional brand books for businesses — logo system, color palette, typography, voice & tone, photography style, applications. Used by a marketing agency to produce brand guidelines that drive consistent landing pages, websites, and ads for clients. Trigger phrases include "create a brand book", "build a brand identity", "תיצור ספר מותג", "ספר מותג", "מיתוג", "בניית מותג", "brand guidelines", "brand identity system", "מדריך מותג".
---

# Brand Book Creator

Produce a complete, professional brand book for a business client. The output becomes the input for `premium-landing-page`, `premium-website`, and `marketing-copywriting` so everything the agency ships for the client stays on-brand.

## When to use

Trigger phrases:
- "create a brand book / brand guidelines / brand identity system"
- "ספר מותג", "מדריך מותג", "מיתוג עסק", "בניית מותג", "זהות מותגית", "תיצור לי ספר מותג"

**Use this BEFORE:** building a website, landing page, or ad campaign for a new client, when they don't yet have a brand book.

## Inputs to gather (discovery brief)

### About the business
1. Business name (legal + brand name if different)
2. Industry / sub-niche
3. Founder story (1–2 paragraphs)
4. Mission (why we exist)
5. Vision (where we're going)
6. Values (3–5)

### Market positioning
7. Target audience (1–3 personas: demographics, psychographics, pains, desires)
8. Top 3 competitors and how this brand is different
9. Unique selling proposition (the one-liner)
10. Brand archetype (Sage / Hero / Lover / Outlaw / etc. — Jungian 12)

### Personality
11. If the brand were a person, describe them in 5 adjectives
12. Brands the client admires (and why)
13. Brands the client wants to NOT be like

### Practical
14. Existing assets (logo, colors, fonts — even if rough)
15. Languages (Hebrew, English, both)
16. Budget tier (this affects font licensing and stock photo budget)

## Brand book contents (deliverable structure)

```
01_BRAND_FOUNDATIONS
   - Mission, Vision, Values
   - Brand story
   - Positioning statement
   - Audience personas

02_VERBAL_IDENTITY
   - Brand name usage
   - Tagline + alternates
   - Tone of voice (3 attributes with do/don't examples)
   - Vocabulary (preferred words, banned words)
   - Bilingual notes (Hebrew/English style)
   - Sample sentences

03_LOGO_SYSTEM
   - Primary logo
   - Secondary marks (icon-only, wordmark)
   - Clear space rules (use the x-height as the unit)
   - Minimum size
   - Acceptable backgrounds
   - Logo don'ts (with examples)
   - File formats: SVG (primary), PNG @1x/@2x/@3x, PDF for print

04_COLOR_PALETTE
   - Primary color (with HEX, RGB, CMYK, Pantone)
   - Secondary colors (2–3)
   - Neutrals (light + dark + 5 grays)
   - Accent / alert colors
   - Usage ratios (60/30/10 rule)
   - Accessible pairings (AA contrast table)

05_TYPOGRAPHY
   - Display font (headings) — include Hebrew variant
   - Body font — include Hebrew variant
   - Type scale (8 steps from xs to display)
   - Line heights & tracking
   - Web fallbacks
   - Hierarchy examples (H1/H2/H3/body/caption)
   - License source (Google Fonts / Adobe / paid)

06_IMAGERY_AND_ICONS
   - Photography style (color treatment, subject, composition)
   - Mood board: 6–9 example images
   - Stock photo guidelines
   - Custom photography guidelines
   - Icon system (line / filled / weight / corner radius)
   - Illustration style (if applicable)

07_GRAPHIC_ELEMENTS
   - Patterns, textures, shapes
   - Border radius standard
   - Shadow / elevation system
   - Motion principles (duration, easing)

08_APPLICATIONS (mockups)
   - Business card
   - Letterhead / invoice
   - Email signature
   - Social media profile + post templates (Instagram, LinkedIn, Facebook)
   - Story / Reel templates
   - Ad creative templates (3 sizes)
   - Website hero example
   - Landing page hero example
   - PowerPoint / Keynote template

09_BRAND_GUARDRAILS
   - Do's and don'ts gallery
   - Co-branding rules
   - Naming conventions for files / posts
   - Approval workflow

10_ASSETS_LIBRARY
   - Folder structure delivered
   - File naming convention
   - Where to find what (master Drive/Dropbox link)
```

## Workflow

### 1. Run discovery
Send the client a single message with all input questions. Don't move on until answered.

### 2. Strategy first (no visuals yet)
Produce sections 01–02 in a doc. Get client sign-off. **Visuals built on weak strategy waste money.**

### 3. Mood board
Curate 9 reference images aligned to the agreed personality. Get sign-off.

### 4. Logo concepts
Present 3 distinct directions (not 3 versions of the same idea). Pick one with the client, then refine.

### 5. Color + typography
Pair them on a sample composition (a headline + body block + button) so the client sees them in context, not as swatches.

### 6. Build the full book
Compile sections 03–10. Render as a Figma/PDF book + working assets folder.

### 7. Deliver as a kit
Final deliverable structure:
```
ClientName_BrandBook/
├── 01_BrandBook.pdf
├── 02_Logos/
│   ├── primary.svg / .png / .pdf
│   ├── icon.svg / .png
│   └── wordmark.svg / .png
├── 03_Colors/
│   └── palette.ase (Adobe swatch) + colors.json
├── 04_Fonts/
│   └── (license files + .woff2 for web)
├── 05_Templates/
│   ├── social/
│   ├── presentations/
│   └── stationery/
└── 06_Working_Files/
    └── BrandBook.fig (or .ai)
```

### 8. Output design tokens for code
Auto-generate a `tokens.json` and `tailwind.config.js` snippet so `premium-website` / `premium-landing-page` can plug them straight in.

```js
// tailwind.config.js excerpt
theme: {
  colors: {
    brand: { DEFAULT: '#...', light: '#...', dark: '#...' },
    accent: '#...',
    // ...
  },
  fontFamily: {
    display: ['Display Font', 'sans-serif'],
    body: ['Body Font', 'sans-serif'],
  },
  borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
}
```

## Quality bar

A professional brand book:
- [ ] Strategy precedes visuals — Mission/Vision/Audience signed off before logo design
- [ ] Logo works at 16px and 16ft (favicon to billboard)
- [ ] Color palette passes WCAG AA on all primary pairings
- [ ] Hebrew + English typography both look correct (RTL tested)
- [ ] Real application mockups (not just floating logo on white)
- [ ] Asset library is organized, named clearly, ready to hand off
- [ ] Design tokens exportable to code (Tailwind / CSS variables / Figma variables)
- [ ] PDF is editorial-quality, not a glorified PowerPoint

## Pricing context (Israeli market)

Full brand book typical: ₪6,000–₪25,000+ depending on logo design rounds, photography, and depth. Anchor effort accordingly.

## Anti-patterns

- Logo design before strategy is locked
- Showing 3 versions of the same logo and calling it "options"
- Using free Canva fonts for brands that need to feel premium
- Stock photos that scream "stock photo"
- Brand books delivered as a PDF only — no working files or tokens
- Color palettes that fail accessibility on the brand's own website
- Skipping Hebrew typography for Hebrew-speaking brands
