// Sample article data structure - you can replace this with a database connection
export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

// Sample articles data - Add your fresh articles here
export const articles: Article[] = [];

// Get all articles
export function getAllArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(articles.map((article) => article.category));
  return Array.from(categories);
}

// Get related articles
export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];

  return articles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}
