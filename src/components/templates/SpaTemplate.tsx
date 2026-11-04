import React, { useState } from 'react';
import { SpaProvider, useSpa } from '../../context/SpaContext';
import { SpaAdmin } from './SpaAdmin';
import { SpaTreatment } from '../../types/spa';
import {
  Leaf,
  Calendar,
  Clock,
  MessageCircle,
  Settings,
  X,
  Check,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Heart,
  Star,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const SpaInner: React.FC = () => {
  const {
    config,
    treatments,
    selectedTreatment,
    setSelectedTreatment,
    isBookingOpen,
    setIsBookingOpen,
    setIsAdminOpen,
    submitAppointment,
    formatCurrency
  } = useSpa();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestDate, setGuestDate] = useState('This Saturday');
  const [guestTime, setGuestTime] = useState('11:00 AM');
  const [guestTherapist, setGuestTherapist] = useState('');
  const [pressure, setPressure] = useState('Medium Therapeutic');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guestNotes, setGuestNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{ id: string; url: string } | null>(null);

  const [bannerDismissed, setBannerDismissed] = useState(false);

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'massage', label: 'Massage Therapy' },
    { id: 'facial', label: 'Herbal Facials' },
    { id: 'scrub', label: 'Body Polishes' },
    { id: 'couples', label: 'Couples & VIP' },
    { id: 'holistic', label: 'Mind & Sound' }
  ];

  const addOnOptions = [
    { label: 'Warm Herbal Foot Bath (+₦3,500)', value: 'Herbal Foot Bath' },
    { label: '15-Min Scalp Acupressure (+₦5,000)', value: 'Scalp Acupressure' },
    { label: 'Cold Jade Eye Depuffing (+₦4,000)', value: 'Jade Eye Depuff' }
  ];

  const filteredTreatments = treatments.filter(
    t => activeCategory === 'all' || t.category === activeCategory
  );

  const handleOpenBooking = (t: SpaTreatment) => {
    setSelectedTreatment(t);
    setGuestTherapist(t.therapists[0] || 'Any Senior Practitioner');
    setIsBookingOpen(true);
  };

  const toggleAddOn = (val: string) => {
    setSelectedAddOns(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const res = submitAppointment({
      clientName: guestName,
      clientPhone: guestPhone,
      date: guestDate,
      timeSlot: guestTime,
      therapist: guestTherapist,
      pressurePreference: pressure,
      addOns: selectedAddOns,
      notes: guestNotes
    });

    setBookingSuccess({ id: res.appId, url: res.whatsappUrl });
    window.open(res.whatsappUrl, '_blank');
  };

  const banner = config.promoBanner;

  return (
    <div className="bg-[#FAF7F2] text-stone-900 min-h-screen selection:bg-emerald-800 selection:text-white">
      {/* Promo Banner */}
      {banner.enabled && !bannerDismissed && (
        <div className="bg-[#064e3b] text-emerald-50 px-4 py-2 text-xs flex items-center justify-between border-b border-emerald-800">
          <div className="max-w-7xl mx-auto flex-1 text-center">
            {banner.badgeText && <span className="font-bold uppercase tracking-wider text-[10px] mr-2 text-emerald-300">{banner.badgeText} ·</span>}
            <span>{banner.text}</span>
            {banner.linkText && <a href={banner.linkUrl || '#treatments'} className="underline ml-2 font-semibold text-white hover:opacity-80">{banner.linkText} →</a>}
          </div>
          <button onClick={() => setBannerDismissed(true)} className="p-1 hover:bg-emerald-800 rounded text-emerald-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header conforming to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a href="#" className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold text-stone-900 whitespace-nowrap">
            <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Leaf className="w-4 h-4 fill-white" />
            </span>
            <span>{config.spaName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <a href="#treatments" className="hover:text-emerald-800 transition-colors">Session Rituals</a>
            <a href="#couples" className="hover:text-emerald-800 transition-colors">Couples Suite</a>
            <a href="#therapists" className="hover:text-emerald-800 transition-colors">Practitioners</a>
            <a href="#reviews" className="hover:text-emerald-800 transition-colors">Client Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${(config.whatsappNumber || '').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Book via WhatsApp</span>
            </a>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Spa CMS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-stone-200 bg-[#F4EFE6]/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Victoria Island Sanctuary · Private Acoustic Suites</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
              Quiet your mind. Restore your natural vitality.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Warm volcanic basalt river stones, cold jade stone sculpting facials, and therapeutic botanical aromatherapy. Handcrafted herbal bodywork in private, serene suites.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#treatments"
                className="px-6 py-3.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
              >
                Explore Session Menu
              </a>
              <button
                onClick={() => {
                  setSelectedTreatment(treatments[0]);
                  setIsBookingOpen(true);
                }}
                className="px-5 py-3.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50"
              >
                Reserve Session Slot
              </button>
            </div>

            <div className="pt-6 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <p className="font-semibold text-stone-900">100% Organic</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Cold-pressed botanical oils</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Private Valet</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Discreet Victoria Island suite</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">9:00 AM – 8:00 PM</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Daily by reservation</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-stone-200 shadow-xl group">
            <img
              src="/src/assets/images/template_spa_wellness_1793191760546.jpg"
              alt="Solace Sanctuary Suite"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* Treatments Collection Grid */}
      <section id="treatments" className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1 block">Therapeutic Care</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Curated Treatment Rituals</h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => handleOpenBooking(t)}>
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono font-bold text-stone-900">
                      {t.duration}
                    </div>
                    <div className="absolute top-3 left-3 bg-emerald-900/90 text-white px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider">
                      {t.tag}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-emerald-800 capitalize">{t.category}</span>
                      <span className="text-[11px] text-stone-400">
                        {t.availability === 'available' ? 'Slots Available' : t.availability === 'low_slots' ? 'Few Slots Today' : 'Fully Booked'}
                      </span>
                    </div>

                    <h3
                      onClick={() => handleOpenBooking(t)}
                      className="font-serif font-bold text-xl text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer"
                    >
                      {t.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {t.tagline}
                    </p>

                    {/* Focus points */}
                    {t.intakeFocus && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {t.intakeFocus.map((f, i) => (
                          <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="font-mono text-lg font-bold text-stone-900">
                    {formatCurrency(t.price)}
                  </span>

                  <button
                    onClick={() => handleOpenBooking(t)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Session</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couples Sanctuary Feature Spotlight */}
      <section id="couples" className="py-20 border-b border-stone-200 bg-[#F4EFE6]/70">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Exclusive Experience</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              The Solace Couples Sanctuary Retreat
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Step into your private soundproof sanctuary suite. Features twin teak bodywork beds, a sunken stone hydrotherapy bath adorned with white orchids, heated herbal compress towels, and a dedicated team of two senior practitioners.
            </p>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>90-Minute side-by-side bespoke pressure massage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Sunken stone floral hydrotherapy bath session</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Artisanal chilled hibiscus tea & seasonal fruit platter</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <span className="font-mono text-2xl font-bold text-emerald-900">
                {formatCurrency(75000)}
              </span>
              <button
                onClick={() => {
                  const couples = treatments.find(t => t.id === 'spa_couples_retreat') || treatments[0];
                  handleOpenBooking(couples);
                }}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Book Couples Suite
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-stone-200 shadow-xl">
            <img
              src="/src/assets/images/spa_couples_suite_1793193190635.jpg"
              alt="Couples Suite"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Holistic Practitioners Section */}
      <section id="therapists" className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1 block">Certified Practitioners</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">Master Holistic Bodyworkers</h2>
            <p className="text-stone-600 text-sm mt-1">Every treatment is conducted by dedicated, certified practitioners trained in international holistic institutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.therapists.map((th) => (
              <div key={th.id} className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">{th.name}</h3>
                <p className="text-xs text-emerald-800 font-semibold">{th.role} · {th.experience}</p>
                <p className="text-xs text-stone-600 leading-relaxed">{th.bio}</p>
                <div className="pt-2 text-[11px] text-stone-400">
                  <span className="font-semibold text-stone-600">Specialty: </span>{th.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Reviews */}
      <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">Guest Experiences</span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Restored & Renewed</h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-stone-900">4.9 / 5.0</span>
              <span className="text-stone-400">· 320+ Sessions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white rounded-xl border border-stone-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed">“{rev.comment}”</p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-xs flex justify-between items-center text-stone-500">
                  <span className="font-bold text-stone-900">{rev.author}</span>
                  <span className="text-[11px]">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {new Date().getFullYear()} {config.spaName}. {config.sanctuaryAddress}.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-emerald-400 font-semibold">Developed by dev. Emmanuel Kehinde</span>
          </div>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Sanctuary Live CMS</span>
          </button>
        </div>
      </footer>

      {/* Appointment Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-md w-full space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800">Appointment Request</span>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {selectedTreatment?.title || 'Spa Session'}
                </h3>
              </div>
              <button onClick={() => setIsBookingOpen(false)} className="text-stone-400 hover:text-stone-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">Session Slip Ready!</h4>
                <p className="text-stone-500">We opened WhatsApp to confirm intake time with our sanctuary host.</p>
                <button
                  onClick={() => {
                    setBookingSuccess(null);
                    setIsBookingOpen(false);
                  }}
                  className="px-5 py-2 bg-emerald-800 text-white rounded-lg font-semibold mt-2"
                >
                  Done & Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3">
                <div>
                  <label className="text-stone-700 font-medium block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nneka Umeh"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div>
                  <label className="text-stone-700 font-medium block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0802 345 6789"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-700 font-medium block mb-1">Date</label>
                    <input
                      type="text"
                      value={guestDate}
                      onChange={(e) => setGuestDate(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-stone-700 font-medium block mb-1">Time Slot</label>
                    <select
                      value={guestTime}
                      onChange={(e) => setGuestTime(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                    >
                      <option value="10:00 AM">Morning (10:00 AM)</option>
                      <option value="1:30 PM">Afternoon (1:30 PM)</option>
                      <option value="4:00 PM">Late Afternoon (4:00 PM)</option>
                      <option value="6:30 PM">Evening Serenity (6:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-stone-700 font-medium block mb-1">Practitioner Preference</label>
                  <select
                    value={guestTherapist}
                    onChange={(e) => setGuestTherapist(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  >
                    <option value="Any Available Senior Practitioner">Any Available Senior Practitioner</option>
                    {config.therapists.map((th) => (
                      <option key={th.id} value={th.name}>
                        {th.name} ({th.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-stone-700 font-medium block mb-1">Pressure Preference</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Gentle Relaxation', 'Medium Therapeutic', 'Deep Tissue'].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPressure(p)}
                        className={`p-1.5 rounded border text-[11px] transition-colors ${
                          pressure === p
                            ? 'bg-emerald-800 text-white border-emerald-800 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-stone-700 font-medium block mb-1">Ritual Add-Ons (Optional)</label>
                  <div className="space-y-1.5">
                    {addOnOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(opt.value)}
                          onChange={() => toggleAddOn(opt.value)}
                          className="w-3.5 h-3.5 text-emerald-800"
                        />
                        <span className="text-[11px] text-stone-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-stone-700 font-medium block mb-1">Focus Areas / Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Focus on neck stiffness, no eucalyptus"
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button type="button" onClick={() => setIsBookingOpen(false)} className="px-4 py-2 text-stone-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold">
                    Send Request to WhatsApp ({selectedTreatment ? formatCurrency(selectedTreatment.price) : ''})
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Spa CMS Admin */}
      <SpaAdmin />
    </div>
  );
};

export const SpaTemplate: React.FC = () => {
  return (
    <SpaProvider>
      <SpaInner />
    </SpaProvider>
  );
};
