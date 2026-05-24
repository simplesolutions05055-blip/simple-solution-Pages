"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBusiness } from "@/lib/store";
import type { Business } from "@/types";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    setBusiness(getBusiness());
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit" }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        height: 64,
        background: "var(--navy-card)",
        borderBottom: "1px solid rgba(61,222,210,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left: Title */}
      <div>
        {title && (
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--cream)", margin: 0 }}>{title}</h1>
        )}
        {subtitle && (
          <p style={{ fontSize: 12, color: "rgba(251,247,238,0.45)", margin: 0 }}>{subtitle}</p>
        )}
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 13, color: "rgba(251,247,238,0.4)", fontWeight: 400 }}>{time}</span>

        {/* Notifications */}
        <button
          style={{
            background: "rgba(61,222,210,0.08)",
            border: "none",
            borderRadius: 8,
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            position: "relative",
          }}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--teal)",
            }}
          />
        </button>

        {/* Business Avatar */}
        <Link
          href="/settings"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
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
              fontSize: 14,
              fontWeight: 700,
              color: "var(--navy)",
            }}
          >
            {business?.name?.slice(0, 1) || "ע"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)", lineHeight: 1.2 }}>
              {business?.name || "העסק שלי"}
            </span>
            <span style={{ fontSize: 11, color: "rgba(251,247,238,0.4)" }}>
              {business?.brand_book?.completed ? "מותג מוכן ✓" : "הגדר מותג →"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
