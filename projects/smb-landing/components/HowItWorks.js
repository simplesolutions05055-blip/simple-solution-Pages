const steps = [
  {
    n: '01',
    title: 'שיחת אפיון קצרה',
    desc: '20 דקות שבהן אנחנו לומדים את העסק שלך, איך לקוחות מגיעים אליך ואיפה הצוואר-בקבוק.',
  },
  {
    n: '02',
    title: 'הקמה והעברת נתונים',
    desc: 'מקימים את המערכת, מעבירים אנשי קשר קיימים ומחברים את הוואטסאפ, הטופס באתר והטלפון.',
  },
  {
    n: '03',
    title: 'הדרכת צוות 1:1',
    desc: 'מפגש 60 דק׳ עם כל הצוות, בעברית, כולל מסמך תפעולי קצר ומוקלט להתאמה אישית.',
  },
  {
    n: '04',
    title: 'ליווי שוטף',
    desc: 'תמיכה בוואטסאפ ופגישת אופטימיזציה אחת לחודש — כדי שהמערכת תמשיך לעבוד בשבילך.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative bg-white py-20">
      <div className="container-x">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">איך זה עובד</span>
            <h2 className="h-section mt-4">מההחלטה לתוצאה — בתוך 7 ימי עבודה</h2>
          </div>
          <p className="text-lg text-ink-500">
            תהליך הקמה ברור ומסודר. אתה לא צריך להיות איש טכנולוגיה — אנחנו עושים את הכל בשבילך, מההתקנה ועד ההדרכה.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-brand-600">{s.n}</span>
                {i < steps.length - 1 && (
                  <svg className="h-6 w-6 text-brand-300 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </div>
              <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
