import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatCurrency,
    siteConfig,
    submitWhatsAppOrder
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Today');
  const [preferredTime, setPreferredTime] = useState('Afternoon (1:00 PM - 4:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState('Instant Bank Transfer');
  const [showPreview, setShowPreview] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ id: string; url: string; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = siteConfig.freeDeliveryThreshold || 20000;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter your WhatsApp phone number');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please enter your delivery address / street');
      return;
    }

    setFormError('');
    const result = submitWhatsAppOrder({
      name: customerName,
      phone: customerPhone,
      address: deliveryAddress,
      notes: deliveryNotes,
      date: deliveryDate,
      time: preferredTime,
      payment: paymentMethod
    });

    setOrderSuccess({
      id: result.orderId,
      url: result.whatsappUrl,
      msg: result.formattedMessage
    });

    // Launch WhatsApp
    window.open(result.whatsappUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (!orderSuccess) return;
    navigator.clipboard.writeText(orderSuccess.msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetFormAndClose = () => {
    setOrderSuccess(null);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FAF7F2] text-stone-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#720026]" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Your Chilled Order
              </h2>
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderSuccess ? (
              /* Success / Order Confirmation View */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    Order Registered
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                    Order #{orderSuccess.id} Ready
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 max-w-xs mx-auto">
                    We've opened WhatsApp to send your itemized order directly to {siteConfig.brandName}.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">Formatted Order Text:</span>
                    <button
                      onClick={handleCopyMessage}
                      className="text-xs flex items-center gap-1 text-[#720026] hover:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] text-stone-600 bg-stone-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono max-h-48">
                    {orderSuccess.msg}
                  </pre>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={orderSuccess.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Again</span>
                  </a>

                  <button
                    onClick={resetFormAndClose}
                    className="w-full py-2.5 px-4 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Done & Return to Store
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse our fresh spiced bottles and party kegs to start an order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg transition-colors cursor-pointer"
                >
                  Explore Drinks
                </button>
              </div>
            ) : (
              /* Items & Checkout Form */
              <div className="space-y-6">
                {/* Free Delivery Tracker */}
                {cartSubtotal < freeDeliveryThreshold ? (
                  <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
                    <span>
                      Add <strong>{formatCurrency(remainingForFree)}</strong> more for <strong>FREE Chilled Delivery</strong>
                    </span>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You've unlocked FREE chilled courier delivery!</span>
                  </div>
                )}

                {/* Cart Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-xl border border-stone-200/80 p-3.5 flex gap-3 items-center shadow-2xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-stone-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {item.product.size} · {item.temperaturePreference || 'Ice Cold'}
                        </p>
                        <p className="font-mono text-xs font-semibold text-stone-800 tabular-nums mt-1">
                          {formatCurrency(item.product.price)} each
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery & Customer Checkout Details */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Delivery Details for WhatsApp
                    </h3>
                    <span className="text-[11px] text-[#720026]">*Required</span>
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adebayo Ogunlesi"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0801 234 5678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Delivery Address & City *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="e.g. 24 Admiralty Way, Lekki Phase 1, Lagos"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Delivery Date
                        </label>
                        <select
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        >
                          <option value="Today (Chilled Dispatch)">Today (Chilled)</option>
                          <option value="Tomorrow Morning">Tomorrow Morning</option>
                          <option value="Weekend Special">This Weekend</option>
                          <option value="Event Pre-order">Upcoming Event Date</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Payment Preference
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        >
                          <option value="Instant Bank Transfer">Instant Bank Transfer</option>
                          <option value="POS Card on Delivery">POS on Delivery</option>
                          <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Gate Code / Extra Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Call when outside estate gate, extra cold please"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer Totals & WhatsApp CTA */}
          {!orderSuccess && cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-stone-900">
                    {formatCurrency(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Chilled Courier Dispatch</span>
                  <span className="font-mono tabular-nums font-medium text-stone-900">
                    {cartDeliveryFee === 0 ? 'FREE' : formatCurrency(cartDeliveryFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-bold text-stone-900">
                  <span>Total Order Due</span>
                  <span className="font-mono text-base text-[#720026] tabular-nums">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Complete via WhatsApp ({formatCurrency(cartTotal)})</span>
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Direct to {siteConfig.brandName} WhatsApp · Order confirmed instantly
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
