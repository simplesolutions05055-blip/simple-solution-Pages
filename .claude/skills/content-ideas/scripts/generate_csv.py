#!/usr/bin/env python3
"""Generate a CSV from content ideas JSON (20 ideas x 5 hooks = 100 rows)."""

import argparse
import csv
import json
import sys


EXPECTED_HOOKS = ["Controversial", "Educational", "Inspirational", "Behind-the-scenes", "Practical"]

CSV_COLUMNS = [
    "Idea #",
    "Source",
    "Trending Topic",
    "Content Idea",
    "Hook Type",
    "Hook Variation",
    "Engagement Score",
]


def validate_input(ideas):
    """Validate the input JSON structure."""
    if not isinstance(ideas, list):
        print("Error: Input must be a JSON array", file=sys.stderr)
        return False
    if len(ideas) == 0:
        print("Error: No ideas in input", file=sys.stderr)
        return False
    for i, idea in enumerate(ideas):
        required = ["idea_number", "source", "trending_topic", "content_idea", "hooks"]
        for field in required:
            if field not in idea:
                print(f"Error: Idea {i+1} missing field '{field}'", file=sys.stderr)
                return False
        if not isinstance(idea["hooks"], list) or len(idea["hooks"]) != 5:
            print(f"Error: Idea {i+1} must have exactly 5 hooks, got {len(idea.get('hooks', []))}", file=sys.stderr)
            return False
    return True


def generate_csv(ideas, output_path):
    """Write ideas with hook variations to CSV."""
    row_count = 0
    # UTF-8 BOM for Excel compatibility
    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
        writer.writeheader()

        for idea in ideas:
            for hook in idea["hooks"]:
                writer.writerow({
                    "Idea #": idea["idea_number"],
                    "Source": idea["source"],
                    "Trending Topic": idea["trending_topic"],
                    "Content Idea": idea["content_idea"],
                    "Hook Type": hook["hook_type"],
                    "Hook Variation": hook["hook_variation"],
                    "Engagement Score": idea.get("engagement_score", ""),
                })
                row_count += 1

    return row_count


def main():
    parser = argparse.ArgumentParser(description="Generate CSV from content ideas JSON")
    parser.add_argument("--input", required=True, help="Input JSON file with ideas and hooks")
    parser.add_argument("--output", required=True, help="Output CSV file path")
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        ideas = json.load(f)

    if not validate_input(ideas):
        sys.exit(1)

    row_count = generate_csv(ideas, args.output)
    print(f"Generated {row_count} rows from {len(ideas)} ideas -> {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
