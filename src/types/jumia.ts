export interface JumiaReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface JumiaProduct {
  id: string;
  name: string;
  brand: string;
  category: 
    | 'Cookware & Pots' 
    | 'Small Appliances' 
    | 'Utensils & Gadgets' 
    | 'Food Storage' 
    | 'Bakeware' 
    | 'Dining & Cutlery' 
    | 'Kitchen Organization';
  price: number;
  oldPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  soldCount: number;
  isFlashSale: boolean;
  isExpress: boolean;
  isOfficialStore: boolean;
  badge?: string;
  description: string;
  keyFeatures: string[];
  boxContents: string;
  specifications: Record<string, string>;
  reviews: JumiaReview[];
}

export interface CartItem {
  product: JumiaProduct;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  additionalPhone?: string;
  deliveryAddress: string;
  state: string;
  lga: string;
}

export interface OrderRecord {
  orderId: string;
  date: string;
  customerName: string;
  phoneNumber: string;
  state: string;
  lga: string;
  deliveryAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryType: 'door_delivery' | 'station_pickup';
  paymentMethod: 'pay_on_delivery' | 'card_transfer' | 'whatsapp';
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
}
