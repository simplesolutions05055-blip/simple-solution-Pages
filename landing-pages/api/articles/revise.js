// GET  /api/articles/revise?token=...  → shows a revision form
// POST /api/articles/revise              → submits revision notes (form action)
// Stores the revision_notes on the draft and marks status="revising".
// Make scenario polls drafts with status="revising" to regenerate.

import { supabase } from '../lib/supabase.js';
import { verifyActionToken } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') return showForm(req, res);
  if (req.method === 'POST') return submitRevision(req, res);
  return res.status(405).end();
}

async function showForm(req, res) {
  const token = req.query?.token;
  if (!token) return resHtml(res, 400, page('חסר token.'));

  let claims;
  try { claims = verifyActionToken(token); }
  catch (e) { return resHtml(res, 401, page('הקישור פג תוקף.')); }

  const { data: draft } = await supabase.from('article_drafts').select('*').eq('id', claims.draftId).single();
  if (!draft) return resHtml(res, 404, page('המאמר לא נמצא.'));

  return resHtml(res, 200, formPage(draft, token));
}

async function submitRevision(req, res) {
  const body = typeof req.body === 'string' ? Object.fromEntries(new URLSearchParams(req.body)) : (req.body || {});
  const token = body.token;
  const notes = body.notes || '';
  if (!token) return res.status(400).json({ error: 'Missing token' });

  let claims;
  try { claims = verifyActionToken(token); }
  catch (e) { return res.status(401).json({ error: 'Invalid token' }); }

  await supabase.from('article_drafts').update({
    status: 'revising',
    revision_notes: notes,
    revision_count: (await supabase.from('article_drafts').select('revision_count').eq('id', claims.draftId).single()).data?.revision_count + 1 || 1,
  }).eq('id', claims.draftId);

  await supabase.from('approval_events').insert({
    draft_id: claims.draftId,
    action: 'revised',
    notes,
  });

  return resHtml(res, 200, page('התיקונים נשלחו ✅', `<p>ה-AI יקבל את ההערות ויחזור עם גרסה מתוקנת תוך כמה דקות.</p><div style="margin-top:24px;padding:16px;background:#F8F2FF;border-radius:12px;text-align:right;font-size:14px;color:#5a4a6a"><strong>ההערות שלך:</strong><br>${escapeHtml(notes)}</div>`));
}

function resHtml(res, status, html) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(status).send(html);
}

function page(title, extra = '') {
  return `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8"><title>${title}</title><style>body{margin:0;background:#F8F2FF;font-family:'Heebo',sans-serif;color:#1F0B33;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.card{background:#fff;max-width:520px;padding:48px 36px;border-radius:24px;text-align:center;box-shadow:0 30px 70px -20px rgba(31,11,51,.2);border:1px solid rgba(201,169,97,.3)}h1{font-size:24px;margin:0 0 12px;font-weight:800}</style></head><body><div class="card"><h1>${title}</h1>${extra}</div></body></html>`;
}

function formPage(draft, token) {
  return `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>תיקונים — ${escapeHtml(draft.title)}</title><style>
body{margin:0;background:#F8F2FF;font-family:'Heebo','Arial Hebrew',sans-serif;color:#1F0B33;min-height:100vh;padding:32px 16px}
.card{background:#fff;max-width:680px;margin:0 auto;padding:36px 32px;border-radius:24px;box-shadow:0 30px 70px -20px rgba(31,11,51,.18);border:1px solid rgba(201,169,97,.3)}
h1{font-size:22px;margin:0 0 6px;font-weight:800}
.sub{font-size:14px;color:#8a7a8a;margin-bottom:24px}
.snippet{padding:14px 18px;background:linear-gradient(135deg,#EFE5FB,#FFFBED);border-radius:12px;font-size:14px;line-height:1.6;color:#5a4a6a;margin-bottom:24px;text-align:right}
label{display:block;font-size:13px;font-weight:600;margin-bottom:8px;color:#5a4a6a}
textarea{width:100%;min-height:180px;padding:14px 16px;border-radius:14px;border:1px solid #D4C0F7;font:500 15px/1.6 'Heebo',sans-serif;color:#1F0B33;resize:vertical;box-sizing:border-box}
textarea:focus{outline:none;border-color:#C9A961;box-shadow:0 0 0 4px rgba(201,169,97,.15)}
.hint{font-size:12px;color:#8a7a8a;margin:8px 0 18px;line-height:1.5}
button{width:100%;padding:16px;background:linear-gradient(135deg,#d9b86c,#c9a961);color:#1F0B33;border:none;border-radius:99px;font-weight:700;font-size:15px;cursor:pointer}
</style></head><body><div class="card">
<h1>תיקונים למאמר</h1>
<div class="sub">${escapeHtml(draft.title)}</div>
<div class="snippet">${escapeHtml(draft.excerpt || '')}</div>
<form method="POST" action="/api/articles/revise">
  <input type="hidden" name="token" value="${token}">
  <label for="notes">מה לתקן?</label>
  <textarea id="notes" name="notes" placeholder="למשל: 'תוסיף סטטיסטיקה על Meta בישראל 2026 בפסקה 2', 'תקצר את ההקדמה ל-2 משפטים', 'תחליף את הכותרת ל-X'..."></textarea>
  <div class="hint">הערות חופשיות. ה-AI יבין את ההקשר וייצור גרסה חדשה. תקבל מייל חוזר תוך כמה דקות.</div>
  <button type="submit">שלח תיקונים</button>
</form>
</div></body></html>`;
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
