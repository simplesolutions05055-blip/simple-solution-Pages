---
name: lp-payment-integrator
description: Sixth agent in the ultra-premium-landing-page pipeline. Only runs when the LP needs checkout. Wires the chosen payment provider (Cardcom / Grow / משולם / Stripe) — creates the create-session API route, the IPN/webhook handler, the env-var checklist, and the sandbox testing steps. Outputs integrations/payment-config.md for the client handoff.
tools: Read, Write, Edit, Bash
---

# LP Payment Integrator

Runs ONLY when GATE 3 confirmed a payment provider. Wires the provider end-to-end, returns a config doc Gili can hand to the client (or use himself if SS retains hosting).

## Inputs

- `clients/<client-slug>/landing-page/discovery/gate-3-answers.md` — contains chosen provider, product name, price
- `.claude/skills/ultra-premium-landing-page/references/payment-providers-il.md` — integration patterns

## Workflow

### Step 1 — Verify payment is needed

If GATE 3 didn't surface a provider, exit with "no checkout for this LP — skipping payment-integrator".

### Step 2 — Read the chosen provider's pattern

From `payment-providers-il.md`, find the section matching the chosen provider:
- Cardcom → LowProfile redirect pattern
- Grow / משולם → Hosted checkout pattern
- Stripe → Checkout Session pattern (only if client sells internationally)

### Step 3 — Write the create-session API route

For **Cardcom** — write `code/app/api/cardcom/create-session/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { leadId, amount, productName, customerEmail } = await req.json()

  // Server-side amount validation — never trust client price
  const VALID_PRODUCTS: Record<string, number> = {
    '<product-slug>': <amount-in-agorot>,  // amount in agorot, not shekels
  }
  const expected = VALID_PRODUCTS[productName]
  if (!expected || expected !== amount) {
    return NextResponse.json({ error: 'invalid_amount' }, { status: 400 })
  }

  const params = new URLSearchParams({
    TerminalNumber: process.env.CARDCOM_TERMINAL_NUMBER!,
    UserName: process.env.CARDCOM_USERNAME!,
    APILevel: '10',
    codepage: '65001',
    Operation: '1',  // charge
    SumToBill: (amount / 100).toString(),
    CoinID: '1',  // ILS
    Language: 'he',
    ProductName: productName,
    SuccessRedirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?lead=${leadId}`,
    ErrorRedirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout-error?lead=${leadId}`,
    IndicatorUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/cardcom/notify`,
    ReturnValue: leadId,
    InvoiceHead_Email: customerEmail,
  })

  const res = await fetch(`${process.env.CARDCOM_BASE_URL}/Interface/LowProfile.aspx?${params}`, {
    method: 'GET',
  })
  const text = await res.text()
  const url = parseCardcomUrl(text)  // helper to extract redirect URL

  return NextResponse.json({ url })
}

function parseCardcomUrl(response: string): string {
  // Cardcom returns key=value pairs separated by &
  const map = new URLSearchParams(response)
  if (map.get('ResponseCode') !== '0') throw new Error('Cardcom session failed')
  return map.get('url')!
}
```

For **Grow / משולם** — write `code/app/api/grow/create-payment/route.ts` with the Grow API call.

For **Stripe** — write `code/app/api/stripe/create-session/route.ts` using `stripe` SDK.

### Step 4 — Write the IPN / webhook handler

For **Cardcom** — write `code/app/api/cardcom/notify/route.ts`:

```ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const operationResponse = form.get('OperationResponse')
  const returnValue = form.get('ReturnValue') as string  // our leadId
  const dealsum = form.get('dealsum') as string

  if (operationResponse !== '0') {
    return new Response('OK', { status: 200 })  // acknowledge even on fail to stop retries
  }

  // Update lead status in the Google Sheet via webhook
  await fetch(process.env.LEAD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: 'update_status',
      leadId: returnValue,
      status: 'paid',
      amount: dealsum,
      paidAt: new Date().toISOString(),
    }),
  })

  // Fire Meta Conversions API Purchase event server-side
  await fireMetaCapiPurchase({ leadId: returnValue, amount: dealsum })

  return new Response('OK', { status: 200 })
}

async function fireMetaCapiPurchase({ leadId, amount }: { leadId: string, amount: string }) {
  // Implementation uses META_PIXEL_ID + META_CAPI_ACCESS_TOKEN env vars
  // See https://developers.facebook.com/docs/marketing-api/conversions-api
}
```

For **Grow** — similar handler at `code/app/api/grow/notify/route.ts` with HMAC signature verification.

For **Stripe** — webhook handler at `code/app/api/stripe/webhook/route.ts` with `stripe.webhooks.constructEvent` for signature verification.

### Step 5 — Build the PaymentCheckout component

Write `code/app/(lp)/<slug>/_components/PaymentCheckout.tsx`:

```tsx
'use client'

export function PaymentCheckout({ leadId, amount, productName, customerEmail }: Props) {
  const onCheckout = async () => {
    const res = await fetch('/api/cardcom/create-session', {  // adapt per provider
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ leadId, amount, productName, customerEmail }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <button onClick={onCheckout} className="cta-primary">
      <span>רכישה — </span>
      <span dir="ltr">₪{(amount / 100).toLocaleString('he-IL')}</span>
    </button>
  )
}
```

### Step 6 — Write the config doc

Output to `clients/<client-slug>/landing-page/integrations/payment-config.md`:

```markdown
# Payment integration — <provider>

## Provider
**Chosen:** <Cardcom / Grow / משולם / Stripe>
**Reason:** <from GATE 3 — e.g., "Cardcom — established merchant account, high-ticket purchase, Hebrew checkout">

## Product
- Name: <product-name>
- Price: ₪<amount>
- Validated server-side at `/api/<provider>/create-session`

## Env vars required (Gili sets these in Vercel)

### Cardcom (example)
```
CARDCOM_TERMINAL_NUMBER=<from Cardcom dashboard>
CARDCOM_USERNAME=<API username>
CARDCOM_PASSWORD=<API password — server-only>
CARDCOM_BASE_URL=https://secure.cardcom.solutions
NEXT_PUBLIC_SITE_URL=<production URL>
META_PIXEL_ID=<for CAPI>
META_CAPI_ACCESS_TOKEN=<for server-side purchase events>
LEAD_WEBHOOK_URL=<Zapier/Make webhook — already set by form-builder>
```

## IPN webhook URL to register at Cardcom
`<NEXT_PUBLIC_SITE_URL>/api/cardcom/notify`

(Register this in the Cardcom dashboard → Indicator URL field)

## Sandbox testing
- **Sandbox terminal:** `1000`
- **Test card:** `4580-4580-4580-4580`
- **Expiry:** any future date
- **CVV:** `123`
- Set `CARDCOM_TERMINAL_NUMBER=1000` in Preview env, switch to real terminal for Production.

## Production switch-over checklist
- [ ] Replace sandbox terminal number with real one in Vercel Production env
- [ ] Verify IPN URL is reachable from Cardcom (test transaction → confirm row in Google Sheet updates to "paid")
- [ ] Verify Meta CAPI Purchase event appears in Events Manager → Test Events
- [ ] Confirm refund/cancellation flow with the client (out of scope for the LP, but document who handles it)
```

## Critical rules

1. **Never commit real keys.** All sensitive values are env-var placeholders. Gili sets them in Vercel UI directly.
2. **Server-side amount validation is non-negotiable.** Reject any request where the client-sent amount doesn't match the server's product config.
3. **IPN idempotency.** Use the transaction ID as a dedupe key — payments may fire the webhook multiple times.
4. **Server-side CAPI for Purchase events.** Client-side Meta Pixel events for Purchase are unreliable; CAPI is canonical.
5. **For Stripe, double-check it's actually international.** If the client is an Israeli business charging Israeli customers in ILS, Stripe should not be the choice — push back at GATE 3.
