import Script from 'next/script';
import { generateArticleSchema, generateOrganizationSchema } from '@/lib/seo';

interface ArticleMetadataProps {
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: string;
  url: string;
}

export default function ArticleMetadata({
  title,
  description,
  content,
  image,
  author,
  date,
  url,
}: ArticleMetadataProps) {
  const articleSchema = generateArticleSchema({
    title,
    description,
    content,
    image,
    author,
    date,
    url,
  });

  const organizationSchema = generateOrganizationSchema();

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [articleSchema, organizationSchema],
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
