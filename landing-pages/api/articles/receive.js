// POST /api/articles/receive
// Called BY Make.com after it has generated an article + 3 images.
// 1. Persists the draft to Supabase
// 2. Persists the image records
// 3. Issues 4 signed JWT tokens (approve / revise / reject / preview)
// 4. Sends the approval email via Resend
// 5. Returns 200 with the draft id
//
// Request body (JSON):
// {
//   "topic_id": "uuid (optional, from topic_queue)",
//   "slug": "kama-ole-nihul-X",
//   "title": "...",
//   "category": "paid-campaigns | social | automation | crm",
//   "excerpt": "...",
//   "answer_short": "...",
//   "body_html": "<h2>...</h2><p>...</p>",
//   "body_json": { sections: [...], chart: {...} },
//   "faq": [ {"q":"...","a":"..."} ],
//   "icon": "wallet",
//   "read_time": "7 דק׳",
//   "meta_description": "...",
//   "images": [
//     { "slot": "hero",   "prompt": "...", "image_url": "https://res.cloudinary.com/..." },
//     { "slot": "body_1", "prompt": "...", "image_url": "..." },
//     { "slot": "body_2", "prompt": "...", "image_url": "..." }
//   ]
// }

import { supabase } from '../lib/supabase.js';
import { signActionToken, requireWebhookSecret } from '../lib/auth.js';
import { sendApprovalEmail } from '../lib/email.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    requireWebhookSecret(req);
  } catch (e) {
    return res.status(e.statusCode || 401).json({ error: e.message });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const required = ['slug', 'title', 'category', 'body_html'];
  for (const k of required) {
    if (!body?.[k]) return res.status(400).json({ error: `Missing required field: ${k}` });
  }

  // 1. Insert draft
  const { data: draft, error: draftErr } = await supabase
    .from('article_drafts')
    .insert({
      topic_id: body.topic_id || null,
      slug: body.slug,
      title: body.title,
      category: body.category,
      excerpt: body.excerpt || '',
      answer_short: body.answer_short || '',
      body_html: body.body_html,
      body_json: body.body_json || null,
      faq: body.faq || [],
      icon: body.icon || 'sparkles',
      read_time: body.read_time || '6 דק׳',
      meta_description: body.meta_description || body.excerpt || '',
      status: 'awaiting_approval',
    })
    .select()
    .single();

  if (draftErr) {
    console.error('[receive] draft insert failed', draftErr);
    return res.status(500).json({ error: 'Failed to create draft', details: draftErr.message });
  }

  // 2. Insert images
  const images = Array.isArray(body.images) ? body.images : [];
  if (images.length) {
    const rows = images.map(img => ({
      draft_id: draft.id,
      slot: img.slot,
      prompt: img.prompt || '',
      image_url: img.image_url,
      provider: img.provider || 'gemini-image',
      status: img.image_url ? 'ready' : 'pending',
      width: img.width || null,
      height: img.height || null,
    }));
    const { error: imgErr } = await supabase.from('article_images').insert(rows);
    if (imgErr) console.error('[receive] image insert failed', imgErr);
  }

  // 3. Sign 4 tokens (one per action)
  const tokens = {
    approve: signActionToken({ draftId: draft.id, action: 'approve' }),
    revise:  signActionToken({ draftId: draft.id, action: 'revise' }),
    reject:  signActionToken({ draftId: draft.id, action: 'reject' }),
    preview: signActionToken({ draftId: draft.id, action: 'preview' }),
  };

  // 4. Log + send email
  await supabase.from('approval_events').insert({
    draft_id: draft.id,
    action: 'sent_for_approval',
    payload: { slug: draft.slug },
  });

  try {
    await sendApprovalEmail({ draft, tokens, images });
  } catch (e) {
    console.error('[receive] email send failed', e);
    return res.status(500).json({ error: 'Draft saved but email failed', details: e.message, draft_id: draft.id });
  }

  return res.status(200).json({
    ok: true,
    draft_id: draft.id,
    slug: draft.slug,
    status: draft.status,
    preview_url: `${process.env.SITE_URL || ''}/api/articles/preview?token=${tokens.preview}`,
  });
}
