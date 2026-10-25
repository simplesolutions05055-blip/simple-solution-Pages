#!/usr/bin/env python3
"""Scrape GitHub trending repositories (no API key needed)."""

import argparse
import json
import re
import sys
import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def scrape_trending(language=None, since="weekly"):
    """Scrape the GitHub trending page."""
    url = "https://github.com/trending"
    if language:
        url += f"/{requests.utils.quote(language.lower())}"
    url += f"?since={since}"

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        html = resp.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching GitHub trending: {e}", file=sys.stderr)
        return []

    repos = []

    # Split into article blocks (each repo is in an <article> tag)
    articles = re.split(r'<article\s+class="Box-row"', html)
    if len(articles) < 2:
        # Try alternative pattern
        articles = re.split(r'<article\s+class="[^"]*Box-row[^"]*"', html)

    for article in articles[1:]:  # Skip first split (before first article)
        repo = {}

        # Extract repo name (owner/name) from the h2 > a href
        name_match = re.search(r'<h2[^>]*>.*?<a[^>]*href="(/[^"]+)"', article, re.DOTALL)
        if name_match:
            path = name_match.group(1).strip("/")
            repo["repo_name"] = path
            repo["repo_url"] = f"https://github.com/{path}"
        else:
            continue

        # Extract description from <p> tag
        desc_match = re.search(r'<p[^>]*class="[^"]*col-9[^"]*"[^>]*>(.*?)</p>', article, re.DOTALL)
        if desc_match:
            desc = re.sub(r'<[^>]+>', '', desc_match.group(1)).strip()
            repo["description"] = desc
        else:
            repo["description"] = ""

        # Extract programming language
        lang_match = re.search(r'itemprop="programmingLanguage"[^>]*>([^<]+)', article)
        if lang_match:
            repo["language"] = lang_match.group(1).strip()
        else:
            repo["language"] = ""

        # Extract total stars - look for SVG star icon followed by number
        stars_match = re.search(r'octicon-star.*?</svg>\s*([\d,]+)', article, re.DOTALL)
        if stars_match:
            repo["stars_total"] = int(stars_match.group(1).replace(",", ""))
        else:
            repo["stars_total"] = 0

        # Extract forks
        forks_match = re.search(r'octicon-repo-forked.*?</svg>\s*([\d,]+)', article, re.DOTALL)
        if forks_match:
            repo["forks"] = int(forks_match.group(1).replace(",", ""))
        else:
            repo["forks"] = 0

        # Extract stars this period (daily/weekly/monthly)
        period_match = re.search(r'([\d,]+)\s+stars\s+(today|this week|this month)', article)
        if period_match:
            repo["stars_period"] = int(period_match.group(1).replace(",", ""))
            repo["period"] = period_match.group(2)
        else:
            repo["stars_period"] = 0
            repo["period"] = since.replace("ly", "").replace("dai", "today")

        repos.append(repo)

    return repos


def filter_by_topic(repos, topic):
    """Score repos by relevance to the topic."""
    topic_lower = topic.lower()
    topic_words = set(topic_lower.split())
    scored = []
    for repo in repos:
        score = 0
        searchable = f"{repo['repo_name']} {repo['description']}".lower()
        # Exact topic in name or description
        if topic_lower in searchable:
            score += 10
        # Word overlap
        for word in topic_words:
            if word in searchable:
                score += 3
        # Stars boost
        score += min(repo["stars_period"] / 100, 5)
        repo["relevance_score"] = round(score, 1)
        scored.append(repo)
    scored.sort(key=lambda x: (x["relevance_score"], x["stars_period"]), reverse=True)
    return scored


def main():
    parser = argparse.ArgumentParser(description="Scrape GitHub trending repos")
    parser.add_argument("--topic", required=True, help="Topic for relevance filtering")
    parser.add_argument("--language", help="Programming language filter (e.g., python, javascript)")
    parser.add_argument("--since", default="weekly", choices=["daily", "weekly", "monthly"])
    parser.add_argument("--limit", type=int, default=25, help="Max repos to return")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    print(f"Scraping GitHub trending for '{args.topic}'...", file=sys.stderr)
    if args.language:
        print(f"  Language filter: {args.language}", file=sys.stderr)

    repos = scrape_trending(args.language, args.since)
    print(f"  Found {len(repos)} trending repos", file=sys.stderr)

    if repos:
        repos = filter_by_topic(repos, args.topic)
        repos = repos[:args.limit]

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(repos, f, indent=2, ensure_ascii=False)

    print(f"\nDone! {len(repos)} repos saved to {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
