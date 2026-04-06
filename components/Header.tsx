'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/seo';
import { useState } from 'react';

const navCategories = [
  { label: 'Technology', href: '/#technology' },
  { label: 'Business', href: '/#business' },
  { label: 'Healthcare', href: '/#healthcare' },
  { label: 'Hospitality', href: '/#hospitality' },
  { label: 'Politics', href: '/#politics' },
  { label: 'Travel', href: '/#travel' },
  { label: 'Entertainment', href: '/#entertainment' },
  { label: 'Sports', href: '/#sports' },
  { label: 'Review', href: '/#review' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <nav className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <Image
                src="/image/logo.png"
                alt={siteConfig.name}
                width={100}
                height={100}
                className="h-12 sm:h-14 w-auto"
              />
            </Link>

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/author/aditya-pandey" className="text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors">
                Authors
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Admin
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Category nav strip */}
      <div className="bg-white hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="shrink-0 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors">
            Home
          </Link>
          {navCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/author/aditya-pandey"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors"
          >
            Authors
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 bg-orange-600 text-white font-semibold rounded-lg text-center hover:bg-orange-700 transition-colors mt-2"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
