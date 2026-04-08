#!/usr/bin/env node
/**
 * Sitemap generator for Suddh News
 *
 * Reads:
 *   data/base-urls.json         — handcrafted articles (add new ones here manually)
 *   data/generated-articles.json — AI-generated articles
 *
 * Writes:
 *   public/sitemap.xml
 *
 * Also pings Google and Bing to notify them of the updated sitemap.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *   node scripts/generate-sitemap.mjs --no-ping   (skip search engine ping)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT        = join(__dirname, '..');
const BASE_FILE   = join(ROOT, 'data', 'base-urls.json');
const GEN_FILE    = join(ROOT, 'data', 'generated-articles.json');
const PUBLIC_DIR  = join(ROOT, 'public');
const OUT_FILE    = join(PUBLIC_DIR, 'sitemap.xml');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://suddhnews.in';

// ── Static pages beyond articles ─────────────────────────────────────────────

const STATIC_PAGES = [
  { loc: '/',                   priority: '1.0', changefreq: 'daily'   },
  { loc: '/author/aditya-pandey', priority: '0.7', changefreq: 'weekly'  },
];

const CATEGORY_SLUGS = [
  'technology', 'business', 'healthcare', 'hospitality',
  'politics', 'travel', 'entertainment', 'sports', 'review',
  'digital-marketing', 'seo', 'personal-branding',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return [];
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry({ loc, lastmod, priority = '0.8', changefreq = 'monthly' }) {
  const lines = [`  <url>`, `    <loc>${escapeXml(SITE_URL + loc)}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    `  </url>`,
  );
  return lines.join('\n');
}

// ── Ping search engines ───────────────────────────────────────────────────────

async function ping(label, url) {
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(8000) });
    console.log(`  ✅ Pinged ${label} — HTTP ${res.status}`);
  } catch (err) {
    console.log(`  ⚠️  ${label} ping failed (non-fatal): ${err.message}`);
  }
}

async function pingSearchEngines(sitemapUrl) {
  console.log('\n🔔 Pinging search engines...');
  await Promise.all([
    ping('Google', `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
    ping('Bing',   `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
  ]);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const noPing = process.argv.includes('--no-ping');

  console.log('\n🗺️  Suddh News — Sitemap Generator');
  console.log(`🌐 Site: ${SITE_URL}\n`);

  // Load articles from both sources
  const baseUrls      = readJSON(BASE_FILE);         // [{slug, date, type}]
  const generatedArts = readJSON(GEN_FILE);           // [{slug, publishDate|date, ...}]

  // Filter generated articles to published-only (publishDate <= today)
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const publishedGenerated = generatedArts.filter(
    (a) => new Date(a.publishDate || a.date) <= today,
  );

  // Deduplicate all article slugs
  const seen = new Set();
  const articleEntries = [];

  for (const a of baseUrls) {
    if (a.type !== 'article' || seen.has(a.slug)) continue;
    seen.add(a.slug);
    articleEntries.push({ loc: `/articles/${a.slug}`, lastmod: a.date });
  }
  for (const a of publishedGenerated) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    articleEntries.push({
      loc:     `/articles/${a.slug}`,
      lastmod: a.publishDate || a.date,
    });
  }

  // Sort newest first
  articleEntries.sort((a, b) => (b.lastmod || '').localeCompare(a.lastmod || ''));

  const todayStr = new Date().toISOString().split('T')[0];
  const entries = [
    // Static pages
    ...STATIC_PAGES.map((p) => urlEntry({ ...p, lastmod: todayStr })),
    // Articles
    ...articleEntries.map((e) => urlEntry({ ...e, priority: '0.8', changefreq: 'monthly' })),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- Generated: ${new Date().toISOString()} | Articles: ${articleEntries.length} -->`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`,
    ...entries,
    `</urlset>`,
  ].join('\n');

  // Write file
  mkdirSync(PUBLIC_DIR, { recursive: true });
  writeFileSync(OUT_FILE, xml, 'utf8');

  console.log(`✅ Sitemap written → public/sitemap.xml`);
  console.log(`   Static pages : ${STATIC_PAGES.length}`);
  console.log(`   Articles     : ${articleEntries.length} (${publishedGenerated.length} generated + ${baseUrls.filter(u => u.type === 'article').length} base)`);

  // Ping search engines
  if (!noPing) {
    await pingSearchEngines(`${SITE_URL}/sitemap.xml`);
  }

  console.log('\n🎉 Done.\n');
}

main().catch((err) => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
