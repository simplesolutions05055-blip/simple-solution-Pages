import Link from "next/link";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-as-gold text-as-ink hover:bg-as-gold-bright shadow-[0_0_0_1px_rgba(201,168,88,0.4),0_8px_24px_-12px_rgba(201,168,88,0.6)]",
  ghost:
    "bg-transparent text-as-cream border border-as-cream/25 hover:border-as-gold hover:text-as-gold",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-4 rounded-as-md font-medium text-[15px] tracking-wide transition-colors ${styles[variant]} ${className}`;
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
