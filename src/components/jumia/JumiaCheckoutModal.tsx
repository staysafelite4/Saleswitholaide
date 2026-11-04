import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Truck, 
  CreditCard, 
  Wallet, 
  MessageCircle, 
  ShieldCheck, 
  ShoppingBag,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { CartItem, OrderRecord, DeliveryAddress } from '../../types/jumia';
import { NIGERIAN_STATES } from '../../data/jumiaProducts';

interface JumiaCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  voucherDiscount: number;
  onCompleteOrder: (order: OrderRecord) => void;
}

export const JumiaCheckoutModal: React.FC<JumiaCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  voucherDiscount,
  onCompleteOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'address' | 'delivery' | 'payment' | 'success'>('address');
  
  // Address State
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    phoneNumber: '',
    additionalPhone: '',
    deliveryAddress: '',
    state: NIGERIAN_STATES[0].name,
    lga: NIGERIAN_STATES[0].lgas[0]
  });

  const [deliveryType, setDeliveryType] = useState<'door_delivery' | 'station_pickup'>('door_delivery');
  const [paymentMethod, setPaymentMethod] = useState<'pay_on_delivery' | 'card_transfer' | 'whatsapp'>('pay_on_delivery');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const selectedStateObj = NIGERIAN_STATES.find(s => s.name === address.state) || NIGERIAN_STATES[0];
  
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'door_delivery' ? selectedStateObj.expressFee : selectedStateObj.standardFee;
  const isFreeDelivery = subtotal >= 50000;
  const actualDeliveryFee = isFreeDelivery ? 0 : deliveryFee;
  const grandTotal = Math.max(0, subtotal + actualDeliveryFee - voucherDiscount);

  const handleStateChange = (stateName: string) => {
    const matched = NIGERIAN_STATES.find(s => s.name === stateName);
    setAddress(prev => ({
      ...prev,
      state: stateName,
      lga: matched ? matched.lgas[0] : ''
    }));
  };

  const handleProceedFromAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phoneNumber || !address.deliveryAddress) {
      alert('Please fill in your name, phone number, and delivery street address.');
      return;
    }
    setStep('delivery');
  };

  const handlePlaceOrder = () => {
    const orderId = `JUM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderRecord = {
      orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: address.fullName,
      phoneNumber: address.phoneNumber,
      state: address.state,
      lga: address.lga,
      deliveryAddress: address.deliveryAddress,
      items: items.map(it => ({
        productId: it.product.id,
        productName: it.product.name,
        quantity: it.quantity,
        price: it.product.price,
        image: it.product.image
      })),
      subtotal,
      deliveryFee: actualDeliveryFee,
      discount: voucherDiscount,
      total: grandTotal,
      deliveryType,
      paymentMethod,
      status: 'Confirmed'
    };

    setCreatedOrder(newOrder);
    onCompleteOrder(newOrder);
    setStep('success');

    // If WhatsApp payment selected, open WhatsApp chat with order payload
    if (paymentMethod === 'whatsapp') {
      const itemsList = items.map(it => `• ${it.quantity}x ${it.product.name} ($${(it.product.price * it.quantity).toLocaleString()} CAD)`).join('\n');
      const waText = encodeURIComponent(
        `🛍️ *NEW JUMIA KITCHEN ORDER*\n` +
        `*Order ID:* ${orderId}\n\n` +
        `*Customer Name:* ${address.fullName}\n` +
        `*Phone:* ${address.phoneNumber}\n` +
        `*Delivery Address:* ${address.deliveryAddress}, ${address.lga}, ${address.state}\n` +
        `*Delivery Type:* ${deliveryType === 'door_delivery' ? 'Express Door Delivery' : 'Pickup Station'}\n\n` +
        `*ITEMS ORDERED:*\n${itemsList}\n\n` +
        `*Subtotal:* $${subtotal.toLocaleString()} CAD\n` +
        `*Delivery Fee:* $${actualDeliveryFee.toLocaleString()} CAD\n` +
        (voucherDiscount > 0 ? `*Discount:* -$${voucherDiscount.toLocaleString()} CAD\n` : '') +
        `*GRAND TOTAL:* $${grandTotal.toLocaleString()} CAD\n` +
        `*Payment Choice:* WhatsApp Instant Confirmation`
      );
      window.open(`https://wa.me/2348030795206?text=${waText}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-auto overflow-hidden animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">JUMIA</span>
            <span className="text-xs bg-[#F68B1E] text-white px-2 py-0.5 rounded font-bold uppercase">
              CHECKOUT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        {step !== 'success' && (
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${step === 'address' ? 'text-[#F68B1E] font-bold' : 'text-stone-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'address' ? 'bg-[#F68B1E] text-white' : 'bg-stone-200'}`}>1</span>
              <span>1. Customer Address</span>
            </div>
            <div className="w-8 h-px bg-stone-300"></div>
            <div className={`flex items-center gap-1.5 ${step === 'delivery' ? 'text-[#F68B1E] font-bold' : 'text-stone-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'delivery' ? 'bg-[#F68B1E] text-white' : 'bg-stone-200'}`}>2</span>
              <span>2. Delivery Mode</span>
            </div>
            <div className="w-8 h-px bg-stone-300"></div>
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#F68B1E] font-bold' : 'text-stone-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#F68B1E] text-white' : 'bg-stone-200'}`}>3</span>
              <span>3. Payment Method</span>
            </div>
          </div>
        )}

        {/* Step 1: Address Form */}
        {step === 'address' && (
          <form onSubmit={handleProceedFromAddress} className="p-5 sm:p-6 space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F68B1E]" />
              <span>Customer & Delivery Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Adebayo"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#F68B1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone Number (for Courier Call) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0801 234 5678"
                  value={address.phoneNumber}
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#F68B1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  State *
                </label>
                <select
                  value={address.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#F68B1E] bg-white"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st.name} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City / Local Government Area (LGA) *
                </label>
                <select
                  value={address.lga}
                  onChange={(e) => setAddress({ ...address, lga: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#F68B1E] bg-white"
                >
                  {selectedStateObj.lgas.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Street Address / Landmark (Flat, House No, Street) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Flat 4B, Plot 12 Admiralty Way, Lekki Phase 1, Near Ebeano Supermarket"
                value={address.deliveryAddress}
                onChange={(e) => setAddress({ ...address, deliveryAddress: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:border-[#F68B1E]"
              ></textarea>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Total to pay: <strong className="text-stone-900 font-bold">₦{grandTotal.toLocaleString()}</strong>
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Continue to Delivery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Delivery Option */}
        {step === 'delivery' && (
          <div className="p-5 sm:p-6 space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#F68B1E]" />
              <span>Choose Delivery Method</span>
            </h3>

            <div className="space-y-3">
              {/* Option 1: Door Delivery */}
              <div
                onClick={() => setDeliveryType('door_delivery')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'door_delivery'
                    ? 'border-[#F68B1E] bg-amber-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryType === 'door_delivery' ? 'border-[#F68B1E]' : 'border-stone-400'
                  }`}>
                    {deliveryType === 'door_delivery' && <div className="w-2 h-2 rounded-full bg-[#F68B1E]" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-900">Jumia Express Door Delivery</span>
                      <span className="bg-[#F68B1E] text-white text-[9px] font-black px-1.5 py-0.2 rounded">FASTEST</span>
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      {isFreeDelivery ? 'FREE' : `₦${selectedStateObj.expressFee.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Delivered directly to your door in {selectedStateObj.deliveryDays}. Direct phone coordination by rider.
                  </p>
                </div>
              </div>

              {/* Option 2: Pickup Station */}
              <div
                onClick={() => setDeliveryType('station_pickup')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'station_pickup'
                    ? 'border-[#F68B1E] bg-amber-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryType === 'station_pickup' ? 'border-[#F68B1E]' : 'border-stone-400'
                  }`}>
                    {deliveryType === 'station_pickup' && <div className="w-2 h-2 rounded-full bg-[#F68B1E]" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">Jumia Pickup Station (LGA Hub)</span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      ₦{selectedStateObj.standardFee.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Pickup conveniently from designated Jumia Station in {address.lga}, {address.state}.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setStep('address')}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold rounded flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep('payment')}
                className="px-6 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold rounded uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 'payment' && (
          <div className="p-5 sm:p-6 space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#F68B1E]" />
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-3">
              {/* Option 1: Pay on Delivery */}
              <div
                onClick={() => setPaymentMethod('pay_on_delivery')}
                className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'pay_on_delivery'
                    ? 'border-[#F68B1E] bg-amber-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'pay_on_delivery' ? 'border-[#F68B1E]' : 'border-stone-400'
                  }`}>
                    {paymentMethod === 'pay_on_delivery' && <div className="w-2 h-2 rounded-full bg-[#F68B1E]" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs sm:text-sm text-stone-900">Pay On Delivery (Cash or POS)</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Inspect your kitchen utensils upon delivery before paying cash or card with POS.
                  </p>
                </div>
              </div>

              {/* Option 2: Card / Bank Transfer */}
              <div
                onClick={() => setPaymentMethod('card_transfer')}
                className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'card_transfer'
                    ? 'border-[#F68B1E] bg-amber-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'card_transfer' ? 'border-[#F68B1E]' : 'border-stone-400'
                  }`}>
                    {paymentMethod === 'card_transfer' && <div className="w-2 h-2 rounded-full bg-[#F68B1E]" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs sm:text-sm text-stone-900">JumiaPay / Debit Card & Bank Transfer</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Pay securely with Mastercard, Visa, Verve, or direct bank transfer.
                  </p>
                </div>
              </div>

              {/* Option 3: WhatsApp Checkout */}
              <div
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'whatsapp'
                    ? 'border-[#F68B1E] bg-amber-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'whatsapp' ? 'border-[#F68B1E]' : 'border-stone-400'
                  }`}>
                    {paymentMethod === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-[#F68B1E]" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-xs sm:text-sm text-stone-900">Direct WhatsApp Order Confirmation</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Sends your full item list and address directly to our WhatsApp agent for instant receipt.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Price Breakdown Box */}
            <div className="bg-stone-50 p-3.5 rounded border border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({items.length} items)</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee ({address.state})</span>
                <span>{actualDeliveryFee === 0 ? 'FREE' : `₦${actualDeliveryFee.toLocaleString()}`}</span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-₦{voucherDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-black text-sm pt-2 border-t border-stone-200">
                <span>Total Amount Due</span>
                <span className="text-[#F68B1E]">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setStep('delivery')}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold rounded flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-black rounded uppercase tracking-wider shadow-md transition-transform active:scale-95"
              >
                CONFIRM & COMPLETE VIA WHATSAPP
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Success Screen */}
        {step === 'success' && createdOrder && (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Thank You! Your Order is Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Order <strong className="text-stone-900 font-mono font-bold">{createdOrder.orderId}</strong> has been successfully placed. Our dispatch rider will contact you on <strong>{createdOrder.phoneNumber}</strong>.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Order Number:</span>
                <span className="font-mono font-bold text-stone-900">{createdOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-900 text-right max-w-[240px] truncate">
                  {createdOrder.deliveryAddress}, {createdOrder.lga}, {createdOrder.state}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">{selectedStateObj.deliveryDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-medium text-stone-900 uppercase">{createdOrder.paymentMethod.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-900 font-bold">
                <span>Total Amount:</span>
                <span className="text-[#F68B1E]">₦{createdOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold rounded uppercase tracking-wider"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
