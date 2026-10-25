/**
 * Resend MCP Proxy — Cloudflare Worker
 *
 * Bridges Claude on Web to Resend's MCP server.
 * Claude's "Add custom connector" UI only supports OAuth-style auth,
 * so this Worker injects the Authorization: Bearer <RESEND_API_KEY>
 * header on Claude's behalf.
 *
 * The API key lives as an encrypted Cloudflare Secret (RESEND_API_KEY)
 * and is never exposed to Claude or to the chat transcript.
 *
 * Owner: Webxp Marketing Agency (simple.solutions05055@gmail.com)
 */

const UPSTREAM = "https://mcp.resend.com/mcp";

// Cloudflare-internal headers we must strip before forwarding upstream
const STRIP_HEADERS = [
  "host",
  "cf-connecting-ip",
  "cf-ipcountry",
  "cf-ray",
  "cf-visitor",
  "cf-worker",
  "x-forwarded-for",
  "x-forwarded-proto",
  "x-real-ip",
];

export default {
  async fetch(request, env) {
    if (!env.RESEND_API_KEY) {
      return jsonError(500, "RESEND_API_KEY secret is not configured on this Worker.");
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    const upstreamHeaders = new Headers(request.headers);
    for (const h of STRIP_HEADERS) upstreamHeaders.delete(h);
    upstreamHeaders.set("Authorization", `Bearer ${env.RESEND_API_KEY}`);

    const upstreamRequest = new Request(UPSTREAM, {
      method: request.method,
      headers: upstreamHeaders,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    });

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(upstreamRequest);
    } catch (err) {
      return jsonError(502, `Upstream fetch failed: ${err.message}`);
    }

    const responseHeaders = new Headers(upstreamResponse.headers);
    for (const [k, v] of Object.entries(corsHeaders())) responseHeaders.set(k, v);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
