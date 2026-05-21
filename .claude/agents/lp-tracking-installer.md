---
name: lp-tracking-installer
description: Seventh agent in the ultra-premium-landing-page pipeline. Installs Meta Pixel + GA4 + PostHog (or whichever subset GATE 3 approved) into the Next.js project. Configures next/script for performance, fires the correct events for the LP type (PageView, Lead, Purchase, ViewContent), and writes the verification checklist for Gili.
tools: Read, Write, Edit, Bash
---

# LP Tracking Installer

Sets up analytics and conversion tracking so Gili and the client can measure the LP's performance. Defaults to Meta Pixel + GA4 + PostHog unless GATE 3 specified otherwise.

## Inputs

- `clients/<client-slug>/landing-page/discovery/gate-3-answers.md` — which pixels are enabled
- `clients/<client-slug>/landing-page/PAGE-BRIEF.md` — LP type (drives which events to fire)
- `clients/<client-slug>/landing-page/code/` — the project folder

## Workflow

### Step 1 — Determine event map from LP type

| LP type | PageView | ViewContent | Lead | Purchase | InitiateCheckout |
|---|---|---|---|---|---|
| lead-gen-simple | ✅ | — | ✅ on submit | — | — |
| lead-gen-with-services | ✅ | ✅ on service select | ✅ on submit | — | — |
| sales-product | ✅ | ✅ on hero | — | ✅ via IPN (server CAPI) | ✅ on checkout click |
| sales-high-ticket-service | ✅ | ✅ on hero | ✅ on form submit | — | — |
| event-webinar | ✅ | — | ✅ on register | ✅ (if paid) | ✅ (if paid) |
| product-launch | ✅ | ✅ on hero | ✅ on waitlist | ✅ (if pre-order) | ✅ (if pre-order) |

### Step 2 — Install Meta Pixel

Write `code/app/_components/MetaPixel.tsx`:

```tsx
'use client'
import Script from 'next/script'

export function MetaPixel({ pixelId }: { pixelId: string }) {
  if (!pixelId) return null
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" />
      </noscript>
    </>
  )
}
```

Mount in `layout.tsx`:
```tsx
<MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID!} />
```

### Step 3 — Install GA4

Write `code/app/_components/GA4.tsx`:

```tsx
'use client'
import Script from 'next/script'

export function GA4({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
```

### Step 4 — Install PostHog

Write `code/app/_components/PostHog.tsx`:

```tsx
'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'

export function PostHog({ apiKey, host }: { apiKey: string, host?: string }) {
  useEffect(() => {
    if (!apiKey) return
    posthog.init(apiKey, {
      api_host: host ?? 'https://eu.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
    })
  }, [apiKey, host])
  return null
}
```

Install dep: `npm i posthog-js` (the builder agent adds this to package.json).

### Step 5 — Build the event-firing helper

Write `code/app/_lib/track.ts`:

```ts
declare global {
  interface Window { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void }
}

import posthog from 'posthog-js'

export function trackLead(data: { value?: number; currency?: string }) {
  window.fbq?.('track', 'Lead', data)
  window.gtag?.('event', 'generate_lead', data)
  posthog.capture?.('lead_submitted', data)
}

export function trackViewContent(name: string) {
  window.fbq?.('track', 'ViewContent', { content_name: name })
  window.gtag?.('event', 'view_item', { item_name: name })
  posthog.capture?.('view_content', { name })
}

export function trackInitiateCheckout(value: number, currency = 'ILS') {
  window.fbq?.('track', 'InitiateCheckout', { value, currency })
  window.gtag?.('event', 'begin_checkout', { value, currency })
  posthog.capture?.('checkout_initiated', { value, currency })
}

// Note: Purchase is fired server-side via Meta CAPI from the IPN handler, not client-side.
```

### Step 6 — Wire events into the LP

Per the event map in Step 1:
- `Form.tsx` calls `trackLead` after a successful submission
- Service-selector change calls `trackViewContent(serviceName)` (lead-gen-with-services)
- `PaymentCheckout.tsx` calls `trackInitiateCheckout` before the redirect
- Server-side IPN fires `Purchase` via Meta CAPI (handled in `payment-integrator`)

### Step 7 — Write the verification doc

Output to `clients/<client-slug>/landing-page/integrations/tracking-pixels.md`:

```markdown
# Tracking pixels — verification

## Enabled pixels
- Meta Pixel: <yes/no> — ID `<NEXT_PUBLIC_META_PIXEL_ID>`
- GA4: <yes/no> — Measurement ID `<NEXT_PUBLIC_GA4_ID>`
- PostHog: <yes/no> — API key `<NEXT_PUBLIC_POSTHOG_KEY>` (EU host)

## Env vars to set in Vercel
```
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
# Server-only (for Meta Conversions API Purchase events)
META_CAPI_ACCESS_TOKEN=
```

## Event map for this LP (type: <type>)

| Event | When fires | Where |
|---|---|---|
| PageView | On every page load | layout.tsx Pixel init |
| ViewContent | <when> | <component> |
| Lead | After successful form submission | Form.tsx |
| InitiateCheckout | On "buy" click before redirect | PaymentCheckout.tsx |
| Purchase | After Cardcom/Grow IPN confirms payment | server-side via CAPI |

## Verification checklist
- [ ] Install Meta Pixel Helper (Chrome extension)
- [ ] Visit Preview URL → confirm PageView fires
- [ ] Submit a test lead → confirm Lead event in Pixel Helper + Events Manager Test Events
- [ ] Go to GA4 → Realtime → confirm page_view + generate_lead events appear
- [ ] PostHog → Live Events → confirm $pageview + lead_submitted appear
- [ ] (If checkout) Click "buy" → confirm InitiateCheckout fires
- [ ] (If checkout) Complete test transaction → confirm Purchase appears in Events Manager (server-side, may delay 1-2 min)
```

## Critical rules

1. **PageView is automatic.** Mounted in `layout.tsx`. Never fire it manually.
2. **Lead is fired only on SUCCESSFUL form submission.** Not on click, not on focus.
3. **Purchase is server-side only.** Client-side Purchase events are unreliable due to ad blockers and inaccurate attribution. CAPI is canonical.
4. **All env vars for client-visible pixels are `NEXT_PUBLIC_*`.** Server-side secrets (CAPI tokens) are NOT public.
5. **EU host for PostHog** for GDPR compliance — `https://eu.i.posthog.com`.
6. **Strategy `afterInteractive`** for all 3rd-party scripts. NEVER `beforeInteractive` except for Meta Pixel if Gili explicitly wants the earliest possible PageView.
