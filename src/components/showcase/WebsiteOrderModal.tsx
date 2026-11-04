import React, { useState, useEffect } from 'react';
import { TEMPLATES, AGENCY_CONFIG, AGENCY_PACKAGES, AgencyPackage, BusinessTemplate } from '../../data/templateRegistry';
import {
  X,
  Check,
  Sparkles,
  MessageCircle,
  Globe,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface WebsiteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTemplateId?: string;
  preselectedPackageId?: 'starter' | 'one_premium';
}

export const WebsiteOrderModal: React.FC<WebsiteOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedTemplateId,
  preselectedPackageId = 'one_premium'
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    preselectedTemplateId || TEMPLATES[1].id
  );
  const [selectedPackageId, setSelectedPackageId] = useState<'starter' | 'one_premium'>(
    preselectedPackageId
  );
  const [businessName, setBusinessName] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [orderSent, setOrderSent] = useState<{ url: string } | null>(null);

  useEffect(() => {
    if (preselectedTemplateId) {
      setSelectedTemplateId(preselectedTemplateId);
    }
  }, [preselectedTemplateId]);

  useEffect(() => {
    if (preselectedPackageId) {
      setSelectedPackageId(preselectedPackageId);
    }
  }, [preselectedPackageId]);

  // Auto-generate subdomain slug from business name
  const handleBusinessNameChange = (val: string) => {
    setBusinessName(val);
    if (!isSlugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 24);
      setCustomSlug(generated);
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24);
    setCustomSlug(cleaned);
  };

  if (!isOpen) return null;

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
  const currentPackage = AGENCY_PACKAGES.find(p => p.id === selectedPackageId) || AGENCY_PACKAGES[1];
  const finalSubdomain = (customSlug || 'yourbusiness') + '.' + AGENCY_CONFIG.baseSubdomainDomain;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !clientPhone.trim()) return;

    const lines = [
      `🚀 *NEW WEBSITE SETUP INQUIRY*`,
      `*SalesWithOlaide — 48-Hour Express Launch*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏷 *Package Selected:* ${currentPackage.name} ($${currentPackage.priceCAD} CAD)`,
      `⏱ *Delivery Guarantee:* Within 48 Hours`,
      `🎨 *Template Chosen:* ${currentTemplate.title}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 *Business Name:* ${businessName.trim()}`,
      `🌐 *Desired Website Link:* ${finalSubdomain}`,
      `📱 *Client WhatsApp:* ${clientPhone.trim()}`,
      clientNotes.trim() ? `📝 *Customization Notes:* ${clientNotes.trim()}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm and begin my 48-hour setup onboarding!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = AGENCY_CONFIG.whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    // Decrement remaining slots count
    try {
      const stored = localStorage.getItem('codezilla_remaining_slots');
      const current = stored ? parseInt(stored, 10) : 14;
      const updated = Math.max(1, current - 1);
      localStorage.setItem('codezilla_remaining_slots', updated.toString());
      window.dispatchEvent(new Event('slotCountUpdated'));
    } catch {
      // ignore
    }

    setOrderSent({ url: whatsappUrl });
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full text-stone-900 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-white flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-stone-950">
                  Claim Your Website Setup
                </h3>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ⚡ 48-Hour Delivery
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Choose your package, pick your template, and reserve your custom <span className="font-mono font-semibold text-stone-800">.vercel.app</span> link.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-950 rounded-lg hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSent ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-2xl text-stone-950">
              Setup Order Sent to WhatsApp!
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              We have forwarded your business details for <span className="font-mono font-bold text-stone-950">{finalSubdomain}</span> to our lead engineer. We will confirm your order and begin deployment immediately.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={orderSent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>
              <button
                onClick={() => {
                  setOrderSent(null);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Step 1: Package Choice */}
            <div className="space-y-2">
              <label className="block text-stone-800 font-bold uppercase tracking-wider text-[11px]">
                1. Select Package (Both Delivered in 48 Hours)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AGENCY_PACKAGES.map((pkg) => (
                  <label
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPackageId === pkg.id
                        ? 'border-stone-950 bg-stone-50/70 shadow-xs ring-1 ring-stone-950'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      {pkg.badge && (
                        <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500 text-stone-950 mb-2">
                          {pkg.badge}
                        </span>
                      )}
                      <h4 className="font-serif font-bold text-sm text-stone-950">
                        {pkg.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{pkg.tagline}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-base font-bold text-stone-950">
                          ${pkg.priceCAD} CAD
                        </span>
                        {pkg.compareAtPriceCAD && (
                          <span className="font-mono text-xs text-stone-400 line-through">
                            ${pkg.compareAtPriceCAD} CAD
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold font-mono">
                        {pkg.deliveryTime}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Template */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="block text-stone-800 font-bold uppercase tracking-wider text-[11px]">
                2. Choose Website Template
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      selectedTemplateId === tmpl.id
                        ? 'border-stone-950 bg-stone-950 text-white font-bold shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <p className="text-[11px] truncate leading-tight font-serif">{tmpl.title.split('—')[0]}</p>
                    <span className="text-[9px] opacity-75 block mt-0.5">{tmpl.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Business Name & Subdomain Link Generator */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <label className="block text-stone-800 font-bold uppercase tracking-wider text-[11px]">
                3. Business Details & Desired Website Link
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mama Ope Bukka"
                    value={businessName}
                    onChange={(e) => handleBusinessNameChange(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-stone-950"
                  />
                </div>
              </div>

              {/* Subdomain Live Link Badge */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-amber-700" />
                  <span>Your Live Website Link Preview:</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs bg-white px-3 py-2 rounded-lg border border-amber-300 shadow-xs">
                  <span className="text-stone-400 select-none">https://</span>
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="yourbusiness"
                    className="font-bold text-stone-950 bg-transparent focus:outline-none border-b border-dashed border-stone-400 hover:border-stone-950 min-w-0"
                  />
                  <span className="text-amber-800 font-bold select-none shrink-0">
                    .{AGENCY_CONFIG.baseSubdomainDomain}
                  </span>
                </div>
                <p className="text-[10px] text-amber-800/80">
                  ✨ Instant turnkey deployment. Subdomain included with SSL security. (Custom .com domain connection included with The One Premium package).
                </p>
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">Special Customization Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please use my existing logo, dark orange branding, and load my 10 dishes..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:border-stone-950"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">Total Package Cost</span>
                <span className="font-mono text-lg font-bold text-stone-950">
                  ${currentPackage.priceCAD} CAD
                </span>
                {currentPackage.compareAtPriceCAD && (
                  <span className="text-[11px] text-stone-500 line-through ml-1.5 font-mono">
                    (${currentPackage.compareAtPriceCAD} CAD)
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Claim Website on WhatsApp (Delivered in 48h)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
