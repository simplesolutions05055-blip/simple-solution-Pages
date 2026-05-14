---
name: saas-builder
description: End-to-end blueprint for building production SaaS systems and web apps — architecture, tech stack selection, auth, billing, database schema, deployment. Use when the user wants to build, scaffold, design, or plan a SaaS product, web app, or backend service. Trigger phrases include "build a SaaS", "create an app", "תבנה לי מערכת", "אני רוצה לבנות אפליקציה", "תכנן ארכיטקטורה", "צור SaaS".
---

# SaaS & App Builder

Use this skill to plan and scaffold production-grade SaaS systems and web/mobile applications. Covers architecture decisions, stack selection, and concrete first-implementation steps.

## When to use

Trigger phrases:
- English: "build a SaaS", "scaffold an app", "design the architecture", "set up auth and billing", "create a web app"
- עברית: "תבנה לי מערכת SaaS", "צור אפליקציה", "תכנן ארכיטקטורה", "תקים אפליקציה", "מערכת ניהול"

**Don't use this skill for:** static marketing sites (use `premium-website`), single landing pages (use `premium-landing-page`).

## Inputs to gather

1. **Product description** — what does the SaaS do, who is the user?
2. **Core entities** — users, organizations, projects, posts, etc.
3. **Key flows** — signup → onboarding → core action → upgrade
4. **Monetization model** — free / freemium / subscription / per-seat / usage
5. **Scale expectations** — first 100 users, or first 100k?
6. **Constraints** — hosting budget, preferred languages, existing systems
7. **Deadline / MVP scope**

## Recommended default stack (2026)

Optimize for: fast shipping, low ops burden, strong typing, good DX.

| Layer | Default | Alternative |
|------|---------|-------------|
| Frontend | Next.js 15 (App Router) + TypeScript + Tailwind | Remix, SvelteKit |
| UI library | shadcn/ui + Radix | Mantine, Chakra |
| Backend | Next.js API routes / Server Actions | Hono, Fastify, NestJS |
| DB | Postgres via Supabase | Neon, Planetscale |
| ORM | Drizzle | Prisma |
| Auth | Supabase Auth / Clerk / Auth.js | Better-Auth |
| Payments | Stripe (Checkout + Customer Portal) | Lemon Squeezy |
| Email | Resend | Postmark |
| File storage | Supabase Storage / R2 | S3 |
| Background jobs | Trigger.dev / Inngest | BullMQ |
| Hosting | Vercel (frontend) + Supabase (DB) | Railway, Fly.io |
| Analytics | PostHog | Plausible + Mixpanel |
| Error tracking | Sentry | — |
| AI/LLM | Anthropic Claude (Sonnet 4.6 / Opus 4.7) | OpenAI |

Deviate from defaults only when there's a concrete reason.

## Workflow

### 1. Discovery
Ask the inputs above. Don't proceed until product + entities + flows are clear.

### 2. Architecture sketch
Output a short doc with:
- Entities & relationships (text-based ERD)
- Core API routes / Server Actions
- Auth model (single user vs orgs/teams)
- Billing model (Stripe products, price IDs, webhook events handled)
- File/asset storage plan

### 3. Scaffold the project
```bash
npx create-next-app@latest <name> --typescript --tailwind --app --eslint
cd <name>
npx shadcn@latest init
```
Install: `drizzle-orm drizzle-kit postgres @supabase/supabase-js stripe zod react-hook-form`

### 4. Set up foundations (in this order)
1. **Env** — `.env.local` with `DATABASE_URL`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, auth keys. Add `.env.example`.
2. **DB schema** — Drizzle schema for `users`, `organizations` (if multi-tenant), `subscriptions`, core entities. Run first migration.
3. **Auth** — sign-in, sign-up, session handling, protected route middleware.
4. **Billing** — Stripe Checkout link, webhook handler for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`. Store subscription state in DB.
5. **Layout** — marketing site (`/`), app shell (`/app`), settings (`/app/settings`).
6. **Core feature** — one full vertical slice: DB → API → UI → tested.

### 5. Polish & ship
- Error tracking (Sentry)
- Analytics (PostHog with autocapture + identify on login)
- Email sequences (welcome, trial-end, payment-failed via Resend)
- SEO basics (sitemap, robots, OG tags)
- Deploy to Vercel + connect Supabase

## Quality bar

Before calling MVP "done":
- [ ] User can sign up, verify email, log in
- [ ] User can complete the core flow end-to-end
- [ ] User can pay and access paid features
- [ ] Webhooks tested with Stripe CLI
- [ ] One real test on staging with a real card (test mode)
- [ ] Error tracking catches a thrown error
- [ ] Mobile-responsive on the core flow
- [ ] Loading + empty + error states for every async view

## Common pitfalls

- Building auth from scratch — use Supabase/Clerk
- Premature multi-tenancy — start single-user, add orgs when needed
- Forgetting webhook idempotency — always check event ID before processing
- No DB indexes on foreign keys / frequently-queried fields
- Hardcoding Stripe price IDs in code instead of env vars
- Skipping the marketing site — your sign-up rate depends on it
