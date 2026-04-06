export interface CategoryConfig {
  name: string;
  slug: string;
  description: string;
  color: string;          // Tailwind bg color class for badges
  images: string[];       // Curated Unsplash photo URLs
}

export const CATEGORIES: CategoryConfig[] = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'AI, software, gadgets, and the digital world',
    color: 'bg-blue-100 text-blue-800',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Business',
    slug: 'business',
    description: 'Markets, startups, economy, and corporate news',
    color: 'bg-green-100 text-green-800',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Medicine, wellness, research, and public health',
    color: 'bg-red-100 text-red-800',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Hospitality',
    slug: 'hospitality',
    description: 'Hotels, restaurants, food, and guest experiences',
    color: 'bg-yellow-100 text-yellow-800',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe2fd?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Politics',
    slug: 'politics',
    description: 'Government, policy, elections, and global affairs',
    color: 'bg-purple-100 text-purple-800',
    images: [
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Travel',
    slug: 'travel',
    description: 'Destinations, tips, culture, and adventure',
    color: 'bg-cyan-100 text-cyan-800',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Movies, music, OTT, celebs, and pop culture',
    color: 'bg-pink-100 text-pink-800',
    images: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540747913346-19212a4f2e37?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Cricket, football, athletics, and sports business',
    color: 'bg-orange-100 text-orange-800',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543357480-c60d40c9e3f3?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540747913346-19212a4f2e37?w=1200&h=630&fit=crop&q=80',
    ],
  },
  {
    name: 'Review',
    slug: 'review',
    description: 'Product reviews, ratings, and buying guides',
    color: 'bg-gray-100 text-gray-800',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=630&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop&q=80',
    ],
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

export function getCategoryConfig(name: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

/** Pick a deterministic-ish image from the pool based on article slug */
export function pickCategoryImage(categoryName: string, seed: string): string {
  const config = getCategoryConfig(categoryName);
  if (!config || config.images.length === 0) {
    return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop&q=80';
  }
  // Simple hash of seed string to pick consistently
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return config.images[hash % config.images.length];
}
