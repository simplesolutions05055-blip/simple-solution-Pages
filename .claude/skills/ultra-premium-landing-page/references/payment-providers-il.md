# Payment Providers (Israel)

Per CLAUDE.md: **Stripe does NOT work in Israel for IL merchants.** Default to Cardcom / Grow / משולם for any LP that charges Israeli customers in ILS. Stripe is offered ONLY when the client takes international payments.

The payment question is surfaced at GATE 3, NEVER assumed. The `lp-payment-integrator` agent only runs when an LP needs checkout.

---

## Provider comparison

| Provider | Best for | UX | Setup time | Fees (typical) | Bit/PayBox/ApplePay |
|---|---|---|---|---|---|
| **Cardcom** | High-volume Israeli merchants, established businesses | Redirect or iframe | 1-3 business days (KYC) | ~2.4% + ₪0.5 | Limited |
| **Grow (formerly משולם)** | Small-medium businesses, modern UX | Hosted checkout | 1-2 business days | ~2.7% + ₪0.4 | ✅ Bit, PayBox, ApplePay |
| **משולם** | Same as Grow (merged) | Same | Same | Same | ✅ |
| **Tranzila** | Legacy enterprise | Iframe / redirect | 2-5 business days | Negotiated | Limited |
| **Stripe** | International only — non-IL merchants OR IL clients selling abroad | Modern SDK | Immediate | 2.9% + 0.30¢ | ApplePay yes, no Bit |

---

## When to recommend which

**Cardcom** —
- Client has an existing merchant account (most IL businesses do)
- High-ticket purchases (₪500+) where established trust matters
- Subscription billing supported (LowProfile)
- Needs IPN webhook for server-side conversion tracking

**Grow / משולם** —
- Younger audience expects Bit / PayBox / ApplePay
- Smaller businesses without an existing Cardcom account
- Faster onboarding desired
- Better mobile UX out of the box

**Stripe** —
- ONLY when the client sells internationally (sells in USD/EUR, ships abroad)
- Israeli digital-product creators selling to global audience
- SaaS billing for non-IL customers
- NEVER as default for an Israeli LP targeting Israeli customers

---

## Integration patterns

### Cardcom — LowProfile redirect

**Server route:** `app/api/cardcom/create-session/route.ts`
```ts
// POST: creates a LowProfile session, returns redirect URL
// Body: { leadId, amount, productName, customerEmail }
// Uses CARDCOM_TERMINAL_NUMBER + CARDCOM_USERNAME from env
// Returns: { url: 'https://secure.cardcom.solutions/Interface/LowProfile.aspx?...' }
```

**Client flow:**
1. User fills form → POST to `/api/cardcom/create-session`
2. Response contains Cardcom URL with `ReturnValue = leadId`
3. Browser redirects to Cardcom secure page
4. After payment → Cardcom redirects back to `/api/cardcom/notify` (IPN)
5. IPN handler updates lead status in Supabase or marks the row in the Google Sheet as paid
6. User lands on `/thank-you?lead=<id>` with success state

**IPN handler:** `app/api/cardcom/notify/route.ts`
- Verify `OperationResponse=0` (success)
- Extract `ReturnValue` (lead ID) and `dealsum` (paid amount)
- Update lead → status: paid
- Fire server-side Meta Conversions API `Purchase` event
- Return `OK` to Cardcom (else they retry)

**Env vars required:**
- `CARDCOM_TERMINAL_NUMBER` — terminal ID from Cardcom dashboard
- `CARDCOM_USERNAME` — API username
- `CARDCOM_PASSWORD` — API password (server-side only, never client)
- `CARDCOM_BASE_URL=https://secure.cardcom.solutions`

**Testing:** Cardcom provides a sandbox terminal (`terminal=1000`). Test card: `4580-4580-4580-4580`, any future expiry, CVV `123`.

---

### Grow / משולם — Hosted checkout

**Server route:** `app/api/grow/create-payment/route.ts`
```ts
// POST: creates payment session via Grow API
// Body: { leadId, amount, productName, customerName, customerEmail, customerPhone }
// Returns: { url: 'https://meshulam.co.il/purchase?id=...' }
```

**Client flow:**
1. Form submit → POST to `/api/grow/create-payment`
2. Redirect to Grow hosted checkout (or open in modal — Grow supports both)
3. Grow handles Bit / PayBox / ApplePay / Card UI natively
4. On success → redirect to `/thank-you` + webhook to `/api/grow/notify`

**IPN handler:** `app/api/grow/notify/route.ts`
- Verify HMAC signature using `GROW_SECRET_KEY`
- Same logic as Cardcom — update lead status, fire Meta CAPI event

**Env vars:**
- `GROW_PAGE_CODE` — checkout page code
- `GROW_API_KEY`
- `GROW_SECRET_KEY` — for webhook signature verification

**Testing:** Grow provides sandbox via `mode=test`.

---

### Stripe — international only

**Pattern:** Standard Stripe Checkout Session via `@stripe/stripe-js` + `stripe` (server). Documented well in Stripe docs — no IL-specific adjustments.

**Env vars:** `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

---

## Common requirements (all providers)

1. **Honeypot field** in the checkout form to block bots
2. **3-second minimum time-to-submit** validation server-side
3. **Server-side amount validation** — never trust the client-sent price. Look up the product price in your DB / config.
4. **IPN/webhook idempotency** — payments may fire the webhook multiple times. Use the transaction ID as the dedupe key.
5. **Receipt email via Resend** — auto-send to customer after successful payment.
6. **Lead status update** — update the Google Sheet row (via Zapier/Make webhook) AND the Supabase row (if used) to mark as paid.
7. **Meta Conversions API server-side event** — fire `Purchase` from the IPN, not from the client, for better attribution.

---

## What the integrator agent OUTPUTS

After GATE 3 (Gili picks a provider), the integrator writes:

```
clients/<client-slug>/landing-page/integrations/payment-config.md
```

Containing:
- Chosen provider + reason
- Required env vars (with placeholders, no real secrets)
- IPN webhook URL the client needs to register
- Sandbox testing steps
- Production switch-over checklist

The actual API keys are NEVER committed — Gili pastes them into Vercel's environment-variables UI directly.
