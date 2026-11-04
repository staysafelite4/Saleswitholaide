import { Garment, BoutiqueConfig, BoutiqueOrder, PrivateFittingBooking } from '../types/fashion';

export const FASHION_HERO_IMAGE = '/src/assets/images/template_fashion_boutique_1793191760721.jpg';
export const FASHION_DRESS_IMAGE = '/src/assets/images/fashion_silk_dress_1793192812492.jpg';
export const FASHION_KIMONO_IMAGE = '/src/assets/images/fashion_linen_kimono_1793193691355.jpg';
export const FASHION_TROUSERS_IMAGE = '/src/assets/images/fashion_tailored_suit_1793193704090.jpg';
export const FASHION_TRENCH_IMAGE = '/src/assets/images/fashion_earth_trench_1793193724921.jpg';

export const FASHION_PRESET_IMAGES = [
  { label: 'Champagne Silk Slip Dress', url: FASHION_DRESS_IMAGE },
  { label: 'Belgian Linen Kimono Jacket', url: FASHION_KIMONO_IMAGE },
  { label: 'Obsidian Tailored Silk Trousers', url: FASHION_TROUSERS_IMAGE },
  { label: 'Earth Sand Brushed Trench Coat', url: FASHION_TRENCH_IMAGE },
  { label: 'Lekki Showroom & Atelier', url: FASHION_HERO_IMAGE }
];

export const INITIAL_GARMENTS: Garment[] = [
  {
    id: 'garment_silk_slip',
    name: 'Architectural Champagne Silk Slip Dress',
    tagline: 'Double-faced heavyweight mulberry silk with delicate bias-cut drape',
    description: 'A timeless silhouette designed to fluidly skim the body without restriction. Cut on the bias from 22-momme pure mulberry silk in a luminous champagne hue. Features adjustable cross-back spaghetti straps and French seams throughout.',
    price: 95,
    compareAtPrice: 120,
    category: 'dresses',
    image: FASHION_DRESS_IMAGE,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Gold', hex: '#E6D3B3' },
      { name: 'Obsidian Black', hex: '#1C1917' },
      { name: 'Raw Ochre', hex: '#C2824A' }
    ],
    availability: 'in_stock',
    fabric: '22-Momme 100% Pure Mulberry Silk',
    details: [
      'Hand-cut on the true 45-degree bias for natural contour',
      'Interior delicate French seams with zero fraying',
      'Adjustable 100% silk rouleau spaghetti straps',
      'Subtle scoop neckline with double silk chest lining'
    ],
    careInstructions: 'Dry clean only or hand-wash inside out in tepid water with gentle silk detergent. Steam to release wrinkles.',
    featured: true
  },
  {
    id: 'garment_linen_kimono',
    name: 'Raw Sand Unstructured Linen Kimono Jacket',
    tagline: '100% organic Belgian linen with dropped shoulders and raw hem detailing',
    description: 'Designed for effortless tropical layering and balmy evenings. Breathable open-weave European flax linen finished with a soft mineral wash and a detachable matching tie sash belt.',
    price: 75,
    compareAtPrice: 95,
    category: 'linens',
    image: FASHION_KIMONO_IMAGE,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Raw Sand', hex: '#D7C4A5' },
      { name: 'Earthy Terracotta', hex: '#B85D43' },
      { name: 'Chalk Ivory', hex: '#F5F2EB' }
    ],
    availability: 'in_stock',
    fabric: '100% Belgian Flax Linen (230 GSM)',
    details: [
      'Dropped kimono shoulder for relaxed genderless drape',
      'Deep reinforced patch pockets sized for essentials',
      'Detachable 5cm self-fabric waist tie sash',
      'Pre-washed with volcanic minerals for tactile softness'
    ],
    careInstructions: 'Machine wash delicate at 30°C. Air dry flat in shade. Iron damp or embrace natural relaxed linen rumple.',
    featured: true
  },
  {
    id: 'garment_monochrome_trousers',
    name: 'Obsidian Tailored Silk Trousers',
    tagline: 'Wide-leg flowing silhouette with double front pleats and deep slash pockets',
    description: 'Impeccable tailoring fused with evening fluidity. High-rise waist with internal buffalo horn button closure, extended waistband tab, and clean pressed creases down the sweeping wide leg.',
    price: 70,
    compareAtPrice: 85,
    category: 'trousers',
    image: FASHION_TROUSERS_IMAGE,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#1C1917' },
      { name: 'Sandstone Grey', hex: '#8C857B' }
    ],
    availability: 'in_stock',
    fabric: 'Mulberry Silk & Tencel Lyocell Twill',
    details: [
      'High-waisted tailored contour with subtle internal stretch band',
      'Double forward pleats cascading into a generous wide hem',
      'Functional deep slash pockets lined with pure silk',
      'Concealed zip fly with genuine horn hook closure'
    ],
    careInstructions: 'Dry clean recommended. Cool iron on reverse side under a press cloth.',
    featured: true
  },
  {
    id: 'garment_structured_trench',
    name: 'The Structured Earth Cotton Trench Coat',
    tagline: 'Heavyweight brushed cotton twill with storm flap and horn buttons',
    description: 'A structural statement piece engineered for cool evenings, rainfall, and global travel. Features raglan sleeves, storm welt pockets, storm shoulder gun flap, and a tailored rear inverted vent.',
    price: 135,
    compareAtPrice: 160,
    category: 'coats',
    image: FASHION_TRENCH_IMAGE,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Earth Olive', hex: '#586048' },
      { name: 'Warm Camel Sand', hex: '#C49E6C' }
    ],
    availability: 'low_stock',
    fabric: 'Heavyweight Brushed Cotton Twill (380 GSM)',
    details: [
      'Water-repellent peach-finish brushed organic cotton',
      'Raglan sleeves allowing effortless layering over knitwear',
      'Detachable waist belt with solid brass D-rings',
      'Rear inverted storm flap with horn button fastening'
    ],
    careInstructions: 'Specialist dry clean only. Sponge clean light surface marks with clean lukewarm water.',
    featured: true
  },
  {
    id: 'garment_silk_cowl_top',
    name: 'AURA Fluid Silk Drape Cowl Top',
    tagline: 'Sculptural sleeveless top with cascading front cowl neckline',
    description: 'Effortless quiet luxury designed to pair seamlessly with our tailored trousers or layered beneath the unstructured linen kimono. Cut from 19-momme sandwashed mulberry silk.',
    price: 50,
    compareAtPrice: 65,
    category: 'silks',
    image: FASHION_TROUSERS_IMAGE,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Obsidian Black', hex: '#1C1917' },
      { name: 'Chalk Ivory', hex: '#F5F2EB' },
      { name: 'Champagne Gold', hex: '#E6D3B3' }
    ],
    availability: 'in_stock',
    fabric: 'Sandwashed Mulberry Silk (19-Momme)',
    details: [
      'Deep cascading cowl that maintains silhouette structure',
      'Sleeveless cut tailored to conceal brassiere lines',
      'Curved shirt hem suited for tucking or leaving untucked'
    ],
    careInstructions: 'Hand wash cold with silk wash detergent. Lay flat to dry.',
    featured: false
  },
  {
    id: 'garment_linen_vest_set',
    name: 'Belgian Linen Tailored Waistcoat & Short',
    tagline: 'Two-piece matching resort tailoring with mother-of-pearl buttons',
    description: 'A crisp modern silhouette crafted for sun-drenched afternoons and private gallery viewings. Includes our tailored V-neck waistcoat and matching pleated high-rise linen shorts.',
    price: 85,
    compareAtPrice: 105,
    category: 'linens',
    image: FASHION_KIMONO_IMAGE,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Raw Sand', hex: '#D7C4A5' },
      { name: 'Chalk Ivory', hex: '#F5F2EB' }
    ],
    availability: 'pre_order',
    fabric: '100% Belgian Flax Linen',
    details: [
      'Hand-carved mother-of-pearl button placket',
      'Adjustable cinch buckle on waistcoat rear',
      'Pleated high-rise shorts with 4-inch inseam and silk-lined pockets'
    ],
    careInstructions: 'Delicate hand wash or eco-friendly dry clean.',
    featured: false
  }
];

export const INITIAL_BOUTIQUE_CONFIG: BoutiqueConfig = {
  brandName: 'AURA Atelier',
  tagline: 'Tactile Silks, Unstructured Linens & Quiet Luxury',
  whatsappNumber: '2348030795206',
  contactEmail: 'concierge@auraboutique.com',
  contactPhone: '+234 803 079 5206',
  atelierAddress: '18 Fola Osibo Street, Lekki Phase 1, Lagos, Nigeria',
  currencySymbol: '$',
  currencyCode: 'CAD',
  baseShippingFee: 10, // Express
  freeShippingThreshold: 120,
  nationwideShippingFee: 15,
  internationalShippingFee: 25,
  promoBanner: {
    enabled: true,
    text: '✨ Resort 2026 Capsule: Complimentary express courier delivery on orders over $120 CAD.',
    badgeText: 'New Collection',
    linkText: 'Shop Lookbook',
    linkUrl: '#collection',
    bgColor: 'sand'
  }
};

export const INITIAL_BOUTIQUE_ORDERS: BoutiqueOrder[] = [
  {
    id: 'AUR-501',
    clientName: 'Zainab Balogun',
    clientPhone: '+234 803 999 1122',
    shippingAddress: 'Penthouse 3, Ocean View Estate, Ikoyi, Lagos',
    shippingOption: 'Express Courier',
    paymentMethod: 'Instant Bank Transfer',
    notes: 'Please add 1 extra inch to hemline length for 5ft 9 height.',
    giftNote: 'Happy Birthday Zainab — with love from Tunde',
    items: [
      {
        id: 'garment_silk_slip',
        name: 'Architectural Champagne Silk Slip Dress',
        size: 'M',
        color: 'Champagne Gold',
        quantity: 1,
        price: 95
      }
    ],
    subtotal: 95,
    shippingFee: 10,
    total: 105,
    status: 'shipped',
    timestamp: '2026-10-28 10:15 AM'
  },
  {
    id: 'AUR-502',
    clientName: 'Dr. Chidinma Eze',
    clientPhone: '+234 812 444 8899',
    shippingAddress: 'Maitama District, Abuja FCT',
    shippingOption: 'Priority Courier',
    paymentMethod: 'Instant Bank Transfer',
    notes: 'Deliver before Friday evening for weekend gala.',
    items: [
      {
        id: 'garment_monochrome_trousers',
        name: 'Obsidian Tailored Silk Trousers',
        size: 'L',
        color: 'Obsidian Black',
        quantity: 1,
        price: 70
      },
      {
        id: 'garment_silk_cowl_top',
        name: 'AURA Fluid Silk Drape Cowl Top',
        size: 'L',
        color: 'Obsidian Black',
        quantity: 1,
        price: 50
      }
    ],
    subtotal: 120,
    shippingFee: 15,
    total: 135,
    status: 'tailoring',
    timestamp: '2026-10-28 11:30 AM'
  }
];

export const INITIAL_FITTINGS_BOOKINGS: PrivateFittingBooking[] = [
  {
    id: 'FIT-201',
    clientName: 'Simisola Adeleke',
    clientPhone: '+234 809 123 4567',
    email: 'simi.adeleke@gmail.com',
    preferredDate: '2026-10-30',
    preferredTime: '14:00 PM',
    fittingType: 'in_atelier',
    garmentInterests: ['Architectural Champagne Silk Slip Dress', 'The Structured Earth Cotton Trench Coat'],
    measurementsNotes: 'Interested in bespoke sizing for bridal luncheon rehearsal dress.',
    status: 'confirmed',
    timestamp: '2026-10-28 09:00 AM'
  }
];

export const FASHION_SIZE_GUIDE = [
  { size: 'XS', uk: 'UK 6', bust: '80-84 cm (31-33")', waist: '62-66 cm (24-26")', hip: '86-90 cm (34-35")' },
  { size: 'S', uk: 'UK 8-10', bust: '85-89 cm (33-35")', waist: '67-71 cm (26-28")', hip: '91-95 cm (36-37")' },
  { size: 'M', uk: 'UK 10-12', bust: '90-95 cm (35-37")', waist: '72-77 cm (28-30")', hip: '96-101 cm (38-40")' },
  { size: 'L', uk: 'UK 14-16', bust: '96-102 cm (38-40")', waist: '78-84 cm (31-33")', hip: '102-108 cm (40-42")' },
  { size: 'XL', uk: 'UK 16-18', bust: '103-110 cm (41-43")', waist: '85-92 cm (33-36")', hip: '109-116 cm (43-45")' }
];

export const FASHION_PRESS_QUOTES = [
  {
    publication: 'Vogue West Africa',
    quote: 'A masterclass in quiet Nigerian luxury. AURA proves that minimalism and tactile African craftsmanship create an international language of elegance.',
    year: '2026'
  },
  {
    publication: 'Lagos Fashion Review',
    quote: 'Their mulberry silk bias cuts fall like liquid sunlight. Every seam is finished to Savile Row precision right here in Lekki.',
    year: '2025'
  },
  {
    publication: 'Harper’s Bazaar Global',
    quote: 'One of the most exciting conscious luxury fashion houses emerging from the continent today.',
    year: '2026'
  }
];
