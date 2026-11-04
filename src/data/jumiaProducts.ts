import { JumiaProduct } from '../types/jumia';

export const JUMIA_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles' },
  { id: 'Cookware & Pots', name: 'Cookware & Pots', icon: 'CookingPot' },
  { id: 'Small Appliances', name: 'Small Appliances', icon: 'Zap' },
  { id: 'Utensils & Gadgets', name: 'Utensils & Gadgets', icon: 'Utensils' },
  { id: 'Food Storage', name: 'Food Storage & Flasks', icon: 'Package' },
  { id: 'Bakeware', name: 'Bakeware & Ovens', icon: 'Cake' },
  { id: 'Dining & Cutlery', name: 'Dining & Cutlery', icon: 'Wine' },
  { id: 'Kitchen Organization', name: 'Kitchen Organizers', icon: 'LayoutGrid' },
];

export const JUMIA_BRANDS = [
  'All Brands',
  'Dessini Imperial',
  'Master Chef',
  'ChefOma',
  'KitchenMaxx',
  'LuxeTherm',
  'Royal Home',
  'Scanfrost',
  'Binatone',
  'Tefal',
  'Silver Crest',
  'Bakewell'
];

export const NIGERIAN_STATES = [
  { name: 'Lagos', lgas: ['Ikeja', 'Lekki / Victoria Island', 'Surulere', 'Yaba / Mainland', 'Ikorodu', 'Alimosho'], expressFee: 1200, standardFee: 800, deliveryDays: '1-2 Days' },
  { name: 'Abuja (FCT)', lgas: ['Maitama / Wuse', 'Garki', 'Asokoro', 'Gwarinpa', 'Kubwa', 'Lugbe'], expressFee: 1800, standardFee: 1200, deliveryDays: '2-3 Days' },
  { name: 'Rivers (Port Harcourt)', lgas: ['Port Harcourt City', 'Obio-Akpor', 'Eleme', 'Ikwerre'], expressFee: 2200, standardFee: 1500, deliveryDays: '2-3 Days' },
  { name: 'Oyo (Ibadan)', lgas: ['Ibadan North', 'Ibadan South-West', 'Bodija', 'Oluyole'], expressFee: 1500, standardFee: 1000, deliveryDays: '2-3 Days' },
  { name: 'Kano', lgas: ['Kano Municipal', 'Fagge', 'Nasarawa', 'Tarauni'], expressFee: 2500, standardFee: 1800, deliveryDays: '3-4 Days' },
  { name: 'Enugu', lgas: ['Enugu North', 'Enugu South', 'Independence Layout', 'Nsukka'], expressFee: 2200, standardFee: 1500, deliveryDays: '3-4 Days' },
  { name: 'Delta (Warri / Asaba)', lgas: ['Warri South', 'Uvwie', 'Oshimili South (Asaba)'], expressFee: 2200, standardFee: 1500, deliveryDays: '2-4 Days' },
  { name: 'Ogun (Abeokuta / Ota)', lgas: ['Abeokuta South', 'Ado-Odo/Ota', 'Sagamu', 'Mowe/Ibafo'], expressFee: 1500, standardFee: 1000, deliveryDays: '1-3 Days' },
];

export const INITIAL_JUMIA_PRODUCTS: JumiaProduct[] = [
  {
    id: 'jp-1',
    name: 'Dessini Imperial 10-Piece Non-Stick Granite Marble Cookware Set with Tempered Glass Lids',
    brand: 'Dessini Imperial',
    category: 'Cookware & Pots',
    price: 48500,
    oldPrice: 75000,
    discountPercent: 35,
    rating: 4.8,
    reviewCount: 382,
    image: '/src/assets/images/jumia_cookware_set_1793198721213.jpg',
    gallery: [
      '/src/assets/images/jumia_cookware_set_1793198721213.jpg',
      '/src/assets/images/jumia_silicone_utensils_1793198824120.jpg'
    ],
    inStock: true,
    stockCount: 14,
    soldCount: 420,
    isFlashSale: true,
    isExpress: true,
    isOfficialStore: true,
    badge: 'TOP SELLER',
    description: 'Transform your cooking experience with the genuine Dessini Imperial 10-Piece Non-Stick Granite Die-Cast Cookware Set. Crafted with multi-layered German granite stone coating, this set requires little to zero cooking oil, ensuring healthy heart meals with effortless cleaning. Includes tempered heat-proof glass lids with steam vent and ergonomic soft-touch wooden handles.',
    keyFeatures: [
      '100% PFOA, Lead & Cadmium Free eco-friendly granite coating',
      'Die-cast aluminum core provides instant and even heat distribution',
      'Induction, gas, halogen and ceramic hob compatible',
      'Scratch-resistant marble exterior that won’t peel or flake',
      'Ergonomic heat-insulated wood-effect stay-cool handles'
    ],
    boxContents: '1x 28cm Deep Casserole Pot + Glass Lid, 1x 24cm Casserole Pot + Glass Lid, 1x 20cm Casserole Pot + Glass Lid, 1x 16cm Saucepan + Glass Lid, 1x 28cm Deep Frying Pan, 1x 24cm Everyday Skillet',
    specifications: {
      'Model': 'DS-10GNT',
      'Material': 'Die-Cast Aluminum with Granite Stone Coating',
      'Color': 'Charcoal Speckled Grey / Wood Accent',
      'Weight (kg)': '8.2 kg',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Chioma Adeyemi',
        rating: 5,
        date: '14 Oct 2026',
        title: 'Superb quality! Totally non-stick',
        comment: 'I fried plantain and eggs without a single drop of oil sticking! The wooden handles stay cold and washing it is just wiping with a sponge. Real value for money.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: 'Emeka Nwosu',
        rating: 5,
        date: '02 Oct 2026',
        title: 'Original Dessini delivered in 24 hours',
        comment: 'Jumia express delivery arrived the next morning in Lekki. Very heavy durable pots, nothing fake about it.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-2',
    name: 'Silver Crest Ultra-Chef 2L Heavy Duty 32,000 RPM Commercial Food Blender & Ice Crusher (8-Blade)',
    brand: 'Silver Crest',
    category: 'Small Appliances',
    price: 36900,
    oldPrice: 58000,
    discountPercent: 36,
    rating: 4.9,
    reviewCount: 512,
    image: '/src/assets/images/jumia_heavy_blender_1793198721640.jpg',
    gallery: [
      '/src/assets/images/jumia_heavy_blender_1793198721640.jpg'
    ],
    inStock: true,
    stockCount: 9,
    soldCount: 840,
    isFlashSale: true,
    isExpress: true,
    isOfficialStore: true,
    badge: 'FLASH DEAL',
    description: 'The indisputable king of Nigerian commercial blenders. Smoothly grinds dry beans for akara/moi moi, whole tiger nuts, ginger, hard dried fish, and blends thick pepper paste in under 30 seconds without water. Features a heavy-duty copper motor, 8-tier laser cut titanium-alloy blades, and a shatter-proof 2-liter BPA-free polycarbonate jug.',
    keyFeatures: [
      'Industrial 32,000 RPM High Torque 4500W Peak Performance Motor',
      '8 Japanese hardened titanium-steel blades for dry & wet grinding',
      'Stepless variable speed dial with pulse surge button',
      'Shatterproof unbreakable polycarbonate jar with ergonomic tamper',
      'Automatic thermal overload protection safety cutoff'
    ],
    boxContents: '1x Heavy Duty Motor Base, 1x 2000ml Polycarbonate Jar with Lid, 1x Food Tamper Tool, 1x Extra Drive Socket Gear, User Manual',
    specifications: {
      'Model': 'SC-PRO-3200',
      'Power': '4500W Peak / 2200W Nominal',
      'Speed': '32,000 RPM',
      'Capacity': '2.0 Liters',
      'Blade Count': '8 Blades',
      'Weight (kg)': '3.8 kg'
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Hajiya Fatima Bello',
        rating: 5,
        date: '20 Oct 2026',
        title: 'Smooth moi-moi without any lumps',
        comment: 'Blended unpeeled beans so smooth you cannot feel any skin. Extremely powerful blender, sound like aeroplane but the job is 10/10.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-3',
    name: 'ChefOma 6L Digital Touchscreen Visual Air Fryer with Viewing Window & 10 Presets (Matte Black & Gold)',
    brand: 'ChefOma',
    category: 'Small Appliances',
    price: 52000,
    oldPrice: 85000,
    discountPercent: 39,
    rating: 4.7,
    reviewCount: 228,
    image: '/src/assets/images/jumia_air_fryer_1793198740159.jpg',
    gallery: [
      '/src/assets/images/jumia_air_fryer_1793198740159.jpg'
    ],
    inStock: true,
    stockCount: 18,
    soldCount: 310,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: true,
    badge: 'NEW ARRIVAL',
    description: 'Fry, roast, bake, and grill with 85% less oil and guilt-free crispness. The ChefOma 6L Smart Air Fryer features a heat-tempered crystal glass front window with internal LED light so you can watch your whole chicken or crispy fish grill without losing heat. Intelligent micro-computer touch panel with 10 pre-programmed Nigerian cooking cycles.',
    keyFeatures: [
      'Panoramic visual viewing window with one-touch interior light',
      'Huge 6.0L XL basket easily accommodates a whole 2kg chicken',
      '360° high-speed rapid air circulation technology for even crisping',
      'Intuitive LED digital touchscreen with 10 presets and 80-200°C temp range',
      'Non-stick dishwasher-safe food basket with cool-touch gold handle'
    ],
    boxContents: '1x ChefOma 6L Digital Air Fryer, 1x Non-stick Crisper Plate, 1x Recipe Book, User Manual',
    specifications: {
      'Capacity': '6.0 Liters',
      'Power': '1800W',
      'Timer': 'Up to 60 Minutes',
      'Temperature Range': '80°C - 200°C',
      'Voltage': '220V - 240V ~ 50Hz'
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Blessing Okon',
        rating: 5,
        date: '18 Oct 2026',
        title: 'Game changer for grilled chicken and dodo',
        comment: 'Crispy plantain without soaking oil! Seeing the food through the window saves me from pulling out the tray every minute.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-4',
    name: 'KitchenMaxx 800W Heavy-Duty Electric Yam Pounder, Meat Chopper & Food Processor (Stainless Steel)',
    brand: 'KitchenMaxx',
    category: 'Small Appliances',
    price: 29500,
    oldPrice: 45000,
    discountPercent: 34,
    rating: 4.8,
    reviewCount: 460,
    image: '/src/assets/images/jumia_yam_pounder_1793198754143.jpg',
    gallery: [
      '/src/assets/images/jumia_yam_pounder_1793198754143.jpg'
    ],
    inStock: true,
    stockCount: 22,
    soldCount: 920,
    isFlashSale: true,
    isExpress: true,
    isOfficialStore: true,
    badge: 'NIGERIAN FAVORITE',
    description: 'No more mortal and pestle sweating. Pound smooth, elastic, lump-free hot pounded yam in exactly 2 minutes! Also effortlessly minces meat for pies, chops onions, shreds cabbage, and blends fresh tomatoes with dual-tier stainless steel S-blades.',
    keyFeatures: [
      'Specially designed dual-tier multi-blades for heavy swallow starch pounding',
      '800W pure copper motor with dual-speed control (Pulse & Continuous)',
      'Large 3-liter food-grade stainless steel bowl (unbreakable)',
      'Transparent splash-proof lid with ingredient feeding chute',
      'Anti-skid rubber base ring keeps unit stable while pounding'
    ],
    boxContents: '1x 800W Motor Head, 1x 3L Stainless Steel Bowl, 1x 4-Wing Blade Assembly, 1x Yam Pounding Paddle, 1x Bowl Lid, 1x Anti-slip Mat',
    specifications: {
      'Model': 'KM-YP800',
      'Power': '800W High Torque',
      'Bowl Material': 'SUS304 Food Grade Stainless Steel',
      'Capacity': '3.0 Liters',
      'Weight': '2.6 kg'
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Oluwaseun Bakare',
        rating: 5,
        date: '22 Oct 2026',
        title: 'Hot pounded yam in 90 seconds flat!',
        comment: 'My husband thought I pounded with mortar! It was smooth, hot, and stretchy. Best kitchen investment this year.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-5',
    name: 'Royal Home 3-Tier Rust-Proof Heavy Gauge Stainless Steel Dish Drying Rack with Cutlery Basket & Drainer',
    brand: 'Royal Home',
    category: 'Kitchen Organization',
    price: 18500,
    oldPrice: 28000,
    discountPercent: 34,
    rating: 4.6,
    reviewCount: 195,
    image: '/src/assets/images/jumia_dish_rack_1793198739810.jpg',
    gallery: [
      '/src/assets/images/jumia_dish_rack_1793198739810.jpg'
    ],
    inStock: true,
    stockCount: 30,
    soldCount: 510,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: false,
    badge: 'BEST SELLER',
    description: 'Maximize your kitchen counter space with this 3-tier chrome-plated stainless steel dish rack. Holds up to 20 plates, 18 bowls, multiple mugs, large cutting board, and silverware. Features an automatic drainage tray with swivel spout to direct runoff water straight into the sink.',
    keyFeatures: [
      'Heavy-duty 304 stainless steel with anti-rust baked enamel coating',
      '3-tier vertical structure doubles your kitchen storage capacity',
      'Side holder for cutting boards, pot lids, and knife slots',
      'Detachable dual-compartment utensil drainer cup',
      'Automatic 360° rotatable drainage tray keeps counter dry'
    ],
    boxContents: '1x 3-Tier Dish Rack Frame, 1x Water Drain Tray with Spout, 1x Cutlery Holder, 1x Chopping Board Holder, Assembly Hex Key & Screws',
    specifications: {
      'Dimensions': '42cm x 26cm x 63cm',
      'Material': 'SUS304 Stainless Steel + Heavy ABS',
      'Color': 'Silver Chrome with Black Accents',
      'Capacity': 'Up to 30kg Load'
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Amaka Eze',
        rating: 5,
        date: '10 Oct 2026',
        title: 'Very sturdy and doesn’t shake',
        comment: 'I put my heavy ceramic dinner plates and pots, it did not shake at all. The drainage channel works like magic.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-6',
    name: 'LuxeTherm 3-Piece Insulated Stainless Steel Thermal Food Warmer Flasks (0.5L, 1.0L, 1.5L) with Gold Trim',
    brand: 'LuxeTherm',
    category: 'Food Storage',
    price: 24900,
    oldPrice: 38000,
    discountPercent: 34,
    rating: 4.9,
    reviewCount: 340,
    image: '/src/assets/images/jumia_food_flask_1793198755457.jpg',
    gallery: [
      '/src/assets/images/jumia_food_flask_1793198755457.jpg'
    ],
    inStock: true,
    stockCount: 16,
    soldCount: 680,
    isFlashSale: true,
    isExpress: true,
    isOfficialStore: true,
    badge: 'HOT DEAL',
    description: 'Keep your jollof rice, soups, and porridge piping hot for up to 10 hours or chilled salads cold for 16 hours. Double-wall vacuum sealed high-grade stainless steel with airtight silicone gaskets and twist-lock brass handles. Perfect for office lunches, children’s school packs, picnics, and family gatherings.',
    keyFeatures: [
      'Double-wall high vacuum thermal insulation technology',
      'Keeps food hot for 10+ hours and cold for 16+ hours',
      '100% leak-proof airtight twist-and-lock lid with pressure relief valve',
      'Food-grade 18/8 stainless steel interior that won’t absorb stains or odors',
      'Ergonomic gold-plated sturdy carrying handle on each flask'
    ],
    boxContents: '1x 0.5L Small Food Flask, 1x 1.0L Medium Food Flask, 1x 1.5L Large Food Flask',
    specifications: {
      'Sizes': '0.5L / 1.0L / 1.5L',
      'Material': 'Double-Wall SUS304 Stainless Steel',
      'Thermal Performance': 'Hot: 10 hrs / Cold: 16 hrs',
      'Color': 'Brushed Stainless Steel with Gold Accents'
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'Damilola Adeleke',
        rating: 5,
        date: '08 Oct 2026',
        title: 'Food was still steaming at 4pm!',
        comment: 'Packed hot jollof rice by 6:30am for work in Victoria Island. When I opened it at 3:30pm, steam literally hit my face. Top quality.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-7',
    name: 'Master Chef 24-Piece Heat-Resistant Silicone Cooking Utensils Set with Natural Acacia Wood Handles & Crock',
    brand: 'Master Chef',
    category: 'Utensils & Gadgets',
    price: 16800,
    oldPrice: 26000,
    discountPercent: 35,
    rating: 4.8,
    reviewCount: 410,
    image: '/src/assets/images/jumia_silicone_utensils_1793198824120.jpg',
    gallery: [
      '/src/assets/images/jumia_silicone_utensils_1793198824120.jpg'
    ],
    inStock: true,
    stockCount: 25,
    soldCount: 890,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: true,
    badge: 'ESSENTIAL',
    description: 'Protect your expensive non-stick granite cookware from scratches with this complete 24-piece food-grade silicone kitchen utensil set. Features heat-resistant silicone heads that withstand up to 230°C without melting, paired with smooth polished natural acacia wood handles. Includes round countertop storage bucket, measuring cups, and spoons.',
    keyFeatures: [
      '100% BPA-free food-grade non-toxic silicone heads',
      'Withstands high cooking temperatures up to 230°C / 446°F without warping',
      'Zero scratches on delicate Teflon, ceramic, or granite non-stick coatings',
      'Ergonomic solid acacia wood handles with anti-scald insulation',
      'Includes matching utensil holder caddy plus stainless steel tongs & whisk'
    ],
    boxContents: 'Deep Soup Ladle, Solid Turner, Slotted Turner, Pasta Spoon, Basting Brush, Whisk, Food Tongs, Slotted Spoon, Flexible Spatula, Spreader, 5x Measuring Cups, 5x Measuring Spoons, Countertop Storage Crock',
    specifications: {
      'Piece Count': '24 Pieces',
      'Material': 'Food-Grade Silicone + Acacia Hardwood',
      'Temperature Tolerance': '-40°C to 230°C',
      'Dishwasher Safe': 'Handwash Recommended for Wood Handles'
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Zainab Mohammed',
        rating: 5,
        date: '25 Oct 2026',
        title: 'Looks so elegant on my kitchen island',
        comment: 'The wooden handles are very smooth and the silicone is thick and sturdy. Does not melt when frying stew. Highly recommended.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-8',
    name: 'Master Chef 8-Piece High-Carbon Stainless Steel Chef Kitchen Knife Set with Clear Acrylic Block',
    brand: 'Master Chef',
    category: 'Utensils & Gadgets',
    price: 21500,
    oldPrice: 35000,
    discountPercent: 38,
    rating: 4.7,
    reviewCount: 275,
    image: '/src/assets/images/jumia_knife_set_1793198823750.jpg',
    gallery: [
      '/src/assets/images/jumia_knife_set_1793198823750.jpg'
    ],
    inStock: true,
    stockCount: 19,
    soldCount: 530,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: true,
    badge: 'CHEF CHOICE',
    description: 'Razor-sharp precision German high-carbon stainless steel blades engineered for durability and effortless cutting. Easily slices through tough beef, goat meat, bones, hard tubers, and delicate tomatoes. Comes with a stylish 360° clear acrylic knife stand, kitchen poultry shears, and sharpening steel rod.',
    keyFeatures: [
      'Forged from ultra-sharp German X50CrMoV15 high-carbon stainless steel',
      'Laser-tested 15-degree cutting edge retains sharpness 3x longer',
      'Full tang design with triple-riveted ergonomic slip-resistant handles',
      'Modern transparent acrylic knife block protects blades and shows off beauty',
      'Includes heavy-duty poultry bone shears and hone sharpening steel'
    ],
    boxContents: '1x 8" Chef Knife, 1x 8" Bread Knife, 1x 8" Slicing Knife, 1x 7" Santoku Knife, 1x 5" Utility Knife, 1x 3.5" Paring Knife, 1x Kitchen Shears, 1x Sharpening Rod, 1x Acrylic Stand',
    specifications: {
      'Blade Material': 'High Carbon 1.4116 Stainless Steel',
      'Hardness': 'Rockwell 56±2 HRC',
      'Handle Material': 'ABS Triple Riveted',
      'Stand Material': 'Crystal Clear Acrylic'
    },
    reviews: [
      {
        id: 'rev-9',
        author: 'Pastor Ken Obi',
        rating: 5,
        date: '17 Oct 2026',
        title: 'Extremely sharp! Careful with fingers',
        comment: 'Cuts meat like butter. The knife stand is modern and gives the kitchen a hotel vibe.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-9',
    name: 'Binatone 8L Heavy Duty Stainless Steel Pressure Cooker with Multi-Safety Lock Valve',
    brand: 'Binatone',
    category: 'Cookware & Pots',
    price: 34500,
    oldPrice: 52000,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 180,
    image: '/src/assets/images/jumia_cookware_set_1793198721213.jpg',
    gallery: [
      '/src/assets/images/jumia_cookware_set_1793198721213.jpg'
    ],
    inStock: true,
    stockCount: 11,
    soldCount: 390,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: true,
    badge: 'TIME SAVER',
    description: 'Cut cooking time by up to 70% while locking in natural nutrients and flavors. Perfect for tough cow leg, oxtail, hard beans, and stockfish. Triple safety valve system guarantees safe cooking at all times without excessive steam hazard.',
    keyFeatures: [
      'Cooks beans and tough meats in under 25 minutes',
      'Heavy gauge SUS304 food-grade stainless steel thick body',
      'Multi-safety locking lid with pressure regulator & safety float valve',
      'Heavy sandwich encapsulated base for gas and induction hobs',
      'Heat-resistant Bakelite dual-side handles'
    ],
    boxContents: '1x 8L Pressure Cooker Pot, 1x Pressure Lid with Silicone Ring, 1x Extra Replacement Gasket, 1x Steaming Rack, User Manual',
    specifications: {
      'Capacity': '8.0 Liters',
      'Pressure Setting': '80 kPa Working Pressure',
      'Material': '18/10 Heavy Stainless Steel',
      'Base': '3-Ply Encapsulated Thermal Bottom'
    },
    reviews: [
      {
        id: 'rev-10',
        author: 'Victoria Danjuma',
        rating: 5,
        date: '12 Oct 2026',
        title: 'Cow leg cooked soft in 30 minutes!',
        comment: 'Before it took me 2 hours on gas to boil cow leg and goat meat. With this pot, in 30 mins it is soft as jelly. Saves so much cooking gas!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-10',
    name: 'Scanfrost 2.5L Cordless Rapid-Boil Stainless Steel Electric Kettle with Auto Shut-Off',
    brand: 'Scanfrost',
    category: 'Small Appliances',
    price: 12500,
    oldPrice: 19500,
    discountPercent: 36,
    rating: 4.6,
    reviewCount: 310,
    image: '/src/assets/images/jumia_air_fryer_1793198740159.jpg',
    gallery: [
      '/src/assets/images/jumia_air_fryer_1793198740159.jpg'
    ],
    inStock: true,
    stockCount: 35,
    soldCount: 1100,
    isFlashSale: true,
    isExpress: true,
    isOfficialStore: true,
    badge: 'DAILY DEAL',
    description: 'Boil full 2.5 liters of water in just 3 minutes with 2000W rapid heating element. Features 100% stainless steel inner lid and bottom with no plastic contact with boiling water. Equipped with British Strix thermostat for boil-dry protection and auto shut-off.',
    keyFeatures: [
      'Extra large 2.5L capacity for the whole family',
      '2000W concealed high-speed heating element',
      '100% food-grade seamless stainless steel interior',
      'Automatic switch-off when water boils & boil-dry safety cutoff',
      '360° swivel cordless power base with cord wrap'
    ],
    boxContents: '1x 2.5L Electric Kettle, 1x 360-Degree Power Base with Plug, User Manual',
    specifications: {
      'Capacity': '2.5 Liters',
      'Power': '2000W',
      'Body Material': 'Brushed Stainless Steel',
      'Safety': 'Strix Controller & Boil-dry Protection'
    },
    reviews: [
      {
        id: 'rev-11',
        author: 'Ibrahim Sani',
        rating: 5,
        date: '19 Oct 2026',
        title: 'Very fast boiling',
        comment: 'Boils water very quickly for morning tea and bathing. Solid stainless steel.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-11',
    name: 'Bakewell 6-Piece Non-Stick Springform Cake Pan Set with Piping Nozzles & Silicone Spatula',
    brand: 'Bakewell',
    category: 'Bakeware',
    price: 14800,
    oldPrice: 22000,
    discountPercent: 32,
    rating: 4.7,
    reviewCount: 160,
    image: '/src/assets/images/jumia_cookware_set_1793198721213.jpg',
    gallery: [
      '/src/assets/images/jumia_cookware_set_1793198721213.jpg'
    ],
    inStock: true,
    stockCount: 15,
    soldCount: 320,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: false,
    badge: 'BAKERS CHOICE',
    description: 'Bake tiered birthday cakes, cheesecakes, and meat pies with ease. Springform buckle provides easy release without destroying delicate cake edges. Includes 3 round springform pans (4", 7", 9"), 1 heart-shaped pan, icing piping bag with 6 stainless nozzles, and decorating comb.',
    keyFeatures: [
      'Heavy carbon steel with food-grade double-layer non-stick coating',
      'Quick-release springform latch and removable bottom',
      'Heat resistant up to 230°C in electric or gas ovens',
      'Leak-proof tight seal base prevents batter spills',
      'Includes full cake decorating starter kit'
    ],
    boxContents: '3x Round Cake Molds (18cm, 22cm, 26cm), 1x Heart Mold, 1x Silicone Piping Bag + 6 Nozzles, 3x Dough Scrapers',
    specifications: {
      'Material': 'High-Carbon Steel',
      'Coating': 'Double-Layer Teflon Non-Stick',
      'Oven Safe': 'Up to 450°F / 230°C'
    },
    reviews: [
      {
        id: 'rev-12',
        author: 'Ngozi Chukwu',
        rating: 5,
        date: '16 Oct 2026',
        title: 'Cake released effortlessly without greasing',
        comment: 'My sponge cake came out clean with no crumbs stuck to the sides. Lovely set.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'jp-12',
    name: 'Tefal 16-Piece Ceramic Marble Gold-Rimmed Luxury Dinnerware Set (Plates, Soup Bowls & Mugs)',
    brand: 'Tefal',
    category: 'Dining & Cutlery',
    price: 42000,
    oldPrice: 65000,
    discountPercent: 35,
    rating: 4.9,
    reviewCount: 140,
    image: '/src/assets/images/jumia_dish_rack_1793198739810.jpg',
    gallery: [
      '/src/assets/images/jumia_dish_rack_1793198739810.jpg'
    ],
    inStock: true,
    stockCount: 8,
    soldCount: 210,
    isFlashSale: false,
    isExpress: true,
    isOfficialStore: true,
    badge: 'LUXURY DINING',
    description: 'Elevate your dining table with this 16-piece luxury ceramic dinner set featuring a hand-painted 24k gold rim and marble veining pattern. Heavy porcelain fired at 1300°C for exceptional durability, scratch resistance, and dining prestige.',
    keyFeatures: [
      'Service for 4 persons (Dinner plates, salad plates, soup bowls, coffee mugs)',
      'High-grade chip-resistant durable ceramic porcelain',
      'Elegant marble texture with luxury electroplated gold rim',
      'Microwave and dishwasher safe (low heat cycle)',
      'Smooth glazed finish resistant to oil and food discoloration'
    ],
    boxContents: '4x 10.5" Dinner Plates, 4x 8" Salad/Dessert Plates, 4x 6" Soup/Cereal Bowls, 4x 350ml Coffee/Tea Mugs',
    specifications: {
      'Service For': '4 Persons',
      'Piece Count': '16 Pieces',
      'Material': 'Fine Bone Porcelain Ceramic',
      'Finish': 'White Marble & Gold Rim'
    },
    reviews: [
      {
        id: 'rev-13',
        author: 'Ronke Fashola',
        rating: 5,
        date: '04 Oct 2026',
        title: 'Pure class on my dining table',
        comment: 'Hosted my in-laws with this set and received so many compliments. Beautiful weight and finish.',
        verifiedPurchase: true
      }
    ]
  }
];

export const JUMIA_HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'KITCHEN MEGA FESTIVAL',
    subtitle: 'UP TO 40% OFF TOP COOKWARE & APPLIANCES',
    tag: 'EXPLORE TOP DEALS',
    category: 'Cookware & Pots',
    bannerImage: '/src/assets/images/jumia_hero_banner_1793198771022.jpg',
    badge: 'JUMIA EXCLUSIVE'
  },
  {
    id: 'slide-2',
    title: 'HIGH POWER COMMERCIAL BLENDERS',
    subtitle: 'Crush Beans & Tiger Nuts In 30 Seconds • 32,000 RPM',
    tag: 'SHOP BLENDERS',
    category: 'Small Appliances',
    bannerImage: '/src/assets/images/jumia_hero_banner_1793198771022.jpg',
    badge: 'BEST SELLERS'
  },
  {
    id: 'slide-3',
    title: 'SMART DIGITAL AIR FRYERS',
    subtitle: 'Crispy Grilled Fish & Chicken With Zero Oil Splatter',
    tag: 'VIEW AIR FRYERS',
    category: 'Small Appliances',
    bannerImage: '/src/assets/images/jumia_hero_banner_1793198771022.jpg',
    badge: 'HEALTHY LIVING'
  }
];
