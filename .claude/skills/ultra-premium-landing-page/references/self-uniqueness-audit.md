# Self-Uniqueness Audit

Run before GATE 4. If any item FAILS, restart the relevant section (don't ship a generic-looking page just to meet a deadline). The audit is non-negotiable for any LP priced ₪8K+.

---

## Part 1 — The swap test

- [ ] **Logo swap:** Mentally replace the logo with a direct competitor's logo. Does the page still feel right?
  - If YES → FAIL. The page is generic. Restart design DNA.
- [ ] **Copy swap:** Mentally replace ALL copy with `lorem ipsum`. Does the visual language still tell you what industry this is?
  - If NO → the visual isn't telling the story. Design is decoration, not communication. Restart.

---

## Part 2 — The fingerprint test

- [ ] Display font is NOT `Poppins`, `Inter`, `Montserrat`, or `Roboto` (the four default SaaS tells)
- [ ] Brand color is NOT default Tailwind `indigo-600`, `violet-600`, `purple-600`, or shadcn `zinc`
- [ ] Hero does NOT have a gradient blob shape (the 2020-2024 SaaS template fingerprint)
- [ ] No three-icon feature row with outline Heroicons + 5-word headline + 1-sentence body
- [ ] No fake testimonial avatars from UI Faces / RandomUser / Generated Photos — real people or no people
- [ ] No "Most Popular" elevated middle pricing card (the universal SaaS-template tell)
- [ ] No greyscale "Trusted by" logo bar with companies the client never worked with
- [ ] No stock photos of people on laptops looking at the camera
- [ ] No animated counters ("10,000+ clients") that count up on scroll

---

## Part 3 — The DNA test

- [ ] Every design decision traces back to ONE answer in `PAGE-BRIEF.md` / `DESIGN-LANGUAGE.md`
  - Can you justify the color? The font? The motion? If the answer is "I just liked it" → restart.
- [ ] The 2-3 reference brands chosen for the blend are visible in the work — but NONE of them is dominant
  - It's a blend, not a clone. Run a test: show the page to someone and ask "what does this remind you of?" — if they name ONE brand, you cloned it. If they name 2-3 → good.
- [ ] If a brand book exists (`brand-context.json`), the page's colors / fonts / voice match it exactly
  - Spot-check: hex colors in `globals.css` vs. `brand-context.json` palette
  - Font families match
  - Tone of voice samples from copy match the brand book voice traits

---

## Part 4 — The unmistakable detail test

- [ ] There is at least ONE element on this page that no other landing page in Israel currently has
  - Name it out loud. If you can't name it — ADD one.
  - Examples of "unmistakable details": a custom cursor with brand microcopy, a draggable interactive element, a custom SVG illustration drawn for this client, a scroll-triggered storytelling section, a kinetic typography moment, a tactile slider, a hand-drawn signature in the founder section

---

## Part 5 — Hebrew RTL test

(Full checklist in `hebrew-rtl-checklist.md`.)

- [ ] `<html lang="he" dir="rtl">` set on root
- [ ] Zero directional Tailwind classes (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `text-left`, `text-right`) in JSX
- [ ] Phone numbers / prices / URLs wrapped in `dir="ltr"` spans
- [ ] Line-height `≥ 1.6` for body, `≥ 1.15` for display
- [ ] `hyphens: none` for Hebrew elements
- [ ] Tested on real iOS Safari (not just Chrome devtools)
- [ ] Hebrew gershayim `״` used instead of `"` in headlines/copy

---

## Part 6 — Performance gate

- [ ] Lighthouse mobile (Slow 4G, throttled) — all four scores ≥95:
  - Performance ≥ 95
  - Accessibility ≥ 95
  - Best Practices = 100
  - SEO = 100
- [ ] Core Web Vitals on mobile:
  - LCP ≤ 1.8s
  - CLS ≤ 0.05
  - INP ≤ 200ms
  - TBT ≤ 200ms
- [ ] Total transfer ≤ 1.2 MB (hero image ≤ 280 KB after AVIF/WebP)
- [ ] Tested on a real mid-tier Android device (not just Chrome devtools)
- [ ] Tested on Safari iOS — RTL + custom fonts especially

---

## Part 7 — Content & conversion gate

- [ ] Hero headline ≤ 12 words. If you can't say it in 8, the offer isn't focused yet.
- [ ] No "We help X do Y" SaaS-template headline formula. Real headline with a real point of view.
- [ ] Every CTA has a destination, not "Get started" — e.g., `"תיאום שיחת ייעוץ של 20 דקות"`, `"הורדת ה-PDF החינמי"`, `"רכישה — ₪890"`
- [ ] FAQ answers REAL objections (price, timeline, who-this-is-for, refund/cancellation) — not marketing fluff
- [ ] Form copy uses friendly Hebrew validation, not robotic `שדה לא תקין`
- [ ] 404 page is designed (not the Next.js default)
- [ ] Thank-you page is designed (not just text on white)
- [ ] OG image has Hebrew copy rendered onto it (not just a logo on a plain background)

---

## Part 7b — AI-tells fingerprint test (added May 2026)

The full diagnostic + audit lives in `senior-designer-vs-ai-tells.md`. This section is the abbreviated checklist that must pass before GATE 4.

### Fingerprint check — ALL must be FALSE

- [ ] Navy + Gold + shimmer-gradient text combo present? → FAIL
- [ ] More than 3 sections use the same `eyebrow → h2 → lede → grid` scaffold? → FAIL
- [ ] More than 3 `reveal delay-*` cascade animations on the page? → FAIL
- [ ] Any `halftone`, `dot-pattern`, `corner-ornament` class names? → FAIL
- [ ] Stats row with shimmer numbers + Latin uppercase labels? → FAIL
- [ ] Persona cards with circle-letter avatars? → FAIL
- [ ] Any inline `style="..."` or `style={{...}}` in JSX? → FAIL
- [ ] Em-dash (`—`) count in body copy is > 0? → FAIL
- [ ] Brand initials with bullets (`A·S`-style) in body copy? → FAIL
- [ ] Ticker/marquee with `▲`/`▼` arrows or data labels? → FAIL

### Senior moves check — ALL must be TRUE

- [ ] At least 2 sections use asymmetric layout (5/7, 7/5, full-bleed, diagonal, off-center, or vertical) → required
- [ ] One background depth element keyed to client's industry (SVG, 3-10% opacity, ≥30vh coverage) → required
- [ ] Exactly ONE signature WOW moment from `signature-moments-library.md` § Part 1 → required
- [ ] H1 uses typographic-effect component (split-text, mask, stroke, gradient-shift, mixed-font, letter-spacing, or kinetic) → required
- [ ] At least 2 H2s use typographic-effect components → required
- [ ] Body copy reads in period-rhythm Hebrew, em-dash count = 0 → required
- [ ] "Restraint commitments" block written in DESIGN-LANGUAGE.md listing 5 NOT-DOing decisions → required

If ANY fingerprint fails or ANY senior move is missing → re-route to the responsible agent before GATE 4 opens.

---

## Part 8 — The final mental test

Send the page (mentally or via screenshot) to two clients in completely different verticals — e.g., **a lawyer in Herzliya** AND **a vegan café in Florentin** — and ask each: "could this be yours?"

- If BOTH say YES → start over.
- If BOTH say NO ("but I see why it's theirs") → ship it.

That's the bar.

---

## What gets recorded

The compiler agent writes the filled checklist to:

```
clients/<client-slug>/landing-page/reports/self-uniqueness-audit.md
```

Every box ticked = green. Any unchecked box = the relevant agent re-runs the affected section before GATE 4 closes.
