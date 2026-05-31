-- =========================================================================
-- Topic Queue Seed — initial article ideas to feed the automation pipeline
-- =========================================================================
-- Run this AFTER the schema has been created (supabase-schema.sql).
-- This gives the Make scenario 20 article ideas to chew through (over ~10 weeks
-- at 2 articles/week). Add more anytime via Supabase Table Editor or another SQL.

insert into topic_queue (category, title, primary_keyword, priority, status, secondary_keywords) values

-- ===== PAID CAMPAIGNS (5) =====
('paid-campaigns', 'איך לבחור סוכנות שיווק דיגיטלי — 10 שאלות שחייבים לשאול', 'איך לבחור סוכנות שיווק דיגיטלי', 9, 'pending', ARRAY['סוכנות פרסום','איך לבחור משווק']),
('paid-campaigns', 'מה זה Retargeting ולמה זה הכסף הכי חכם שתשקיע', 'retargeting קמפיינים', 9, 'pending', ARRAY['רימרקטינג','קמפיין חוזר']),
('paid-campaigns', 'קמפיין המרה vs קמפיין חשיפה — מתי להשתמש בכל אחד', 'קמפיין המרה חשיפה', 8, 'pending', ARRAY['conversion campaign','awareness']),
('paid-campaigns', 'כמה לידים אפשר להביא עם תקציב של 3,000 ש"ח?', 'תקציב קמפיין פייסבוק', 8, 'pending', ARRAY['קמפיין תקציב נמוך','עלות ליד']),
('paid-campaigns', 'איך להגדיל לידים לעסק בלי לבזבז כסף', 'איך להגדיל לידים', 9, 'pending', ARRAY['הגדלת לידים','מקור לידים']),

-- ===== SOCIAL MEDIA (5) =====
('social', '20 רעיונות לפוסטים לעסקים שתמיד עובדים', 'רעיונות לפוסטים לעסקים', 9, 'pending', ARRAY['פוסטים אינסטגרם','תוכן ויראלי']),
('social', 'איך לכתוב קאפשן שגורם לאנשים לעצור ולקרוא', 'כתיבת קאפשן ויראלי', 8, 'pending', ARRAY['caption אינסטגרם','קאפשן עברית']),
('social', 'מה לפרסם כשאין לך רעיונות — 7 מסגרות תוכן מוכחות', 'מסגרות תוכן', 8, 'pending', ARRAY['רעיונות לתוכן','אסטרטגיית תוכן']),
('social', 'כמה פוסטים בשבוע צריך עסק? (התשובה תפתיע אותך)', 'תדירות פרסום אינסטגרם', 7, 'pending', ARRAY['כמה לפרסם','אלגוריתם אינסטגרם']),
('social', 'אסטרטגיית סמכות בסושיאל — איך נותני שירות בונים מותג', 'אסטרטגיית סמכות סושיאל', 9, 'pending', ARRAY['authority marketing','מומחה בסושיאל']),

-- ===== AUTOMATION (5) =====
('automation', 'בניית משפך שיווקי לעסק קטן — מ-0 ל-100', 'בניית משפך שיווקי', 9, 'pending', ARRAY['funnel שיווק','משפך מכירות']),
('automation', 'מסע לקוח אוטומטי — מהרגע שלקוח מגיב ועד שהוא משלם', 'מסע לקוח אוטומטי', 9, 'pending', ARRAY['customer journey','אוטומציה מכירות']),
('automation', 'אוטומציה לעסקים עם ManyChat — 10 דוגמאות שעובדות', 'ManyChat דוגמאות', 8, 'pending', ARRAY['בוט פייסבוק','אוטומציה מסנג''ר']),
('automation', 'בוט וואטסאפ עסקי — איך להקים תוך שעה ב-2026', 'בוט וואטסאפ עסקי', 9, 'pending', ARRAY['WhatsApp Business','אוטומציה בוואטסאפ']),
('automation', '5 אוטומציות AI שכל בעל עסק חייב להכיר ב-2026', 'אוטומציות AI לעסקים', 9, 'pending', ARRAY['AI שיווק','כלי AI לעסקים']),

-- ===== CRM (5) =====
('crm', 'אינטגרציה CRM ו-Gmail — איך לחבר ולחסוך 5 שעות בשבוע', 'אינטגרציה CRM Gmail', 8, 'pending', ARRAY['CRM אימייל','חיבור Gmail']),
('crm', 'monday.com vs HubSpot — איזה CRM טוב יותר לעסק ישראלי?', 'monday vs HubSpot', 9, 'pending', ARRAY['CRM ישראלי','השוואת CRM']),
('crm', 'איך להעביר עסק מאקסל ל-CRM ב-7 ימים — מדריך מלא', 'מעבר מאקסל ל-CRM', 8, 'pending', ARRAY['העברה ל-CRM','הטמעת CRM']),
('crm', 'מה זה Pipeline ב-CRM ואיך לבנות אחד שעובד', 'pipeline CRM', 7, 'pending', ARRAY['משפך מכירות CRM','שלבי מכירה']),
('crm', 'דשבורד מכירות לעסק — מה לכלול ואיך לבנות ב-30 דקות', 'דשבורד מכירות', 8, 'pending', ARRAY['sales dashboard','KPI מכירות']);

-- Done. Should return: INSERT 0 20
-- View results: select count(*) from topic_queue where status = 'pending';
