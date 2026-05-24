import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const prompt = `אתה מומחה בבניית מותגים עסקיים בישראל. בהתבסס על המידע הבא, שפר וכתוב מחדש את הרכיבים של ספר המותג.

שם עסק: ${body.name}
תחום: ${body.industry}
סיפור: ${body.story}
חזון: ${body.vision}
ייעוד: ${body.mission}
ערכים: ${body.values?.join(", ")}
קהל יעד: ${body.target_audience}
קול המותג: ${body.tone}
הצעת ערך ייחודית: ${body.unique_value}
מתחרים: ${body.competitors}

החזר JSON בלבד עם המבנה הבא (ללא markdown):
{
  "story": "גרסה משופרת של הסיפור — 2-3 משפטים מרגשים",
  "vision": "חזון מחודד — משפט אחד חזק",
  "mission": "ייעוד מחודד — משפט אחד",
  "target_audience": "תיאור קהל יעד מפורט",
  "unique_value": "הצעת ערך ייחודית חזקה — 2-3 משפטים"
}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "AI error" }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "{}";

    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
