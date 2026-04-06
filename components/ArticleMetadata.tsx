import Script from 'next/script';
import { generateArticleSchema } from '@/lib/seo';

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
  const schema = generateArticleSchema({
    title,
    description,
    content,
    image,
    author,
    date,
    url,
  });

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
