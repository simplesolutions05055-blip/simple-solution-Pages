# SMB Landing Page

דף נחיתה לעסקים קטנים ובינוניים — Next.js + Tailwind, עברית (RTL).
כולל ווצאפ צף, חיוג ישיר וטופס לידים.

## הרצה מקומית

```bash
npm install
npm run dev
```

הדף יעלה על http://localhost:3000

## בנייה לפרודקשן (סטטי)

```bash
npm run build
```

הפלט הסטטי נכתב לתיקיית `out/` ומוכן לפריסה ל-GitHub Pages או כל CDN.

## התאמה אישית

- **פרטי קשר ומיתוג** — `lib/contact.js` (שם המותג, טלפון, וואטסאפ, מייל, כתובת).
- **טקסטים** — בכל קומפוננטה תחת `components/`.
- **צבעים וטיפוגרפיה** — `tailwind.config.js` (פלטת `brand`) ו-`app/globals.css`.
- **טופס לידים** — `components/LeadForm.js`. כברירת מחדל ההגשה פותחת וואטסאפ עם פרטי הליד. ניתן להחליף ל-Formspree / Netlify Forms / webhook משלכם.

## סקשנים

1. Header דביק עם CTA
2. Hero עם 3 כפתורי פעולה (הדגמה, וואטסאפ, חיוג) ותצוגה מקדימה של "לוח הלידים"
3. Features — 6 יכולות
4. How it works — 4 שלבי הקמה
5. המלצות לקוחות
6. FAQ
7. Lead form עם פוליבק לוואטסאפ
8. Footer
9. כפתורים צפים: וואטסאפ + חיוג
