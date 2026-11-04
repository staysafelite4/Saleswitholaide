export interface BusinessTemplate {
  id: string;
  title: string;
  tagline: string;
  category: 'Food & Drink' | 'Restaurant' | 'Fashion & Retail' | 'Health & Spa' | 'Retail Marketplace';
  description: string;
  image: string;
  features: string[];
  setupTime: string;
  priceCAD: number;
  priceNGN?: number;
  priceUSD?: number;
  highlightBadge?: string;
  rating: number;
  demoStats: {
    ordersProcessed: string;
    avgConversion: string;
  };
}

export interface AgencyPackage {
  id: 'starter' | 'one_premium';
  name: string;
  badge?: string;
  tagline: string;
  priceCAD: number;
  compareAtPriceCAD?: number;
  priceNGN?: number;
  priceUSD?: number;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
}

export const AGENCY_PACKAGES: AgencyPackage[] = [
  {
    id: 'starter',
    name: 'Starter Launch Package',
    badge: '🔥 ₦5,000 / $5–10 CAD Special Promo',
    tagline: 'A limited-time opportunity for EVERY business owner to get listed online and take orders.',
    priceCAD: 10,
    priceNGN: 5000,
    priceUSD: 3.5,
    compareAtPriceCAD: 180,
    deliveryTime: 'Delivered within 48 Hours',
    features: [
      'Turnkey Industry Website Template of your choice',
      'Direct WhatsApp 1-Click Ordering / Booking',
      'Real-Time Live Admin CMS (prices, stock, banners)',
      'Subdomain Setup: [yourbusiness].vercel.app',
      'Mobile-First Responsive Layout (iOS & Android)',
      'Full Ownership with 0% Commission on Sales'
    ]
  },
  {
    id: 'one_premium',
    name: 'The One Premium Package',
    badge: 'Everything Included',
    tagline: 'Complete turnkey rollout with custom branding, pre-loaded catalog, and priority setup.',
    priceCAD: 180,
    deliveryTime: 'Delivered within 48 Hours Express',
    popular: true,
    features: [
      'Everything in Starter Launch Package',
      'Full Custom Brand Styling (Colors, Typography & Logo)',
      'Pre-loaded Product / Menu Catalog (Up to 25 items + photos)',
      'Delivery Zone & Courier Fee Calculator Setup',
      'Custom Subdomain: [yourbusiness].vercel.app (or Custom .com)',
      '1-on-1 Staff Onboarding & WhatsApp Training',
      'Priority 48-Hour Express Launch Queue',
      '30 Days Free Technical Concierge & Revisions'
    ]
  }
];

export const TEMPLATES: BusinessTemplate[] = [
  {
    id: 'jumia_kitchen',
    title: 'Jumia Kitchen & Utensils Store — Nigerian Online Retail Marketplace',
    tagline: 'Authentic Jumia shopping experience: Cookware, Blenders, Air Fryers, Flash Sales, Jumia Express 48h & Seller CMS.',
    category: 'Retail Marketplace',
    description: 'A complete multi-category e-commerce marketplace modeled exactly after Jumia Nigeria. Features signature Jumia orange styling, countdown Flash Sales rail, instant search autocomplete, multi-state delivery fee calculator, sliding shopping cart, 3-step checkout with Pay on Delivery & WhatsApp order confirmation, plus a real-time Seller Center CMS.',
    image: '/src/assets/images/jumia_cookware_set_1793198721213.jpg',
    features: [
      'Authentic Jumia UI: Signature Orange, Express Badges & Flash Sales Clock',
      'Instant Search Autocomplete & Multi-Department Categories',
      'Dynamic Nigerian State & LGA Delivery Matrix with Express ETAs',
      'Full Cart Drawer, Voucher Code Engine & 3-Step Checkout',
      'Pay on Delivery, Card/Transfer & Instant WhatsApp Orders',
      'Built-in Seller Center CMS to update stock, prices & orders in real-time'
    ],
    setupTime: 'Within 48 Hours',
    priceCAD: 180,
    priceUSD: 130,
    highlightBadge: '⭐ Exact Marketplace Experience',
    rating: 5.0,
    demoStats: {
      ordersProcessed: '2,450+ Items Sold',
      avgConversion: '28.9%'
    }
  },
  {
    id: 'zobo_drinks',
    title: 'Zobowellness — Grade A Hibiscus & Botanical Wholesale Hub',
    tagline: 'Cleaned Grade A Hibiscus Sabdariffa bulk supply (1kg - 1000kg+) & 22+ botanical tea leaves with direct WhatsApp ordering.',
    category: 'Food & Drink',
    description: 'Designed specifically for beverage brands, fresh juice makers, and craft drinks. Includes real-time bottle pricing, availability toggles, promotional alert banners, and customer delivery summaries sent directly to WhatsApp.',
    image: '/src/assets/images/hero_zobo_drink_1793191126883.jpg',
    features: [
      'Itemized WhatsApp Cart Checkout with Delivery Notes',
      'Live Admin CMS Dashboard with PIN Auth',
      'Real-Time Pricing & Availability Switcher',
      'Customizable Announcement Promo Banner',
      'Wholesale & Party Dispenser Keg Booker'
    ],
    setupTime: 'Within 48 Hours',
    priceCAD: 180,
    priceUSD: 130,
    highlightBadge: 'Most Popular for Food & Drinks',
    rating: 4.9,
    demoStats: {
      ordersProcessed: '450+ Orders',
      avgConversion: '18.4%'
    }
  },
  {
    id: 'restaurant_grill',
    title: 'Savanna African Bukka — Authentic Food Ordering Hub',
    tagline: 'Authentic gourmet dishes: Egusi & Pounded Yam, Party Jollof, Suya Skewers, Fisherman Soup & Catering Coolers.',
    category: 'Restaurant',
    description: 'Designed for restaurants, bukkas, caterers, and food brands. Customers select their swallow, proteins, order party coolers, and send orders straight to WhatsApp.',
    image: '/src/assets/images/african_egusi_soup_1793194327433.jpg',
    features: [
      'Signature Dishes (Egusi, Fisherman Soup, Firewood Jollof, Suya)',
      'Swallow & Protein Customizer Options',
      '5-Liter & 10-Liter Bukka Party Cooler Catering Ordering',
      'Delivery Zone Matrix with Courier ETAs and Free Delivery Calculator',
      'Live Kitchen Admin CMS to Update Prices, Stock & Dish Photos'
    ],
    setupTime: 'Within 48 Hours',
    priceCAD: 180,
    priceUSD: 130,
    highlightBadge: '100% African Cuisines Only',
    rating: 5.0,
    demoStats: {
      ordersProcessed: '1,280+ Takeouts',
      avgConversion: '26.4%'
    }
  },
  {
    id: 'fashion_boutique',
    title: 'AURA Atelier — Luxury Fashion & Apparel Store',
    tagline: 'Clean aesthetic lookbook, seasonal clothing collection, size selector & WhatsApp boutique concierge.',
    category: 'Fashion & Retail',
    description: 'Modern minimalist e-commerce showcase for fashion designers, luxury apparel, streetwear brands, and shoe boutiques. Customers pick their sizes and colors, then chat directly with your stylist on WhatsApp.',
    image: '/src/assets/images/fashion_silk_dress_1793192812492.jpg',
    features: [
      'High-End Fashion Editorial Lookbook Grid with Fabric Badges',
      'Interactive Color Swatches & Size Selector (XS–XL)',
      'Private Atelier Salon Fitting & Video Concierge Booking',
      'Worldwide Courier Matrix (Express Courier & DHL International)',
      'Live Atelier Admin CMS with Preset Luxury Photos & Stock Switcher'
    ],
    setupTime: 'Within 48 Hours',
    priceCAD: 180,
    priceUSD: 130,
    highlightBadge: 'Quiet Luxury & Chic',
    rating: 4.9,
    demoStats: {
      ordersProcessed: '520+ Pieces',
      avgConversion: '19.8%'
    }
  },
  {
    id: 'spa_wellness',
    title: 'Solace Sanctuary — Day Spa & Wellness Booking',
    tagline: 'Treatment menu, massage packages, therapist profiles & WhatsApp appointment scheduler.',
    category: 'Health & Spa',
    description: 'Serene, tranquil web presence for wellness clinics, massage parlors, beauty salons, and aesthetics studios. Clients view packages, pricing, therapist qualifications, and reserve session slots via WhatsApp.',
    image: '/src/assets/images/template_spa_wellness_1793191760546.jpg',
    features: [
      'Spa Treatment & Service Pricing Catalog',
      'Preferred Date & Time Slot WhatsApp Booker',
      'Couples & Bridal Package Customizer',
      'Gift Voucher & Membership Enquiries',
      'Verified Client Reviews & Care Instructions'
    ],
    setupTime: 'Within 48 Hours',
    priceCAD: 180,
    priceUSD: 130,
    highlightBadge: 'Serene & Clean',
    rating: 4.9,
    demoStats: {
      ordersProcessed: '290+ Bookings',
      avgConversion: '24.5%'
    }
  }
];

export const AGENCY_CONFIG = {
  name: 'SalesWithOlaide',
  tagline: 'Turnkey Business Websites & WhatsApp Commerce Systems',
  developer: 'SalesWithOlaide',
  whatsappNumber: '2348030795206',
  email: 'hello@saleswitholaide.com',
  deliveryTurnaround: '48-Hour Express Delivery Guarantee',
  baseSubdomainDomain: 'vercel.app',
  benefits: [
    {
      title: 'Direct WhatsApp Commerce',
      desc: 'No confusing checkout barriers or payment gateway drop-offs. Close sales directly on WhatsApp where your customers already live.'
    },
    {
      title: 'Real-Time Admin CMS Dashboard',
      desc: 'Change prices, mark items sold out, upload photos, and update promo banners in real-time right from your smartphone.'
    },
    {
      title: 'Zero Monthly SaaS Tax',
      desc: 'Stop paying $39/mo or percentage commission to third-party website builders. You own your website completely.'
    },
    {
      title: 'Guaranteed 48-Hour Delivery',
      desc: 'We configure your custom link (yourbusiness.vercel.app), load your products, set up your admin, and hand over your site in 48 hours.'
    }
  ]
};
