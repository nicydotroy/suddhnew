'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getAuthFromStorage, clearAuthFromStorage } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const auth = getAuthFromStorage();
    if (!auth.isLoggedIn || auth.role !== 'admin') {
      router.push('/login');
    } else {
      setAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

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
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('New article published:', {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      });
      
      setSuccessMessage('Article published successfully!');
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
      setSubmitting(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 800);
  };

  const handleLogout = () => {
    clearAuthFromStorage();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Redirect happens in useEffect
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50 min-h-screen">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Publish New Article
              </h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Logout
              </button>
            </div>

            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                ✓ {successMessage}
              </div>
            )}

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-800">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="Enter article title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-800">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="url-slug-for-article"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-800">
                    Description (Meta Description) *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="Brief description for SEO (150-160 characters recommended)"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-800">
                    Article Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={10}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="Write your article content here..."
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-800">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="Author name"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-800">
                    Publication Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-800">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-800">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
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
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-800">
                    Tags (comma-separated) *
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 font-semibold text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Publishing...' : '✓ Publish Article'}
                  </button>
                  <Link
                    href="/"
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-600">
                  <strong>💡 Info:</strong> Articles will be saved to the articles database. Make sure all required fields are filled correctly before publishing.
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
