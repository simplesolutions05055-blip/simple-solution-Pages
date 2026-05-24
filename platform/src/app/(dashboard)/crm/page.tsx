"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/layout/Header";
import { getContacts, saveContact, deleteContact, toggleContactStar, generateId, getBusiness } from "@/lib/store";
import type { Contact } from "@/types";

const STATUS_CONFIG = {
  lead: { label: "ליד", color: "#3DDED2", bg: "rgba(61,222,210,0.1)" },
  active: { label: "פעיל", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
  vip: { label: "VIP", color: "#F5C842", bg: "rgba(245,200,66,0.1)" },
  inactive: { label: "לא פעיל", color: "rgba(251,247,238,0.3)", bg: "rgba(255,255,255,0.04)" },
};

const EMPTY_CONTACT: Omit<Contact, "id" | "business_id" | "created_at"> = {
  name: "",
  phone: "",
  email: "",
  company: "",
  status: "lead",
  tags: [],
  notes: "",
  last_contact: "",
  total_value: 0,
  starred: false,
};

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "status" | "value" | "date">("date");
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [form, setForm] = useState<Omit<Contact, "id" | "business_id" | "created_at">>(EMPTY_CONTACT);
  const [view, setView] = useState<"table" | "kanban">("table");
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const filtered = useMemo(() => {
    let list = contacts;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.company?.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") list = list.filter((c) => c.status === filterStatus);
    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, "he");
      if (sortBy === "value") return (b.total_value || 0) - (a.total_value || 0);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [contacts, search, filterStatus, sortBy]);

  const stats = useMemo(() => ({
    total: contacts.length,
    leads: contacts.filter((c) => c.status === "lead").length,
    active: contacts.filter((c) => c.status === "active").length,
    vip: contacts.filter((c) => c.status === "vip").length,
    totalValue: contacts.reduce((s, c) => s + (c.total_value || 0), 0),
  }), [contacts]);

  function openNew() {
    setEditingContact(null);
    setForm(EMPTY_CONTACT);
    setShowModal(true);
  }

  function openEdit(c: Contact) {
    setEditingContact(c);
    setForm({ name: c.name, phone: c.phone || "", email: c.email || "", company: c.company || "", status: c.status, tags: c.tags, notes: c.notes || "", last_contact: c.last_contact || "", total_value: c.total_value || 0, starred: c.starred });
    setShowModal(true);
  }

  function saveForm() {
    if (!form.name.trim()) return;
    const biz = getBusiness();
    const contact: Contact = {
      ...form,
      id: editingContact?.id || generateId(),
      business_id: biz.id,
      created_at: editingContact?.created_at || new Date().toISOString(),
    };
    saveContact(contact);
    setContacts(getContacts());
    setShowModal(false);
  }

  function handleDelete(id: string) {
    deleteContact(id);
    setContacts(getContacts());
    setShowDeleteId(null);
  }

  function handleStar(id: string) {
    toggleContactStar(id);
    setContacts(getContacts());
  }

  return (
    <>
      <Header title="CRM — ניהול לקוחות" subtitle="כל הלקוחות והליידים שלך במקום אחד" />
      <div style={{ padding: "24px 28px 48px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "סה״כ", value: stats.total, color: "var(--teal)" },
            { label: "ליידים", value: stats.leads, color: "#3DDED2" },
            { label: "פעילים", value: stats.active, color: "#22C55E" },
            { label: "VIP", value: stats.vip, color: "#F5C842" },
            { label: "ערך כולל", value: `₪${stats.totalValue.toLocaleString()}`, color: "var(--gold)" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 12, padding: "16px 18px" }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(251,247,238,0.45)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 חפש לקוח..."
            style={{ background: "var(--navy-card)", border: "1.5px solid rgba(61,222,210,0.15)", borderRadius: 10, padding: "9px 14px", color: "var(--cream)", fontSize: 14, outline: "none", fontFamily: "inherit", width: 220 }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ background: "var(--navy-card)", border: "1.5px solid rgba(61,222,210,0.15)", borderRadius: 10, padding: "9px 14px", color: "var(--cream)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
          >
            <option value="all">כל הסטטוסים</option>
            <option value="lead">ליד</option>
            <option value="active">פעיל</option>
            <option value="vip">VIP</option>
            <option value="inactive">לא פעיל</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{ background: "var(--navy-card)", border: "1.5px solid rgba(61,222,210,0.15)", borderRadius: 10, padding: "9px 14px", color: "var(--cream)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
          >
            <option value="date">לפי תאריך</option>
            <option value="name">לפי שם</option>
            <option value="value">לפי ערך</option>
            <option value="status">לפי סטטוס</option>
          </select>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 4, background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.12)", borderRadius: 8, padding: 3 }}>
            {(["table", "kanban"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{ padding: "5px 12px", borderRadius: 6, border: "none", background: view === v ? "rgba(61,222,210,0.15)" : "transparent", color: view === v ? "var(--teal)" : "rgba(251,247,238,0.4)", cursor: "pointer", fontSize: 13, fontWeight: view === v ? 700 : 400 }}
              >
                {v === "table" ? "📋 טבלה" : "📌 קנבן"}
              </button>
            ))}
          </div>
          <button
            onClick={openNew}
            style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 10, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            + הוסף לקוח
          </button>
        </div>

        {/* Table View */}
        {view === "table" && (
          <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(61,222,210,0.08)" }}>
                  {["", "שם", "חברה", "טלפון / מייל", "סטטוס", "ערך", "פעולות"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.4)", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    style={{ borderBottom: "1px solid rgba(61,222,210,0.04)", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(61,222,210,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 8px 12px 0", textAlign: "center", width: 40 }}>
                      <button
                        onClick={() => handleStar(c.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: c.starred ? "#F5C842" : "rgba(251,247,238,0.2)", transition: "all 0.2s" }}
                      >
                        {c.starred ? "★" : "☆"}
                      </button>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--navy)", flexShrink: 0 }}>
                          {c.name.slice(0, 1)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)" }}>{c.name}</div>
                          {c.notes && <div style={{ fontSize: 11, color: "rgba(251,247,238,0.35)" }}>{c.notes.slice(0, 40)}{c.notes.length > 40 ? "..." : ""}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(251,247,238,0.6)" }}>{c.company || "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontSize: 13, color: "rgba(251,247,238,0.7)" }}>{c.phone || "—"}</div>
                      <div style={{ fontSize: 11, color: "rgba(251,247,238,0.35)" }}>{c.email || ""}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: STATUS_CONFIG[c.status].bg, color: STATUS_CONFIG[c.status].color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
                        {STATUS_CONFIG[c.status].label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "var(--gold)" }}>
                      {c.total_value ? `₪${c.total_value.toLocaleString()}` : "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => openEdit(c)}
                          style={{ background: "rgba(61,222,210,0.08)", border: "none", borderRadius: 7, padding: "5px 10px", color: "var(--teal)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                        >
                          ✏️ ערוך
                        </button>
                        <button
                          onClick={() => setShowDeleteId(c.id)}
                          style={{ background: "rgba(255,77,109,0.08)", border: "none", borderRadius: 7, padding: "5px 10px", color: "#FF4D6D", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "rgba(251,247,238,0.3)", fontSize: 14 }}>
                      לא נמצאו לקוחות
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Kanban View */}
        {view === "kanban" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {(["lead", "active", "vip", "inactive"] as const).map((status) => {
              const statusContacts = filtered.filter((c) => c.status === status);
              return (
                <div key={status}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: STATUS_CONFIG[status].color, display: "block" }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: STATUS_CONFIG[status].color }}>
                      {STATUS_CONFIG[status].label}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(251,247,238,0.3)", background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "1px 8px" }}>
                      {statusContacts.length}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {statusContacts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => openEdit(c)}
                        style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.08)", borderRadius: 12, padding: 14, cursor: "pointer", transition: "all 0.15s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,222,210,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--cream)" }}>{c.name}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleStar(c.id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: c.starred ? "#F5C842" : "rgba(251,247,238,0.2)" }}>
                            {c.starred ? "★" : "☆"}
                          </button>
                        </div>
                        {c.company && <div style={{ fontSize: 12, color: "rgba(251,247,238,0.4)", marginBottom: 4 }}>{c.company}</div>}
                        {c.phone && <div style={{ fontSize: 12, color: "rgba(251,247,238,0.55)" }}>{c.phone}</div>}
                        {c.total_value ? <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", marginTop: 6 }}>₪{c.total_value.toLocaleString()}</div> : null}
                      </div>
                    ))}
                    {statusContacts.length === 0 && (
                      <div style={{ borderRadius: 10, border: "1.5px dashed rgba(61,222,210,0.1)", padding: "20px", textAlign: "center", fontSize: 12, color: "rgba(251,247,238,0.2)" }}>
                        אין לקוחות בסטטוס זה
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div style={{ background: "var(--navy-card)", border: "1px solid rgba(61,222,210,0.15)", borderRadius: 18, padding: 28, width: "100%", maxWidth: 520 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>
              {editingContact ? "✏️ עריכת לקוח" : "➕ לקוח חדש"}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "שם מלא *", field: "name", type: "text" },
                { label: "חברה", field: "company", type: "text" },
                { label: "טלפון", field: "phone", type: "tel" },
                { label: "מייל", field: "email", type: "email" },
                { label: "ערך (₪)", field: "total_value", type: "number" },
              ].map((f) => (
                <div key={f.field} style={f.field === "name" ? { gridColumn: "1 / -1" } : {}}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={String(form[f.field as keyof typeof form] ?? "")}
                    onChange={(e) => setForm((f2) => ({ ...f2, [f.field]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                    style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 12px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>סטטוס</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f2) => ({ ...f2, status: e.target.value as Contact["status"] }))}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 12px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" }}
                >
                  <option value="lead">ליד</option>
                  <option value="active">פעיל</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">לא פעיל</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(251,247,238,0.5)", marginBottom: 5 }}>הערות</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f2) => ({ ...f2, notes: e.target.value }))}
                  rows={3}
                  style={{ background: "var(--navy)", border: "1.5px solid rgba(61,222,210,0.18)", borderRadius: 9, padding: "10px 12px", color: "var(--cream)", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "1px solid rgba(61,222,210,0.2)", borderRadius: 9, padding: "9px 18px", color: "rgba(251,247,238,0.6)", cursor: "pointer", fontSize: 14 }}>
                ביטול
              </button>
              <button onClick={saveForm} style={{ background: "var(--teal)", color: "var(--navy)", border: "none", borderRadius: 9, padding: "9px 22px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {editingContact ? "שמור שינויים" : "הוסף לקוח"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteId && (
        <div
          onClick={() => setShowDeleteId(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--navy-card)", border: "1px solid rgba(255,77,109,0.3)", borderRadius: 16, padding: "28px 32px", textAlign: "center", maxWidth: 360 }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>מחק לקוח?</h3>
            <p style={{ fontSize: 13, color: "rgba(251,247,238,0.5)", marginBottom: 20 }}>
              פעולה זו לא ניתנת לביטול
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setShowDeleteId(null)} style={{ background: "transparent", border: "1px solid rgba(61,222,210,0.2)", borderRadius: 9, padding: "9px 18px", color: "rgba(251,247,238,0.6)", cursor: "pointer" }}>
                ביטול
              </button>
              <button onClick={() => handleDelete(showDeleteId)} style={{ background: "#FF4D6D", border: "none", borderRadius: 9, padding: "9px 20px", color: "white", fontWeight: 700, cursor: "pointer" }}>
                מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
