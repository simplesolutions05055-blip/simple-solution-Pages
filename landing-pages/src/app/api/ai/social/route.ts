import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const toneMap: Record<string, string> = {
      professional: "מקצועי ורשמי",
      friendly: "ידידותי ונגיש",
      energetic: "נמרץ ומלהיב",
      inspiring: "מעורר השראה",
      expert: "מומחה ומוביל",
      playful: "שובבי ויצירתי",
    };

    const prompt = `כתוב פוסט לרשת חברתית בעברית עבור ${body.businessName}.
פלטפורמה: ${body.platform}
בקשה: ${body.prompt}
קול מותג: ${toneMap[body.brandVoice] || body.brandVoice || "ידידותי"}
${body.keywords?.length ? `מילות מפתח: ${body.keywords.join(", ")}` : ""}

דרישות:
- כתוב בעברית
- מותאם לפלטפורמה ${body.platform}
- כולל אמוג'י רלוונטיים
- כולל hashtags רלוונטיים בסוף
- אורך מתאים לפלטפורמה (אינסטגרם: קצר-בינוני, פייסבוק: בינוני)
- החזר JSON: { "content": "..." }`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
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
      else parsed = { content: text };
    }
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
