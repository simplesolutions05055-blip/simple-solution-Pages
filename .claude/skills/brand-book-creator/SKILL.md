---
name: brand-book-creator
description: Create complete, professional brand books for businesses — logo system, color palette, typography, voice & tone, photography style, channel examples (Meta/IG/TikTok), WhatsApp pack, and AI-ingestible context blocks. Produces both human-readable PDF and HTML, plus machine-readable blocks that feed AI tools (Claude/GPT/Midjourney/Nano Banana) so client content stays on-brand. Two sizes — Mini (10-18 pages) for fast deliveries and Full (22-35 pages) for premium clients. Used by a marketing agency to drive consistent landing pages, websites, and ads. Trigger phrases include "create a brand book", "build a brand identity", "תיצור ספר מותג", "ספר מותג", "מיתוג", "בניית מותג", "brand guidelines", "brand identity system", "מדריך מותג".
---

# Brand Book Creator

End-to-end pipeline that turns a discovery questionnaire into a finished, dual-format brand book (PDF + HTML) with embedded AI-ingestion blocks. Every client gets a uniquely designed book — fonts, colors, layout flavor are tailored per industry and personality. The Simple Solution brand book (v1.0) is the **inspiration anchor** for structure and quality, NEVER a template to copy verbatim.

---

## When to use

Trigger phrases (Hebrew + English):
- "ספר מותג", "תיצור ספר מותג", "מדריך מותג", "מיתוג עסק", "בניית מותג", "זהות מותגית"
- "create a brand book", "build a brand identity", "brand guidelines"

**Use this BEFORE:** building a website, landing page, or paid campaign for a new client when no brand book exists, OR when refreshing an outdated one.

---

## Two delivery sizes (CHOOSE FIRST)

### Mini Brand Book — 10-18 pages
- Foundations, Audience, Visual identity, 1 channel example, Do/Don't, AI context block
- Use for: small businesses, fast-turnaround clients, early-stage startups, budget under ₪4K
- Time to produce: ~3-4 hours of agent work

### Full Brand Book — 22-35 pages
- Everything in Mini, PLUS: Strategy & positioning depth, 3 channels (Meta/IG/TikTok) with mocks, WhatsApp pack, bot/chat scripts library, ad copy templates, CTA library, motion principles, full applications
- Use for: premium clients, established brands, brands launching paid media, projects ₪8K+
- Time to produce: ~6-8 hours of agent work

**Q0 in the questionnaire forces the size decision before discovery begins.** Choosing Mini skips chapters 09-12 in the skeleton.

---

## Files in this skill

| File | Purpose |
|---|---|
| `QUESTIONNAIRE.md` | Fixed 30-question discovery + Q0 size selector |
| `BRAND-BOOK-SKELETON.md` | Structural skeleton — sections only, NO visual template |
| `font-selection-matrix.md` | Industry → font pair recommendations |
| `master-fonts-library.md` | Growing library of approved font pairs (across clients) |
| `AI-INGESTION-FORMAT.md` | Spec for the `<brand:...>` machine-readable blocks |
| `CREDITS-FOOTER.html` | Simple Solutions credit block (appended to every book) |
| `references/simple-solution-v1-INSPIRATION.md` | Inspiration notes from Simple Solution v1.0 — principles only, no copying |

---

## Pipeline (7 agents, sequential with one parallel block)

```
[user trigger]
    ↓
1. brand-questionnaire-runner         ← Q0 size + 30 questions, captures existing assets
    ↓
2. brand-positioning-archetype-strategist  ← Mission/Vision/Values, audience, archetype, positioning
    ↓
3. brand-verbal-identity-architect    ← Tagline, voice, vocabulary, do/don't, CTA library
    ↓
4. brand-visual-system-designer       ← Reads font-selection-matrix + master-fonts-library
                                         → recommends 2 pairs → user picks → designs full visual system
    ↓
5. brand-channels-examples-designer   ← (FULL only — skipped in Mini for ch.09-12)
                                         FB / IG / TikTok mocks + WhatsApp pack + bot scripts
    ↓
6. brand-ai-ingestion-formatter       ← Builds <brand:...> blocks + final brand-context.json
    ↓
7. brand-book-compiler-dual-format    ← Compiles unique HTML (designed per client) + PDF
                                         + appends Simple Solutions credit footer
    ↓
[user review & approval]
    ↓
[on approval] → ask: "save this font pair to master-fonts-library?"
    ↓
[commit + push to repo]
```

---

## Critical rules (read every time)

1. **NEVER COPY the Simple Solution v1.0 HTML/CSS.** It is reference only. Every client starts blank, designed fresh.

2. **Font selection is industry-aware.** Before recommending fonts, the visual-system-designer MUST:
   - Read `font-selection-matrix.md` to match the industry
   - Check `master-fonts-library.md` for already-approved pairs in that industry
   - If a master-library pair fits → recommend it FIRST
   - Always present exactly 2 font-pair candidates for the user to pick

3. **Hebrew RTL is mandatory** when the client operates in Hebrew. All compiled HTML uses `dir="rtl"` and `lang="he"`.

4. **Brand Book MUST include AI-ingestion blocks.** Every chapter ends with a `<brand:...>` code block. Final chapter is `brand-context.json` — a single consolidated payload for AI tools.

5. **Simple Solutions credit footer is non-negotiable.** Last page of every book. Logo placeholder + website `https://www.simple-solution.co.il/` + phone `0549020253`. Small, discreet, professional.

6. **Dual-format delivery.** Every book ships as BOTH `BRAND-BOOK.html` (responsive, browsable) AND `BRAND-BOOK.pdf` (print-ready). The HTML is generated first; PDF is rendered from the HTML.

7. **Step-by-step gating.** After each agent finishes, summarize what was produced and wait for explicit "approved / continue" before invoking the next agent. Per CLAUDE.md ping-pong rule.

8. **One client = one folder.** Output goes to `clients/<client-slug>/brand-book/` (created at the start of the run).

---

## Output structure

```
clients/<client-slug>/brand-book/
├── BRAND-BOOK.html              ← The book (designed uniquely per client)
├── BRAND-BOOK.pdf               ← Same content, print-ready
├── brand-context.json           ← Final AI-ingestion payload
├── assets/
│   ├── logo-primary.svg
│   ├── logo-mark.svg
│   ├── logo-wordmark.svg
│   ├── colors.json              ← Tokens for Tailwind / CSS
│   └── fonts/                   ← Web-font files or @import notes
├── discovery/
│   ├── questionnaire-answers.md ← Raw answers from Q0+Q1-Q30
│   └── existing-assets/         ← Anything the client supplied at intake
└── notes/
    └── revision-log.md          ← Tracks rounds + change requests
```

---

## After approval — feed the master library

After the user approves a book, ask:
> "האם להוסיף את זוג הפונטים `<X + Y>` לספריית המאסטר? (כן / לא / נסיוני — שמור אך סמן כניסיוני)"

If yes → append the entry to `master-fonts-library.md`, commit, push. Goal: build a curated 6-8 master pair library over the agency's first clients.

---

## Quality bar (must pass before delivery)

- [ ] Brand foundations (Mission / Vision / Values) signed off before any visuals shown
- [ ] At least 2 font-pair candidates presented; user picked one
- [ ] Colors pass WCAG AA on all primary pairings
- [ ] Hebrew typography rendered correctly (RTL, kerning, line-height ≥ 1.6 for body)
- [ ] Every chapter ends with a `<brand:...>` AI-ingestion block
- [ ] Final chapter contains `brand-context.json` (validated JSON)
- [ ] Simple Solutions credit footer present on last page
- [ ] HTML + PDF both produced and visually identical
- [ ] Channel examples (Full only) include both feed post and story dimensions
- [ ] No copy-paste from Simple Solution v1.0 — unique design DNA per client

---

## Anti-patterns

- Recommending a single font pair (always 2, let the user pick)
- Showing visuals before strategy is locked
- Reusing Simple Solution's navy+purple palette for any other client (it's their brand, not a template)
- Skipping the AI-ingestion blocks because "the client doesn't need them" — they're for the agency's downstream tools, not the client
- Compiling the book before the user approved each chapter
- Forgetting the credit footer
- Producing only HTML or only PDF — both, always
