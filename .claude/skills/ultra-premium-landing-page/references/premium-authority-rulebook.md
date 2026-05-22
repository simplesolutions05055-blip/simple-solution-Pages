# Premium Authority Rulebook

The agency's house rulebook for Personal Brand Authority + Cinematic Premium + High Conversion landing pages. Set by Gili after the Alex Gorbachov reference (alexgorbachov.co.il/newpage/) was approved as the gold standard.

This file is a **CONSTANT** per `start-from-zero-principle.md`. The rules here apply to every project regardless of brand, palette, or industry. Only the values that get filled into the rules (colors, fonts, copy) come from the client's brand book or discovery.

All sub-agents must read this rulebook before doing their work.

---

## 1 — Core design philosophy

**The page's goal is not "to display information".** The goal is to make the visitor feel they have entered the world of a strong brand.

Every page must feel: large · confident · rich · cinematic · clean · breathing · in complete visual control.

If a section feels "informational" rather than "cinematic" — restart that section.

---

## 2 — Visual hierarchy

**Iron rule:** The eye must know what to read in under 1 second.

Per screen (above-fold OR per major section):
- ONE hero element only
- ONE message only
- ONE CTA only

**Forbidden:**
- 4 buttons in a section
- 8 colors visible at once
- 12 type sizes on one page
- 3 different design styles mixed

---

## 3 — Typography system

### Font count per page

**Maximum 2 fonts**, OR a single font with multiple weights. Never more.

### Approved Hebrew pairings (pick ONE per project)

The blender picks one combination based on the brand book. If no brand book, picks based on brand mood from discovery. Never pick a combination outside these.

**OPTION A — Premium Clean**
- Headlines: `Heebo` ExtraBold (800)
- Body: `Heebo` Regular (400)

**OPTION B — Cinematic Authority**
- Headlines: `Rubik` Black (900)
- Body: `Assistant` Regular (400)

**OPTION C — High-End Modern**
- Headlines: `Ploni UltraBold` OR `Simpler` Black
- Body: `Simpler` Regular (400)

### Forbidden combinations

- `Alef` + `Rubik`
- `Assistant` + `Open Sans`
- More than one "rounded" font
- Childish display fonts (Comic Sans, Vag Rounded, etc.)
- Hairline / thin display weights (< 400)

### Forbidden specific fonts (added per real failures)

- **`Frank Ruhl Libre`** — BANNED. Identified in the Amir Sudai project as producing italic-handwriting Hebrew letterforms that read as cursive/script and break the "authority" feel. Never use in any project. (Banned May 2026.)
- Any **script / handwriting / brush** Hebrew font for body or quote copy. Allowed only in logo work (and even there, only if the brand book explicitly specifies one).
- **`David` italic** — same handwriting drift as Frank Ruhl Libre. Banned.

### Font weight rules

- Hero headlines: **800–900**
- Section headlines (h2/h3): **600–700**
- Body: **400–500**
- Never use weight `300` or lower in Hebrew body — it looks weak on mobile screens.

### Letter spacing (tracking)

- Headlines: **-1% to -3%** (tight, condensed)
- Body: **0% to 1%** (neutral or barely positive)

In CSS: `letter-spacing: -0.02em;` for headlines, `letter-spacing: 0;` for body.

### Line height

- Hero h1: **0.9 to 1.05** (very tight, lets oversized type breathe vertically)
- Section h2: **1.1 to 1.2**
- Body: **1.5 to 1.8** (Hebrew demands the upper end — see `hebrew-rtl-checklist.md` § 5)

---

## 4 — Layout architecture (the cinematic flow)

The page is built **as a film, not as a website**. Each section is a "scene" with one job. Scenes connect with deliberate transitions (whitespace, color shift, motion).

### Section 1 — HERO
Capture emotion and authority in 3 seconds.
- Oversized headline
- Short sub-headline
- One CTA
- Dominant visual (photography, video, or signature graphic)

### Section 2 — AUTHORITY
Proof of power.
- Client logos / press features / named credentials
- Real numbers (revenue, exits, clients served)
- Achievements with specifics
- Media appearances
- Community / following size

### Section 3 — STORY
The personal story.
- NOT a resumé
- Creates identification
- Shows pain
- Shows transformation
- Positions the person as a leader

### Section 4 — OFFER STACK
Services presentation.
- Each service = large Card
- Strong headline per Card
- Short description
- 3–4 bullets max
- Clear CTA per Card

### Section 5 — SOCIAL PROOF
- Testimonials
- Video testimonials
- Screenshots of results
- Numbers
- Logos

### Section 6 — FINAL CTA
Aggressive closing.
- One screen
- One message
- One CTA
- Echoes the hero promise

**Variation rule:** The 6-section cinematic flow is the DEFAULT for personal-brand authority LPs (`sales-high-ticket-service` type especially). For other LP types from `lp-type-decision-matrix.md`, adapt the flow keeping the cinematic principle — but always 6 scenes max for authority pages.

---

## 5 — Spacing system

This is where premium pages fall apart. Treat spacing as a first-class design decision, not afterthought.

### Section vertical spacing

- Desktop: **120–220 px** between sections
- Mobile: **80–120 px** between sections

### Card padding

- Desktop: **40–64 px** interior
- Mobile: **24–32 px** interior

### Gap rules

- Headline → text: **16–24 px**
- Text → button: **24–40 px**
- Card → card: **24–48 px**

### Whitespace rule

**Do not fear empty space. Empty = luxury.**

If a section feels crowded — remove elements, don't shrink padding.

---

## 6 — Content positioning

### Text width rule

Text never stretches the full container width. Cap it.

- Hero copy: **600–900 px** max
- Body copy: **500–700 px** max

Wider text = harder to read = looks like a Word doc, not a brand site.

### Alignment (RTL authority pages)

- **90% right-aligned** for body text (start-aligned in logical-property terms)
- **Center** is allowed ONLY for: Hero headlines, CTAs, Pull quotes
- Never mix center + start in the same section

---

## 7 — Color system

### 90% of the page must be neutral

Color distribution:
- **70%** dark / neutral (background, text, surfaces)
- **20%** secondary tone (sub-surfaces, dividers, muted text)
- **10%** accent (CTA, highlights, stats, active elements)

The 10% accent is the brand color from the brand book. NEVER use it as the dominant color.

### Accent usage — allowed only on

- CTAs
- Single-word highlights in headlines
- Stat numbers
- Active states (form focus, hover indicators)

### Forbidden

- Gradient overload (more than 1 gradient surface per page)
- Neon used everywhere (limit to 1 element if used at all)
- 7+ colors visible at once
- Colored body text (body is always the ink color)

---

## 8 — Button system

CTAs must feel **heavy, clear, confident**.

### Button dimensions

- Height: **52–64 px**
- Padding: **16 × 32 px** minimum (vertical × horizontal)
- Border-radius: **12–18 px**
- Font weight: **600–700**

### Forbidden

- Buttons under 48 px tall
- Weak outline-only CTAs as primary action
- Childish animations (rotate, bounce, jiggle)
- Ghost buttons as the primary CTA

### CTA hover

- Subtle: scale 1.02 OR background opacity shift OR slight shadow increase
- Never bounce, never rotate, never pulse

---

## 9 — Animation system

Animations must be **slow, soft, cinematic**.

### Timing

- Range: **300–800 ms**
- Hero entrance: 600–800 ms
- Section reveals: 400–600 ms
- Hover transitions: 200–300 ms

### Approved patterns

- Fade
- Blur reveal (filter: blur(8px) → blur(0))
- Soft parallax (max 0.3x scroll speed)
- Slow hover
- Scale 1.02–1.05 on hover

### Forbidden

- Bounce easing
- Crazy / chaotic motion
- Fast (<200ms) entrance transitions
- Floating elements that drift continuously
- Anything that competes with the message

---

## 10 — Image direction

### Required image qualities

- Real (not generated, not stock without major treatment)
- High contrast
- Cinematic lighting
- Shallow depth of field
- Premium photography aesthetics

### Forbidden

- Cheap stock photography
- Generic "people-pointing-at-laptop" shots
- Fake smiles, hands shaking over desk
- Boring white-background corporate portraits
- Generated AI photos with the AI-face fingerprint

If real photography isn't available, USE DESIGN INSTEAD (typography-led, abstract SVG, custom illustration). Bad photos hurt more than no photos.

---

## 11 — Grid system

### Desktop

- 12-column grid
- Content max width: **1200–1440 px**

### Mobile

- 4-column grid
- All elements must be:
  - Larger than desktop equivalents (touch targets ≥48px)
  - Clearer (more contrast, less density)
  - Less crowded (fewer items per row)

---

## 12 — Mobile UX

**Mobile-first.** The page must feel perfect at 390 px width before scaling up.

### Mobile hero

- Less text than desktop hero
- Short headlines (≤8 words)
- CTA visible above the fold
- Strong single visual element

### Mobile text rules

- No more than **3 lines per continuous block**
- No more than **18–22 words per paragraph**
- Break long sentences into multiple paragraphs

---

## 13 — Content writing structure (HOOK → TENSION → AUTHORITY → TRANSFORMATION → CTA)

Every persuasive section follows this 5-beat structure:

1. **HOOK** — Strong opening line / headline that captures attention
2. **TENSION** — The problem / pain / status quo that doesn't work
3. **AUTHORITY** — Why listen to YOU specifically (credentials, proof, point of view)
4. **TRANSFORMATION** — What changes when they engage with you
5. **CTA** — The specific next action

The `lp-copy-architect` agent uses this structure for every persuasive section. Not every section needs all 5 (an AUTHORITY section may be 100% step 3) — but the page as a whole walks through them in order.

---

## 14 — Emphasis system

### When to emphasize

Only when one of these is true:
- Critical data point
- Emotional pivot
- Pain articulation
- Result / outcome
- Specific number
- Key positioning phrase

### How to emphasize

Maximum tools allowed:
- **Bold**
- Soft underline (1px, accent color, 4px offset)
- Accent color on a single word
- Background-blur badge behind a phrase

### Forbidden

- 8+ emphases in one paragraph
- ALL CAPS for emphasis
- Aggressive red highlight
- Excessive glow / outer-shadow on text

**Max 1–2 emphases per paragraph.** Anything more dilutes them all.

---

## 15 — Card design rules

### Card style

- Background separation (surface color distinct from page background)
- Optional backdrop-filter: blur (for elevated overlay cards)
- Soft border (1px at 8–12% opacity)
- Large radius: 16–24 px
- Minimal shadow (`0 4px 24px rgba(0,0,0,0.04)` — never harder)

### Card hover

- `translateY(-4px)`
- `scale(1.01)`
- Shadow increase soft (to `0 12px 32px rgba(0,0,0,0.08)`)
- Duration: 300 ms ease-out

Never harder hover effects than this for cards.

---

## 16 — Cinematic atmosphere

This is the difference between "a website" and "a brand".

### Allowed atmospheric tools

- **Grain** — paper texture at 2–4% opacity overlaid on hero / dark sections
- **Vignette** — radial gradient darkening at section edges (use sparingly, hero only)
- **Gradient washes** — large soft gradients in section backgrounds (NOT on text)
- **Blur lights** — colored blurs as background depth (1–2 per page max, ≤200px each)
- **Depth layers** — z-stacked elements with subtle parallax differentials
- **Ambient glow** — radial color glow around hero focal point

### Forbidden

- Flat sterile white "corporate" feel (no atmosphere = no brand)
- Stacking ALL atmospheric tools (pick 2–3 max per page)
- Atmosphere applied to text (text stays clean — atmosphere is background)

---

## 17 — Final UX principle

Every screen must answer:

> **"What do I want the user to FEEL here?"**

NOT:
> "What information do I want to display here?"

This single shift is what separates senior designer work from AI work.

---

## 18 — Performance rules

- Lazy load all below-fold imagery
- Optimize all images (AVIF + WebP, sized appropriately, ≤280KB hero)
- Compressed video (≤600KB, AV1 or VP9)
- Preload display font with `display: 'swap'`
- Minimal JS — defer all third-party

### Lighthouse targets

- Desktop: **90+** across the board
- Mobile: **80+ minimum** across the board

(The skill's overall standard from `self-uniqueness-audit.md` is ≥95 mobile — this rulebook's 80+ is the absolute floor. Aim higher.)

---

## 19 — Pre-delivery quality control checklist

Before GATE 4, ask:

- [ ] Is there too much text?
- [ ] Are there too many colors?
- [ ] Are there too many elements?
- [ ] Does the eye know what to read first?
- [ ] Is there enough breathing room?
- [ ] Does it feel like a brand or a template?
- [ ] Does the mobile version look premium?
- [ ] Is there enough contrast?
- [ ] Are the CTAs clear?
- [ ] Is the CTA noticeable?
- [ ] Is there cinematic flow between sections?

Any "no" → restart the relevant section.

---

## 20 — Golden rule

The page should not feel "designed".

It should feel **as if it was built for a person of real authority.**

---

## Enforcement summary

The agents enforce this rulebook as follows:

| Agent | What it enforces |
|---|---|
| `lp-design-dna-blender` | Typography pairing from § 3 approved list. Color distribution per § 7. Cinematic atmosphere selection per § 16. Banned font check (Frank Ruhl Libre, etc.). |
| `lp-copy-architect` | Writing structure per § 13. Emphasis rules per § 14. Mobile text length per § 12. |
| `lp-section-architect` | Cinematic flow per § 4. Spacing system per § 5. Content widths per § 6. |
| `lp-builder-compiler` | Button dimensions per § 8. Animation timing per § 9. Grid per § 11. Performance per § 18. Quality control per § 19. |

The pre-GATE-4 audit (`senior-designer-vs-ai-tells.md`) is extended with checks from this rulebook — any violation routes back to the responsible agent.
