# Anti-Template Playbook

The Israeli LP market is flooded with recycled shadcn templates. A client paying ₪8K-₪25K must NEVER receive what a ₪3K freelancer would build. This file is the design-DNA-blender's and builder-compiler's reference for escaping the template look.

---

## Part 1 — Concrete moves to USE (pick 3-5 per project, never zero)

### Typography moves
- **Unexpected typography pairing** — serif display + mono body, or stencil display + humanist sans. Avoid Poppins / Inter / Montserrat / Roboto as the display face — they're SaaS-template tells.
- **Single hero word at 18-24vw** filling the screen, then aggressive contrast drop into body.
- **Kinetic typography** — headline that animates word-by-word on scroll, or characters that shuffle on hover.
- **Vertical headline** that breaks the column grid.

### Color moves
- **Color outside the palette of safety** — Yves Klein blue `#002FA7`, deep oxblood `#4A1518`, sage `#9CAE8A`, electric chartreuse `#DFFF00`, hospital green `#A8C5B8`, terracotta `#C75A2C`. Anything but generic indigo/violet shadcn defaults.
- **Monochrome with ONE electric accent** — most of the page is `#0A0A0A` on `#FAFAFA`, then a single `#3B5BFF` or `#B8FF6B` pop on CTAs and key headlines.
- **Warm tonal palette** (cream + moss + terracotta) for editorial/lifestyle brands.

### Layout moves
- **Asymmetric grids** — 5/7 split, off-center hero, content that breaks the column.
- **Full-bleed editorial spreads** — magazine-style sections with image bleed to viewport edge, oversized pull quotes.
- **Variable section heights** — not every section is 80vh. Mix tall, short, and full-bleed.

### Image / illustration moves
- **Custom SVG hero illustration** drawn for THIS client — not Storyset, not unDraw, not Lottie marketplace.
- **Real founder photography** — shot for THIS project, even on iPhone. Never UI Faces, never Pexels, never Generated Photos.
- **Hand-drawn line illustrations** for organic/editorial brands — animate on scroll like ink being drawn.
- **Texture overlays** — 3% noise grain, paper texture multiply blend, or subtle film-grain on imagery.

### Motion moves
- **Scroll-triggered storytelling** — sticky section progressing through 3 states as user scrolls (Framer Motion `useScroll` + `useTransform`).
- **Slow viscous fades** (0.9s) for luxury brands — like opening a velvet box. No bounce, no spring.
- **Snappy 180-220ms** transitions for tech/SaaS brands.
- **Slight rotation jitter** (±0.5deg) on hover for handmade/organic brands.

### Interaction moves
- **Cursor as design element** — custom cursor on hero (sliding hairline, magnetic dot, contextual label).
- **One unexpected interaction** — draggable element, tactile slider, click-to-reveal — that pays off the brand promise.

---

## Part 2 — 20 generic-LP tells to AVOID (catch yourself before client catches you)

1. **Stock photos of people on laptops** looking at the camera — universal "we have no real photography" signal.
2. **Gradient blob shapes** in the hero — every SaaS template since 2020.
3. **Default shadcn purple-violet buttons** (`bg-violet-600 hover:bg-violet-700`) — fingerprint of every Lovable / v0 export.
4. **Three-icon feature row** with Heroicons outline icons + 5-word headline + 1-sentence body.
5. **Fake testimonial avatars** from UI Faces / RandomUser / Generated Photos. Real photos or no photos at all.
6. **Pricing cards with the middle one elevated** + "Most Popular" badge — used in 100% of SaaS templates.
7. **Animated number counters** ("10,000+ clients") that count up on scroll — cliché since 2017.
8. **"Trusted by" logo bar** with greyscale logos of companies the client never worked with.
9. **Hero subheadline that starts with "We help X do Y"** — the SaaS template formula. Write a real headline with a real point of view.
10. **Founder photo on the right** with arms crossed in a blazer. Either do real photography or skip it.
11. **Carousels for testimonials** — nobody clicks them. Show 2-3 in a static grid.
12. **Floating WhatsApp button as the only mobile CTA** — lazy. Design a real mobile CTA strategy.
13. **Poppins / Inter / Montserrat** as the display face. Lorem-ipsum sans-serifs.
14. **Identical bento grids** with `rounded-2xl` cards — every 2024 landing page.
15. **Generic 404 and thank-you pages** — these are part of the deliverable. Design them.
16. **"Get started" CTA copy** with no destination. Be specific: "תיאום שיחת ייעוץ של 20 דקות".
17. **Hyphenated Hebrew** — `hyphens: auto` left on by mistake. Reads broken.
18. **Underline-only links** in body copy — looks like an unstyled `<a>`. Restyle every link.
19. **Default rounded-full avatars** for team — try squared, hexagonal, framed in a thin border, or no frame at all.
20. **Hero headline >12 words** — if you can't say it in 8, the offer isn't clear yet.

---

## Part 3 — Final check before delivery

Run this mental test:

> "If I sent this page to a lawyer in Herzliya AND a vegan café in Florentin and asked them both 'could this be yours?' — what would they say?"

- If BOTH say YES → the page is generic. Restart.
- If BOTH say NO ("but I see why it's theirs") → ship it.

That's the bar.
