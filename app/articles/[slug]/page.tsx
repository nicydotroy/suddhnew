import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleMetadata from '@/components/ArticleMetadata';
import ArticleCard from '@/components/ArticleCard';
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return generateSEOMetadata({
    title: article.title,
    description: article.description,
    image: article.image,
    slug: `articles/${article.slug}`,
    publishedTime: article.date,
    authors: [article.author],
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug);
  const articleUrl = `${siteConfig.url}/articles/${article.slug}`;

  return (
    <>
      <Header />

      <ArticleMetadata
        title={article.title}
        description={article.description}
        content={article.content}
        image={article.image}
        author={article.author}
        date={article.date}
        url={articleUrl}
      />

      <main className="flex-1">
        {/* Article Header */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                    Articles
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-600">{article.title}</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent md:text-5xl mb-6">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="mb-8 flex flex-wrap items-center gap-4 border-b-2 border-orange-200 pb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">By</span>
                <span className="text-gray-700 font-medium">{article.author}</span>
              </div>
              <div className="text-orange-300">•</div>
              <time className="text-gray-700 font-medium" dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className="text-orange-300">•</div>
              <span className="inline-block rounded-full bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-1 text-sm font-bold text-orange-800">
                {article.category}
              </span>
            </div>

            {/* Featured Image */}
            <div className="relative mb-8 h-80 md:h-96 overflow-hidden rounded-xl shadow-lg border-2 border-orange-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Article Content */}
            <div className="article-content mb-12 space-y-6">
              {article.content.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                
                if (!trimmedLine) return null;
                
                if (trimmedLine.startsWith('##')) {
                  const title = trimmedLine.replace(/^##\s*/, '');
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-bold mt-10 mb-6 text-gray-900">
                      {title}
                    </h2>
                  );
                }
                
                if (trimmedLine.startsWith('#')) {
                  const title = trimmedLine.replace(/^#\s*/, '');
                  return (
                    <h1 key={index} className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      {title}
                    </h1>
                  );
                }
                
                if (trimmedLine.startsWith('---')) {
                  return <hr key={index} className="my-8" />;
                }
                
                return (
                  <p key={index} className="text-lg leading-8 text-gray-700">
                    {trimmedLine}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mb-8 border-t-2 border-orange-200 pt-8">
              <h3 className="mb-4 font-bold text-orange-700 text-lg">Tags:</h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="inline-block rounded-full bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 text-sm font-semibold text-orange-800 hover:shadow-md transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mb-12 border-t border-gray-200 pt-8">
              <h3 className="mb-4 font-semibold text-gray-900">Share this article:</h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
