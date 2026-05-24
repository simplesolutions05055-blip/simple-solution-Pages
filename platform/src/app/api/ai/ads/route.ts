import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "No API key" }, { status: 500 });

    const prompt = `כתוב קופי למודעה פרסומית בעברית.
עסק: ${body.businessName}
תחום: ${body.industry || "כללי"}
שם המודעה/נושא: ${body.name}
${body.template ? `תבנית: ${body.template}` : ""}

כתוב קופי קצר ומשפיע. החזר JSON:
{
  "content": "טקסט המודעה (3-4 שורות קצרות)",
  "cta": "טקסט כפתור קריאה לפעולה (3-5 מילים)"
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
        max_tokens: 256,
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
