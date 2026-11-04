import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  HelpCircle, 
  ChevronDown, 
  Package, 
  MessageCircle,
  Truck,
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';
import { JumiaProduct } from '../../types/jumia';

interface JumiaHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenSeller: () => void;
  onSelectProduct: (product: JumiaProduct) => void;
  products: JumiaProduct[];
}

export const JumiaHeader: React.FC<JumiaHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenSeller,
  onSelectProduct,
  products
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsHelpOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for search autocomplete preview
  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const popularSearches = [
    'Granite pots', 
    'Commercial blender', 
    'Digital air fryer', 
    'Yam pounder', 
    'Dish rack', 
    'Thermal flask', 
    'Chef knife set'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Jumia Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
                JUMIA
              </span>
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F68B1E] flex items-center justify-center text-white shadow-sm font-bold text-xs">
                ★
              </span>
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#F68B1E] uppercase -mt-1">
              KITCHEN & UTENSILS
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl">
          <div className="flex items-center border-2 border-stone-300 focus-within:border-[#F68B1E] rounded-md overflow-hidden bg-white shadow-inner transition-colors">
            <div className="pl-3 text-stone-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products, brands and categories (e.g. pressure cooker, non-stick pot)..."
              className="w-full py-2 px-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 text-stone-400 hover:text-stone-600 mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => setIsSearchFocused(false)}
              className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 transition-colors uppercase tracking-wider shrink-0"
            >
              SEARCH
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-xl border border-stone-200 z-50 overflow-hidden text-xs sm:text-sm">
              {searchQuery.trim() ? (
                <div>
                  <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 text-stone-500 font-medium">
                    Matching Products ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onSelectProduct(product);
                            setIsSearchFocused(false);
                          }}
                          className="p-2.5 hover:bg-amber-50 cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded border border-stone-200 bg-white p-0.5 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-stone-900 truncate">{product.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-bold text-[#F68B1E]">₦{product.price.toLocaleString()}</span>
                              <span className="text-[11px] text-stone-400 line-through">₦{product.oldPrice.toLocaleString()}</span>
                              <span className="text-[10px] bg-amber-100 text-[#F68B1E] font-bold px-1 rounded">-{product.discountPercent}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-stone-500">
                      No kitchen products found matching &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Popular Kitchen Searches
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          onSearchChange(term);
                          setIsSearchFocused(false);
                        }}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-[#F68B1E]/10 hover:text-[#F68B1E] rounded text-stone-700 transition-colors text-xs"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          {/* Account Dropdown */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => {
                setIsAccountOpen(!isAccountOpen);
                setIsHelpOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-stone-100 text-stone-700 transition-colors text-xs sm:text-sm font-medium"
            >
              <User className="w-5 h-5 text-stone-600" />
              <span className="hidden md:inline">Account</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-md shadow-xl border border-stone-200 py-2 z-50 text-xs sm:text-sm">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="font-semibold text-stone-900">Welcome to Jumia Kitchen</p>
                  <p className="text-xs text-stone-500">Track orders & manage saved utensils</p>
                </div>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    onOpenOrders();
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                >
                  <Package className="w-4 h-4 text-[#F68B1E]" />
                  <span>My Orders & Delivery Status</span>
                </button>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    onOpenWishlist();
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Saved Items ({wishlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    onOpenSeller();
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-[#F68B1E] font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Store Admin & Vendor CMS</span>
                </button>
              </div>
            )}
          </div>

          {/* Help Dropdown */}
          <div ref={helpRef} className="relative">
            <button
              onClick={() => {
                setIsHelpOpen(!isHelpOpen);
                setIsAccountOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-stone-100 text-stone-700 transition-colors text-xs sm:text-sm font-medium"
            >
              <HelpCircle className="w-5 h-5 text-stone-600" />
              <span className="hidden md:inline">Help</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {isHelpOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-md shadow-xl border border-stone-200 py-2 z-50 text-xs sm:text-sm">
                <div className="px-4 py-2 border-b border-stone-100 font-semibold text-stone-900">
                  Help Center
                </div>
                <a
                  href="https://wa.me/2348030795206?text=Hello%20Customer%20Care%2C%20I%20need%20help%20with%20an%20order"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat with Customer Care</span>
                </a>
                <button
                  onClick={() => {
                    setIsHelpOpen(false);
                    alert('Jumia Express delivery delivers in 24 hours within Lagos and 2-3 days for Abuja and other states.');
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                >
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Delivery Timelines & Rates</span>
                </button>
                <button
                  onClick={() => {
                    setIsHelpOpen(false);
                    alert('Enjoy 7-day hassle-free returns on all genuine kitchenware items.');
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                >
                  <RotateCcw className="w-4 h-4 text-purple-600" />
                  <span>7-Day Return & Refund Policy</span>
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded hover:bg-stone-100 text-stone-700 transition-colors"
            title="Saved Items"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-stone-100 hover:bg-[#F68B1E]/10 hover:text-[#F68B1E] px-3 py-2 rounded-md transition-all text-stone-900 group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-stone-800 group-hover:text-[#F68B1E] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F68B1E] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs sm:text-sm font-bold">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
