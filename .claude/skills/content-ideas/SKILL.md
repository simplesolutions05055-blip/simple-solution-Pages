---
name: content-ideas
description: Generate unlimited short-form video content ideas (TikTok, Reels, YouTube Shorts) by scraping trending topics from Reddit, Twitter/X, and GitHub. Asks for topic and subject, scrapes the hottest trends of the week from all 3 platforms, returns 20 content ideas with 5 engagement hook variations each (100 total) saved as CSV. This skill should be used when users want content ideas, video topic inspiration, trending topic research, viral content brainstorming, or content calendar planning.
---

# Content Ideas Generator

Generate 20 trending content ideas for short-form video (TikTok, Reels, YouTube Shorts) with 5 engagement hook variations each — 100 ideas total, saved as CSV.

## Scripts

All scripts are in the skill's `scripts/` directory:

- `scrape_reddit.py` — Scrape hot posts from Reddit (public JSON API, no auth needed)
- `scrape_twitter.py` — Scrape Twitter/X trends from aggregation sites (no API key needed)
- `scrape_github.py` — Scrape GitHub trending repositories
- `generate_csv.py` — Format final ideas into a 100-row CSV

## Process

### Step 1: Gather Input

Ask the user:

1. **Topic** — The broad area (e.g., "AI", "fitness", "cooking", "marketing")
2. **Subject** — A specific angle within the topic (e.g., "AI coding assistants", "home workouts for beginners")

If subject is not provided, use the topic as the subject.

### Step 2: Create Temp Directory

```bash
mkdir -p .tmp
```

### Step 3: Scrape Reddit

Run the Reddit scraper with appropriate subreddits. Consult `references/subreddit_map.md` for topic-to-subreddit mapping if the built-in mapping does not cover the user's topic.

```bash
python3 scripts/scrape_reddit.py --topic "[SUBJECT]" --sort hot --limit 50 --output .tmp/reddit_data.json
```

To override subreddits manually:

```bash
python3 scripts/scrape_reddit.py --topic "[SUBJECT]" --subreddits "sub1,sub2,sub3" --sort hot --limit 50 --output .tmp/reddit_data.json
```

### Step 4: Scrape Twitter/X

Run the Twitter/X scraper to get trending hashtags and topics:

```bash
python3 scripts/scrape_twitter.py --topic "[SUBJECT]" --output .tmp/twitter_data.json
```

Then **supplement with WebSearch** to find topic-specific viral tweets and threads. Run 2-3 searches:

1. `trending [TOPIC] on Twitter this week [CURRENT_YEAR]`
2. `viral [TOPIC] tweets [CURRENT_MONTH] [CURRENT_YEAR]`
3. `[TOPIC] hot takes Twitter/X [CURRENT_YEAR]`

From search results, extract: trending hashtags, viral tweets being discussed, controversial takes generating engagement, notable figures trending in the space. Combine these with the scraper output.

### Step 5: Scrape GitHub

Run the GitHub scraper. Skip or reduce if the topic is non-technical.

```bash
python3 scripts/scrape_github.py --topic "[SUBJECT]" --since weekly --output .tmp/github_data.json
```

For tech topics, add a language filter:

```bash
python3 scripts/scrape_github.py --topic "[SUBJECT]" --language python --since weekly --output .tmp/github_data.json
```

### Step 6: Synthesize Top 20 Content Ideas

Read all scraped data files and WebSearch results. Combine into the top 20 content ideas.

**Source allocation (approximate):**
- 8–10 ideas from Reddit (highest volume of discussion-driven content)
- 5–7 ideas from Twitter/X (real-time viral moments and hot takes)
- 3–5 ideas from GitHub (technical/product content angles)
- For non-tech topics: reduce GitHub allocation, increase Reddit and Twitter/X

**Selection criteria:**
1. **Engagement signal** — Reddit score + comments, Twitter virality, GitHub stars
2. **Short-form fit** — Can it be explained/shown in 30–60 seconds?
3. **Recency** — Prefer content from the last 7 days
4. **Uniqueness** — No overlapping ideas across sources
5. **Hook potential** — Does it provoke curiosity, debate, or strong reaction?

**For each idea, create a JSON object:**

```json
{
  "idea_number": 1,
  "source": "Reddit",
  "trending_topic": "The original trending topic or post title",
  "content_idea": "A specific short-form video idea based on this trend",
  "engagement_score": 2341
}
```

### Step 7: Generate 5 Hook Variations Per Idea

For each of the 20 ideas, generate 5 hook variations optimized for short-form video (first 3 seconds / opening text overlay):

1. **Controversial** — A polarizing statement or hot take that provokes disagreement. Starts engagement through debate. Example phrases: "דעה לא פופולרית", "אף אחד לא מדבר על זה", "זו הסיבה ש-X מת", "לא אכפת לי מה אומרים"

2. **Educational** — A clear learning promise. The viewer learns something specific. Example phrases: "ככה זה עובד", "X מוסבר ב-30 שניות", "המדע מאחורי X", "רוב האנשים לא יודעים את זה על X"

3. **Inspirational** — Aspirational framing that motivates action. Example phrases: "זה שינה הכל", "מ-X ל-Y ב-Z ימים", "שינוי החשיבה ש...", "מה מפריד בין ה-1% העליון לכולם"

4. **Behind-the-scenes** — Personal experience or insider perspective. Example phrases: "ניסיתי X במשך 30 יום", "מה באמת קורה כש...", "האמת על...", "יום בחיים של מישהו ש..."

5. **Practical** — Immediately actionable tip or tool recommendation. Example phrases: "תשתמשו בכלי הזה כדי", "3 צעדים ל...", "תפסיקו לעשות X, תעשו Y במקום", "הכלי החינמי שמחליף את X"

**IMPORTANT: All hooks must be written in Hebrew.**

**Each hook must be:**
- Under 15 words (for text overlay)
- Written in conversational, non-corporate Hebrew tone
- Designed to stop the scroll in the first 1–2 seconds

**Write the full 20 ideas with hooks to `.tmp/ideas_with_hooks.json`** using this format:

```json
[
  {
    "idea_number": 1,
    "source": "Reddit",
    "trending_topic": "AI agents replacing junior developers",
    "content_idea": "3 tasks AI agents can already do better than junior devs",
    "engagement_score": 2341,
    "hooks": [
      {"hook_type": "Controversial", "hook_variation": "ג'וניורים עומדים להיות מיותרים. הנה ההוכחה."},
      {"hook_type": "Educational", "hook_variation": "סוכני AI עכשיו עושים את 3 המשימות האלה אוטומטית."},
      {"hook_type": "Inspirational", "hook_variation": "המפתחים שמתאימים את עצמם ל-AI יכפילו את הקריירה פי 10."},
      {"hook_type": "Behind-the-scenes", "hook_variation": "בדקתי סוכני AI על משימות ג'וניור אמיתיות במשך שבוע."},
      {"hook_type": "Practical", "hook_variation": "תשתמשו ב-3 כלי AI האלה לאוטומציה של משימות קידוד משעממות."}
    ]
  }
]
```

### Step 8: Generate CSV

Run the CSV generator:

```bash
python3 scripts/generate_csv.py --input .tmp/ideas_with_hooks.json --output content_ideas.csv
```

### Step 9: Present Results

Show the user:

1. A summary: "Generated 100 content ideas (20 ideas x 5 hooks) from Reddit, Twitter/X, and GitHub"
2. A highlights table with the top 5 ideas (idea name + source + engagement score)
3. The CSV file path
4. Note that the CSV can be opened in Google Sheets, Excel, or Notion

## Edge Cases

- **Reddit rate limiting**: If the script is rate limited, reduce subreddits to 3 and retry. If still blocked, fall back to WebSearch: `site:reddit.com [topic] hot posts this week`
- **Twitter scraper returns no data**: Rely more heavily on WebSearch. Run additional queries: `[topic] viral social media this week`, `[topic] trending discussion`
- **GitHub not relevant**: For non-tech topics (fitness, cooking, etc.), skip GitHub scraping entirely and allocate 12–14 ideas to Reddit, 6–8 to Twitter/X
- **Niche topic with few results**: Broaden the search terms. If "sourdough bread baking" returns little, also try "bread baking", "sourdough", "baking"
- **No results from any source**: Inform the user and suggest broadening the topic
