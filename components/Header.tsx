import Link from 'next/link';
import { siteConfig } from '@/lib/seo';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            {siteConfig.name}
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <a href="#about" className="text-gray-600 hover:text-blue-600">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
