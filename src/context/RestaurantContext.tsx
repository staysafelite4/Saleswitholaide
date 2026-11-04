import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, RestaurantConfig, TableReservation, TakeoutOrder, DishAvailability } from '../types/restaurant';
import {
  INITIAL_DISHES,
  INITIAL_RESTAURANT_CONFIG,
  INITIAL_RESERVATIONS,
  INITIAL_TAKEOUT_ORDERS
} from '../data/initialRestaurantData';

export interface TrayItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  swallow?: string;
  protein?: string;
  side?: string;
  spiceLevel?: string;
  image?: string;
}

interface RestaurantContextType {
  config: RestaurantConfig;
  dishes: Dish[];
  reservations: TableReservation[];
  orders: TakeoutOrder[];
  tray: TrayItem[];
  trayCount: number;
  traySubtotal: number;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  trayDeliveryFee: number;
  trayTotal: number;
  isTrayOpen: boolean;
  isReservationOpen: boolean;
  isAdminOpen: boolean;
  isAdminAuth: boolean;
  activeAdminTab: string;
  selectedDishForModal: Dish | null;
  setSelectedDishForModal: (dish: Dish | null) => void;
  setIsTrayOpen: (open: boolean) => void;
  setIsReservationOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAdminAuth: (auth: boolean) => void;
  setActiveAdminTab: (tab: string) => void;
  updateConfig: (updates: Partial<RestaurantConfig>) => void;
  updateDish: (id: string, updates: Partial<Dish>) => void;
  addDish: (dish: Omit<Dish, 'id' | 'orderCount'>) => void;
  deleteDish: (id: string) => void;
  toggleDishAvailability: (id: string, availability: DishAvailability) => void;
  updateDishPrice: (id: string, price: number, compareAtPrice?: number) => void;
  addToTray: (
    dish: Dish,
    quantity?: number,
    options?: { swallow?: string; protein?: string; side?: string; spiceLevel?: string }
  ) => void;
  removeFromTray: (index: number) => void;
  updateTrayQuantity: (index: number, quantity: number) => void;
  clearTray: () => void;
  submitTakeoutOrder: (customer: {
    name: string;
    phone: string;
    address: string;
    deliveryType: 'Hot Courier Delivery' | 'Kitchen Pickup';
    zone: string;
    time: string;
    payment: string;
    notes?: string;
  }) => { orderId: string; whatsappUrl: string; formattedMessage: string };
  submitTableReservation: (reservation: {
    name: string;
    phone: string;
    date: string;
    time: string;
    partySize: string;
    seatingArea: TableReservation['seatingArea'];
    specialOccasion?: string;
    notes?: string;
  }) => { resId: string; whatsappUrl: string; formattedMessage: string };
  updateOrderStatus: (id: string, status: TakeoutOrder['status']) => void;
  updateReservationStatus: (id: string, status: TableReservation['status']) => void;
  formatCurrency: (amount: number) => string;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => { success: boolean; error?: string };
}

const STORAGE_KEYS = {
  CONFIG: 'savanna_african_restaurant_config_v3',
  DISHES: 'savanna_african_restaurant_dishes_v3',
  RESERVATIONS: 'savanna_african_restaurant_reservations_v3',
  ORDERS: 'savanna_african_restaurant_orders_v3'
};

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<RestaurantConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return stored ? JSON.parse(stored) : INITIAL_RESTAURANT_CONFIG;
    } catch {
      return INITIAL_RESTAURANT_CONFIG;
    }
  });

  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISHES);
      return stored ? JSON.parse(stored) : INITIAL_DISHES;
    } catch {
      return INITIAL_DISHES;
    }
  });

  const [reservations, setReservations] = useState<TableReservation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return stored ? JSON.parse(stored) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [orders, setOrders] = useState<TakeoutOrder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_TAKEOUT_ORDERS;
    } catch {
      return INITIAL_TAKEOUT_ORDERS;
    }
  });

  const [tray, setTray] = useState<TrayItem[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('Victoria Island & Oniru');
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('pricing');
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Calculations
  const trayCount = tray.reduce((acc, i) => acc + i.quantity, 0);
  const traySubtotal = tray.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Delivery fee by zone
  const activeZoneObj = config.deliveryZones.find(z => z.zone === selectedZone);
  const zoneFee = activeZoneObj ? activeZoneObj.fee : config.baseDeliveryFee || 1500;
  const isFreeDelivery = traySubtotal >= (config.freeDeliveryThreshold || 25000);
  const trayDeliveryFee = isFreeDelivery || traySubtotal === 0 ? 0 : zoneFee;
  const trayTotal = traySubtotal + trayDeliveryFee;

  const formatCurrency = (amount: number): string => {
    const symbol = config.currencySymbol || '$';
    return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
  };

  const updateConfig = (updates: Partial<RestaurantConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateDish = (id: string, updates: Partial<Dish>) => {
    setDishes(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const addDish = (dishData: Omit<Dish, 'id' | 'orderCount'>) => {
    const newDish: Dish = {
      ...dishData,
      id: `dish_${Date.now()}`,
      orderCount: 0
    };
    setDishes(prev => [newDish, ...prev]);
  };

  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  const toggleDishAvailability = (id: string, availability: DishAvailability) => {
    setDishes(prev => prev.map(d => (d.id === id ? { ...d, availability } : d)));
  };

  const updateDishPrice = (id: string, price: number, compareAtPrice?: number) => {
    setDishes(prev =>
      prev.map(d => (d.id === id ? { ...d, price, compareAtPrice: compareAtPrice || undefined } : d))
    );
  };

  const addToTray = (
    dish: Dish,
    quantity = 1,
    options?: { swallow?: string; protein?: string; side?: string; spiceLevel?: string }
  ) => {
    setTray(prev => {
      const matchIndex = prev.findIndex(
        i =>
          i.id === dish.id &&
          i.swallow === options?.swallow &&
          i.protein === options?.protein &&
          i.side === options?.side &&
          i.spiceLevel === options?.spiceLevel
      );
      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          quantity,
          price: dish.price,
          swallow: options?.swallow,
          protein: options?.protein,
          side: options?.side,
          spiceLevel: options?.spiceLevel || dish.spiceLevel,
          image: dish.image
        }
      ];
    });
    setIsTrayOpen(true);
  };

  const removeFromTray = (index: number) => {
    setTray(prev => prev.filter((_, i) => i !== index));
  };

  const updateTrayQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromTray(index);
      return;
    }
    setTray(prev => prev.map((item, i) => (i === index ? { ...item, quantity } : item)));
  };

  const clearTray = () => setTray([]);

  const submitTakeoutOrder = (customer: {
    name: string;
    phone: string;
    address: string;
    deliveryType: 'Hot Courier Delivery' | 'Kitchen Pickup';
    zone: string;
    time: string;
    payment: string;
    notes?: string;
  }) => {
    const orderId = `BUK-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const finalFee = customer.deliveryType === 'Kitchen Pickup' ? 0 : trayDeliveryFee;
    const finalTotal = customer.deliveryType === 'Kitchen Pickup' ? traySubtotal : trayTotal;

    const newOrder: TakeoutOrder = {
      id: orderId,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: customer.address,
      deliveryZone: customer.zone,
      deliveryType: customer.deliveryType,
      preferredTime: customer.time,
      paymentMethod: customer.payment,
      notes: customer.notes,
      items: [...tray],
      subtotal: traySubtotal,
      deliveryFee: finalFee,
      total: finalTotal,
      status: 'pending',
      timestamp
    };

    setOrders(prev => [newOrder, ...prev]);

    // Format Kitchen WhatsApp Order Slip for African Food
    const lines = [
      `🍲 *NEW AFRICAN BUKKA ORDER: #${orderId}*`,
      `*${config.restaurantName}* — Kitchen Hot Takeout`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer Name:* ${customer.name}`,
      `📞 *Phone / WhatsApp:* ${customer.phone}`,
      `📍 *Delivery Destination:* ${customer.address}`,
      `🗺 *Zone:* ${customer.zone}`,
      `🚚 *Service:* ${customer.deliveryType} (${customer.time})`,
      `💳 *Payment:* ${customer.payment}`,
      customer.notes ? `📝 *Chef Special Notes:* ${customer.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🥘 *AUTHENTIC DISHES ORDERED:*`,
      ...tray.map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (x${item.quantity}) = ${formatCurrency(item.quantity * item.price)}\n   • Spice: ${item.spiceLevel || 'Standard'}${item.swallow ? `\n   • Swallow Choice: *${item.swallow}*` : ''}${item.protein ? `\n   • Protein Selection: ${item.protein}` : ''}${item.side ? `\n   • Side Add-on: ${item.side}` : ''}`
      ),
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Food Subtotal: ${formatCurrency(traySubtotal)}`,
      customer.deliveryType === 'Kitchen Pickup'
        ? `Dispatch Fee: FREE (Kitchen Pickup at ${config.kitchenAddress})`
        : `Hot Thermal Courier: ${finalFee === 0 ? 'FREE (Threshold met)' : formatCurrency(finalFee)}`,
      `*TOTAL DUE:* *${formatCurrency(finalTotal)}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👨‍🍳 Kitchen Team: Please confirm order receipt, current cooking queue & account payment details. Thank you!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = (config.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    return { orderId, whatsappUrl, formattedMessage };
  };

  const submitTableReservation = (reservation: {
    name: string;
    phone: string;
    date: string;
    time: string;
    partySize: string;
    seatingArea: TableReservation['seatingArea'];
    specialOccasion?: string;
    notes?: string;
  }) => {
    const resId = `RES-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRes: TableReservation = {
      id: resId,
      guestName: reservation.name,
      guestPhone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      partySize: reservation.partySize,
      seatingArea: reservation.seatingArea,
      specialOccasion: reservation.specialOccasion,
      notes: reservation.notes,
      status: 'pending',
      timestamp
    };

    setReservations(prev => [newRes, ...prev]);

    const lines = [
      `🥂 *AFRICAN BUKKA TABLE RESERVATION: #${resId}*`,
      `*${config.restaurantName}* — ${config.kitchenAddress}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Lead Guest:* ${reservation.name}`,
      `📞 *Phone / WhatsApp:* ${reservation.phone}`,
      `🗓 *Date & Time:* ${reservation.date} at ${reservation.time}`,
      `👥 *Party Size:* ${reservation.partySize}`,
      `🪑 *Seating Preference:* ${reservation.seatingArea}`,
      reservation.specialOccasion ? `🎉 *Occasion:* ${reservation.specialOccasion}` : '',
      reservation.notes ? `📝 *Special Pre-orders / Notes:* ${reservation.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm table reservation status with the guest.`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = (config.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    return { resId, whatsappUrl, formattedMessage };
  };

  const updateOrderStatus = (id: string, status: TakeoutOrder['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const updateReservationStatus = (id: string, status: TableReservation['status']) => {
    setReservations(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_RESTAURANT_CONFIG);
    setDishes(INITIAL_DISHES);
    setReservations(INITIAL_RESERVATIONS);
    setOrders(INITIAL_TAKEOUT_ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.DISHES);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  };

  const exportData = (): string => {
    return JSON.stringify({ config, dishes, reservations, orders }, null, 2);
  };

  const importData = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.config) setConfig(data.config);
      if (Array.isArray(data.dishes)) setDishes(data.dishes);
      if (Array.isArray(data.reservations)) setReservations(data.reservations);
      if (Array.isArray(data.orders)) setOrders(data.orders);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Invalid format' };
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        config,
        dishes,
        reservations,
        orders,
        tray,
        trayCount,
        traySubtotal,
        selectedZone,
        setSelectedZone,
        trayDeliveryFee,
        trayTotal,
        isTrayOpen,
        isReservationOpen,
        isAdminOpen,
        isAdminAuth,
        activeAdminTab,
        selectedDishForModal,
        setSelectedDishForModal,
        setIsTrayOpen,
        setIsReservationOpen,
        setIsAdminOpen,
        setIsAdminAuth,
        setActiveAdminTab,
        updateConfig,
        updateDish,
        addDish,
        deleteDish,
        toggleDishAvailability,
        updateDishPrice,
        addToTray,
        removeFromTray,
        updateTrayQuantity,
        clearTray,
        submitTakeoutOrder,
        submitTableReservation,
        updateOrderStatus,
        updateReservationStatus,
        formatCurrency,
        resetToDefaults,
        exportData,
        importData
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
