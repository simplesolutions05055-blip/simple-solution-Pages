import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  field?: string;
  message?: string;
  hp?: string; // honeypot
};

function isValidPhone(s: string) {
  return /^[0-9\-\+\s]{9,15}$/.test(s.trim());
}

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ error: "JSON לא תקין" }, { status: 400 });
  }

  if (body.hp && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "שם חסר או קצר מדי" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "מספר טלפון לא תקין" }, { status: 400 });
  }

  const lead = {
    name,
    phone,
    email: (body.email ?? "").trim() || null,
    field: (body.field ?? "").trim() || null,
    message: (body.message ?? "").trim() || null,
    receivedAt: new Date().toISOString(),
    source: "landing.amir-sudai",
  };

  console.log("[A.S lead]", JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("[A.S lead] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
