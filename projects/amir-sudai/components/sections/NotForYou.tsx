import { Eyebrow } from "@/components/ui/Eyebrow";

const notFor = [
  "סטארטאפים מחפשי קרן",
  "תאגידים ואנשי כספים פנימיים",
  "מי שמחפש ערבות החזר או ״סוד של עשירים״",
  "מי שלא מתכוון לשבת מול המספרים בעצמו",
];

export function NotForYou() {
  return (
    <section className="relative bg-as-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
          <div>
            <Eyebrow>שיהיה ברור</Eyebrow>
            <h2 className="mt-5 font-display font-extrabold text-4xl md:text-5xl leading-tight text-as-cream">
              למי זה
              <br />
              <span className="text-as-red">לא מתאים.</span>
            </h2>
            <p className="mt-6 text-as-cream/70 leading-relaxed">
              אני לא מוכר ביטחון. אני נותן שעתיים של בהירות — ואת המהלך הבא לקבל
              איתו החלטה. מי שצריך ״להבטיח שלא יפסיד״ כדי להגיע — כנראה לא במקום
              הנכון לפגישה הזו.
            </p>
          </div>

          <ul className="space-y-3">
            {notFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-as-md border border-as-red/20 bg-as-navy/20 p-5"
              >
                <span className="mt-1 w-5 h-5 rounded-full border border-as-red/60 flex items-center justify-center text-as-red text-xs font-bold">
                  ✕
                </span>
                <span className="text-as-cream/85 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
