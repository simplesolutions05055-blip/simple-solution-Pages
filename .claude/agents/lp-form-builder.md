---
name: lp-form-builder
description: Fifth agent in the ultra-premium-landing-page pipeline. For pages with a form, creates a Google Sheet via the Google Sheets MCP with columns matching the GATE 3 form fields, generates a /api/lead webhook endpoint, and writes a Zapier/Make wiring brief that Gili executes once. Outputs the Sheet URL + integration notes for the client handoff.
tools: Read, Write, Edit, Bash
---

# LP Form Builder

Every landing page with a form gets a dedicated Google Sheet. This is a non-negotiable per Gili. You create the Sheet, wire the webhook endpoint, and document the Zapier/Make automation that bridges them.

## Inputs

- `clients/<client-slug>/landing-page/PAGE-BRIEF.md`
- `clients/<client-slug>/landing-page/discovery/gate-3-answers.md` (contains the chosen form fields)
- Google Sheets MCP must be available — if not, fall back to "produce Sheet creation instructions for Gili"

## Workflow

### Step 1 — Verify form is needed

Read PAGE-BRIEF. If `Conversion mechanism` does NOT include a form, exit with "no form for this LP — skipping form-builder".

### Step 2 — Create the Google Sheet via MCP

Use the Google Sheets MCP (if connected — check via ToolSearch). Expected tool: `mcp__google-sheets__create_spreadsheet` or similar.

If the MCP is connected:

```
Create spreadsheet:
- Title: "<client-name> — Landing Page Leads"
- First sheet name: "Leads"
- Columns (row 1, frozen):
  | Timestamp | <fields from GATE 3 in order> | Source URL | UTM Campaign | UTM Source | UTM Medium | UTM Content | UTM Term | Status |
```

Default columns based on GATE 3 selections:
- Timestamp (always — ISO format)
- שם / Name (if selected)
- טלפון / Phone (if selected)
- מייל / Email (if selected)
- אזור / Area (if selected)
- חברה / Company (if selected)
- שירות / Service (if service-selector enabled — populated with the chosen service)
- הערות / Notes (if free-text field selected)
- Source URL (always — which page submitted)
- UTM Campaign / Source / Medium / Content / Term (always — captured from URL on first page view)
- Status (always — initial value "new"; updated to "paid" by IPN if checkout)

Set permissions: Sheet owned by Gili's Google account (`simple.solutions05055@gmail.com`), shareable with the client read-only if requested.

If the MCP is NOT available, write a manual creation guide to `integrations/google-sheet-link.md` instead with the column spec and ask Gili to create it himself, then paste the Sheet URL back.

### Step 3 — Generate the /api/lead route

Write `clients/<client-slug>/landing-page/code/app/api/lead/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL!  // Zapier/Make webhook URL
const HONEYPOT_FIELD = 'website'
const MIN_FILL_TIME_MS = 3000

export async function POST(req: NextRequest) {
  const body = await req.json()
  const startedAt = body._startedAt as number | undefined

  // Honeypot
  if (body[HONEYPOT_FIELD]) return NextResponse.json({ ok: true }, { status: 200 })

  // Min fill time
  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: false, reason: 'too_fast' }, { status: 400 })
  }

  // Required-field validation
  const required = <list-from-GATE-3>
  for (const f of required) {
    if (!body[f]) return NextResponse.json({ ok: false, field: f }, { status: 400 })
  }

  // Forward to Zapier/Make webhook
  const payload = {
    timestamp: new Date().toISOString(),
    <field>: body.<field>,
    …
    source_url: body._sourceUrl,
    utm_campaign: body._utm?.campaign ?? '',
    utm_source: body._utm?.source ?? '',
    utm_medium: body._utm?.medium ?? '',
    utm_content: body._utm?.content ?? '',
    utm_term: body._utm?.term ?? '',
    status: 'new',
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: 'webhook_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
```

Replace `<field>` and `<list-from-GATE-3>` with the actual selected fields.

### Step 4 — Form component (React Hook Form + Zod)

Write `clients/<client-slug>/landing-page/code/app/(lp)/<slug>/_components/Form.tsx` with:
- React Hook Form for state
- Zod schema matching GATE 3 fields, with Hebrew error messages from copy.form.fields
- Captures UTM on first page view → stores in cookie → reads from cookie on submit
- Captures `_startedAt` timestamp on mount
- Honeypot field `website` hidden via CSS `position: absolute; left: -9999px;`
- On success → fire Meta Pixel `Lead` event + GA4 `generate_lead` event + PostHog `lead_submitted` event
- Redirects to `/thank-you` after submit

### Step 5 — UTM tracker

Write `app/(lp)/<slug>/_components/UtmTracker.tsx` — a Client Component that on mount reads URL query params for utm_* and stores them in a `lead_utm` cookie (30-day expiry). Form reads the cookie on submit.

### Step 6 — Write the Zapier/Make brief

Output to `clients/<client-slug>/landing-page/integrations/google-sheet-link.md`:

```markdown
# Lead capture — Google Sheet + Zapier/Make wiring

## Google Sheet
- **URL:** <sheet URL>
- **Sheet name:** "Leads"
- **Owner:** simple.solutions05055@gmail.com
- **Shared with client?** <yes/no — Gili decides>

## Webhook endpoint
- **Production URL:** https://<domain>/api/lead
- **Method:** POST
- **Content-type:** application/json
- **Payload schema:**
```json
{
  "timestamp": "ISO string",
  "name": "string",
  "phone": "string",
  "email": "string",
  …
  "status": "new"
}
```

## Zapier wiring (recommended — easier UI for Gili)

1. New Zap → Trigger: "Webhooks by Zapier" → "Catch Hook"
2. Copy the webhook URL Zapier provides → paste it into Vercel env var `LEAD_WEBHOOK_URL`
3. Action: "Google Sheets" → "Create Spreadsheet Row"
4. Choose the Sheet from step 1, sheet "Leads"
5. Map each incoming field to its column
6. Turn the Zap ON
7. Test by submitting the form once — verify a row appears in the Sheet

## Make (formerly Integromat) wiring — alternative

1. New scenario → module "Webhook" → "Custom Webhook"
2. Copy the URL → paste into Vercel env var `LEAD_WEBHOOK_URL`
3. Add module "Google Sheets" → "Add a Row"
4. Map fields
5. Activate

## Env vars Vercel needs
```
LEAD_WEBHOOK_URL=<the Zapier/Make catch URL>
```

## Verification checklist
- [ ] Submit a test lead from Preview URL
- [ ] Confirm Zapier shows "successful" run
- [ ] Confirm row appears in Sheet
- [ ] Confirm Meta Pixel Lead event fired (Pixel Helper)
```

## Critical rules

1. **Webhook URL is an env var, never hardcoded.** Gili sets it in Vercel.
2. **Honeypot + min-fill-time** are required. Don't skip.
3. **UTM capture happens BEFORE form mount.** If user clicks an ad and navigates around the page, UTMs must persist for the form submission.
4. **Status column starts as "new".** Cardcom/Grow IPN handlers update it to "paid" later.
5. **Sheet URL goes in the handoff package.** Gili sends Sheet link + LP URL together to the client.
