"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getSeoArticles, saveSeoArticle, toggleArticleStar, getBusiness, generateId } from "@/lib/store";
import type { SeoArticle } from "@/types";

const ARTICLE_TYPES = [
  { id: "how_to", label: "מדריך מעשי", icon: "📋", desc: "מדריך שלב-אחר-שלב" },
  { id: "tips", label: "טיפים", icon: "💡", desc: "רשימת טיפים מועילים" },
  { id: "comparison", label: "השוואה", icon: "⚖️", desc: "השוואה בין אפשרויות" },
  { id: "news", label: "חדשות תחום", icon: "📰", desc: "עדכון וטרנד בתחום" },
  { id: "case_study", label: "מקרה בוחן", icon: "🔬", desc: "סיפור הצלחה" },
  { id: "faq", label: "שאלות נפוצות", icon: "❓", desc: "FAQ מהתחום שלך" },
];

export default function SeoPage() {
  const [articles, setArticles] = useState<SeoArticle[]>([]);
  const [activeTab, setActiveTab] = useState<"articles" | "create" | "keywords">("articles");
  const [form, setForm] = useState({ title: "", type: "how_to", keywords: "", targetLength: 1200 });
  const [generating, setGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Partial<SeoArticle> | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => { setArticles(getSeoArticles()); }, []);

  async function generateArticle() {
    if (!form.title) return;
    setGenerating(true);
    const biz = getBusiness();
    try {
      const res = await fetch("/api/ai/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          type: form.type,
          keywords: form.keywords,
          businessName: biz.name,
          industry: biz.industry,
          targetLength: form.targetLength,
          brandVoice: biz.brand_book?.tone_of_voice,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedArticle(data);
      } else {
        generateFallback();
      }
    } catch {
      generateFallback();
    }
    setGenerating(false);
  }

  function generateFallback() {
    const biz = getBusiness();
    const keywords = form.keywords.split(",").map((k) => k.trim()).filter(Boolean);
    setGeneratedArticle({
      title: form.title,
      content: `# ${form.title}\n\n## מבוא\n\nברוכים הבאים למאמר הזה מאת ${biz.name}. ${form.title} הוא נושא חשוב שמשפיע על ${biz.industry || "התחום שלנו"}.\n\n## נקודה ראשונה\n\nבסעיף זה נתמקד בהיבט החשוב ביותר. כאשר אנחנו מדברים על ${keywords[0] || "הנושא"}, חשוב להבין...\n\n## נקודה שנייה\n\nהיבט נוסף שצריך להכיר הוא...\n\n## טיפים מעשיים\n\n1. טיפ ראשון\n2. טיפ שני\n3. טיפ שלישי\n\n## סיכום\n\nבמאמר זה סקרנו את ${form.title}. ${biz.name} מציע פתרונות מקצועיים בתחום זה. צרו קשר לייעוץ חינמי!`,
      meta_description: `${form.title} — מדריך מקיף מאת ${biz.name}. ${keywords.slice(0, 3).join(", ")}`,
      keywords,
      word_count: 350,
    });
  }

  function saveArticle() {
    if (!generatedArticle) return;
    const biz = getBusiness();
    const article: SeoArticle = {
      id: generateId(),
      business_id: biz.id,
      title: generatedArticle.title || form.title,
      slug: (generatedArticle.title || form.title).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      content: generatedArticle.content || "",
      keywords: generatedArticle.keywords || [],
      meta_description: generatedArticle.meta_description || "",
      status: "draft",
      word_count: generatedArticle.word_count || 0,
      starred: false,
      created_at: new Date().toISOString(),
    };
    saveSeoArticle(article);
    setArticles(getSeoArticles());
    setGeneratedArticle(null);
    setForm({ title: "", type: "how_to", keywords: "", targetLength: 1200 });
    setActiveTab("articles");
  }

  function handleStar(id: string) {
    toggleArticleStar(id);
    setArticles(getSeoArticles());
  }

  const filtered = articles.filter((a) => filter === "all" || a.status === filter);

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    words: articles.reduce((s, a) => s + a.word_count, 0),
  };

  return (
    <>
      <Header title="SEO — קידום אורגני" subtitle="מאמרים ואסטרטגיית תוכן" />
      <div style={{ padding: "24px 28px 48px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "מאמרים", value: stats.total, icon: "📝" },
            { label: "פורסמו", value: stats.published, icon: "✅" },
            { label: "טיוטות", value: stats.draft, icon: "📋" },
            { label: "מילים", value: stats.words.toLocaleString(), icon: "📊" },
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
            { id: "articles", label: "📝 מאמרים" },
            { id: "create", label: "✨ כתוב מאמר" },
            { id: "keywords", label: "🔍 מילות מפתח" },
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

        {/* Articles List */}
        {activeTab === "articles" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[{ id: "all", label: "הכל" }, { id: "published", label: "✅ פורסם" }, { id: "draft", label: "📝 טיוטה" }, { id: "scheduled", label: "📅 מתוזמן" }].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{ padding: "6px 14px", borderRadius: 20, border: filter === f.id ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.12)", background: filter === f.id ? "rgba(61,222,210,0.1)" : "transparent", color: filter === f.id ? "var(--teal)" : "rgba(251,247,238,0.5)", cursor: "pointer", fontSize: 13, fontWeight: filter === f.id ? 700 : 400 }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((article) => (
                <div
                  key={article.id}
                  style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: "18px 22px", display: "flex", gap: 16 }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)", flex: 1 }}>{article.title}</h3>
                      <span style={{
                        fontSize: 10, padding: "3px 10px", borderRadius: 10, fontWeight: 700, flexShrink: 0,
                        background: article.status === "published" ? "rgba(34,197,94,0.1)" : article.status === "scheduled" ? "rgba(61,222,210,0.1)" : "rgba(255,255,255,0.06)",
                        color: article.status === "published" ? "#22C55E" : article.status === "scheduled" ? "var(--teal)" : "rgba(251,247,238,0.4)",
                      }}>
                        {article.status === "published" ? "פורסם" : article.status === "scheduled" ? "מתוזמן" : "טיוטה"}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 10, lineHeight: 1.5 }}>
                      {article.meta_description}
                    </p>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(251,247,238,0.35)" }}>
                      <span>📊 {article.word_count} מילים</span>
                      {article.keywords.slice(0, 3).map((k) => (
                        <span key={k} style={{ background: "rgba(61,222,210,0.08)", color: "var(--teal)", borderRadius: 10, padding: "1px 8px" }}>{k}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <button
                      onClick={() => handleStar(article.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: article.starred ? "#F5C842" : "rgba(251,247,238,0.2)" }}
                    >
                      {article.starred ? "★" : "☆"}
                    </button>
                    <button style={{ background: "rgba(61,222,210,0.08)", border: "none", borderRadius: 7, padding: "5px 12px", color: "var(--teal)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                      ✏️ ערוך
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px", color: "rgba(251,247,238,0.3)" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
                  <p>אין מאמרים עדיין</p>
                  <button onClick={() => setActiveTab("create")} style={{ marginTop: 16, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                    כתוב מאמר ראשון
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Create Article */}
        {activeTab === "create" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Left: Config */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🎯 הגדרות המאמר</h3>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>כותרת המאמר</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="למשל: 10 טיפים לניהול עסק קטן"
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 8 }}>סוג המאמר</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {ARTICLE_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setForm((f) => ({ ...f, type: t.id }))}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 9,
                          border: form.type === t.id ? "1.5px solid var(--teal)" : "1px solid rgba(61,222,210,0.1)",
                          background: form.type === t.id ? "rgba(61,222,210,0.07)" : "rgba(255,255,255,0.02)",
                          cursor: "pointer",
                          textAlign: "right",
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{t.icon}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: form.type === t.id ? "var(--teal)" : "var(--cream)" }}>{t.label}</div>
                          <div style={{ fontSize: 10, color: "rgba(251,247,238,0.35)" }}>{t.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>מילות מפתח (מופרד בפסיקים)</label>
                  <input
                    value={form.keywords}
                    onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
                    placeholder="ניהול עסק, כלים דיגיטליים, ישראל"
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>
                    אורך יעד: {form.targetLength} מילים
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={3000}
                    step={100}
                    value={form.targetLength}
                    onChange={(e) => setForm((f) => ({ ...f, targetLength: Number(e.target.value) }))}
                    style={{ width: "100%", accentColor: "var(--teal)" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(251,247,238,0.3)", marginTop: 2 }}>
                    <span>500</span><span>3000</span>
                  </div>
                </div>

                <button
                  onClick={generateArticle}
                  disabled={!form.title || generating}
                  style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "11px", fontWeight: 800, cursor: generating || !form.title ? "not-allowed" : "pointer", fontSize: 15, width: "100%", opacity: !form.title ? 0.5 : 1 }}
                >
                  {generating ? "⏳ כותב מאמר..." : "✍️ כתוב מאמר עם AI"}
                </button>
              </div>
            </div>

            {/* Right: Preview */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.1)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📄 תצוגה מקדימה</h3>
              {generatedArticle ? (
                <div style={{ height: 480, overflowY: "auto" }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: "var(--cream)" }}>{generatedArticle.title}</h2>
                  {generatedArticle.meta_description && (
                    <div style={{ background: "rgba(61,222,210,0.06)", border: "1px solid rgba(61,222,210,0.12)", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 12, color: "rgba(251,247,238,0.65)" }}>
                      <strong style={{ color: "var(--teal)" }}>Meta:</strong> {generatedArticle.meta_description}
                    </div>
                  )}
                  {generatedArticle.keywords && generatedArticle.keywords.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {generatedArticle.keywords.map((k) => (
                        <span key={k} style={{ background: "rgba(61,222,210,0.1)", color: "var(--teal)", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>#{k}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: "rgba(251,247,238,0.75)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                    {generatedArticle.content}
                  </div>
                  <button
                    onClick={saveArticle}
                    style={{ marginTop: 20, background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 800, cursor: "pointer", fontSize: 14, width: "100%" }}
                  >
                    💾 שמור מאמר
                  </button>
                </div>
              ) : (
                <div style={{ height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(251,247,238,0.25)", gap: 12 }}>
                  <span style={{ fontSize: 52 }}>📝</span>
                  <p style={{ fontSize: 14 }}>מלא את הפרטים ולחץ ״כתוב מאמר״</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Keywords */}
        {activeTab === "keywords" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🔍 מילות מפתח פופולריות</h3>
              {(() => {
                const allKeywords = articles.flatMap((a) => a.keywords);
                const counts: Record<string, number> = {};
                allKeywords.forEach((k) => { counts[k] = (counts[k] || 0) + 1; });
                const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                return sorted.length > 0 ? sorted.map(([kw, count]) => (
                  <div key={kw} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 13 }}>
                        <span style={{ fontWeight: 600, color: "var(--cream)" }}>{kw}</span>
                        <span style={{ color: "rgba(251,247,238,0.35)" }}>{count} מאמרים</span>
                      </div>
                      <div style={{ height: 5, background: "var(--navy)", borderRadius: 4 }}>
                        <div style={{ height: "100%", width: `${(count / (sorted[0]?.[1] || 1)) * 100}%`, background: "var(--teal)", borderRadius: 4 }} />
                      </div>
                    </div>
                  </div>
                )) : <p style={{ fontSize: 13, color: "rgba(251,247,238,0.3)" }}>אין מילות מפתח עדיין</p>;
              })()}
            </div>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>⭐ מאמרים מועדפים</h3>
              {articles.filter((a) => a.starred).map((a) => (
                <div key={a.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(61,222,210,0.05)" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)", marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(251,247,238,0.35)" }}>{a.word_count} מילים</div>
                </div>
              ))}
              {articles.filter((a) => a.starred).length === 0 && (
                <p style={{ fontSize: 13, color: "rgba(251,247,238,0.3)" }}>
                  סמן מאמרים בכוכב לשמירה מועדפים
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
