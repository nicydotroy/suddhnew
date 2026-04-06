'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Article Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Article Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Category Badge */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block rounded-full bg-gradient-to-r from-orange-100 to-blue-100 px-3 py-1 text-xs font-bold text-orange-700">
            {article.category}
          </span>
          <time className="text-xs text-gray-500 font-medium">
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2">
          <Link
            href={`/articles/${article.slug}`}
            className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed">
          {article.description}
        </p>

        {/* Author */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-blue-500" />
          <span className="text-xs font-semibold text-gray-700">{article.author}</span>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 2 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{article.tags.length - 2}
            </span>
          )}
        </div>

        {/* Read More Link */}
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-red-600 group/link"
        >
          Read Now
          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
