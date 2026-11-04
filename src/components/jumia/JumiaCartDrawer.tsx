import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck,
  Check
} from 'lucide-react';
import { CartItem } from '../../types/jumia';

interface JumiaCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  voucherCode: string;
  onApplyVoucher: (code: string) => boolean;
  voucherDiscount: number;
}

export const JumiaCartDrawer: React.FC<JumiaCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  voucherCode,
  onApplyVoucher,
  voucherDiscount
}) => {
  const [couponInput, setCouponInput] = useState(voucherCode);
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFree = Math.max(0, freeShippingThreshold - subtotal);
  const estShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 1200;
  const finalTotal = Math.max(0, subtotal + estShipping - voucherDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyVoucher(couponInput.trim());
    if (ok) {
      setCouponMsg({ text: 'Voucher applied! Saved ₦1,500', success: true });
    } else {
      setCouponMsg({ text: 'Invalid code. Try "JUMIAKITCHEN"', success: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F68B1E]" />
              <h2 className="text-base font-extrabold tracking-wide uppercase">
                Shopping Cart ({items.reduce((sum, it) => sum + it.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 text-xs">
            {amountNeededForFree > 0 ? (
              <div>
                <p className="text-stone-800 font-medium">
                  Add <strong className="text-[#F68B1E]">${amountNeededForFree.toLocaleString()} CAD</strong> more to get <strong>FREE Express Delivery</strong>!
                </p>
                <div className="w-full h-1.5 bg-stone-200 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-[#F68B1E] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked FREE Express Door Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <ShoppingBag className="w-16 h-16 text-stone-300 stroke-[1.5] mb-3" />
                <h3 className="font-bold text-stone-800 text-lg">Your cart is empty!</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1 mb-4">
                  Explore our premium cookware sets, blenders, food warmers, and kitchen gadgets to fill your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#F68B1E] text-white font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-[#e07a16]"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-white rounded border border-stone-200 p-1 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-900 line-clamp-2 leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      Brand: {item.product.brand}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-black text-stone-900 text-sm">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        (${item.product.price.toLocaleString()} each)
                      </span>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter voucher code"
                    className="w-full pl-8 pr-2 py-1.5 bg-white border border-stone-300 rounded text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#F68B1E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded"
                >
                  APPLY
                </button>
              </form>
              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.success ? 'text-emerald-700 font-bold' : 'text-rose-600'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className={estShipping === 0 ? 'text-emerald-600 font-bold' : 'font-semibold text-stone-900'}>
                    {estShipping === 0 ? 'FREE' : `$${estShipping.toLocaleString()}`}
                  </span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount</span>
                    <span>-${voucherDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span className="text-[#F68B1E]">${finalTotal.toLocaleString()} CAD</span>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Utensils • Pay on Delivery available</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold text-sm rounded shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>CHECKOUT (${finalTotal.toLocaleString()} CAD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
