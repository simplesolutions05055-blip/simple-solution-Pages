---
name: skill-creator
description: Meta-skill for creating new Claude Code skills with correct structure (YAML frontmatter, SKILL.md format, triggers, workflow). Use when the user asks to create, build, design, scaffold, or generate a new skill — phrases like "create a skill for...", "build me a skill", "אני רוצה סקיל ל...", "תיצור סקיל", "בנה סקיל".
---

# Skill Creator

Use this skill whenever the user wants to author a new Claude Code skill. It enforces the correct file layout, frontmatter, and writing style so the new skill is actually discoverable by Claude's skill-matching and useful in practice.

## When to use

Trigger phrases (Hebrew + English):
- "create a skill for X" / "build me a skill" / "scaffold a skill"
- "אני רוצה סקיל ל..." / "תיצור לי סקיל" / "בנה סקיל" / "תוסיף סקיל"
- Any request to extend Claude's capabilities with a reusable workflow

## Where skills live

| Path | Scope |
|------|-------|
| `~/.claude/skills/<name>/SKILL.md` | **Global** — available in every project (default) |
| `<project>/.claude/skills/<name>/SKILL.md` | **Project-only** — use when the user explicitly says it's for one project |

**Default to global** unless the user explicitly says the skill should be project-specific.

## Workflow

### 1. Clarify intent (ask only if unclear)
- Skill name (kebab-case, short, no spaces)
- One-line purpose
- Trigger phrases — what the user is likely to say
- Inputs the skill needs (assets? brief? brand colors?)
- Final deliverable
- Global vs project-specific

If the user already described the skill clearly, skip this step.

### 2. Pick the name
Conventions:
- kebab-case: `marketing-copywriting`, `landing-page-builder`
- Action-oriented or domain noun
- 1–3 words

### 3. Write the SKILL.md

**Required frontmatter:**
```yaml
---
name: <kebab-name>
description: <One sentence in present tense describing what it does and WHEN to use it. Include trigger phrases in BOTH Hebrew and English so Claude matches user requests reliably. Mention concrete user phrases like "create X", "design Y", "אני רוצה Z".>
---
```

**The description is the most important line.** Claude uses it for skill matching. Make it rich with trigger keywords. Include example phrases the user might say.

**Body structure (recommended):**
1. `# <Title>` — human-friendly name
2. `## When to use` — trigger phrases, scenarios, when NOT to use
3. `## Inputs required` — checklist of what to gather from the user
4. `## Workflow` — numbered steps the assistant follows
5. `## Quality bar / Deliverables` — what "done" looks like
6. `## Examples` (optional) — sample prompts and outputs

### 4. Create the files

```bash
mkdir -p ~/.claude/skills/<name>
# Then write SKILL.md
```

For project-specific:
```bash
mkdir -p <project>/.claude/skills/<name>
```

### 5. Optional: add supporting files
If the skill needs templates, examples, or scripts, put them in the same dir:
- `~/.claude/skills/<name>/templates/`
- `~/.claude/skills/<name>/examples/`
- Reference them from SKILL.md with relative paths

### 6. Sync & persist
The container at `~/.claude/` is ephemeral. After creating the skill:
- Mirror to `/home/claude/.claude/skills/<name>/` if that path exists
- Recommend the user commit `.claude/skills/` to a version-controlled repo (e.g., a `claude-config` repo or inside their project) so the skill survives session resets

### 7. Verify
- Show the user the file tree of what was created
- Print the description line so they see what triggers it
- Suggest a test prompt: "Try saying '<example trigger>' to invoke it"

## Quality bar

A well-written skill:
- Has a description rich in trigger keywords (in both languages if user is multilingual)
- Has a clear, ordered workflow Claude can follow step-by-step
- States its inputs explicitly so Claude knows what to ask
- Defines what "done" looks like
- Stays focused — one domain, one job. Split into multiple skills if scope creeps.

## Anti-patterns to avoid

- Vague descriptions ("helps with marketing") — be specific and include trigger phrases
- Skills that duplicate what Claude already does natively without adding workflow value
- Massive SKILL.md files (>500 lines) — split into linked supporting docs
- Forgetting Hebrew trigger phrases when the user is a Hebrew speaker
