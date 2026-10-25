#!/usr/bin/env python3
"""Scrape Twitter/X trending topics via trend aggregation sites (no API key needed).

Uses a multi-layered approach:
  Layer 1: trends24.in - Real-time Twitter trending hashtags
  Layer 2: getdaytrends.com - Daily Twitter trends
  Layer 3: Nitter instances - Fallback for topic search

The SKILL.md also instructs Claude to supplement with WebSearch queries
for topic-specific viral tweets.
"""

import argparse
import json
import re
import sys
import time
import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

MAX_RETRIES = 2
RETRY_DELAY = 3

# Nitter instances (public Twitter frontends)
NITTER_INSTANCES = [
    "https://nitter.privacydev.net",
    "https://nitter.poast.org",
    "https://nitter.cz",
]


def scrape_trends24(topic=None):
    """Scrape trending hashtags from trends24.in."""
    url = "https://trends24.in/"
    trends = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        html = resp.text
        # Extract trending topics from the page
        # trends24 uses <a> tags with trend names inside list items
        pattern = r'<a[^>]*href="/[^"]*"[^>]*>([^<]+)</a>'
        matches = re.findall(pattern, html)
        seen = set()
        for match in matches:
            trend = match.strip()
            if trend and len(trend) > 1 and trend.lower() not in seen:
                seen.add(trend.lower())
                trends.append(trend)
        if topic:
            topic_lower = topic.lower()
            # Prioritize trends matching the topic
            matching = [t for t in trends if topic_lower in t.lower() or any(w in t.lower() for w in topic_lower.split())]
            other = [t for t in trends if t not in matching]
            trends = matching + other
    except Exception as e:
        print(f"  trends24.in error: {e}", file=sys.stderr)
    return trends[:50]


def scrape_getdaytrends():
    """Scrape daily trends from getdaytrends.com."""
    url = "https://getdaytrends.com/"
    trends = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        html = resp.text
        # Extract trend names from table rows
        pattern = r'<a[^>]*class="[^"]*trend-name[^"]*"[^>]*>([^<]+)</a>'
        matches = re.findall(pattern, html)
        if not matches:
            # Fallback pattern
            pattern = r'<td[^>]*>.*?<a[^>]*>([#@]?\w[\w\s]+)</a>'
            matches = re.findall(pattern, html, re.DOTALL)
        for match in matches:
            trend = match.strip()
            if trend and len(trend) > 1:
                trends.append(trend)
    except Exception as e:
        print(f"  getdaytrends.com error: {e}", file=sys.stderr)
    return trends[:50]


def scrape_nitter(topic):
    """Search for topic on Nitter instances (Twitter frontend)."""
    results = []
    for instance in NITTER_INSTANCES:
        try:
            url = f"{instance}/search?f=tweets&q={requests.utils.quote(topic)}&since=&until=&near="
            resp = requests.get(url, headers=HEADERS, timeout=10)
            if resp.status_code != 200:
                continue
            html = resp.text
            # Extract tweet content from Nitter
            tweet_pattern = r'<div class="tweet-content[^"]*"[^>]*>([^<]+(?:<[^>]+>[^<]*)*)</div>'
            matches = re.findall(tweet_pattern, html)
            for match in matches:
                # Clean HTML tags
                clean = re.sub(r'<[^>]+>', '', match).strip()
                if clean and len(clean) > 10:
                    results.append(clean)
            if results:
                print(f"  Found {len(results)} tweets via {instance}", file=sys.stderr)
                break
        except Exception as e:
            print(f"  Nitter ({instance}) error: {e}", file=sys.stderr)
            continue
    return results[:30]


def filter_by_topic(trends, topic):
    """Score and filter trends by relevance to the topic."""
    topic_words = set(topic.lower().split())
    scored = []
    for trend in trends:
        trend_lower = trend.lower()
        score = 0
        # Exact topic match
        if topic.lower() in trend_lower:
            score += 10
        # Word overlap
        trend_words = set(re.findall(r'\w+', trend_lower))
        overlap = topic_words & trend_words
        score += len(overlap) * 3
        # Hashtag bonus
        if trend.startswith("#"):
            score += 1
        scored.append({"trend": trend, "relevance_score": score})
    scored.sort(key=lambda x: x["relevance_score"], reverse=True)
    return scored


def main():
    parser = argparse.ArgumentParser(description="Scrape Twitter/X trends (no API needed)")
    parser.add_argument("--topic", required=True, help="Topic to search for")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    print(f"Scraping Twitter/X trends for '{args.topic}'...", file=sys.stderr)

    # Layer 1: trends24.in
    print("  Layer 1: Checking trends24.in...", file=sys.stderr)
    trends24 = scrape_trends24(args.topic)
    print(f"  Found {len(trends24)} trends from trends24.in", file=sys.stderr)

    # Layer 2: getdaytrends.com
    print("  Layer 2: Checking getdaytrends.com...", file=sys.stderr)
    daytrends = scrape_getdaytrends()
    print(f"  Found {len(daytrends)} trends from getdaytrends.com", file=sys.stderr)

    # Layer 3: Nitter search for topic-specific tweets
    print("  Layer 3: Searching Nitter for topic tweets...", file=sys.stderr)
    nitter_tweets = scrape_nitter(args.topic)
    print(f"  Found {len(nitter_tweets)} tweets from Nitter", file=sys.stderr)

    # Combine and deduplicate trends
    all_trends = list(dict.fromkeys(trends24 + daytrends))  # Preserve order, remove dupes
    filtered_trends = filter_by_topic(all_trends, args.topic)

    output = {
        "topic": args.topic,
        "trending_hashtags": filtered_trends[:30],
        "viral_tweets": nitter_tweets[:20],
        "sources": {
            "trends24_count": len(trends24),
            "getdaytrends_count": len(daytrends),
            "nitter_tweets_count": len(nitter_tweets),
        },
        "note": "Supplement with WebSearch queries for deeper topic-specific viral tweets"
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    total = len(filtered_trends) + len(nitter_tweets)
    print(f"\nDone! {total} Twitter/X signals saved to {args.output}", file=sys.stderr)
    if total == 0:
        print("  WARNING: No Twitter/X data found. Claude should use WebSearch as supplement.", file=sys.stderr)


if __name__ == "__main__":
    main()
