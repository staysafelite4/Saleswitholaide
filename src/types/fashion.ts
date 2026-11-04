export type GarmentAvailability = 'in_stock' | 'pre_order' | 'low_stock' | 'sold_out';

export interface GarmentColor {
  name: string;
  hex: string;
}

export interface Garment {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'dresses' | 'linens' | 'silks' | 'coats' | 'trousers' | 'accessories';
  image: string;
  sizes: string[]; // e.g. ['XS', 'S', 'M', 'L', 'XL']
  colors: GarmentColor[];
  availability: GarmentAvailability;
  fabric: string; // e.g. '100% Belgian Flax Linen'
  details: string[]; // e.g. ['French seams throughout', 'Bias cut drape']
  careInstructions?: string;
  featured: boolean;
}

export interface BoutiqueOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  shippingAddress: string;
  shippingOption: string;
  paymentMethod: string;
  notes?: string;
  giftNote?: string;
  items: {
    id: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'tailoring' | 'shipped' | 'delivered';
  timestamp: string;
}

export interface PrivateFittingBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  fittingType: 'in_atelier' | 'virtual_concierge';
  garmentInterests: string[];
  measurementsNotes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  timestamp: string;
}

export interface BoutiqueConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  atelierAddress: string;
  currencySymbol: string;
  currencyCode: string;
  baseShippingFee: number;
  freeShippingThreshold: number;
  nationwideShippingFee: number;
  internationalShippingFee: number;
  promoBanner: {
    enabled: boolean;
    text: string;
    badgeText?: string;
    linkText?: string;
    linkUrl?: string;
    bgColor: 'sand' | 'obsidian' | 'champagne' | 'terracotta';
  };
}
