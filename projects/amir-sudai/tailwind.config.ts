import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "as-navy": "#14253D",
        "as-ink": "#0A1828",
        "as-navy-mid": "#1F3550",
        "as-navy-light": "#3A5375",
        "as-gold": "#C9A858",
        "as-gold-bright": "#E8C77A",
        "as-gold-pale": "#F5E5B8",
        "as-bronze": "#9C7F38",
        "as-cream": "#F7F7F4",
        "as-paper": "#FAFAFA",
        "as-charcoal": "#2A3142",
        "as-green": "#2D9D5C",
        "as-red": "#C84B3F",
        "as-amber": "#D4A53A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "as-gold-shimmer":
          "linear-gradient(135deg, #C9A858 0%, #E8C77A 50%, #9C7F38 100%)",
        "as-halftone":
          "radial-gradient(circle, rgba(201,168,88,0.18) 1px, transparent 1.4px)",
      },
      borderRadius: {
        "as-sm": "8px",
        "as-md": "14px",
        "as-lg": "20px",
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
