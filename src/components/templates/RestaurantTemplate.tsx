import React, { useState } from 'react';
import { RestaurantProvider, useRestaurant } from '../../context/RestaurantContext';
import { RestaurantAdmin } from './RestaurantAdmin';
import { Dish, DishAvailability } from '../../types/restaurant';
import {
  Utensils,
  Flame,
  MessageCircle,
  ShoppingBag,
  Settings,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Minus,
  Trash2,
  Check,
  Star,
  ShieldCheck,
  ChevronRight,
  X,
  Phone,
  Mail,
  Truck,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

const RestaurantInner: React.FC = () => {
  const {
    config,
    dishes,
    tray,
    trayCount,
    traySubtotal,
    selectedZone,
    setSelectedZone,
    trayDeliveryFee,
    trayTotal,
    isTrayOpen,
    setIsTrayOpen,
    isReservationOpen,
    setIsReservationOpen,
    setIsAdminOpen,
    selectedDishForModal,
    setSelectedDishForModal,
    addToTray,
    removeFromTray,
    updateTrayQuantity,
    clearTray,
    submitTakeoutOrder,
    submitTableReservation,
    formatCurrency
  } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Customizer Modal selections
  const [selectedSwallow, setSelectedSwallow] = useState<string>('');
  const [selectedProtein, setSelectedProtein] = useState<string>('');
  const [selectedSide, setSelectedSide] = useState<string>('');
  const [customSpice, setCustomSpice] = useState<string>('');
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Takeout Order Form state
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'Hot Courier Delivery' | 'Kitchen Pickup'>('Hot Courier Delivery');
  const [prefTime, setPrefTime] = useState('ASAP (Hot Courier Dispatch)');
  const [paymentMethod, setPaymentMethod] = useState('Instant Bank Transfer');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<{ id: string; url: string; msg: string } | null>(null);

  // Reservation Form state
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('Tonight');
  const [resTime, setResTime] = useState('8:00 PM');
  const [resParty, setResParty] = useState('Table for 2');
  const [resArea, setResArea] = useState<'Indoor African Bukka Hall' | 'Open-Air Flame Terrace' | 'Private VIP Palm Lounge'>('Indoor African Bukka Hall');
  const [resOccasion, setResOccasion] = useState('');
  const [resNotes, setResNotes] = useState('');
  const [resSuccess, setResSuccess] = useState<{ id: string; url: string } | null>(null);

  const [bannerDismissed, setBannerDismissed] = useState(false);

  const categories = [
    { id: 'all', label: 'All African Delicacies' },
    { id: 'soups_swallows', label: '🍲 Soups & Swallows' },
    { id: 'jollof_rice', label: '🍚 Firewood Jollof & Ofada' },
    { id: 'grills_suya', label: '🔥 Kano Suya & Grills' },
    { id: 'seafood', label: '🐟 Fisherman Seafood' },
    { id: 'party_coolers', label: '🎉 5L Party Coolers' },
    { id: 'drinks', label: '🍷 Zobo & Palm Wine' }
  ];

  const filteredDishes = dishes.filter((d) => {
    if (activeCategory !== 'all' && d.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        (d.nativeName && d.nativeName.toLowerCase().includes(q)) ||
        d.tagline.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCustomizer = (dish: Dish) => {
    setSelectedDishForModal(dish);
    setSelectedSwallow(dish.swallowOptions?.[0] || '');
    setSelectedProtein(dish.proteinOptions?.[0] || '');
    setSelectedSide(dish.sideOptions?.[0] || '');
    setCustomSpice(dish.spiceLevel);
    setModalQuantity(1);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedDishForModal) return;
    addToTray(selectedDishForModal, modalQuantity, {
      swallow: selectedDishForModal.swallowOptions?.length ? selectedSwallow : undefined,
      protein: selectedDishForModal.proteinOptions?.length ? selectedProtein : undefined,
      side: selectedSide || undefined,
      spiceLevel: customSpice || undefined
    });
    setSelectedDishForModal(null);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim()) return;

    const res = submitTakeoutOrder({
      name: custName,
      phone: custPhone,
      address: custAddress || 'Victoria Island Kitchen Pickup',
      deliveryType,
      zone: selectedZone,
      time: prefTime,
      payment: paymentMethod,
      notes: orderNotes
    });

    setOrderSuccess({ id: res.orderId, url: res.whatsappUrl, msg: res.formattedMessage });
    window.open(res.whatsappUrl, '_blank');
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim()) return;

    const res = submitTableReservation({
      name: resName,
      phone: resPhone,
      date: resDate,
      time: resTime,
      partySize: resParty,
      seatingArea: resArea,
      specialOccasion: resOccasion || undefined,
      notes: resNotes || undefined
    });

    setResSuccess({ id: res.resId, url: res.whatsappUrl });
    window.open(res.whatsappUrl, '_blank');
  };

  const banner = config.promoBanner;

  return (
    <div className="bg-[#12100E] text-stone-100 min-h-screen selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      {banner.enabled && !bannerDismissed && (
        <aside
          aria-label="Promotion"
          className="bg-[#9a3412] text-amber-50 px-4 py-2.5 text-xs font-medium border-b border-orange-900/60"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 text-center font-medium">
              {banner.badgeText && (
                <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-400 text-stone-950 px-2 py-0.5 rounded mr-2">
                  {banner.badgeText}
                </span>
              )}
              <span>{banner.text}</span>
              {banner.linkText && (
                <a
                  href={banner.linkUrl || '#menu'}
                  className="underline font-bold ml-2 hover:text-white transition-colors"
                >
                  {banner.linkText} →
                </a>
              )}
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss banner"
              className="p-1 hover:bg-black/20 rounded text-amber-200 hover:text-white transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* 2. STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#12100E]/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold text-white tracking-tight shrink-0 whitespace-nowrap">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/20">
              <Flame className="w-5 h-5 fill-stone-950" />
            </span>
            <div className="flex flex-col">
              <span className="leading-none">{config.restaurantName}</span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400 mt-1">
                100% Authentic African Bukka & Takeout
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Bukka Menu</a>
            <a href="#swallows" className="hover:text-amber-400 transition-colors">Soups & Swallows</a>
            <a href="#coolers" className="hover:text-amber-400 transition-colors">5L Party Coolers</a>
            <a href="#reservations" className="hover:text-amber-400 transition-colors">Table Bookings</a>
            <a href="#dispatch" className="hover:text-amber-400 transition-colors">Hot Courier Zones</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-300 border border-amber-500/40 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Bukka Table</span>
            </button>

            {/* Takeout Tray Drawer Button */}
            <button
              onClick={() => setIsTrayOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer font-bold"
            >
              <ShoppingBag className="w-4 h-4 fill-stone-950" />
              <span className="hidden xs:inline">Takeout Tray</span>
              {trayCount > 0 && (
                <span className="font-mono text-[11px] font-bold bg-stone-950 text-amber-400 px-1.5 py-0.2 rounded-full tabular-nums">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Kitchen CMS Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-400 hover:text-white bg-transparent hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Kitchen Live CMS"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kitchen CMS</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. CINEMATIC HERO SHOWCASE */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-stone-800 bg-gradient-to-b from-stone-950 via-[#181410] to-[#12100E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Authentic African Recipes · Generational Woodsmoke & Cast-Iron Cooking</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
              Pure African Culinary Soul. Slow-Cooked Over Firewood & Hardwood Coals.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Rich, authentic Nigerian and West African cuisines cooked with zero shortcuts. From rich Egusi and steaming Pounded Yam to smoky Firewood Party Jollof, spicy Kano Suya, and coastal Fisherman Soup.
            </p>

            {/* Quick Guarantees */}
            <div className="pt-2 grid grid-cols-3 gap-3 border-y border-stone-800/80 py-4 max-w-xl text-stone-300">
              <div>
                <p className="font-serif font-bold text-base text-amber-400">100% Native</p>
                <p className="text-[11px] text-stone-400">Pure red palm oil & iru</p>
              </div>
              <div>
                <p className="font-serif font-bold text-base text-amber-400">Thermal Heat</p>
                <p className="text-[11px] text-stone-400">Piping hot courier dispatch</p>
              </div>
              <div>
                <p className="font-serif font-bold text-base text-amber-400">Party Coolers</p>
                <p className="text-[11px] text-stone-400">5L & 10L catering pots</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
              >
                <span>Order African Dishes</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#coolers"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>5L Party Coolers</span>
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-600/40 rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve Dining Table</span>
              </button>
            </div>
          </div>

          {/* Hero Spotlight: Steaming Egusi & Pounded Yam */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 aspect-[4/3] sm:aspect-[4/3] group">
              <img
                src="/src/assets/images/african_egusi_soup_1793194327433.jpg"
                alt="Authentic African Egusi Soup with Goat Meat and Pounded Yam"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                    Signature Bukka Masterpiece
                  </span>
                  <p className="text-lg font-serif font-bold text-white">Egusi Soup & Pounded Yam</p>
                  <p className="font-mono text-xs text-amber-300 mt-0.5">{formatCurrency(6500)}</p>
                </div>
                <button
                  onClick={() => openCustomizer(dishes[0])}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* Floating Bukka Badge */}
            <div className="absolute -bottom-4 -left-4 bg-stone-900/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-800 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                🍲
              </div>
              <div className="text-xs">
                <p className="font-serif font-bold text-white">Daily Kitchen Specials</p>
                <p className="text-[11px] text-stone-400">Pounded Yam prepared fresh hourly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN AFRICAN FOOD MENU */}
      <section id="menu" className="py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  Authentic African Kitchen
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Traditional Bukka Menu
                </h2>
              </div>
              <div className="text-xs text-stone-400 font-mono">
                Complimentary Hot Courier Dispatch on Orders above {formatCurrency(config.freeDeliveryThreshold)}
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === c.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search Egusi, Jollof, Suya..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dishes Grid */}
          {filteredDishes.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/50 rounded-2xl border border-stone-800 space-y-3">
              <p className="font-serif font-bold text-white text-lg">No dishes found matching your query.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
              >
                View Full African Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  id={dish.id}
                  className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all group"
                >
                  <div>
                    {/* Dish Image */}
                    <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer" onClick={() => openCustomizer(dish)}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {dish.nativeName && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-stone-950 shadow-md">
                            {dish.nativeName}
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-amber-300 border border-stone-700">
                          {dish.spiceLevel}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-stone-950/90 text-stone-300">
                          ⏱ {dish.prepTime}
                        </span>
                      </div>
                    </div>

                    {/* Content Info */}
                    <div className="p-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                          Serves: {dish.serves}
                        </span>
                        <h3
                          onClick={() => openCustomizer(dish)}
                          className="font-serif font-bold text-lg text-white group-hover:text-amber-400 transition-colors cursor-pointer mt-0.5"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Swallow options badge if applicable */}
                      {dish.swallowOptions && dish.swallowOptions.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[11px] text-amber-400/90 font-semibold block mb-1">
                            Choice of Swallow Included:
                          </span>
                          <p className="text-[11px] text-stone-400">
                            {dish.swallowOptions.join(' · ')}
                          </p>
                        </div>
                      )}

                      {/* Proteins */}
                      {dish.proteinOptions && dish.proteinOptions.length > 0 && (
                        <div className="pt-0.5">
                          <span className="text-[11px] text-stone-400 font-semibold block">
                            Proteins: {dish.proteinOptions.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-6 pt-0 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-lg font-bold text-amber-400">
                          {formatCurrency(dish.price)}
                        </span>
                        {dish.compareAtPrice && dish.compareAtPrice > dish.price && (
                          <span className="font-mono text-xs line-through text-stone-500">
                            {formatCurrency(dish.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 font-mono">Freshly cooked to order</span>
                    </div>

                    <button
                      onClick={() => openCustomizer(dish)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Customize & Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. DEDICATED SECTION: 5L & 10L PARTY COOLERS */}
      <section id="coolers" className="py-20 border-b border-stone-800 bg-[#171411]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Celebration & Event Catering
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              African Bukka Mega Party Coolers (5L & 10L)
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Hosting Sunday family dinner, office luncheons, birthdays, or weekend celebrations? We deliver sealed thermal 5-liter and 10-liter coolers packed with authentic firewood jollof, egusi feast pots, or peppered asun.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Feeds 8–12 guests generously (Includes 10 portions of protein & fried dodo)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sealed food-grade insulated cooler keeps contents piping hot for 4+ hours</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom corporate invoice and delivery schedule available</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => openCustomizer(dishes.find(d => d.id === 'dish_jollof_party_cooler') || dishes[0])}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <span>Order 5L Party Cooler ({formatCurrency(45000)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative">
              <img
                src="/src/assets/images/african_party_jollof_1793194339863.jpg"
                alt="Firewood Party Jollof Feast Cooler"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-950/90 backdrop-blur-md rounded-xl border border-stone-800 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-white">5L Firewood Party Jollof Cooler</p>
                  <p className="text-xs text-stone-400">Includes 10x Peppered Chicken + Fried Dodo</p>
                </div>
                <span className="font-mono text-base font-bold text-amber-400">{formatCurrency(45000)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TABLE RESERVATIONS */}
      <section id="reservations" className="py-20 border-b border-stone-800 bg-[#12100E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">Dine In Our Bukka Hall</span>
            <h2 className="text-3xl font-serif font-bold text-white">Reserve a Dining Table</h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Experience the aroma of live hardwood coals, traditional calabash palm wine, and sizzling beef suya skewers in our Victoria Island dining hall.
            </p>

            <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{config.kitchenAddress}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{config.operatingHours}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp Kitchen Desk: {config.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Reservation Card */}
          <div className="lg:col-span-7 bg-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl">
            {resSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-white">Table Request Dispatched!</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  We have forwarded your table reservation details to our WhatsApp hostess desk.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setResSuccess(null);
                      setResName('');
                      setResPhone('');
                    }}
                    className="px-5 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h3 className="font-serif font-bold text-base text-white">Book VIP Bukka Seating</h3>
                  <span className="font-mono text-[10px] text-amber-400 uppercase">Immediate WhatsApp Confirmation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Lead Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Kunle Adeleke"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0802 345 6789"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Date *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tonight or Date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Time *</label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="1:00 PM">1:00 PM - Bukka Lunch</option>
                      <option value="3:00 PM">3:00 PM - Afternoon Feast</option>
                      <option value="7:00 PM">7:00 PM - Dinner Session</option>
                      <option value="8:30 PM">8:30 PM - Suya & Drinks Night</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Party Size *</label>
                    <select
                      value={resParty}
                      onChange={(e) => setResParty(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Table for 2">Table for 2</option>
                      <option value="Table for 4">Table for 4</option>
                      <option value="VIP Bukka Booth (6-8)">VIP Bukka Booth (6-8)</option>
                      <option value="Family Feast Table (10+)">Family Feast Table (10+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Seating Area</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Indoor African Bukka Hall', label: 'Bukka Dining Hall' },
                      { id: 'Open-Air Flame Terrace', label: 'Flame Terrace' },
                      { id: 'Private VIP Palm Lounge', label: 'VIP Palm Lounge' }
                    ].map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setResArea(area.id as any)}
                        className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                          resArea === area.id
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Special Food Pre-orders or Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please set aside 2 bowls of Egusi and 1 Fisherman soup..."
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950" />
                  <span>Confirm Table Reservation via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. COURIER DELIVERY ZONES */}
      <section id="dispatch" className="py-16 border-b border-stone-800 bg-[#161310]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Hot Thermal Dispatch</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Courier Zones & Rates</h2>
            <p className="text-xs text-stone-400 max-w-xl mx-auto">
              Dishes are packed in heat-retaining food containers and dispatched in insulated courier boxes to arrive piping hot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {config.deliveryZones.map((zone) => (
              <div key={zone.zone} className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2">
                <p className="font-bold text-white text-xs">{zone.zone}</p>
                <p className="font-mono text-amber-400 font-bold text-sm">{formatCurrency(zone.fee)}</p>
                <div className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-500" />
                  <span>ETA: {zone.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-16 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-xl">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                <Flame className="w-4 h-4 fill-stone-950" />
              </span>
              <span>{config.restaurantName}</span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              100% authentic African food ordering and takeout. Slow-cooked firewood party jollof, authentic soups, steaming pounded yam, and Kano suya.
            </p>
            <p className="text-[11px] font-mono text-amber-400">
              WhatsApp Kitchen Line: {config.contactPhone}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider font-mono text-[11px] block">Bukka Navigation</span>
            <ul className="space-y-2">
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">African Food Menu</a></li>
              <li><a href="#coolers" className="hover:text-amber-400 transition-colors">5L & 10L Party Coolers</a></li>
              <li><a href="#reservations" className="hover:text-amber-400 transition-colors">Reserve Bukka Table</a></li>
              <li><a href="#dispatch" className="hover:text-amber-400 transition-colors">Delivery Zones & Fees</a></li>
              <li><button onClick={() => setIsAdminOpen(true)} className="text-amber-400 hover:text-white transition-colors">Kitchen CMS Admin</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider font-mono text-[11px] block">Kitchen Location</span>
            <p className="text-stone-400">{config.kitchenAddress}</p>
            <p className="text-stone-400">{config.operatingHours}</p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${(config.whatsappNumber || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white rounded-lg border border-stone-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat with Kitchen on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 mt-12 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <p>© 2026 {config.restaurantName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-semibold">Developed by dev. Emmanuel Kehinde</span>
            <span>·</span>
            <span>0% Commission · Direct WhatsApp Orders</span>
          </div>
        </div>
      </footer>

      {/* 9. MODAL: AFRICAN DISH CUSTOMIZER */}
      {selectedDishForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 text-stone-100 my-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {selectedDishForModal.nativeName || 'African Specialty'}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {selectedDishForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDishForModal(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-950">
              <img
                src={selectedDishForModal.image}
                alt={selectedDishForModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {selectedDishForModal.description}
            </p>

            {/* Swallow Selection (For Soups) */}
            {selectedDishForModal.swallowOptions && selectedDishForModal.swallowOptions.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-stone-800">
                <label className="block text-xs font-bold text-amber-400">
                  Select Your Choice of Swallow *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedDishForModal.swallowOptions.map((swallow) => (
                    <button
                      key={swallow}
                      type="button"
                      onClick={() => setSelectedSwallow(swallow)}
                      className={`p-2 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                        selectedSwallow === swallow
                          ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {swallow}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Protein Selection */}
            {selectedDishForModal.proteinOptions && selectedDishForModal.proteinOptions.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-stone-800">
                <label className="block text-xs font-bold text-stone-200">
                  Select Desired Protein *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDishForModal.proteinOptions.map((protein) => (
                    <button
                      key={protein}
                      type="button"
                      onClick={() => setSelectedProtein(protein)}
                      className={`p-2 rounded-lg border text-xs text-left transition-colors cursor-pointer ${
                        selectedProtein === protein
                          ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {protein}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spice Intensity */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <label className="block text-xs font-bold text-stone-200">
                Spice Intensity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Mild', 'Medium', 'Fiery Hot (Naija Standard)'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCustomSpice(lvl)}
                    className={`p-2 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                      customSpice === lvl
                        ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Confirm */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold w-6 text-center text-sm">{modalQuantity}</span>
                <button
                  type="button"
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4 fill-stone-950" />
                <span>
                  Add to Takeout Tray ({formatCurrency(selectedDishForModal.price * modalQuantity)})
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. TAKEOUT ORDER TRAY DRAWER */}
      {isTrayOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-stone-900 h-full flex flex-col text-xs text-stone-100 shadow-2xl border-l border-stone-800">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-base text-white">African Takeout Order Tray</h3>
                <span className="font-mono text-[11px] text-stone-400">({trayCount} items)</span>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tray Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {orderSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-white">Order Dispatched to WhatsApp!</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    We have forwarded your hot African takeout order directly to our kitchen phone on WhatsApp.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={orderSuccess.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Re-open Kitchen WhatsApp Slip</span>
                    </a>
                    <button
                      onClick={() => {
                        setOrderSuccess(null);
                        clearTray();
                        setIsTrayOpen(false);
                      }}
                      className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-semibold"
                    >
                      Done & Return to Menu
                    </button>
                  </div>
                </div>
              ) : tray.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <Utensils className="w-10 h-10 text-stone-600 mx-auto" />
                  <p className="font-serif font-bold text-base text-white">Your takeout tray is empty.</p>
                  <p className="text-stone-400">Add steaming Egusi, Firewood Jollof, or Suya skewers from our menu.</p>
                  <button
                    onClick={() => setIsTrayOpen(false)}
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg mt-2 cursor-pointer"
                  >
                    Browse African Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-3">
                    {tray.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-white text-xs truncate">{item.name}</h4>
                          <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                            {item.swallow && (
                              <p className="text-amber-400">Swallow: <span className="font-bold">{item.swallow}</span></p>
                            )}
                            {item.protein && <p>Protein: {item.protein}</p>}
                            <p>Spice: {item.spiceLevel}</p>
                          </div>
                          <p className="font-mono font-bold text-amber-400 mt-1">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 bg-stone-900 rounded-lg p-1 border border-stone-800 shrink-0">
                          <button
                            onClick={() => updateTrayQuantity(idx, item.quantity - 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateTrayQuantity(idx, item.quantity + 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromTray(idx)}
                          className="p-1 text-stone-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Zone Selector */}
                  <div className="pt-3 border-t border-stone-800 space-y-2">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-amber-400">
                      Select Delivery Zone
                    </label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      {config.deliveryZones.map((z) => (
                        <option key={z.zone} value={z.zone}>
                          {z.zone} ({formatCurrency(z.fee)} · {z.eta})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Customer Information Form */}
                  <form id="takeout-form" onSubmit={handleCheckout} className="space-y-3 pt-3 border-t border-stone-800">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-300 block">
                      Delivery Details
                    </span>

                    <div>
                      <label className="text-stone-400 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tunde Bakare"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400 block mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0809 112 3344"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400 block mb-1">Complete Street Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 5, 10 Karimu Kotun, Victoria Island"
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400 block mb-1">Kitchen Delivery Notes (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Wrap pounded yam extra hot, separate pepper..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white text-[11px]"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Total and Submit Button */}
            {!orderSuccess && tray.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3 shrink-0">
                <div className="space-y-1.5 text-stone-400">
                  <div className="flex justify-between">
                    <span>Food Subtotal:</span>
                    <span className="font-mono">{formatCurrency(traySubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hot Thermal Courier:</span>
                    <span className="font-mono font-medium">
                      {trayDeliveryFee === 0 ? 'FREE' : formatCurrency(trayDeliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-stone-800">
                    <span>Total Due:</span>
                    <span className="font-mono text-amber-400">{formatCurrency(trayTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="takeout-form"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950" />
                  <span>Send Order to Kitchen via WhatsApp ({formatCurrency(trayTotal)})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. KITCHEN CMS ADMIN */}
      <RestaurantAdmin />
    </div>
  );
};

export const RestaurantTemplate: React.FC = () => {
  return (
    <RestaurantProvider>
      <RestaurantInner />
    </RestaurantProvider>
  );
};
