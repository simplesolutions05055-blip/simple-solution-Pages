# Font Selection Matrix

Industry + personality → font pair recommendations. The visual-system-designer reads this BEFORE recommending fonts to the user.

Always present **exactly 2 pairs** to the user, letting them pick. Default pick order:
1. If `master-fonts-library.md` has an approved pair for this industry → that pair is candidate #1.
2. Candidate #2 is a fresh pair from this matrix that contrasts the first in feel (one safer, one bolder).

---

## Matrix

| Industry / Sector | Personality Cues | Hebrew Pair (display + body) | Latin Pair (display + body) | Rationale |
|---|---|---|---|---|
| **Cosmetics, beauty, hair, nails, spa** | warm, feminine, soft, sensorial | Varela Round (display) + Assistant (body) | Quicksand (display) + Nunito (body) | Rounded forms = friendly, approachable, body-positive |
| **Cosmetics — luxury / editorial** | premium, sensual, magazine-like | Bellefair (display) + Heebo Light (body) | Cormorant Garamond (display) + Lora (body) | Serif + delicate = high-end beauty editorial |
| **Wellness, yoga, holistic, meditation** | calm, organic, earthy | Frank Ruhl Libre (display) + Assistant (body) | Cormorant (display) + Inter Light (body) | Soft serif + airy sans = mindful, premium |
| **Tech, SaaS, startup, software** | clean, modern, sharp | Heebo (display) + Heebo (body) | Inter (display + body) | Geometric neutral — works everywhere, never dated |
| **Tech — playful / consumer** | friendly tech, approachable | Rubik (display) + Assistant (body) | DM Sans (display) + Inter (body) | Rounded corners signal innovation without being cold |
| **Finance, consulting, insurance, accounting** | authoritative, sober, trustworthy | Frank Ruhl Libre Black (display) + Heebo (body) | Source Serif Pro (display) + Inter (body) | Newspaper-headline gravitas — clients want certainty |
| **Finance — fintech / modern** | innovative but credible | Noto Sans Hebrew Black (display) + Heebo (body) | DM Serif Display (display) + Inter (body) | Modern weight signals "established but fresh" |
| **Medical, dental, clinics** | clinical, clean, trustworthy | Heebo Medium (display) + Heebo (body) | Inter Medium (display + body) | Sans-serif neutrality = professional, never alarming |
| **Legal, law firms** | conservative, expert, premium | Frank Ruhl Libre (display) + Assistant (body) | Lora (display) + Inter (body) | Serif tradition = expertise, gravity |
| **Restaurants, cafés, hospitality** | warm, sensory, inviting | Suez One (display) + Heebo (body) | Playfair Display (display) + Lora (body) | Slab + serif = appetite + craft |
| **Bars, nightlife, entertainment** | bold, after-hours, statement | Karantina (display) + Heebo (body) | Bebas Neue (display) + Inter (body) | Tall condensed = scream-loud branding |
| **Fashion, luxury goods, jewelry** | editorial, elegant, expensive | Bellefair (display) + Heebo Light (body) | Italiana (display) + Cormorant Garamond (body) | Pure editorial — Vogue energy |
| **Fashion — streetwear, youth** | bold, attitudinal | Secular One (display) + Heebo (body) | Anton (display) + Inter (body) | Heavy display = confidence, dominance |
| **Real estate, construction** | solid, grounded, premium | Suez One (display) + Heebo (body) | Roboto Slab (display) + Inter (body) | Slab serifs = literally weight + stability |
| **Real estate — luxury homes** | aspirational, refined | Frank Ruhl Libre (display) + Assistant (body) | Lora (display) + Inter Light (body) | Serif = old-money credibility |
| **Education, kids, schools** | friendly, energetic, playful | M PLUS Rounded 1c (display) + Assistant (body) | Quicksand (display) + Nunito (body) | Rounded = safe, friendly, approachable |
| **B2B education, courses, coaching** | expert, motivational | Heebo Bold (display) + Heebo (body) | DM Sans (display) + Inter (body) | Clean, modern, confidence without ego |
| **Automotive, sport, gym, fitness** | bold, energetic, kinetic | Karantina (display) + Heebo (body) | Bebas Neue (display) + Inter (body) | Tall condensed = speed, intensity |
| **Marketing agency, creative studio** | sharp, opinionated, in-on-the-joke | Secular One (display) + Heebo (body) | Space Grotesk (display) + Inter (body) | Distinctive but legible = "we know what we're doing" |
| **Non-profit, social impact** | human, hopeful, grounded | Assistant (display) + Heebo (body) | Inter (display + body) | Neutral readability = donation trust |

---

## Hebrew display fonts cheat-sheet (free, Google Fonts)

| Font | Vibe | Best for |
|---|---|---|
| **Heebo** | Neutral, geometric | Universal — tech, B2B, anything modern |
| **Assistant** | Friendly geometric | Service businesses, general purpose |
| **Rubik** | Rounded corners | Innovation, kids, modern consumer |
| **Varela Round** | Fully rounded | Friendly, soft, cosmetics, kids |
| **M PLUS Rounded 1c** | Soft rounded sans | Playful brands, education |
| **Frank Ruhl Libre** | Classic serif | Editorial, legal, traditional finance |
| **Bellefair** | Elegant serif | Luxury, beauty, fashion |
| **Suez One** | Slab serif heavy | Hospitality, real estate, headlines |
| **Karantina** | Tall condensed display | Bold campaigns, sport, nightlife |
| **Secular One** | Heavy modern sans | Confidence, fashion, agency |
| **Noto Sans Hebrew** | Corporate neutral | Big organizations, formal |

## Latin display fonts cheat-sheet (free, Google Fonts)

| Font | Vibe | Best pair (Hebrew) |
|---|---|---|
| **Inter** | Modern neutral | Heebo |
| **DM Sans** | Friendly geometric | Rubik / Assistant |
| **Space Grotesk** | Distinctive modern | Heebo / Secular One |
| **Cormorant Garamond** | Editorial serif | Bellefair / Frank Ruhl Libre |
| **Playfair Display** | Display serif | Suez One |
| **Lora** | Readable serif | Assistant |
| **Bebas Neue** | Condensed display | Karantina |
| **Quicksand** | Rounded display | Varela Round |
| **Nunito** | Rounded sans | M PLUS Rounded |
| **Italiana** | Thin elegant | Bellefair |

---

## Decision rules

1. **Always pick 1 display + 1 body.** Don't recommend 3+ fonts unless explicitly justified.
2. **Hebrew font is decided FIRST** if the brand operates in Hebrew. Latin pair follows the Hebrew choice.
3. **Body font must work at 14-16px** without breaking — test rendering before locking.
4. **Personality words from Q19 override industry default** when there's a conflict.
   Example: a tech company that says "warm, family-feel" → don't force Heebo+Inter; consider Rubik+DM Sans.
5. **License check** (per Q28 budget): Google Fonts free → tier A; FontBit/HaTipusiya → tier B; full commercial → tier C.
6. **If client supplied existing fonts** in Q3 → those fonts are candidate #1 automatically (refresh mode, not replace).

---

## How to present the 2 candidates

```
זוג #1 — [שם הזוג] [⭐ אם מספריית המאסטר]
   Hebrew: [Display name] + [Body name]
   Latin:  [Display name] + [Body name]
   Vibe:   [3-4 words]
   רישיון: [Free / FontBit / Paid]

זוג #2 — [שם הזוג]
   Hebrew: [Display name] + [Body name]
   Latin:  [Display name] + [Body name]
   Vibe:   [3-4 words]
   רישיון: [Free / FontBit / Paid]

איזה זוג מדבר אליך? (1 / 2 / "תראה לי דוגמה חיה")
```
