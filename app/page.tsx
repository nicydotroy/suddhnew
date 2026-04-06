import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles, getAllCategories, getFeaturedArticle, getArticlesByCategory } from '@/lib/articles';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: 'Suddh News — Read the latest on digital marketing, technology, SEO, and personal branding in India.',
});

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const featured = getFeaturedArticle();
  const latestArticles = articles.filter((a) => !a.featured).slice(0, 6);

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">

        {/* Breaking News Ticker */}
        <div className="bg-orange-600 text-white py-2 overflow-hidden">
          <div className="container mx-auto px-4 flex items-center gap-4">
            <span className="shrink-0 bg-white text-orange-600 font-black text-xs px-3 py-1 rounded uppercase tracking-wider">
              Latest
            </span>
            <div className="overflow-hidden flex-1">
              <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap">
                {articles.map((a) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="text-sm hover:underline shrink-0">
                    {a.title}
                  </Link>
                ))}
                {articles.map((a) => (
                  <Link key={`dup-${a.id}`} href={`/articles/${a.slug}`} className="text-sm hover:underline shrink-0">
                    {a.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Nav Strip */}
        <div className="border-b border-gray-200 bg-white sticky top-[var(--header-height,80px)] z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0">
              <Link
                href="/"
                className="shrink-0 px-4 py-3 text-sm font-semibold text-orange-600 border-b-2 border-orange-600 transition-colors"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="shrink-0 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Story */}
        {featured && (
          <section className="border-b border-gray-200 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* Featured Image */}
                <div className="md:col-span-3 relative h-64 md:h-96 rounded-xl overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                    Featured
                  </span>
                </div>

                {/* Featured Content */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <Link
                    href={`#${featured.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-3 hover:underline"
                  >
                    {featured.category}
                  </Link>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 hover:text-orange-700 transition-colors">
                    <Link href={`/articles/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h1>
                  <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <Link href={`/author/${featured.authorId}`} className="font-semibold text-gray-800 hover:text-orange-600">
                      {featured.author}
                    </Link>
                    <span>·</span>
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <Link
                    href={`/articles/${featured.slug}`}
                    className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors w-fit"
                  >
                    Read Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest News Grid */}
        {latestArticles.length > 0 && (
          <section className="py-10 md:py-14 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-6 bg-orange-600 rounded-full inline-block" />
                  Latest Stories
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Sections */}
        {categories.map((category) => {
          const catArticles = getArticlesByCategory(category).slice(0, 3);
          if (catArticles.length === 0) return null;
          const categoryId = category.toLowerCase().replace(/\s+/g, '-');

          return (
            <section key={category} id={categoryId} className="py-10 md:py-14 border-b border-gray-200 last:border-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
                    <span className="w-1 h-6 bg-orange-600 rounded-full inline-block" />
                    {category}
                  </h2>
                  <Link
                    href={`#${categoryId}`}
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    More {category}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* First article large, rest small */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Lead article */}
                  {catArticles[0] && (
                    <div className="md:col-span-2">
                      <article className="group flex flex-col md:flex-row gap-5 h-full">
                        <div className="relative h-52 md:h-auto md:w-64 shrink-0 rounded-xl overflow-hidden">
                          <Image
                            src={catArticles[0].image}
                            alt={catArticles[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
                            {catArticles[0].category}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors">
                            <Link href={`/articles/${catArticles[0].slug}`}>
                              {catArticles[0].title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {catArticles[0].description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Link href={`/author/${catArticles[0].authorId}`} className="font-semibold text-gray-700 hover:text-orange-600">
                              {catArticles[0].author}
                            </Link>
                            <span>·</span>
                            <time dateTime={catArticles[0].date}>
                              {new Date(catArticles[0].date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                          </div>
                        </div>
                      </article>
                    </div>
                  )}

                  {/* Side articles */}
                  <div className="flex flex-col divide-y divide-gray-100">
                    {catArticles.slice(1).map((article) => (
                      <article key={article.id} className="group py-4 first:pt-0 last:pb-0 flex gap-4 items-start">
                        <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                            <Link href={`/articles/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h4>
                          <time className="text-xs text-gray-500" dateTime={article.date}>
                            {new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </time>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Newsletter */}
        <section className="bg-gray-900 py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
            <p className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-3">Newsletter</p>
            <h2 className="text-3xl font-black text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest stories on digital marketing, technology, and business delivered to your inbox every week.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
