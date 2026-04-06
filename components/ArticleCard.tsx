'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Category and Date */}
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
            {article.category}
          </span>
          <time className="text-sm text-gray-500">{article.date}</time>
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2">
          <Link
            href={`/articles/${article.slug}`}
            className="text-xl font-bold text-gray-900 hover:text-blue-600"
          >
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-gray-600">{article.description}</p>

        {/* Author and Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">By {article.author}</span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <Link
            href={`/articles/${article.slug}`}
            className="inline-block text-blue-600 font-semibold hover:text-blue-800"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
