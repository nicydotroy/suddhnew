import Link from 'next/link';
import { siteConfig } from '@/lib/seo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-12">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              {siteConfig.name}
            </h3>
            <p className="text-gray-600 text-sm">{siteConfig.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-blue-600 text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
