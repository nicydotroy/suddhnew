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

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Welcome to Suddh News
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover insightful articles on technology, marketing, and web development
            </p>
          </div>
        </section>

        {/* Featured Articles */}
        {articles.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>

              {/* Articles Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block rounded-lg border border-gray-200 bg-white p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-blue-600 px-6 py-12 text-center md:px-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-blue-100 mb-8">
                Get the latest articles delivered directly to your inbox
              </p>
              <form className="flex flex-col gap-4 md:flex-row md:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded px-4 py-2 text-gray-900 md:w-64"
                  required
                />
                <button
                  type="submit"
                  className="rounded bg-white px-6 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
