const features = [
  {
    title: 'ווצאפ ישיר מהמערכת',
    desc: 'שלחו וקבלו הודעות וואטסאפ ללא יציאה מהמסך, עם תבניות מוכנות ומעקב פתיחה.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.582-5.946C.165 5.335 5.503 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.55-5.34 11.887-11.893 11.887a11.9 11.9 0 01-5.688-1.45L.057 24z" /></svg>
    ),
  },
  {
    title: 'חיוג בקליק אחד',
    desc: 'לחיצה על איש קשר מחייגת ישירות מהדפדפן או מהנייד, עם רישום אוטומטי של השיחה.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
    ),
  },
  {
    title: 'טפסי לידים חכמים',
    desc: 'הטופס באתר זורם ישר לתוך המערכת, כולל מקור, קמפיין וניתוב אוטומטי לאיש הצוות הנכון.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
    ),
  },
  {
    title: 'מעקב שיחות אוטומטי',
    desc: 'כל שיחה, הודעה ומייל נשמרים בתיק הלקוח. אין יותר "מי דיבר איתו אחרון?".',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
    ),
  },
  {
    title: 'דוחות ש-באמת מבינים',
    desc: 'מאיפה הגיעו הלקוחות שסגרו, מה זמן התגובה הממוצע, ומי המוכר המוביל בצוות.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-7" /></svg>
    ),
  },
  {
    title: 'אוטומציות שעובדות לבד',
    desc: 'תזכורות, מעקבים והודעות יום-אחרי נשלחים אוטומטית — גם כשאתה בשטח.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" /></svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">למה דווקא אנחנו</span>
          <h2 className="h-section mt-4">כלי אחד שמחליף 5 פלטפורמות</h2>
          <p className="mt-4 text-lg text-ink-500">
            במקום לקפוץ בין אקסל, וואטסאפ, יומן וטלפון — תקבלו מסך אחד נקי שמראה בדיוק מה לעשות עכשיו.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card group transition hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
