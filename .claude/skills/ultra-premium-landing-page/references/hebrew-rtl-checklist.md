# Hebrew RTL Checklist

This is where 90% of "premium" Israeli LPs visibly fall apart. The compiler MUST tick every box before GATE 4.

---

## 1. HTML root

```html
<html lang="he" dir="rtl">
```

For bilingual sites (HE + EN), use Next.js i18n routing — `/he` gets `dir="rtl"`, `/en` gets `dir="ltr"`. Never auto-swap based on browser language; let the user choose.

---

## 2. Tailwind logical properties (mandatory — no exceptions)

Use logical, not directional:

| Directional (DON'T USE) | Logical (USE) |
|---|---|
| `pl-*` / `pr-*` | `ps-*` / `pe-*` |
| `ml-*` / `mr-*` | `ms-*` / `me-*` |
| `left-*` / `right-*` | `start-*` / `end-*` |
| `text-left` / `text-right` | `text-start` / `text-end` |
| `border-l` / `border-r` | `border-s` / `border-e` |
| `rounded-l-*` / `rounded-r-*` | `rounded-s-*` / `rounded-e-*` |

Tailwind 4 supports all of these natively. The compiler agent MUST enforce this with a grep before committing — any `pl-` / `pr-` / `ml-` / `mr-` / `left-` / `right-` in JSX files is a regression.

---

## 3. Hebrew font stacks — pick per mood

| Brand mood | Display face | Body face |
|---|---|---|
| Tech / startup / SaaS | `Heebo` 700-900 | `Heebo` 400 |
| Editorial / boutique | `Suez One`, `FbReforma Display` | `Assistant` 400 |
| Bold / direct / consumer | `Ploni Bold AAA` | `Ploni Regular AAA` |
| Luxury / serif feel | `FbReforma Narrow`, `Frank Ruhl Libre` | `Assistant` 400 |
| Playful / fun | `Rubik` 700 | `Rubik` 400 |
| Editorial-magazine | `Karantina` | `Assistant` 300 |

**Loading:** Use `next/font/google` or self-host via `@fontsource/heebo`. **NEVER load from Google Fonts CDN in production** (privacy + latency + GDPR).

**Preload the display font:**
```tsx
import localFont from 'next/font/local'

const display = localFont({
  src: './fonts/FbReformaDisplay.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-display',
})
```

---

## 4. Numeric pockets — keep LTR even inside RTL

```html
<span dir="ltr" class="tabular-nums">050-1234567</span>
<span dir="ltr">₪1,290</span>
<span dir="ltr">10:00 - 18:00</span>
```

Prices, phone numbers, times, URLs — all need `dir="ltr"` wrappers inside Hebrew copy, or they'll render backwards on mobile Safari.

---

## 5. Line-height — Hebrew needs more breathing room

| Element | English `leading-*` | Hebrew value |
|---|---|---|
| Display headlines | `leading-tight` (1.25) | `leading-[1.15]` |
| Sub-headlines | `leading-snug` (1.375) | `leading-[1.35]` |
| Body | `leading-relaxed` (1.625) | `leading-[1.7]` |
| Tight UI labels | `leading-tight` | `leading-[1.3]` minimum |

Hebrew descenders (ק, ן, ך, ף, ץ) demand the extra room. Tight English line-heights look broken in Hebrew.

---

## 6. Punctuation

- Hebrew quotation: `״` (gershayim) and `׳` (geresh) — NOT `"` `'`. Configure your CMS/Markdown to preserve.
- Hebrew comma is identical to English `,` — don't swap.
- Em-dash `—` works fine in Hebrew.
- Avoid hyphenation in Hebrew — disable with:
  ```css
  html[lang="he"] { hyphens: none; word-break: normal; }
  ```

---

## 7. Form validation copy — Hebrew, friendly, never "Error"

| Field | Placeholder | Validation message |
|---|---|---|
| שם | `איך לקרוא לך?` | `נשמח לדעת איך לפנות אלייך` |
| טלפון | `נייד לחזרה (050-...)` | `הטלפון צריך להתחיל ב-05 ולהיות 10 ספרות` |
| מייל | `אימייל לאישור` | `נראה שיש שם טעות — בדקי שוב?` |
| אזור | `עיר או אזור` | `בחירה זו עוזרת לנו להתאים שירות` |
| בחירת שירות | `במה אנחנו יכולים לעזור?` | `נשמח לדעת איזה שירות מעניין אותך` |

Never use:
- ❌ `שדה לא תקין` (cold, robotic)
- ❌ `Error: invalid input` (English in a Hebrew form)
- ❌ `הזן ערך תקין` (formal-Hebrew-stilted)

---

## 8. Mobile-specific RTL gotchas

- **iOS Safari + custom fonts:** Always test on real Safari, not just Chrome devtools. Hebrew rendering bugs surface specifically there.
- **Input direction:** Phone/email/URL inputs need `dir="ltr"` even in Hebrew forms, or the user types right-to-left.
  ```tsx
  <input type="tel" dir="ltr" inputMode="numeric" ... />
  ```
- **Native iOS keyboard:** `inputMode="tel"` triggers the right keyboard for phone fields.

---

## 9. SEO meta in Hebrew

```tsx
export const metadata = {
  title: 'כותרת בעברית — שם המותג',
  description: 'תיאור של עד 155 תווים בעברית, כולל מילת המפתח הראשית.',
  openGraph: {
    locale: 'he_IL',
    title: '...',
    description: '...',
    images: ['/og.png'],  // 1200x630, with Hebrew copy
  },
  alternates: {
    canonical: 'https://lp.simple-solution.co.il/[client]',
  },
}
```

OG image MUST have Hebrew copy rendered into the PNG at build time (Next.js OG image generation supports `dir="rtl"` in JSX → satori).

---

## 10. Pre-delivery RTL audit

Compiler agent grep before commit — any of these is a regression:

```bash
grep -rE '(pl-|pr-|ml-|mr-|left-[0-9]|right-[0-9]|text-left|text-right|hyphens-auto)' app/ components/ | grep -v 'lang="en"'
```

Should return 0 results (except inside English-only sections).
