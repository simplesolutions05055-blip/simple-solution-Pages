"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Halftone } from "@/components/ui/Halftone";

const WHATSAPP_NUMBER = "972500000000"; // ⬅︎ לעדכן למספר אמיתי
const WHATSAPP_TEXT = encodeURIComponent(
  "היי אמיר, ראיתי את הדף והייתי רוצה לקבוע פגישת בהירות.",
);

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "שגיאה בשליחה");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "שגיאה בשליחה");
    }
  }

  return (
    <section
      id="lead-form"
      className="relative overflow-hidden bg-as-navy-deep py-24 md:py-32"
    >
      <Halftone position="bl" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>קביעת פגישה</Eyebrow>
          <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
            מי שמאמין —
            <br />
            <span className="text-gold-shimmer">מגיע.</span>
          </h2>
          <p className="mt-5 text-as-cream/70 leading-relaxed">
            השאר/י פרטים — אני אצור קשר תוך 24 שעות לשיחת התאמה קצרה. אפשר גם
            ישירות בווטסאפ.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-8">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="rounded-as-lg border border-as-gold/20 bg-as-navy/30 p-6 md:p-8 space-y-4"
          >
            <input
              name="hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div>
              <label className="block text-[12px] tracking-eyebrow uppercase text-as-cream/55 mb-2">
                שם מלא
              </label>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                placeholder="לדוגמה: יוסי לוי"
                className="field"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] tracking-eyebrow uppercase text-as-cream/55 mb-2">
                  טלפון <span className="text-as-gold">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9\-\+\s]{9,15}"
                  placeholder="050-000-0000"
                  className="field tnum"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-[12px] tracking-eyebrow uppercase text-as-cream/55 mb-2">
                  אימייל
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="field"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] tracking-eyebrow uppercase text-as-cream/55 mb-2">
                תחום העסק
              </label>
              <select name="field" className="field" defaultValue="">
                <option value="" disabled>
                  בחר/י תחום
                </option>
                <option value="trade">מסחר</option>
                <option value="services">שירותים</option>
                <option value="renovations">שיפוצים / בנייה</option>
                <option value="clinic">קליניקה / רפואה</option>
                <option value="restaurant">מסעדנות</option>
                <option value="other">אחר</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] tracking-eyebrow uppercase text-as-cream/55 mb-2">
                מה קורה אצלך בעסק עכשיו?
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="במשפט-שניים — הכאב או המצב הנוכחי."
                className="field resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-as-md font-medium text-[15px] tracking-wide bg-as-gold text-as-ink hover:bg-as-gold-bright disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "submitting"
                ? "שולח…"
                : status === "success"
                  ? "התקבל. אצור קשר תוך 24 שעות."
                  : "שליחת פרטים"}
            </button>

            {status === "error" && (
              <p className="text-as-red text-sm">{error}</p>
            )}

            <p className="text-[12px] text-as-cream/50 leading-relaxed">
              הפרטים נשמרים אצלי בלבד ומשמשים ליצירת קשר ראשוני. אין שיתוף עם
              צד שלישי.
            </p>
          </form>

          {/* WhatsApp + meta */}
          <aside className="space-y-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-as-lg border border-as-green/40 bg-as-green/10 p-7 hover:bg-as-green/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-as-green flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-as-ink fill-current"
                    aria-hidden
                  >
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.12 1.6 5.92L0 24l6.42-1.68a11.83 11.83 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.13-3.38-8.43Zm-8.48 18.2h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.81 1 1.02-3.71-.24-.38a9.84 9.84 0 0 1-1.51-5.18c0-5.44 4.42-9.86 9.87-9.86a9.83 9.83 0 0 1 7 2.9 9.78 9.78 0 0 1 2.9 7c0 5.43-4.42 9.85-9.86 9.85Zm5.4-7.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.03 1.01-1.03 2.46 0 1.46 1.06 2.86 1.21 3.06.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.25-.69.25-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z" />
                  </svg>
                </span>
                <div>
                  <div className="font-display text-xl text-as-cream">
                    שיחה מיידית בווטסאפ
                  </div>
                  <div className="text-as-cream/60 text-sm">
                    תשובה תוך שעות הפעילות
                  </div>
                </div>
              </div>
              <div className="mt-5 text-as-cream/80 text-[14px] leading-relaxed">
                ״היי אמיר, ראיתי את הדף והייתי רוצה לקבוע פגישת בהירות.״
              </div>
              <div className="mt-4 text-[12px] tracking-eyebrow uppercase text-as-green group-hover:underline">
                פתיחת שיחה ←
              </div>
            </a>

            <div className="rounded-as-lg border border-as-gold/15 bg-as-navy/20 p-6">
              <div className="text-[11px] tracking-eyebrow uppercase text-as-cream/55">
                מה קורה אחרי השליחה?
              </div>
              <ol className="mt-4 space-y-3 text-as-cream/80 text-[14px] leading-relaxed">
                <li className="flex gap-3">
                  <span className="font-display text-as-gold tnum">01</span>
                  שיחה קצרה לוודא שזה מתאים — חינם, 15 דק׳.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-as-gold tnum">02</span>
                  אם מתאים — תשלום ₪397 + שאלון הכנה.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-as-gold tnum">03</span>
                  פגישה. סיכום בכתב תוך 24 שעות.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
