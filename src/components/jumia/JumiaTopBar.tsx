import React from 'react';
import { Phone, ShieldCheck, Store, Tag } from 'lucide-react';

interface JumiaTopBarProps {
  onOpenSellerModal: () => void;
  onOpenTrackOrders: () => void;
}

export const JumiaTopBar: React.FC<JumiaTopBarProps> = ({
  onOpenSellerModal,
  onOpenTrackOrders
}) => {
  return (
    <div className="bg-[#1f1f1f] text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Links */}
        <div className="flex items-center gap-5">
          <button
            onClick={onOpenSellerModal}
            className="flex items-center gap-1.5 text-[#F68B1E] hover:text-[#ff9c3a] font-medium transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Sell on Jumia (Kitchen Vendor Portal)</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
            <span className="font-bold text-white tracking-wider">JUMIA</span>
            <span className="text-[#F68B1E] font-bold">PAY</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine Utensils Guarantee</span>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden lg:flex items-center gap-1 bg-stone-800/80 px-2.5 py-0.5 rounded text-amber-300 border border-amber-500/30">
            <Tag className="w-3 h-3" />
            <span>Use code <strong className="text-white">JUMIAKITCHEN</strong> for $15 CAD OFF</span>
          </div>

          <a 
            href="https://wa.me/2348030795206" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#F68B1E]" />
            <span className="hidden sm:inline">WhatsApp Order:</span>
            <strong className="text-white">0803 079 5206</strong>
          </a>

          <button
            onClick={onOpenTrackOrders}
            className="hover:text-white transition-colors underline decoration-stone-500 underline-offset-2"
          >
            Track Orders
          </button>

          <div className="flex items-center gap-1 pl-2 border-l border-stone-700">
            <span className="text-sm">🇨🇦</span>
            <span className="font-semibold text-white">CAD ($)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
