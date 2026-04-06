import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/seo';

export async function GET() {
  const articles = getAllArticles();
  const baseUrl = siteConfig.url;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Articles -->
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
