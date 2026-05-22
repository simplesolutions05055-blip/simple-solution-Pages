# Start-From-Zero Principle

The single most important rule of this skill. The skill MUST have ZERO aesthetic memory across projects. Every run starts blank.

**The agency's house style is RULES + STRUCTURE, never aesthetics.**

---

## The contract

Every time the skill is invoked, the only things carried over from previous projects are:

1. **The structural rules** (asymmetry mandatory, ONE WOW moment, background depth, headline effects, etc.)
2. **The anti-AI fingerprint rules** (em-dash ban, no navy+gold luxury template, no halftone decorations, no template-scaffold-everywhere, etc.)
3. **The deliverable contract** (Next.js 15, Hebrew RTL, Google Sheet, Vercel deploy, etc.)

Everything else — colors, fonts, voice, photography direction, micro-interactions choice, copy register, illustration style — comes EXCLUSIVELY from THIS client's brand book OR THIS project's discovery answers.

---

## Hard separation: VARIABLES vs CONSTANTS

### CONSTANTS (always the same, regardless of client)

These are the agency's house rules. They apply to every Simple Solutions LP forever:

#### Structural constants
- 6-gate workflow (intake → brief approval → type-specific questions → preview → hosting → production)
- Next.js 15 + Tailwind 4 + shadcn + Framer Motion stack
- Hebrew RTL with logical-property classes
- Google Sheet auto-generated for any LP with a form
- Performance gate: Lighthouse mobile ≥95/95/100/100
- Self-hosted fonts via next/font (never Google CDN in prod)
- Server-side payment IPN handlers (Cardcom/Grow/Stripe per project)
- next/script `afterInteractive` for tracking pixels

#### Design constants
- At least 2 asymmetric sections per page (see `signature-moments-library.md` § 2)
- Exactly ONE background depth element keyed to industry (see § 3)
- H1 + ≥2 H2s use typographic-effect components (see § 4)
- Exactly ONE signature WOW moment (see § 1)
- Max 3 cascading-reveal animations in the entire page
- Max 1 symmetric 3-column grid per page

#### Anti-AI fingerprint constants (all forbidden)
- Em-dashes (—) in body copy
- Inline `style="..."` or `style={{...}}` attributes
- `halftone`, `dot-pattern`, `corner-ornament` decorations
- Navy + Gold + shimmer-gradient text combo
- Default Tailwind indigo / violet / purple / zinc
- Stats row with shimmer numbers + Latin uppercase labels
- Persona cards with circle-letter avatars
- Brand initials with bullets (A·S, S·P) in body copy
- Ticker with ▲▼ arrows + data labels
- Same `eyebrow → h2 → lede → grid` scaffold in >3 sections
- Three-word staccato sentences (`"בהירות. אחריות. תנועה."`) as body copy
- Latin-uppercase eyebrows (`"INSIGHT 01"`, `"CHAPTER 02"`) above Hebrew

#### Copy constants
- No "We help X do Y" / "אנחנו עוזרים" headlines
- CTAs always have destinations (no "התחל" / "Get started")
- Hebrew gershayim ״ ׳ not English `" '`
- LTR wrappers for phone numbers, prices, URLs inside Hebrew

---

### VARIABLES (must come from THIS project's inputs every time)

Everything in this list MUST be derived from the brand book OR the discovery answers. NEVER from a default, NEVER from a previous project, NEVER from the agency's own brand.

| Variable | Where it comes from |
|---|---|
| Primary brand color | `brand-context.json` → `palette.brand` OR discovery DNA extraction |
| Accent color | `brand-context.json` → `palette.accent` OR discovery DNA extraction |
| Background color | `brand-context.json` → `palette.bg` OR discovery DNA extraction |
| Ink (primary text) color | `brand-context.json` → `palette.ink` OR discovery DNA extraction |
| Display font | `brand-context.json` → `typography.display` OR discovery (industry-matched from `hebrew-rtl-checklist.md` § 3) |
| Body font | `brand-context.json` → `typography.body` OR discovery |
| Mono font (if used) | `brand-context.json` OR discovery (only if tech/dev industry) |
| Tone of voice | `brand-context.json` → `voice_traits` OR discovery answers |
| Preferred vocabulary | `brand-context.json` → `vocabulary.preferred` OR discovery |
| Banned vocabulary | `brand-context.json` → `vocabulary.banned` OR discovery |
| Sample sentences (tone reference) | `brand-context.json` → `sample_sentences` OR discovery |
| CTA library | `brand-context.json` → `cta_library` OR discovery |
| Photography direction | `brand-context.json` → `photography_style` OR discovery |
| Illustration direction | `brand-context.json` → `illustration_style` OR discovery |
| Motion personality (luxurious/snappy/organic) | DERIVED from brand voice + industry, never from a default |
| Reference brands to blend (2-3) | PICKED per project from `design-references-index.md` + `israeli-boutique-references.md`, never repeated for consecutive projects |
| Background depth SVG variant | PICKED per project from `signature-moments-library.md` § 3 industry mapping |
| Signature WOW moment | PICKED per project from § 1, never repeated for consecutive projects in same vertical |
| Headline effect variants | PICKED per project from § 4 |
| Asymmetric layout pattern | PICKED per project from § 2 |
| Section order | PICKED per project from `section-library.md` based on LP type + offer |
| Form fields | DECIDED per project at GATE 3 |
| Payment provider | DECIDED per project at GATE 3 |

---

## The "Reset" check (every run starts here)

Before any agent runs design or copy work, the `lp-discovery-runner` MUST perform this reset check:

```
RESET CHECKLIST (run at start of every project)

☐ No colors carried over from prior project
☐ No fonts carried over from prior project
☐ No copy phrases carried over from prior project
☐ No reference brands carried over from prior project
☐ No layout patterns carried over from prior project
☐ Brand book for THIS client loaded (or confirmed not to exist)
☐ Discovery answers for THIS client locked
☐ "Decisions NOT made" list written specifically for THIS client
```

Only after every box is ticked does the design DNA blending begin.

---

## What "house style" means for Simple Solutions

Simple Solutions does NOT have a house aesthetic that travels across client work. Simple Solutions HAS a house **methodology** + **quality bar**:

- **Methodology** — the 6-gate workflow, the 9-agent pipeline, the discovery questionnaire
- **Quality bar** — the AI-tells audit, the senior-master moves, the performance gate, the RTL hygiene

Two Simple Solutions LPs for two different clients should look NOTHING alike. They should only share the rigor of the process — never the aesthetic of the output.

If you can look at two LPs and recognize "ah, both made by the same agency" — the agency failed. The agency's brand is the QUALITY, not the LOOK.

---

## Examples vs defaults — read carefully

Throughout the reference files (`anti-template-playbook.md`, `signature-moments-library.md`, `senior-designer-vs-ai-tells.md`, `design-references-index.md`, etc.) you will see specific colors, fonts, and aesthetic descriptions. These are **EXAMPLES** illustrating principles, NEVER defaults to apply.

For example:
- `senior-designer-vs-ai-tells.md` § 1 says "Pick ONE bold accent (oxblood, electric chartreuse, deep teal, hospital green, coral) on a quiet ground (cream, bone, charcoal, paper)." — those colors are EXAMPLES of distinctive choices, not a default palette. Pick what THIS client needs.
- `hebrew-rtl-checklist.md` § 3 has a "fonts by mood" table — those are CANDIDATES, the blender picks what fits THIS brand + project, never the first row by default.
- `design-references-index.md` worked examples (lawyer in Herzliya, vegan restaurant in Florentin, B2B SaaS by ex-8200) — those are ILLUSTRATIONS of how to blend, not templates to reuse.

The blender agent's job is to read principles → derive choices from THIS project's inputs → never copy the worked examples literally.

---

## Validation: Could this skill produce different aesthetics for different clients?

Mental test before delivery:

> If a luxury wedding planner in Caesarea + a B2B agricultural SaaS in Kibbutz Yagur + a vegan bakery in Florentin all ran this skill in the same week — would the three outputs look completely different from each other?

If YES — the start-from-zero principle is intact. Ship.
If NO — the skill is leaking aesthetic preferences somewhere. Diagnose and fix BEFORE delivery.

---

## Anti-pattern: skill drift over time

Watch for this failure mode: as the agency builds more LPs, the `master-fonts-library.md`-style accumulation in `brand-book-creator` is GOOD because it grows a curated TYPE pool. But the equivalent accumulation in LP work would be BAD if it grew an aesthetic pool that biased future choices.

Therefore:
- ✅ Accumulate STRUCTURAL lessons (new asymmetric patterns, new WOW moments, new background-depth-by-industry mappings, new performance tricks)
- ❌ Do NOT accumulate aesthetic preferences (no "approved palettes" library, no "favored fonts" list outside of industry-matched candidates)

If a new pattern or rule needs to be added, it goes in a reference file as a CHOICE option, not as a default.
