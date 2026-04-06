import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/seo';

export async function GET() {
  const articles = getAllArticles();
  const baseUrl = siteConfig.url;

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${siteConfig.ogImage}</url>
      <title>${siteConfig.name}</title>
      <link>${baseUrl}</link>
    </image>

    ${articles
      .map(
        (article) => `
    <item>
      <title>${article.title}</title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid>${baseUrl}/articles/${article.slug}</guid>
      <description>${article.description}</description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <author>${article.author}</author>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.category}</category>
      ${article.tags.map((tag) => `<category>${tag}</category>`).join('')}
      <image>
        <url>${article.image}</url>
        <title>${article.title}</title>
        <link>${baseUrl}/articles/${article.slug}</link>
      </image>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rssContent, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
