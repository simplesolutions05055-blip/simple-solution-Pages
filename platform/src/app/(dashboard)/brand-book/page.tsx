"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { getBusiness, saveBrandBook, saveBusiness, generateId } from "@/lib/store";
import type { BrandBook, Business } from "@/types";

const STEPS = [
  { id: "basics", title: "פרטי עסק", subtitle: "ספר לנו על העסק שלך", icon: "🏢" },
  { id: "story", title: "סיפור המותג", subtitle: "מה הסיפור מאחורי העסק?", icon: "📖" },
  { id: "vision", title: "חזון וייעוד", subtitle: "לאן אתה הולך?", icon: "🎯" },
  { id: "values", title: "ערכים", subtitle: "מה מנחה אותך?", icon: "💎" },
  { id: "audience", title: "קהל יעד", subtitle: "מי הלקוח האידיאלי שלך?", icon: "👥" },
  { id: "voice", title: "קול המותג", subtitle: "איך אתה מדבר עם הלקוחות?", icon: "🎤" },
  { id: "design", title: "עיצוב ויזואלי", subtitle: "הצבעים והפונטים שלך", icon: "🎨" },
  { id: "compete", title: "שוק ותחרות", subtitle: "מה מייחד אותך?", icon: "⚡" },
];

const TONE_OPTIONS = [
  { id: "professional", label: "מקצועי ורשמי", desc: "רציני, עסקי, אמין" },
  { id: "friendly", label: "ידידותי ונגיש", desc: "חמים, קרוב, אנושי" },
  { id: "energetic", label: "נמרץ ומלהיב", desc: "דינמי, צעיר, מעורר" },
  { id: "inspiring", label: "מעורר השראה", desc: "חזוני, מוטיבציוני" },
  { id: "expert", label: "מומחה ומוביל", desc: "סמכותי, בטוח, מוביל דעה" },
  { id: "playful", label: "שובבי ויצירתי", desc: "כיפי, מקורי, בלתי שגרתי" },
];

const COLOR_PALETTES = [
  { name: "כחול מקצועי", primary: "#1A3C6B", secondary: "#2E6DCC", accent: "#5BA4F5", neutral: "#F0F4FA" },
  { name: "ירוק טבעי", primary: "#1B4332", secondary: "#2D6A4F", accent: "#52B788", neutral: "#F0FFF4" },
  { name: "אדום נועז", primary: "#7C0A02", secondary: "#C0392B", accent: "#FF6B6B", neutral: "#FFF5F5" },
  { name: "סגול יצירתי", primary: "#2D0066", secondary: "#6C27A8", accent: "#AA55FF", neutral: "#F8F0FF" },
  { name: "כתום חם", primary: "#7A2900", secondary: "#D46B00", accent: "#FF9A3C", neutral: "#FFF7ED" },
  { name: "טורקיז מודרני", primary: "#0F1738", secondary: "#1A2550", accent: "#3DDED2", neutral: "#F0FFFE" },
];

const VALUES_OPTIONS = [
  "אמינות", "חדשנות", "מקצועיות", "יצירתיות", "קהילה", "שקיפות",
  "מצוינות", "אנושיות", "שירות", "יושרה", "פשטות", "תוצאות",
];

export default function BrandBookPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    industry: "",
    website: "",
    phone: "",
    story: "",
    vision: "",
    mission: "",
    selectedValues: [] as string[],
    target_audience: "",
    tone: "",
    selectedPalette: 5,
    customColors: { primary: "#0F1738", secondary: "#1A2550", accent: "#3DDED2", neutral: "#FBF7EE" },
    useCustomColors: false,
    keywords: "",
    competitors: "",
    unique_value: "",
    aiGenerated: {} as Partial<BrandBook>,
  });

  useEffect(() => {
    const biz = getBusiness();
    setBusiness(biz);
    setForm((f) => ({
      ...f,
      name: biz.name || "",
      tagline: biz.tagline || "",
      industry: biz.industry || "",
      website: biz.website || "",
      phone: biz.phone || "",
      ...(biz.brand_book
        ? {
            story: biz.brand_book.story || "",
            vision: biz.brand_book.vision || "",
            mission: biz.brand_book.mission || "",
            selectedValues: biz.brand_book.values || [],
            target_audience: biz.brand_book.target_audience || "",
            tone: biz.brand_book.tone_of_voice || "",
            keywords: biz.brand_book.keywords?.join(", ") || "",
            competitors: biz.brand_book.competitors?.join(", ") || "",
            unique_value: biz.brand_book.unique_value || "",
          }
        : {}),
    }));
    if (biz.brand_book?.completed) setShowPreview(true);
  }, []);

  function update(field: string, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleValue(val: string) {
    setForm((f) => ({
      ...f,
      selectedValues: f.selectedValues.includes(val)
        ? f.selectedValues.filter((v) => v !== val)
        : [...f.selectedValues, val],
    }));
  }

  async function generateWithAI() {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/brand-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          industry: form.industry,
          story: form.story,
          vision: form.vision,
          mission: form.mission,
          values: form.selectedValues,
          target_audience: form.target_audience,
          tone: form.tone,
          unique_value: form.unique_value,
          competitors: form.competitors,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm((f) => ({ ...f, aiGenerated: data }));
      }
    } catch {
      // fallback to manual
    }
    setGenerating(false);
  }

  function saveFinal() {
    const palette = form.useCustomColors ? form.customColors : COLOR_PALETTES[form.selectedPalette];
    const bb: BrandBook = {
      id: generateId(),
      business_id: business?.id || "demo-biz",
      story: form.aiGenerated.story || form.story,
      vision: form.aiGenerated.vision || form.vision,
      mission: form.aiGenerated.mission || form.mission,
      values: form.selectedValues,
      target_audience: form.aiGenerated.target_audience || form.target_audience,
      tone_of_voice: form.tone,
      colors: "primary" in palette ? {
        primary: (palette as typeof COLOR_PALETTES[0]).primary,
        secondary: (palette as typeof COLOR_PALETTES[0]).secondary,
        accent: (palette as typeof COLOR_PALETTES[0]).accent,
        neutral: (palette as typeof COLOR_PALETTES[0]).neutral,
      } : form.customColors,
      fonts: { heading: "Heebo", body: "Heebo" },
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      competitors: form.competitors.split(",").map((c) => c.trim()).filter(Boolean),
      unique_value: form.aiGenerated.unique_value || form.unique_value,
      completed: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveBrandBook(bb);
    saveBusiness({
      name: form.name,
      tagline: form.tagline,
      industry: form.industry,
      website: form.website,
      phone: form.phone,
    });

    setSaved(true);
    setShowPreview(true);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  if (showPreview && saved) {
    const biz = getBusiness();
    const bb = biz.brand_book;
    return (
      <>
        <Header title="ספר מותג" subtitle={biz.name} />
        <div style={{ padding: "28px", maxWidth: 900, margin: "0 auto" }}>
          {/* Success Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(61,222,210,0.12) 0%, rgba(61,222,210,0.04) 100%)",
              border: "1px solid rgba(61,222,210,0.3)",
              borderRadius: 16,
              padding: "20px 24px",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 32 }}>🎉</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--teal)", marginBottom: 4 }}>
                ספר המותג שלך מוכן!
              </div>
              <p style={{ fontSize: 14, color: "rgba(251,247,238,0.65)" }}>
                כל המודולים במערכת כעת משתמשים בזהות המותג שלך אוטומטית.
              </p>
            </div>
            <div style={{ marginRight: "auto", display: "flex", gap: 10 }}>
              <button
                style={{
                  background: "var(--teal)",
                  color: "var(--navy)",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
                onClick={() => alert("הורדת PDF תהיה זמינה בקרוב — עלות 8 ₪")}
              >
                📥 הורד PDF — 8 ₪
              </button>
              <button
                onClick={() => { setSaved(false); setShowPreview(false); }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(61,222,210,0.3)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  color: "var(--teal)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                ✏️ ערוך
              </button>
            </div>
          </div>

          {/* Brand Book Preview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Story */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>📖 סיפור המותג</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(251,247,238,0.8)" }}>{bb?.story || form.story}</p>
            </div>
            {/* Vision */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>🎯 חזון וייעוד</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "rgba(251,247,238,0.4)", marginBottom: 4 }}>חזון</div>
                <p style={{ fontSize: 14, color: "rgba(251,247,238,0.8)" }}>{bb?.vision || form.vision}</p>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(251,247,238,0.4)", marginBottom: 4 }}>ייעוד</div>
                <p style={{ fontSize: 14, color: "rgba(251,247,238,0.8)" }}>{bb?.mission || form.mission}</p>
              </div>
            </div>
            {/* Values */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>💎 ערכי המותג</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {bb?.values?.map((v) => (
                  <span
                    key={v}
                    style={{
                      background: "rgba(61,222,210,0.1)",
                      color: "var(--teal)",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
            {/* Colors */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>🎨 פלטת צבעים</div>
              <div style={{ display: "flex", gap: 10 }}>
                {Object.entries(bb?.colors || {}).map(([name, hex]) => (
                  <div key={name} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: hex,
                        border: "2px solid rgba(255,255,255,0.1)",
                        marginBottom: 4,
                      }}
                    />
                    <div style={{ fontSize: 10, color: "rgba(251,247,238,0.4)" }}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Audience & Voice */}
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>👥 קהל יעד</div>
              <p style={{ fontSize: 14, color: "rgba(251,247,238,0.8)" }}>{bb?.target_audience || form.target_audience}</p>
            </div>
            <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, marginBottom: 10 }}>🎤 קול המותג</div>
              <p style={{ fontSize: 14, color: "rgba(251,247,238,0.8)" }}>
                {TONE_OPTIONS.find((t) => t.id === (bb?.tone_of_voice || form.tone))?.label || bb?.tone_of_voice || form.tone}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentStep = STEPS[step];

  return (
    <>
      <Header title="בנאי ספר המותג" subtitle="שלב " />
      <div style={{ padding: "28px", maxWidth: 760, margin: "0 auto" }}>

        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "rgba(251,247,238,0.5)" }}>
            <span>שלב {step + 1} מתוך {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, background: "var(--navy-light)", borderRadius: 6, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--teal) 0%, var(--teal-dark) 100%)",
                borderRadius: 6,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          {/* Step indicators */}
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "none",
                  background: i < step ? "var(--teal)" : i === step ? "var(--teal)" : "var(--navy-light)",
                  color: i <= step ? "var(--navy)" : "rgba(251,247,238,0.3)",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: i > step ? 0.5 : 1,
                }}
              >
                {i < step ? "✓" : i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Step Card */}
        <div
          key={step}
          style={{
            background: "var(--navy-card)",
            border: "1px solid rgba(61,222,210,0.12)",
            borderRadius: 18,
            padding: "32px",
            marginBottom: 20,
            animation: "fadeUp 0.4s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "rgba(61,222,210,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              {currentStep.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--cream)" }}>{currentStep.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(251,247,238,0.5)" }}>{currentStep.subtitle}</p>
            </div>
          </div>

          {/* STEP 0: Basics */}
          {step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "שם העסק *", field: "name", placeholder: "למשל: ספא מריה" },
                { label: "תחום עיסוק *", field: "industry", placeholder: "למשל: בריאות ויופי" },
                { label: "סלוגן / קו עסקי", field: "tagline", placeholder: "משפט קצר שמסכם את העסק" },
                { label: "אתר אינטרנט", field: "website", placeholder: "www.example.co.il" },
                { label: "טלפון", field: "phone", placeholder: "054-1234567" },
              ].map((f) => (
                <div key={f.field} style={f.field === "tagline" ? { gridColumn: "1 / -1" } : {}}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input
                    value={form[f.field as keyof typeof form] as string}
                    onChange={(e) => update(f.field, e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      background: "var(--navy)",
                      border: "1.5px solid rgba(61,222,210,0.2)",
                      borderRadius: 10,
                      padding: "11px 14px",
                      color: "var(--cream)",
                      fontSize: 14,
                      width: "100%",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Story */}
          {step === 1 && (
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 6 }}>
                הסיפור של העסק שלך
              </label>
              <p style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 10 }}>
                מה הניע אותך להקים את העסק? מה הפך אותך למי שאתה כיום? זה הלב של המותג שלך.
              </p>
              <textarea
                value={form.story}
                onChange={(e) => update("story", e.target.value)}
                placeholder="לפני 5 שנים הבנתי שאנשים צריכים... מאז אני מחויב ל..."
                rows={7}
                style={{
                  background: "var(--navy)",
                  border: "1.5px solid rgba(61,222,210,0.2)",
                  borderRadius: 10,
                  padding: "14px",
                  color: "var(--cream)",
                  fontSize: 14,
                  width: "100%",
                  outline: "none",
                  fontFamily: "inherit",
                  resize: "vertical",
                  lineHeight: 1.7,
                }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: "rgba(251,247,238,0.3)" }}>
                {form.story.length} / 1000 תווים
              </div>
            </div>
          )}

          {/* STEP 2: Vision & Mission */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 4 }}>
                  🎯 החזון — לאן אתה הולך?
                </label>
                <p style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 8 }}>
                  מה תראה אם תצליח בצורה מלאה? מה תהיה השפעת העסק שלך בעוד 10 שנים?
                </p>
                <textarea
                  value={form.vision}
                  onChange={(e) => update("vision", e.target.value)}
                  placeholder="להיות חברת ה... המובילה בישראל ולשנות את האופן שבו..."
                  rows={4}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: 14, color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 4 }}>
                  🚀 הייעוד — למה אתה קיים?
                </label>
                <p style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 8 }}>
                  מה אתה עושה כל יום? לאיזה בעיה אתה הפתרון?
                </p>
                <textarea
                  value={form.mission}
                  onChange={(e) => update("mission", e.target.value)}
                  placeholder="אנחנו עוזרים ל... להשיג... כדי ש..."
                  rows={4}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: 14, color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Values */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 16 }}>
                בחר 3-6 ערכים שמייצגים את העסק שלך
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {VALUES_OPTIONS.map((v) => {
                  const selected = form.selectedValues.includes(v);
                  return (
                    <button
                      key={v}
                      onClick={() => toggleValue(v)}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 24,
                        border: selected ? "2px solid var(--teal)" : "1.5px solid rgba(61,222,210,0.2)",
                        background: selected ? "rgba(61,222,210,0.12)" : "transparent",
                        color: selected ? "var(--teal)" : "rgba(251,247,238,0.65)",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: selected ? 700 : 400,
                        transition: "all 0.15s",
                      }}
                    >
                      {selected && "✓ "}{v}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: "rgba(251,247,238,0.4)" }}>
                {form.selectedValues.length} ערכים נבחרו
              </div>
            </div>
          )}

          {/* STEP 4: Audience */}
          {step === 4 && (
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 6 }}>
                מי הלקוח האידיאלי שלך?
              </label>
              <p style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 10 }}>
                גיל, מגדר, רמת הכנסה, תחביבים, בעיות ורצונות — ככל שתהיה יותר ספציפי, ייצרת תוכן טוב יותר
              </p>
              <textarea
                value={form.target_audience}
                onChange={(e) => update("target_audience", e.target.value)}
                placeholder="גברים ונשים בגיל 25-45, בעלי עסקים קטנים ובינוניים, שמחפשים פתרונות טכנולוגיים פשוטים..."
                rows={6}
                style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: 14, color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.7 }}
              />
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 6 }}>
                  מילות מפתח של המותג
                </label>
                <input
                  value={form.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                  placeholder="חדשנות, אמינות, פשטות (מופרד בפסיקים)"
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: "11px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Voice */}
          {step === 5 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update("tone", t.id)}
                  style={{
                    padding: "16px",
                    borderRadius: 12,
                    border: form.tone === t.id ? "2px solid var(--teal)" : "1.5px solid rgba(61,222,210,0.15)",
                    background: form.tone === t.id ? "rgba(61,222,210,0.08)" : "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    textAlign: "right",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: form.tone === t.id ? "var(--teal)" : "var(--cream)", marginBottom: 4 }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(251,247,238,0.45)" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 6: Design */}
          {step === 6 && (
            <div>
              <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 16 }}>
                בחר פלטת צבעים למותג שלך
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {COLOR_PALETTES.map((palette, i) => (
                  <button
                    key={palette.name}
                    onClick={() => update("selectedPalette", i)}
                    style={{
                      padding: "14px",
                      borderRadius: 12,
                      border: form.selectedPalette === i ? "2px solid var(--teal)" : "1.5px solid rgba(61,222,210,0.12)",
                      background: form.selectedPalette === i ? "rgba(61,222,210,0.06)" : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      textAlign: "right",
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      {[palette.primary, palette.secondary, palette.accent, palette.neutral].map((c) => (
                        <div key={c} style={{ width: 24, height: 24, borderRadius: 6, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: form.selectedPalette === i ? "var(--teal)" : "rgba(251,247,238,0.7)" }}>
                      {palette.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Compete */}
          {step === 7 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 6 }}>
                  מתחרים עיקריים
                </label>
                <input
                  value={form.competitors}
                  onChange={(e) => update("competitors", e.target.value)}
                  placeholder="שם מתחרה 1, שם מתחרה 2 (מופרד בפסיקים)"
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: "11px 14px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(251,247,238,0.7)", marginBottom: 4 }}>
                  ⚡ מה מייחד אותך מהמתחרים?
                </label>
                <p style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 8 }}>
                  הצעת הערך הייחודית שלך — זה הלב של ה-Branding
                </p>
                <textarea
                  value={form.unique_value}
                  onChange={(e) => update("unique_value", e.target.value)}
                  placeholder="בניגוד למתחרים שלי, אנחנו... ולכן הלקוחות שלנו מקבלים..."
                  rows={5}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.2)", borderRadius: 10, padding: 14, color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.7 }}
                />
              </div>

              {/* AI Generate Option */}
              <div
                style={{
                  background: "rgba(61,222,210,0.05)",
                  border: "1px solid rgba(61,222,210,0.15)",
                  borderRadius: 12,
                  padding: "16px",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--teal)", marginBottom: 6 }}>
                  ✨ שפר עם AI
                </div>
                <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 12 }}>
                  לחץ כדי שה-AI יעבד את כל המידע שהזנת וישפר את ניסוח ספר המותג שלך
                </p>
                <button
                  onClick={generateWithAI}
                  disabled={generating}
                  style={{
                    background: "var(--teal)",
                    color: "var(--navy)",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontWeight: 700,
                    cursor: generating ? "not-allowed" : "pointer",
                    fontSize: 14,
                    opacity: generating ? 0.7 : 1,
                  }}
                >
                  {generating ? "⏳ מעבד..." : "🤖 שפר עם AI"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(61,222,210,0.2)",
              borderRadius: 10,
              padding: "12px 24px",
              color: step === 0 ? "rgba(251,247,238,0.2)" : "rgba(251,247,238,0.7)",
              cursor: step === 0 ? "not-allowed" : "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            → הקודם
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              style={{
                background: "var(--teal)",
                color: "var(--navy)",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              הבא ←
            </button>
          ) : (
            <button
              onClick={saveFinal}
              style={{
                background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)",
                color: "var(--navy)",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✅ שמור ספר מותג
            </button>
          )}
        </div>
      </div>
    </>
  );
}
