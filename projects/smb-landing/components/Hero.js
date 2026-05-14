import { CONTACT, phoneHref, whatsappHref } from '@/lib/contact';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute -top-32 right-1/3 h-96 w-96 rounded-full bg-brand-200/60 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
            בנוי לעסקים קטנים ובינוניים בישראל
          </span>

          <h1 className="h-display mt-5">
            כל הלידים, השיחות והווצאפ של העסק שלך — <span className="bg-gradient-to-l from-brand-600 to-brand-400 bg-clip-text text-transparent">במערכת אחת</span>.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
            מספיק לרדוף אחרי לקוחות בין וואטסאפ, מיילים ופנקסי טלפון.
            סימפל סולושן מרכזת הכל במקום אחד — כך שאף ליד לא נופל ושום שיחה לא הולכת לאיבוד.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#lead" className="btn-primary">
              קבלו הדגמה חינם
              <svg className="h-4 w-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener" className="btn-ghost">
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.582-5.946C.165 5.335 5.503 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.55-5.34 11.887-11.893 11.887a11.9 11.9 0 01-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.683 5.595l-.999 3.648 3.805-.942zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.474-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              שלחו וואטסאפ
            </a>
            <a href={phoneHref} className="btn-ghost">
              <svg className="h-4 w-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              חייגו עכשיו
            </a>
          </div>

          <ul className="mt-8 grid max-w-md grid-cols-2 gap-3 text-sm text-ink-700">
            {[
              'ללא התקנה, ללא הסכם שנתי',
              'הקמה תוך 7 ימי עבודה',
              'תמיכה אנושית בעברית',
              'אינטגרציה לווצאפ Business',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-1 shadow-glow">
            <div className="rounded-[1.7rem] bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink-300">לוח לידים – היום</p>
                  <p className="text-2xl font-extrabold">17 לידים חדשים</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">+34%</span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { name: 'דנה לוי', source: 'WhatsApp', tag: 'חם', tone: 'bg-rose-50 text-rose-700' },
                  { name: 'יואב כהן', source: 'טופס באתר', tag: 'חדש', tone: 'bg-brand-50 text-brand-700' },
                  { name: 'מירב אזולאי', source: 'שיחת טלפון', tag: 'בטיפול', tone: 'bg-amber-50 text-amber-700' },
                ].map((l) => (
                  <div key={l.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-brand-700 shadow-sm">
                        {l.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{l.name}</p>
                        <p className="text-xs text-ink-500">דרך {l.source}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${l.tone}`}>{l.tag}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat label="שיחות" value="42" />
                <Stat label="הוצעו" value="9" />
                <Stat label="נסגרו" value="5" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 hidden rotate-[-6deg] rounded-2xl bg-white p-3 shadow-soft ring-1 ring-slate-100 md:block">
            <p className="text-xs font-semibold text-ink-500">זמן תגובה ממוצע</p>
            <p className="text-2xl font-extrabold text-brand-700">{'< 2 דק׳'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 py-2">
      <p className="text-lg font-extrabold">{value}</p>
      <p className="text-[11px] font-semibold text-ink-500">{label}</p>
    </div>
  );
}
