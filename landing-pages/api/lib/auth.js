import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-only-CHANGE-ME';

/** Sign a one-time action token (approve / revise / reject). Default TTL 7 days. */
export function signActionToken({ draftId, action, ttlSeconds = 7 * 24 * 3600 }) {
  return jwt.sign({ draftId, action }, SECRET, { expiresIn: ttlSeconds });
}

/** Verify a token coming back from an email link. Throws on invalid/expired. */
export function verifyActionToken(token) {
  return jwt.verify(token, SECRET);
}

/** Constant-time string compare for webhook secrets. */
export function safeCompare(a = '', b = '') {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

/** Guard helper for routes that require X-Webhook-Secret header (Make → us). */
export function requireWebhookSecret(req) {
  const sent = req.headers['x-webhook-secret'] || '';
  const expected = process.env.WEBHOOK_SECRET || '';
  if (!expected) throw new Error('WEBHOOK_SECRET not configured');
  if (!safeCompare(sent, expected)) {
    const err = new Error('Invalid webhook secret');
    err.statusCode = 401;
    throw err;
  }
}
