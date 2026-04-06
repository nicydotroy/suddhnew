#!/usr/bin/env node
/**
 * Daily article generator for Suddh News
 *
 * Usage:
 *   node scripts/generate-articles.mjs                  # generates for today
 *   node scripts/generate-articles.mjs --date 2026-04-10
 *   node scripts/generate-articles.mjs --dry-run        # print without saving
 *
 * Requires: ANTHROPIC_API_KEY environment variable
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_FILE = join(ROOT, 'data', 'generated-articles.json');

// ── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
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
  const dateArg = args.find((a) => a.startsWith('--date='))?.split('=')[1]
    || args[args.indexOf('--date') + 1];
  const dryRun = args.includes('--dry-run');
  const targetDate = dateArg || new Date().toISOString().slice(0, 10);
  return { targetDate, dryRun };
}

// ── Claude API call ───────────────────────────────────────────────────────────

async function generateArticlesForDate(targetDate) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set.');
  }

  const prompt = `Generate ${CATEGORIES.length} original news articles for Suddh News, an Indian digital news publication. Today's date is ${targetDate}.

Write one article for each of these categories: ${CATEGORIES.join(', ')}.

Focus on current, relevant topics. For Indian audiences where appropriate (especially Business, Politics, Healthcare). Write in a professional news style — factual, engaging, no fluff.

Return ONLY a valid JSON array. No markdown, no explanation, just the JSON array. Each object must have exactly these fields:
- "category": (string) one of the categories listed
- "title": (string) compelling, specific headline — 60-80 characters
- "description": (string) 120-150 character meta description
- "content": (string) full article body, 700-900 words. Plain text only — no markdown, no #, no **, no bullet dashes. Use paragraph breaks (double newline) between sections. Section headings are short standalone lines.
- "tags": (array of strings) 5-6 relevant tags

The JSON array must contain exactly ${CATEGORIES.length} objects, one per category, in this order: ${CATEGORIES.join(', ')}.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 16000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text.trim();

  // Strip any accidental markdown code fences
  const cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Failed to parse JSON response:\n${cleaned.slice(0, 500)}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Response is not a JSON array');
  }

  return parsed;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const { targetDate, dryRun } = parseArgs();

  console.log(`\n📰 Suddh News — Article Generator`);
  console.log(`📅 Date: ${targetDate}`);
  console.log(`🔄 Generating ${CATEGORIES.length} articles (one per category)...\n`);

  // Load existing articles
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    existing = [];
  }

  // Check if articles for this date already exist
  const alreadyGenerated = existing.filter((a) => a.publishDate === targetDate);
  if (alreadyGenerated.length > 0) {
    console.log(`⚠️  Found ${alreadyGenerated.length} articles already generated for ${targetDate}.`);
    console.log('   Skipping generation. Use --date with a different date or remove existing entries.\n');
    process.exit(0);
  }

  // Call Claude API
  let rawArticles;
  try {
    rawArticles = await generateArticlesForDate(targetDate);
  } catch (err) {
    console.error('❌ Generation failed:', err.message);
    process.exit(1);
  }

  console.log(`✅ Received ${rawArticles.length} articles from Claude API\n`);

  // Build full article objects
  const timestamp = Date.now();
  const newArticles = rawArticles.map((raw, i) => {
    const slug = slugify(raw.title) + '-' + targetDate.replace(/-/g, '');
    const category = raw.category || CATEGORIES[i] || 'Technology';
    const id = `gen-${targetDate.replace(/-/g, '')}-${i + 1}`;

    return {
      id,
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

  // Print summary
  newArticles.forEach((a, i) => {
    console.log(`  ${i + 1}. [${a.category}] ${a.title}`);
  });
  console.log('');

  if (dryRun) {
    console.log('🔍 DRY RUN — nothing saved.\n');
    console.log(JSON.stringify(newArticles, null, 2));
    return;
  }

  // Append and save
  const updated = [...existing, ...newArticles];
  writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2) + '\n', 'utf8');

  console.log(`💾 Saved ${newArticles.length} articles to data/generated-articles.json`);
  console.log(`📊 Total articles in bank: ${updated.length}\n`);
}

main();
