import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  PhoneCall, 
  Store, 
  Truck, 
  RotateCcw,
  Sparkles,
  CookingPot,
  Zap,
  Utensils,
  Package,
  Cake,
  Wine,
  LayoutGrid
} from 'lucide-react';
import { JUMIA_CATEGORIES, JUMIA_HERO_SLIDES } from '../../data/jumiaProducts';

interface JumiaHeroSectionProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  onOpenSeller: () => void;
  onOpenFlashSales: () => void;
}

export const JumiaHeroSection: React.FC<JumiaHeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSeller,
  onOpenFlashSales
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % JUMIA_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = JUMIA_HERO_SLIDES[currentSlide];

  // Category icon mapping
  const getIcon = (id: string) => {
    switch (id) {
      case 'Cookware & Pots': return <CookingPot className="w-4 h-4 text-stone-600" />;
      case 'Small Appliances': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Utensils & Gadgets': return <Utensils className="w-4 h-4 text-stone-600" />;
      case 'Food Storage': return <Package className="w-4 h-4 text-stone-600" />;
      case 'Bakeware': return <Cake className="w-4 h-4 text-stone-600" />;
      case 'Dining & Cutlery': return <Wine className="w-4 h-4 text-stone-600" />;
      case 'Kitchen Organization': return <LayoutGrid className="w-4 h-4 text-stone-600" />;
      default: return <Sparkles className="w-4 h-4 text-[#F68B1E]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Categories Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-3 bg-stone-100 border-b border-stone-200">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F68B1E]"></span>
              Browse Kitchen Depts
            </h3>
          </div>
          <div className="py-1 text-xs">
            {JUMIA_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-amber-50 font-bold text-[#F68B1E] border-l-4 border-[#F68B1E]'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-[#F68B1E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getIcon(cat.id)}
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Carousel */}
        <div className="col-span-1 lg:col-span-6 relative rounded-lg overflow-hidden shadow-sm border border-stone-200 group bg-stone-900 min-h-[280px] sm:min-h-[360px] flex items-center">
          <img
            src={slide.bannerImage}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>

          {/* Slide Text Content */}
          <div className="relative z-10 p-6 sm:p-8 max-w-lg text-white">
            <div className="inline-block px-2.5 py-1 bg-[#F68B1E] text-white text-[11px] font-black rounded tracking-wider uppercase mb-3 shadow">
              {slide.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight drop-shadow-md mb-2">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mb-6 line-clamp-2">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectCategory(slide.category)}
                className="bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded shadow-lg transition-transform active:scale-95 uppercase tracking-wider"
              >
                {slide.tag}
              </button>
              <button
                onClick={onOpenFlashSales}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded backdrop-blur-sm transition-colors"
              >
                View Flash Deals
              </button>
            </div>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + JUMIA_HERO_SLIDES.length) % JUMIA_HERO_SLIDES.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % JUMIA_HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {JUMIA_HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-[#F68B1E]' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Service & Promotion Cards (Authentic Jumia) */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-3 justify-between">
          {/* Card 1: Call to Order */}
          <div className="bg-white rounded-lg p-3.5 shadow-sm border border-stone-200 flex items-center gap-3 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#F68B1E] shrink-0 border border-amber-200">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">CALL TO ORDER</p>
              <a href="tel:07006000000" className="text-sm font-black text-stone-900 hover:text-[#F68B1E]">
                0700 600 0000
              </a>
              <p className="text-[10px] text-stone-500">Order utensils directly on phone</p>
            </div>
          </div>

          {/* Card 2: Sell on Jumia */}
          <div 
            onClick={onOpenSeller}
            className="bg-white rounded-lg p-3.5 shadow-sm border border-stone-200 flex items-center gap-3 hover:border-[#F68B1E] cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 group-hover:text-[#F68B1E] shrink-0 border border-stone-200">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-[#F68B1E] uppercase tracking-wide">SELL ON JUMIA</p>
              <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#F68B1E]">Open Kitchen Store</h4>
              <p className="text-[10px] text-stone-500">List utensils & view live orders</p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#F68B1E]" />
          </div>

          {/* Card 3: Jumia Express */}
          <div className="bg-amber-500/10 rounded-lg p-3.5 shadow-sm border border-[#F68B1E]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F68B1E] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-stone-900">JUMIA</span>
                <span className="text-[10px] font-black bg-[#F68B1E] text-white px-1.5 py-0.2 rounded">EXPRESS</span>
              </div>
              <p className="text-xs font-bold text-stone-800 mt-0.5">24H Door Delivery</p>
              <p className="text-[10px] text-stone-600">Guaranteed next-day in Lagos & Abuja</p>
            </div>
          </div>

          {/* Card 4: Free Returns */}
          <div className="bg-white rounded-lg p-3.5 shadow-sm border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">EASY RETURNS</p>
              <p className="text-xs font-bold text-stone-900">7 Days Free Return</p>
              <p className="text-[10px] text-stone-500">Hassle-free refunds & exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
