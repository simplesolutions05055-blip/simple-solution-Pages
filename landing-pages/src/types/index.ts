export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  name: string;
  tagline?: string;
  industry?: string;
  website?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  brand_book?: BrandBook;
  created_at: string;
}

export interface BrandBook {
  id: string;
  business_id: string;
  story: string;
  vision: string;
  mission: string;
  values: string[];
  target_audience: string;
  tone_of_voice: string;
  colors: { primary: string; secondary: string; accent: string; neutral: string };
  fonts: { heading: string; body: string };
  keywords: string[];
  competitors: string[];
  unique_value: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  business_id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  status: "lead" | "active" | "inactive" | "vip";
  tags: string[];
  notes?: string;
  last_contact?: string;
  total_value?: number;
  starred: boolean;
  created_at: string;
}

export interface StarredContent {
  id: string;
  business_id: string;
  module: string;
  content_type: string;
  content: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface WhatsAppCampaign {
  id: string;
  business_id: string;
  name: string;
  message: string;
  recipient_count: number;
  sent_count: number;
  status: "draft" | "scheduled" | "sent" | "failed";
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
}

export interface SocialPost {
  id: string;
  business_id: string;
  platform: "instagram" | "facebook" | "linkedin" | "tiktok";
  content: string;
  media_urls: string[];
  status: "draft" | "scheduled" | "published";
  scheduled_at?: string;
  published_at?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  starred: boolean;
  created_at: string;
}

export interface AdCreative {
  id: string;
  business_id: string;
  name: string;
  type: "image" | "video" | "carousel";
  platform: string;
  content: string;
  cta: string;
  image_url?: string;
  starred: boolean;
  created_at: string;
}

export interface SeoArticle {
  id: string;
  business_id: string;
  title: string;
  slug: string;
  content: string;
  keywords: string[];
  meta_description: string;
  status: "draft" | "published" | "scheduled";
  word_count: number;
  published_at?: string;
  starred: boolean;
  created_at: string;
}

export type ModuleId = "brand-book" | "crm" | "whatsapp" | "social" | "ads" | "video" | "seo";

export interface Module {
  id: ModuleId;
  name: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
  badge?: string;
}
