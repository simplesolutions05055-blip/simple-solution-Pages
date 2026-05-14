import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
  {
    n: "01",
    title: "שיחת התאמה",
    duration: "15 דק׳",
    body: "ווטסאפ או טלפון. מוודאים שהעסק שלך מתאים. לפעמים מפנים למישהו אחר; רוב הזמן — קובעים פגישה.",
  },
  {
    n: "02",
    title: "תשלום + טופס הכנה",
    duration: "5 דק׳",
    body: "₪397 מאובטח. נשלח אליך טופס עם 7 שאלות על העסק — כך שהפגישה לא מתחילה מאפס.",
  },
  {
    n: "03",
    title: "הפגישה — האירוע",
    duration: "90–120 דק׳",
    body: "זום או פגישה פיזית. עוברים על המספרים האמיתיים — ועל מה שמתחת אליהם. יוצאים עם בהירות אחת ומהלך פרקטי לבצע מחר בבוקר.",
  },
  {
    n: "04",
    title: "סיכום ומה הלאה",
    duration: "תוך 24 שעות",
    body: "דף סיכום עם הממצאים, ההמלצה הראשית, ושתי המלצות המשך אופציונליות. בלי לחץ. בלי מכירה אגרסיבית.",
  },
];

const stats = [
  { val: "24h", label: "סיכום בכתב" },
  { val: "1", label: "מהלך לבצע" },
  { val: "7", label: "שאלות הכנה" },
  { val: "90", label: "דקות פגישה" },
];

export function Process() {
  return (
    <section className="relative bg-as-navy-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>תהליך הפגישה</Eyebrow>
          <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
            ארבעה שלבים. שעתיים.
            <br />
            <span className="text-as-gold">דף אחד עם תשובה.</span>
          </h2>
        </div>

        <ol className="mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-as-md border border-as-gold/15 bg-as-navy/30 p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-gold-shimmer tnum">
                  {s.n}
                </span>
                <span className="text-[11px] tracking-eyebrow uppercase text-as-cream/55">
                  {s.duration}
                </span>
              </div>
              <h3 className="mt-4 font-display font-bold text-2xl text-as-cream">
                {s.title}
              </h3>
              <p className="mt-3 text-as-cream/75 leading-relaxed text-[15px]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-as-gold/15 border border-as-gold/15 rounded-as-md overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-as-ink p-6 text-center">
              <div className="font-display font-black text-4xl md:text-5xl text-gold-shimmer tnum">
                {s.val}
              </div>
              <div className="mt-2 text-[12px] tracking-wide text-as-cream/65">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
