import React from 'react';
import { Flame, Zap, CheckCircle2 } from 'lucide-react';
import { JUMIA_CATEGORIES } from '../../data/jumiaProducts';

interface JumiaCategoriesRibbonProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  expressOnly: boolean;
  onToggleExpressOnly: () => void;
  flashSaleOnly: boolean;
  onToggleFlashSaleOnly: () => void;
}

export const JumiaCategoriesRibbon: React.FC<JumiaCategoriesRibbonProps> = ({
  activeCategory,
  onSelectCategory,
  expressOnly,
  onToggleExpressOnly,
  flashSaleOnly,
  onToggleFlashSaleOnly,
}) => {
  return (
    <div className="bg-stone-50 border-b border-stone-200 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-xs font-medium whitespace-nowrap">
        {/* Flash Sales Button */}
        <button
          onClick={onToggleFlashSaleOnly}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all font-bold ${
            flashSaleOnly
              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Flash Sales</span>
        </button>

        {/* Jumia Express Button */}
        <button
          onClick={onToggleExpressOnly}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all font-bold ${
            expressOnly
              ? 'bg-[#F68B1E] text-white shadow-sm ring-2 ring-amber-300'
              : 'bg-amber-50 text-[#d97010] hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-[#d97010]" />
          <span>Jumia Express (24H)</span>
        </button>

        <div className="h-4 w-px bg-stone-300 mx-1"></div>

        {/* Category Pills */}
        {JUMIA_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id && !flashSaleOnly;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
