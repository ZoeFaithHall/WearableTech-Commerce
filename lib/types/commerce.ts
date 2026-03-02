// ═══════════════════════════════════════════════════════════════════
// Commerce Domain Types
// Models the full product → variant → cart → checkout pipeline.
// ═══════════════════════════════════════════════════════════════════

// ── Product Domain ────────────────────────────────────────────────

export type RingSize = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type RingFinish =
  | "silver"
  | "black"
  | "stealth"
  | "gold"
  | "rose-gold";

export type ProductCategory =
  | "rings"
  | "accessories"
  | "bundles"
  | "membership";

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  size: RingSize;
  finish: RingFinish;
  sku: string;
  price: number;
  inStock: boolean;
  inventoryCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: ProductCategory;
  isNew: boolean;
  inStock: boolean;
}

// ── Cart Domain ───────────────────────────────────────────────────

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  subscription?: SubscriptionOption;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

// ── Subscription Domain ───────────────────────────────────────────

export interface SubscriptionOption {
  id: string;
  name: string;
  interval: "monthly" | "annual";
  price: number;
  trialDays: number;
  features: string[];
}

// ── Checkout Domain ───────────────────────────────────────────────

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: string;
  total: number;
}

// ── Utility Types ─────────────────────────────────────────────────

export interface AddToCartPayload {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

// ── Constants ─────────────────────────────────────────────────────

export const RING_SIZES: RingSize[] = [6, 7, 8, 9, 10, 11, 12, 13];

export const RING_FINISHES: RingFinish[] = [
  "silver",
  "black",
  "stealth",
  "gold",
  "rose-gold",
];
