export function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute top-0 left-0 w-6 h-6 border-t border-l border-as-gold/60"
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-as-gold/60"
      />
      {children}
    </div>
  );
}
