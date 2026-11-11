export type Language = 'en' | 'hi' | 'hinglish' | 'mr' | 'ta';

export type UserRole = 'vendor' | 'customer' | 'shg_member';

export type ProductStatus = 'available' | 'sold_out' | 'tomorrow_only';

export type BusinessCategory = 
  | 'Street Food' 
  | 'Home Kitchen' 
  | 'Pickles & Spices' 
  | 'Handicrafts & Art' 
  | 'Traditional Clothing' 
  | 'Bakery & Sweets';

export interface Product {
  id: string;
  storeId: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  unit: string; // e.g. "plate", "kg", "pack", "piece"
  category: string;
  imageUrl: string;
  status: ProductStatus;
  stockQuantity: number;
  isVeg: boolean;
  costToProduce?: number;
  rating?: number;
  tags?: string[];
}

export interface Store {
  id: string;
  name: string;
  tagline: string;
  category: BusinessCategory;
  ownerName: string;
  phone: string;
  location: string;
  city: string;
  logoUrl: string;
  bannerUrl: string;
  story: string;
  hygieneCertified: boolean;
  upiId: string;
  rating: number;
  reviewCount: number;
  establishedYear: number;
  isSHG?: boolean;
  shgGroupName?: string;
  language: Language;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'Cash' | 'UPI';
  paymentStatus: 'Paid' | 'Pending';
  status: 'Received' | 'Preparing' | 'Ready' | 'Delivered';
  createdAt: string;
  deliveryType: 'Pickup' | 'Home Delivery';
}

export interface Transaction {
  id: string;
  storeId: string;
  amount: number;
  type: 'Cash' | 'UPI';
  customerName: string;
  customerPhone?: string;
  note: string;
  timestamp: string;
}

export interface Review {
  id: string;
  storeId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedOrder: boolean;
  vendorReply?: string;
}

export interface SHGMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  itemsContributedCount: number;
  totalEarningsShare: number;
  payoutStatus: 'Paid' | 'Pending' | 'Processing';
  lastContribution: string;
  specialtySkill: string;
}

export interface SHGGroup {
  id: string;
  name: string;
  leaderName: string;
  villageOrCity: string;
  totalMembers: number;
  activeOrders: number;
  totalMonthlyRevenue: number;
  pooledFundBalance: number;
  bankLinkedAccount: string;
}

export interface PricingBreakdown {
  rawIngredients: number;
  labourHours: number;
  hourlyRate: number;
  packagingCost: number;
  fuelAndOverhead: number;
  unitsProduced: number;
  targetMarginPercent: number;
}

export interface LoanScheme {
  id: string;
  title: string;
  subsidy: string;
  maxAmount: number;
  interestRate: string;
  description: string;
  suitableFor: string;
  features: string[];
}
