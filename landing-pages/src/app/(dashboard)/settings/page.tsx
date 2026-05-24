"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getBusiness, saveBusiness } from "@/lib/store";
import type { Business } from "@/types";

const INDUSTRIES = [
  "בריאות ויופי", "מסעדות ומזון", "אופנה ואקססוריז", "ריהוט ועיצוב הבית",
  "חינוך ואקדמיה", "משפטים ופיננסים", "נדל״ן ובנייה", "טכנולוגיה ותוכנה",
  "שיווק ופרסום", "תיירות ונסיעות", "ספורט וכושר", "שירותים מקצועיים",
  "יבוא ויצוא", "ייצור ותעשייה", "אחר",
];

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [form, setForm] = useState({ name: "", tagline: "", industry: "", website: "", phone: "", address: "" });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"business" | "brand" | "integrations" | "account">("business");

  useEffect(() => {
    const biz = getBusiness();
    setBusiness(biz);
    setForm({
      name: biz.name || "",
      tagline: biz.tagline || "",
      industry: biz.industry || "",
      website: biz.website || "",
      phone: biz.phone || "",
      address: biz.address || "",
    });
  }, []);

  function handleSave() {
    saveBusiness(form);
    setBusiness(getBusiness());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const bb = business?.brand_book;

  return (
    <>
      <Header title="הגדרות" subtitle="ניהול פרטי העסק והמותג" />
      <div style={{ padding: "24px 28px 48px", maxWidth: 800, margin: "0 auto" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {([
            { id: "business", label: "🏢 עסק" },
            { id: "brand", label: "📖 מותג" },
            { id: "integrations", label: "🔗 חיבורים" },
            { id: "account", label: "👤 חשבון" },
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

        {/* Business Tab */}
        {activeTab === "business" && (
          <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 16, padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>פרטי העסק</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                { label: "שם העסק *", field: "name", placeholder: "שם העסק שלך" },
                { label: "תחום עיסוק", field: "industry", type: "select" as const },
                { label: "סלוגן / קו עסקי", field: "tagline", placeholder: "משפט קצר שמסכם את העסק" },
                { label: "אתר אינטרנט", field: "website", placeholder: "www.example.co.il" },
                { label: "טלפון", field: "phone", placeholder: "054-1234567" },
                { label: "כתובת", field: "address", placeholder: "רחוב, עיר" },
              ].map((f) => (
                <div key={f.field} style={["tagline", "name"].includes(f.field) ? { gridColumn: "1 / -1" } : {}}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.6)", marginBottom: 6 }}>{f.label}</label>
                  {f.type === "select" ? (
                    <select
                      value={form[f.field as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.field]: e.target.value }))}
                      style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: "11px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                    >
                      <option value="">בחר תחום...</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={form[f.field as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.field]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: "11px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handleSave}
                style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}
              >
                💾 שמור שינויים
              </button>
              {saved && <span style={{ fontSize: 14, color: "#22C55E" }}>✅ נשמר בהצלחה!</span>}
            </div>
          </div>
        )}

        {/* Brand Tab */}
        {activeTab === "brand" && (
          <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 16, padding: 28 }}>
            {bb?.completed ? (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>ספר המותג שלך</h3>
                  <span style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>✅ מוכן</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: "ערכי מותג", content: bb.values?.join(" • ") || "" },
                    { label: "קהל יעד", content: bb.target_audience || "" },
                    { label: "קול המותג", content: bb.tone_of_voice || "" },
                    { label: "הצעת ערך ייחודית", content: bb.unique_value || "" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "var(--navy)", borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 12, color: "var(--teal)", fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                      <p style={{ fontSize: 13, color: "rgba(251,247,238,0.75)", lineHeight: 1.5 }}>{item.content || "לא הוגדר"}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                  <a
                    href="/brand-book"
                    style={{ background: "rgba(61,222,210,0.1)", border: "1px solid rgba(61,222,210,0.25)", color: "var(--teal)", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" }}
                  >
                    ✏️ ערוך ספר מותג
                  </a>
                  <button
                    onClick={() => alert("הורדת PDF — עלות 8 ₪")}
                    style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                  >
                    📥 הורד PDF — 8 ₪
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>📖</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>עדיין לא בנית ספר מותג</h3>
                <p style={{ fontSize: 14, color: "rgba(251,247,238,0.5)", marginBottom: 24, lineHeight: 1.6 }}>
                  ספר המותג הוא הבסיס של כל המערכת. בנה אותו עכשיו ותחסוך המון זמן בכל פעולה עתידית.
                </p>
                <a
                  href="/brand-book"
                  style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 12, padding: "12px 28px", fontWeight: 800, cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" }}
                >
                  📖 בנה ספר מותג עכשיו
                </a>
              </div>
            )}
          </div>
        )}

        {/* Integrations */}
        {activeTab === "integrations" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "💬", name: "ווצאפ Business", desc: "חיבור ל-WhatsApp Business API לשליחת הודעות", status: "not_connected", color: "#25D366" },
              { icon: "📸", name: "Instagram", desc: "פרסום אוטומטי ועדכון ביצועים", status: "not_connected", color: "#E1306C" },
              { icon: "👤", name: "Facebook", desc: "ניהול עמוד ופרסום מודעות", status: "not_connected", color: "#1877F2" },
              { icon: "💼", name: "LinkedIn", desc: "פוסטים מקצועיים ו-B2B", status: "not_connected", color: "#0A66C2" },
              { icon: "🔍", name: "Google Search Console", desc: "מעקב ביצועי SEO ועמדות", status: "not_connected", color: "#4285F4" },
              { icon: "📊", name: "Google Analytics", desc: "סטטיסטיקות אתר ותנועה", status: "not_connected", color: "#E37400" },
              { icon: "💳", name: "Stripe", desc: "קבלת תשלומים ורכישת PDF", status: "not_connected", color: "#635BFF" },
            ].map((integration) => (
              <div
                key={integration.name}
                style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${integration.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {integration.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{integration.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(251,247,238,0.45)" }}>{integration.desc}</div>
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "1.5px solid rgba(61,222,210,0.25)",
                    borderRadius: 9,
                    padding: "8px 16px",
                    color: "var(--teal)",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => alert(`חיבור ${integration.name} — בקרוב!`)}
                >
                  🔗 חבר
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Account */}
        {activeTab === "account" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📦 החבילה שלך</h3>
              <div style={{ background: "linear-gradient(135deg, rgba(61,222,210,0.1) 0%, rgba(61,222,210,0.03) 100%)", border: "1px solid rgba(61,222,210,0.2)", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--teal)", marginBottom: 4 }}>חבילת Starter</div>
                  <div style={{ fontSize: 13, color: "rgba(251,247,238,0.55)" }}>ניסיון חינמי • 14 ימים</div>
                </div>
                <button style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  🚀 שדרג
                </button>
              </div>
            </div>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🔔 התראות</h3>
              {[
                { label: "התראות מייל על קמפיינים", key: "email" },
                { label: "עדכונים על תכנים חדשים", key: "content" },
                { label: "דוח שבועי ביצועים", key: "report" },
              ].map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(61,222,210,0.05)" }}>
                  <span style={{ fontSize: 14, color: "rgba(251,247,238,0.75)" }}>{item.label}</span>
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: "rgba(61,222,210,0.2)", cursor: "pointer", position: "relative" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--teal)", position: "absolute", top: 2, right: 2, transition: "right 0.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
