-- =========================================================================
-- Simple Solutions — Article Automation Pipeline
-- Supabase Schema (Postgres)
-- =========================================================================
-- Run this in Supabase SQL Editor once at setup.

-- =========================================================================
-- 1. TOPIC QUEUE — pending article topics (managed/updated by SEO agent)
-- =========================================================================
create table if not exists topic_queue (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('paid-campaigns','social','automation','crm','growth')),
  title text not null,
  primary_keyword text not null,
  secondary_keywords text[] default '{}',
  search_volume int,
  competition text check (competition in ('low','medium','high')),
  priority int default 5,
  source text default 'manual', -- 'manual' | 'dataforseo' | 'agent'
  status text not null default 'pending' check (status in ('pending','scheduled','generating','draft','approved','published','rejected')),
  scheduled_for timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_topic_queue_status on topic_queue(status);
create index if not exists idx_topic_queue_scheduled on topic_queue(scheduled_for) where status = 'scheduled';

-- =========================================================================
-- 2. ARTICLE DRAFTS — generated drafts awaiting approval
-- =========================================================================
create table if not exists article_drafts (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references topic_queue(id) on delete set null,
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text,
  answer_short text,    -- the AEO "תשובה קצרה" block
  body_html text,       -- the full article HTML body
  body_json jsonb,      -- structured sections + chart data (for re-rendering)
  faq jsonb default '[]'::jsonb,
  icon text default 'sparkles',
  read_time text default '6 דק׳',
  meta_description text,
  status text not null default 'draft' check (status in ('draft','awaiting_images','awaiting_approval','revising','approved','published','rejected')),
  generated_by text default 'claude-4.7',
  approval_token text,  -- one-time JWT for email approval
  revision_notes text,  -- last revision feedback
  revision_count int default 0,
  approved_at timestamptz,
  approved_by text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_drafts_status on article_drafts(status);
create index if not exists idx_drafts_slug on article_drafts(slug);

-- =========================================================================
-- 3. ARTICLE IMAGES — generated images per article (Nano Banana outputs)
-- =========================================================================
create table if not exists article_images (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid references article_drafts(id) on delete cascade,
  slot text not null check (slot in ('hero','body_1','body_2','og')),
  prompt text not null,
  image_url text,       -- final Cloudinary/Vercel Blob URL
  width int,
  height int,
  provider text default 'gemini-image',
  status text default 'pending' check (status in ('pending','generating','ready','failed')),
  failure_reason text,
  created_at timestamptz default now()
);
create index if not exists idx_images_draft on article_images(draft_id);

-- =========================================================================
-- 4. APPROVAL EVENTS — full audit log of every approval/revision action
-- =========================================================================
create table if not exists approval_events (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid references article_drafts(id) on delete cascade,
  action text not null check (action in ('sent_for_approval','approved','revised','rejected','published','image_swap','seo_update')),
  actor_email text,
  notes text,
  payload jsonb,        -- e.g. specific revision instructions
  created_at timestamptz default now()
);
create index if not exists idx_events_draft on approval_events(draft_id);

-- =========================================================================
-- 5. SEO MONITORING — performance tracking per published article
-- =========================================================================
create table if not exists seo_metrics (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid references article_drafts(id) on delete cascade,
  measured_at date not null default current_date,
  impressions int,
  clicks int,
  avg_position numeric(5,2),
  ctr numeric(5,4),
  pagespeed_mobile int,
  pagespeed_desktop int,
  ranking_keywords jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  unique(draft_id, measured_at)
);

-- =========================================================================
-- 6. RLS — disable for service-role access (server-side only)
-- =========================================================================
alter table topic_queue disable row level security;
alter table article_drafts disable row level security;
alter table article_images disable row level security;
alter table approval_events disable row level security;
alter table seo_metrics disable row level security;

-- =========================================================================
-- 7. TRIGGERS — auto-update updated_at on every write
-- =========================================================================
create or replace function bump_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trg_topic_updated_at on topic_queue;
create trigger trg_topic_updated_at before update on topic_queue
  for each row execute function bump_updated_at();

drop trigger if exists trg_draft_updated_at on article_drafts;
create trigger trg_draft_updated_at before update on article_drafts
  for each row execute function bump_updated_at();

-- =========================================================================
-- 8. SEED — the 20 articles already published (so SEO agent has baseline)
-- =========================================================================
-- Run this AFTER deploying the initial 20 articles to mark them as published
-- (You can skip this if you want — the system will continue from zero)

-- Example seed (uncomment if needed):
-- insert into topic_queue (category, title, primary_keyword, status) values
-- ('paid-campaigns', 'כמה עולה ניהול קמפיינים בישראל? המדריך המלא 2026', 'כמה עולה ניהול קמפיינים', 'published'),
-- ('paid-campaigns', '7 טעויות שהורגות לך את הקמפיינים בפייסבוק', 'טעויות קמפיינים פייסבוק', 'published');
