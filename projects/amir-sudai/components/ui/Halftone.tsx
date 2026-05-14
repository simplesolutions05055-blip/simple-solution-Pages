type Position = "tl" | "tr" | "bl" | "br";

const positions: Record<Position, string> = {
  tl: "top-0 left-0 [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]",
  tr: "top-0 right-0 [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]",
  bl: "bottom-0 left-0 [mask-image:linear-gradient(to_top_right,black,transparent_70%)]",
  br: "bottom-0 right-0 [mask-image:linear-gradient(to_top_left,black,transparent_70%)]",
};

export function Halftone({
  position = "tr",
  size = "w-[280px] h-[280px] md:w-[420px] md:h-[420px]",
}: {
  position?: Position;
  size?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute halftone ${size} ${positions[position]}`}
    />
  );
}
