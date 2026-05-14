import { Eyebrow } from "@/components/ui/Eyebrow";

const personas = [
  {
    initial: "ר",
    name: "רוני",
    age: 38,
    field: "שיפוצים",
    pain: "מחזור ₪85,000 בחודש. בסוף החודש אפס בעו״ש. לא מבין איפה הרווח.",
    need: "מישהו שיראה לו לאן הולך הכסף — ויגיד מה לעשות עוד השבוע.",
  },
  {
    initial: "ש",
    name: "שירלי",
    age: 44,
    field: "קליניקה אסתטית",
    pain: "רואה החשבון אמר ש״היא ברווח״. אבל אין לה כסף לקחת שכר. איך זה אפשרי?",
    need: "מישהו שיתרגם את הדוחות לעברית, ויסביר איך עסק רווחי נשאר בלי מזומן.",
  },
  {
    initial: "י",
    name: "יוסי",
    age: 51,
    field: "מוסך · 3 עובדים",
    pain: "לקח משכנתא שנייה. פערים בלתי-מוסברים. רוצה להתרחב — לא יודע אם יש כיסוי.",
    need: "איש אחד שמסתכל גם על העסק וגם על הפיננסיה האישית.",
  },
];

export function Personas() {
  return (
    <section className="relative bg-as-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>הקהל</Eyebrow>
          <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
            מי באמת מגיע
            <br />
            לפגישה הזו.
          </h2>
          <p className="mt-5 text-as-cream/70 text-lg leading-relaxed">
            בעלי עסקים קטנים-בינוניים בישראל, גילאי 35–55, עם פילפל וחלום —
            שצריכים הכוונה.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {personas.map((p) => (
            <article
              key={p.name}
              className="relative rounded-as-md border border-as-gold/15 bg-as-navy/40 p-7 flex flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-as-gold/15 border border-as-gold/40 flex items-center justify-center font-display text-2xl text-as-gold">
                  {p.initial}
                </div>
                <div>
                  <div className="font-display text-xl text-as-cream">
                    {p.name}, {p.age}
                  </div>
                  <div className="text-[12px] tracking-wide text-as-cream/55 mt-0.5">
                    {p.field}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center gap-2 text-[10px] tracking-eyebrow uppercase text-as-red">
                  <span className="w-1.5 h-1.5 rounded-full bg-as-red" />
                  הכאב
                </div>
                <p className="mt-2 text-as-cream/85 leading-relaxed text-[15px]">
                  {p.pain}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-[10px] tracking-eyebrow uppercase text-as-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-as-green" />
                  הצורך
                </div>
                <p className="mt-2 text-as-cream/75 leading-relaxed text-[15px]">
                  {p.need}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 text-[13px] text-as-cream/50">
          <span className="font-display text-as-gold/70 text-lg" dir="ltr">
            ≠
          </span>
          <span>
            לא הקהל: סטארטאפ, תאגיד, ״עסק״ של שעתיים בשבוע.
          </span>
        </div>
      </div>
    </section>
  );
}
