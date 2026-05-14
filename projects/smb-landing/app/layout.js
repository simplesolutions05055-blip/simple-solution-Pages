import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata = {
  title: 'פתרונות דיגיטל לעסקים קטנים ובינוניים | Simple Solution',
  description:
    'מערכת אחת שמרכזת לידים, ווצאפ, שיחות ומעקב לקוחות — בנויה במיוחד לעסקים קטנים ובינוניים בישראל. הקמה תוך 7 ימים.',
  openGraph: {
    title: 'פתרונות דיגיטל לעסקים קטנים ובינוניים',
    description:
      'מערכת אחת לכל הלידים, השיחות והווצאפ של העסק שלך. הקמה תוך 7 ימים.',
    type: 'website',
    locale: 'he_IL',
  },
};

export const viewport = {
  themeColor: '#205bef',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
