# Senior Designer vs AI Tells

Diagnostic document. The `lp-builder-compiler` MUST run this audit before GATE 4 and re-route to the relevant agent if any FAIL.

Built from real diagnoses of failed LPs (the Amir Sudai project, May 2026) — the page was technically clean but visually screamed AI. This file codifies what made it scream.

---

## Part 1 — The 10 AI-luxury fingerprints (catch yourself first)

### 1. Navy + Gold + shimmer text gradient
**The tell:** `#14253D` navy + `#C9A858` gold + `background: linear-gradient(...gold...gold...gold...); -webkit-background-clip: text;` on numbers/headlines.
**Why it's AI:** Every financial advisor / accountant / business coach LP in Israel since 2022 uses this exact combo. Templates and AI both default here.
**Senior move:** Pick ONE bold accent (oxblood, electric chartreuse, deep teal, hospital green, coral) on a quiet ground (cream, bone, charcoal, paper). Skip the metallic gradient on text entirely.

### 2. Every section follows the same scaffold
**The tell:** `eyebrow → h2-with-italic-span → lede → grid of 3 cards`. Repeat 8 times.
**Why it's AI:** Models trained on landing-page templates default to this rhythm. When the structure is identical section-to-section, the page reads as templated even if each section is "different".
**Senior move:** Vary structure per section. One section = a full-bleed editorial spread. Next = narrow text column in the middle. Next = asymmetric image + pull-quote. Next = a manifesto in 22vw type. The PAGE has rhythm; sections don't.

### 3. `reveal delay-1/2/3` cascades on every section
**The tell:** `class="reveal delay-1"`, `class="reveal delay-2"`, `class="reveal delay-3"` — items fading in stacked, same timing.
**Why it's AI:** The cascade is template default. When EVERY section has it, the page feels mechanical.
**Senior move:** MAX 3 cascading reveals in the entire page. Pick the 3 most important moments. Everything else is static OR uses ONE distinctive motion (a sticky scroll progression, a parallax image, a magnetic CTA).

### 4. Decoration "to look designed" — halftones, hairlines, corner ornaments
**The tell:** `.halftone.tl`, `.halftone.tr`, `.halftone.bl`, `.halftone.br` — pattern decorations sprinkled in corners. `<div class="hairline">` dividers between paragraphs.
**Why it's AI:** Models add decoration to fill space when the actual design language is thin. Real designers either commit fully (texture covers a whole section) or skip it.
**Senior move:** If you need depth → add ONE real background element (a SVG outline of an industry-specific shape, a subtle paper grain, a topographic line pattern). If you don't need depth → leave it empty. No decorative sprinkles.

### 5. Stats row with shimmer numbers
**The tell:** 4-column grid of huge gold-gradient numbers with uppercase labels: `"127 שנים", "5,400 לקוחות", "98% המלצה"`.
**Why it's AI:** Default "build credibility" pattern. Every B2B template ships with this.
**Senior move:** Cite ONE specific real number woven into prose: `"שירלי הגדילה את שולי הרווח שלה מ-12% ל-31% תוך 7 חודשים."` — narrative > grid.

### 6. Persona cards with circle-letters (ר, ש, י)
**The tell:** 3 columns, each with a circular Hebrew letter, name, "PERSONA 01" label, pain block, need block.
**Why it's AI:** Designer template move applied mechanically. Cute once, gimmicky when scaled.
**Senior move:** Either real names + real photos + real quotes, OR a single editorial story about ONE archetype client written in prose.

### 7. Inline `style="color: var(--...)"` patched into JSX
**The tell:** Clean component structure, then sprinkled `style="color: var(--as-gold);"` overrides on individual `<em>` and `<h2>` tags.
**Why it's AI:** Sign that the model "added decoration after" the clean structure was generated. Real designers commit to the design system from the start — all overrides live in CSS, not inline.
**Senior move:** ALL styling via classes that reference design tokens. Zero inline `style=` attributes. If you need a one-off treatment, add a modifier class to the stylesheet.

### 8. Em-dashes (—) everywhere in Hebrew body copy
**The tell:** Multiple em-dashes per paragraph: `"לא רק יועץ — לא רק מאמן — אסטרטג"`, `"כסף הוא רק ההשתקפות — הבעיה האמיתית — חוסר בהירות"`.
**Why it's AI:** The em-dash is the #1 AI Hebrew copywriting fingerprint. Models love rhythmic em-dash phrasing because it sounds dramatic. Real Hebrew copywriters use periods, line breaks, or commas for the same effect.
**Senior move:** **BAN em-dash in body copy entirely.** Allow only in display headlines (h1/h2) as a deliberate typographic device, max once per page. See `lp-copy-architect.md` rules.

### 9. "Brand initials with bullet" — A·S, S·P, M·R
**The tell:** Brand name shortened to initials with a bullet separator: `"A·S — מומחה לצמיחה"`.
**Why it's AI:** Premium-template move that AI applies to every brand whether or not it suits them.
**Senior move:** Use the brand's real name in full, or design a real wordmark/monogram that lives in the logo — not in the body copy.

### 10. Ticker/marquee with data labels and arrows ▲▼
**The tell:** Horizontal scrolling marquee: `"CLARITY ▲ מתחיל בעצירה · PAIN ▼ רווח על נייר · MOVEMENT ▲ צעדים עקביים"`.
**Why it's AI:** Designer template attempting to "look like a Bloomberg terminal" or financial ticker. Doesn't fit most contexts.
**Senior move:** If you want a marquee — use it as PURE typography (a manifesto sentence scrolling) without data labels or arrows. Or skip it entirely.

---

## Part 2 — The 5 senior-master moves that AI rarely makes

### 1. Real asymmetry — broken grid, not 3-column grid
A senior designer mixes section widths: a 5/12 text column followed by a 12/12 full-bleed image followed by a 7/12 + 5/12 split. AI defaults to symmetric grids.

**Implementation:** Mandatory — at least 2 sections per page must break the standard grid. See `signature-moments-library.md` for asymmetric layout patterns.

### 2. Background depth via industry-specific watermarks
Senior designers add **a single background element that signals the industry** — for a lawyer, a faint legal seal or court column outline; for a clinic, an anatomical line drawing; for a tech founder, isometric circuit lines. Subtle (5-8% opacity), large (covers 30-60% of section), single layer.

**Implementation:** Mandatory — every page must have at least ONE background depth element keyed to the business field. NEVER halftone/dot-pattern (those are AI tells). See `signature-moments-library.md` § "Background depth patterns".

### 3. ONE signature WOW moment — not 10 micro-animations
A senior page has ONE memorable interaction: a custom cursor with brand microcopy, a GSAP split-text reveal on the hero, a magnetic CTA button, a video full-bleed mask, a scroll-pinned 3-state story. Everything else is quiet.

**Implementation:** Mandatory — `lp-design-dna-blender` picks EXACTLY ONE signature moment per page. Limit enforced.

### 4. Headline effects on display type
Hero h1 and major section h2s are NEVER static plain text. Senior designers apply at least one effect:
- Split-text scroll (each character animates in)
- Mask reveal (text wipes in via clip-path)
- Kinetic word swap (one word in the headline rotates through synonyms)
- Stroke-to-fill on scroll-into-view
- Gradient that shifts as you scroll past
- Mix of fonts within one headline (display word + body word)
- Letter-spacing animation (tight → loose on hover)

**Implementation:** Mandatory — every h1 and at least 2 h2s on the page must have a typographic effect from `signature-moments-library.md` § "Headline effects".

### 5. Restraint in copy — no rhythmic em-dash phrasing
Real Hebrew copy uses period rhythm, not em-dash rhythm. "כסף הוא ההשתקפות. הבעיה האמיתית: חוסר בהירות." beats "כסף הוא ההשתקפות — הבעיה האמיתית — חוסר בהירות." every time.

**Implementation:** `lp-copy-architect` ban on em-dash in body copy. Compiler greps and rejects.

---

## Part 3 — The audit checklist (compiler runs before GATE 4)

### Fingerprint check — ALL must be FALSE
- [ ] Navy `#14253D`-ish + gold `#C9A858`-ish + shimmer gradient text together? → FAIL
- [ ] More than 3 sections use the same `eyebrow → h2 → lede → grid` scaffold? → FAIL
- [ ] More than 3 cascading-reveal animations in the page? → FAIL
- [ ] Any `.halftone.*`, `.dot-pattern`, `.corner-ornament` decorations? → FAIL
- [ ] Stats row with shimmer numbers + uppercase labels? → FAIL
- [ ] Persona cards with circle-letter avatars? → FAIL
- [ ] Any inline `style="..."` attributes in JSX? → FAIL
- [ ] Any em-dash (`—`) in body copy (excluding h1/h2)? → FAIL
- [ ] Brand initials with bullet (`A·S`-style) in body copy? → FAIL
- [ ] Ticker/marquee with data labels + arrows? → FAIL

### Senior moves check — ALL must be TRUE
- [ ] At least 2 sections break the symmetric grid (asymmetric layout)? → required
- [ ] At least ONE background-depth element keyed to industry? → required
- [ ] Exactly ONE signature WOW moment from the library? → required
- [ ] H1 has a typographic effect (not plain text)? → required
- [ ] At least 2 H2s have typographic effects? → required
- [ ] Body copy uses period rhythm, em-dash count is 0 in body? → required

If any FAIL on fingerprint check → route to relevant agent for rework.
If any FAIL on senior moves check → route to `lp-design-dna-blender` or `lp-builder-compiler` for additions.

Only when ALL fingerprints are FALSE and ALL senior moves are TRUE → GATE 4 opens.

---

## Part 4 — The mental test

Before GATE 4, the compiler agent must answer this in writing:

> "If I showed this page to a senior Tel Aviv boutique designer (e.g., someone from s-pixel.co.il or bluebee.co.il), what would they immediately say is template-y or AI-generated?"

If the answer is "nothing" — proceed. If the answer names ANY element — fix it first.
