import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { siteConfig } = useStore();
  const [dismissed, setDismissed] = useState(false);

  const banner = siteConfig.promoBanner;

  if (!banner || !banner.enabled || dismissed) {
    return null;
  }

  const colorStyles = {
    crimson: 'bg-[#58001c] text-rose-50 border-b border-[#720026]/40',
    amber: 'bg-[#854d0e] text-amber-50 border-b border-[#a16207]/40',
    emerald: 'bg-[#064e3b] text-emerald-50 border-b border-[#047857]/40',
    charcoal: 'bg-[#18181b] text-zinc-100 border-b border-zinc-700/50'
  };

  const currentStyle = colorStyles[banner.bgColor] || colorStyles.crimson;

  return (
    <div className={`relative px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${currentStyle}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          {banner.badgeText && (
            <span className="font-semibold tracking-wide uppercase text-[11px] opacity-90">
              {banner.badgeText}
            </span>
          )}
          {banner.badgeText && <span className="opacity-40" aria-hidden="true">·</span>}
          <span className="font-normal">{banner.text}</span>
          {banner.linkText && banner.linkUrl && (
            <a
              href={banner.linkUrl}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity ml-1 shrink-0"
            >
              {banner.linkText}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/10 rounded transition-colors text-current shrink-0"
          aria-label="Dismiss banner"
          title="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
