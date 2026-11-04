import React from 'react';
import { Heart, Star, Zap, ShieldCheck } from 'lucide-react';
import { JumiaProduct } from '../../types/jumia';

interface JumiaProductCardProps {
  product: JumiaProduct;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: JumiaProduct) => void;
  onAddToCart: (product: JumiaProduct, e: React.MouseEvent) => void;
}

export const JumiaProductCard: React.FC<JumiaProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-lg border border-stone-200 hover:border-[#F68B1E] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col p-3 group relative"
    >
      {/* Top Tag Badges */}
      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
        {product.isExpress && (
          <div className="bg-[#F68B1E] text-white text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 fill-white" />
            <span>EXPRESS</span>
          </div>
        )}
        {product.isOfficialStore && (
          <div className="bg-stone-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
            <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
            <span>OFFICIAL</span>
          </div>
        )}
      </div>

      {/* Discount Pill & Wishlist Icon */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
        {product.discountPercent > 0 && (
          <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-black px-1.5 py-0.5 rounded">
            -{product.discountPercent}%
          </span>
        )}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm border border-stone-200 transition-colors ${
            isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-44 sm:h-48 flex items-center justify-center bg-stone-50 rounded-md overflow-hidden mb-3 p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand & Category Subtitle */}
      <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
        <span className="truncate">{product.brand}</span>
        {product.inStock ? (
          <span className="text-emerald-600 text-[10px] font-semibold">In Stock</span>
        ) : (
          <span className="text-stone-400 text-[10px]">Out of Stock</span>
        )}
      </div>

      {/* Product Name (2 Lines) */}
      <h3 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-[#F68B1E] transition-colors mb-2 min-h-[38px]">
        {product.name}
      </h3>

      {/* Price Block */}
      <div className="mt-auto pt-1">
        <div className="flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-black text-stone-900">
            $ {product.price.toLocaleString()}
          </span>
          {product.oldPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              $ {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-500">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-stone-600">({product.reviewCount})</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => onAddToCart(product, e)}
          className="w-full mt-3 py-2 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-extrabold rounded shadow-sm transition-all active:scale-95 uppercase tracking-wider"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
