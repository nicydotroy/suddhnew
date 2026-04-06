// SEO metadata utility functions
export const siteConfig = {
  name: 'Suddh News',
  description: 'A blog platform for sharing insightful articles on technology, marketing, and web development.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://suddhnnews.com',
  ogImage: 'https://via.placeholder.com/1200x630?text=Suddh+News',
  twitterHandle: '@suddhnnews',
};

export interface MetadataProps {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}

// Generate metadata for pages
export function generateMetadata(props: MetadataProps) {
  const {
    title,
    description,
    image = siteConfig.ogImage,
    slug,
    publishedTime,
    authors,
    tags,
  } = props;

  const url = slug ? `${siteConfig.url}/${slug}` : siteConfig.url;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      type: slug ? 'article' : 'website',
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
  };
}

// Generate JSON-LD structured data for articles
export function generateArticleSchema(article: {
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    articleBody: article.content,
    url: article.url,
  };
}

// Generate JSON-LD structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: siteConfig.ogImage,
    sameAs: [
      `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
    ],
  };
}

// Generate JSON-LD for breadcrumbs
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}
