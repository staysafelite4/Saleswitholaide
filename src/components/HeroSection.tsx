import React from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE_PATH } from '../data/initialData';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { siteConfig } = useStore();

  const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');
  const quickChatText = encodeURIComponent(
    `Hello ${siteConfig.brandName || 'Zobowellness'}! I would like to inquire about ordering Grade A Cleaned Hibiscus & Botanical Leaves.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${quickChatText}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sahel Sun-Dried Grade A Hibiscus & Botanical Herbs</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-[1.12] tracking-tight [text-wrap:balance]">
              Cleaned Grade A Hibiscus Sabdariffa & Wholesale Botanicals.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Thoroughly cleaned, stone-free Sahel sun-dried Hibiscus leaves in bulk (1kg to 100kg+ and 1,000kg+ commercial container quotes). Plus 22+ premium organic botanical leaves, herbs, seeds, and micro-milled powders. Select your size and order directly on WhatsApp!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg shadow-xs transition-all duration-200 cursor-pointer"
              >
                <span>View Products & Sizes</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order / Get Quotes on WhatsApp (08030795206)</span>
              </a>
            </div>

            {/* Quiet Trust Markers */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <p className="font-semibold text-stone-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Triple-Cleaned</span>
                </p>
                <p className="text-stone-500 text-[11px] mt-0.5">Stone-free whole calyces</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Bulk Sizing</span>
                </p>
                <p className="text-stone-500 text-[11px] mt-0.5">1kg to 1,000kg+ Container</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direct WhatsApp</span>
                </p>
                <p className="text-stone-500 text-[11px] mt-0.5">Fast 1-click order booking</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-stone-100 group">
              <img
                src={HERO_IMAGE_PATH}
                alt="Grade A Sahel sun-dried Hibiscus Sabdariffa whole calyces"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-rose-200 font-medium">Sahel Sun-Dried</p>
                  <p className="text-lg font-serif font-bold text-white">Grade A Hibiscus Sabdariffa</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold bg-emerald-800/90 backdrop-blur-md px-3 py-1.5 rounded-md text-white">
                    WhatsApp Booking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
