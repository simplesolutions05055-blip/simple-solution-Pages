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

| Skill | Purpose | Sample trigger |
|-------|---------|---------------|
| `skill-creator` | Meta — creates new skills | "תיצור לי סקיל ל..." |
| `saas-builder` | Build SaaS systems & apps | "תבנה לי מערכת" |
| `marketing-copywriting` | Conversion copy (HE+EN) | "כתוב לי טקסט שיווקי" |
| `premium-landing-page` | Premium custom landing pages | "תעצב לי דף נחיתה" |
| `premium-website` | Full multi-page websites | "תבנה לי אתר" |
| `brand-book-creator` | Complete brand identity systems | "תיצור ספר מותג" |
| `session-start-hook` | Web container setup hook | "set up the session-start hook" |

## How they chain together

Typical client engagement:

```
brand-book-creator
        ↓ (design tokens, voice, logos)
        ├──→ premium-website         (full site, on-brand)
        ├──→ premium-landing-page    (campaign pages, on-brand)
        └──→ marketing-copywriting   (all copy uses brand voice)
```

For product clients: `saas-builder` builds the app, then `premium-website` builds the marketing site around it.

## Adding a new skill

Just say: **"תיצור לי סקיל ל-<X>"** and `skill-creator` will scaffold it correctly.

By default new skills go global (`~/.claude/skills/`). Say "פרויקט-ספציפי" to limit to one repo.
