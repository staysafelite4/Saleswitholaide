import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Check, 
  RotateCcw, 
  Heart, 
  Zap, 
  Sparkles,
  ShoppingBag,
  Store,
  CookingPot,
  Flame,
  X
} from 'lucide-react';
import { JumiaProduct, CartItem, OrderRecord } from '../../types/jumia';
import { 
  INITIAL_JUMIA_PRODUCTS, 
  JUMIA_CATEGORIES, 
  JUMIA_BRANDS 
} from '../../data/jumiaProducts';

import { JumiaTopBar } from './JumiaTopBar';
import { JumiaHeader } from './JumiaHeader';
import { JumiaCategoriesRibbon } from './JumiaCategoriesRibbon';
import { JumiaHeroSection } from './JumiaHeroSection';
import { JumiaFlashSalesBar } from './JumiaFlashSalesBar';
import { JumiaProductCard } from './JumiaProductCard';
import { JumiaProductDetailModal } from './JumiaProductDetailModal';
import { JumiaCartDrawer } from './JumiaCartDrawer';
import { JumiaCheckoutModal } from './JumiaCheckoutModal';
import { JumiaSellerModal } from './JumiaSellerModal';
import { JumiaFooter } from './JumiaFooter';

export const JumiaStore: React.FC = () => {
  // Products state (can be modified by Seller CMS)
  const [products, setProducts] = useState<JumiaProduct[]>(INITIAL_JUMIA_PRODUCTS);
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [expressOnly, setExpressOnly] = useState(false);
  const [flashSaleOnly, setFlashSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price_low' | 'price_high' | 'rating'>('popularity');
  const [maxPrice, setMaxPrice] = useState(100000);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    // Seed initial cart item so user immediately sees how it works
    { product: INITIAL_JUMIA_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['jp-2']);

  // Modals state
  const [activeProduct, setActiveProduct] = useState<JumiaProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Voucher discount
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // Orders placed in this session
  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      orderId: 'JUM-918234',
      date: '28 Oct 2026',
      customerName: 'Amina Lawal',
      phoneNumber: '08123456789',
      state: 'Lagos',
      lga: 'Lekki / Victoria Island',
      deliveryAddress: 'Block 3, Admiralty Way, Lekki Phase 1',
      items: [
        {
          productId: 'jp-2',
          productName: 'Silver Crest 2L Heavy Duty Blender',
          quantity: 1,
          price: 36900,
          image: '/src/assets/images/jumia_heavy_blender_1793198721640.jpg'
        }
      ],
      subtotal: 36900,
      deliveryFee: 1200,
      discount: 0,
      total: 38100,
      deliveryType: 'door_delivery',
      paymentMethod: 'pay_on_delivery',
      status: 'Confirmed'
    }
  ]);

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: JumiaProduct, quantity: number = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 32)}..." to Cart!`);
  };

  const handleBuyNow = (product: JumiaProduct, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setActiveProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from saved wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Item saved to your Wishlist!');
        return [...prev, productId];
      }
    });
  };

  // Voucher apply
  const handleApplyVoucher = (code: string): boolean => {
    if (code.toUpperCase() === 'JUMIAKITCHEN') {
      setVoucherCode('JUMIAKITCHEN');
      setVoucherDiscount(1500);
      showToast('₦1,500 Voucher Applied Successfully!');
      return true;
    }
    return false;
  };

  // Complete Order
  const handleCompleteOrder = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    showToast(`Order ${newOrder.orderId} placed successfully!`);
  };

  // Product mutations from Seller Center
  const handleAddProduct = (newProd: JumiaProduct) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`New utensil "${newProd.name.slice(0, 25)}..." published!`);
  };

  const handleUpdateProduct = (updated: JumiaProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast('Product settings updated.');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from inventory.');
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesBrand = prod.brand.toLowerCase().includes(q);
        const matchesCat = prod.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'All Brands' && prod.brand !== selectedBrand) {
        return false;
      }

      // Express Only
      if (expressOnly && !prod.isExpress) {
        return false;
      }

      // Flash Sale Only
      if (flashSaleOnly && !prod.isFlashSale) {
        return false;
      }

      // Price
      if (prod.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.soldCount - a.soldCount; // Popularity default
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, expressOnly, flashSaleOnly, maxPrice, sortBy]);

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F1F1F2] text-stone-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-stone-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-[#F68B1E]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. Jumia Top Utility Bar */}
      <JumiaTopBar
        onOpenSellerModal={() => setIsSellerOpen(true)}
        onOpenTrackOrders={() => setIsOrdersModalOpen(true)}
      />

      {/* 2. Main Jumia Header with Logo, Search, Cart, Account */}
      <JumiaHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onOpenSeller={() => setIsSellerOpen(true)}
        onSelectProduct={(p) => setActiveProduct(p)}
        products={products}
      />

      {/* 3. Categories Quick-Filter Ribbon */}
      <JumiaCategoriesRibbon
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setFlashSaleOnly(false);
        }}
        expressOnly={expressOnly}
        onToggleExpressOnly={() => setExpressOnly(!expressOnly)}
        flashSaleOnly={flashSaleOnly}
        onToggleFlashSaleOnly={() => setFlashSaleOnly(!flashSaleOnly)}
      />

      {/* 4. Hero Carousel & Service Cards (shown on primary view) */}
      {!searchQuery && selectedCategory === 'all' && !flashSaleOnly && (
        <JumiaHeroSection
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onOpenSeller={() => setIsSellerOpen(true)}
          onOpenFlashSales={() => setFlashSaleOnly(true)}
        />
      )}

      {/* 5. Flash Sales Banner & Rail */}
      {!searchQuery && selectedCategory === 'all' && (
        <JumiaFlashSalesBar
          products={products}
          onSelectProduct={(p) => setActiveProduct(p)}
          onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
        />
      )}

      {/* 6. Visual Category Circles (Jumia Signature) */}
      {!searchQuery && selectedCategory === 'all' && !flashSaleOnly && (
        <div className="max-w-7xl mx-auto px-4 my-4 w-full">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-700 mb-3 flex items-center justify-between">
              <span>Popular Kitchen Categories</span>
              <span className="text-[#F68B1E] text-[11px] font-bold cursor-pointer hover:underline">
                View All Departments
              </span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
              {[
                { name: 'Pots & Pans', cat: 'Cookware & Pots', img: '/src/assets/images/jumia_cookware_set_1793198721213.jpg' },
                { name: 'Blenders & Mixers', cat: 'Small Appliances', img: '/src/assets/images/jumia_heavy_blender_1793198721640.jpg' },
                { name: 'Air Fryers', cat: 'Small Appliances', img: '/src/assets/images/jumia_air_fryer_1793198740159.jpg' },
                { name: 'Yam Pounders', cat: 'Small Appliances', img: '/src/assets/images/jumia_yam_pounder_1793198754143.jpg' },
                { name: 'Dish Racks', cat: 'Kitchen Organization', img: '/src/assets/images/jumia_dish_rack_1793198739810.jpg' },
                { name: 'Food Flasks', cat: 'Food Storage', img: '/src/assets/images/jumia_food_flask_1793198755457.jpg' }
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCategory(item.cat)}
                  className="p-2 rounded-lg hover:bg-amber-50/60 cursor-pointer transition-all border border-transparent hover:border-amber-200 group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center p-2 mb-2 group-hover:scale-110 transition-transform">
                    <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-800 group-hover:text-[#F68B1E] leading-tight block truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Main Product Catalog & Filter Layout */}
      <main className="max-w-7xl mx-auto px-4 py-4 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-stone-900">
                  <Filter className="w-4 h-4 text-[#F68B1E]" />
                  <span>Filter Products</span>
                </div>
                {(selectedCategory !== 'all' || selectedBrand !== 'All Brands' || expressOnly || flashSaleOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBrand('All Brands');
                      setExpressOnly(false);
                      setFlashSaleOnly(false);
                      setSearchQuery('');
                      setMaxPrice(100000);
                    }}
                    className="text-[11px] text-[#F68B1E] hover:underline font-semibold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Express Filter Switch */}
              <div className="py-3 border-b border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={expressOnly}
                    onChange={(e) => setExpressOnly(e.target.checked)}
                    className="rounded text-[#F68B1E] focus:ring-[#F68B1E] w-4 h-4"
                  />
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#F68B1E] fill-[#F68B1E]" />
                    <span>Jumia Express Only (24H)</span>
                  </div>
                </label>
              </div>

              {/* Brand Filter */}
              <div className="py-3 border-b border-stone-100">
                <h4 className="font-bold text-xs uppercase tracking-wide text-stone-700 mb-2">
                  Brand
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                  {JUMIA_BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900">
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="text-[#F68B1E] focus:ring-[#F68B1E]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="py-3 border-b border-stone-100">
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Max Price:</span>
                  <span className="text-[#F68B1E] font-bold">₦{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={100000}
                  step={2000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#F68B1E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>₦10,000</span>
                  <span>₦100,000</span>
                </div>
              </div>

              {/* Express Delivery Guarantee Card */}
              <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Free Door Delivery Available</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Orders above ₦50,000 qualify for free express shipping within Lagos.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Toolbar (Results count & Sort dropdown) */}
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-stone-900 uppercase">
                  {flashSaleOnly ? '🔥 Flash Sale Kitchen Deals' : selectedCategory === 'all' ? 'All Kitchen Utensils & Appliances' : selectedCategory}
                </span>
                <span className="text-stone-500">
                  ({filteredProducts.length} items found)
                </span>
              </div>

              {/* Sort By Select */}
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#F68B1E] bg-white cursor-pointer"
                >
                  <option value="popularity">Popularity (Most Sold)</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Product Rating</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-stone-200 p-12 text-center text-stone-500">
                <CookingPot className="w-16 h-16 text-stone-300 mx-auto mb-3" />
                <h3 className="font-bold text-stone-800 text-lg">No utensils found</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Try adjusting your search keywords, price filter, or selected brand.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('All Brands');
                    setSearchQuery('');
                    setMaxPrice(100000);
                  }}
                  className="px-5 py-2 bg-[#F68B1E] text-white font-bold rounded text-xs uppercase"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <JumiaProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectProduct={(p) => setActiveProduct(p)}
                    onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 8. Jumia Official Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 my-6 w-full">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
            OFFICIAL KITCHENWARE BRAND STORES
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-stone-700">
            {['Dessini Imperial', 'Silver Crest', 'Master Chef', 'Scanfrost', 'Binatone', 'Tefal', 'LuxeTherm'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className="px-3 py-1.5 bg-stone-50 hover:bg-amber-50 hover:text-[#F68B1E] rounded border border-stone-200 transition-colors"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 9. Jumia Footer */}
      <JumiaFooter />

      {/* Modals & Drawers */}
      
      {/* Product Detail Modal */}
      <JumiaProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        isWishlisted={activeProduct ? wishlist.includes(activeProduct.id) : false}
        onToggleWishlist={(id) => handleToggleWishlist(id)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
      />

      {/* Cart Drawer */}
      <JumiaCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        voucherCode={voucherCode}
        onApplyVoucher={handleApplyVoucher}
        voucherDiscount={voucherDiscount}
      />

      {/* Checkout Modal */}
      <JumiaCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        voucherDiscount={voucherDiscount}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Seller Center & Inventory CMS Modal */}
      <JumiaSellerModal
        isOpen={isSellerOpen}
        onClose={() => setIsSellerOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
      />

      {/* Wishlist Modal */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-bold text-stone-900 text-sm">Saved Kitchen Items ({wishlist.length})</h3>
              </div>
              <button onClick={() => setIsWishlistModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {wishlist.length === 0 ? (
                <p className="text-center py-8 text-stone-400 text-xs">No saved items yet.</p>
              ) : (
                products.filter(p => wishlist.includes(p.id)).map(prod => (
                  <div key={prod.id} className="p-2.5 bg-stone-50 rounded border border-stone-200 flex items-center justify-between gap-3 text-xs">
                    <img src={prod.image} alt={prod.name} className="w-12 h-12 object-contain bg-white rounded p-0.5 border" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 truncate">{prod.name}</p>
                      <p className="text-[#F68B1E] font-bold">₦{prod.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(prod, 1);
                        setIsWishlistModalOpen(false);
                      }}
                      className="px-3 py-1 bg-[#F68B1E] text-white font-bold rounded text-[11px] uppercase"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orders Tracking Modal */}
      {isOrdersModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#F68B1E]" />
                <h3 className="font-bold text-stone-900 text-sm">My Orders & Courier Tracking</h3>
              </div>
              <button onClick={() => setIsOrdersModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {orders.map(ord => (
                <div key={ord.orderId} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="font-mono text-stone-900">{ord.orderId}</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">{ord.status}</span>
                  </div>
                  <p className="text-stone-600">Delivering to: {ord.deliveryAddress}, {ord.state}</p>
                  <p className="text-[#F68B1E] font-bold">Total: ₦{ord.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
