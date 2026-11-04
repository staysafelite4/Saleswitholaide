import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const { cart, cartCount, cartSubtotal, cartTotal, cartDeliveryFee, siteConfig, formatCurrency } = useStore();

  const phone = (siteConfig.whatsappNumber || '08030795206').replace(/\D/g, '');
  const cleanPhone = phone.startsWith('234') ? phone : phone.startsWith('0') ? `234${phone.slice(1)}` : `234${phone}`;

  const handleWhatsAppClick = () => {
    let message = '';

    if (cart.length > 0) {
      const itemsList = cart
        .map(
          (item, idx) =>
            `${idx + 1}. *${item.product.name}* (${item.product.size})\n   • Qty: ${item.quantity} × ${formatCurrency(item.product.price, 'CAD')} = ${formatCurrency(item.quantity * item.product.price, 'CAD')}\n   • Prep: ${item.temperaturePreference || 'Ice Cold'}, ${item.selectedSweetness || 'Standard'}`
        )
        .join('\n');

      message = [
        `🌺 *ZOBOWELLNESS - WHATSAPP DIRECT ORDER*`,
        `━━━━━━━━━━━━━━━━━━`,
        `🛒 *ORDER ITEMS (Prices in CAD):*`,
        itemsList,
        `━━━━━━━━━━━━━━━━━━`,
        `Subtotal: ${formatCurrency(cartSubtotal, 'CAD')}`,
        `Courier Delivery: ${cartDeliveryFee === 0 ? 'FREE' : formatCurrency(cartDeliveryFee, 'CAD')}`,
        `*TOTAL ESTIMATE:* *${formatCurrency(cartTotal, 'CAD')}*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Hi! I would like to place this order now. Please provide delivery and payment details.`
      ].join('\n');
    } else {
      message = [
        `🌺 *ZOBOWELLNESS - GRADE A HIBISCUS & BOTANICALS*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Hi Zobowellness! I am interested in ordering cleaned Grade A Hibiscus leaves & botanicals in bulk.`,
        `Please send me available bag sizes, dispatch timeline, and payment options. Thank you!`
      ].join('\n');
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Tooltip badge on hover or cart notification */}
      {cartCount > 0 && (
        <div className="bg-stone-900 text-stone-100 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-stone-700 flex items-center gap-1.5 animate-bounce">
          <ShoppingBag className="w-3 h-3 text-emerald-400" />
          <span>{cartCount} {cartCount === 1 ? 'item' : 'items'} in bag ({formatCurrency(cartTotal, 'CAD')})</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative flex items-center gap-3 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/40 ring-4 ring-emerald-500/20 cursor-pointer"
        title="Order via WhatsApp in CAD"
        aria-label="Order via WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-current" />

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-wide uppercase leading-tight">Order via WhatsApp</span>
          <span className="text-[10px] text-emerald-100 leading-tight font-mono">Prices in $ CAD</span>
        </div>

        {cartCount > 0 && (
          <span className="ml-1 px-2 py-0.5 text-xs font-bold font-mono bg-white text-emerald-800 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
