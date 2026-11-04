import React, { useState, useEffect } from 'react';
import { Flame, Clock, ChevronRight } from 'lucide-react';
import { JumiaProduct } from '../../types/jumia';

interface JumiaFlashSalesBarProps {
  products: JumiaProduct[];
  onSelectProduct: (product: JumiaProduct) => void;
  onAddToCart: (product: JumiaProduct, e: React.MouseEvent) => void;
}

export const JumiaFlashSalesBar: React.FC<JumiaFlashSalesBarProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  // Countdown timer state for flash sale (resets every 24 hours)
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale);

  if (flashProducts.length === 0) return null;

  const formatDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        {/* Flash Sales Header Banner (Jumia Signature Red/Crimson) */}
        <div className="bg-[#e61601] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white text-[#e61601] flex items-center justify-center font-bold shadow">
              <Flame className="w-4 h-4 fill-[#e61601]" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-wide uppercase">
              Flash Sales
            </h3>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Time Left:</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="bg-black/40 px-2 py-1 rounded text-white">{formatDigits(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="bg-black/40 px-2 py-1 rounded text-white">{formatDigits(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="bg-black/40 px-2 py-1 rounded text-white">{formatDigits(timeLeft.seconds)}s</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold hover:underline cursor-pointer">
            <span>SEE ALL DEALS</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Flash Sale Product Rail */}
        <div className="p-4 overflow-x-auto scrollbar-thin">
          <div className="flex gap-4 min-w-max">
            {flashProducts.map((product) => {
              const totalInitial = product.stockCount + product.soldCount;
              const soldPercentage = Math.min(
                95,
                Math.round((product.soldCount / totalInitial) * 100)
              );

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="w-48 sm:w-52 bg-white rounded-md border border-stone-200 hover:border-[#F68B1E] hover:shadow-md transition-all cursor-pointer flex flex-col p-2.5 group relative"
                >
                  {/* Discount Badge */}
                  <span className="absolute top-2 right-2 bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-extrabold px-1.5 py-0.5 rounded z-10">
                    -{product.discountPercent}%
                  </span>

                  {/* Image */}
                  <div className="w-full h-36 flex items-center justify-center bg-stone-50 rounded mb-2 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Title */}
                  <h4 className="text-xs text-stone-800 line-clamp-2 font-medium leading-snug group-hover:text-[#F68B1E] transition-colors mb-1">
                    {product.name}
                  </h4>

                  {/* Pricing */}
                  <div className="mt-auto">
                    <div className="text-sm sm:text-base font-black text-stone-900">
                      $ {product.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-stone-400 line-through">
                      $ {product.oldPrice.toLocaleString()}
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-stone-500 font-medium mb-1">
                        <span>{product.stockCount} items left</span>
                        <span className="text-rose-600 font-bold">{soldPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                          style={{ width: `${soldPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => onAddToCart(product, e)}
                      className="w-full mt-2.5 py-1.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold rounded shadow-sm transition-colors uppercase tracking-wider"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
