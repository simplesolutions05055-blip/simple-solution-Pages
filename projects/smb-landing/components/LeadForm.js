'use client';

import { useState } from 'react';
import { CONTACT, phoneHref, whatsappHref } from '@/lib/contact';

export default function LeadForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setError('');

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (!data.name || !data.phone) {
      setError('שם וטלפון הם שדות חובה');
      return;
    }
    if (!/^[0-9\-+\s()]{7,}$/.test(data.phone)) {
      setError('מספר טלפון לא תקין');
      return;
    }

    setStatus('sending');

    // Static export — send to a Formspree-style endpoint or open WhatsApp as fallback.
    const message = `ליד חדש מהאתר:\n\nשם: ${data.name}\nטלפון: ${data.phone}\nעסק: ${data.business || '-'}\nהודעה: ${data.message || '-'}`;
    const url = `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setStatus('sent');
      window.open(url, '_blank', 'noopener');
    }, 600);
  }

  return (
    <section id="lead" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
              נשארו 4 מקומות החודש
            </span>
            <h2 className="h-section mt-4 text-white">
              מוכן להפסיק לרדוף אחרי לידים?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              השאירו פרטים ונחזור אליכם תוך שעה בשעות הפעילות. נציג בכיר ייתן לכם הדגמה אישית של 20 דקות — בלי מחויבות.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.582-5.946C.165 5.335 5.503 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.55-5.34 11.887-11.893 11.887a11.9 11.9 0 01-5.688-1.45L.057 24z" /></svg>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">שלחו וואטסאפ</p>
                  <p className="font-bold">דברו איתנו עכשיו</p>
                </div>
              </a>
              <a href={phoneHref} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">חייגו ישירות</p>
                  <p className="font-bold" dir="ltr">{CONTACT.phoneHuman}</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card !p-6 sm:!p-8" noValidate>
            <h3 className="text-xl font-extrabold">שלחו פרטים</h3>
            <p className="mt-1 text-sm text-ink-500">נחזור אליכם תוך שעה בשעות הפעילות.</p>

            <div className="mt-5 grid gap-4">
              <div>
                <label className="label" htmlFor="name">שם מלא</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="input" placeholder="ישראל ישראלי" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="phone">טלפון</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" required className="input" placeholder="050-0000000" dir="ltr" />
                </div>
                <div>
                  <label className="label" htmlFor="business">שם העסק</label>
                  <input id="business" name="business" type="text" className="input" placeholder="(אופציונלי)" />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="message">מה הכי כואב לכם היום?</label>
                <textarea id="message" name="message" rows={3} className="input resize-none" placeholder="(אופציונלי)" />
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">{error}</p>
            )}
            {status === 'sent' && (
              <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                תודה! נחזור אליכם תוך שעה. אם הוואטסאפ לא נפתח אוטומטית — שלחו לנו ב-{CONTACT.phoneHuman}
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-primary mt-5 w-full disabled:opacity-60">
              {status === 'sending' ? 'שולח...' : 'שלחו פרטים — נחזור תוך שעה'}
            </button>

            <p className="mt-3 text-center text-[11px] text-ink-300">
              בלחיצה על "שלחו" אני מאשר/ת קבלת תכנים שיווקיים. ניתן להסיר בכל עת.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
