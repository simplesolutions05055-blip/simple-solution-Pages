const items = [
  { label: "CASH", val: "+8.4K", dir: "up" as const },
  { label: "MGN", val: "23%", dir: "neutral" as const },
  { label: "LEAK", val: "-2.1K", dir: "down" as const },
  { label: "A.S", val: "+12%", dir: "up" as const },
  { label: "FLOW", val: "+4.2K", dir: "up" as const },
  { label: "BURN", val: "-0.9K", dir: "down" as const },
];

const symbol = { up: "▲", down: "▼", neutral: "●" };
const color = {
  up: "text-as-green",
  down: "text-as-red",
  neutral: "text-as-amber",
};

export function TickerTape() {
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-as-gold/15 bg-as-ink/60">
      <div className="flex gap-10 py-3 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
        {loop.map((it, i) => (
          <span
            key={i}
            className="text-[12px] tracking-[0.2em] font-medium text-as-cream/70 tnum"
            dir="ltr"
          >
            {it.label} <span className={color[it.dir]}>{symbol[it.dir]}</span>{" "}
            {it.val}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
