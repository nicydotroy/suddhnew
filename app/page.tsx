import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles, getAllCategories } from '@/lib/articles';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: 'Read the latest articles on technology, marketing, and web development.',
});

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const hasArticles = articles.length > 0;

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 md:py-24">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  Suddh News
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover insightful stories, latest trends, and expert insights on technology, marketing, and digital innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#articles"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Start Reading
                </a>
                <a
                  href="#newsletter"
                  className="px-8 py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{articles.length}</div>
                <p className="text-gray-600 text-sm mt-2">Articles Published</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{categories.length}</div>
                <p className="text-gray-600 text-sm mt-2">Categories</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <p className="text-gray-600 text-sm mt-2">SEO Optimized</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">∞</div>
                <p className="text-gray-600 text-sm mt-2">Growing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        {hasArticles ? (
          <section id="articles" className="py-16 md:py-20 bg-gradient-to-br from-white via-orange-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Latest Articles
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-blue-600 rounded" />
              </div>

              {/* Articles Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="mx-auto max-w-2xl">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">No Articles Yet</h2>
                <p className="text-gray-600 mb-8">
                  Start creating your first article and share your insights with the world!
                </p>
                <Link
                  href="/admin"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Create Your First Article
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <section id="categories" className="bg-gray-50 py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Explore Topics
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-600 rounded" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group relative overflow-hidden rounded-xl bg-white p-8 hover:shadow-lg transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {category}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {articles.filter(a => a.category === category).length} articles
                    </p>
                    <svg className="w-5 h-5 text-orange-600 mt-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section id="newsletter" className="relative overflow-hidden py-16 md:py-24">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml?base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-10" />

          <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-orange-100 text-lg mb-10">
                Get the latest articles delivered directly to your inbox. Never miss an insight.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:shadow-xl transition-all"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-orange-100 text-xs mt-4">
                ✓ No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
