import React, { useState } from 'react';
import { Product, ProductAvailability } from '../types';
import { useStore } from '../context/StoreContext';
import { Sparkles, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { siteConfig } = useStore();
  
  // Multi-select sizes list
  const availableSizesList = product.availableSizes && product.availableSizes.length > 0
    ? product.availableSizes
    : [product.size];

  // Store array of selected size strings (starts with first size pre-selected)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([availableSizesList[0]]);

  const isAvailable = product.availability !== 'out_of_stock';

  const availabilityLabels: Record<ProductAvailability, { text: string; color: string }> = {
    in_stock: { text: 'Available', color: 'text-emerald-700' },
    low_stock: { text: 'Limited Supply', color: 'text-amber-700' },
    brewing_fresh: { text: 'Fresh Processing', color: 'text-stone-600' },
    out_of_stock: { text: 'Sold Out', color: 'text-stone-400' }
  };

  const status = availabilityLabels[product.availability] || availabilityLabels.in_stock;

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleWhatsAppOrder = () => {
    const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');
    let text = '';
    
    if (product.isQuoteOnly) {
      text = encodeURIComponent(
        `Hello ${siteConfig.brandName || 'Zobowellness'}! I would like to request a wholesale commercial quote for *${product.name}* (1,000kg+ Bulk Container). Please provide shipping and price details.`
      );
    } else {
      // If user hasn't selected any size, default to the first size so they can proceed effortlessly
      const activeSizes = selectedSizes.length > 0 ? selectedSizes : [availableSizesList[0]];
      const formattedSizes = activeSizes.join(', ');

      text = encodeURIComponent(
        `Hello ${siteConfig.brandName || 'Zobowellness'}! I want to order / get pricing for:\n• *Product:* ${product.name}\n• *Selected Size(s):* ${formattedSizes}\n\nPlease send me current prices and delivery options.`
      );
    }
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  // Button label formatting
  const getButtonLabel = () => {
    if (product.isQuoteOnly) {
      return 'Request 1,000kg+ WhatsApp Quote';
    }
    if (selectedSizes.length === 0) {
      return `Order on WhatsApp (${availableSizesList[0]})`;
    }
    if (selectedSizes.length === 1) {
      return `Order on WhatsApp (${selectedSizes[0]})`;
    }
    return `Order on WhatsApp (${selectedSizes.length} Sizes: ${selectedSizes.join(', ')})`;
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />

        {/* Fallback container if image load errors */}
        <div
          style={{ display: 'none' }}
          className="w-full h-full bg-gradient-to-br from-[#720026]/10 to-stone-200 flex flex-col items-center justify-center p-6 text-center text-stone-600"
        >
          <Sparkles className="w-8 h-8 text-[#720026] mb-2" />
          <p className="font-serif font-bold text-sm text-stone-800">{product.name}</p>
          <p className="text-xs text-stone-500 mt-1">
            {selectedSizes.length > 0 ? selectedSizes.join(', ') : availableSizesList[0]}
          </p>
        </div>

        {/* Grade A Cleaned Badge */}
        {product.category === 'bulk_hibiscus' && (
          <div className="absolute top-3 left-3 bg-[#720026] text-white px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Grade A Cleaned</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium text-stone-700 capitalize">
              {product.category.replace('_', ' ')}
            </span>
            <span className={`font-medium ${status.color}`}>{status.text}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-serif font-semibold text-stone-900 group-hover:text-[#720026] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Multi-Select Size Selector */}
          {!product.isQuoteOnly && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-stone-800">
                  Select Size(s) (Multi-Choice):
                </label>
                {selectedSizes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedSizes([])}
                    className="text-[10px] text-stone-500 hover:text-[#720026] underline cursor-pointer"
                  >
                    Clear selection
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {availableSizesList.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded border transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-[#720026] text-white border-[#720026] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-amber-300 stroke-[3]" />}
                      <span>{size}</span>
                    </button>
                  );
                })}
              </div>

              {selectedSizes.length > 0 ? (
                <p className="text-[10px] text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                  <span>✓ Selected:</span>
                  <span className="font-bold text-stone-900">{selectedSizes.join(', ')}</span>
                </p>
              ) : (
                <p className="text-[10px] text-stone-500 mt-1.5 italic">
                  Tap one or multiple sizes above
                </p>
              )}
            </div>
          )}

          {/* Composition */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="pt-1 text-[11px] text-stone-500">
              <span className="font-medium text-stone-600">Composition: </span>
              {product.ingredients.slice(0, 2).join(', ')}
            </div>
          )}
        </div>

        {/* Action Button: Direct WhatsApp Ordering / Quote */}
        <div className="pt-3 border-t border-stone-100">
          <button
            onClick={handleWhatsAppOrder}
            disabled={!isAvailable}
            className="w-full py-2.5 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span className="truncate">{getButtonLabel()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
