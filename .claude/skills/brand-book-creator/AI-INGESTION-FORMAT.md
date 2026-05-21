# AI Ingestion Format — `<brand:...>` Block Spec

Every brand book contains structured blocks that downstream AI tools (Claude, GPT, Midjourney, Nano Banana, image generators, content tools) can parse to stay perfectly on-brand.

Two delivery modes:

1. **Inline blocks** — one at the end of each chapter
2. **Consolidated payload** — chapter 14 is a single `brand-context.json` that merges all blocks

The PDF and HTML both render these blocks visually (monospace, slightly distinct background) so the human reader sees them and understands their purpose.

---

## Why this exists

When the client (or the agency) uploads the brand book to an AI tool and says "create me an Instagram post" — without these blocks, the AI guesses at colors and voice. With them, the AI has direct, machine-readable instructions.

This makes brand-book-creator a **force multiplier** for every other skill the agency uses.

---

## Block format

All blocks are pseudo-XML tags wrapping plain text or YAML-like fields. Not strict XML — readable by humans, parseable by LLMs.

### Universal template

```
<brand:CHAPTER_KEY>
field-name: value
nested-field:
  - item 1
  - item 2
sub-block:
  key: value
  key: value
</brand:CHAPTER_KEY>
```

---

## Required blocks (one per chapter)

### `<brand:foundations>`
```
<brand:foundations>
brand-name: [שם המותג]
mission: [משפט אחד]
vision: [משפט אחד]
values:
  - [ערך 1]: [הסבר קצר]
  - [ערך 2]: [הסבר קצר]
  - [ערך 3]: [הסבר קצר]
promise: [one-liner]
</brand:foundations>
```

### `<brand:audience>`
```
<brand:audience>
primary-persona:
  age: [טווח]
  gender: [m/f/mixed]
  income: [טווח]
  location: [אזור]
  lifestyle: [תיאור קצר]
pains:
  - [כאב 1]
  - [כאב 2]
  - [כאב 3]
desires:
  - [רצון 1]
  - [רצון 2]
  - [רצון 3]
usp: [מה שמייחד אותנו במשפט אחד]
</brand:audience>
```

### `<brand:voice>`
```
<brand:voice>
tagline: [טאגליין ראשי]
tagline-alternates:
  - [חלופה 1]
  - [חלופה 2]
tone-traits:
  - [תכונה 1]: [דוגמה משפט]
  - [תכונה 2]: [דוגמה משפט]
  - [תכונה 3]: [דוגמה משפט]
preferred-words: [מילה, מילה, מילה]
banned-words: [מילה, מילה, מילה]
sample-sentences:
  - [משפט לדוגמה במלוא הקול]
  - [משפט שני]
languages: [he / he+en / en]
</brand:voice>
```

### `<brand:logo>`
```
<brand:logo>
primary-file: assets/logo-primary.svg
mark-file: assets/logo-mark.svg
wordmark-file: assets/logo-wordmark.svg
clear-space: x-height × 1
min-size-px: 16
min-size-mm: 10
acceptable-backgrounds: [white, brand-primary, deep-neutral]
never:
  - אל תמתח / לא תעוות
  - אל תסובב
  - אל תשתמש על רקע צבעוני שאינו במפרט
</brand:logo>
```

### `<brand:colors>`
```
<brand:colors>
primary:
  - name: [שם בעברית/אנגלית]
    hex: "#XXXXXX"
    rgb: [r, g, b]
    usage: [מתי להשתמש]
secondary:
  - name: ...
    hex: ...
    usage: ...
neutrals:
  - name: ...
    hex: ...
functional:
  success: "#XXXXXX"
  warning: "#XXXXXX"
  error: "#XXXXXX"
  info: "#XXXXXX"
ratios: 60/30/10  # primary/secondary/accent
accessible-pairings:
  - foreground: "#XXXXXX"
    background: "#XXXXXX"
    contrast: AA / AAA
</brand:colors>
```

### `<brand:typography>`
```
<brand:typography>
display:
  hebrew: [Font Name]
  latin: [Font Name]
  weights: [400, 700, 900]
body:
  hebrew: [Font Name]
  latin: [Font Name]
  weights: [400, 500, 700]
scale:
  h1: 48px / line-height 1.1
  h2: 36px / 1.15
  h3: 28px / 1.2
  body: 16px / 1.6
  caption: 13px / 1.5
license: [Google Fonts Free / FontBit Licensed / Commercial]
</brand:typography>
```

### `<brand:visual-language>`
```
<brand:visual-language>
shape-language: [rounded / square / organic / geometric]
corner-radius-base: 8px / 12px / 16px
icon-style: [line 1.5px / filled / 2-tone]
photography-direction:
  - subject: [מה לצלם]
  - lighting: [טבעי / סטודיו / dramatic]
  - mood: [warm / clinical / vibrant / muted]
  - avoid: [stock-photo cliché, awkward smiles, sterile white-rooms]
midjourney-prefix: "[מילים שאפשר להדביק כפרומפט פתיחה לכל תמונה]"
nano-banana-prefix: "[אותו רעיון לטון פנימי של Gemini]"
</brand:visual-language>
```

### `<brand:rules>`
```
<brand:rules>
do:
  - [כלל חיובי 1]
  - [כלל חיובי 2]
dont:
  - [כלל שלילי 1]
  - [כלל שלילי 2]
pro-tips:
  - [טיפ של הסוכנות]
  - [טיפ של הסוכנות]
</brand:rules>
```

---

## FULL-only blocks (chapters 09-13)

### `<brand:strategy>`
```
<brand:strategy>
market-position: [cheap-traditional / cheap-innovative / premium-traditional / premium-innovative]
say-yes-to: [רשימה]
say-no-to: [רשימה]
manifesto: |
  [פסקה רגשית של עד 100 מילים שמסכמת את "למה אנחנו קיימים"]
</brand:strategy>
```

### `<brand:channels>`
```
<brand:channels>
meta-feed:
  dimensions: 1080x1080
  hook-formulas:
    - [pattern: "ידעת ש___? הנה למה זה משנה לך"]
    - [pattern: "3 דברים שאף אחד לא אומר לך על ___"]
  hashtag-bank: [#tag, #tag, #tag, ...]
instagram-story:
  dimensions: 1080x1920
  templates: [poll, quiz, behind-the-scenes, testimonial]
tiktok:
  dimensions: 1080x1920
  duration-target: 15-30s
  hook-rules: [first 1.5s decides; native captions; trending audio]
</brand:channels>
```

### `<brand:whatsapp>`
```
<brand:whatsapp>
greetings:
  first-contact: "[נוסח]"
  returning: "[נוסח]"
  after-purchase: "[נוסח]"
  after-hours: "[נוסח]"
bot-tree:
  root-menu: [option-1, option-2, option-3]
  handoff-triggers: [המילה "נציג", שאלה לא מובנת פעמיים]
business-profile:
  about: "[נוסח]"
  description: "[נוסח]"
  away-message: "[נוסח]"
</brand:whatsapp>
```

### `<brand:ctas>`
```
<brand:ctas>
tofu:  # top-of-funnel — awareness
  - [CTA]
  - [CTA]
mofu:  # middle — consideration
  - [CTA]
  - [CTA]
bofu:  # bottom — purchase
  - [CTA]
  - [CTA]
hook-formulas:
  - [pattern + example]
  - [pattern + example]
headline-bank:
  - [כותרת 1]
  - [כותרת 2]
</brand:ctas>
```

### `<brand:motion>` + `<brand:applications>`
```
<brand:motion>
philosophy: [fast-snappy / slow-elegant / energetic / calm]
easing-default: easeOutQuart
durations:
  micro: 150ms
  page: 400ms
  hero: 800ms
</brand:motion>

<brand:applications>
business-card: assets/applications/biz-card.png
email-signature: assets/applications/email-sig.html
deck-cover: assets/applications/deck-cover.png
social-profile: assets/applications/profile-pack/
favicon: assets/favicon.ico
app-icon: assets/app-icon.png
</brand:applications>
```

---

## Chapter 14 — Consolidated `brand-context.json`

Final chapter renders this JSON in a syntax-highlighted code block AND saves the file separately at `brand-context.json` for direct upload.

```json
{
  "$schema": "simple-solutions/brand-context/v1",
  "client": "<client-slug>",
  "generated": "<YYYY-MM-DD>",
  "brand": {
    "name": "...",
    "foundations": { ... },
    "audience": { ... },
    "voice": { ... },
    "logo": { ... },
    "colors": { ... },
    "typography": { ... },
    "visualLanguage": { ... },
    "rules": { ... },
    "strategy": { ... },
    "channels": { ... },
    "whatsapp": { ... },
    "ctas": { ... },
    "motion": { ... },
    "applications": { ... }
  }
}
```

Fields from Mini-only books include only the keys that were generated (no nulls for skipped chapters).

---

## How AI tools should be instructed

A short usage note appears in the book right before chapter 14:

> **For AI tools (Claude, GPT, Midjourney, Nano Banana, etc.):**
> Upload this PDF or paste `brand-context.json`. Then ask "create [content type] using the attached brand context." The AI will read the structured blocks and stay on-brand automatically.

---

## Validation

Before delivery, `brand-book-compiler-dual-format` validates:
- [ ] Every required block is present
- [ ] `brand-context.json` is valid JSON (no syntax errors)
- [ ] HEX values match between `<brand:colors>` and the visual rendering
- [ ] Font names in `<brand:typography>` exist in Google Fonts / specified library
