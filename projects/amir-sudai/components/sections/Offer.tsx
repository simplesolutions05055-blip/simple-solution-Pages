import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Halftone } from "@/components/ui/Halftone";

export function Offer() {
  return (
    <section id="offer" className="relative overflow-hidden bg-as-ink py-24 md:py-32">
      <Halftone position="tr" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
          <div>
            <Eyebrow>ההצעה</Eyebrow>
            <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
              ₪397 לפגישה.
              <br />
              <span className="text-as-cream/55">בלי הבטחות.</span>
            </h2>
            <p className="mt-6 text-as-cream/75 text-lg leading-relaxed max-w-lg">
              זה לא מחיר שיווקי. זה דמי רצינות — כדי שמי שמגיע, מגיע באמת לעבוד.
              מי שמאמין בי — יגיע וישלם באהבה. השאר — לא הקהל שלי.
            </p>

            <ul className="mt-8 space-y-3 text-as-cream/80">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-as-gold shrink-0" />
                בלי ערבות החזר. בלי מנגנון ״לא מבסוט״.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-as-gold shrink-0" />
                שעתיים של בהירות, ומהלך אחד פרקטי שאפשר להתחיל בו מחר בבוקר.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-as-gold shrink-0" />
                סיכום בכתב תוך 24 שעות אחרי הפגישה.
              </li>
            </ul>

            <div className="mt-10">
              <CTAButton href="#lead-form">להשארת פרטים</CTAButton>
            </div>
          </div>

          {/* Number block */}
          <div className="relative rounded-as-lg border border-as-gold/25 bg-as-navy/30 p-10 md:p-14 text-center overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 halftone"
              style={{ maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="text-[11px] tracking-eyebrow uppercase text-as-cream/55">
                דמי רצינות
              </div>
              <div className="mt-3 font-display font-black text-[clamp(96px,18vw,180px)] leading-none text-gold-shimmer tnum">
                ₪397
              </div>
              <div className="mt-3 font-display text-2xl text-as-cream">
                לפגישה.
              </div>
              <div className="mt-1 text-as-cream/60 text-sm">
                בלי מנגנונים. בלי הבטחות.
              </div>
              <div className="mt-8 pt-6 border-t border-as-gold/15">
                <div className="text-[11px] tracking-eyebrow uppercase text-as-gold/80">
                  Mutual Commitment
                </div>
                <div className="mt-2 font-display italic text-as-cream/85">
                  ״מי שמאמין בי — מגיע.״
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
