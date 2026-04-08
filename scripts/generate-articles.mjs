#!/usr/bin/env node
/**
 * Daily article generator for Suddh News
 * Generates 4 articles per day, rotating through all 9 categories
 * so every category gets covered across a 3-day cycle.
 *
 * Usage:
 *   node scripts/generate-articles.mjs                  # generates for today
 *   node scripts/generate-articles.mjs --date=2026-04-10
 *   node scripts/generate-articles.mjs --dry-run        # print without saving
 *
 * Requires: ANTHROPIC_API_KEY environment variable
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const DATA_FILE = join(ROOT, 'data', 'generated-articles.json');

const ARTICLES_PER_DAY = 4;

// All 9 categories — rotated so every category appears every ~2-3 days
const ALL_CATEGORIES = [
  'Technology',
  'Business',
  'Healthcare',
  'Hospitality',
  'Politics',
  'Travel',
  'Entertainment',
  'Sports',
  'Review',
];

const CATEGORY_IMAGES = {
  Technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200&h=630&fit=crop&q=80',
  ],
  Business: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&h=630&fit=crop&q=80',
  ],
  Healthcare: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=630&fit=crop&q=80',
  ],
  Hospitality: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80',
  ],
  Politics: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=1200&h=630&fit=crop&q=80',
  ],
  Travel: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&h=630&fit=crop&q=80',
  ],
  Entertainment: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&h=630&fit=crop&q=80',
  ],
  Sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543357480-c60d40c9e3f3?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&h=630&fit=crop&q=80',
  ],
  Review: [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=630&fit=crop&q=80',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop&q=80',
  ],
};

// ── Category rotation ─────────────────────────────────────────────────────────
// Given a date, pick 4 categories by rotating through all 9.
// day 1: index 0,1,2,3 | day 2: 4,5,6,7 | day 3: 8,0,1,2 | day 4: 3,4,5,6 …
function getCategoriesForDate(dateStr) {
  const epoch = new Date('2026-04-08'); // starting epoch
  const target = new Date(dateStr);
  const dayOffset = Math.round((target - epoch) / 86400000);
  const start = (dayOffset * ARTICLES_PER_DAY) % ALL_CATEGORIES.length;
  const cats = [];
  for (let i = 0; i < ARTICLES_PER_DAY; i++) {
    cats.push(ALL_CATEGORIES[(start + i) % ALL_CATEGORIES.length]);
  }
  return cats;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pickImage(category, seed) {
  const pool = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Technology;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const dateArg = args.find((a) => a.startsWith('--date='))?.split('=')[1];
  const dryRun = args.includes('--dry-run');
  const targetDate = dateArg || new Date().toISOString().slice(0, 10);
  return { targetDate, dryRun };
}

// ── Claude API call ───────────────────────────────────────────────────────────

async function generateArticlesForDate(targetDate, categories) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set.');
  }

  const prompt = `Generate ${categories.length} original news articles for Suddh News, an Indian digital news publication. Today's date is ${targetDate}.

Write one article for each of these categories (in this exact order): ${categories.join(', ')}.

Focus on current, relevant, timely topics. Prioritize Indian context where appropriate (Business, Politics, Healthcare, Sports). Write in a professional news style — factual, engaging, human.

Return ONLY a valid JSON array. No markdown, no explanation. Each object must have exactly these fields:
- "category": (string) matching one of the categories listed above
- "title": (string) compelling, specific headline — 65-85 characters
- "description": (string) 130-155 character meta description
- "content": (string) full article body, 750-950 words. Plain text only — no markdown, no #, no **, no dashes for bullets. Use double newlines between paragraphs. Short standalone lines serve as section headings.
- "tags": (array of strings) 5-6 relevant tags

Return exactly ${categories.length} objects in this order: ${categories.join(', ')}.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text.trim();
  const cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Failed to parse JSON:\n${cleaned.slice(0, 500)}`);
  }

  if (!Array.isArray(parsed)) throw new Error('Response is not a JSON array');
  return parsed;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const { targetDate, dryRun } = parseArgs();
  const categories = getCategoriesForDate(targetDate);

  console.log(`\n📰 Suddh News — Article Generator`);
  console.log(`📅 Date    : ${targetDate}`);
  console.log(`📂 Today's categories: ${categories.join(', ')}\n`);

  // Load existing articles
  let existing = [];
  try { existing = JSON.parse(readFileSync(DATA_FILE, 'utf8')); } catch { existing = []; }

  // Skip if already done for this date
  const alreadyDone = existing.filter((a) => a.publishDate === targetDate);
  if (alreadyDone.length > 0) {
    console.log(`⚠️  ${alreadyDone.length} articles already exist for ${targetDate}. Skipping.\n`);
    process.exit(0);
  }

  // Call Claude
  let rawArticles;
  try {
    rawArticles = await generateArticlesForDate(targetDate, categories);
  } catch (err) {
    console.error('❌ Generation failed:', err.message);
    process.exit(1);
  }

  console.log(`✅ Received ${rawArticles.length} articles from Claude\n`);

  // Build article objects
  const timestamp = Date.now();
  const newArticles = rawArticles.map((raw, i) => {
    const category = raw.category || categories[i] || 'Technology';
    const slug = slugify(raw.title) + '-' + targetDate.replace(/-/g, '');
    return {
      id: `gen-${targetDate.replace(/-/g, '')}-${i + 1}`,
      title: raw.title,
      slug,
      description: raw.description,
      content: raw.content,
      authorId: 'aditya-pandey',
      author: 'Aditya Pandey',
      date: targetDate,
      publishDate: targetDate,
      image: pickImage(category, slug + timestamp),
      category,
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      featured: false,
    };
  });

  newArticles.forEach((a, i) => console.log(`  ${i + 1}. [${a.category}] ${a.title}`));
  console.log('');

  if (dryRun) {
    console.log('🔍 DRY RUN — nothing saved.\n');
    console.log(JSON.stringify(newArticles, null, 2));
    return;
  }

  const updated = [...existing, ...newArticles];
  writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2) + '\n', 'utf8');
  console.log(`💾 Saved to data/generated-articles.json (total: ${updated.length} articles)\n`);

  // Regenerate sitemap
  console.log('🗺️  Updating sitemap...');
  try {
    execSync('node scripts/generate-sitemap.mjs', { cwd: ROOT, stdio: 'inherit', env: { ...process.env } });
  } catch (err) {
    console.error('⚠️  Sitemap error (non-fatal):', err.message);
  }
}

main();
