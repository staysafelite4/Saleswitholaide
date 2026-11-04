import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Mail, MapPin, Phone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setIsAdminOpen } = useStore();

  const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="font-serif font-bold text-xl text-white">
              {siteConfig.brandName || 'Zobowellness'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {siteConfig.tagline || 'Grade A Cleaned Hibiscus Sabdariffa & Wholesale Botanical Herbs'}
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Ordering & Inquiries (08030795206)</span>
              </a>
            </div>
          </div>

          {/* Wholesale Botanical Catalog */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Bulk Catalog
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#menu" className="hover:text-white transition-colors">Grade A Cleaned Hibiscus (1kg–100kg+)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">1,000kg+ Commercial Shipment Quote</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">22+ Organic Botanical Leaves & Teas</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Superfood Powders & Raw Seeds</a></li>
            </ul>
          </div>

          {/* Quality & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Quality & Trust
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#story" className="hover:text-white transition-colors">Sahel Sun-Dried Standards</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Triple-Cleaned Stone-Free Guarantee</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Client Reviews & Feedback</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Wholesale & Shipping FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Hub */}
          <div className="space-y-3 text-xs text-stone-400">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Contact & Dispatch
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{siteConfig.kitchenAddress || 'SalesWithOlaide Partner Hub · 48-Hour Setup'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{siteConfig.contactPhone || '08030795206'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.contactEmail || 'sales@zobowellness.com'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {new Date().getFullYear()} {siteConfig.brandName || 'Zobowellness'}. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-amber-400 font-medium">SalesWithOlaide</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
              title="Open Admin CMS Dashboard"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Store CMS & Product Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
