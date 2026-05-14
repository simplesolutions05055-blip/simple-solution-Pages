const faqs = [
  {
    q: 'כמה זמן לוקח להקים את המערכת?',
    a: 'בין 5 ל-7 ימי עבודה מרגע החתימה. מהיום הראשון אתם כבר רואים את הלידים החדשים נכנסים פנימה.',
  },
  {
    q: 'אני צריך לחתום על הסכם שנתי?',
    a: 'לא. אנחנו עובדים במנוי חודשי בלי התחייבות. אם זה לא עובד לך — אתה עוצר. בלי שאלות.',
  },
  {
    q: 'האם זה מתאים גם לעסקים של איש אחד?',
    a: 'בהחלט. רוב הלקוחות שלנו הם עסקים של 1-15 עובדים. בנינו את הכלי בדיוק כך שיהיה פשוט להפעלה.',
  },
  {
    q: 'איך מתבצעת אינטגרציית הוואטסאפ?',
    a: 'אנחנו מחברים אותך לוואטסאפ Business הרשמי של מטא, כך שכל ההיסטוריה נשמרת ואתה עומד בכל הרגולציה.',
  },
  {
    q: 'אם יש לי כבר מערכת היום — אפשר לעבור?',
    a: 'כן. צוות ההקמה שלנו מעביר את כל הנתונים מהמערכת הקודמת (Excel, Monday, HubSpot ועוד) בלי לאבד דבר.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">שאלות נפוצות</span>
          <h2 className="h-section mt-4">כל מה ששאלת לפני שהתחלת</h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-soft open:shadow-glow"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[15px] font-bold">{f.q}</span>
                <svg className="h-5 w-5 shrink-0 text-brand-600 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
