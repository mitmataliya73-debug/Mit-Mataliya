export type CategoryType = 'clothing' | 'accessories' | 'collectibles' | 'new-drop';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  badge?: 'FEATURED DROP' | 'FAN FAVOURITE' | 'HIGH INTEREST' | 'LIMITED' | 'BESTSELLER';
  shortDescription: string;
  description: string;
  details: string[];
  material: string;
  shippingInfo: string;
  returnsInfo: string;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  highInterest?: boolean;
  // GA4 Academic Metadata
  ga4Stats?: {
    views: number;
    addToCarts: number;
    purchases: number;
    revenue: number;
    insightNote?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'category' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'campaign' 
  | 'about';

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'bestselling';
  searchQuery: string;
  onlyInStock: boolean;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit-card' | 'google-pay' | 'apple-pay';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface GA4Event {
  id: string;
  timestamp: string;
  eventName: string;
  parameters: Record<string, any>;
}
