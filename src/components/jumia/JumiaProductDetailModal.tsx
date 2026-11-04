import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  Check, 
  Package, 
  MapPin, 
  Minus, 
  Plus, 
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { JumiaProduct } from '../../types/jumia';
import { NIGERIAN_STATES } from '../../data/jumiaProducts';

interface JumiaProductDetailModalProps {
  product: JumiaProduct | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: JumiaProduct, quantity: number) => void;
  onBuyNow: (product: JumiaProduct, quantity: number) => void;
}

export const JumiaProductDetailModal: React.FC<JumiaProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const currentState = NIGERIAN_STATES[selectedStateIndex];
  const savingsAmount = product.oldPrice - product.price;

  const handleIncrement = () => {
    if (quantity < product.stockCount) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-5 py-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2 text-xs text-stone-500 truncate">
            <span>Home</span>
            <span>&gt;</span>
            <span>Kitchen & Dining</span>
            <span>&gt;</span>
            <span className="text-[#F68B1E] font-medium">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Column 1: Images (Col 1-5) */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="w-full h-72 sm:h-80 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-center p-4 relative overflow-hidden group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 duration-300"
                />
                {product.isExpress && (
                  <div className="absolute top-3 left-3 bg-[#F68B1E] text-white text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    <span>JUMIA EXPRESS</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Previews */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded border-2 p-1 bg-white shrink-0 overflow-hidden ${
                      selectedImage === img ? 'border-[#F68B1E]' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Share & Wishlist quick actions */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 font-medium transition-colors ${
                    isWishlisted ? 'text-rose-600' : 'hover:text-[#F68B1E]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <div className="flex items-center gap-1 text-stone-400">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Verified Product</span>
                </div>
              </div>
            </div>

            {/* Column 2: Details & Pricing (Col 6-8) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                {/* Official Store Badge & Brand */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-[#F68B1E] uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.isOfficialStore && (
                    <span className="bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>Official Store</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mb-2">
                  {product.name}
                </h1>

                {/* Ratings */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-700">{product.rating}</span>
                  <span className="text-xs text-stone-400">({product.reviewCount} verified reviews)</span>
                </div>

                {/* Pricing Banner */}
                <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20 mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-stone-900">
                      $ {product.price.toLocaleString()} CAD
                    </span>
                    {product.oldPrice > product.price && (
                      <span className="text-sm text-stone-400 line-through">
                        $ {product.oldPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="bg-rose-100 text-rose-700 text-xs font-black px-1.5 py-0.5 rounded">
                      -{product.discountPercent}%
                    </span>
                  </div>
                  {savingsAmount > 0 && (
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      You save ${savingsAmount.toLocaleString()} CAD today
                    </p>
                  )}
                </div>

                {/* Stock indicator */}
                <div className="mb-4">
                  {product.stockCount > 0 ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>In Stock ({product.stockCount} items available)</span>
                    </div>
                  ) : (
                    <span className="text-xs text-rose-600 font-semibold">Currently Out of Stock</span>
                  )}
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-md overflow-hidden bg-white">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-stone-100 disabled:opacity-40 text-stone-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1 text-sm font-bold text-stone-900">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.stockCount}
                      className="p-2 hover:bg-stone-100 disabled:opacity-40 text-stone-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full py-3 bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold text-sm rounded-md shadow-md transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => onBuyNow(product, quantity)}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm rounded-md shadow transition-all active:scale-[0.98] uppercase tracking-wider"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Column 3: Delivery & Returns Sidebar (Col 9-12) */}
            <div className="md:col-span-3 bg-stone-50 rounded-lg p-4 border border-stone-200 text-xs flex flex-col gap-4">
              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <Truck className="w-4 h-4 text-[#F68B1E]" />
                  <span>Delivery & Returns</span>
                </h4>

                {/* State Destination Selector */}
                <div className="mb-2">
                  <label className="text-[11px] text-stone-500 font-medium block mb-1">
                    Deliver To Your State:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStateIndex}
                      onChange={(e) => setSelectedStateIndex(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#F68B1E]"
                    >
                      {NIGERIAN_STATES.map((st, i) => (
                        <option key={st.name} value={i}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Estimated Fee and Delivery Window */}
                <div className="bg-white p-2.5 rounded border border-stone-200 space-y-2 mt-2">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-[#F68B1E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">Jumia Express Delivery</p>
                      <p className="text-stone-500 text-[11px]">Fee: ${currentState.expressFee.toLocaleString()} CAD</p>
                      <p className="text-[#F68B1E] font-semibold text-[10px] mt-0.5">
                        ETA: Delivered in {currentState.deliveryDays}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-stone-100">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-800">Station Pickup Option</p>
                      <p className="text-stone-500 text-[11px]">Fee: ${currentState.standardFee.toLocaleString()} CAD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Policy */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Return Policy</p>
                    <p className="text-stone-600 text-[11px] leading-tight mt-0.5">
                      Free return within 7 days for all genuine kitchen utensils and appliances.
                    </p>
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Warranty</p>
                    <p className="text-stone-600 text-[11px] leading-tight mt-0.5">
                      {product.specifications['Warranty'] || '1 Year Official Manufacturer Warranty'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seller Score */}
              <div className="pt-2 border-t border-stone-200 bg-white p-2.5 rounded border border-stone-200">
                <p className="text-[10px] uppercase font-bold text-stone-400">SELLER INFORMATION</p>
                <p className="font-bold text-stone-900 text-xs mt-0.5">{product.brand} Official Store</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-emerald-600 font-bold">96% Seller Score</span>
                  <span className="text-[10px] text-stone-400">• Quality Verified</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tabs: Description, Key Features, Specs, Reviews */}
          <div className="border-t border-stone-200 pt-6">
            <div className="flex border-b border-stone-200 gap-6 text-sm">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Specifications & In The Box
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Customer Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4">
              {activeTab === 'details' && (
                <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <p>{product.description}</p>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.keyFeatures.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-stone-900 mb-1.5">What is in the box:</h4>
                    <p className="bg-stone-50 p-3 rounded border border-stone-200 text-stone-700">
                      {product.boxContents}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-2">Technical Specifications:</h4>
                    <div className="border border-stone-200 rounded divide-y divide-stone-200 overflow-hidden">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-2 p-2.5 bg-white odd:bg-stone-50">
                          <span className="font-semibold text-stone-600">{key}</span>
                          <span className="text-stone-900">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs sm:text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400 text-xs">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-500 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-stone-300'}`}
                          />
                        ))}
                      </div>
                      <p className="font-semibold text-stone-800 mb-0.5">{rev.title}</p>
                      <p className="text-stone-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
