import { Eyebrow } from "@/components/ui/Eyebrow";
import { TickerTape } from "@/components/ui/TickerTape";

const pairs = [
  { left: "כלכלי", right: "אנושי", verb: "חיבור" },
  { left: "תזרים", right: "רגשות", verb: "תרגום" },
  { left: "החלטות", right: "חזון", verb: "מבט" },
  { left: "מציאות", right: "עתיד", verb: "בנייה" },
];

export function Approach() {
  return (
    <section className="relative bg-as-navy-deep">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl">
          <Eyebrow>הגישה · המבט הכפול</Eyebrow>
          <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
            אדם <span className="text-as-gold">+</span> מספר.
          </h2>
          <p className="mt-5 text-as-cream/70 text-lg leading-relaxed">
            רואי חשבון נותנים דוחות. מאמנים נותנים מוטיבציה. אני מחבר בין
            המספרים לבין האדם — ובונה תנועה אמיתית מתוך בהירות.
          </p>
        </div>

        <div className="mt-14 rounded-as-lg border border-as-gold/15 bg-as-navy/30 p-8 md:p-12">
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {pairs.map((p) => (
              <li
                key={p.verb}
                className="flex items-center justify-between gap-4 border-b border-as-gold/10 pb-5"
              >
                <span className="font-display text-xl md:text-2xl text-as-cream">
                  {p.left}
                </span>
                <span className="text-as-gold/80 font-display text-2xl">↔</span>
                <span className="font-display text-xl md:text-2xl text-as-cream">
                  {p.right}
                </span>
                <span className="ms-auto text-[11px] tracking-eyebrow uppercase text-as-cream/45">
                  {p.verb}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TickerTape />
    </section>
  );
}
