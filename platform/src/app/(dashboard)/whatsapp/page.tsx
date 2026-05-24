"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getWhatsAppCampaigns, saveWhatsAppCampaign, getContacts, getBusiness, generateId } from "@/lib/store";
import type { WhatsAppCampaign } from "@/types";

const STATUS_CONFIG = {
  draft: { label: "טיוטה", color: "rgba(251,247,238,0.45)", bg: "rgba(255,255,255,0.06)" },
  scheduled: { label: "מתוזמן", color: "#3DDED2", bg: "rgba(61,222,210,0.1)" },
  sent: { label: "נשלח", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
  failed: { label: "נכשל", color: "#FF4D6D", bg: "rgba(255,77,109,0.1)" },
};

const TEMPLATES = [
  { icon: "🎉", name: "ברכת חג", text: "שלום {שם},\n\nבאה חגיגה! 🎉 {שם_עסק} מאחל לך ולמשפחתך חג שמח ומבורך.\n\nלהזמנות: {קישור}" },
  { icon: "💬", name: "עדכון שירות", text: "שלום {שם},\n\nרצינו לעדכן אותך על שינוי חשוב:\n{הודעה}\n\nלכל שאלה אנחנו כאן! 😊" },
  { icon: "🔥", name: "מבצע מיוחד", text: "שלום {שם}! 🔥\n\nמבצע בלעדי ל-24 שעות!\n{פרטי_מבצע}\n\nלניצול המבצע: {קישור}\n*תוקף מוגבל*" },
  { icon: "⭐", name: "בקשת ביקורת", text: "שלום {שם},\n\nתודה שבחרת ב{שם_עסק}!\nנשמח מאוד אם תשאיר ביקורת קצרה:\n{קישור_ביקורת}\n\n🙏 תודה רבה!" },
  { icon: "📅", name: "תזכורת פגישה", text: "שלום {שם},\n\nתזכורת לפגישה שלנו:\n📅 {תאריך}\n⏰ {שעה}\n📍 {כתובת}\n\nלאישור/ביטול: {טלפון}" },
];

export default function WhatsAppPage() {
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [contactCount, setContactCount] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  const [form, setForm] = useState({ name: "", message: "", scheduled_at: "" });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"campaigns" | "compose">("campaigns");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setCampaigns(getWhatsAppCampaigns());
    setContactCount(getContacts().length);
  }, []);

  function selectTemplate(i: number) {
    setSelectedTemplate(i);
    const biz = getBusiness();
    setForm((f) => ({
      ...f,
      message: TEMPLATES[i].text.replace("{שם_עסק}", biz.name || "העסק שלנו"),
    }));
  }

  function saveCampaign(status: "draft" | "scheduled") {
    if (!form.name.trim() || !form.message.trim()) return;
    const biz = getBusiness();
    const camp: WhatsAppCampaign = {
      id: generateId(),
      business_id: biz.id,
      name: form.name,
      message: form.message,
      recipient_count: contactCount,
      sent_count: 0,
      status,
      scheduled_at: form.scheduled_at || undefined,
      created_at: new Date().toISOString(),
    };
    saveWhatsAppCampaign(camp);
    setCampaigns(getWhatsAppCampaigns());
    setForm({ name: "", message: "", scheduled_at: "" });
    setSelectedTemplate(null);
    setActiveTab("campaigns");
  }

  return (
    <>
      <Header title="ווצאפ — דיוור ישיר" subtitle="שלח הודעות וניהול תפוצות" />
      <div style={{ padding: "24px 28px 48px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "קמפיינים", value: campaigns.length, icon: "📋" },
            { label: "נשלחו", value: campaigns.filter((c) => c.status === "sent").length, icon: "✅" },
            { label: "טיוטות", value: campaigns.filter((c) => c.status === "draft").length, icon: "📝" },
            { label: "אנשי קשר", value: contactCount, icon: "👥" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--cream)" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(251,247,238,0.4)" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {([
            { id: "campaigns", label: "📋 קמפיינים" },
            { id: "compose", label: "✏️ הודעה חדשה" },
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

        {/* Campaigns List */}
        {activeTab === "campaigns" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {campaigns.map((camp) => {
              const s = STATUS_CONFIG[camp.status];
              const deliveryRate = camp.sent_count > 0 ? Math.round((camp.sent_count / camp.recipient_count) * 100) : 0;
              return (
                <div
                  key={camp.id}
                  style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "flex-start", gap: 16 }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    💬
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{camp.name}</span>
                      <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
                        {s.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 10, lineHeight: 1.5 }}>
                      {camp.message.slice(0, 120)}{camp.message.length > 120 ? "..." : ""}
                    </p>
                    <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(251,247,238,0.4)" }}>
                      <span>👥 {camp.recipient_count} נמענים</span>
                      {camp.status === "sent" && <span>✅ {deliveryRate}% נמסרו</span>}
                      {camp.scheduled_at && <span>📅 {new Date(camp.scheduled_at).toLocaleDateString("he-IL")}</span>}
                    </div>
                  </div>
                  {camp.status === "sent" && camp.recipient_count > 0 && (
                    <div style={{ textAlign: "center", minWidth: 60 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E" }}>{deliveryRate}%</div>
                      <div style={{ fontSize: 10, color: "rgba(251,247,238,0.3)" }}>מסירה</div>
                    </div>
                  )}
                </div>
              );
            })}
            {campaigns.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(251,247,238,0.3)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
                <p>עדיין לא יצרת קמפיין ווצאפ</p>
                <button onClick={() => setActiveTab("compose")} style={{ marginTop: 16, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  צור קמפיין ראשון
                </button>
              </div>
            )}
          </div>
        )}

        {/* Compose */}
        {activeTab === "compose" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Left: Form */}
            <div>
              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>פרטי הקמפיין</h3>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>שם הקמפיין</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="למשל: קמפיין קיץ 2025"
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>
                    תוכן ההודעה ({form.message.length}/1024)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="כתוב כאן את ההודעה שלך..."
                    rows={8}
                    maxLength={1024}
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "12px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>תזמון (אופציונלי)</label>
                  <input
                    type="datetime-local"
                    value={form.scheduled_at}
                    onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => saveCampaign("draft")}
                    style={{ flex: 1, background: "transparent", border: "1.5px solid rgba(61,222,210,0.25)", borderRadius: 10, padding: "10px", color: "rgba(251,247,238,0.7)", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
                  >
                    💾 שמור טיוטה
                  </button>
                  <button
                    onClick={() => saveCampaign("scheduled")}
                    style={{ flex: 1, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                  >
                    📤 תזמן שליחה
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Templates + Preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>📋 תבניות מוכנות</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => selectTemplate(i)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: selectedTemplate === i ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.1)",
                        background: selectedTemplate === i ? "rgba(61,222,210,0.06)" : "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        textAlign: "right",
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{t.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: selectedTemplate === i ? 700 : 400, color: selectedTemplate === i ? "var(--teal)" : "rgba(251,247,238,0.7)" }}>
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp Preview */}
              {form.message && (
                <div style={{ background: "var(--navy-card)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#25D366", marginBottom: 12 }}>👁️ תצוגה מקדימה</div>
                  <div style={{ background: "#1A1A2E", borderRadius: 12, padding: 16 }}>
                    <div style={{ background: "#075E54", borderRadius: "12px 12px 0 12px", padding: "10px 14px", display: "inline-block", maxWidth: "85%" }}>
                      <p style={{ fontSize: 13, color: "#FFF", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                        {form.message}
                      </p>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4, textAlign: "left" }}>
                        {new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })} ✓✓
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(251,247,238,0.35)", marginTop: 8 }}>
                    ייראה כך אצל {contactCount} נמענים
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
