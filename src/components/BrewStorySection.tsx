import React from 'react';
import { useStore } from '../context/StoreContext';
import { Flower2, Leaf, Truck, Droplets, CheckCircle2 } from 'lucide-react';

export const BrewStorySection: React.FC = () => {
  const { siteConfig } = useStore();
  const story = siteConfig.story;

  if (!story) return null;

  const iconMap: Record<string, React.ReactNode> = {
    flower: <Flower2 className="w-5 h-5 text-[#720026]" />,
    leaf: <Leaf className="w-5 h-5 text-emerald-700" />,
    truck: <Truck className="w-5 h-5 text-amber-700" />
  };

  return (
    <section id="story" className="py-20 bg-[#F4EFE6]/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold">
            {story.badge || 'Heritage & Craft'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            {story.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {story.subtitle}
          </p>
        </div>

        {/* Narrative & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-xs space-y-5">
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              {story.bodyText}
            </p>
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500">
              <CheckCircle2 className="w-4 h-4 text-[#720026]" />
              <span>Slow-steeped in stainless culinary tanks · Natural micro-filtration</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#4a0018] text-rose-50 p-8 sm:p-10 rounded-2xl shadow-md space-y-4">
            <div className="text-amber-300 font-serif text-3xl font-bold">“</div>
            <p className="text-base sm:text-lg font-serif italic text-rose-100 leading-relaxed">
              {story.quote}
            </p>
            <p className="text-xs tracking-wider uppercase text-rose-300 font-semibold pt-2">
              — Master Brewer Note
            </p>
          </div>
        </div>

        {/* 3 Pillars / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(story.features || []).map((feat, index) => (
            <div
              key={feat.id || index}
              className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                {iconMap[feat.iconName] || <Droplets className="w-5 h-5 text-[#720026]" />}
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
