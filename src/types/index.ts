export type ProductAvailability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'brewing_fresh';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  size: string; // e.g., '1kg Bulk', '100g Pouch', '500ml Bottle'
  volume?: string;
  category: 'bulk_hibiscus' | 'botanicals' | 'seeds_powders' | 'accessories' | 'bottles' | 'bundles' | 'kegs' | 'specials';
  image: string;
  availability: ProductAvailability;
  spiceLevel?: 'Mild' | 'Medium' | 'Fiery' | 'N/A';
  sweetness?: string;
  ingredients: string[];
  featured: boolean;
  salesCount: number;
  availableSizes?: string[];
  sizePrices?: Record<string, number>;
  isQuoteOnly?: boolean;
}

export interface PromoBannerConfig {
  enabled: boolean;
  text: string;
  badgeText?: string;
  linkText?: string;
  linkUrl?: string;
  bgColor: 'crimson' | 'amber' | 'emerald' | 'charcoal';
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  visible: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface KegOption {
  id: string;
  size: string;
  serves: string;
  price: number;
  description: string;
  tapIncluded: boolean;
}

export interface StoryFeature {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  brandIcon: string; // either URL or icon name
  whatsappNumber: string; // international digits, e.g. "2348012345678"
  whatsappGreeting: string;
  currencySymbol: string;
  currencyCode: string;
  deliveryNotice: string;
  deliveryBaseFee: number;
  freeDeliveryThreshold: number;
  contactEmail: string;
  contactPhone: string;
  kitchenAddress: string;
  instagramHandle: string;
  promoBanner: PromoBannerConfig;
  navLinks: NavLink[];
  story: {
    badge: string;
    title: string;
    subtitle: string;
    bodyText: string;
    quote: string;
    features: StoryFeature[];
  };
  wholesale: {
    title: string;
    subtitle: string;
    bodyText: string;
    kegs: KegOption[];
  };
  faqs: FAQItem[];
  reviews: ReviewItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSweetness?: string;
  temperaturePreference?: string;
}

export interface OrderLog {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNotes?: string;
  deliveryDate?: string;
  preferredTime?: string;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    selectedSweetness?: string;
    temperaturePreference?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'pending_whatsapp' | 'confirmed' | 'dispatched' | 'delivered';
  timestamp: string;
}
