export type DishAvailability = 'ready_to_cook' | 'low_prep' | 'sold_out_today' | 'chef_special';

export interface Dish {
  id: string;
  name: string;
  nativeName?: string; // e.g. "Ofe Egusi", "Asun", "Obe Ofada", "Bole"
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'soups_swallows' | 'jollof_rice' | 'grills_suya' | 'seafood' | 'party_coolers' | 'drinks' | 'sides';
  image: string;
  availability: DishAvailability;
  spiceLevel: 'Mild' | 'Medium' | 'Fiery Hot (Naija Standard)';
  prepTime: string; // e.g. "15-20 min"
  serves: string; // e.g. "1-2 Persons"
  swallowOptions?: string[]; // e.g. ['Pounded Yam', 'Soft Amala', 'Yellow Garri Eba', 'Semovita']
  proteinOptions?: string[]; // e.g. ['Goat Meat & Shaki', 'Assorted Beef & Kpomo', 'Smoked Catfish', 'Fried Croaker']
  sideOptions?: string[]; // e.g. ['Fried Sweet Dodo', 'Extra Soup Bowl', 'Extra Swallow Wrap']
  featured: boolean;
  orderCount: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  date: string;
  time: string;
  partySize: string; // e.g. "Table for 2", "VIP Bukka Booth (6-8)", "Family Feast (10+)"
  seatingArea: 'Indoor African Bukka Hall' | 'Open-Air Flame Terrace' | 'Private VIP Palm Lounge';
  specialOccasion?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'seated' | 'cancelled';
  timestamp: string;
}

export interface TakeoutOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryZone: string;
  deliveryType: 'Hot Courier Delivery' | 'Kitchen Pickup';
  preferredTime: string;
  paymentMethod: string;
  notes?: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    swallow?: string;
    protein?: string;
    side?: string;
    spiceLevel?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'cooking' | 'out_for_delivery' | 'completed';
  timestamp: string;
}

export interface RestaurantConfig {
  restaurantName: string;
  tagline: string;
  logoIcon: string;
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  kitchenAddress: string;
  operatingHours: string;
  currencySymbol: string;
  currencyCode: string;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderAmount: number;
  promoBanner: {
    enabled: boolean;
    text: string;
    badgeText?: string;
    linkText?: string;
    linkUrl?: string;
    bgColor: 'charcoal' | 'flame' | 'amber' | 'emerald';
  };
  deliveryZones: { zone: string; fee: number; eta: string }[];
}
