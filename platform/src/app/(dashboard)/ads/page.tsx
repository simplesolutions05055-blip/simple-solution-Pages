"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getAdCreatives, saveAdCreative, toggleAdStar, getBusiness, generateId } from "@/lib/store";
import type { AdCreative } from "@/types";

const FORMATS = [
  { id: "square", label: "ריבוע 1:1", size: "1080×1080", platforms: ["Instagram", "Facebook"] },
  { id: "story", label: "סטורי 9:16", size: "1080×1920", platforms: ["Instagram", "TikTok"] },
  { id: "banner", label: "באנר 16:9", size: "1920×1080", platforms: ["Facebook", "YouTube"] },
  { id: "portrait", label: "פורטרט 4:5", size: "1080×1350", platforms: ["Instagram"] },
];

const AD_TEMPLATES = [
  { icon: "🔥", name: "מבצע מיוחד", cta: "קנה עכשיו", headline: "מבצע בלעדי!", sub: "50% הנחה על כל המוצרים" },
  { icon: "⭐", name: "המלצת לקוח", cta: "קרא עוד", headline: "לקוחות אוהבים אותנו", sub: "\"השירות הטוב ביותר שקיבלתי\"" },
  { icon: "🚀", name: "הכרות מותג", cta: "גלה עוד", headline: "הכירו אותנו", sub: "10 שנות ניסיון. אלפי לקוחות מרוצים." },
  { icon: "🎯", name: "קריאה לפעולה", cta: "צור קשר", headline: "מוכן להתחיל?", sub: "ייעוץ חינמי ב-24 שעות" },
  { icon: "📱", name: "מוצר/שירות", cta: "פרטים נוספים", headline: "הפתרון שחיפשת", sub: "פשוט, מהיר, ויעיל" },
  { icon: "💡", name: "טיפ מקצועי", cta: "עוד טיפים", headline: "טיפ השבוע", sub: "דעו יותר, עשו יותר" },
];

const PALETTES = [
  { colors: ["#0F1738", "#3DDED2", "#FBF7EE"], name: "Simple Solution" },
  { colors: ["#1A1A2E", "#E94560", "#FFF"], name: "אדום לבן" },
  { colors: ["#1B4332", "#52B788", "#FFF"], name: "ירוק טבעי" },
  { colors: ["#2D0066", "#AA55FF", "#FFF"], name: "סגול יצירתי" },
  { colors: ["#7A2900", "#FF9A3C", "#FFF"], name: "כתום חם" },
  { colors: ["#0A66C2", "#FFF", "#333"], name: "כחול מקצועי" },
];

export default function AdsPage() {
  const [ads, setAds] = useState<AdCreative[]>([]);
  const [activeTab, setActiveTab] = useState<"gallery" | "create">("gallery");
  const [form, setForm] = useState({
    name: "",
    type: "image" as AdCreative["type"],
    platform: "instagram",
    content: "",
    cta: "",
    template: null as number | null,
    format: "square",
    palette: 0,
  });
  const [generating, setGenerating] = useState(false);

  useEffect(() => { setAds(getAdCreatives()); }, []);

  async function generateAdCopy() {
    if (!form.name) return;
    setGenerating(true);
    const template = form.template !== null ? AD_TEMPLATES[form.template] : null;
    const biz = getBusiness();
    try {
      const res = await fetch("/api/ai/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, template: template?.name, businessName: biz.name, industry: biz.industry }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm((f) => ({ ...f, content: data.content, cta: data.cta }));
      } else {
        setForm((f) => ({
          ...f,
          content: template ? `${template.headline}\n\n${template.sub}\n\n${biz.name} — ${biz.industry || ""}` : `${biz.name}\n\n${form.name}\n\nצרו קשר עוד היום!`,
          cta: template?.cta || "לחץ לפרטים",
        }));
      }
    } catch {
      setForm((f) => ({
        ...f,
        content: `${biz.name}\n\n${form.name}`,
        cta: template?.cta || "לחץ לפרטים",
      }));
    }
    setGenerating(false);
  }

  function saveAd() {
    if (!form.content.trim()) return;
    const biz = getBusiness();
    const ad: AdCreative = {
      id: generateId(),
      business_id: biz.id,
      name: form.name || "מודעה חדשה",
      type: form.type,
      platform: form.platform,
      content: form.content,
      cta: form.cta,
      starred: false,
      created_at: new Date().toISOString(),
    };
    saveAdCreative(ad);
    setAds(getAdCreatives());
    setForm({ name: "", type: "image", platform: "instagram", content: "", cta: "", template: null, format: "square", palette: 0 });
    setActiveTab("gallery");
  }

  function handleStar(id: string) {
    toggleAdStar(id);
    setAds(getAdCreatives());
  }

  const currentPalette = PALETTES[form.palette];

  return (
    <>
      <Header title="עורך מודעות" subtitle="עצב מודעות ופוסטים פרסומיים" />
      <div style={{ padding: "24px 28px 48px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {([
            { id: "gallery", label: "🖼️ גלריה" },
            { id: "create", label: "✨ צור מודעה" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: activeTab === tab.id ? "rgba(61,222,210,0.12)" : "transparent", color: activeTab === tab.id ? "var(--teal)" : "rgba(251,247,238,0.5)", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {ads.map((ad) => (
              <div
                key={ad.id}
                style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, overflow: "hidden", transition: "all 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.25)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {/* Mock Ad Visual */}
                <div style={{ background: "linear-gradient(135deg, #0F1738 0%, #1A2550 100%)", aspectRatio: "1.6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>
                    {getBusiness()?.name?.toUpperCase() || "SIMPLE SOLUTION"}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "white", textAlign: "center", marginBottom: 6, lineHeight: 1.3 }}>
                    {ad.content.split("\n")[0]}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
                    {ad.content.split("\n").slice(1, 3).join(" ")}
                  </div>
                  {ad.cta && (
                    <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", background: "var(--teal)", color: "var(--navy)", borderRadius: 6, padding: "5px 14px", fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>
                      {ad.cta}
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--cream)", marginBottom: 2 }}>{ad.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(251,247,238,0.35)" }}>{ad.platform} • {ad.type}</div>
                    </div>
                    <button
                      onClick={() => handleStar(ad.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: ad.starred ? "#F5C842" : "rgba(251,247,238,0.2)" }}
                    >
                      {ad.starred ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {ads.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "rgba(251,247,238,0.3)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎨</div>
                <p>עדיין אין מודעות</p>
                <button onClick={() => setActiveTab("create")} style={{ marginTop: 16, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  צור מודעה ראשונה
                </button>
              </div>
            )}
          </div>
        )}

        {/* Create */}
        {activeTab === "create" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Left: Settings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📋 תבנית מודעה</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {AD_TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setForm((f) => ({ ...f, template: i, name: t.name }))}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: form.template === i ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.1)",
                        background: form.template === i ? "rgba(61,222,210,0.06)" : "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        textAlign: "right",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{t.icon}</span>
                      <span style={{ fontSize: 13, color: form.template === i ? "var(--teal)" : "rgba(251,247,238,0.65)", fontWeight: form.template === i ? 700 : 400 }}>{t.name}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>שם המודעה</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="שם פנימי לניהול"
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "9px 12px", color: "var(--cream)", fontSize: 13, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>

                <button
                  onClick={generateAdCopy}
                  disabled={generating}
                  style={{ background: "rgba(61,222,210,0.12)", color: "var(--teal)", border: "1px solid rgba(61,222,210,0.25)", borderRadius: 9, padding: "9px 16px", fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", fontSize: 13, width: "100%" }}
                >
                  {generating ? "⏳ יוצר..." : "🤖 יצור קופי אוטומטי"}
                </button>
              </div>

              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>🎨 פלטת צבעים</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {PALETTES.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setForm((f) => ({ ...f, palette: i }))}
                      style={{ padding: 10, borderRadius: 10, border: form.palette === i ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.1)", background: form.palette === i ? "rgba(61,222,210,0.06)" : "transparent", cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", gap: 4, marginBottom: 5, justifyContent: "center" }}>
                        {p.colors.map((c) => (
                          <div key={c} style={{ width: 16, height: 16, borderRadius: 4, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: form.palette === i ? "var(--teal)" : "rgba(251,247,238,0.45)" }}>{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>✏️ תוכן</h3>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="טקסט המודעה..."
                  rows={5}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: 12, color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical", marginBottom: 10 }}
                />
                <input
                  value={form.cta}
                  onChange={(e) => setForm((f) => ({ ...f, cta: e.target.value }))}
                  placeholder="כפתור קריאה לפעולה (CTA)"
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "9px 12px", color: "var(--cream)", fontSize: 13, width: "100%", outline: "none", fontFamily: "inherit" }}
                />
              </div>

              <button
                onClick={saveAd}
                style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, cursor: "pointer", fontSize: 15 }}
              >
                💾 שמור מודעה
              </button>
            </div>

            {/* Right: Preview */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>👁️ תצוגה מקדימה</h3>
              <div
                style={{
                  background: `linear-gradient(135deg, ${currentPalette.colors[0]} 0%, ${currentPalette.colors[1]}40 100%)`,
                  borderRadius: 16,
                  aspectRatio: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 28,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background pattern */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${currentPalette.colors[1]}30 0%, transparent 60%)` }} />

                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.25em", color: currentPalette.colors[1], fontWeight: 700, marginBottom: 12 }}>
                    {getBusiness()?.name?.toUpperCase() || "SIMPLE SOLUTION"}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: currentPalette.colors[2], lineHeight: 1.2, marginBottom: 8 }}>
                    {form.content.split("\n")[0] || "כותרת המודעה"}
                  </div>
                  <div style={{ fontSize: 14, color: `${currentPalette.colors[2]}90`, marginBottom: 24, lineHeight: 1.5 }}>
                    {form.content.split("\n").slice(1, 3).join("\n") || "תוכן המודעה יופיע כאן"}
                  </div>
                  {form.cta && (
                    <div style={{
                      display: "inline-block",
                      background: currentPalette.colors[1],
                      color: currentPalette.colors[0],
                      borderRadius: 10,
                      padding: "10px 24px",
                      fontSize: 13,
                      fontWeight: 800,
                    }}>
                      {form.cta}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: "rgba(251,247,238,0.35)", textAlign: "center" }}>
                תצוגה מקדימה של המודעה
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
