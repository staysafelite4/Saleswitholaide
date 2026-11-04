import { Dish, RestaurantConfig, TableReservation, TakeoutOrder } from '../types/restaurant';

export const RESTAURANT_HERO_IMAGE = '/src/assets/images/template_restaurant_food_1793191761370.jpg';
export const AFRICAN_EGUSI_IMAGE = '/src/assets/images/african_egusi_soup_1793194327433.jpg';
export const AFRICAN_JOLLOF_IMAGE = '/src/assets/images/african_party_jollof_1793194339863.jpg';
export const AFRICAN_SEAFOOD_IMAGE = '/src/assets/images/african_fisherman_soup_1793194353111.jpg';
export const RESTAURANT_SUYA_IMAGE = '/src/assets/images/restaurant_suya_skewer_1793192277150.jpg';
export const RESTAURANT_FISH_IMAGE = '/src/assets/images/restaurant_grilled_fish_1793192277065.jpg';
export const RESTAURANT_DRINK_IMAGE = '/src/assets/images/hero_zobo_drink_1793191126883.jpg';

export const AFRICAN_DISH_PRESETS = [
  { label: 'Egusi Soup & Pounded Yam', url: AFRICAN_EGUSI_IMAGE },
  { label: 'Smoky Firewood Party Jollof', url: AFRICAN_JOLLOF_IMAGE },
  { label: 'Fisherman Seafood Okra Soup', url: AFRICAN_SEAFOOD_IMAGE },
  { label: 'Kano Prime Beef Suya', url: RESTAURANT_SUYA_IMAGE },
  { label: 'Whole Charred Croaker & Bole', url: RESTAURANT_FISH_IMAGE },
  { label: 'Bukka Feast Table', url: RESTAURANT_HERO_IMAGE },
  { label: 'Chilled Hibiscus Zobo', url: RESTAURANT_DRINK_IMAGE }
];

export const INITIAL_DISHES: Dish[] = [
  {
    id: 'dish_egusi_soup',
    name: 'Authentic Rich Egusi Soup & Steaming Pounded Yam',
    nativeName: 'Ofe Egusi & Iyan',
    tagline: 'Slow-simmered melon seeds with bitterleaf, pumpkin leaves, goat meat & shaki',
    description: 'The crowning glory of Nigerian hospitality. Ground melon seeds slowly simmered in rich palm oil and seasoned with locust beans (iru), crayfish, and ground pepper. Packed with tender goat meat chunks, honeycomb shaki (tripe), and dried catfish. Served with smooth, piping-hot pounded yam.',
    price: 18,
    compareAtPrice: 22,
    category: 'soups_swallows',
    image: AFRICAN_EGUSI_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Medium',
    prepTime: '15-20 min',
    serves: '1-2 Persons',
    swallowOptions: ['Steaming Pounded Yam', 'Soft Fluffy Amala', 'Yellow Garri Eba', 'Semovita', 'Starch'],
    proteinOptions: ['Goat Meat & Honeycomb Shaki', 'Assorted Beef & Soft Kpomo', 'Smoked Dried Catfish', 'Fried Tilapia Cutlet'],
    sideOptions: ['Extra Soup Bowl (+$6)', 'Extra Pounded Yam Wrap (+$3)', 'Sweet Fried Dodo (+$3)'],
    featured: true,
    orderCount: 1140
  },
  {
    id: 'dish_party_jollof_feast',
    name: 'Smoky Firewood Party Jollof & Peppered Chicken',
    nativeName: 'Naija Firewood Jollof',
    tagline: 'Smoky cast-iron basmati rice cooked over firewood with dodo and flame-grilled chicken',
    description: 'The undisputed champion of West African celebrations. Long-grain parboiled basmati infused with caramelized tomatoes, roasted red tatashe peppers, scotch bonnets, and bay leaves, crowned with that unmistakable firewood smoky aroma. Accompanied by sweet fried plantains (dodo) and succulent flame-charred peppered chicken.',
    price: 16,
    compareAtPrice: 20,
    category: 'jollof_rice',
    image: AFRICAN_JOLLOF_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Medium',
    prepTime: '15-20 min',
    serves: '1-2 Persons',
    proteinOptions: ['Flame-Grilled Peppered Chicken', 'Spicy Peppered Goat Asun (+$3)', 'Fried Beef Chunks & Kpomo', 'Crispy Croaker Fish Cutlet'],
    sideOptions: ['Sweet Fried Dodo (Plantain)', 'Coleslaw with Raisins', 'Extra Asun Chunks (+$5)', 'Moin Moin Elemi Meji (+$4)'],
    featured: true,
    orderCount: 1890
  },
  {
    id: 'dish_fisherman_soup',
    name: 'Luxury Niger Delta Fisherman Soup & Seafood Okra',
    nativeName: 'Ofe Ndi Mmiri',
    tagline: 'Jumbo tiger prawns, fresh live catfish, blue crabs, periwinkles & uziza leaves',
    description: 'A coastal culinary masterpiece from the Niger Delta creeks. Freshly caught river catfish, jumbo sea prawns, and blue crab claws simmered in a light aromatic broth flavored with native uziza seeds, yellow cameroon pepper, and periwinkles. Finished with chopped crunchy okra and eaten with yellow garri or starch.',
    price: 28,
    compareAtPrice: 34,
    category: 'seafood',
    image: AFRICAN_SEAFOOD_IMAGE,
    availability: 'chef_special',
    spiceLevel: 'Fiery Hot (Naija Standard)',
    prepTime: '25-30 min',
    serves: '2 Persons',
    swallowOptions: ['Yellow Garri Eba', 'Delta Starch', 'Steaming Pounded Yam', 'Soft Semovita'],
    proteinOptions: ['Full Seafood Medley (Prawns, Catfish & Crab)', 'Extra Jumbo Prawns (+$8)', 'Whole Catfish Steak'],
    sideOptions: ['Extra Yellow Eba Wrap (+$3)', 'Extra Seafood Broth Bowl (+$8)', 'Sweet Fried Plantains (+$3)'],
    featured: true,
    orderCount: 520
  },
  {
    id: 'dish_suya_special',
    name: 'Kano Mai-Suya Prime Beef Suya & Tozo Skewers',
    nativeName: 'Kano Suya & Yaji',
    tagline: 'Tender prime beef and succulent tozo rubbed with authentic Hausa Yaji pepper',
    description: 'Thinly shaved prime beef and tender tozo (hump fat) skewered and coated in cold-pressed groundnut oil and authentic Kano Yaji spice (kulikuli, ginger, chili, and cloves). Grilled over intense hardwood coals until charred and smoky, wrapped in traditional butcher paper with freshly sliced red onions and ripe garden tomatoes.',
    price: 14,
    compareAtPrice: 17,
    category: 'grills_suya',
    image: RESTAURANT_SUYA_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Fiery Hot (Naija Standard)',
    prepTime: '15-20 min',
    serves: '1-2 Persons',
    proteinOptions: ['Prime Beef Fillet', 'Succulent Tozo Hump (+$2)', 'Mixed Beef & Tozo Skewers', 'Boneless Chicken Suya'],
    sideOptions: ['Extra Spicy Yaji Pepper', 'Sweet Fried Dodo (+$3)', 'Crispy Fried Yam Fries (+$3)'],
    featured: true,
    orderCount: 1420
  },
  {
    id: 'dish_croaker_grilled',
    name: 'Whole Charred Croaker Fish & Roasted Bole',
    nativeName: 'Port Harcourt Bole & Fish',
    tagline: 'Fresh Atlantic croaker with scotch bonnet glaze, roasted plantains & palm pepper sauce',
    description: 'Fresh whole Atlantic croaker seasoned with crushed garlic, native Cameroon chili, and ginger. Flame-grilled over open coals until skin is blistered and flesh melts in the mouth. Served Port Harcourt style with sweet roasted ripe plantain (Bole) and a spicy palm oil pepper dip.',
    price: 26,
    compareAtPrice: 32,
    category: 'seafood',
    image: RESTAURANT_FISH_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Medium',
    prepTime: '25-30 min',
    serves: '2 Persons',
    sideOptions: ['Roasted Plantains (Bole)', 'Sweet Fried Dodo', 'Fried Yam Wedges', 'Smoky Jollof Rice (+$4)'],
    featured: true,
    orderCount: 780
  },
  {
    id: 'dish_efo_riro',
    name: 'Yoruba Bukka Efo Riro Elegusi with Assorted Meat',
    nativeName: 'Efo Riro Elegusi',
    tagline: 'Rich shoko and tete greens stewed with locust beans, stockfish, shaki & kpomo',
    description: 'A deeply aromatic Yoruba vegetable stew made from blanched greens, coarse ground melon seeds, and iru (fermented locust beans) cooked in unrefined red palm oil. Packed with shredded stockfish head, dried panla fish, soft kpomo, and tender cow foot.',
    price: 18,
    compareAtPrice: 22,
    category: 'soups_swallows',
    image: AFRICAN_EGUSI_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Medium',
    prepTime: '20 min',
    serves: '1-2 Persons',
    swallowOptions: ['Soft Fluffy Amala', 'Steaming Pounded Yam', 'Yellow Garri Eba', 'Semovita'],
    proteinOptions: ['Assorted Meat (Shaki, Kpomo, Beef)', 'Goat Meat Chunks', 'Smoked Dried Fish'],
    sideOptions: ['Extra Amala Wrap (+$3)', 'Extra Soup Bowl (+$6)', 'Sweet Fried Dodo (+$3)'],
    featured: false,
    orderCount: 890
  },
  {
    id: 'dish_ofada_ayamase',
    name: 'Designer Ofada Rice & Green Pepper Ayamase Stew',
    nativeName: 'Ofada & Ayamase (Obe Ata)',
    tagline: 'Unpolished native short-grain rice served in Uma leaves with spicy boiled egg stew',
    description: 'Unpolished nutritious indigenous Ofada rice wrapped in sweet aromatic Uma leaves. Drenched in authentic Ayamase designer stew made from bleached palm oil, green scotch bonnets, locust beans, diced kpomo, assorted beef bites, and boiled eggs.',
    price: 17,
    compareAtPrice: 21,
    category: 'jollof_rice',
    image: AFRICAN_JOLLOF_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Fiery Hot (Naija Standard)',
    prepTime: '20 min',
    serves: '1-2 Persons',
    proteinOptions: ['Assorted Diced Kpomo & Beef', 'Goat Meat Chunks', 'Fried Turkey Quarter (+$3)'],
    sideOptions: ['Extra Boiled Egg (+$1.50)', 'Sweet Fried Dodo (+$3)', 'Extra Ayamase Sauce (+$4)'],
    featured: true,
    orderCount: 960
  },
  {
    id: 'dish_asun_platter',
    name: 'Fiery Peppered Goat Meat Asun Platter',
    nativeName: 'Ondo Style Spicy Asun',
    tagline: 'Smoky fire-roasted goat meat tossed in crushed scotch bonnets, garlic & onions',
    description: 'The real deal from Ondo state. Tender young goat meat slow-charred over open wood flame, chopped into bite-sized morsels and sauteed in crushed green and red habanero peppers, sweet sliced onions, and aromatic native spices.',
    price: 15,
    compareAtPrice: 18,
    category: 'grills_suya',
    image: RESTAURANT_HERO_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Fiery Hot (Naija Standard)',
    prepTime: '15 min',
    serves: '1-2 Persons',
    proteinOptions: ['Pure Young Goat Meat', 'Goat Meat & Kpomo Mix'],
    sideOptions: ['Extra Scotch Bonnet Pepper Dip', 'Crispy Yam Fries (+$3)', 'Sweet Fried Dodo (+$3)'],
    featured: false,
    orderCount: 1310
  },
  {
    id: 'dish_jollof_party_cooler',
    name: 'The Mega African Bukka Party Cooler (5 Liters)',
    nativeName: 'Party Jollof & Asun Cooler',
    tagline: 'Massive party pot with 10 portions of Firewood Jollof, 10 Fried Dodo & 10 Proteins',
    description: 'The ultimate catering cooler for family Sundays, office celebrations, birthdays, and parties. A sealed 5-liter thermal cooler packed with hot firewood jollof rice, 10 portions of fried sweet plantain, and your choice of 10 portions of peppered chicken, goat asun, or assorted beef.',
    price: 110,
    compareAtPrice: 135,
    category: 'party_coolers',
    image: AFRICAN_JOLLOF_IMAGE,
    availability: 'chef_special',
    spiceLevel: 'Medium',
    prepTime: '45-60 min',
    serves: '8-12 Persons',
    proteinOptions: ['10x Flame-Grilled Peppered Chicken', '10x Spicy Peppered Goat Asun', 'Assorted Mix (5 Chicken + 5 Asun)'],
    sideOptions: ['Extra Large Moin Moin Platter (+$20)', 'Extra 2-Liter Egusi Pot (+$35)'],
    featured: true,
    orderCount: 185
  },
  {
    id: 'dish_chilled_hibiscus_zobo',
    name: 'Chilled Handcrafted Hibiscus & Ginger Tonic (750ml)',
    nativeName: 'Chilled Zobo Drink',
    tagline: 'Slow-steeped organic Kano hibiscus with crushed ginger, cloves, citrus & pineapple',
    description: 'The perfect cooling companion to spicy African soups and fiery grills. Stepped from organic dried crimson roselle calyces, fresh grated spicy ginger, cloves, and whole crushed pineapple.',
    price: 8,
    category: 'drinks',
    image: RESTAURANT_DRINK_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Mild',
    prepTime: 'Instant Chilled',
    serves: '2-3 Glasses',
    featured: false,
    orderCount: 1250
  },
  {
    id: 'dish_fresh_palm_wine',
    name: 'Freshly Tapped Sweet Palm Wine Toddy (1 Liter Carafe)',
    nativeName: 'Emu / Oguro / Palm Wine',
    tagline: 'Authentic unfiltered village tap palm wine served chilled in traditional calabash',
    description: 'Pure, sweet, natural fermented palm sap harvested directly from wild oil palms. Served frosty cold in a chilled carafe with subtle natural effervescence.',
    price: 10,
    category: 'drinks',
    image: RESTAURANT_DRINK_IMAGE,
    availability: 'ready_to_cook',
    spiceLevel: 'Mild',
    prepTime: 'Instant Chilled',
    serves: '3-4 Calabashes',
    featured: true,
    orderCount: 710
  }
];

export const INITIAL_RESTAURANT_CONFIG: RestaurantConfig = {
  restaurantName: 'Savanna African Bukka & Feast Kitchen',
  tagline: '100% Authentic Nigerian & West African Culinary Delicacies',
  logoIcon: 'flame',
  whatsappNumber: '2348030795206',
  contactPhone: '+234 803 079 5206',
  contactEmail: 'orders@savannaafricanbukka.com',
  kitchenAddress: '22 Akin Adesola Street, Victoria Island, Lagos, Nigeria',
  operatingHours: 'Mon - Sun: 10:30 AM – 11:30 PM (Kitchen Takeout Closes 11:00 PM)',
  currencySymbol: '$',
  currencyCode: 'CAD',
  baseDeliveryFee: 5,
  freeDeliveryThreshold: 50,
  minOrderAmount: 12,
  promoBanner: {
    enabled: true,
    text: '🍲 Firewood Feast Week: Order any Native Soup & Swallow or Jollof Feast, get a FREE 750ml Chilled Zobo!',
    badgeText: 'Bukka Special',
    linkText: 'Order Egusi & Pounded Yam',
    linkUrl: '#dish_egusi_soup',
    bgColor: 'flame'
  },
  deliveryZones: [
    { zone: 'Victoria Island & Oniru', fee: 5, eta: '25-35 mins' },
    { zone: 'Ikoyi & Banana Island', fee: 6, eta: '30-40 mins' },
    { zone: 'Lekki Phase 1 to Chevron Toll', fee: 7, eta: '35-45 mins' },
    { zone: 'Ikeja, Yaba & Surulere Mainland', fee: 10, eta: '45-60 mins' },
    { zone: 'Ajah, Sangotedo & Beyond', fee: 12, eta: '50-65 mins' }
  ]
};

export const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'RES-402',
    guestName: 'Chief Kunle Adeleke',
    guestPhone: '+234 802 334 9911',
    date: 'Tonight',
    time: '8:00 PM',
    partySize: 'VIP Bukka Booth (6-8)',
    seatingArea: 'Private VIP Palm Lounge',
    specialOccasion: 'Family Celebration',
    notes: 'Please prepare 3 bowls of steaming Egusi and Fisherman Soup with Pounded Yam on arrival',
    status: 'confirmed',
    timestamp: '2026-10-28 11:00 AM'
  },
  {
    id: 'RES-401',
    guestName: 'Dr. Ngozi Okonjo',
    guestPhone: '+234 813 445 6677',
    date: 'Tomorrow Evening',
    time: '7:30 PM',
    partySize: 'Table for 2',
    seatingArea: 'Open-Air Flame Terrace',
    notes: 'Corner terrace table for Suya and Palm Wine tasting',
    status: 'confirmed',
    timestamp: '2026-10-28 09:15 AM'
  }
];

export const INITIAL_TAKEOUT_ORDERS: TakeoutOrder[] = [
  {
    id: 'SAV-9021',
    customerName: 'Tunde Bakare',
    customerPhone: '+234 809 112 3344',
    deliveryAddress: 'Flat 5, 10 Karimu Kotun, Victoria Island',
    deliveryZone: 'Victoria Island & Oniru',
    deliveryType: 'Hot Courier Delivery',
    preferredTime: 'ASAP (Hot Delivery)',
    paymentMethod: 'Instant Bank Transfer',
    notes: 'Please extra yaji pepper on the suya and wrap pounded yam hot.',
    items: [
      {
        id: 'dish_egusi_soup',
        name: 'Authentic Rich Egusi Soup & Steaming Pounded Yam',
        quantity: 2,
        price: 18,
        swallow: 'Steaming Pounded Yam',
        protein: 'Goat Meat & Honeycomb Shaki',
        side: 'Sweet Fried Dodo',
        spiceLevel: 'Medium'
      },
      {
        id: 'dish_suya_special',
        name: 'Kano Mai-Suya Prime Beef Suya & Tozo Skewers',
        quantity: 2,
        price: 14,
        protein: 'Prime Beef Fillet',
        side: 'Extra Spicy Yaji Pepper',
        spiceLevel: 'Fiery Hot (Naija Standard)'
      }
    ],
    subtotal: 64,
    deliveryFee: 5,
    total: 69,
    status: 'cooking',
    timestamp: '2026-10-28 12:45 PM'
  }
];
