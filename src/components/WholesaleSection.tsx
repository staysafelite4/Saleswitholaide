import React from 'react';
import { useStore } from '../context/StoreContext';
import { Wine, Users, MessageCircle, Check } from 'lucide-react';

export const WholesaleSection: React.FC = () => {
  const { siteConfig } = useStore();
  const wholesale = siteConfig.wholesale;

  if (!wholesale) return null;

  const handleOrderKeg = (keg: { size: string; serves: string }) => {
    const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hello ${siteConfig.brandName || 'Zobowellness'}! 🎉 I would like to request wholesale pricing and availability for:\n- Package: ${keg.size} (${keg.serves})\n\nPlease send wholesale prices and dispatch timeline!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="kegs" className="py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold mb-2">
            Wholesale & Commercial Bulk
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {wholesale.title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            {wholesale.subtitle}
          </p>
        </div>

        {/* Keg / Bulk Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(wholesale.kegs || []).map((keg) => (
            <div
              key={keg.id}
              className="bg-white rounded-xl border border-stone-200 p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xl text-stone-900">{keg.size}</span>
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
                    <Wine className="w-5 h-5 text-[#720026]" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <Users className="w-4 h-4 text-stone-400" />
                  <span>Target: {keg.serves}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {keg.description}
                </p>

                <div className="pt-2 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cleaned, stone-free Grade A calyces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sealed moisture-proof bulk packaging</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <button
                  onClick={() => handleOrderKeg(keg)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Request Wholesale Price on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
