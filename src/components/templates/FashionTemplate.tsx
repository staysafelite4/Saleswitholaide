import React, { useState, useMemo } from 'react';
import { FashionProvider, useFashion } from '../../context/FashionContext';
import { FashionAdmin } from './FashionAdmin';
import { Garment } from '../../types/fashion';
import {
  FASHION_SIZE_GUIDE,
  FASHION_PRESS_QUOTES
} from '../../data/initialFashionData';
import {
  ShoppingBag,
  Settings,
  MessageCircle,
  X,
  Check,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Eye,
  Ruler,
  HelpCircle,
  Truck,
  Heart,
  Search,
  SlidersHorizontal
} from 'lucide-react';

const FashionInner: React.FC = () => {
  const {
    config,
    garments,
    bag,
    bagCount,
    bagSubtotal,
    selectedShippingTier,
    setSelectedShippingTier,
    bagShippingFee,
    bagTotal,
    isBagOpen,
    setIsBagOpen,
    setIsAdminOpen,
    selectedGarmentForModal,
    setSelectedGarmentForModal,
    isFittingModalOpen,
    setIsFittingModalOpen,
    isSizeGuideOpen,
    setIsSizeGuideOpen,
    addToBag,
    removeFromBag,
    updateBagQuantity,
    clearBag,
    submitBoutiqueOrder,
    submitFittingBooking,
    formatCurrency
  } = useFashion();

  // Active category filter & search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'name'>('featured');

  // Garment card selections (size & color per garment ID)
  const [cardSelectedSizes, setCardSelectedSizes] = useState<Record<string, string>>({});
  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, string>>({});

  // Checkout form in Bag
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPayment, setClientPayment] = useState('Instant Bank Transfer');
  const [clientNotes, setClientNotes] = useState('');
  const [clientGiftNote, setClientGiftNote] = useState('');
  const [showGiftOption, setShowGiftOption] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ id: string; url: string } | null>(null);

  // Private Fitting Booking Form
  const [fitName, setFitName] = useState('');
  const [fitPhone, setFitPhone] = useState('');
  const [fitEmail, setFitEmail] = useState('');
  const [fitDate, setFitDate] = useState('');
  const [fitTime, setFitTime] = useState('14:00 PM');
  const [fitType, setFitType] = useState<'in_atelier' | 'virtual_concierge'>('in_atelier');
  const [fitSelectedGarments, setFitSelectedGarments] = useState<string[]>([]);
  const [fitNotes, setFitNotes] = useState('');
  const [fitSuccess, setFitSuccess] = useState<{ id: string; url: string } | null>(null);

  // Promo Banner dismiss state
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Filtered and sorted garments
  const filteredGarments = useMemo(() => {
    return garments
      .filter((g) => {
        if (selectedCategory !== 'all' && g.category !== selectedCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            g.name.toLowerCase().includes(q) ||
            g.tagline.toLowerCase().includes(q) ||
            g.fabric.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [garments, selectedCategory, searchQuery, sortBy]);

  const handleSelectCardSize = (id: string, size: string) => {
    setCardSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleSelectCardColor = (id: string, color: string) => {
    setCardSelectedColors((prev) => ({ ...prev, [id]: color }));
  };

  const handleAddToCart = (g: Garment) => {
    const size = cardSelectedSizes[g.id] || g.sizes[0] || 'Standard';
    const color = cardSelectedColors[g.id] || (g.colors[0] ? g.colors[0].name : 'Default');
    addToBag(g, size, color, 1);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const res = submitBoutiqueOrder({
      name: clientName,
      phone: clientPhone,
      address: clientAddress || 'Lagos Courier Delivery',
      payment: clientPayment,
      notes: clientNotes,
      giftNote: showGiftOption ? clientGiftNote : undefined
    });

    setOrderSuccess({ id: res.orderId, url: res.whatsappUrl });
    window.open(res.whatsappUrl, '_blank');
  };

  const handleFittingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fitName.trim() || !fitPhone.trim() || !fitDate) return;

    const res = submitFittingBooking({
      clientName: fitName,
      clientPhone: fitPhone,
      email: fitEmail,
      preferredDate: fitDate,
      preferredTime: fitTime,
      fittingType: fitType,
      garmentInterests: fitSelectedGarments,
      measurementsNotes: fitNotes
    });

    setFitSuccess({ id: res.bookingId, url: res.whatsappUrl });
    window.open(res.whatsappUrl, '_blank');
  };

  const banner = config.promoBanner;

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen selection:bg-stone-900 selection:text-white font-sans">
      {/* 1. TOP PROMOTIONAL BANNER */}
      {banner.enabled && !bannerDismissed && (
        <aside
          aria-label="Promotion"
          className="bg-stone-950 text-stone-200 px-4 py-2 text-xs border-b border-stone-800 transition-all"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 text-center font-medium">
              {banner.badgeText && (
                <span className="font-bold uppercase tracking-widest text-[10px] text-amber-200 mr-2">
                  {banner.badgeText} ·
                </span>
              )}
              <span>{banner.text}</span>
              {banner.linkText && (
                <a
                  href={banner.linkUrl || '#collection'}
                  className="underline hover:text-white ml-2 font-semibold transition-colors"
                >
                  {banner.linkText} →
                </a>
              )}
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss announcement banner"
              className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* 2. STICKY ATELIER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-[0.2em] text-stone-950">
                {config.brandName}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 -mt-1">
                Lekki Showroom · Savile Tailoring
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-stone-600">
            <a href="#collection" className="hover:text-stone-950 transition-colors">Lookbook</a>
            <a href="#craft" className="hover:text-stone-950 transition-colors">The Craft</a>
            <a href="#fittings" className="hover:text-stone-950 transition-colors">Private Fittings</a>
            <a href="#press" className="hover:text-stone-950 transition-colors">Press</a>
            <a href="#atelier" className="hover:text-stone-950 transition-colors">Atelier Visit</a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-950 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Chart</span>
            </button>

            <button
              onClick={() => setIsFittingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-900 border border-stone-300 hover:border-stone-950 rounded-lg hover:bg-stone-100 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Fitting</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-stone-950 hover:bg-stone-800 rounded-lg text-white transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Bag</span>
              {bagCount > 0 && (
                <span className="font-mono text-[11px] font-bold bg-white text-stone-950 px-1.5 py-0.2 rounded-full tabular-nums">
                  {bagCount}
                </span>
              )}
            </button>

            {/* Atelier Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 rounded-lg transition-colors"
              title="Atelier CMS Dashboard"
            >
              <Settings className="w-3.5 h-3.5 text-stone-700" />
              <span className="hidden sm:inline">Atelier CMS</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO EDITORIAL SHOWCASE */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-stone-200/80 bg-gradient-to-b from-[#F7F3EE] to-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200/70 border border-stone-300/80 rounded-full text-[11px] font-semibold text-stone-800 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Resort & Evening Capsule 2026 · Handcrafted in Lekki</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-950 tracking-tight leading-[1.12]">
              Tactile Silks, Unstructured Linens & Quiet Luxury.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Meticulously tailored silhouettes in heavyweight 22-momme pure mulberry silk, organic Belgian flax linen, and brushed cotton twill. Made with Savile Row precision in our Lagos atelier.
            </p>

            {/* Quick Guarantees */}
            <div className="pt-1 grid grid-cols-3 gap-3 border-y border-stone-200/80 py-4 max-w-xl text-stone-700">
              <div>
                <p className="font-serif font-bold text-base text-stone-950">100% Pure</p>
                <p className="text-[11px] text-stone-500">Natural Luxury Fibers</p>
              </div>
              <div>
                <p className="font-serif font-bold text-base text-stone-950">Bespoke Fit</p>
                <p className="text-[11px] text-stone-500">Complimentary Alterations</p>
              </div>
              <div>
                <p className="font-serif font-bold text-base text-stone-950">Express Global</p>
                <p className="text-[11px] text-stone-500">DHL 3-5 Days Worldwide</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#collection"
                className="px-6 py-3.5 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-all shadow-md flex items-center gap-2"
              >
                <span>Explore Lookbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsFittingModalOpen(true)}
                className="px-5 py-3.5 text-xs font-semibold text-stone-900 bg-stone-200/80 hover:bg-stone-300 rounded-lg transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-stone-700" />
                <span>Book Atelier Fitting</span>
              </button>

              <a
                href={`https://wa.me/${(config.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent('Hello AURA Atelier concierge, I would like personal styling guidance on your new collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Stylist</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xl bg-stone-200 aspect-[3/4] max-h-[520px]">
              <img
                src="/src/assets/images/fashion_silk_dress_1793192812492.jpg"
                alt="AURA Atelier Luxury Silk Slip Dress"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200 font-bold">Featured Signature Piece</span>
                <h2 className="text-xl font-serif font-bold text-white mt-0.5">Architectural Champagne Silk Slip Dress</h2>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                  <span className="font-mono text-base font-bold text-white">{formatCurrency(48000)}</span>
                  <a
                    href="#collection"
                    className="text-xs font-semibold underline text-stone-200 hover:text-white"
                  >
                    View in Lookbook →
                  </a>
                </div>
              </div>
            </div>

            {/* Atelier Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-lg hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-950 text-white flex items-center justify-center font-bold">
                <Scissors className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-serif font-bold text-stone-950">Lekki Atelier</p>
                <p className="text-[11px] text-stone-500">Private fitting suites open</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED LOOKBOOK SHOWCASE GRID */}
      <section id="collection" className="py-20 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Section Header with Category Tabs */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block">Curated Wardrobe</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">Lookbook Showcase</h2>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                Complimentary express shipping across Lagos above {formatCurrency(config.freeShippingThreshold)}
              </div>
            </div>

            {/* Filter and Search Bar Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
                {[
                  { id: 'all', label: 'All Garments' },
                  { id: 'dresses', label: 'Silk Dresses' },
                  { id: 'linens', label: 'Belgian Linens' },
                  { id: 'trousers', label: 'Tailored Trousers' },
                  { id: 'coats', label: 'Outerwear & Coats' },
                  { id: 'silks', label: 'Tops & Silks' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                      selectedCategory === tab.id
                        ? 'bg-stone-950 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search silk, linen, trench..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-950"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:border-stone-950"
                >
                  <option value="featured">Featured First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Garments Grid */}
          {filteredGarments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
              <p className="font-serif font-bold text-stone-900 text-lg">No garments found in this category.</p>
              <p className="text-xs text-stone-500">Try adjusting your category filter or clearing the search term.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-stone-950 text-white rounded-lg text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGarments.map((g) => {
                const currentSize = cardSelectedSizes[g.id] || g.sizes[0] || 'Standard';
                const currentColor =
                  cardSelectedColors[g.id] || (g.colors[0] ? g.colors[0].name : 'Default');

                return (
                  <div
                    key={g.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedGarmentForModal(g)}>
                        <img
                          src={g.image}
                          alt={g.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-stone-900 shadow-xs">
                            {g.fabric}
                          </span>
                          {g.availability === 'low_stock' && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Low Stock · Few Left
                            </span>
                          )}
                          {g.availability === 'pre_order' && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-stone-900 text-white">
                              Pre-Order (14 Days)
                            </span>
                          )}
                        </div>

                        {/* Quick View Button on Hover */}
                        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGarmentForModal(g);
                            }}
                            className="px-4 py-2 bg-white/95 backdrop-blur-xs text-stone-950 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Editorial Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                            <span className="capitalize">{g.category}</span>
                            <span className="font-mono text-[11px] capitalize text-stone-700">
                              {g.availability.replace('_', ' ')}
                            </span>
                          </div>
                          <h3
                            onClick={() => setSelectedGarmentForModal(g)}
                            className="font-serif font-bold text-lg text-stone-950 hover:text-stone-700 cursor-pointer transition-colors"
                          >
                            {g.name}
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                            {g.tagline}
                          </p>
                        </div>

                        {/* Color Swatch Picker */}
                        {g.colors && g.colors.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-stone-400 font-semibold uppercase tracking-wider">Color:</span>
                              <span className="font-medium text-stone-800">{currentColor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {g.colors.map((c) => (
                                <button
                                  key={c.name}
                                  onClick={() => handleSelectCardColor(g.id, c.name)}
                                  title={c.name}
                                  style={{ backgroundColor: c.hex }}
                                  className={`w-5 h-5 rounded-full border transition-transform ${
                                    currentColor === c.name
                                      ? 'scale-125 border-stone-950 ring-2 ring-stone-950/20 shadow-xs'
                                      : 'border-stone-300 hover:scale-110'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Size Selector */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-400 font-semibold uppercase tracking-wider">Select Size:</span>
                            <button
                              onClick={() => setIsSizeGuideOpen(true)}
                              className="text-stone-500 hover:text-stone-950 underline font-medium"
                            >
                              Size Guide
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {g.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSelectCardSize(g.id, s)}
                                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                                  currentSize === s
                                    ? 'bg-stone-950 text-white border-stone-950 font-bold'
                                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-lg font-bold text-stone-950">
                            {formatCurrency(g.price)}
                          </span>
                          {g.compareAtPrice && g.compareAtPrice > g.price && (
                            <span className="font-mono text-xs line-through text-stone-400">
                              {formatCurrency(g.compareAtPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono block">Complimentary custom hem</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(g)}
                        className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. THE CRAFT & FABRIC PHILOSOPHY SECTION */}
      <section id="craft" className="py-20 border-b border-stone-200/80 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">The Atelier Standard</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
              The Art of Slowness & Pure Fibers
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              In a world of mass synthetic production, AURA honors the meditative patience of authentic natural fibers, master hand-tailoring, and zero fabric waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-200/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold">
                22M
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-950">22-Momme Mulberry Silk</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Woven from the continuous natural filament fibers of pure cultivated mulberry silk. Double-faced for opacity and lustrous drape, breathable on the skin in high-humidity climates.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                • Tested for non-toxic vegetal dyes<br />
                • Natural thermal regulation
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 border border-stone-200 flex items-center justify-center font-bold">
                100%
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-950">Belgian Flax Linen</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sourced from certified European flax farmers. Pre-washed with volcanic pumice minerals to relax the weave, delivering tactile softness without sacrificing the crisp structure of the silhouette.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                • Zero irrigation required to grow<br />
                • Softens with every washing cycle
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-950 text-white flex items-center justify-center font-bold">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-950">Savile Row Construction</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hand-cut on the true 45-degree bias by senior pattern makers in our Lekki atelier. Every seam is finished with French or bound Hong Kong finishes with genuine buffalo horn and mother-of-pearl buttons.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                • Internal reinforcements on stress points<br />
                • Lifetime complimentary seam repairs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRIVATE ATELIER FITTING BOOKING SECTION */}
      <section id="fittings" className="py-20 border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Bespoke Experience</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 leading-tight">
              Book a Private Atelier Fitting in Lekki
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Step into our serene Lekki Phase 1 salon suite. Enjoy chilled champagne or artisanal botanical teas while our resident master stylist takes your precise measurements and tailors pieces to your exact proportions.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>1-on-1 dedicated stylist session with our creative director</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Access to exclusive archive fabric swatches & bespoke colorways</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complimentary custom hem adjustments and sleeve tailoring</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center gap-3">
              <MapPin className="w-5 h-5 text-stone-800 shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-950">AURA Lekki Showroom</p>
                <p className="text-stone-500">{config.atelierAddress}</p>
              </div>
            </div>
          </div>

          {/* Interactive Booking Card */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl">
            {fitSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-950">Fitting Request Dispatched!</h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Your appointment request (#{fitSuccess.id}) has been forwarded to our WhatsApp concierge. Our styling team will confirm your preferred time slot immediately.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={fitSuccess.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setFitSuccess(null);
                      setFitName('');
                      setFitPhone('');
                      setFitDate('');
                    }}
                    className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFittingSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-serif font-bold text-base text-stone-950">Schedule Your Private Appointment</h3>
                  <span className="font-mono text-[10px] text-stone-500 uppercase">Complimentary Concierge</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Adeleke"
                      value={fitName}
                      onChange={(e) => setFitName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 123 4567"
                      value={fitPhone}
                      onChange={(e) => setFitPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-stone-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={fitDate}
                      onChange={(e) => setFitDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Time *</label>
                    <select
                      value={fitTime}
                      onChange={(e) => setFitTime(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    >
                      <option value="11:00 AM">11:00 AM - Morning Salon</option>
                      <option value="13:00 PM">1:00 PM - Afternoon Tea</option>
                      <option value="15:00 PM">3:00 PM - Golden Hour Fitting</option>
                      <option value="17:00 PM">5:00 PM - Evening Champagne</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Experience Type</label>
                    <select
                      value={fitType}
                      onChange={(e) => setFitType(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    >
                      <option value="in_atelier">In Lekki Atelier</option>
                      <option value="virtual_concierge">Virtual Video Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Garments You Would Like Ready in Your Dressing Suite
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 bg-white rounded-lg border border-stone-200">
                    {garments.map((g) => (
                      <label key={g.id} className="flex items-center gap-2 cursor-pointer text-[11px] text-stone-800">
                        <input
                          type="checkbox"
                          checked={fitSelectedGarments.includes(g.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFitSelectedGarments((prev) => [...prev, g.name]);
                            } else {
                              setFitSelectedGarments((prev) => prev.filter((name) => name !== g.name));
                            }
                          }}
                          className="rounded text-stone-950 focus:ring-0"
                        />
                        <span className="truncate">{g.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Special Sizing Notes or Occasion (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Attending an Ikoyi art gallery gala; looking for custom length for 5'10 height..."
                    value={fitNotes}
                    onChange={(e) => setFitNotes(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Reserve Appointment via WhatsApp Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. PRESS & EDITORIAL QUOTES */}
      <section id="press" className="py-16 border-b border-stone-200/80 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Editorial Acclaim</span>
            <h2 className="text-2xl font-serif font-bold text-stone-950">In the International Press</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FASHION_PRESS_QUOTES.map((press, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
                <p className="font-serif italic text-stone-800 text-sm leading-relaxed">
                  "{press.quote}"
                </p>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span className="font-bold text-stone-950 uppercase tracking-wider">{press.publication}</span>
                  <span className="font-mono">{press.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ATELIER LOCATION & GLOBAL SHIPPING MATRIX */}
      <section id="atelier" className="py-20 border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Flagship Showroom</span>
            <h2 className="text-3xl font-serif font-bold text-stone-950">Visit Our Lagos Atelier</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Experience the tactile weight of each garment in person. Our Lekki Phase 1 studio showcases current capsule pieces alongside archived couture silhouettes and textile swatches.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <MapPin className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-950 text-sm">Physical Address</p>
                  <p className="text-stone-600 mt-0.5">{config.atelierAddress}</p>
                  <p className="text-stone-400 mt-1">Valet parking available for all clients</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <Clock className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-950 text-sm">Concierge & Fitting Hours</p>
                  <p className="text-stone-600 mt-0.5">Monday to Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-stone-600">Sunday: Private VIP Appointments Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Worldwide Fulfillment</span>
            <h2 className="text-3xl font-serif font-bold text-stone-950">Courier Delivery Tiers</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every parcel is sealed in acid-free archival tissue, placed in an embossed cotton garment bag, and tracked in real-time.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-950">Lagos Island & Mainland Express</p>
                  <p className="text-stone-500">Same-day or next-day courier delivery</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-stone-950">{formatCurrency(config.baseShippingFee)}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">FREE above {formatCurrency(config.freeShippingThreshold)}</p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-950">Nationwide Priority Courier</p>
                  <p className="text-stone-500">Abuja, Port Harcourt, Ibadan, Enugu (48-72 hrs)</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-stone-950">{formatCurrency(config.nationwideShippingFee || 4500)}</p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-950">International DHL Express</p>
                  <p className="text-stone-500">UK, USA, Canada, UAE, Europe (3-5 business days)</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-stone-950">{formatCurrency(config.internationalShippingFee || 18000)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-stone-950 text-stone-300 py-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-serif font-bold uppercase tracking-[0.2em] text-white block">
              {config.brandName}
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              Tactile silks, unstructured linens, and quiet luxury tailoring. Handcrafted with reverence for natural fibers in Lagos, Nigeria.
            </p>
            <div className="pt-2 flex items-center gap-4 text-stone-400">
              <span className="font-mono text-[11px]">WhatsApp Concierge: {config.contactPhone}</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider font-mono text-[11px] block">Atelier Navigation</span>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#collection" className="hover:text-white transition-colors">Lookbook Collection</a></li>
              <li><a href="#craft" className="hover:text-white transition-colors">Textiles & Craftsmanship</a></li>
              <li><a href="#fittings" className="hover:text-white transition-colors">Book Private Salon Fitting</a></li>
              <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">Size Guide & Measurements</button></li>
              <li><button onClick={() => setIsAdminOpen(true)} className="text-amber-300 hover:text-white transition-colors">Atelier Admin CMS</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider font-mono text-[11px] block">Showroom Concierge</span>
            <p className="text-stone-400">{config.atelierAddress}</p>
            <p className="text-stone-400">Email: {config.contactEmail}</p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${(config.whatsappNumber || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat with Stylist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 mt-12 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <p>© 2026 {config.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-semibold">Developed by dev. Emmanuel Kehinde</span>
            <span>·</span>
            <span>0% Commission · Direct WhatsApp Orders</span>
          </div>
        </div>
      </footer>

      {/* 10. MODAL: EDITORIAL GARMENT QUICK VIEW */}
      {selectedGarmentForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-3xl w-full overflow-hidden text-stone-900 my-auto animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Photo Frame */}
              <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                <img
                  src={selectedGarmentForModal.image}
                  alt={selectedGarmentForModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 text-stone-900">
                    {selectedGarmentForModal.fabric}
                  </span>
                </div>
              </div>

              {/* Details & Action */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-xs uppercase font-semibold text-stone-400 tracking-wider">
                      {selectedGarmentForModal.category}
                    </span>
                    <button
                      onClick={() => setSelectedGarmentForModal(null)}
                      className="p-1 text-stone-400 hover:text-stone-950 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mt-3">
                    {selectedGarmentForModal.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-mono text-xl font-bold text-stone-950">
                      {formatCurrency(selectedGarmentForModal.price)}
                    </span>
                    {selectedGarmentForModal.compareAtPrice && (
                      <span className="font-mono text-xs line-through text-stone-400">
                        {formatCurrency(selectedGarmentForModal.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mt-3">
                    {selectedGarmentForModal.description}
                  </p>

                  {/* Silhouette Details */}
                  {selectedGarmentForModal.details && selectedGarmentForModal.details.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                      <span className="font-bold text-stone-900 text-[11px] uppercase tracking-wider">Atelier Details:</span>
                      {selectedGarmentForModal.details.map((d, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-stone-600 text-[11px]">
                          <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Care Instructions */}
                  {selectedGarmentForModal.careInstructions && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
                      <span className="font-bold text-stone-800">Care: </span>
                      {selectedGarmentForModal.careInstructions}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedGarmentForModal);
                      setSelectedGarmentForModal(null);
                    }}
                    className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Boutique Bag ({formatCurrency(selectedGarmentForModal.price)})</span>
                  </button>

                  <a
                    href={`https://wa.me/${(config.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hello AURA concierge, I would like more details and sizing advice for "${selectedGarmentForModal.name}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Ask Stylist on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. MODAL: SIZE GUIDE CHART */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 text-stone-900 my-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-stone-950" />
                <h3 className="font-serif font-bold text-base text-stone-950">Atelier Size Guide & Conversions</h3>
              </div>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-stone-400 hover:text-stone-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Our silhouettes feature ease through the waist and hips for natural movement. If you fall between sizes, we recommend sizing up or booking our complimentary hem tailoring.
            </p>

            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">UK Equivalent</th>
                    <th className="py-2.5 px-3">Bust</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3">Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {FASHION_SIZE_GUIDE.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-stone-950">{row.size}</td>
                      <td className="py-2.5 px-3">{row.uk}</td>
                      <td className="py-2.5 px-3">{row.bust}</td>
                      <td className="py-2.5 px-3">{row.waist}</td>
                      <td className="py-2.5 px-3">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <p className="font-bold text-stone-900">Need Custom Bespoke Proportions?</p>
              <p>We tailor custom lengths and bust adjustments at no additional charge. Leave your notes during WhatsApp checkout or message our stylist directly.</p>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}

      {/* 12. MODAL: PRIVATE FITTING SCHEDULER */}
      {isFittingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 text-stone-900 my-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-stone-950" />
                <h3 className="font-serif font-bold text-lg text-stone-950">Book a Private Atelier Fitting</h3>
              </div>
              <button onClick={() => setIsFittingModalOpen(false)} className="text-stone-400 hover:text-stone-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            {fitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-stone-950">Appointment Slot Reserved!</h4>
                <p className="text-xs text-stone-500">
                  We have forwarded your booking request to our Lekki concierge WhatsApp.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setFitSuccess(null);
                      setIsFittingModalOpen(false);
                    }}
                    className="px-5 py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFittingSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Zainab Adeleke"
                    value={fitName}
                    onChange={(e) => setFitName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 123 4567"
                      value={fitPhone}
                      onChange={(e) => setFitPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-stone-950"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. zainab@example.com"
                      value={fitEmail}
                      onChange={(e) => setFitEmail(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={fitDate}
                      onChange={(e) => setFitDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Time Slot *</label>
                    <select
                      value={fitTime}
                      onChange={(e) => setFitTime(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                    >
                      <option value="11:00 AM">11:00 AM - Morning</option>
                      <option value="13:00 PM">1:00 PM - Afternoon</option>
                      <option value="15:00 PM">3:00 PM - Golden Hour</option>
                      <option value="17:00 PM">5:00 PM - Evening</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Fitting Experience</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      onClick={() => setFitType('in_atelier')}
                      className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        fitType === 'in_atelier'
                          ? 'bg-stone-950 text-white border-stone-950 font-bold'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span>Lekki Atelier Salon</span>
                      <span className="block text-[10px] opacity-75 mt-0.5">Champagne & Stylist</span>
                    </label>

                    <label
                      onClick={() => setFitType('virtual_concierge')}
                      className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        fitType === 'virtual_concierge'
                          ? 'bg-stone-950 text-white border-stone-950 font-bold'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span>Virtual Consultation</span>
                      <span className="block text-[10px] opacity-75 mt-0.5">1-on-1 Video Call</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Special Sizing Notes or Occasion</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Preparing for destination wedding in Capri..."
                    value={fitNotes}
                    onChange={(e) => setFitNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Confirm Booking via WhatsApp Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 13. BOUTIQUE SHOPPING BAG DRAWER */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full flex flex-col text-xs text-stone-900 shadow-2xl">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <h3 className="font-serif font-bold text-base text-stone-950">Boutique Shopping Bag</h3>
                <span className="font-mono text-[11px] text-stone-500">({bagCount} items)</span>
              </div>
              <button
                onClick={() => setIsBagOpen(false)}
                className="text-stone-400 hover:text-stone-950 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bag Items & Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {orderSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-stone-950">Order Dispatched to WhatsApp!</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    We have opened your WhatsApp to verify custom fit measurements with our concierge and finalize payment details.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={orderSuccess.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Re-open WhatsApp Slip</span>
                    </a>
                    <button
                      onClick={() => {
                        setOrderSuccess(null);
                        clearBag();
                        setIsBagOpen(false);
                      }}
                      className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold"
                    >
                      Done & Return to Boutique
                    </button>
                  </div>
                </div>
              ) : bag.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-serif font-bold text-base text-stone-900">Your boutique bag is empty.</p>
                  <p className="text-stone-400">Select handcrafted pieces from our lookbook to begin your order.</p>
                  <button
                    onClick={() => setIsBagOpen(false)}
                    className="px-5 py-2 bg-stone-950 text-white rounded-lg font-semibold mt-2"
                  >
                    Browse Lookbook
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Item List */}
                  <div className="space-y-3">
                    {bag.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-stone-950 text-xs truncate">{item.name}</h4>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Size: <span className="font-semibold text-stone-800">{item.size}</span> · Color: <span className="font-semibold text-stone-800">{item.color}</span>
                          </p>
                          <p className="font-mono font-bold text-stone-900 mt-1">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 bg-white rounded-lg p-1 border border-stone-200 shrink-0">
                          <button
                            onClick={() => updateBagQuantity(index, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-stone-950"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateBagQuantity(index, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-stone-950"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromBag(index)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove piece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Tier Selector */}
                  <div className="pt-2 space-y-2 border-t border-stone-200">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block">
                      Select Courier Delivery Destination
                    </span>
                    <div className="space-y-1.5">
                      <label
                        onClick={() => setSelectedShippingTier('lagos_express')}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          selectedShippingTier === 'lagos_express'
                            ? 'bg-stone-950 text-white border-stone-950 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <span>Lagos Express Courier</span>
                          <span className="block text-[10px] opacity-75">Same-day / 24 hrs</span>
                        </div>
                        <span className="font-mono">
                          {bagSubtotal >= (config.freeShippingThreshold || 50000) ? 'FREE' : formatCurrency(config.baseShippingFee)}
                        </span>
                      </label>

                      <label
                        onClick={() => setSelectedShippingTier('nationwide')}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          selectedShippingTier === 'nationwide'
                            ? 'bg-stone-950 text-white border-stone-950 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <span>Nationwide Priority Courier</span>
                          <span className="block text-[10px] opacity-75">Abuja, PH, Ibadan, etc.</span>
                        </div>
                        <span className="font-mono">{formatCurrency(config.nationwideShippingFee || 4500)}</span>
                      </label>

                      <label
                        onClick={() => setSelectedShippingTier('international')}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          selectedShippingTier === 'international'
                            ? 'bg-stone-950 text-white border-stone-950 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <span>International DHL Express</span>
                          <span className="block text-[10px] opacity-75">UK, USA, Canada, UAE (3-5 days)</span>
                        </div>
                        <span className="font-mono">{formatCurrency(config.internationalShippingFee || 18000)}</span>
                      </label>
                    </div>
                  </div>

                  {/* Client Information Form */}
                  <form id="boutique-form" onSubmit={handleCheckoutSubmit} className="space-y-3 pt-3 border-t border-stone-200">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block">
                      Client Delivery Details
                    </span>

                    <div>
                      <label className="text-stone-600 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zainab Balogun"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-950"
                      />
                    </div>

                    <div>
                      <label className="text-stone-600 block mb-1">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0802 345 6789"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-mono text-stone-900 focus:outline-none focus:border-stone-950"
                      />
                    </div>

                    <div>
                      <label className="text-stone-600 block mb-1">Complete Delivery Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Penthouse 3, Ocean View Estate, Ikoyi"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-950"
                      />
                    </div>

                    <div>
                      <label className="text-stone-600 block mb-1">Preferred Payment Method</label>
                      <select
                        value={clientPayment}
                        onChange={(e) => setClientPayment(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-950"
                      >
                        <option value="Instant Bank Transfer">Instant Bank Transfer (GTBank / Providus / Zenith)</option>
                        <option value="Online Card Payment">Online Card Payment via Verified Link</option>
                        <option value="POS on Delivery (Lagos Only)">POS Terminal on Delivery (Lagos Only)</option>
                        <option value="International Wire (USD/GBP)">International Wire / USD Remittance</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-stone-600 block mb-1">Bespoke Fit Notes (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Please hem 1 inch shorter for 5'4 height..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 text-[11px]"
                      />
                    </div>

                    {/* Gift Option Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={showGiftOption}
                          onChange={(e) => setShowGiftOption(e.target.checked)}
                          className="rounded text-stone-950 focus:ring-0"
                        />
                        <span>Complimentary Gift Packaging & Calligraphy Card</span>
                      </label>
                      {showGiftOption && (
                        <textarea
                          rows={2}
                          placeholder="Write your personal gift message to be hand-calligraphed..."
                          value={clientGiftNote}
                          onChange={(e) => setClientGiftNote(e.target.value)}
                          className="w-full mt-2 p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 text-[11px]"
                        />
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Total & WhatsApp Button */}
            {!orderSuccess && bag.length > 0 && (
              <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3 shrink-0">
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Garments Subtotal:</span>
                    <span className="font-mono">{formatCurrency(bagSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courier Delivery:</span>
                    <span className="font-mono font-medium">
                      {bagShippingFee === 0 ? 'FREE' : formatCurrency(bagShippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-950 text-base pt-2 border-t border-stone-200">
                    <span>Total Due:</span>
                    <span className="font-mono">{formatCurrency(bagTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="boutique-form"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Complete via WhatsApp ({formatCurrency(bagTotal)})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 14. ATELIER LIVE CMS DASHBOARD */}
      <FashionAdmin />
    </div>
  );
};

export const FashionTemplate: React.FC = () => {
  return (
    <FashionProvider>
      <FashionInner />
    </FashionProvider>
  );
};
