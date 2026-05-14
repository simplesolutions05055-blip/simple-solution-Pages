export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-bold tracking-eyebrow uppercase text-as-gold/90">
      {children}
    </span>
  );
}
