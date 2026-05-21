# Claude Code Skills — Marketing Agency Suite

This directory contains the skill library used by the agency. Each skill is a self-contained workflow Claude Code can invoke automatically based on what you ask.

## How skills work

| Path | Scope |
|------|-------|
| `~/.claude/skills/<name>/SKILL.md` | **Global** — active in every project |
| `<project>/.claude/skills/<name>/SKILL.md` | **Project-only** — active only in this repo |

Skills here are mirrored from `~/.claude/skills/` for version control and portability.
To install on a new machine / new container:

```bash
cp -r .claude/skills/. ~/.claude/skills/
```

## Skill index

### Core agency skills (Webxp custom)
| Skill | Purpose | Sample trigger |
|-------|---------|---------------|
| `skill-creator` | Meta — creates new skills | "תיצור לי סקיל ל..." |
| `saas-builder` | Build SaaS systems & apps | "תבנה לי מערכת" |
| `marketing-copywriting` | Conversion copy (HE+EN) | "כתוב לי טקסט שיווקי" |
| `ultra-premium-landing-page` | Ultra-premium custom landing pages (end-to-end) | "תעצב לי דף נחיתה" |
| `premium-website` | Full multi-page websites | "תבנה לי אתר" |
| `brand-book-creator` | Complete brand identity systems | "תיצור ספר מותג" |
| `skill-auditor` | Safety audit of third-party skills before install | "תבדוק את הסקיל הזה" |
| `session-start-hook` | Web container setup hook | "set up the session-start hook" |

### Document skills (from anthropics/skills — official)
| Skill | Purpose | Sample trigger |
|-------|---------|---------------|
| `docx` | Create / read / edit Word documents | "תכין לי הצעת מחיר ב-Word" |
| `pptx` | Create / read / edit PowerPoint decks | "תבנה pitch deck ללקוח" |
| `pdf` | Read, merge, split, watermark, fill PDFs | "תאחד את כל ה-PDFs האלה" |

### Marketing skills (community)
| Skill | Purpose | Sample trigger |
|-------|---------|---------------|
| `content-ideas` | 100 viral content ideas from Reddit/X/GitHub trends | "תן לי 100 רעיונות לסרטונים" |

## References (not skills — design knowledge base)

`/.claude/references/awesome-design-md/` — 71 design-language guides for top brands (Apple, Airbnb, Linear, Vercel, Stripe…). Used by `ultra-premium-landing-page` and `premium-website` as design inspiration.

## How they chain together

Typical client engagement:

```
brand-book-creator
        ↓ (design tokens, voice, logos)
        ├──→ premium-website         (full site, on-brand)
        ├──→ ultra-premium-landing-page  (campaign pages, on-brand)
        └──→ marketing-copywriting   (all copy uses brand voice)
```

For product clients: `saas-builder` builds the app, then `premium-website` builds the marketing site around it.

## Adding a new skill

Just say: **"תיצור לי סקיל ל-<X>"** and `skill-creator` will scaffold it correctly.

By default new skills go global (`~/.claude/skills/`). Say "פרויקט-ספציפי" to limit to one repo.
