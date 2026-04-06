import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleMetadata from '@/components/ArticleMetadata';
import ArticleCard from '@/components/ArticleCard';
import { getArticleBySlug, getRelatedArticles, getAllSlugs, getAuthorById } from '@/lib/articles';
import { generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
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
  const author = getAuthorById(article.authorId);

  const formattedDate = new Date(article.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10 md:py-14">

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span>/</span>
            <Link
              href={`/#${article.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-orange-600 transition-colors"
            >
              {article.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
          </nav>

          {/* Category */}
          <Link
            href={`/#${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block text-orange-600 text-sm font-bold uppercase tracking-wider mb-4 hover:underline"
          >
            {article.category}
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-orange-500 pl-4">
            {article.description}
          </p>

          {/* Author + Meta + Share row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-4 mb-8">
            <div className="flex items-center gap-3">
              {author && (
                <Link href={`/author/${author.slug}`} className="shrink-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover border-2 border-orange-200"
                  />
                </Link>
              )}
              <div>
                <Link href={author ? `/author/${author.slug}` : '#'} className="font-bold text-gray-900 text-sm hover:text-orange-600 transition-colors">
                  {article.author}
                </Link>
                {author && (
                  <p className="text-xs text-gray-500">{author.role}</p>
                )}
              </div>
              <span className="text-gray-300 mx-1">|</span>
              <time className="text-sm text-gray-500" dateTime={article.date}>
                {formattedDate}
              </time>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium mr-1">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.74-8.852L1.254 2.25H8.08l4.252 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-10 h-72 md:h-[420px] overflow-hidden rounded-xl shadow-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>

          {/* Article Body */}
          <div className="article-body mb-12">
            {article.content.split('\n\n').map((block, bi) => {
              const lines = block.split('\n').filter((l) => l.trim());
              return lines.map((line, li) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                if (trimmed === '---') {
                  return (
                    <hr key={`${bi}-${li}`} className="my-10 border-gray-200" />
                  );
                }

                // Bullet list items
                if (trimmed.startsWith('- ')) {
                  return (
                    <li key={`${bi}-${li}`} className="ml-5 mb-2 text-base md:text-lg leading-8 text-gray-700 list-disc">
                      {trimmed.slice(2)}
                    </li>
                  );
                }

                // Numbered list items
                if (/^\d+\.\s/.test(trimmed)) {
                  return (
                    <li key={`${bi}-${li}`} className="ml-5 mb-2 text-base md:text-lg leading-8 text-gray-700 list-decimal">
                      {trimmed.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                }

                // Section heading: short line, ends without period, not a bullet
                const isHeading =
                  trimmed.length < 90 &&
                  !trimmed.endsWith('.') &&
                  !trimmed.startsWith('-') &&
                  (trimmed === trimmed.toUpperCase() ||
                    (/^[A-Z]/.test(trimmed) && li === 0 && bi > 0));

                if (isHeading && trimmed.length < 70 && !trimmed.includes('?')) {
                  return (
                    <h2 key={`${bi}-${li}`} className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">
                      {trimmed}
                    </h2>
                  );
                }

                return (
                  <p key={`${bi}-${li}`} className="text-base md:text-lg leading-8 text-gray-700 mb-4">
                    {trimmed}
                  </p>
                );
              });
            })}
          </div>

          {/* Tags */}
          <div className="mb-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Card */}
          {author && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 mb-10 flex gap-5 items-start">
              <Link href={`/author/${author.slug}`} className="shrink-0">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-2 border-orange-200"
                />
              </Link>
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">About the Author</p>
                <Link href={`/author/${author.slug}`} className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors">
                  {author.name}
                </Link>
                <p className="text-xs text-gray-500 mb-2">{author.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{author.bio}</p>
                <div className="flex gap-3">
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.74-8.852L1.254 2.25H8.08l4.252 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  <Link
                    href={`/author/${author.slug}`}
                    className="text-xs text-orange-600 font-semibold hover:underline ml-2"
                  >
                    All articles by {author.name} →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-12 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-5 bg-orange-600 rounded-full inline-block" />
                More in {article.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
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
