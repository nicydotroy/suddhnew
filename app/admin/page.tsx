'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    category: 'Technology',
    tags: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just log the data
    console.log('New article:', {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    });
    alert('Article data logged to console. To persist, integrate with a database.');
    setFormData({
      title: '',
      slug: '',
      description: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      category: 'Technology',
      tags: '',
    });
  };

  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Admin - Add New Article</h1>
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                ← Back to Home
              </Link>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter article title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-900">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="url-slug-for-article"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                    Description (Meta Description) *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Brief description for SEO (150-160 characters recommended)"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-900">
                    Article Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={10}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Write your article content here..."
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-900">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Author name"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-900">
                    Publication Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-900">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-900">
                    Tags (comma-separated) *
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Add Article
                  </button>
                  <Link
                    href="/"
                    className="rounded-lg border border-gray-300 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Link>
                </div>
              </form>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Currently, articles are stored in{' '}
                  <code className="font-mono text-blue-600">lib/articles.ts</code>. To make this
                  fully functional, integrate with a database (MongoDB, PostgreSQL, etc.) and
                  create corresponding API endpoints.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
