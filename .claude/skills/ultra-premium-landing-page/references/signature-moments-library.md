# Signature Moments Library

`lp-design-dna-blender` picks EXACTLY ONE signature WOW moment per page (Part 1). EVERY page must also include EVERY mandatory element from Parts 2-4 (asymmetric layout, background depth, headline effects).

This file is the canonical pattern source. The builder agent translates these into code; the design blender chooses which ones apply.

---

## Part 1 — The 10 signature WOW moments (pick ONE per page)

Each moment is a memorable interaction — the thing the client tells their friends about. Only ONE per page. More than one and they cancel each other out.

### 1. GSAP split-text scroll headline
The hero h1 splits into individual characters that animate in on scroll (or page-load) with staggered translateY + opacity. Each character lands like a falling card.

**When to use:** product-launch, sales-high-ticket-service, manifesto-led pages.
**Stack:** `gsap` + `SplitText` plugin (or DIY via `Array.from(text).map(...)`).
**Perf cost:** ~12kb. Worth it.
**A11y:** Wrap original text in `<span aria-label="...">` so screen readers get the full sentence.

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function SplitHeadline({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const chars = ref.current.querySelectorAll('[data-char]')
    gsap.from(chars, {
      y: '100%', opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.02,
    })
  }, [])
  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} data-char className="inline-block" aria-hidden="true">
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </h1>
  )
}
```

### 2. Magnetic cursor + magnetic CTA
Custom cursor follows the mouse with a subtle lag. When near a CTA button, the button magnetizes toward the cursor (pulls toward it within a 40px radius).

**When to use:** sales-high-ticket-service, product-launch, anything with a single strong CTA.
**Stack:** Vanilla JS or `gsap` for lerp. ~3kb.
**A11y:** Hide on touch devices (`@media (pointer: fine)`).

```tsx
// MagneticButton.tsx
'use client'
import { useRef } from 'react'

export function MagneticButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const btn = useRef<HTMLButtonElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = btn.current!.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    btn.current!.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  const onLeave = () => { btn.current!.style.transform = '' }
  return <button ref={btn} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>{children}</button>
}
```

### 3. Video full-bleed hero with text mask
A 4-8 second silent video loops full-screen behind the hero. The h1 text is cut out as a mask — through the headline letters you see the video; outside is solid background.

**When to use:** product-launch, sales-product (lifestyle), sales-high-ticket-service (with founder b-roll).
**Stack:** `<video>` + CSS `mix-blend-mode: difference` OR SVG `<mask>` with text inside.
**Perf cost:** Video must be <600kb, AV1 or VP9 codec, autoplay muted playsinline.

### 4. Scroll-pinned 3-state story section
One section sticks to the viewport as the user scrolls past it. During the pin, the section's content morphs through 3 states (text changes, images crossfade, color shifts). Uses Lenis + GSAP ScrollTrigger.

**When to use:** product-launch, sales-product (digital), sales-high-ticket-service (case study reveal).
**Stack:** `@studio-freight/lenis` + `gsap/ScrollTrigger`. ~40kb total.

### 5. Custom cursor with contextual labels
Default cursor is hidden. A custom 10px dot follows the mouse. Over CTAs the dot expands to a 60px pill containing brand microcopy (e.g., "צ׳אט עכשיו", "צפו במקרה").

**When to use:** sales-high-ticket-service, sales-product (premium), product-launch.
**Stack:** Vanilla JS + CSS. ~2kb.
**A11y:** `@media (pointer: fine)` only.

### 6. Image distortion on hover (WebGL/canvas)
Project thumbnails distort with a liquid ripple effect on hover. Uses `ogl` or `three.js` for WebGL shaders.

**When to use:** sales-high-ticket-service (case study grid), product-launch (portfolio reveal).
**Stack:** `ogl` (~20kb) or `three.js` (~110kb). Prefer `ogl`.

### 7. Sticky horizontal scroll section
Page scrolls vertically until it hits a horizontal section, then scroll translates to horizontal movement (typical for case-study reveals or process steps).

**When to use:** sales-high-ticket-service (process section), sales-product (digital, feature deep-dive).
**Stack:** `gsap/ScrollTrigger` horizontal scroll.

### 8. Kinetic word swap in headline
One word in the h1 cycles through 3-5 synonyms (`"מעצבים | בונים | מנהלים"`) using a vertical reel animation. Pace ~2s per word.

**When to use:** sales-high-ticket-service, product-launch.
**Stack:** Pure CSS animation OR Framer Motion `<AnimatePresence>`.

### 9. Stretch-text on hover
Section h2 stretches horizontally on hover (`font-stretch: 75%` → `125%`). Subtle (~150ms transition).

**When to use:** Any LP with bold display typography. Pairs well with editorial layouts.
**Stack:** Pure CSS — `font-variation-settings: 'wdth' 100;` with transition. Requires a variable font.
**A11y:** Disable for `prefers-reduced-motion: reduce`.

### 10. Marquee text as design (NOT data)
Single very long sentence scrolling horizontally as a pure typographic statement. Slow (40-60s for full loop). No data labels, no arrows, no `▲▼`.

**When to use:** Editorial brands, manifesto sections, footer accents.
**Stack:** Pure CSS `@keyframes` translateX.
**BAN:** No data labels (`CLARITY ▲`), no brand initials with bullets, no rotating stat numbers. Pure prose only.

---

## Part 2 — Asymmetric layout patterns (MANDATORY — pick 2+ per page)

The compiler enforces: AT LEAST 2 sections per page must use one of these. Symmetric 3-column grids cap at 1 per page.

### A. The 5/12 narrow-text + 7/12 image
```
| TEXT (5/12) |  IMAGE BLEED TO EDGE (7/12)  |
```
Text column starts at the inline-start. Image bleeds all the way to the inline-end edge of the viewport (breaks out of container). Used for thesis statements, founder sections.

### B. The 7/12 image + 4/12 pull-quote
```
|  IMAGE (7/12)  | PULL QUOTE in 36px serif (4/12) |
```
Pull-quote in a serif display font, italic, no quote marks. Image on the start side.

### C. The full-bleed editorial spread
```
|========== IMAGE BLEEDS FULL WIDTH ==========|
|        Centered headline (8/12 max)         |
|             Body paragraph (6/12)            |
```
One image takes the full width of the viewport, headline overlays at center, body copy in a narrow column below.

### D. The diagonal split
```
| TEXT (top-start half) |  IMAGE (bottom-end half)  |
```
A 50/50 diagonal split where text occupies the top-start triangle and image occupies the bottom-end. Achieved with CSS `clip-path: polygon(...)` or transform-based offsets.

### E. The off-center hero
Hero h1 doesn't sit centered — it lives at 10vw from inline-start, body copy at 35vw, CTA at 60vw. Creates a leftward diagonal eye-path.

### F. The vertical headline
Section h2 rotates 90deg and runs vertically down the inline-start edge of the section. Body copy occupies 60% of the width on the inline-end side.

**Implementation rule:** Use Tailwind logical classes (`grid-cols-12`, `col-start-*`, `col-end-*`) — not directional.

---

## Part 3 — Background depth elements (MANDATORY — one per page, keyed to industry)

The compiler enforces: every page MUST have ONE background depth element. NEVER halftones, NEVER corner dot-patterns (those are AI tells).

### Industry → recommended background element

| Industry | Background element | Implementation |
|---|---|---|
| Legal / law | Faint court column outline OR legal seal SVG | Inline SVG, 5-8% opacity, anchored bottom-end of hero, 40vh tall |
| Medical clinic | Anatomical line drawing (heart, brain, body outline per specialty) | Inline SVG line art, 4-6% opacity, large (covers 50vh) |
| Real estate | Topographic line pattern OR architectural blueprint grid | SVG repeating pattern, 3-5% opacity |
| Tech / SaaS | Isometric circuit lines OR network node graph | Inline SVG, 4-7% opacity, animated subtly on scroll |
| Beauty / aesthetic | Organic blob outline (NOT gradient blob — outline only) OR botanical line art | SVG, 5-8% opacity |
| Food / restaurant | Hand-drawn ingredient line illustrations | SVG line art, 6-10% opacity |
| Finance (NOT navy+gold) | Topographic contour lines OR isometric coin outline | SVG, 4-6% opacity, monochrome |
| Coaching / consulting | Constellation / connected-dots line pattern OR mountain summit outline | SVG, 5-8% opacity |
| Construction / industrial | Blueprint grid OR architectural section drawing | SVG, 4-6% opacity |
| Education / academic | Page-margin annotations OR library-card line work | SVG, 5-8% opacity |

### Implementation pattern

```tsx
// BackgroundDepth.tsx — one component, one role
export function BackgroundDepth({ variant }: { variant: 'legal' | 'medical' | 'tech' | ... }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--color-ink)]"
      style={{ opacity: 0.06 }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      {/* paths specific to the chosen variant — bespoke SVG drawn per industry */}
    </svg>
  )
}
```

**Rules:**
- ONE variant per page (not multiple stacked).
- Opacity always 3-10%. Never above 12%.
- Color: derived from `--color-ink` or `--color-brand`. Never a hardcoded color.
- Position: covers at least 30vh of one major section (hero or thesis).
- NEVER use a repeating dot pattern, halftone, or grain texture as a substitute. Those are AI tells. If you want texture → paper grain at 2% via background-image is allowed, but it's auxiliary, not the depth element.

---

## Part 4 — Headline effects (MANDATORY — every h1 + 2+ h2s)

Every h1 and at least 2 h2s per page MUST have one of these effects. Plain static headlines are banned.

### Effect catalog

#### a. Split-text reveal (most common)
See Part 1 § 1. Each character animates in from below on scroll-into-view.

#### b. Mask reveal via clip-path
Text wipes in left-to-right (or right-to-left for Hebrew) via animated `clip-path: inset(0 0 0 100%)` → `inset(0 0 0 0)`.

```css
.headline-mask {
  clip-path: inset(0 0 0 100%);
  transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.headline-mask.in-view {
  clip-path: inset(0 0 0 0);
}
```

#### c. Stroke-to-fill on scroll-into-view
Headline starts as outlined letters (`-webkit-text-stroke: 1px var(--color-ink); color: transparent;`), then fills with solid color when scrolled into view.

#### d. Gradient shift on scroll
Headline has a 2-color gradient that shifts its position as the user scrolls past (parallax-linked `background-position`).

#### e. Mixed font weights mid-headline
One headline mixes a serif display font on one word with a sans/mono on another:
```html
<h1>
  <span class="font-serif italic">בהירות</span>
  היא לא קישוט.
  <span class="font-mono uppercase">היא מצב.</span>
</h1>
```
This works particularly well for Hebrew + English mixed headlines.

#### f. Letter-spacing breath
Headline letters animate from tight (`tracking-tight`) to wide (`tracking-wider`) over 1.5s on entrance. Subtle but distinctive.

#### g. Kinetic word swap (see Part 1 § 8)
One word in the headline rotates through synonyms.

### Implementation rule

```tsx
// AnimatedHeadline.tsx — accepts variant prop
<AnimatedHeadline variant="split" text="הכותרת שלך" as="h1" className="text-display" />
<AnimatedHeadline variant="mask" text="כותרת משנית" as="h2" className="text-h2" />
```

The agent picks the variants per section — but at least one of (split, mask, stroke-to-fill, gradient-shift) must appear on the h1, and at least 2 different variants must appear among the h2s.

---

## Part 5 — Selection rules (for the design blender)

When choosing for a project:

1. **Read the brand book** (if exists). If voice is "warm, organic, human" → prefer effects from b/c/e (subtle, editorial). If voice is "bold, fast, tech" → prefer a/d/g (kinetic, sharp).
2. **Pick exactly ONE Part 1 signature moment.** Document the choice + reasoning in `DESIGN-LANGUAGE.md`.
3. **Pick 2-3 Part 2 asymmetric patterns.** Document which sections use which.
4. **Pick ONE Part 3 background depth variant** keyed to the industry. Document choice.
5. **Pick effect variants for h1 + h2s.** Document the mapping.

All choices feed `STRUCTURE.md` for the builder.
