"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { getBusiness, getContacts, getSocialPosts, getSeoArticles, getWhatsAppCampaigns } from "@/lib/store";
import { MODULES } from "@/lib/modules";
import type { Business, Contact } from "@/types";

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState({ contacts: 0, posts: 0, articles: 0, campaigns: 0 });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [greeting, setGreeting] = useState("שלום");

  useEffect(() => {
    const biz = getBusiness();
    setBusiness(biz);
    setStats({
      contacts: getContacts().length,
      posts: getSocialPosts().length,
      articles: getSeoArticles().length,
      campaigns: getWhatsAppCampaigns().length,
    });
    setRecentContacts(getContacts().slice(0, 4));

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("בוקר טוב");
    else if (hour < 17) setGreeting("שלום");
    else setGreeting("ערב טוב");
  }, []);

  const brandReady = business?.brand_book?.completed;

  return (
    <>
      <Header title="דשבורד" subtitle="סקירה כללית של העסק שלך" />
      <div style={{ padding: "28px 28px 48px" }}>

        {/* Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--navy-light) 0%, var(--navy-card) 100%)",
            border: "1px solid rgba(61,222,210,0.15)",
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              {greeting}, {business?.name || "בעל העסק"} 👋
            </div>
            <p style={{ color: "rgba(251,247,238,0.6)", fontSize: 14, lineHeight: 1.5 }}>
              {brandReady
                ? "המותג שלך מוכן! כל הכלים פועלים עם הזהות העסקית שיצרת."
                : "עדיין לא בנית את ספר המותג שלך. זה הצעד הראשון לניהול עסק חכם."}
            </p>
          </div>
          {!brandReady && (
            <Link
              href="/brand-book"
              style={{
                background: "var(--teal)",
                color: "var(--navy)",
                fontWeight: 700,
                padding: "12px 22px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              📖 בנה ספר מותג
            </Link>
          )}
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "לקוחות", value: stats.contacts, icon: "👥", href: "/crm", color: "#6C63FF" },
            { label: "פוסטים", value: stats.posts, icon: "📱", href: "/social", color: "#E1306C" },
            { label: "מאמרי SEO", value: stats.articles, icon: "🔍", href: "/seo", color: "#FF8C00" },
            { label: "קמפיינים", value: stats.campaigns, icon: "💬", href: "/whatsapp", color: "#25D366" },
          ].map((stat) => (
            <Link
              key={stat.href}
              href={stat.href}
              style={{
                background: "var(--navy-card)",
                border: "1px solid rgba(61,222,210,0.08)",
                borderRadius: 14,
                padding: "20px 22px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{stat.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "var(--cream)", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginTop: 4 }}>{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Modules Grid */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "rgba(251,247,238,0.8)" }}>
            המודולים שלך
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {MODULES.map((module) => (
              <Link
                key={module.id}
                href={module.available ? `/${module.id}` : "#"}
                style={{
                  background: "var(--navy-card)",
                  border: "1px solid rgba(61,222,210,0.08)",
                  borderRadius: 14,
                  padding: "20px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  opacity: module.available ? 1 : 0.5,
                  cursor: module.available ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (module.available) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${module.color}40`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${module.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {module.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)" }}>{module.name}</span>
                    {module.badge && (
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 8,
                          background: module.id === "brand-book" ? "rgba(61,222,210,0.15)" : "rgba(255,255,255,0.06)",
                          color: module.id === "brand-book" ? "var(--teal)" : "rgba(251,247,238,0.4)",
                          fontWeight: 700,
                        }}
                      >
                        {module.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(251,247,238,0.45)", lineHeight: 1.4 }}>
                    {module.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div
            style={{
              background: "var(--navy-card)",
              border: "1px solid rgba(61,222,210,0.08)",
              borderRadius: 14,
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>לקוחות אחרונים</h3>
              <Link href="/crm" style={{ fontSize: 12, color: "var(--teal)", textDecoration: "none" }}>
                הכל ←
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentContacts.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(61,222,210,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      flexShrink: 0,
                    }}
                  >
                    {c.name.slice(0, 1)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)" }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(251,247,238,0.4)" }}>{c.company || c.email || c.phone}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontWeight: 700,
                      background:
                        c.status === "vip" ? "rgba(245,200,66,0.12)" :
                        c.status === "active" ? "rgba(34,197,94,0.12)" :
                        c.status === "lead" ? "rgba(61,222,210,0.12)" :
                        "rgba(255,255,255,0.06)",
                      color:
                        c.status === "vip" ? "var(--gold)" :
                        c.status === "active" ? "var(--success)" :
                        c.status === "lead" ? "var(--teal)" :
                        "rgba(251,247,238,0.35)",
                    }}
                  >
                    {c.status === "vip" ? "VIP" : c.status === "active" ? "פעיל" : c.status === "lead" ? "ליד" : "לא פעיל"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: "var(--navy-card)",
              border: "1px solid rgba(61,222,210,0.08)",
              borderRadius: 14,
              padding: "20px",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>פעולות מהירות</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "✏️", label: "צור פוסט חדש", href: "/social", color: "#E1306C" },
                { icon: "📤", label: "שלח קמפיין ווצאפ", href: "/whatsapp", color: "#25D366" },
                { icon: "👤", label: "הוסף לקוח חדש", href: "/crm", color: "#6C63FF" },
                { icon: "📝", label: "כתוב מאמר SEO", href: "/seo", color: "#FF8C00" },
                { icon: "🎨", label: "עצב מודעה", href: "/ads", color: "#F5C842" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${action.color}10`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${action.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  <span style={{ fontSize: 16 }}>{action.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(251,247,238,0.75)" }}>
                    {action.label}
                  </span>
                  <span style={{ marginRight: "auto", color: "rgba(251,247,238,0.2)", fontSize: 12 }}>←</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
