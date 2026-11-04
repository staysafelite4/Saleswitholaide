import React, { useState, useEffect } from 'react';
import { TEMPLATES, BusinessTemplate, AGENCY_CONFIG, AGENCY_PACKAGES } from '../../data/templateRegistry';
import { WebsiteOrderModal } from './WebsiteOrderModal';
import { LeadReservationForm } from './LeadReservationForm';
import { AdminLeadsModal } from './AdminLeadsModal';
import { ReservedLead } from '../../types/lead';
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sliders,
  DollarSign,
  Smartphone,
  CheckCircle,
  Clock,
  Layers,
  ChevronRight,
  Globe,
  Check,
  Flame,
  AlertCircle,
  Star,
  Users,
  Award,
  Lock,
  ChevronDown,
  HelpCircle,
  Gift
} from 'lucide-react';

interface ShowcaseHomeProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ShowcaseHome: React.FC<ShowcaseHomeProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [modalPreselectedTemplate, setModalPreselectedTemplate] = useState<string | undefined>(undefined);
  const [modalPreselectedPackage, setModalPreselectedPackage] = useState<'starter' | 'one_premium'>('starter');

  // Admin Leads Modal
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState(false);
  const [capturedLeadsCount, setCapturedLeadsCount] = useState<number>(0);
  const [remainingSlots, setRemainingSlots] = useState<number>(14);

  // Countdown timer state to November 29, 2026
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 32, hours: 14, minutes: 22, seconds: 45 });

  // Floating sticky CTA on scroll
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    // Target: November 29, 2026 23:59:59
    const targetDate = new Date('2026-11-29T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync captured leads count & remaining slot count from localStorage
  useEffect(() => {
    const updateCounts = () => {
      try {
        const storedLeads = localStorage.getItem('codezilla_reserved_leads');
        if (storedLeads) {
          const parsed = JSON.parse(storedLeads);
          setCapturedLeadsCount(Array.isArray(parsed) ? parsed.length : 0);
        } else {
          setCapturedLeadsCount(0);
        }

        const storedSlots = localStorage.getItem('codezilla_remaining_slots');
        if (storedSlots) {
          const parsed = parseInt(storedSlots, 10);
          if (!isNaN(parsed) && parsed >= 0) {
            setRemainingSlots(parsed);
          }
        } else {
          localStorage.setItem('codezilla_remaining_slots', '14');
          setRemainingSlots(14);
        }
      } catch {
        setCapturedLeadsCount(0);
        setRemainingSlots(14);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('slotCountUpdated', updateCounts);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('slotCountUpdated', updateCounts);
    };
  }, []);

  const handleLeadSubmitted = (newLead: ReservedLead) => {
    setCapturedLeadsCount(prev => prev + 1);
  };

  const categories = ['All', 'Retail Marketplace', 'Food & Drink', 'Restaurant', 'Fashion & Retail', 'Health & Spa'];

  const filteredTemplates = TEMPLATES.filter(
    t => selectedCategory === 'All' || t.category === selectedCategory
  );

  const handleOpenOrder = (templateId?: string, packageId: 'starter' | 'one_premium' = 'starter') => {
    setModalPreselectedTemplate(templateId);
    setModalPreselectedPackage(packageId);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* 1. URGENCY TOP COUNTDOWN BANNER (ENDS NOV 29) */}
      <aside
        aria-label="Limited time offer"
        className="bg-stone-950 text-white px-4 py-2.5 text-xs border-b border-stone-800"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Special Subsidized Promo Slashed from $180 CAD to Just $10 CAD:
            </span>
            <span className="text-stone-300 hidden md:inline">
              Offer ends November 29th. Only {remainingSlots} subsidized slots left!
            </span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-stone-400">Offer Closes In:</span>
            <span className="bg-stone-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
              {timeLeft.days}d
            </span>
            <span>:</span>
            <span className="bg-stone-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="bg-stone-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="bg-stone-800 text-rose-400 px-1.5 py-0.5 rounded font-bold">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </aside>

      {/* 2. STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold text-stone-950 tracking-tight shrink-0 whitespace-nowrap">
            <span className="w-8 h-8 rounded-lg bg-stone-950 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Zap className="w-4 h-4 text-amber-400" />
            </span>
            <div className="flex flex-col">
              <span className="leading-none">{AGENCY_CONFIG.name}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-800 mt-1 font-bold">
                $10 CAD Promo · Ends Nov 29 ({remainingSlots} Slots Left)
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <a href="#offer" className="hover:text-stone-950 transition-colors">The $10 CAD Offer</a>
            <a href="#reserve" className="text-amber-800 font-bold hover:text-stone-950 transition-colors flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Reserve Slot ({remainingSlots} Left)</span>
            </a>
            <a href="#templates" className="hover:text-stone-950 transition-colors">Live Templates</a>
            <a href="#compare" className="hover:text-stone-950 transition-colors">Compare Value</a>
            <a href="#diaspora" className="hover:text-stone-950 transition-colors">All Regions & Global</a>
            <a href="#faqs" className="hover:text-stone-950 transition-colors">FAQs</a>
          </nav>

          {/* Header Action */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAdminLeadsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
              title="View captured prospective leads"
            >
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Leads</span>
              {capturedLeadsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[10px] font-bold">
                  {capturedLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleOpenOrder(undefined, 'starter')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-all shadow-md shadow-rose-600/20 cursor-pointer animate-pulse"
            >
              <Flame className="w-3.5 h-3.5 text-white" />
              <span>Claim $10 CAD Website (48h)</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO ADVERTISEMENT & HIGH-CONVERTING LEAD GENERATOR */}
      <section id="offer" className="relative py-14 sm:py-20 lg:py-24 border-b border-stone-800 bg-gradient-to-b from-[#110F0D] via-[#161310] to-[#110F0D] text-white overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column: High-Impact Advertisement Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
              Own a Full Business Website for Just{' '}
              <span className="text-amber-400 underline decoration-rose-500 decoration-wavy decoration-2">
                $10 CAD
              </span>{' '}
              — Slashed from <span className="line-through text-stone-500 font-mono text-3xl sm:text-4xl">$180 CAD</span>.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Don’t spend hundreds of dollars or lose customers to complicated apps. List your products or menu, receive instant 1-click orders on your WhatsApp, manage prices in real-time from your phone, and get your custom link (<span className="font-mono text-amber-300 font-bold">yourbusiness.vercel.app</span>) <strong>delivered ready to sell in 48 hours</strong>.
            </p>

            {/* Slashed Price Spotlight Box */}
            <div className="p-4 bg-stone-900/90 rounded-2xl border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-4 max-w-xl text-left">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400 block tracking-wider">
                  Normal Agency Cost
                </span>
                <span className="line-through text-stone-500 font-mono text-xl font-bold">
                  $180 CAD
                </span>
              </div>
              <div className="text-stone-600 font-bold text-2xl">→</div>
              <div>
                <span className="text-[10px] uppercase font-mono text-rose-400 block tracking-wider font-bold">
                  Subsidized Promo Price
                </span>
                <span className="text-3xl font-serif font-bold text-amber-400">
                  $10 CAD
                </span>
                <span className="text-stone-400 font-mono text-xs ml-1.5">
                  (approx. ₦5,000 NGN / $3.50 USD / €3.50 EUR / £3 GBP)
                </span>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold">
                94% OFF
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Global & All Regions Supported</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Delivered Within 48 Hours</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>0% Commission on Your Sales</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Lead Generation & Slot Reservation Form */}
          <div className="lg:col-span-5">
            <LeadReservationForm
              initialTemplateId="restaurant_grill"
              onLeadSubmitted={handleLeadSubmitted}
            />
          </div>
        </div>
      </section>

      {/* 4. GLOBAL TRUST STRIP (ALL REGIONS & WORLDWIDE) */}
      <section id="diaspora" className="py-8 bg-[#FAF7F2] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2 font-serif font-bold text-stone-950 text-sm">
            <span>🌍 Benefiting Businesses Across All Regions & Global Markets:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 font-semibold">
            <span className="flex items-center gap-1 text-sm">🇨🇦 Canada</span>
            <span className="flex items-center gap-1 text-sm">🇺🇸 United States</span>
            <span className="flex items-center gap-1 text-sm">🇬🇧 United Kingdom</span>
            <span className="flex items-center gap-1 text-sm">🇳🇬 Nigeria & West Africa</span>
            <span className="flex items-center gap-1 text-sm text-amber-900 font-bold">🌐 All Other Global Regions</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-800 font-bold">
            ✓ 1-Click WhatsApp Direct Sales
          </div>
        </div>
      </section>

      {/* 5. SIDE-BY-SIDE COMPARISON: WHAT YOU GET FOR $10 CAD VS TRADITIONAL WEBSITES */}
      <section id="compare" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              The Transparent Truth
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
              Why Pay $180 CAD When You Can Launch for $10 CAD?
            </h2>
            <p className="text-stone-600 text-sm">
              See how our subsidized promo compares to typical agency quotes and DIY website builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* The Old / Expensive Way */}
            <div className="p-8 rounded-2xl border border-stone-200 bg-stone-50 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  Traditional Agencies & Builders
                </span>
                <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                  The Old Expensive Way
                </h3>
                <p className="font-mono text-3xl font-bold text-stone-400 mt-2 line-through">
                  $180+ CAD
                </p>
                <p className="text-xs text-stone-500 mt-0.5">+ $39/month recurring hosting fees</p>
              </div>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2.5 text-stone-500">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>3 to 5 weeks agonizing development delay</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-500">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Complex payment gateways where 60% of buyers abandon cart</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-500">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Ongoing monthly server charges and maintenance invoices</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-500">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Difficult backend dashboards requiring software developers to edit prices</span>
                </div>
              </div>
            </div>

            {/* The SalesWithOlaide $10 CAD Promo Way */}
            <div className="p-8 rounded-2xl border-2 border-stone-950 bg-[#161310] text-white shadow-2xl space-y-6 relative">
              <div className="absolute -top-3.5 right-6 bg-amber-500 text-stone-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                🔥 Subsidized Until Nov 29 ({remainingSlots} Slots Remaining)
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  SalesWithOlaide Special Promo
                </span>
                <h3 className="font-serif font-bold text-2xl text-white mt-1">
                  The $10 CAD Turnkey System
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-amber-400">
                    $10 CAD
                  </span>
                  <span className="text-stone-400 font-mono text-xs">One-time promo fee</span>
                </div>
                <p className="text-xs text-emerald-400 font-bold mt-0.5">0% Monthly Subscription Tax</p>
              </div>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Live in 48 Hours:</strong> Fully set up and taking real customer orders.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direct WhatsApp Orders:</strong> Customers send clear itemized receipts to your chat.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Custom Link Included:</strong> Fast <span className="font-mono text-amber-300 font-bold">yourbusiness.vercel.app</span> link with SSL.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Phone Admin CMS:</strong> PIN-protected screen to edit prices and toggle stock instantly.</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenOrder(undefined, 'starter')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>Claim Your $10 CAD Website (48-Hour Delivery)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5b. DEDICATED LEAD GENERATION & SLOT RESERVATION SUITE */}
      <section id="reserve" className="py-20 bg-[#120F0D] text-white border-b border-stone-800 relative overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL $10 CAD SLOT RESERVATION DESK ({remainingSlots} SLOTS REMAINING)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Reserve Your Turnkey Website Slot Before November 29th
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Don’t let your business miss out on online sales. Fill in your business details and contact info below to reserve your slot and lock in the $10 CAD subsidized price (normally $180 CAD).
            </p>
          </div>

          {/* 3 Step Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/30">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Input Details & Reserve</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Provide your business name and WhatsApp contact. Our system instantly locks your subsidized $10 CAD price rate.
              </p>
            </div>

            <div className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Get Instant Slot Code</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Receive an official reservation ticket code (e.g. #SOL-10C-XXXX) with your custom link (<strong className="text-stone-300">[name].vercel.app</strong>).
              </p>
            </div>

            <div className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-mono font-bold flex items-center justify-center text-sm border border-rose-500/30">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Live in 48 Hours</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Transmit your slot ticket to our engineering team on WhatsApp. We configure your catalog, admin PIN, and launch your site in 48h.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-3xl mx-auto">
            <LeadReservationForm
              initialTemplateId="restaurant_grill"
              onLeadSubmitted={handleLeadSubmitted}
            />
          </div>
        </div>
      </section>

      {/* 6. TEMPLATE DIRECTORY (4 WORKING LIVE DEMOS) */}
      <section id="templates" className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
                Included in the $10 CAD Promo
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight">
                Choose Any Template for Your Business
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg overflow-x-auto shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-stone-950 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Cover Area */}
                  <div
                    className="relative aspect-[16/9] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                      <span className="px-4 py-2 bg-white text-stone-950 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5">
                        <span>Launch Live Interactive Demo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {template.highlightBadge && (
                      <span className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                        {template.highlightBadge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 font-mono text-[11px] font-bold px-2.5 py-1 rounded shadow-xs">
                      Ready in 48 Hours
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold mb-1">
                        <span className="uppercase tracking-wider">{template.category}</span>
                        <span className="text-rose-700 font-bold">$10 CAD Promo Eligible</span>
                      </div>
                      <h3
                        onClick={() => onSelectTemplate(template.id)}
                        className="text-xl font-serif font-bold text-stone-950 hover:text-stone-700 transition-colors cursor-pointer mt-0.5"
                      >
                        {template.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                        {template.tagline}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                      {template.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Test Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenOrder(template.id, 'starter')}
                    className="flex items-center gap-1.5 px-4 py-3 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                    title="Enroll this template for $10 CAD"
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    <span>Claim for $10 CAD (48h)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS ABOUT THE $10 CAD PROMO */}
      <section id="faqs" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
              Clear Answers
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-950">
              Frequently Asked Questions About the $10 CAD Promo
            </h2>
          </div>

          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-sm text-stone-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Why did you slash the price from $180 CAD to just $10 CAD?</span>
              </h3>
              <p className="text-stone-600 leading-relaxed pl-6">
                We believe every single business owner — whether you run a restaurant, fashion boutique, drink brand, or wellness salon — deserves to be online without paying hundreds of dollars or exorbitant monthly SaaS fees. This is our business empowerment initiative running until <strong>November 29th</strong>. Only {remainingSlots} slots remain!
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-sm text-stone-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Can businesses in Canada, USA, UK, Nigeria, and all other regions benefit?</span>
              </h3>
              <p className="text-stone-600 leading-relaxed pl-6">
                Absolutely! Business owners across all regions and countries use this system because it removes expensive payment gateways and sends customer orders with sizes, items, and delivery details directly to their WhatsApp.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-sm text-stone-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>How does my website link work?</span>
              </h3>
              <p className="text-stone-600 leading-relaxed pl-6">
                You receive your own clean, branded link formatted as <strong className="font-mono text-stone-950">yourbusiness.vercel.app</strong> with free SSL encryption. You can put this link directly in your Instagram Bio, TikTok profile, WhatsApp business status, and Google Business profile.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-sm text-stone-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Will it truly be delivered in 48 hours?</span>
              </h3>
              <p className="text-stone-600 leading-relaxed pl-6">
                Yes, guaranteed. Once you confirm your business details on WhatsApp, our engineering team deploys your site, configures your custom subdomain, and hands over your live administrative login within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER WITH FINAL CALL TO ACTION */}
      <footer id="contact" className="bg-[#110F0D] text-stone-300 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-block p-2 rounded-xl bg-stone-900 border border-stone-800">
            <span className="font-mono text-xs text-amber-400 font-bold">
              ⏳ Promo Ends November 29th Sharp · Only {remainingSlots} Slots Left
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white max-w-xl mx-auto">
            Ready to Get Your Business Online for $10 CAD?
          </h2>

          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            Don’t miss this subsidized opportunity. Message SalesWithOlaide on WhatsApp today and have your website taking orders in 48 hours.
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/2348030795206?text=${encodeURIComponent('Hello SalesWithOlaide, I want to claim my $10 CAD website promo delivered in 48 hours!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950" />
              <span>Claim Your $10 CAD Website on WhatsApp (08030795206)</span>
            </a>
          </div>

          <div className="pt-8 border-t border-stone-800/80 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p>© {new Date().getFullYear()} {AGENCY_CONFIG.name}. Modern Turnkey Business Websites.</p>
              <span className="hidden sm:inline">·</span>
              <p className="text-amber-400 font-bold">All Regions & Global</p>
            </div>
            <div className="flex items-center gap-4">
              <span>Ends November 29th · 48-Hour Guarantee · [name].vercel.app</span>
              <button
                onClick={() => setIsAdminLeadsOpen(true)}
                className="text-stone-400 hover:text-amber-400 underline transition-colors cursor-pointer"
              >
                Agency Desk: Captured Leads ({capturedLeadsCount})
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. STICKY FLOATING BOTTOM CONVERSION BAR (ON SCROLL) */}
      {showStickyBar && (
        <aside
          aria-label="Floating promotion reminder"
          className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md text-white border-t border-stone-800 p-3 sm:p-4 shadow-2xl animate-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping shrink-0 hidden sm:inline" />
              <div>
                <p className="font-serif font-bold text-white text-sm">
                  Special $10 CAD Business Website Promo{' '}
                  <span className="line-through text-stone-500 font-mono text-xs font-normal">
                    (Was $180 CAD)
                  </span>
                </p>
                <p className="text-[11px] text-stone-400">
                  Subsidized link: <span className="font-mono text-amber-300">yourbusiness.vercel.app</span> · Delivered in 48 Hours · Only {remainingSlots} Slots Remaining!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#reserve"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Flame className="w-3.5 h-3.5 fill-stone-950" />
                <span>Reserve $10 CAD Slot Now ({remainingSlots} Left)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>
      )}

      {/* 10. SETUP ONBOARDING MODAL */}
      <WebsiteOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedTemplateId={modalPreselectedTemplate}
        preselectedPackageId={modalPreselectedPackage}
      />

      {/* 11. ADMIN LEADS DRAWER MODAL */}
      <AdminLeadsModal
        isOpen={isAdminLeadsOpen}
        onClose={() => setIsAdminLeadsOpen(false)}
      />
    </div>
  );
};
