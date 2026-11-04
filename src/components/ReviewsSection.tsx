import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { siteConfig } = useStore();
  const reviews = siteConfig.reviews || [];

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold mb-2">
              Customer Experiences
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Trusted by Wholesalers, African Stores & Families Globally
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-stone-800">4.9 / 5.0</span>
            <span aria-hidden="true">·</span>
            <span>Based on 350+ WhatsApp Deliveries</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 rounded-xl border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-900">{rev.author}</p>
                  <p className="text-stone-500 text-[11px]">{rev.location}</p>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
