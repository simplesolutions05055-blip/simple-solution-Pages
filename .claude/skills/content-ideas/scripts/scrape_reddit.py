#!/usr/bin/env python3
"""Scrape trending posts from Reddit using the public JSON API (no auth needed)."""

import argparse
import json
import sys
import time
import requests

TOPIC_SUBREDDITS = {
    "ai": ["artificial", "MachineLearning", "ChatGPT", "LocalLLaMA", "singularity", "OpenAI"],
    "programming": ["programming", "webdev", "learnprogramming", "coding", "ExperiencedDevs", "cscareerquestions"],
    "python": ["Python", "learnpython", "django", "flask"],
    "javascript": ["javascript", "reactjs", "nextjs", "node", "webdev"],
    "web development": ["webdev", "Frontend", "web_design", "javascript", "reactjs"],
    "machine learning": ["MachineLearning", "deeplearning", "datascience", "artificial"],
    "data science": ["datascience", "dataengineering", "MachineLearning", "statistics"],
    "cybersecurity": ["cybersecurity", "netsec", "hacking", "AskNetsec"],
    "devops": ["devops", "docker", "kubernetes", "sysadmin", "aws"],
    "mobile": ["androiddev", "iOSProgramming", "FlutterDev", "reactnative"],
    "gaming": ["gaming", "pcgaming", "indiegaming", "Games", "gamedev"],
    "fitness": ["Fitness", "bodyweightfitness", "GYM", "strength_training", "running"],
    "health": ["health", "nutrition", "Supplements", "biohackers", "longevity"],
    "cooking": ["Cooking", "MealPrepSunday", "EatCheapAndHealthy", "recipes", "food"],
    "finance": ["personalfinance", "FinancialIndependence", "investing", "wallstreetbets", "stocks"],
    "crypto": ["CryptoCurrency", "Bitcoin", "ethereum", "defi", "CryptoMarkets"],
    "entrepreneurship": ["Entrepreneur", "startups", "SideProject", "smallbusiness", "sweatystartup"],
    "marketing": ["marketing", "digital_marketing", "SEO", "socialmedia", "PPC"],
    "saas": ["SaaS", "startups", "Entrepreneur", "indiehackers"],
    "ecommerce": ["ecommerce", "shopify", "FulfillmentByAmazon", "dropship"],
    "design": ["design", "graphic_design", "UI_Design", "web_design", "userexperience"],
    "photography": ["photography", "photocritique", "postprocessing", "cameras"],
    "video": ["videography", "VideoEditing", "Filmmakers", "YouTubers"],
    "music": ["WeAreTheMusicMakers", "musicproduction", "edmproduction", "Guitar"],
    "writing": ["writing", "screenwriting", "WritingPrompts", "copywriting"],
    "productivity": ["productivity", "getdisciplined", "selfimprovement", "Notion"],
    "real estate": ["realestateinvesting", "RealEstate", "landlord", "CommercialRealEstate"],
    "career": ["careerguidance", "careeradvice", "jobs", "resumes"],
    "education": ["education", "Teachers", "OnlineLearning", "learnprogramming"],
    "travel": ["travel", "solotravel", "digitalnomad", "backpacking"],
    "fashion": ["malefashionadvice", "femalefashionadvice", "streetwear", "fashion"],
    "parenting": ["Parenting", "Mommit", "daddit", "beyondthebump"],
    "pets": ["dogs", "cats", "pets", "Dogtraining"],
    "science": ["science", "askscience", "space", "Physics", "biology"],
    "technology": ["technology", "gadgets", "Futurology", "tech"],
    "automation": ["automation", "nocode", "zapier", "n8n", "selfhosted"],
    "content creation": ["NewTubers", "YouTubers", "Twitch", "content_marketing", "TikTokCreators"],
    "social media": ["socialmedia", "Instagram", "TikTokCreators", "TwitterMarketing"],
}

HEADERS = {"User-Agent": "ContentIdeasBot/1.0 (scraping trending posts for content research)"}
MAX_RETRIES = 3
RETRY_DELAY = 5


def fetch_subreddit(subreddit, sort="hot", time_filter="week", limit=50):
    """Fetch posts from a single subreddit."""
    if sort == "top":
        url = f"https://www.reddit.com/r/{subreddit}/{sort}.json?t={time_filter}&limit={limit}"
    else:
        url = f"https://www.reddit.com/r/{subreddit}/{sort}.json?limit={limit}"

    for attempt in range(MAX_RETRIES):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            if resp.status_code == 429:
                print(f"  Rate limited on r/{subreddit}, retrying in {RETRY_DELAY}s...", file=sys.stderr)
                time.sleep(RETRY_DELAY)
                continue
            if resp.status_code in (403, 401, 404):
                print(f"  Skipping r/{subreddit} (HTTP {resp.status_code})", file=sys.stderr)
                return []
            resp.raise_for_status()
            data = resp.json()
            posts = []
            for child in data.get("data", {}).get("children", []):
                p = child.get("data", {})
                if p.get("over_18", False):
                    continue
                score = p.get("score", 0)
                num_comments = p.get("num_comments", 0)
                posts.append({
                    "title": p.get("title", ""),
                    "score": score,
                    "num_comments": num_comments,
                    "subreddit": p.get("subreddit", subreddit),
                    "url": f"https://reddit.com{p.get('permalink', '')}",
                    "created_utc": p.get("created_utc", 0),
                    "upvote_ratio": p.get("upvote_ratio", 0),
                    "domain": p.get("domain", ""),
                    "engagement_score": round(score + (num_comments * 1.5)),
                })
            return posts
        except requests.exceptions.RequestException as e:
            print(f"  Error fetching r/{subreddit}: {e}", file=sys.stderr)
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
    return []


def search_reddit(topic, sort="top", time_filter="week", limit=50):
    """Search all of Reddit for a topic (fallback when no subreddit mapping exists)."""
    url = f"https://www.reddit.com/search.json?q={requests.utils.quote(topic)}&sort={sort}&t={time_filter}&limit={limit}"

    for attempt in range(MAX_RETRIES):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            if resp.status_code == 429:
                time.sleep(RETRY_DELAY)
                continue
            resp.raise_for_status()
            data = resp.json()
            posts = []
            for child in data.get("data", {}).get("children", []):
                p = child.get("data", {})
                if p.get("over_18", False):
                    continue
                score = p.get("score", 0)
                num_comments = p.get("num_comments", 0)
                posts.append({
                    "title": p.get("title", ""),
                    "score": score,
                    "num_comments": num_comments,
                    "subreddit": p.get("subreddit", ""),
                    "url": f"https://reddit.com{p.get('permalink', '')}",
                    "created_utc": p.get("created_utc", 0),
                    "upvote_ratio": p.get("upvote_ratio", 0),
                    "domain": p.get("domain", ""),
                    "engagement_score": round(score + (num_comments * 1.5)),
                })
            return posts
        except requests.exceptions.RequestException as e:
            print(f"  Error searching Reddit: {e}", file=sys.stderr)
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
    return []


def get_subreddits_for_topic(topic):
    """Find matching subreddits for a topic from the built-in mapping."""
    topic_lower = topic.lower().strip()
    if topic_lower in TOPIC_SUBREDDITS:
        return TOPIC_SUBREDDITS[topic_lower]
    # Partial match
    for key, subs in TOPIC_SUBREDDITS.items():
        if topic_lower in key or key in topic_lower:
            return subs
    return None


def main():
    parser = argparse.ArgumentParser(description="Scrape trending Reddit posts for content ideas")
    parser.add_argument("--topic", required=True, help="Topic to search for")
    parser.add_argument("--subreddits", help="Comma-separated list of subreddits (overrides auto-mapping)")
    parser.add_argument("--sort", default="hot", choices=["hot", "top", "rising"], help="Sort method")
    parser.add_argument("--time_filter", default="week", choices=["hour", "day", "week", "month", "year", "all"])
    parser.add_argument("--limit", type=int, default=50, help="Max posts per subreddit")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    all_posts = []

    if args.subreddits:
        subreddit_list = [s.strip() for s in args.subreddits.split(",")]
    else:
        subreddit_list = get_subreddits_for_topic(args.topic)

    if subreddit_list:
        print(f"Scraping {len(subreddit_list)} subreddits for '{args.topic}'...", file=sys.stderr)
        for sub in subreddit_list:
            print(f"  Fetching r/{sub}...", file=sys.stderr)
            posts = fetch_subreddit(sub, args.sort, args.time_filter, args.limit)
            all_posts.extend(posts)
            time.sleep(1)  # Be respectful of rate limits
    else:
        print(f"No subreddit mapping for '{args.topic}', searching all of Reddit...", file=sys.stderr)
        all_posts = search_reddit(args.topic, args.sort, args.time_filter, args.limit)

    # Deduplicate by URL
    seen_urls = set()
    unique_posts = []
    for post in all_posts:
        if post["url"] not in seen_urls:
            seen_urls.add(post["url"])
            unique_posts.append(post)

    # Sort by engagement score
    unique_posts.sort(key=lambda x: x["engagement_score"], reverse=True)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(unique_posts, f, indent=2, ensure_ascii=False)

    print(f"\nDone! {len(unique_posts)} unique posts saved to {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
