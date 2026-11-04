import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteConfig, CartItem, OrderLog, ProductAvailability } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SITE_CONFIG, INITIAL_ORDERS } from '../data/initialData';

export type CurrencyCode = 'CAD' | 'USD' | 'GBP';

export const CURRENCY_INFO: Record<CurrencyCode, { symbol: string; code: CurrencyCode; rate: number; flag: string; name: string }> = {
  CAD: { symbol: '$', code: 'CAD', rate: 1.0, flag: '🇨🇦', name: 'Canadian Dollar' },
  USD: { symbol: '$', code: 'USD', rate: 0.74, flag: '🇺🇸', name: 'US Dollar' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.58, flag: '🇬🇧', name: 'British Pound' }
};

interface StoreContextType {
  siteConfig: SiteConfig;
  products: Product[];
  orders: OrderLog[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  isAdminOpen: boolean;
  isAdminAuthenticated: boolean;
  activeAdminTab: string;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAdminAuthenticated: (auth: boolean) => void;
  setActiveAdminTab: (tab: string) => void;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (product: Omit<Product, 'id' | 'salesCount'>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string, availability: ProductAvailability) => void;
  updateProductPrice: (id: string, price: number, compareAtPrice?: number) => void;
  addToCart: (product: Product, quantity?: number, sweetness?: string, temp?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  submitWhatsAppOrder: (customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
    date?: string;
    time?: string;
    payment: string;
  }) => { orderId: string; whatsappUrl: string; formattedMessage: string };
  updateOrderStatus: (orderId: string, status: OrderLog['status']) => void;
  formatCurrency: (amountCAD: number, overrideCurrency?: CurrencyCode) => string;
  getConvertedAmount: (amountCAD: number, overrideCurrency?: CurrencyCode) => number;
  resetToDefaults: () => void;
  exportSiteData: () => string;
  importSiteData: (jsonStr: string) => { success: boolean; error?: string };
}

const STORAGE_KEYS = {
  CONFIG: 'zobowellness_config_v3',
  PRODUCTS: 'zobowellness_products_v3',
  ORDERS: 'zobowellness_orders_v3',
  CURRENCY: 'zobowellness_currency_v3'
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.brandName || parsed.brandName.includes('Crimson') || parsed.brandName === 'Crimson Botanics') {
          return INITIAL_SITE_CONFIG;
        }
        return parsed;
      }
      return INITIAL_SITE_CONFIG;
    } catch (e) {
      console.warn('Failed to parse stored site config', e);
      return INITIAL_SITE_CONFIG;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch (e) {
      console.warn('Failed to parse stored products', e);
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<OrderLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch (e) {
      console.warn('Failed to parse stored orders', e);
      return INITIAL_ORDERS;
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENCY) as CurrencyCode;
      return (stored && CURRENCY_INFO[stored]) ? stored : 'CAD';
    } catch (e) {
      return 'CAD';
    }
  });

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
    } catch (e) {
      console.error('Failed to save currency choice', e);
    }
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Pricing & Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDeliveryFee =
    cartSubtotal >= (siteConfig.freeDeliveryThreshold || 50) || cartSubtotal === 0
      ? 0
      : siteConfig.deliveryBaseFee || 5;
  const cartTotal = cartSubtotal + cartDeliveryFee;

  const getConvertedAmount = (amountCAD: number, overrideCurrency?: CurrencyCode): number => {
    const target = overrideCurrency || currency;
    const rate = CURRENCY_INFO[target]?.rate || 1.0;
    return amountCAD * rate;
  };

  const formatCurrency = (amountCAD: number, overrideCurrency?: CurrencyCode): string => {
    const target = overrideCurrency || currency;
    const info = CURRENCY_INFO[target] || CURRENCY_INFO.CAD;
    const converted = amountCAD * info.rate;
    
    // Format nicely
    const valString = converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${info.symbol}${valString} ${info.code}`;
  };

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...updates }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'salesCount'>) => {
    const newId = `prod_${Date.now()}`;
    const newProduct: Product = {
      ...newProductData,
      id: newId,
      salesCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(c => c.product.id !== id));
  };

  const toggleProductAvailability = (id: string, availability: ProductAvailability) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, availability } : p)));
  };

  const updateProductPrice = (id: string, price: number, compareAtPrice?: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, price, compareAtPrice: compareAtPrice || undefined } : p))
    );
  };

  const addToCart = (product: Product, quantity = 1, sweetness?: string, temp = 'Ice Cold') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedSweetness: sweetness || next[existingIndex].selectedSweetness,
          temperaturePreference: temp || next[existingIndex].temperaturePreference
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSweetness: sweetness || product.sweetness,
          temperaturePreference: temp
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitWhatsAppOrder = (customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
    date?: string;
    time?: string;
    payment: string;
  }) => {
    const orderNumber = `ZB-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const orderItems = cart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      size: item.product.size,
      quantity: item.quantity,
      price: item.product.price,
      selectedSweetness: item.selectedSweetness,
      temperaturePreference: item.temperaturePreference
    }));

    const newOrder: OrderLog = {
      id: orderNumber,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: customer.address,
      deliveryNotes: customer.notes,
      deliveryDate: customer.date || 'Today',
      preferredTime: customer.time || 'Earliest available',
      paymentMethod: customer.payment,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      totalAmount: cartTotal,
      status: 'pending_whatsapp',
      timestamp
    };

    setOrders(prev => [newOrder, ...prev]);

    // Format clean, professional WhatsApp message with explicit CAD prices
    const lines = [
      `🌺 *NEW ORDER: #${orderNumber}*`,
      `*${siteConfig.brandName}*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer:* ${customer.name}`,
      `📞 *Phone:* ${customer.phone}`,
      `📍 *Delivery Address:* ${customer.address}`,
      customer.notes ? `📝 *Notes/Gate code:* ${customer.notes}` : '',
      `🗓 *Delivery:* ${customer.date || 'Today'} (${customer.time || 'Prompt delivery'})`,
      `💳 *Payment Method:* ${customer.payment}`,
      `━━━━━━━━━━━━━━━━━━`,
      `🛒 *ORDER DETAILS (in CAD):*`,
      ...cart.map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (${item.product.size})\n   • Qty: ${item.quantity} × ${formatCurrency(item.product.price, 'CAD')} = ${formatCurrency(item.quantity * item.product.price, 'CAD')}\n   • Prep: ${item.temperaturePreference || 'Ice Cold'}, ${item.selectedSweetness || 'Standard'}`
      ),
      `━━━━━━━━━━━━━━━━━━`,
      `Subtotal: ${formatCurrency(cartSubtotal, 'CAD')}` + (currency !== 'CAD' ? ` (${formatCurrency(cartSubtotal, currency)})` : ''),
      `Delivery Fee: ${cartDeliveryFee === 0 ? 'FREE' : formatCurrency(cartDeliveryFee, 'CAD')}`,
      `*TOTAL DUE:* *${formatCurrency(cartTotal, 'CAD')}*` + (currency !== 'CAD' ? ` (${formatCurrency(cartTotal, currency)})` : ''),
      `━━━━━━━━━━━━━━━━━━`,
      `✨ Please confirm availability & payment instructions to complete. Thank you!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');

    // Clean phone number: remove non-digits
    const cleanPhone = (siteConfig.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    return {
      orderId: orderNumber,
      whatsappUrl,
      formattedMessage
    };
  };

  const updateOrderStatus = (orderId: string, status: OrderLog['status']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  const resetToDefaults = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCurrencyState('CAD');
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENCY);
  };

  const exportSiteData = (): string => {
    const payload = {
      version: 2,
      exportDate: new Date().toISOString(),
      siteConfig,
      products,
      orders,
      currency
    };
    return JSON.stringify(payload, null, 2);
  };

  const importSiteData = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.siteConfig) setSiteConfig(data.siteConfig);
      if (Array.isArray(data.products)) setProducts(data.products);
      if (Array.isArray(data.orders)) setOrders(data.orders);
      if (data.currency && CURRENCY_INFO[data.currency as CurrencyCode]) setCurrency(data.currency as CurrencyCode);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Invalid JSON format' };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        siteConfig,
        products,
        orders,
        cart,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        isCartOpen,
        isAdminOpen,
        isAdminAuthenticated,
        activeAdminTab,
        currency,
        setCurrency,
        setIsCartOpen,
        setIsAdminOpen,
        setIsAdminAuthenticated,
        setActiveAdminTab,
        updateSiteConfig,
        updateProduct,
        addProduct,
        deleteProduct,
        toggleProductAvailability,
        updateProductPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitWhatsAppOrder,
        updateOrderStatus,
        formatCurrency,
        getConvertedAmount,
        resetToDefaults,
        exportSiteData,
        importSiteData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
