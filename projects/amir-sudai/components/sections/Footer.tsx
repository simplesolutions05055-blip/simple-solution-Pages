import { GoldHairline } from "@/components/ui/GoldHairline";

export function Footer() {
  return (
    <footer className="relative bg-as-ink pt-16 pb-10">
      <GoldHairline />
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <div
              className="font-display text-3xl text-as-gold tracking-[0.18em]"
              dir="ltr"
            >
              A·S
            </div>
            <div className="mt-3 font-display text-xl text-as-cream">
              אמיר סודאי
            </div>
            <div className="text-as-cream/55 text-sm">
              אסטרטג לצמיחה כלכלית
            </div>
            <div className="mt-6 text-gold-shimmer font-display text-lg">
              בהירות. אחריות. תנועה.
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-eyebrow uppercase text-as-cream/55">
              קישורים
            </div>
            <ul className="mt-4 space-y-2 text-as-cream/80">
              <li>
                <a href="#offer" className="hover:text-as-gold transition-colors">
                  ההצעה
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-as-gold transition-colors">
                  קביעת פגישה
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/amir_sudai_business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-as-gold transition-colors"
                >
                  @amir_sudai_business
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-eyebrow uppercase text-as-cream/55">
              קשר
            </div>
            <ul className="mt-4 space-y-2 text-as-cream/80" dir="ltr">
              <li>050-XXX-XXXX</li>
              <li>sudai.co.il</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-as-gold/10 flex flex-wrap items-center justify-between gap-4 text-[12px] text-as-cream/45">
          <span>© 2026 · A·S · אמיר סודאי</span>
          <span className="font-display italic text-as-cream/60">
            ״בהירות לפני פתרון.״
          </span>
        </div>
      </div>
    </footer>
  );
}
