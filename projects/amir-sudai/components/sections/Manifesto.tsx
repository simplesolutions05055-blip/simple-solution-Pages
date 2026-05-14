import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldHairline } from "@/components/ui/GoldHairline";

const principles = [
  {
    n: "01",
    title: "בהירות",
    body: "לראות את התמונה המלאה. כשהפחד קטן — היכולת לפעול גדלה.",
  },
  {
    n: "02",
    title: "אחריות",
    body: "המספרים שלך. ההחלטות שלך. אני לא בא לשפוט — אני בא להבין.",
  },
  {
    n: "03",
    title: "תנועה",
    body: "צעדים עקביים. לא פעולה אחת גדולה — תנועה מתמדת.",
  },
];

export function Manifesto() {
  return (
    <section className="relative bg-as-navy-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>המניפסט</Eyebrow>

        <div className="mt-8 grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div className="relative">
            <div className="absolute top-0 right-0 h-full w-[2px] bg-as-gold-shimmer rounded-full opacity-70" />
            <blockquote className="pe-8 font-display italic text-2xl md:text-4xl leading-[1.4] text-as-cream">
              <span>אני לא עובד רק עם כסף.</span>
              <br />
              <span>אני עובד עם אנשים.</span>
              <br />
              <span className="text-gold-shimmer not-italic font-bold">
                כסף הוא רק ההשתקפות.
              </span>
            </blockquote>
            <div className="mt-6 text-[13px] tracking-eyebrow uppercase text-as-cream/55">
              — אמיר סודאי
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-as-cream/75 leading-relaxed">
              מאחורי כל מינוס, הלוואה, תקיעות עסקית או לחץ כלכלי — יש פחד, חוסר
              בהירות, הימנעות, או תקשורת שלא הצליחה לעבוד נכון. אני לא מחפש
              פתרונות זמניים — אני בונה תנועה.
            </p>
            <p className="text-as-cream/75 leading-relaxed">
              צמיחה כלכלית אמיתית לא מתחילה בכסף. היא מתחילה באחריות, בכנות,
              ובהסתכלות אמיצה על המציאות.
            </p>
          </div>
        </div>

        <GoldHairline className="my-20" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {principles.map((p) => (
            <article
              key={p.n}
              className="group rounded-as-md border border-as-gold/15 bg-as-navy/40 p-7 transition-colors hover:border-as-gold/45"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-gold-shimmer tnum">
                  {p.n}
                </span>
                <span className="text-[10px] tracking-eyebrow uppercase text-as-cream/40">
                  עיקרון
                </span>
              </div>
              <h3 className="mt-4 font-display font-bold text-2xl text-as-cream">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] text-as-cream/70 leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
