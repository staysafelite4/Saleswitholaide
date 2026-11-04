import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Settings, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteConfig, setIsAdminOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active navigation links from site config
  const visibleLinks = (siteConfig.navLinks || []).filter(link => link.visible);
  const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Brand Wordmark */}
          <a
            href="/"
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#4a0018] whitespace-nowrap shrink-0 hover:text-[#720026] transition-colors"
          >
            {siteConfig.brandName || 'Zobowellness'}
          </a>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {visibleLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                className="hover:text-[#720026] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action: Direct WhatsApp Button & Admin Utility */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Zobowellness! I want to order / inquire about Grade A Hibiscus & Botanicals.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Open Admin Dashboard"
              aria-label="Open Admin Dashboard"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CMS</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF7F2] px-6 py-4 space-y-3">
            {visibleLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-stone-800 hover:text-[#720026] py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">Need immediate help?</span>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat 08030795206</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
