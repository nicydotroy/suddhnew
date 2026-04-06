import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getAuthorBySlug, getArticlesByAuthor, authors } from '@/lib/articles';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: 'Author Not Found' };

  return {
    title: `${author.name} — Suddh News`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const authorArticles = getArticlesByAuthor(author.id);

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        {/* Author Hero */}
        <div className="border-b border-gray-200 bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <Image
                src={author.avatar}
                alt={author.name}
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-white shadow-md shrink-0"
              />
              <div className="text-center sm:text-left">
                <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Author</p>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{author.name}</h1>
                <p className="text-gray-500 text-sm mb-4">{author.role}</p>
                <p className="text-gray-700 leading-relaxed mb-5">{author.bio}</p>

                {/* Social links */}
                <div className="flex gap-3 justify-center sm:justify-start">
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.74-8.852L1.254 2.25H8.08l4.252 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      @{author.twitter}
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A66C2] bg-gray-100 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-full transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1 h-6 bg-orange-600 rounded-full inline-block" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Articles by {author.name}
              </h2>
              <span className="text-sm text-gray-500 font-medium ml-1">
                ({authorArticles.length} {authorArticles.length === 1 ? 'article' : 'articles'})
              </span>
            </div>

            {authorArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {authorArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p>No articles published yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
