// GET /api/articles/action?token=...
// Handles email clicks: approve, reject, (and preview).
// "Approve" → publishes the article to GitHub → triggers Vercel deploy.
// "Reject"  → marks draft as rejected.
// "Preview" → returns the article HTML for review.

import { supabase } from '../lib/supabase.js';
import { verifyActionToken } from '../lib/auth.js';
import { commitFile } from '../lib/github.js';

export default async function handler(req, res) {
  const token = req.query?.token;
  if (!token) return resHtml(res, 400, errorPage('חסר token. הקישור לא תקף.'));

  let claims;
  try {
    claims = verifyActionToken(token);
  } catch (e) {
    return resHtml(res, 401, errorPage('הקישור פג תוקף או לא תקף.', e.message));
  }

  const { draftId, action } = claims;

  // Load the draft
  const { data: draft, error } = await supabase
    .from('article_drafts').select('*').eq('id', draftId).single();
  if (error || !draft) return resHtml(res, 404, errorPage('המאמר לא נמצא.'));

  if (action === 'preview') return previewPage(res, draft);
  if (action === 'approve') return handleApprove(res, draft);
  if (action === 'reject')  return handleReject(res, draft);

  return resHtml(res, 400, errorPage('פעולה לא ידועה.'));
}

// ---------- APPROVE ----------
async function handleApprove(res, draft) {
  if (draft.status === 'published') {
    return resHtml(res, 200, successPage('המאמר כבר פורסם בעבר', draft));
  }

  // Build the final HTML file from the stored body_json + body_html
  const fileContent = renderFinalHtml(draft);
  const path = `landing-pages/main-site-redesign/articles/${draft.slug}/index.html`;

  try {
    const sha = await commitFile({
      path,
      content: fileContent,
      message: `feat(article): publish "${draft.title.slice(0, 60)}"\n\nApproved via email by ${process.env.APPROVAL_TO_EMAIL || 'editor'}\nDraft id: ${draft.id}`,
    });

    await supabase.from('article_drafts').update({
      status: 'published',
      published_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
      approved_by: process.env.APPROVAL_TO_EMAIL || 'email',
    }).eq('id', draft.id);

    await supabase.from('approval_events').insert({
      draft_id: draft.id,
      action: 'published',
      payload: { commit_sha: sha, path },
    });

    return resHtml(res, 200, successPage('המאמר אושר ופורסם! 🎉', draft));
  } catch (e) {
    console.error('[approve] commit failed', e);
    return resHtml(res, 500, errorPage('הפרסום נכשל', e.message));
  }
}

// ---------- REJECT ----------
async function handleReject(res, draft) {
  await supabase.from('article_drafts').update({ status: 'rejected' }).eq('id', draft.id);
  await supabase.from('approval_events').insert({ draft_id: draft.id, action: 'rejected' });
  return resHtml(res, 200, successPage('המאמר נארכב. תודה.', draft, '#5a4a6a'));
}

// ---------- HELPERS ----------
function resHtml(res, status, html) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(status).send(html);
}

function shell(body) {
  return `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Simple Solutions</title><style>
body{margin:0;background:#F8F2FF;font-family:'Heebo','Arial Hebrew',sans-serif;color:#1F0B33;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.card{background:#fff;max-width:520px;padding:48px 36px;border-radius:24px;text-align:center;box-shadow:0 30px 70px -20px rgba(31,11,51,.2);border:1px solid rgba(201,169,97,.3)}
h1{font-size:28px;margin:0 0 12px;color:#1F0B33;font-weight:800}
p{color:#5a4a6a;line-height:1.6;font-size:15px;margin:0 0 8px}
.meta{font-size:13px;color:#8a7a8a;margin-top:18px;padding-top:18px;border-top:1px solid #EFE5FB}
.btn{display:inline-block;margin-top:24px;padding:14px 28px;background:linear-gradient(135deg,#d9b86c,#c9a961);color:#1F0B33;text-decoration:none;border-radius:99px;font-weight:700;font-size:14px}
</style></head><body><div class="card">${body}</div></body></html>`;
}

function successPage(message, draft, color = '#C9A961') {
  return shell(`
    <div style="font-size:48px;margin-bottom:12px">${color === '#C9A961' ? '✅' : '🗂️'}</div>
    <h1>${message}</h1>
    <p>${escapeHtml(draft.title)}</p>
    <div class="meta">
      <div>סטטוס: ${draft.status === 'published' ? 'פורסם' : 'נארכב'}</div>
      <div>slug: ${draft.slug}</div>
    </div>
    ${draft.status === 'published' ? `<a class="btn" href="https://www.simple-solution.co.il/articles/${draft.slug}">צפה במאמר</a>` : ''}
  `);
}

function errorPage(message, detail = '') {
  return shell(`
    <div style="font-size:48px;margin-bottom:12px">⚠️</div>
    <h1>${escapeHtml(message)}</h1>
    ${detail ? `<p style="font-size:12px;opacity:.7">${escapeHtml(detail)}</p>` : ''}
  `);
}

function previewPage(res, draft) {
  return resHtml(res, 200, shell(`
    <h1 style="font-size:20px">${escapeHtml(draft.title)}</h1>
    <p style="text-align:right;margin-top:18px">${escapeHtml(draft.excerpt || '')}</p>
    <div style="text-align:right;margin-top:20px;padding:14px;background:#F8F2FF;border-radius:12px;font-size:14px;line-height:1.7">${draft.body_html || ''}</div>
  `));
}

// Render the final HTML file that will be committed. For now uses the stored body_html
// directly inside the same layout the renderer script produces.
// TODO Phase 2: re-render using the data-driven Python template to keep V3 visuals.
function renderFinalHtml(draft) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(draft.title)} | Simple Solutions</title>
<meta name="description" content="${escapeHtml(draft.meta_description || draft.excerpt)}">
<link rel="canonical" href="${process.env.SITE_URL || 'https://www.simple-solution.co.il'}/articles/${draft.slug}">
<link rel="stylesheet" href="/main-site-redesign/styles.css">
</head>
<body>
<div style="max-width:780px;margin:60px auto;padding:24px">
  <h1>${escapeHtml(draft.title)}</h1>
  <p style="color:#5a4a6a;line-height:1.7">${escapeHtml(draft.excerpt)}</p>
  ${draft.body_html}
</div>
</body>
</html>`;
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
