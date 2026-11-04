import { Product, SiteConfig, OrderLog } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_zobo_drink_1793191126883.jpg';
export const PRODUCT_CLASSIC_IMAGE = '/src/assets/images/product_zobo_classic_1793191126036.jpg';
export const PRODUCT_GINGER_IMAGE = '/src/assets/images/product_zobo_ginger_1793191126695.jpg';
export const PRODUCT_PINEAPPLE_IMAGE = '/src/assets/images/product_zobo_pineapple_1793191126579.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // PRIMARY FLAGSHIP: Cleaned Grade A Hibiscus Leaf Bulk Tiers
  {
    id: 'prod_hibiscus_bulk',
    name: 'Cleaned Grade A Hibiscus Leaf (Bulk)',
    tagline: 'Premium triple-washed, stone-free Sahel sun-dried Hibiscus Sabdariffa calyces',
    description: 'Our flagship wholesale hibiscus. Hand-picked, thoroughly cleaned, destoned, and calibrated for high-yield crimson extraction. Perfect for drink entrepreneurs, caterers, African stores, resellers, and families buying in bulk.',
    price: 15,
    compareAtPrice: 18,
    size: '1kg Bulk Bag',
    category: 'bulk_hibiscus',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    sweetness: '100% Pure Unsweetened Calyces',
    ingredients: ['100% Grade A Cleaned Hibiscus Sabdariffa Petals'],
    featured: true,
    salesCount: 1420,
    availableSizes: ['1kg', '2.5kg', '5kg', '10kg', '25kg', '50kg', '100kg'],
    sizePrices: {
      '1kg': 15,
      '2.5kg': 35,
      '5kg': 65,
      '10kg': 120,
      '25kg': 280,
      '50kg': 540,
      '100kg': 1050
    }
  },
  {
    id: 'prod_hibiscus_commercial_quote',
    name: '1,000kg+ Commercial Hibiscus Shipment',
    tagline: 'Container-level commercial supply for industrial beverage manufacturers & exporters',
    description: 'Need 1,000kg (1 Metric Tonne) or more of premium cleaned Grade A Hibiscus? Click to request a custom FOB/CIF wholesale quote with direct shipping and pallet breakdown on WhatsApp.',
    price: 0,
    size: '1,000kg+ Bulk Container',
    category: 'bulk_hibiscus',
    image: HERO_IMAGE_PATH,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    sweetness: 'Commercial Direct Factory Pricing',
    ingredients: ['Export Grade Cleaned Hibiscus Sabdariffa'],
    featured: true,
    salesCount: 98,
    isQuoteOnly: true
  },

  // HERBAL & BOTANICAL CATALOG (Default size 100g, options 100g, 250g, 500g, 1kg)
  {
    id: 'prod_stevia_leaf',
    name: 'Organic Stevia Leaf',
    tagline: 'All-natural zero-calorie herbal sweetener whole dried leaves',
    description: 'Pure dried Stevia rebaudiana leaves. Up to 30x sweeter than sugar with zero glycemic impact. Ideal for sweetening zobo, tea blends, and herbal infusions naturally.',
    price: 8,
    compareAtPrice: 10,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Organic Stevia Rebaudiana Leaves'],
    featured: true,
    salesCount: 389,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 8, '250g': 18, '500g': 32, '1kg': 58 }
  },
  {
    id: 'prod_moringa_leaf',
    name: 'Moringa Leaf (Superfood)',
    tagline: 'Nutrient-rich sun-dried moringa oleifera whole leaves',
    description: 'Packed with essential amino acids, iron, and antioxidants. Harvested from organic farms and gently shade-dried to preserve vibrant chlorophyll and vital nutrients.',
    price: 7,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure Dried Moringa Oleifera Leaves'],
    featured: true,
    salesCount: 512,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 15, '500g': 28, '1kg': 50 }
  },
  {
    id: 'prod_sorghum_leaf',
    name: 'Sorghum Leaf (Wakaye / Waakye)',
    tagline: 'Authentic crimson sorghum stalk leaf sheath for rich color & antioxidants',
    description: 'Traditional West African sorghum leaves. Imparts a gorgeous ruby hue and earthy antioxidant depth to herbal brews, rice dishes, and traditional decoctions.',
    price: 6,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Cleaned Dried Sorghum Bicolor Sheath Leaves'],
    featured: false,
    salesCount: 275,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 6, '250g': 14, '500g': 25, '1kg': 45 }
  },
  {
    id: 'prod_chamomile_buds',
    name: 'Chamomile Buds & Flowers',
    tagline: 'Whole aromatic golden chamomile blossoms for soothing evening brews',
    description: 'Whole Egyptian chamomile flower heads with sweet honeyed apple notes. Renowned for promoting relaxation, sound sleep, and soothing digestion.',
    price: 9,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Whole Matricaria Chamomilla Flowers'],
    featured: true,
    salesCount: 610,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 9, '250g': 20, '500g': 36, '1kg': 65 }
  },
  {
    id: 'prod_lemongrass',
    name: 'Artisanal Lemongrass',
    tagline: 'Crisp citrusy dried lemongrass cuts for uplifting aroma',
    description: 'Hand-harvested Cymbopogon lemongrass strands. Bright, lemony, and refreshing. Excellent standalone or combined with hibiscus and ginger.',
    price: 6,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Organic Cut Lemongrass'],
    featured: false,
    salesCount: 340,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 6, '250g': 14, '500g': 24, '1kg': 42 }
  },
  {
    id: 'prod_green_tea_leaf',
    name: 'Whole Green Tea Leaf',
    tagline: 'High-antioxidant whole leaf green tea for metabolic vitality',
    description: 'Clean steamed whole green tea leaves rich in EGCG polyphenols. Smooth, clean taste with subtle grassy undertones.',
    price: 8,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Whole Camellia Sinensis Green Tea Leaves'],
    featured: false,
    salesCount: 420,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 8, '250g': 17, '500g': 30, '1kg': 55 }
  },
  {
    id: 'prod_olive_leaf',
    name: 'Mediterranean Olive Leaf',
    tagline: 'Oleuropein-rich whole dried olive leaves for immune defense',
    description: 'Wild Mediterranean olive tree leaves known for potent polyphenols and immune support. Mildly herbal with a smooth, grounding flavor profile.',
    price: 8,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Olea Europaea Dried Leaves'],
    featured: false,
    salesCount: 195,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 8, '250g': 18, '500g': 32, '1kg': 58 }
  },
  {
    id: 'prod_lemon_balm',
    name: 'Soothing Lemon Balm',
    tagline: 'Calming Melissa officinalis leaves for mood & digestion',
    description: 'Fragrant lemon balm leaves with subtle citrus notes. Perfect for evening teas, anxiety relief, and gastrointestinal comfort.',
    price: 9,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Dried Melissa Officinalis Leaves'],
    featured: false,
    salesCount: 230,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 9, '250g': 20, '500g': 35, '1kg': 62 }
  },
  {
    id: 'prod_nettle_leaf',
    name: 'Wild Nettle Leaf',
    tagline: 'Mineral-dense stinging nettle leaves for detox & stamina',
    description: 'Abundant in iron, calcium, and silica. Gently steamed and dried to neutralize stings, leaving a rich, nourishing botanical herb.',
    price: 7,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Organic Urtica Dioica Nettle Leaves'],
    featured: false,
    salesCount: 310,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 16, '500g': 28, '1kg': 50 }
  },
  {
    id: 'prod_dandelion_leaf',
    name: 'Purifying Dandelion Leaf',
    tagline: 'Gentle cleansing herbal leaves for liver & kidney balance',
    description: 'Sustainably harvested dandelion foliage rich in potassium and herbal cleansing bitters. Blends delightfully with hibiscus and lemon.',
    price: 7,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure Taraxacum Officinale Leaves'],
    featured: false,
    salesCount: 280,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 16, '500g': 28, '1kg': 50 }
  },
  {
    id: 'prod_spearmint_leaf',
    name: 'Refreshing Spearmint Leaf',
    tagline: 'Aromatic Mentha spicata leaves for cool digestive refreshment',
    description: 'Sweet, vibrant spearmint leaves that infuse drinks with crisp cooling herbal notes. Essential for mocktails, zobo finishing, and hot teas.',
    price: 7,
    size: '100g Pouch',
    category: 'botanicals',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure Dried Spearmint Leaves'],
    featured: true,
    salesCount: 460,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 15, '500g': 27, '1kg': 48 }
  },

  // BERRIES, POWDERS & ROOTS
  {
    id: 'prod_hawthorn_berries',
    name: 'Whole Hawthorn Berries',
    tagline: 'Traditional cardiovascular support red berries',
    description: 'Whole sun-dried hawthorn berries with deep tangy flavor. Revered in herbal wellness for heart health and circulation.',
    price: 9,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Whole Dried Crataegus Berries'],
    featured: false,
    salesCount: 180,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 9, '250g': 20, '500g': 36, '1kg': 64 }
  },
  {
    id: 'prod_hawthorn_berry_powder',
    name: 'Hawthorn Berry Powder',
    tagline: 'Fine micro-milled hawthorn berry superfood powder',
    description: 'Pure ground hawthorn berries. Instantly dissolves into smoothies, juices, warm water, or herbal elixir mixes.',
    price: 10,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure Hawthorn Berry Micronized Powder'],
    featured: false,
    salesCount: 140,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 10, '250g': 22, '500g': 40, '1kg': 72 }
  },
  {
    id: 'prod_orange_peel_powder',
    name: 'Aromatic Orange Peel Powder',
    tagline: 'Zesty vitamin C rich sun-dried citrus peel powder',
    description: 'Finely ground citrus sinensis peels brimming with natural limonene and citrus aroma. Perfect for zobo brewing, baking, and skincare formulations.',
    price: 7,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure Organic Orange Peel Powder'],
    featured: false,
    salesCount: 290,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 15, '500g': 26, '1kg': 46 }
  },
  {
    id: 'prod_hibiscus_powder',
    name: 'Pure Hibiscus Powder (Grade A)',
    tagline: '100% Instant micro-milled Grade A hibiscus sabdariffa powder',
    description: 'Super-fine ruby red hibiscus powder. Cold-soluble for instant iced zobo, smoothies, cocktail rimming, and cosmetics.',
    price: 9,
    compareAtPrice: 12,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Micro-Milled Grade A Cleaned Hibiscus Sabdariffa'],
    featured: true,
    salesCount: 720,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 9, '250g': 20, '500g': 36, '1kg': 65 }
  },
  {
    id: 'prod_dandelion_root',
    name: 'Roasted Dandelion Root',
    tagline: 'Deep roasted earthy coffee-alternative botanical root',
    description: 'Richly roasted cut dandelion root. Delivers a dark, nutty brew that resembles chicory or coffee without caffeinated jitter.',
    price: 9,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Roasted Taraxacum Officinale Root'],
    featured: false,
    salesCount: 360,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 9, '250g': 20, '500g': 35, '1kg': 62 }
  },
  {
    id: 'prod_cocoa_powder',
    name: 'Pure West African Cocoa Powder',
    tagline: '100% Unsweetened non-alkalized raw cocoa powder',
    description: 'Rich, dark cocoa pressed from premium West African cacao beans. High in natural flavanols, rich chocolate aroma, and zero added sugars.',
    price: 8,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Pure West African Raw Cocoa Powder'],
    featured: true,
    salesCount: 580,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 8, '250g': 18, '500g': 32, '1kg': 56 }
  },

  // SEEDS
  {
    id: 'prod_fennel_seed',
    name: 'Aromatic Fennel Seed',
    tagline: 'Sweet licorice-scented seeds for digestion & tea spice',
    description: 'Whole selected sweet fennel seeds. Aids digestion, relieves bloat, and adds sweet aromatic warmth to herbal teas.',
    price: 6,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Whole Foeniculum Vulgare Seeds'],
    featured: false,
    salesCount: 220,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 6, '250g': 14, '500g': 24, '1kg': 42 }
  },
  {
    id: 'prod_pumpkin_seed',
    name: 'Cleaned Raw Pumpkin Seeds (Pepitas)',
    tagline: 'Zinc & magnesium rich raw shelled pumpkin seeds',
    description: 'Plump, raw, shelled green pepita seeds. Excellent source of plant protein, healthy fats, and minerals for snacking or topping.',
    price: 7,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_CLASSIC_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Raw Shelled Pumpkin Seeds'],
    featured: false,
    salesCount: 390,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 16, '500g': 28, '1kg': 48 }
  },
  {
    id: 'prod_flaxseed',
    name: 'Golden Whole Flaxseeds',
    tagline: 'Omega-3 ALA & fiber rich whole golden flaxseeds',
    description: 'Clean golden flaxseed grains. Essential for digestive health, smoothie blending, and plant-based omega nutrition.',
    price: 6,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_GINGER_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Organic Golden Whole Flaxseeds'],
    featured: false,
    salesCount: 310,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 6, '250g': 13, '500g': 23, '1kg': 40 }
  },
  {
    id: 'prod_chia_seed',
    name: 'Raw Organic Chia Seeds',
    tagline: 'Hydration & fiber dense raw black chia seeds',
    description: 'Premium raw chia seeds. Absorbs up to 10x their weight in liquid, creating lush gelatinous hydration for drinks and puddings.',
    price: 7,
    size: '100g Pouch',
    category: 'seeds_powders',
    image: PRODUCT_PINEAPPLE_IMAGE,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Raw Salvia Hispanica Chia Seeds'],
    featured: true,
    salesCount: 480,
    availableSizes: ['100g', '250g', '500g', '1kg'],
    sizePrices: { '100g': 7, '250g': 15, '500g': 27, '1kg': 48 }
  },

  // ACCESSORIES
  {
    id: 'prod_empty_teabags',
    name: 'Food-Grade Empty Teabags (100 Pack)',
    tagline: 'Unbleached natural corn fiber filter drawstring tea bags',
    description: 'Pack of 100 heat-resistant, eco-friendly empty drawstring tea filter bags. Perfect for custom herbal loose leaf infusions and spice brewing.',
    price: 5,
    compareAtPrice: 7,
    size: '100 Pieces Pack',
    category: 'accessories',
    image: HERO_IMAGE_PATH,
    availability: 'in_stock',
    spiceLevel: 'N/A',
    ingredients: ['100% Unbleached Biodegradable Plant Fiber'],
    featured: true,
    salesCount: 890,
    availableSizes: ['100 Pack', '250 Pack', '500 Pack', '1000 Pack']
  }
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  brandName: 'Zobowellness',
  tagline: 'Grade A Cleaned Hibiscus Sabdariffa & Wholesale Herbal Botanicals',
  brandIcon: 'hibiscus',
  whatsappNumber: '2348030795206',
  whatsappGreeting: 'Hello Zobowellness! I would like to place an order for cleaned Grade A Hibiscus & Botanicals.',
  currencySymbol: '$',
  currencyCode: 'CAD',
  deliveryNotice: 'Worldwide & Regional Express Shipping (CAD, USD, GBP pricing supported). Delivered in 48 Hours.',
  deliveryBaseFee: 10,
  freeDeliveryThreshold: 100,
  contactEmail: 'sales@zobowellness.com',
  contactPhone: '08030795206',
  kitchenAddress: 'SalesWithOlaide Web Studio Partner Hub · 48-Hour Setup',
  instagramHandle: '@zobowellness',
  promoBanner: {
    enabled: true,
    text: '🌿 Zobowellness Wholesale & Bulk Supply: Premium Cleaned Grade A Hibiscus Sabdariffa Leaf (1kg to 100kg+). Order via WhatsApp!',
    badgeText: 'Wholesale Hibiscus',
    linkText: 'Order Bulk Hibiscus',
    linkUrl: '#menu',
    bgColor: 'crimson'
  },
  navLinks: [
    { id: 'nav_hibiscus', label: 'Hibiscus Bulk', href: '#menu', visible: true },
    { id: 'nav_botanicals', label: 'Botanical Leaves', href: '#menu', visible: true },
    { id: 'nav_story', label: 'About Zobowellness', href: '#story', visible: true },
    { id: 'nav_reviews', label: 'Client Reviews', href: '#reviews', visible: true },
    { id: 'nav_faq', label: 'Wholesale FAQ', href: '#faq', visible: true }
  ],
  story: {
    badge: 'Artisanal Bulk Supply',
    title: 'Grade A Sahel Sun-Dried Hibiscus & Botanical Herbs',
    subtitle: 'Supplying Wholesalers, Caterers, Drink Entrepreneurs, African Stores & Families Globally.',
    bodyText: 'At Zobowellness, we specialize in supplying premium, thoroughly cleaned Grade A Hibiscus Sabdariffa leaves (Zobo leaves) in bulk tiers from 1kg up to 100kg, 1,000kg, and container-level volumes. Every batch is destoned, hand-inspected, and Sahel sun-dried to ensure maximum extraction color, tartness, and polyphenol density. Alongside our hibiscus, we offer 22+ premium botanical leaves, herbs, seeds, and micro-milled superfood powders.',
    quote: 'Pure, clean Grade A Hibiscus is the backbone of exceptional beverage crafting. Zero stones, zero dust, maximum yield.',
    features: [
      {
        id: 'f_1',
        title: 'Triple-Cleaned Grade A',
        desc: 'Destoned, hand-winnowed, and calibrated whole calyces free from sand, debris, or synthetic treatment.',
        iconName: 'flower'
      },
      {
        id: 'f_2',
        title: 'Wholesale & Retail Quantities',
        desc: 'Available in 1kg, 2.5kg, 5kg, 10kg, 25kg, 50kg, 100kg, and 1,000kg+ bulk container quotes.',
        iconName: 'leaf'
      },
      {
        id: 'f_3',
        title: 'Global & Regional Shipping',
        desc: 'Shipped with care across Canada, USA, UK, and international destinations with 48-Hour processing.',
        iconName: 'truck'
      }
    ]
  },
  wholesale: {
    title: 'Bulk Wholesale & Commercial Quote Request',
    subtitle: 'Equipping beverage brands, commercial kitchens, reseller shops, and African stores worldwide.',
    bodyText: 'Need 1,000kg (1 Metric Tonne) or more of cleaned Grade A Hibiscus Sabdariffa calyces? We provide customized commercial freight quotes, phytosanitary certifications, and tailored packaging.',
    kegs: [
      {
        id: 'bulk_25kg',
        size: '25kg Woven Wholesale Sack',
        serves: 'Resellers & Small Drink Producers',
        price: 280,
        description: 'Sealed 25kg moisture-proof woven bag of cleaned Grade A Hibiscus calyces.',
        tapIncluded: false
      },
      {
        id: 'bulk_50kg',
        size: '50kg Commercial Sack',
        serves: 'Commercial Caterers & Breweries',
        price: 540,
        description: 'Double-lined 50kg bulk sack calibrated for high-yield crimson extraction.',
        tapIncluded: false
      },
      {
        id: 'bulk_100kg',
        size: '100kg Pallet Bundle (2x 50kg)',
        serves: 'Distributors & African Superstores',
        price: 1050,
        description: 'Bulk distributor tier with priority dispatch and certificate of cleanliness.',
        tapIncluded: false
      }
    ]
  },
  faqs: [
    {
      id: 'faq_1',
      question: 'How is Zobowellness Hibiscus cleaned and prepared?',
      answer: 'Our Hibiscus Sabdariffa calyces are harvested in the Sahel region, triple-winnowed to eliminate dust, machine destoned, and hand-inspected. You receive pure whole petals ready for steeping without needing to wash out sand.',
      category: 'Quality'
    },
    {
      id: 'faq_2',
      question: 'What sizes are available for Hibiscus and other botanicals?',
      answer: 'Hibiscus Sabdariffa is sold in 1kg, 2.5kg, 5kg, 10kg, 25kg, 50kg, and 100kg bags. For orders of 1,000kg or more, click "Request Quote" to open WhatsApp. Other botanical herbs, leaves, seeds, and powders are available in 100g, 250g, 500g, and 1kg sizes.',
      category: 'Sizing'
    },
    {
      id: 'faq_3',
      question: 'How do I place an order via WhatsApp?',
      answer: 'Simply select your items and preferred quantity sizes on the site, then click "Order via WhatsApp" or the floating green WhatsApp button. Your exact order details and total in your chosen currency ($ CAD, $ USD, or £ GBP) will be sent straight to our team at 08030795206.',
      category: 'Ordering'
    },
    {
      id: 'faq_4',
      question: 'Do you ship internationally to Canada, USA, and UK?',
      answer: 'Yes! We ship globally to North America, Europe, and West Africa with fast trackable delivery.',
      category: 'Shipping'
    }
  ],
  reviews: [
    {
      id: 'rev_1',
      author: 'Adebayo Beverage Craft',
      location: 'Toronto, Canada',
      rating: 5,
      comment: 'We buy the 50kg Hibiscus sacks regularly for our commercial Zobo bottling business. Zero sand, intense deep crimson color, and incredible aroma. The WhatsApp ordering is lightning fast!',
      date: '2 days ago',
      verified: true
    },
    {
      id: 'rev_2',
      author: 'Grace O. (African Store Owner)',
      location: 'London, United Kingdom',
      rating: 5,
      comment: 'Zobowellness supplies our store with 25kg Hibiscus bags and 1kg Stevia and Chamomile pouches. Our customers love the quality!',
      date: '5 days ago',
      verified: true
    },
    {
      id: 'rev_3',
      author: 'Dr. Evelyn Martinez',
      location: 'New York, USA',
      rating: 5,
      comment: 'The Moringa leaves and Hawthorn berries are exceptionally fresh. Beautiful packaging and 48-hour order dispatch.',
      date: '1 week ago',
      verified: true
    }
  ]
};

export const INITIAL_ORDERS: OrderLog[] = [
  {
    id: 'ZW-9104',
    customerName: 'Chidi Okonkwo',
    customerPhone: '08030795206',
    deliveryAddress: '742 Queensway East, Mississauga, ON',
    deliveryNotes: 'Leave at front desk reception',
    deliveryDate: 'Today',
    preferredTime: '2:00 PM',
    paymentMethod: 'Instant WhatsApp Order',
    items: [
      { id: 'prod_hibiscus_bulk', name: 'Cleaned Grade A Hibiscus Leaf (Bulk)', size: '5kg Bulk Bag', quantity: 1, price: 65 },
      { id: 'prod_stevia_leaf', name: 'Organic Stevia Leaf', size: '250g Pouch', quantity: 2, price: 18 }
    ],
    subtotal: 101,
    deliveryFee: 10,
    totalAmount: 111,
    status: 'dispatched',
    timestamp: '2026-11-03 10:15 AM'
  }
];
