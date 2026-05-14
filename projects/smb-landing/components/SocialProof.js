const testimonials = [
  {
    quote: 'תוך חודש הזמן תגובה ירד מ-3 שעות ל-7 דקות. הלקוחות מרגישים את זה, וזה משפיע על הסגירות.',
    name: 'שני בן-דוד',
    role: 'מנכ"לית, סטודיו לעיצוב פנים',
  },
  {
    quote: 'סוף סוף ראיתי מאיפה מגיעים הלידים שבאמת קונים. הפסקתי לבזבז כסף על קמפיין שלא עבד.',
    name: 'אבי שמש',
    role: 'בעלים, מוסך שמש בע"מ',
  },
  {
    quote: 'הצוות שלי הפסיק לרשום פתקים. הכל בלחיצה אחת — וזה החזיר לי את סוף השבוע.',
    name: 'נועה כרמי',
    role: 'מנהלת מכון יופי',
  },
];

export default function SocialProof() {
  return (
    <section className="py-16">
      <div className="container-x">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card relative">
              <svg className="absolute -top-3 right-6 h-7 w-7 text-brand-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H5a1 1 0 01-1-1V7a4 4 0 014-4h1a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 00-1 1v1h2a1 1 0 011 1v4a3 3 0 01-3 3H5a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 001-1v-1zm10 0h-4a1 1 0 01-1-1V7a4 4 0 014-4h1a1 1 0 011 1v2a1 1 0 01-1 1h-1a1 1 0 00-1 1v1h2a1 1 0 011 1v4a3 3 0 01-3 3h-1a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 001-1v-1z" />
              </svg>
              <blockquote className="text-[15px] leading-relaxed text-ink-700">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-extrabold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
