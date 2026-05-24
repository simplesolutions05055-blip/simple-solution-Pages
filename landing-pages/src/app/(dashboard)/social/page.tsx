"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getSocialPosts, saveSocialPost, togglePostStar, getBusiness, generateId } from "@/lib/store";
import type { SocialPost } from "@/types";

const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: "📸", color: "#E1306C" },
  { id: "facebook", name: "Facebook", icon: "👤", color: "#1877F2" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "#0A66C2" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "#000000" },
];

const AI_PROMPTS = [
  "כתוב פוסט מוטיבציוני על העסק",
  "צור פוסט על מבצע/הנחה מיוחדים",
  "כתוב פוסט 'לפני ואחרי' על שירות",
  "צור פוסט הכרות עם הצוות",
  "כתוב טיפ מקצועי מהתחום",
  "צור פוסט של ביקורת/המלצה של לקוח",
];

export default function SocialPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "create" | "analytics">("posts");
  const [form, setForm] = useState({ platform: "instagram" as SocialPost["platform"], content: "", scheduled_at: "" });
  const [filter, setFilter] = useState("all");
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  useEffect(() => {
    setPosts(getSocialPosts());
  }, []);

  async function generatePost() {
    if (!aiPrompt) return;
    setGenerating(true);
    try {
      const biz = getBusiness();
      const res = await fetch("/api/ai/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          platform: form.platform,
          businessName: biz.name,
          brandVoice: biz.brand_book?.tone_of_voice,
          keywords: biz.brand_book?.keywords,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm((f) => ({ ...f, content: data.content }));
      } else {
        // Demo fallback
        setForm((f) => ({
          ...f,
          content: `✨ ${aiPrompt}\n\n${biz.name} מביא לכם פתרונות מהטובים ביותר בתחום!\n\nצרו קשר עוד היום ותגלו את ההבדל 🚀\n\n#${biz.industry || "עסקים"} #${biz.name?.replace(/\s/g, "")} #ישראל`,
        }));
      }
    } catch {
      const biz = getBusiness();
      setForm((f) => ({
        ...f,
        content: `✨ ${aiPrompt}\n\n${biz.name} מביא לכם את הפתרון הטוב ביותר! 🌟\n\nצרו קשר עוד היום 📞\n\n#עסקים #שיווק #ישראל`,
      }));
    }
    setGenerating(false);
  }

  function savePost(status: SocialPost["status"]) {
    if (!form.content.trim()) return;
    const biz = getBusiness();
    const post: SocialPost = {
      id: generateId(),
      business_id: biz.id,
      platform: form.platform,
      content: form.content,
      media_urls: [],
      status,
      scheduled_at: form.scheduled_at || undefined,
      starred: false,
      created_at: new Date().toISOString(),
    };
    saveSocialPost(post);
    setPosts(getSocialPosts());
    setForm({ platform: "instagram", content: "", scheduled_at: "" });
    setActiveTab("posts");
  }

  function handleStar(id: string) {
    togglePostStar(id);
    setPosts(getSocialPosts());
  }

  const filtered = posts.filter((p) => filter === "all" || p.platform === filter || p.status === filter);

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    totalLikes: posts.reduce((s, p) => s + (p.likes || 0), 0),
  };

  return (
    <>
      <Header title="סושיאל מדיה" subtitle="ניהול ותזמון פוסטים" />
      <div style={{ padding: "24px 28px 48px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "פוסטים", value: stats.total, icon: "📝" },
            { label: "פורסמו", value: stats.published, icon: "✅" },
            { label: "מתוזמנים", value: stats.scheduled, icon: "📅" },
            { label: "סה״כ לייקים", value: stats.totalLikes, icon: "❤️" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(251,247,238,0.4)" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {([
            { id: "posts", label: "📱 פוסטים" },
            { id: "create", label: "✏️ צור פוסט" },
            { id: "analytics", label: "📊 נתונים" },
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

        {/* Posts Grid */}
        {activeTab === "posts" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { id: "all", label: "הכל" },
                ...PLATFORMS.map((p) => ({ id: p.id, label: `${p.icon} ${p.name}` })),
                { id: "published", label: "✅ פורסם" },
                { id: "scheduled", label: "📅 מתוזמן" },
                { id: "draft", label: "📝 טיוטה" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: filter === f.id ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.12)",
                    background: filter === f.id ? "rgba(61,222,210,0.1)" : "transparent",
                    color: filter === f.id ? "var(--teal)" : "rgba(251,247,238,0.5)",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: filter === f.id ? 700 : 400,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {filtered.map((post) => {
                const platform = PLATFORMS.find((p) => p.id === post.platform);
                return (
                  <div
                    key={post.id}
                    style={{
                      background: "var(--navy-card)",
                      border: "1px solid rgba(61,222,210,0.08)",
                      borderRadius: 14,
                      padding: 18,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.08)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{platform?.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: platform?.color || "var(--cream)" }}>
                          {platform?.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{
                          fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 700,
                          background: post.status === "published" ? "rgba(34,197,94,0.1)" : post.status === "scheduled" ? "rgba(61,222,210,0.1)" : "rgba(255,255,255,0.06)",
                          color: post.status === "published" ? "#22C55E" : post.status === "scheduled" ? "var(--teal)" : "rgba(251,247,238,0.4)",
                        }}>
                          {post.status === "published" ? "פורסם" : post.status === "scheduled" ? "מתוזמן" : "טיוטה"}
                        </span>
                        <button
                          onClick={() => handleStar(post.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: post.starred ? "#F5C842" : "rgba(251,247,238,0.2)" }}
                        >
                          {post.starred ? "★" : "☆"}
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(251,247,238,0.75)", lineHeight: 1.6, marginBottom: 12, minHeight: 60 }}>
                      {post.content.slice(0, 140)}{post.content.length > 140 ? "..." : ""}
                    </p>
                    {post.status === "published" && (
                      <div style={{ display: "flex", gap: 14, fontSize: 12, color: "rgba(251,247,238,0.4)" }}>
                        <span>❤️ {post.likes || 0}</span>
                        <span>💬 {post.comments || 0}</span>
                        <span>↗️ {post.shares || 0}</span>
                      </div>
                    )}
                    {post.scheduled_at && (
                      <div style={{ fontSize: 12, color: "var(--teal)" }}>
                        📅 {new Date(post.scheduled_at).toLocaleDateString("he-IL")}
                      </div>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "rgba(251,247,238,0.3)" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📱</div>
                  <p>לא נמצאו פוסטים</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Create Post */}
        {activeTab === "create" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22, marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🤖 יצירה עם AI</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                  {AI_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAiPrompt(p)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 20,
                        border: aiPrompt === p ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.12)",
                        background: aiPrompt === p ? "rgba(61,222,210,0.08)" : "transparent",
                        color: aiPrompt === p ? "var(--teal)" : "rgba(251,247,238,0.55)",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="או כתוב בקשה מותאמת אישית..."
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", marginBottom: 12 }}
                />
                <button
                  onClick={generatePost}
                  disabled={!aiPrompt || generating}
                  style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: generating || !aiPrompt ? "not-allowed" : "pointer", opacity: !aiPrompt ? 0.5 : 1, fontSize: 14 }}
                >
                  {generating ? "⏳ יוצר..." : "✨ צור פוסט"}
                </button>
              </div>

              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>פרטי הפוסט</h3>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>פלטפורמה</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setForm((f) => ({ ...f, platform: p.id as SocialPost["platform"] }))}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 8,
                          border: form.platform === p.id ? `1.5px solid ${p.color}` : "1px solid rgba(61,222,210,0.12)",
                          background: form.platform === p.id ? `${p.color}15` : "transparent",
                          color: form.platform === p.id ? p.color : "rgba(251,247,238,0.5)",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: form.platform === p.id ? 700 : 400,
                        }}
                      >
                        {p.icon} {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>
                    תוכן ({form.content.length}/2200)
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    placeholder="כתוב את הפוסט שלך כאן..."
                    rows={8}
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "12px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 6 }}>תזמון פרסום</label>
                  <input
                    type="datetime-local"
                    value={form.scheduled_at}
                    onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => savePost("draft")} style={{ flex: 1, background: "transparent", border: "1.5px solid rgba(61,222,210,0.25)", borderRadius: 10, padding: "10px", color: "rgba(251,247,238,0.7)", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                    💾 טיוטה
                  </button>
                  <button onClick={() => savePost("scheduled")} style={{ flex: 1, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                    📅 תזמן
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>👁️ תצוגה מקדימה</h3>
              <div style={{ background: "#1A1A2E", borderRadius: 16, padding: 16, minHeight: 300 }}>
                {/* Mock Instagram Post */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    {getBusiness()?.name?.slice(0, 1) || "ע"}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{getBusiness()?.name || "העסק שלי"}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>עכשיו</div>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 48, color: "rgba(255,255,255,0.2)" }}>
                  🖼️
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {form.content || "הטקסט של הפוסט יופיע כאן..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📊 ביצועים לפי פלטפורמה</h3>
              {PLATFORMS.map((p) => {
                const platformPosts = posts.filter((post) => post.platform === p.id && post.status === "published");
                const totalLikes = platformPosts.reduce((s, post) => s + (post.likes || 0), 0);
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 22, width: 30 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.name}</span>
                        <span style={{ fontSize: 12, color: "rgba(251,247,238,0.4)" }}>{platformPosts.length} פוסטים • {totalLikes} לייקים</span>
                      </div>
                      <div style={{ height: 6, background: "var(--navy)", borderRadius: 6 }}>
                        <div style={{ height: "100%", width: `${Math.min(platformPosts.length * 20, 100)}%`, background: p.color, borderRadius: 6 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>⭐ תכנים מועדפים</h3>
              {posts.filter((p) => p.starred).map((post) => {
                const platform = PLATFORMS.find((pl) => pl.id === post.platform);
                return (
                  <div key={post.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(61,222,210,0.05)", display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{platform?.icon}</span>
                    <p style={{ fontSize: 13, color: "rgba(251,247,238,0.7)", flex: 1 }}>{post.content.slice(0, 80)}...</p>
                    <span style={{ color: "#F5C842", fontSize: 14 }}>★</span>
                  </div>
                );
              })}
              {posts.filter((p) => p.starred).length === 0 && (
                <p style={{ fontSize: 13, color: "rgba(251,247,238,0.3)" }}>
                  סמן פוסטים בכוכב כדי שהמערכת תלמד מהם
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
