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

// Sample articles data
export const articles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    description: 'Learn the basics of Next.js and start building modern web applications.',
    content: `Next.js is a React framework that enables you to build full-stack web applications. 
    
Getting started is easy:

1. Create a new project with create-next-app
2. Install dependencies
3. Start the development server
4. Begin building your application

Next.js provides features like:
- Server-side rendering
- Static site generation
- API routes
- File-based routing
- Built-in optimization

With Next.js, you can create fast, scalable web applications with ease.`,
    author: 'John Doe',
    date: '2024-01-15',
    image: 'https://via.placeholder.com/800x400?text=Next.js',
    category: 'Technology',
    tags: ['nextjs', 'react', 'web-development'],
  },
  {
    id: '2',
    title: 'SEO Best Practices for Bloggers',
    slug: 'seo-best-practices-for-bloggers',
    description: 'Improve your blog ranking on search engines with these proven SEO strategies.',
    content: `Search Engine Optimization is crucial for blog visibility.

Key SEO practices:

1. Keyword Research
- Use tools like Google Keyword Planner
- Target long-tail keywords
- Analyze competitor keywords

2. On-Page SEO
- Optimize title tags and meta descriptions
- Use proper heading hierarchy
- Include relevant keywords naturally
- Create quality, original content

3. Technical SEO
- Ensure fast page load times
- Mobile-friendly design
- XML sitemaps
- Proper URL structure

4. Link Building
- Create shareable content
- Guest posting opportunities
- Internal linking strategy

5. Content Quality
- Write comprehensive articles
- Update content regularly
- Use multimedia elements

By following these practices, your blog will rank higher in search results.`,
    author: 'Jane Smith',
    date: '2024-01-20',
    image: 'https://via.placeholder.com/800x400?text=SEO',
    category: 'Marketing',
    tags: ['seo', 'blogging', 'marketing'],
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    description: 'Explore upcoming trends and technologies shaping the web development landscape.',
    content: `The web development industry is constantly evolving.

Emerging Technologies:

1. AI and Machine Learning
- Personalized user experiences
- Intelligent content recommendations
- Automated testing and debugging

2. Web Assembly
- Better performance for complex applications
- Language flexibility for web development

3. Progressive Web Apps
- Offline functionality
- Native app-like experience
- Better accessibility

4. Headless CMS
- Decoupled content and presentation
- Flexibility in technology choices

5. Edge Computing
- Faster content delivery
- Reduced latency
- Better performance globally

Stay updated with these trends to remain competitive in web development.`,
    author: 'Mike Johnson',
    date: '2024-02-01',
    image: 'https://via.placeholder.com/800x400?text=Web+Development',
    category: 'Technology',
    tags: ['web-development', 'trends', 'technology'],
  },
];

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
