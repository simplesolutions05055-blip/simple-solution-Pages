# Article Automation Pipeline — Setup Guide

מערכת אוטומציה מלאה ליצירת + פרסום + עדכון מאמרי SEO לאתר Simple Solutions.

```
[Make.com Cron]                                 [Vercel API]                          [GitHub]
  Mon + Thu 09:00                                                                       
       │                                                                                
       ▼                                                                                
   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      
   │ Supabase     │    │ Claude API   │    │ Nano Banana  │    │ Cloudinary   │      
   │ topic_queue  │───▶│ article gen  │───▶│ × 3 images   │───▶│ host images  │      
   └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘      
                                                                       │              
                                                                       ▼              
                                                          ┌─────────────────────┐    
                                                          │ POST /api/articles/ │    
                                                          │      receive        │    
                                                          └──────────┬──────────┘    
                                                                     │                
                       ┌──────────────────────────────────────────────┘                
                       ▼                                                               
                ┌──────────────┐    ┌──────────────┐                                  
                │ Resend Email │───▶│ Editor click │                                  
                │  + 3 actions │    │   approve    │                                  
                └──────────────┘    └──────┬───────┘                                  
                                           │                                          
                                           ▼                                          
                                  ┌──────────────────┐                                
                                  │ /api/articles/   │                                
                                  │     action       │                                
                                  └────────┬─────────┘                                
                                           │                                          
                                           ▼                                          
                                  ┌──────────────────┐                                
                                  │ GitHub commit    │                                
                                  │ → Vercel deploy  │                                
                                  └──────────────────┘                                
```

---

## Setup Steps (do these once, ~2-3 hours total)

### 1. Supabase

1. Create a free account at https://supabase.com → New project
2. SQL Editor → paste `automation/supabase-schema.sql` → Run
3. Settings → API → copy:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key (NOT anon!) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Resend (transactional email)

1. https://resend.com → free tier = 3,000 emails/month
2. Add your domain (`simple-solution.co.il`) → verify DNS records
3. API Keys → create one with **Send access** → `RESEND_API_KEY`
4. Pick the sender address: `articles@simple-solution.co.il` → `APPROVAL_FROM_EMAIL`

### 3. GitHub Token (publish approved articles)

1. https://github.com/settings/personal-access-tokens/new
2. Fine-grained token, expires in 1 year
3. **Repository access** → select `simple-solution-Pages` only
4. **Permissions** → Contents: **Read and write**
5. Copy the token → `GITHUB_TOKEN`

### 4. Anthropic API (Claude — article generation)

1. https://console.anthropic.com → API Keys
2. Create new key, add credit ($10 covers ~200 articles)
3. Save for Make.com (NOT for Vercel) → `ANTHROPIC_API_KEY`

### 5. Google AI Studio (Nano Banana / Gemini Image)

1. https://aistudio.google.com → Get API Key
2. Enable: Gemini API + Gemini Image
3. Save for Make.com → `GEMINI_API_KEY`
4. Free tier = 1,500 images/day (more than enough)

### 6. Cloudinary (image hosting)

1. https://cloudinary.com → free tier = 25 GB storage
2. Dashboard → grab:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### 7. Generate the secrets

```bash
# JWT signing key
openssl rand -hex 32 > .secret-jwt.txt

# Webhook secret (Make ↔ Vercel handshake)
openssl rand -hex 16 > .secret-webhook.txt
```

### 8. Add env vars to Vercel

Open https://vercel.com → simple-solution-pages project → Settings → Environment Variables.

Add each var from `automation/.env.example`. **Mark all as "Production + Preview + Development"**.

Then redeploy: `Deployments → ... → Redeploy`.

Verify it works:
```bash
curl https://www.simple-solution.co.il/api/health
# Should return { ok: true, env: { supabase: true, resend: true, ... } }
```

### 9. Import the Make.com scenario

1. https://make.com → free tier = 1,000 ops/month (= ~30 articles)
2. Scenarios → **+ Create a new scenario** → Import Blueprint
3. Upload `automation/make-scenario.json`
4. Connect each module to your API keys (you'll be prompted)
5. Click the trigger module → Set schedule = "On Demand" first (for testing)
6. Test → Run once → verify it hits your `/api/articles/receive` endpoint
7. Once verified, switch trigger back to "Schedule" = Mon + Thu 09:00 IL

### 10. Seed the topic queue

In Supabase SQL Editor, run:

```sql
insert into topic_queue (category, title, primary_keyword, priority, status) values
('paid-campaigns', 'איך לבחור סוכנות שיווק דיגיטלי — 10 שאלות שחייבים לשאול', 'איך לבחור סוכנות שיווק דיגיטלי', 9, 'pending'),
('automation', 'בניית משפך שיווקי לעסק קטן — מ-0 ל-100', 'בניית משפך שיווקי', 9, 'pending'),
('crm', 'אינטגרציה CRM ו-Gmail — מדריך 2026', 'אינטגרציה CRM Gmail', 8, 'pending'),
('social', 'איך לכתוב קאפשן שגורם לאנשים לעצור ולקרוא', 'כתיבת קאפשן ויראלי', 8, 'pending'),
('paid-campaigns', 'מה זה Retargeting ולמה זה הכסף הכי חכם שתשקיע', 'retargeting קמפיינים', 9, 'pending');
```

המערכת תהפוך אותם למאמרים אוטומטית בימי ב' וה' הקרובים.

---

## How the editor experience works

1. **שני בבוקר 09:00** — Make.com מתחיל. בוחר את הנושא הבא ב-`topic_queue`.
2. **תוך 60 שניות** — Claude כותב את המאמר, Nano Banana מייצר 3 תמונות.
3. **תוך עוד 30 שניות** — Vercel מקבל את התוצאה ושומר ב-Supabase, ושולח לך מייל.
4. **המייל שלך** — תצוגה מקדימה מלאה + 3 כפתורים:
   - **✅ אשר ופרסם** → ה-API עושה commit ל-GitHub → Vercel דופלוי → המאמר חי תוך 60 שניות
   - **🔄 תיקונים** → טופס פתוח. תכתוב "תוסיף סטטיסטיקה X" → Make מקבל ומיצר גרסה מתוקנת
   - **🗑️ פסול** → המאמר נארכב, הנושא חוזר לתור

---

## Maintenance

### Adding new topics

Two options:

**A — ידני:** הוסף ל-`topic_queue` ב-Supabase
```sql
insert into topic_queue (category, title, primary_keyword) values
('crm', 'נושא חדש', 'מילת מפתח');
```

**B — אוטומטי (Phase 3):** סוכן DataForSEO רץ שבועית, סורק טרנדים, ומוסיף נושאים חמים אוטומטית.

### Updating existing articles

יוסף בעתיד — `/api/articles/refresh-seo` יעבור על המאמרים הקיימים פעם בחודש, יבדוק את הסטטיסטיקות (ScrapingBee + GSC), ויצור עדכון אם נדרש.

### Connecting to Meta / TikTok / Google updates

יוסף ב-Phase 4 — Make scenario נפרד שעוקב אחרי:
- Meta for Business Blog RSS
- TikTok for Business Blog RSS
- Google Ads & Analytics Blog RSS
- Claude מסכם שבועית מה חדש → יוצר מאמר עדכון אוטומטי

---

## Cost summary (per month)

| שירות | חבילה | מחיר |
|---|---|---|
| Vercel | Hobby (חינם עד 100GB bandwidth) | $0 |
| Supabase | Free tier | $0 |
| Resend | 3,000 emails/חודש (חינם) | $0 |
| Cloudinary | 25GB (חינם) | $0 |
| Make.com | Core 10K ops | $9 |
| Anthropic Claude | ~8 מאמרים/חודש | ~$3 |
| Google Gemini Image | 24 תמונות/חודש (free tier) | $0 |
| **סה"כ** | | **$12/חודש** |

---

## Troubleshooting

**`/api/health` returns env.supabase: false?**
→ Vercel env vars לא נטענו. ודא שהוספת ל-Production environment, ושעשית Redeploy.

**Make scenario fails on `/api/articles/receive` with 401?**
→ `X-Webhook-Secret` header לא תואם ל-`WEBHOOK_SECRET` ב-Vercel.

**Approval email לא מגיע?**
→ בדוק את ה-DNS verification ב-Resend. גם בדוק את ה-spam folder.

**Approve clicked → commit fails?**
→ ה-GITHUB_TOKEN פג תוקף או שאין לו write permission ל-repo הנכון.
