# A.S · Amir Sudai · Landing

דף נחיתה לאמיר סודאי — אסטרטג לצמיחה כלכלית. נבנה Next.js 14 (App Router) + Tailwind CSS, עברית RTL, מותאם 100% לספר המותג v4.

## הרצה מקומית

```bash
cd projects/amir-sudai
npm install
npm run dev
```

פתיחה ב-`http://localhost:3000`.

## פריסה

```bash
npm run build
npm start
```

מתאים ישירות ל-Vercel.

## הגדרות סביבה

- `LEAD_WEBHOOK_URL` (אופציונלי) — אם מוגדר, כל ליד שמתקבל ב-`/api/lead` יישלח גם ל-webhook הזה (Make / Zapier / n8n / CRM).

## עדכונים נדרשים לפני go-live

- `components/sections/LeadForm.tsx` — לעדכן `WHATSAPP_NUMBER` למספר אמיתי (כרגע placeholder).
- `components/sections/Footer.tsx` — מספר טלפון `050-XXX-XXXX`.
- `public/og.png` — להוסיף תמונת OG 1200×630.

## עמידה בברנדבוק

כל המוטיבים מספר המותג v4: צבעי A.S Navy / Gold, פונטים Frank Ruhl Libre + Rubik, halftone בפינות בלבד, hairlines זהב, ticker tape, corner frames. אין שימוש במילים האסורות (סוד / פלא / מסע / מבצע / "לא מבסוט").
