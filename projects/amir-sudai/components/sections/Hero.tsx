import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Halftone } from "@/components/ui/Halftone";

const principles = [
  { n: "01", word: "בהירות" },
  { n: "02", word: "אחריות" },
  { n: "03", word: "תנועה" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-as-ink pt-20 pb-24 md:pt-28 md:pb-32">
      <Halftone position="tl" />
      <Halftone position="br" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-16">
          <span
            className="text-as-gold font-display text-2xl tracking-[0.18em]"
            dir="ltr"
          >
            A·S
          </span>
          <span className="hidden sm:block text-[11px] tracking-eyebrow uppercase text-as-cream/50">
            Brand Book · Vol. 04
          </span>
        </div>

        <Eyebrow>אסטרטג לצמיחה כלכלית · ישראל</Eyebrow>

        <h1 className="mt-6 font-display font-black leading-[0.95] text-[clamp(44px,8vw,104px)] text-as-cream">
          כסף הוא רק
          <br />
          <span className="text-gold-shimmer">ההשתקפות.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg md:text-xl text-as-cream/75 leading-relaxed">
          הבעיה האמיתית — חוסר בהירות. אני מחבר בין המספרים לאדם, ובונה איתך
          תנועה אמיתית — לא דוח שמונח במגירה.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CTAButton href="#lead-form">קביעת פגישה · ₪397</CTAButton>
          <CTAButton href="#offer" variant="ghost">
            איך זה עובד
          </CTAButton>
        </div>

        <p className="mt-5 text-[13px] tracking-wide text-as-cream/55">
          בלי הבטחות · בלי מנגנונים · מי שמאמין — מגיע
        </p>

        <div className="mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl">
          {principles.map((p) => (
            <div
              key={p.n}
              className="border-t border-as-gold/30 pt-4"
            >
              <div className="font-display text-as-gold/80 text-sm tnum">{p.n}</div>
              <div className="mt-2 font-display text-2xl md:text-3xl text-as-cream">
                {p.word}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
