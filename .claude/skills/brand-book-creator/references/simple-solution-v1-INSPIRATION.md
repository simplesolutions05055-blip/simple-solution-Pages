# Simple Solution v1.0 — Inspiration Reference

This file documents the design **principles** observed in the Simple Solution brand book v1.0 — the agency's own book that Gili shared as inspiration.

⚠️ **READ THIS CAREFULLY:**
This file is for PRINCIPLE EXTRACTION, NOT IMITATION.
The visual-system-designer must NEVER reproduce Simple Solution's specific colors, fonts, layout, or copy when designing for other clients. Each client gets a unique visual language.

---

## What to take from Simple Solution v1.0

### ✅ STRUCTURAL PRINCIPLES (take these)

1. **Single-scroll HTML format** — one long page, no multi-tab navigation. Easier to share, screenshot, and feed to AI tools.

2. **RTL Hebrew throughout** — when the brand operates in Hebrew, the entire document is RTL. No mixed-direction mess.

3. **Section anatomy:**
   - Right-side vertical bar in brand-primary color
   - Hebrew section title (large, bold) to the right of the bar
   - Small grey English/Hebrew subtitle below
   - Generous whitespace before the section content

4. **Card-based component design** — colors, fonts, modules each get individual cards with shadow + rounded corners + tight metadata.

5. **Color cards anatomy:**
   - Top: solid color block (fills ~60% of card height) with HEX shown in a darker pill badge
   - Bottom: white area with name (EN + HE) and usage hint
   - 2-column grid layout (responsive)

6. **Typography sample area** — show fonts in actual use:
   - Heading sample (the brand name itself, biggest size)
   - Subheading sample
   - Body paragraph (a real sentence, not lorem ipsum)
   - Code/mono sample if relevant

7. **Do/Don't = green/red two-column** — checks on the left, X marks on the right (or vice versa for RTL). Specific, scannable rules — not abstract platitudes.

8. **Cover page formula:**
   - Gradient background using primary brand colors
   - Logo placeholder at top
   - Brand name in display font, very large
   - Subtitle in body font, smaller
   - Version stamp at bottom (e.g. "v1.0 — April 2026")

9. **Footer line at bottom** — version + date + tiny brand mark.

10. **Module/sub-product colors** — if the brand has divisions or product lines, give each one a sub-color so they're visually distinguishable.

---

### ❌ WHAT NOT TO COPY (these are Simple Solution's, not yours-to-reuse)

- ❌ The specific navy (#1A2B5C) + royal purple (#201868) gradient — this is Simple Solution's identity
- ❌ The royal gold (#C9A24A) accent — this is Simple Solution's identity
- ❌ The Heebo display font choice — pick fonts per client industry (see `font-selection-matrix.md`)
- ❌ The "Simple Solution" / "סימפל סולושנס" wordmark style
- ❌ The "The Kingdom" tagline aesthetic / "ממלכתי" framing
- ❌ The exact column widths, padding values, shadow specs — recompute these per client based on their personality
- ❌ The micro-icon stamps (🏰 for Kingdom) — find icons matching the client's brand

---

## Principles in plain Hebrew

| עקרון | יישום |
|---|---|
| **שקיפות מבנית** | סקציות עם כותרות ברורות, פס צבע אנכי, סאב-כותרת קטנה |
| **כרטיסיות לכל אלמנט** | צבעים, פונטים, מודולים — כולם בכרטיסים נפרדים עם צל וגבול עדין |
| **הפגנת שימוש** | להראות פונטים וצבעים בפעולה, לא רק מפרט |
| **הפרדה ראשי/משני** | פלטת צבעים תמיד מחולקת לראשונים/משניים/פונקציונליים |
| **2-עמודות עשה/אל תעשה** | ירוק/אדום, ספציפי, סקנבל |
| **קאבר מובהק** | גרדיאנט במותג, לוגו, שם גדול, חתימת גרסה |
| **פוטר עדין** | קרדיט קטן, גרסה, תאריך |

---

## Self-uniqueness audit (the designer's check)

Before declaring a client brand book "designed," the visual-system-designer must answer YES to all:

- [ ] Are the primary colors entirely different from Simple Solution's navy+purple+gold?
- [ ] Is at least the display font different from Heebo? (Body font can be Heebo if appropriate.)
- [ ] Does the cover gradient use the client's chosen colors, not navy-to-purple?
- [ ] Is the section-bar accent in the client's color, not gold?
- [ ] Does the personality "feel" match the client (rounded for soft brands, sharp for confident brands)?
- [ ] Would the client and a Simple Solution rep, side by side, instantly tell which book is whose?

If any answer is NO → redesign before delivery.

---

## File location of the original

The original Simple Solution v1.0 brand book was shared by Gili as a screenshot (May 2026).
A local copy exists on Gili's machine at: `C:/Users/user/Downloads/simple-solution-brandbook-v1.html`

If/when the HTML file itself is added to the repo, place it at:
`.claude/skills/brand-book-creator/references/simple-solution-v1.html`
…and update this note with `[Original HTML available locally for reference — do not copy]`.
