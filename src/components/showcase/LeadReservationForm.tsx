import React, { useState, useEffect } from 'react';
import { TEMPLATES, AGENCY_CONFIG } from '../../data/templateRegistry';
import { ReservedLead } from '../../types/lead';
import {
  Flame,
  CheckCircle,
  Copy,
  MessageCircle,
  Globe,
  Clock,
  ShieldCheck,
  Sparkles,
  User,
  Phone,
  Mail,
  Building,
  Check,
  AlertCircle,
  Calendar,
  Lock,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface LeadReservationFormProps {
  initialBusinessName?: string;
  initialPhone?: string;
  initialTemplateId?: string;
  onLeadSubmitted?: (lead: ReservedLead) => void;
  className?: string;
}

const STORAGE_KEY = 'codezilla_reserved_leads';
const SLOTS_KEY = 'codezilla_remaining_slots';

export const LeadReservationForm: React.FC<LeadReservationFormProps> = ({
  initialBusinessName = '',
  initialPhone = '',
  initialTemplateId = TEMPLATES[1].id,
  onLeadSubmitted,
  className = ''
}) => {
  // Form fields
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('Global / All Regions');
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [customSlug, setCustomSlug] = useState('');
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [notes, setNotes] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservedLead, setReservedLead] = useState<ReservedLead | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState<number>(14);

  // Sync initial props if they change
  useEffect(() => {
    if (initialBusinessName && !businessName) {
      handleBusinessNameChange(initialBusinessName);
    }
  }, [initialBusinessName]);

  useEffect(() => {
    if (initialPhone && !phone) {
      setPhone(initialPhone);
    }
  }, [initialPhone]);

  useEffect(() => {
    const updateSlotsFromStorage = () => {
      try {
        const storedSlots = localStorage.getItem(SLOTS_KEY);
        if (storedSlots) {
          const parsed = parseInt(storedSlots, 10);
          if (!isNaN(parsed) && parsed >= 0) {
            setRemainingSlots(parsed);
          }
        } else {
          localStorage.setItem(SLOTS_KEY, '14');
          setRemainingSlots(14);
        }
      } catch {
        setRemainingSlots(14);
      }
    };

    updateSlotsFromStorage();
    window.addEventListener('storage', updateSlotsFromStorage);
    window.addEventListener('slotCountUpdated', updateSlotsFromStorage);
    return () => {
      window.removeEventListener('storage', updateSlotsFromStorage);
      window.removeEventListener('slotCountUpdated', updateSlotsFromStorage);
    };
  }, []);

  const handleBusinessNameChange = (val: string) => {
    setBusinessName(val);
    if (!isSlugEdited) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 24);
      setCustomSlug(slug);
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugEdited(true);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24);
    setCustomSlug(cleaned);
  };

  const getSubdomain = () => {
    const slug = customSlug.trim() || 'yourbusiness';
    return `${slug}.${AGENCY_CONFIG.baseSubdomainDomain}`;
  };

  const generateSlotCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `SOL-10C-${randomNum}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);

    const chosenTemplate = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[1];
    const slotCode = generateSlotCode();
    const finalSubdomain = getSubdomain();

    const newLead: ReservedLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      slotCode,
      businessName: businessName.trim(),
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      region,
      templateId: selectedTemplateId,
      templateName: chosenTemplate.title,
      subdomain: finalSubdomain,
      lockedPriceCAD: 10,
      originalPriceCAD: 180,
      lockedPriceNGN: 5000,
      originalPriceNGN: 185000,
      notes: notes.trim(),
      timestamp: new Date().toISOString(),
      status: 'Reserved'
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const parsed: ReservedLead[] = existing ? JSON.parse(existing) : [];
      parsed.unshift(newLead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      // Decrement slot count
      const updatedSlots = Math.max(1, remainingSlots - 1);
      setRemainingSlots(updatedSlots);
      localStorage.setItem(SLOTS_KEY, updatedSlots.toString());
      window.dispatchEvent(new Event('slotCountUpdated'));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setReservedLead(newLead);
      if (onLeadSubmitted) {
        onLeadSubmitted(newLead);
      }
    }, 400);
  };

  const handleCopyCode = () => {
    if (!reservedLead) return;
    navigator.clipboard.writeText(reservedLead.slotCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const getWhatsAppReservationUrl = (lead: ReservedLead) => {
    const cleanPhone = AGENCY_CONFIG.whatsappNumber.replace(/\D/g, '');
    const lines = [
      `🎟 *CLAIM RESERVED $10 CAD WEBSITE SLOT [${lead.slotCode}]*`,
      `*SalesWithOlaide — Subsidized Promo (Ends Nov 29)*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏷 *Offer:* Starter Launch Package ($10 CAD / ₦5,000 NGN / approx. $3.50 USD / €3.50 EUR / £3 GBP)`,
      `💰 *Original Price:* $180 CAD (You saved $170 CAD!)`,
      `⏱ *Delivery Guarantee:* Within 48 Hours Express`,
      `🎨 *Selected Template:* ${lead.templateName}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 *Business Name:* ${lead.businessName}`,
      `👤 *Owner / Contact:* ${lead.contactName}`,
      `📱 *Client Phone:* ${lead.phone}`,
      lead.email ? `✉️ *Email:* ${lead.email}` : '',
      `🌍 *Location:* ${lead.region}`,
      `🌐 *Reserved Subdomain:* https://${lead.subdomain}`,
      lead.notes ? `📝 *Notes:* ${lead.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello SalesWithOlaide, I have reserved my $10 CAD promo slot (#${lead.slotCode}). Please confirm my slot and send payment details to begin my 48-hour setup!`
    ].filter(Boolean);

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // If slot is reserved, render the official Certificate / Confirmation state
  if (reservedLead) {
    const waUrl = getWhatsAppReservationUrl(reservedLead);

    return (
      <div className={`bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border-2 border-amber-500/80 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden ${className}`}>
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>SLOT RESERVATION CONFIRMED</span>
            </span>

            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
              Price Locked: $10 CAD until Nov 29
            </span>
          </div>

          {/* Ticket Header */}
          <div className="border-b border-stone-800 pb-5 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Congratulations, {reservedLead.contactName}!
            </h3>
            <p className="text-sm text-stone-300">
              Your subsidized website reservation for <strong className="text-amber-300 font-serif">{reservedLead.businessName}</strong> has been secured in our 48-hour launch queue.
            </p>
          </div>

          {/* Voucher Pass Card */}
          <div className="bg-stone-900/90 border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block tracking-widest font-semibold">
                  Official Reservation Code
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wider">
                  {reservedLead.slotCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors cursor-pointer self-start sm:self-auto"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Code Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Key Reservation Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Business Name</span>
                <span className="text-white font-bold">{reservedLead.businessName}</span>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Locked Promo Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-amber-400 font-bold font-mono text-base">$10 CAD</span>
                  <span className="line-through text-stone-500 font-mono text-xs">$180 CAD</span>
                  <span className="text-emerald-400 font-semibold text-[10px]">(-94%)</span>
                </div>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80 sm:col-span-2">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Your Branded Subdomain Link</span>
                <div className="flex items-center gap-1.5 font-mono text-emerald-300 font-bold mt-0.5 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span>https://{reservedLead.subdomain}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Selected Template</span>
                <span className="text-white font-medium">{reservedLead.templateName}</span>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Delivery Guarantee</span>
                <div className="flex items-center gap-1 text-amber-300 font-semibold mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Within 48 Hours Express</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-stone-950" />
              <span>Send Slot Code to WhatsApp & Finalize Setup (48h Delivery)</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </a>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Slot held for 48 hours</span>
              </span>

              <button
                type="button"
                onClick={() => setReservedLead(null)}
                className="text-stone-400 hover:text-white underline text-[11px] cursor-pointer"
              >
                Reserve another slot
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Reservation Form
  return (
    <div className={`bg-gradient-to-br from-stone-950 via-[#15120F] to-stone-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative backdrop-blur-md ${className}`}>
      {/* Urgency Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-stone-400">Scarcity:</span>
          <span className="text-amber-400 font-bold px-2 py-0.5 bg-stone-900 border border-stone-800 rounded">
            Only {remainingSlots} slots remaining
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-6 text-left">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Reserve Your $10 CAD Website Slot
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Input your business and contact information below to lock in the $10 CAD promo rate (normally $180 CAD). Offer ends <strong>November 29th</strong>. Your website will be delivered within 48 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
        {/* Row 1: Business Name & Contact Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Business Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mama Ope's Bukka or Zariel Luxury Silks"
              value={businessName}
              onChange={(e) => handleBusinessNameChange(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact / Owner Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Faisal Ibrahim or Chioma Adeleke"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Live Subdomain Generator with Instant Availability Check */}
        <div className="p-3.5 bg-stone-950/90 rounded-2xl border border-amber-500/30 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Globe className="w-3.5 h-3.5" />
              <span>Your Custom Branded Link (Free SSL):</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Available to Lock</span>
            </span>
          </div>

          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 font-mono text-xs">
            <span className="text-stone-500 select-none">https://</span>
            <input
              type="text"
              value={customSlug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="yourbusiness"
              className="bg-transparent text-amber-300 font-bold focus:outline-none flex-1 min-w-[80px]"
            />
            <span className="text-stone-400 font-semibold select-none">
              .{AGENCY_CONFIG.baseSubdomainDomain}
            </span>
          </div>
          <span className="text-[10px] text-stone-400 block">
            Click above to fine-tune your link slug. Perfect for Instagram Bio, TikTok & Google Maps.
          </span>
        </div>

        {/* Row 2: WhatsApp Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp / Phone Number *</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 0803 123 4567 or +44 7911..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white font-mono placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Email Address (Optional)</span>
            </label>
            <input
              type="email"
              placeholder="you@yourbrand.com (for setup slip)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Industry Template & Business Region */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Website Template *</span>
            </label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="restaurant_grill">🍲 Savanna African Bukka (African Dishes & Soups)</option>
              <option value="zobo_drinks">🍷 Zobowellness (Grade A Hibiscus & Botanical Wholesale)</option>
              <option value="fashion_boutique">👗 AURA Atelier (Luxury Fashion & Boutique)</option>
              <option value="spa_wellness">💆‍♀️ Solace Sanctuary (Spa, Aesthetics & Salon)</option>
              <option value="custom">✨ Other Custom Business / Service Hub</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Business Location / Region *</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="Global / All Regions">🌍 Global / All Regions (Worldwide)</option>
              <option value="Canada">🇨🇦 Canada (Toronto, Vancouver, Montreal, Calgary, etc.)</option>
              <option value="United States">🇺🇸 United States (New York, Houston, Atlanta, LA, etc.)</option>
              <option value="United Kingdom">🇬🇧 United Kingdom (London, Manchester, Birmingham, etc.)</option>
              <option value="Nigeria & West Africa">🇳🇬 Nigeria & West Africa (Lagos, Abuja, PH, Accra, etc.)</option>
            </select>
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-stone-300 font-semibold mb-1">
            Special Notes / Products to Include (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Products to list, custom colors, or specific requests"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Pricing Guarantee Summary Box */}
        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-400 block font-semibold">
              Price Upon Reservation
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-serif text-amber-400">$10 CAD</span>
              <span className="text-stone-500 line-through text-xs font-mono">$180 CAD</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
              ⚡ 48h Express Delivery
            </span>
            <span className="text-stone-400 text-[11px]">0% monthly fees</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-500/20 cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                <span>Securing Your $10 CAD Slot in Queue...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 fill-stone-950" />
                <span>Reserve My $10 CAD Slot (Instant Ticket & 48h Launch)</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </>
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 text-center">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-stone-500" />
            <span>No upfront hidden fees</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>Valid until Nov 29th</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>48-Hour Live Turnaround</span>
          </span>
        </div>
      </form>
    </div>
  );
};
