import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, MessageCircle, Maximize2, X, Sparkles, ShieldCheck } from 'lucide-react';

interface ProofItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  badge: string;
}

const WHATSAPP_PROOF_GALLERY: ProofItem[] = [
  {
    id: 'proof_1',
    src: '/public/assets/aistudio/image_4b9f4eb0.png',
    title: 'Fresh Zobo Pot & Clean Leaves Review',
    caption: '“Clean leaves! Fresh n ur smells sooo good! A little goes a long way.”',
    badge: 'Zobo Brewer Review'
  },
  {
    id: 'proof_2',
    src: '/public/assets/aistudio/image_f499327d.png',
    title: '5kg Wholesale Sack Delivery Feedback',
    caption: '“I didn’t know the leaves will be this much... 5kg is a full sack! Saves me so much money!”',
    badge: 'Food Vendor Bulk Order'
  },
  {
    id: 'proof_3',
    src: '/public/assets/aistudio/image_5a1e52c5.png',
    title: 'Quality & Cleanliness Confirmation',
    caption: '“The quality of the zobo is fresh and the leaves are clean and well packaged. Ordering more!”',
    badge: 'Repeat Buyer Review'
  },
  {
    id: 'proof_4',
    src: '/public/assets/aistudio/image_17889626.png',
    title: 'Zobowellness Delivery & 20+ Recipe E-Book',
    caption: '“Delivered ma. So clean! E se ma. Thank you for the recipe e-book!”',
    badge: 'Verified WhatsApp Chat'
  }
];

export const ReviewsSection: React.FC = () => {
  const { siteConfig } = useStore();
  const reviews = siteConfig.reviews || [];
  const [activeLightbox, setActiveLightbox] = useState<ProofItem | null>(null);

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Real WhatsApp Customer Feedback & Testimony</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Zobowellness WhatsApp Testimonial Gallery
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Authentic reviews, photos, and messages directly from commercial caterers, drink producers, and families buying Grade A cleaned Hibiscus & Botanicals.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-stone-600 bg-white px-4 py-2.5 rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-stone-900">5.0 / 5.0 Rating</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified WhatsApp Feedback</span>
            </span>
          </div>
        </div>

        {/* 1. WHATSAPP CHAT SCREENSHOT PROOF GALLERY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-700 fill-emerald-100" />
              <span>WhatsApp Chat Screenshots & Unboxing Proof</span>
            </h3>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Tap any screenshot to enlarge & view full chat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHATSAPP_PROOF_GALLERY.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                    <span className="px-3 py-1.5 bg-white text-stone-950 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge Screenshot</span>
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-xs text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    {item.badge}
                  </span>
                </div>

                {/* Caption Footer */}
                <div className="p-4 space-y-1.5 bg-white border-t border-stone-100">
                  <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#720026] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2 italic leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-700 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp Verified Chat</span>
                    </span>
                    <span className="text-[#720026] font-bold underline">Tap to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. STRUCTURED CUSTOMER REVIEWS CARDS */}
        {reviews.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-stone-200/80">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Highlighted Quotes from Zobowellness Buyers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200/80">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                      “{rev.comment}”
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{rev.author}</p>
                      <p className="text-stone-500 text-[11px]">{rev.location}</p>
                    </div>
                    {rev.verified && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL FOR FULL SCREEN SCREENSHOT PREVIEW */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-serif font-bold text-sm">{activeLightbox.title}</span>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Body */}
            <div className="p-4 overflow-y-auto flex items-center justify-center bg-stone-950/50">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-xl border border-stone-800"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-1 text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-mono font-bold">{activeLightbox.badge}</span>
                <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified WhatsApp Chat</span>
                </span>
              </div>
              <p className="text-xs text-stone-300 italic font-serif leading-relaxed pt-1">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
