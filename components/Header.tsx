'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/seo';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Only */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/image/logo.png"
                alt={siteConfig.name}
                width={50}
                height={50}
                className="h-12 w-auto group-hover:scale-110 transition-transform"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Home
            </Link>
            <a href="#categories" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Categories
            </a>
            <a href="#about" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Contact
            </a>
            <Link 
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
            <Link href="/" className="block text-gray-600 hover:text-orange-600 font-medium">
              Home
            </Link>
            <a href="#categories" className="block text-gray-600 hover:text-orange-600 font-medium">
              Categories
            </a>
            <a href="#about" className="block text-gray-600 hover:text-orange-600 font-medium">
              About
            </a>
            <a href="#contact" className="block text-gray-600 hover:text-orange-600 font-medium">
              Contact
            </a>
            <Link 
              href="/login"
              className="block px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white text-center rounded-lg font-medium"
            >
              Admin
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
