# Deployment Playbook

GATE 5 surfaces three hosting paths. The `lp-deployer` agent walks the chosen path. Production NEVER goes live without explicit Gili approval at GATE 6.

---

## Path A — Hosted at Simple Solutions (`lp.simple-solution.co.il/[client-slug]`)

**When to recommend:** Client doesn't want infrastructure responsibility. Client trusts Simple Solutions to manage uptime. One-off campaign that doesn't need the client's domain. Simple Solutions retains ownership of the deployment.

### Steps the agent runs

1. **Push code to GitHub** under `simplesolutions05055-blip/simple-solution-pages` (or a dedicated client-pages repo if it exists). Branch: `landing-pages/<client-slug>`.
2. **Deploy to Vercel** under Simple Solutions' Vercel team (via MCP). Project name: `lp-<client-slug>`.
3. **Configure routing** so the page lives at `lp.simple-solution.co.il/<client-slug>`:
   - Vercel project's domain → `lp.simple-solution.co.il`
   - Use `next.config.js` `basePath: '/<client-slug>'` OR Vercel rewrites
4. **Cloudflare DNS** for `lp.simple-solution.co.il`:
   - CNAME `lp` → `cname.vercel-dns.com.` (proxied through Cloudflare or DNS-only — choose based on whether we want CF WAF)
5. **Show Gili the Preview URL** first. Wait for approval. THEN promote to Production.

### Pros / cons
- ✅ Fastest setup
- ✅ Simple Solutions controls uptime, can fix bugs without client involvement
- ❌ Page URL has SS domain in it — some clients want their own brand domain
- ❌ If client ever leaves, the page comes down (or we migrate)

---

## Path B — Hosted at client (custom domain, client-owned)

**When to recommend:** Client wants the page on their own domain (`landing.client-business.co.il` or a fresh `.co.il`). Long-term campaign that's part of the client's brand. Client may want SEO from the URL.

### Steps the agent runs

1. **Acquire the domain** if the client doesn't have one:
   - Ask Gili: "Does the client have a domain? Or should we buy one?"
   - If buying — recommend LiveDNS (Israeli registrar, .co.il available) or a `.com` via a global registrar
   - Domain purchased on client's account (or transferred to them after) — never under SS
2. **Push code to GitHub** under either:
   - SS's repo with a branch (if SS maintains the code)
   - Client's GitHub org (if the client wants code ownership)
3. **Deploy to Vercel** — under SS's team (with custom domain wired) OR transfer the project to client's Vercel team
4. **DNS setup** (LiveDNS or wherever client's domain lives → Cloudflare → Vercel):
   - At registrar: nameservers → Cloudflare
   - At Cloudflare: add the domain, get nameservers, paste back to registrar
   - At Cloudflare DNS: A record `@` → `76.76.21.21` (Vercel) OR CNAME `www` → `cname.vercel-dns.com.`
   - Vercel project → add custom domain → wait for SSL provisioning (1-15 min)
5. **Verify SSL** is green, page loads, RTL renders correctly on the production URL
6. **Hand client the credentials** (Vercel project access, domain registrar login)

### Pros / cons
- ✅ Client owns everything — clean handover
- ✅ Custom domain looks more professional
- ❌ Longer setup (DNS propagation + domain purchase)
- ❌ If client breaks something on their Vercel account, SS may not be able to fix it

---

## Path C — Files-only handoff (client's developer deploys)

**When to recommend:** Client has their own dev team. Client uses a hosting provider SS doesn't manage (some VPS, AWS, their own k8s). Client explicitly requested code ownership and self-hosting.

### Steps the agent runs

1. **Build a production-ready zip:**
   - `npm install && npm run build` to verify clean build
   - Strip `node_modules/` and `.next/` from the package
   - Create `landing-page.zip` with the project root + `README-deployment.md`
2. **Write `client-handoff-guide.md`** containing:
   - Stack overview (Next.js 15, requires Node 20+)
   - Local dev setup (`npm install`, `npm run dev`)
   - Production build (`npm run build`, `npm start`)
   - Required environment variables (with placeholders — see `integrations/payment-config.md`, `google-sheet-link.md`, `tracking-pixels.md`)
   - Recommended hosting (Vercel one-click, Railway, self-host on Node)
   - Where the Google Sheet lives and how the webhook works
   - Domain + SSL setup if they want to self-host
3. **Place outputs at** `clients/<client-slug>/landing-page/handoff/`:
   - `landing-page.zip`
   - `client-handoff-guide.md`
4. **Skip Vercel deployment entirely** — there's no Production URL to share. Gili sends the zip to the client.

### Pros / cons
- ✅ Maximum client autonomy, no ongoing SS responsibility
- ✅ One-time deliverable, clean billing
- ❌ No SS visibility into uptime or analytics after handoff
- ❌ Client's dev may misconfigure something and blame SS

---

## Domain question at GATE 6 (only for Path A or B)

After Production is live, the agent asks:
> "האם לחבר דומיין מותאם ללקוח גם?"

**If yes:**
- If the domain exists → walk through DNS via Cloudflare MCP (Path B steps 4-5)
- If domain needs to be bought → ask which registrar, recommend LiveDNS for `.co.il`, walk through purchase + DNS

**If no:** Hand over Vercel URL as final, mark project complete.

---

## DNS records reference

### For Vercel deployment (recommended in 2026)
```
A     @                     76.76.21.21
CNAME www                   cname.vercel-dns.com.
```

### For Vercel via Cloudflare (DNS-only mode, NOT proxied — Vercel handles SSL)
Same records as above. In Cloudflare, set the cloud icon to grey (DNS only) for these records, otherwise Cloudflare's proxy interferes with Vercel's SSL provisioning.

### For Vercel via Cloudflare (proxied — Cloudflare handles SSL + WAF)
Use Cloudflare's "Full (strict)" SSL mode. More complex but adds CF's DDoS + WAF. Document in deployment notes if the client needs this.

### Israeli domain (.co.il) at LiveDNS
LiveDNS supports nameserver delegation — point NS records at Cloudflare's nameservers (provided by Cloudflare when you add the domain). Then manage all records in Cloudflare.

---

## What the deployer agent OUTPUTS

```
clients/<client-slug>/landing-page/deployment/
├── chosen-path.md                 ← A / B / C + reasoning
├── vercel-preview-url.md          ← After GATE 5 (Path A or B only)
├── production-url.md              ← After GATE 6 approval (Path A or B only)
├── dns-setup.md                   ← (if custom domain) records + status + propagation check
└── handoff-package/               ← (Path C only) zip + guide
```

---

## Gates within the deployer

1. **Before pushing to GitHub:** confirm repo name, branch name
2. **After Vercel Preview:** show URL to Gili, wait for "approve to Production"
3. **Before custom domain:** confirm domain ownership + registrar
4. **After Production:** show final URL, hand over credentials, mark complete
