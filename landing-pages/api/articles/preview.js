// GET /api/articles/preview?token=...
// Shows the full article HTML preview before approval.

import { supabase } from '../lib/supabase.js';
import { verifyActionToken } from '../lib/auth.js';

export default async function handler(req, res) {
  const token = req.query?.token;
  if (!token) return res.status(400).send('Missing token');

  let claims;
  try { claims = verifyActionToken(token); }
  catch (e) { return res.status(401).send('Invalid or expired token'); }

  const { data: draft } = await supabase.from('article_drafts').select('*').eq('id', claims.draftId).single();
  if (!draft) return res.status(404).send('Draft not found');

  const { data: images } = await supabase.from('article_images').select('*').eq('draft_id', draft.id);
  const hero = images?.find(i => i.slot === 'hero')?.image_url;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>תצוגה מקדימה: ${escapeHtml(draft.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/main-site-redesign/styles.css">
</head>
<body>
<div style="position:fixed;top:0;left:0;right:0;z-index:99;background:linear-gradient(135deg,#3D1466,#5A1E94);color:#fff;padding:14px 24px;text-align:center;font-size:13px;border-bottom:2px solid #C9A961">
  👁️ <strong>תצוגה מקדימה</strong> — המאמר עדיין לא פורסם. סטטוס: <em>${draft.status}</em>
</div>
<section class="article-page-v2" style="margin-top:60px">
  <div class="article-hero-v2">
    <div class="tag-line">
      <span class="tag">${escapeHtml(draft.category)}</span>
      <i></i><span>${escapeHtml(draft.read_time || '6 דק׳')}</span>
      <i></i><span>מאת מאור עטייה</span>
    </div>
    <h1>${escapeHtml(draft.title)}</h1>
    <p class="lede">${escapeHtml(draft.excerpt || '')}</p>
  </div>
  ${hero ? `<div class="article-cover-image"><img src="${hero}" style="width:100%;max-width:1180px;border-radius:24px;display:block;margin:0 auto" alt=""></div>` : ''}
  <div class="article-layout">
    <main class="article-main">
      <article class="article-body-v2">
        <div class="answer-box">
          <div class="label">⚡ תשובה קצרה</div>
          <p>${draft.answer_short || ''}</p>
        </div>
        ${draft.body_html || ''}
      </article>
    </main>
  </div>
</section>
</body></html>`);
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
