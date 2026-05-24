"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MODULES } from "@/lib/modules";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "דשבורד", icon: "🏠" },
  { href: "/brand-book", label: "ספר מותג", icon: "📖" },
  { href: "/crm", label: "CRM", icon: "👥" },
  { href: "/whatsapp", label: "ווצאפ", icon: "💬" },
  { href: "/social", label: "סושיאל", icon: "📱" },
  { href: "/ads", label: "מודעות", icon: "🎨" },
  { href: "/video", label: "וידאו", icon: "🎬" },
  { href: "/seo", label: "SEO", icon: "🔍" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "var(--navy-card)",
        borderLeft: "1px solid rgba(61,222,210,0.08)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 12px",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 8px 28px", borderBottom: "1px solid rgba(61,222,210,0.08)" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--teal)", fontWeight: 700, marginBottom: 4 }}>
          SIMPLE SOLUTION
        </div>
        <div style={{ fontSize: 13, color: "rgba(251,247,238,0.45)", fontWeight: 400 }}>
          פלטפורמת עסקים
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, marginTop: 20, display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const module = MODULES.find((m) => `/${m.id}` === item.href);
          const isComingSoon = module && !module.available;
          return (
            <Link
              key={item.href}
              href={isComingSoon ? "#" : item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? "var(--teal)" : isComingSoon ? "rgba(251,247,238,0.3)" : "rgba(251,247,238,0.65)",
                background: active ? "rgba(61,222,210,0.1)" : "transparent",
                textDecoration: "none",
                cursor: isComingSoon ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {module?.badge && (
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 8,
                    background: active ? "var(--teal)" : "rgba(61,222,210,0.12)",
                    color: active ? "var(--navy)" : "var(--teal)",
                    fontWeight: 700,
                  }}
                >
                  {module.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(61,222,210,0.08)", paddingTop: 16, marginTop: 16, display: "flex", flexDirection: "column", gap: 2 }}>
        <Link
          href="/settings"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 10,
            fontSize: 14,
            color: pathname === "/settings" ? "var(--teal)" : "rgba(251,247,238,0.5)",
            background: pathname === "/settings" ? "rgba(61,222,210,0.1)" : "transparent",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 16 }}>⚙️</span>
          <span>הגדרות</span>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 10,
            fontSize: 14,
            color: "rgba(251,247,238,0.5)",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 16 }}>🚪</span>
          <span>יציאה</span>
        </div>
      </div>
    </aside>
  );
}
