"use client";

// Simple in-memory store for demo/dev mode (no Supabase required)
// In production this connects to Supabase

import type { Business, Contact, StarredContent, BrandBook, SocialPost, AdCreative, SeoArticle, WhatsAppCampaign } from "@/types";

const STORAGE_KEY = "ss_platform_data";

interface AppData {
  business: Business | null;
  contacts: Contact[];
  starredContent: StarredContent[];
  whatsappCampaigns: WhatsAppCampaign[];
  socialPosts: SocialPost[];
  adCreatives: AdCreative[];
  seoArticles: SeoArticle[];
}

function getDefaultData(): AppData {
  return {
    business: {
      id: "demo-biz",
      user_id: "demo-user",
      name: "העסק שלי",
      tagline: "",
      industry: "",
      website: "",
      phone: "",
      address: "",
      brand_book: undefined,
      created_at: new Date().toISOString(),
    },
    contacts: [
      { id: "c1", business_id: "demo-biz", name: "דניאל לוי", phone: "054-1234567", email: "daniel@example.com", company: "חברת לוי בע״מ", status: "active", tags: ["לקוח"], notes: "לקוח ותיק ומרוצה", last_contact: "2025-05-20", total_value: 12000, starred: true, created_at: "2025-01-15T10:00:00Z" },
      { id: "c2", business_id: "demo-biz", name: "מיכל כהן", phone: "052-9876543", email: "michal@example.com", company: "", status: "lead", tags: ["ליד", "חדש"], notes: "פנתה דרך אינסטגרם", last_contact: "2025-05-22", total_value: 0, starred: false, created_at: "2025-05-01T09:00:00Z" },
      { id: "c3", business_id: "demo-biz", name: "יוסי אברהם", phone: "050-5556677", email: "yossi@example.com", company: "סטארטאפ XYZ", status: "vip", tags: ["VIP", "לקוח"], notes: "שולח הרבה לקוחות", last_contact: "2025-05-23", total_value: 35000, starred: true, created_at: "2024-11-10T14:00:00Z" },
      { id: "c4", business_id: "demo-biz", name: "רחל גרין", phone: "053-2223344", email: "rachel@example.com", company: "גרין סטודיו", status: "inactive", tags: ["ישן"], notes: "", last_contact: "2025-02-10", total_value: 4500, starred: false, created_at: "2024-08-20T11:00:00Z" },
    ],
    starredContent: [],
    whatsappCampaigns: [
      { id: "w1", business_id: "demo-biz", name: "קמפיין קיץ 2025", message: "שלום! יש לנו מבצע מיוחד לקיץ...", recipient_count: 150, sent_count: 148, status: "sent", sent_at: "2025-05-15T10:00:00Z", created_at: "2025-05-14T20:00:00Z" },
      { id: "w2", business_id: "demo-biz", name: "עדכון שירות", message: "לקוחות יקרים, אנחנו שמחים להודיע...", recipient_count: 200, sent_count: 0, status: "draft", created_at: "2025-05-23T16:00:00Z" },
    ],
    socialPosts: [
      { id: "s1", business_id: "demo-biz", platform: "instagram", content: "יום חדש, הזדמנויות חדשות! 🚀 בואו נדבר על איך אנחנו יכולים לעזור לעסק שלכם לצמוח", media_urls: [], status: "published", published_at: "2025-05-20T09:00:00Z", likes: 45, comments: 8, shares: 3, starred: true, created_at: "2025-05-19T20:00:00Z" },
      { id: "s2", business_id: "demo-biz", platform: "facebook", content: "5 טיפים לניהול עסק מוצלח בעידן הדיגיטלי", media_urls: [], status: "scheduled", scheduled_at: "2025-05-25T10:00:00Z", starred: false, created_at: "2025-05-23T18:00:00Z" },
    ],
    adCreatives: [
      { id: "a1", business_id: "demo-biz", name: "מודעת קיץ", type: "image", platform: "instagram", content: "קיץ חם = הצעות חמות! 🔥 הנחה 20% על כל השירותים", cta: "לחץ לפרטים", starred: true, created_at: "2025-05-18T12:00:00Z" },
      { id: "a2", business_id: "demo-biz", name: "הכרות עם המותג", type: "carousel", platform: "facebook", content: "מי אנחנו? למה לבחור בנו? הכירו את הצוות שלנו!", cta: "גלה עוד", starred: false, created_at: "2025-05-22T15:00:00Z" },
    ],
    seoArticles: [
      { id: "e1", business_id: "demo-biz", title: "10 טיפים לניהול עסק קטן בישראל", slug: "10-tips-small-business-israel", content: "ניהול עסק קטן בישראל מאתגר...", keywords: ["עסק קטן", "ניהול עסק", "ישראל"], meta_description: "10 טיפים מעשיים לניהול עסק קטן מצליח בישראל", status: "published", word_count: 1200, published_at: "2025-05-10T10:00:00Z", starred: true, created_at: "2025-05-09T14:00:00Z" },
      { id: "e2", business_id: "demo-biz", title: "איך לשווק את העסק שלך בסושיאל מדיה", slug: "social-media-marketing-tips", content: "שיווק ברשתות חברתיות הוא...", keywords: ["שיווק דיגיטלי", "סושיאל מדיה"], meta_description: "מדריך שיווק ברשתות חברתיות לעסקים קטנים", status: "draft", word_count: 800, starred: false, created_at: "2025-05-23T11:00:00Z" },
    ],
  };
}

function loadData(): AppData {
  if (typeof window === "undefined") return getDefaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    return { ...getDefaultData(), ...JSON.parse(raw) };
  } catch {
    return getDefaultData();
  }
}

function saveData(data: AppData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Exported helpers
export function getBusiness(): Business {
  return loadData().business || getDefaultData().business!;
}

export function saveBusiness(biz: Partial<Business>): void {
  const data = loadData();
  data.business = { ...(data.business || getDefaultData().business!), ...biz };
  saveData(data);
}

export function saveBrandBook(bb: BrandBook): void {
  const data = loadData();
  if (data.business) data.business.brand_book = bb;
  saveData(data);
}

export function getContacts(): Contact[] {
  return loadData().contacts;
}

export function saveContact(contact: Contact): void {
  const data = loadData();
  const idx = data.contacts.findIndex((c) => c.id === contact.id);
  if (idx >= 0) data.contacts[idx] = contact;
  else data.contacts.unshift(contact);
  saveData(data);
}

export function deleteContact(id: string): void {
  const data = loadData();
  data.contacts = data.contacts.filter((c) => c.id !== id);
  saveData(data);
}

export function toggleContactStar(id: string): void {
  const data = loadData();
  const contact = data.contacts.find((c) => c.id === id);
  if (contact) contact.starred = !contact.starred;
  saveData(data);
}

export function getStarredContent(): StarredContent[] {
  return loadData().starredContent;
}

export function addStarredContent(item: StarredContent): void {
  const data = loadData();
  data.starredContent.unshift(item);
  saveData(data);
}

export function getWhatsAppCampaigns(): WhatsAppCampaign[] {
  return loadData().whatsappCampaigns;
}

export function saveWhatsAppCampaign(campaign: WhatsAppCampaign): void {
  const data = loadData();
  const idx = data.whatsappCampaigns.findIndex((c) => c.id === campaign.id);
  if (idx >= 0) data.whatsappCampaigns[idx] = campaign;
  else data.whatsappCampaigns.unshift(campaign);
  saveData(data);
}

export function getSocialPosts(): SocialPost[] {
  return loadData().socialPosts;
}

export function saveSocialPost(post: SocialPost): void {
  const data = loadData();
  const idx = data.socialPosts.findIndex((p) => p.id === post.id);
  if (idx >= 0) data.socialPosts[idx] = post;
  else data.socialPosts.unshift(post);
  saveData(data);
}

export function togglePostStar(id: string): void {
  const data = loadData();
  const post = data.socialPosts.find((p) => p.id === id);
  if (post) post.starred = !post.starred;
  saveData(data);
}

export function getAdCreatives(): AdCreative[] {
  return loadData().adCreatives;
}

export function saveAdCreative(ad: AdCreative): void {
  const data = loadData();
  const idx = data.adCreatives.findIndex((a) => a.id === ad.id);
  if (idx >= 0) data.adCreatives[idx] = ad;
  else data.adCreatives.unshift(ad);
  saveData(data);
}

export function toggleAdStar(id: string): void {
  const data = loadData();
  const ad = data.adCreatives.find((a) => a.id === id);
  if (ad) ad.starred = !ad.starred;
  saveData(data);
}

export function getSeoArticles(): SeoArticle[] {
  return loadData().seoArticles;
}

export function saveSeoArticle(article: SeoArticle): void {
  const data = loadData();
  const idx = data.seoArticles.findIndex((a) => a.id === article.id);
  if (idx >= 0) data.seoArticles[idx] = article;
  else data.seoArticles.unshift(article);
  saveData(data);
}

export function toggleArticleStar(id: string): void {
  const data = loadData();
  const article = data.seoArticles.find((a) => a.id === id);
  if (article) article.starred = !article.starred;
  saveData(data);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
