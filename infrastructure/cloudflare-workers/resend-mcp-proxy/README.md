# Resend MCP Proxy — Cloudflare Worker

Bridges Claude on Web to Resend's MCP server. Holds the Resend API key as an encrypted Cloudflare secret so Claude never sees it.

## Why this exists

Claude on Web's **Add custom connector** dialog supports only OAuth-based MCP servers (Client ID / Client Secret). Resend's MCP requires `Authorization: Bearer <key>` and there is no field for custom headers in the dialog. This Worker fills the gap.

## Architecture

```
Claude on Web
     │  (HTTPS, no auth)
     ▼
Cloudflare Worker  <─── encrypted secret: RESEND_API_KEY
     │  (HTTPS + Authorization: Bearer ${RESEND_API_KEY})
     ▼
https://mcp.resend.com/mcp
```

## Files

- `worker.js` — the Worker source. Single file, no dependencies.

## First-time deployment (via Cloudflare Dashboard)

1. Open <https://dash.cloudflare.com>
2. Sidebar → **Workers & Pages** → **Create** → **Create Worker**
3. Name: `resend-mcp-proxy`
4. Click **Deploy** to create the default placeholder
5. Click **Edit code** (or **Quick Edit**)
6. Replace the entire file content with `worker.js` from this folder
7. Click **Save and deploy**
8. Back on the Worker overview → **Settings** → **Variables and Secrets** → **Add**
   - Type: **Secret**
   - Name: `RESEND_API_KEY`
   - Value: your Resend API key (`re_...`)
9. Click **Save**
10. Trigger a redeploy: **Deployments** → **Deploy** (or edit + save again)
11. Copy the Worker URL from the overview (looks like `https://resend-mcp-proxy.<your-cf-subdomain>.workers.dev`)
12. In Claude (<https://claude.ai/customize/connectors>):
    - **+ Add custom connector**
    - **Name:** `Resend`
    - **Remote MCP server URL:** the Worker URL from step 11
    - Leave OAuth fields empty
    - Click **Add**

## Rotating the Resend API key

1. Create a new key at <https://resend.com/api-keys>
2. Cloudflare Worker → **Settings** → **Variables and Secrets** → edit `RESEND_API_KEY`
3. Redeploy
4. Revoke the old key in Resend

No changes required in Claude — the Worker URL stays stable.

## Cost

Cloudflare Workers free tier: 100,000 requests/day. Realistic agency traffic: well under 1,000/day. Expected monthly cost: $0.

## Template reuse

This pattern works for any API-key-authenticated MCP server. To bridge another vendor:

1. Copy this folder
2. Change `UPSTREAM` to the vendor's MCP URL
3. Change the secret name in `worker.js` and in Cloudflare Settings
4. Deploy under a new Worker name

Useful for upcoming Israeli integrations that lack OAuth MCPs (Cardcom, Greeninvoice, iCount, etc.).
