import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Rubik } from "next/font/google";
import "./globals.css";

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "אמיר סודאי · אסטרטג לצמיחה כלכלית",
  description:
    "כסף הוא רק ההשתקפות. הבעיה האמיתית — חוסר בהירות. פגישת בהירות אחת — ₪397, בלי מנגנונים, בלי הבטחות.",
  metadataBase: new URL("https://sudai.co.il"),
  openGraph: {
    title: "אמיר סודאי · בהירות. אחריות. תנועה.",
    description:
      "אסטרטג לצמיחה כלכלית לבעלי עסקים בישראל. פגישה אחת — מהלך אחד — תנועה אמיתית.",
    type: "website",
    locale: "he_IL",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${frankRuhl.variable} ${rubik.variable}`}>
      <body>{children}</body>
    </html>
  );
}
