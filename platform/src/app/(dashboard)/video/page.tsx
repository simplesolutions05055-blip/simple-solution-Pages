"use client";

import Header from "@/components/layout/Header";

export default function VideoPage() {
  return (
    <>
      <Header title="עורך וידאו" subtitle="יצירה ועריכה של תכני וידאו" />
      <div style={{ padding: "60px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>🎬</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: "var(--cream)" }}>
          עורך הוידאו בדרך!
        </h2>
        <p style={{ fontSize: 16, color: "rgba(251,247,238,0.55)", maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
          המודול הזה יאפשר לך ליצור, לערוך ולפרסם תכני וידאו מקצועיים ישירות מהמערכת —
          כולל תכנית צילום, כתוביות אוטומטיות ותבניות מוכנות.
        </p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
          {[
            { icon: "📹", feature: "הקלטת סרטונים" },
            { icon: "✂️", feature: "עריכה בסיסית" },
            { icon: "📝", feature: "כתוביות אוטומטיות" },
            { icon: "🎵", feature: "מוזיקת רקע" },
            { icon: "📱", feature: "ייצוא לרשתות" },
            { icon: "🤖", feature: "סקריפט AI" },
          ].map((f) => (
            <div
              key={f.feature}
              style={{
                background: "var(--navy-card)",
                border: "1px solid rgba(255,77,109,0.15)",
                borderRadius: 12,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 22 }}>{f.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(251,247,238,0.7)" }}>{f.feature}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.2)", borderRadius: 14, padding: "16px 28px", fontSize: 14, color: "#FF4D6D", fontWeight: 700 }}>
          🚀 בפיתוח — יוצא בקרוב!
        </div>
      </div>
    </>
  );
}
