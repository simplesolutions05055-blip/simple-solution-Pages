import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.APPROVAL_FROM_EMAIL || 'articles@simple-solution.co.il';
const TO   = process.env.APPROVAL_TO_EMAIL   || 'simple.solutions05055@gmail.com';
const SITE = process.env.SITE_URL            || 'https://www.simple-solution.co.il';

/**
 * Send the approval email for a generated draft.
 * Includes 3 buttons (Approve / Revise / Reject) linked to /api/articles/action?token=...
 */
export async function sendApprovalEmail({ draft, tokens, images = [] }) {
  const subject = `📝 מאמר חדש לאישור: ${draft.title}`;
  const html = approvalEmailHtml({ draft, tokens, images, siteUrl: SITE });
  const text = `מאמר חדש לאישור: ${draft.title}\n\nאשר: ${SITE}/api/articles/action?token=${tokens.approve}\nתיקונים: ${SITE}/api/articles/revise?token=${tokens.revise}\nפסילה: ${SITE}/api/articles/action?token=${tokens.reject}`;

  return resend.emails.send({
    from: FROM,
    to: [TO],
    subject,
    html,
    text,
    headers: { 'X-Article-Draft-Id': draft.id },
  });
}

function approvalEmailHtml({ draft, tokens, images, siteUrl }) {
  const heroUrl = images.find(i => i.slot === 'hero')?.image_url || '';
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(draft.title)}</title>
</head>
<body style="margin:0;padding:0;background:#F8F2FF;font-family:'Heebo','Arial Hebrew',Arial,sans-serif;color:#1F0B33">
  <div style="max-width:640px;margin:0 auto;background:#fff">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#3D1466 0%,#5A1E94 100%);padding:32px 28px;color:#fff;text-align:right">
      <div style="font-size:11px;letter-spacing:.3em;color:#F5E8B0;font-weight:600;margin-bottom:8px">SIMPLE SOLUTIONS · ARTICLE REVIEW</div>
      <h1 style="font-size:24px;margin:0;font-weight:800;line-height:1.3;color:#fff">מאמר חדש לאישור</h1>
    </div>

    ${heroUrl ? `<img src="${heroUrl}" alt="" style="display:block;width:100%;max-height:280px;object-fit:cover">` : ''}

    <!-- Meta -->
    <div style="padding:28px 28px 0;text-align:right">
      <div style="font-size:12px;color:#8a7a7a;margin-bottom:14px">
        <span style="background:#C9A961;color:#1F0B33;padding:4px 10px;border-radius:99px;font-weight:700;font-size:11px;letter-spacing:.1em">${escapeHtml(draft.category)}</span>
        &nbsp;·&nbsp; ${escapeHtml(draft.read_time || '6 דק׳')}
        &nbsp;·&nbsp; ${escapeHtml(draft.slug)}
      </div>
      <h2 style="font-size:22px;margin:0 0 12px;line-height:1.3;color:#1F0B33">${escapeHtml(draft.title)}</h2>
      <p style="font-size:15px;line-height:1.6;color:#5a4a6a;margin:0 0 20px">${escapeHtml(draft.excerpt || '')}</p>
    </div>

    <!-- Answer box (תשובה קצרה) -->
    <div style="margin:0 28px 24px;padding:18px 20px;background:linear-gradient(135deg,#EFE5FB,#FFFBED);border:1px solid rgba(201,169,97,.3);border-radius:14px">
      <div style="font-size:11px;letter-spacing:.2em;color:#A88845;font-weight:700;margin-bottom:8px">תשובה קצרה</div>
      <div style="font-size:14px;line-height:1.7;color:#1F0B33">${draft.answer_short || ''}</div>
    </div>

    <!-- CTA Buttons -->
    <div style="padding:8px 28px 28px;text-align:center">
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto"><tr>
        <td style="padding:6px">
          <a href="${siteUrl}/api/articles/action?token=${tokens.approve}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#d9b86c,#c9a961);color:#1F0B33;text-decoration:none;border-radius:99px;font-weight:700;font-size:14px">✅ אשר ופרסם</a>
        </td>
        <td style="padding:6px">
          <a href="${siteUrl}/api/articles/revise?token=${tokens.revise}" style="display:inline-block;padding:14px 28px;background:#fff;color:#3D1466;text-decoration:none;border:1px solid #3D1466;border-radius:99px;font-weight:700;font-size:14px">🔄 תיקונים</a>
        </td>
        <td style="padding:6px">
          <a href="${siteUrl}/api/articles/action?token=${tokens.reject}" style="display:inline-block;padding:14px 22px;color:#8a6a8a;text-decoration:none;font-size:13px">פסול</a>
        </td>
      </tr></table>
    </div>

    <!-- Preview link -->
    <div style="padding:0 28px 32px;text-align:center;border-top:1px solid #EFE5FB">
      <a href="${siteUrl}/api/articles/preview?token=${tokens.preview}" style="color:#A88845;font-size:13px;font-weight:600;text-decoration:none;border-bottom:1px solid #C9A961;padding-bottom:2px">👁️ צפייה במאמר המלא לפני אישור</a>
    </div>

    <!-- Footer -->
    <div style="background:#06030f;color:rgba(255,255,255,.5);padding:18px 28px;text-align:center;font-size:11px;letter-spacing:.05em">
      Simple Solutions · ניהול תוכן אוטומטי<br>
      <span style="opacity:.6">קישורי האישור תקפים ל-7 ימים</span>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
