import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "No API key" }, { status: 500 });

    const typeMap: Record<string, string> = {
      how_to: "מדריך שלב-אחר-שלב",
      tips: "רשימת טיפים",
      comparison: "השוואה",
      news: "חדשות תחום",
      case_study: "מקרה בוחן",
      faq: "שאלות ותשובות",
    };

    const prompt = `כתוב מאמר SEO מלא בעברית לאתר של ${body.businessName}.
כותרת: ${body.title}
סוג: ${typeMap[body.type] || body.type}
תחום: ${body.industry || "כללי"}
מילות מפתח: ${body.keywords || "כלליות"}
אורך יעד: ${body.targetLength || 1000} מילים
קול מותג: ${body.brandVoice || "מקצועי"}

כתוב מאמר SEO שכולל:
1. כותרת ראשית (H1)
2. כותרות משנה (H2/H3)
3. תוכן איכותי ומועיל
4. שילוב טבעי של מילות המפתח
5. סיכום עם CTA

החזר JSON:
{
  "title": "כותרת SEO",
  "content": "תוכן המאמר המלא",
  "meta_description": "תיאור meta (150 תווים)",
  "keywords": ["מילה1", "מילה2", "מילה3"],
  "word_count": 1000
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
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return NextResponse.json({ error: "AI error" }, { status: 500 });

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
