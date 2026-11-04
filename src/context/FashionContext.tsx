import React, { createContext, useContext, useState, useEffect } from 'react';
import { Garment, BoutiqueConfig, BoutiqueOrder, PrivateFittingBooking, GarmentAvailability } from '../types/fashion';
import {
  INITIAL_GARMENTS,
  INITIAL_BOUTIQUE_CONFIG,
  INITIAL_BOUTIQUE_ORDERS,
  INITIAL_FITTINGS_BOOKINGS
} from '../data/initialFashionData';

export interface BagItem {
  id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image?: string;
  fabric?: string;
}

export type ShippingTier = 'lagos_express' | 'nationwide' | 'international';

interface FashionContextType {
  config: BoutiqueConfig;
  garments: Garment[];
  orders: BoutiqueOrder[];
  fittings: PrivateFittingBooking[];
  bag: BagItem[];
  bagCount: number;
  bagSubtotal: number;
  selectedShippingTier: ShippingTier;
  setSelectedShippingTier: (tier: ShippingTier) => void;
  bagShippingFee: number;
  bagTotal: number;
  isBagOpen: boolean;
  isAdminOpen: boolean;
  isAdminAuth: boolean;
  activeAdminTab: string;
  selectedGarmentForModal: Garment | null;
  setSelectedGarmentForModal: (g: Garment | null) => void;
  isFittingModalOpen: boolean;
  setIsFittingModalOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  setIsBagOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAdminAuth: (auth: boolean) => void;
  setActiveAdminTab: (tab: string) => void;
  updateConfig: (updates: Partial<BoutiqueConfig>) => void;
  updateGarment: (id: string, updates: Partial<Garment>) => void;
  addGarment: (garment: Omit<Garment, 'id'>) => void;
  deleteGarment: (id: string) => void;
  toggleGarmentAvailability: (id: string, availability: GarmentAvailability) => void;
  updateGarmentPrice: (id: string, price: number, compareAtPrice?: number) => void;
  addToBag: (garment: Garment, size: string, color: string, quantity?: number) => void;
  removeFromBag: (index: number) => void;
  updateBagQuantity: (index: number, quantity: number) => void;
  clearBag: () => void;
  submitBoutiqueOrder: (client: {
    name: string;
    phone: string;
    address: string;
    payment: string;
    notes?: string;
    giftNote?: string;
  }) => { orderId: string; whatsappUrl: string; formattedMessage: string };
  submitFittingBooking: (booking: {
    clientName: string;
    clientPhone: string;
    email?: string;
    preferredDate: string;
    preferredTime: string;
    fittingType: 'in_atelier' | 'virtual_concierge';
    garmentInterests: string[];
    measurementsNotes?: string;
  }) => { bookingId: string; whatsappUrl: string; formattedMessage: string };
  updateOrderStatus: (id: string, status: BoutiqueOrder['status']) => void;
  updateFittingStatus: (id: string, status: PrivateFittingBooking['status']) => void;
  formatCurrency: (amount: number) => string;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => { success: boolean; error?: string };
}

const STORAGE_KEYS = {
  CONFIG: 'aura_boutique_config_v3',
  GARMENTS: 'aura_boutique_garments_v3',
  ORDERS: 'aura_boutique_orders_v3',
  FITTINGS: 'aura_boutique_fittings_v3'
};

const FashionContext = createContext<FashionContextType | null>(null);

export const FashionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BoutiqueConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return stored ? JSON.parse(stored) : INITIAL_BOUTIQUE_CONFIG;
    } catch {
      return INITIAL_BOUTIQUE_CONFIG;
    }
  });

  const [garments, setGarments] = useState<Garment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GARMENTS);
      return stored ? JSON.parse(stored) : INITIAL_GARMENTS;
    } catch {
      return INITIAL_GARMENTS;
    }
  });

  const [orders, setOrders] = useState<BoutiqueOrder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_BOUTIQUE_ORDERS;
    } catch {
      return INITIAL_BOUTIQUE_ORDERS;
    }
  });

  const [fittings, setFittings] = useState<PrivateFittingBooking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FITTINGS);
      return stored ? JSON.parse(stored) : INITIAL_FITTINGS_BOOKINGS;
    } catch {
      return INITIAL_FITTINGS_BOOKINGS;
    }
  });

  const [bag, setBag] = useState<BagItem[]>([]);
  const [selectedShippingTier, setSelectedShippingTier] = useState<ShippingTier>('lagos_express');
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('pricing');
  const [selectedGarmentForModal, setSelectedGarmentForModal] = useState<Garment | null>(null);
  const [isFittingModalOpen, setIsFittingModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GARMENTS, JSON.stringify(garments));
  }, [garments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FITTINGS, JSON.stringify(fittings));
  }, [fittings]);

  const bagCount = bag.reduce((acc, i) => acc + i.quantity, 0);
  const bagSubtotal = bag.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Calculate shipping fee based on selected tier and free shipping threshold
  let bagShippingFee = 0;
  if (bagSubtotal > 0) {
    if (selectedShippingTier === 'lagos_express') {
      bagShippingFee = bagSubtotal >= (config.freeShippingThreshold || 50000) ? 0 : (config.baseShippingFee || 2500);
    } else if (selectedShippingTier === 'nationwide') {
      bagShippingFee = config.nationwideShippingFee || 4500;
    } else if (selectedShippingTier === 'international') {
      bagShippingFee = config.internationalShippingFee || 18000;
    }
  }
  const bagTotal = bagSubtotal + bagShippingFee;

  const formatCurrency = (amount: number): string => {
    const symbol = config.currencySymbol || '$';
    return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
  };

  const updateConfig = (updates: Partial<BoutiqueConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateGarment = (id: string, updates: Partial<Garment>) => {
    setGarments(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
  };

  const addGarment = (garmentData: Omit<Garment, 'id'>) => {
    const newG: Garment = {
      ...garmentData,
      id: `garment_${Date.now()}`
    };
    setGarments(prev => [newG, ...prev]);
  };

  const deleteGarment = (id: string) => {
    setGarments(prev => prev.filter(g => g.id !== id));
  };

  const toggleGarmentAvailability = (id: string, availability: GarmentAvailability) => {
    setGarments(prev => prev.map(g => (g.id === id ? { ...g, availability } : g)));
  };

  const updateGarmentPrice = (id: string, price: number, compareAtPrice?: number) => {
    setGarments(prev =>
      prev.map(g => (g.id === id ? { ...g, price, compareAtPrice: compareAtPrice || undefined } : g))
    );
  };

  const addToBag = (garment: Garment, size: string, color: string, quantity = 1) => {
    setBag(prev => {
      const matchIndex = prev.findIndex(
        i => i.id === garment.id && i.size === size && i.color === color
      );
      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: garment.id,
          name: garment.name,
          size,
          color,
          quantity,
          price: garment.price,
          image: garment.image,
          fabric: garment.fabric
        }
      ];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (index: number) => {
    setBag(prev => prev.filter((_, i) => i !== index));
  };

  const updateBagQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(index);
      return;
    }
    setBag(prev => prev.map((item, i) => (i === index ? { ...item, quantity } : item)));
  };

  const clearBag = () => setBag([]);

  const submitBoutiqueOrder = (client: {
    name: string;
    phone: string;
    address: string;
    payment: string;
    notes?: string;
    giftNote?: string;
  }) => {
    const orderId = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const shippingLabels: Record<ShippingTier, string> = {
      lagos_express: 'Lagos Island & Mainland Express Courier',
      nationwide: 'Nationwide Priority Courier (Abuja, PH, Ibadan, etc.)',
      international: 'International DHL Express (UK, US, Canada, UAE)'
    };

    const newOrder: BoutiqueOrder = {
      id: orderId,
      clientName: client.name,
      clientPhone: client.phone,
      shippingAddress: client.address,
      shippingOption: shippingLabels[selectedShippingTier],
      paymentMethod: client.payment,
      notes: client.notes,
      giftNote: client.giftNote,
      items: [...bag],
      subtotal: bagSubtotal,
      shippingFee: bagShippingFee,
      total: bagTotal,
      status: 'pending',
      timestamp
    };

    setOrders(prev => [newOrder, ...prev]);

    const lines = [
      `✨ *BOUTIQUE ORDER SLIP: #${orderId}*`,
      `*${config.brandName}* — Atelier Concierge`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${client.name}`,
      `📞 *WhatsApp / Phone:* ${client.phone}`,
      `📍 *Delivery Address:* ${client.address}`,
      `🚚 *Courier Service:* ${shippingLabels[selectedShippingTier]}`,
      `💳 *Payment Method:* ${client.payment}`,
      client.notes ? `✂️ *Bespoke Tailoring Note:* ${client.notes}` : '',
      client.giftNote ? `🎁 *Gift Calligraphy Card Note:* "${client.giftNote}"` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👗 *CURATED PIECES:*`,
      ...bag.map(
        (item, idx) =>
          `${idx + 1}. *${item.name}*\n   • Size: ${item.size} | Color: ${item.color}\n   • Quantity: ${item.quantity} × ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}`
      ),
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Garments Subtotal: ${formatCurrency(bagSubtotal)}`,
      `Courier Delivery Fee: ${bagShippingFee === 0 ? 'COMPLIMENTARY (FREE)' : formatCurrency(bagShippingFee)}`,
      `*TOTAL ORDER VALUE:* *${formatCurrency(bagTotal)}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm receipt of this order and send bank transfer account details. Thank you!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = (config.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    return { orderId, whatsappUrl, formattedMessage };
  };

  const submitFittingBooking = (bookingData: {
    clientName: string;
    clientPhone: string;
    email?: string;
    preferredDate: string;
    preferredTime: string;
    fittingType: 'in_atelier' | 'virtual_concierge';
    garmentInterests: string[];
    measurementsNotes?: string;
  }) => {
    const bookingId = `FIT-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newBooking: PrivateFittingBooking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      timestamp
    };

    setFittings(prev => [newBooking, ...prev]);

    const lines = [
      `🥂 *PRIVATE ATELIER FITTING RESERVATION: #${bookingId}*`,
      `*${config.brandName}* — ${config.atelierAddress}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${bookingData.clientName}`,
      `📞 *Phone / WhatsApp:* ${bookingData.clientPhone}`,
      bookingData.email ? `✉️ *Email:* ${bookingData.email}` : '',
      `📅 *Preferred Date:* ${bookingData.preferredDate}`,
      `⏰ *Preferred Time:* ${bookingData.preferredTime}`,
      `✨ *Experience:* ${bookingData.fittingType === 'in_atelier' ? 'Lekki Showroom VIP Fitting (Complimentary Champagne & Stylist)' : 'Virtual Video Styling Session'}`,
      bookingData.garmentInterests.length > 0 ? `👗 *Garments of Interest:* ${bookingData.garmentInterests.join(', ')}` : '',
      bookingData.measurementsNotes ? `📏 *Custom Measurements / Notes:* ${bookingData.measurementsNotes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm slot availability for my atelier private consultation. Thank you!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = (config.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    return { bookingId, whatsappUrl, formattedMessage };
  };

  const updateOrderStatus = (id: string, status: BoutiqueOrder['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const updateFittingStatus = (id: string, status: PrivateFittingBooking['status']) => {
    setFittings(prev => prev.map(f => (f.id === id ? { ...f, status } : f)));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_BOUTIQUE_CONFIG);
    setGarments(INITIAL_GARMENTS);
    setOrders(INITIAL_BOUTIQUE_ORDERS);
    setFittings(INITIAL_FITTINGS_BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.GARMENTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.FITTINGS);
  };

  const exportData = (): string => {
    return JSON.stringify({ config, garments, orders, fittings }, null, 2);
  };

  const importData = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.config) setConfig(data.config);
      if (Array.isArray(data.garments)) setGarments(data.garments);
      if (Array.isArray(data.orders)) setOrders(data.orders);
      if (Array.isArray(data.fittings)) setFittings(data.fittings);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Invalid format' };
    }
  };

  return (
    <FashionContext.Provider
      value={{
        config,
        garments,
        orders,
        fittings,
        bag,
        bagCount,
        bagSubtotal,
        selectedShippingTier,
        setSelectedShippingTier,
        bagShippingFee,
        bagTotal,
        isBagOpen,
        isAdminOpen,
        isAdminAuth,
        activeAdminTab,
        selectedGarmentForModal,
        setSelectedGarmentForModal,
        isFittingModalOpen,
        setIsFittingModalOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        setIsBagOpen,
        setIsAdminOpen,
        setIsAdminAuth,
        setActiveAdminTab,
        updateConfig,
        updateGarment,
        addGarment,
        deleteGarment,
        toggleGarmentAvailability,
        updateGarmentPrice,
        addToBag,
        removeFromBag,
        updateBagQuantity,
        clearBag,
        submitBoutiqueOrder,
        submitFittingBooking,
        updateOrderStatus,
        updateFittingStatus,
        formatCurrency,
        resetToDefaults,
        exportData,
        importData
      }}
    >
      {children}
    </FashionContext.Provider>
  );
};

export const useFashion = () => {
  const context = useContext(FashionContext);
  if (!context) {
    throw new Error('useFashion must be used within a FashionProvider');
  }
  return context;
};
