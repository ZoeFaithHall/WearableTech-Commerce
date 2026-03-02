import type { Product, SubscriptionOption } from "@/lib/types/commerce";

export const mockProducts: Product[] = [
  {
    id: "ring-gen4",
    name: "Ring Gen4",
    slug: "ring-gen4",
    description:
      "The most advanced health ring. Track sleep, activity, and readiness with clinical-grade sensors.",
    shortDescription: "Our most advanced ring yet.",
    price: 349,
    currency: "USD",
    category: "rings",
    isNew: true,
    inStock: true,
    images: [
      {
        id: "img-gen4-1",
        url: "/images/ring-gen4-silver.webp",
        altText: "Ring Gen4 in silver finish on a dark background",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      { id: "v-gen4-7-silver", productId: "ring-gen4", name: "Size 7 / Silver", size: 7, finish: "silver", sku: "RG4-7-SIL", price: 349, inStock: true, inventoryCount: 42 },
      { id: "v-gen4-7-black", productId: "ring-gen4", name: "Size 7 / Black", size: 7, finish: "black", sku: "RG4-7-BLK", price: 349, inStock: true, inventoryCount: 38 },
      { id: "v-gen4-7-stealth", productId: "ring-gen4", name: "Size 7 / Stealth", size: 7, finish: "stealth", sku: "RG4-7-STL", price: 399, inStock: true, inventoryCount: 15 },
      { id: "v-gen4-7-gold", productId: "ring-gen4", name: "Size 7 / Gold", size: 7, finish: "gold", sku: "RG4-7-GLD", price: 449, inStock: true, inventoryCount: 8 },
      { id: "v-gen4-8-silver", productId: "ring-gen4", name: "Size 8 / Silver", size: 8, finish: "silver", sku: "RG4-8-SIL", price: 349, inStock: true, inventoryCount: 55 },
      { id: "v-gen4-8-black", productId: "ring-gen4", name: "Size 8 / Black", size: 8, finish: "black", sku: "RG4-8-BLK", price: 349, inStock: true, inventoryCount: 47 },
      { id: "v-gen4-8-stealth", productId: "ring-gen4", name: "Size 8 / Stealth", size: 8, finish: "stealth", sku: "RG4-8-STL", price: 399, inStock: false, inventoryCount: 0 },
      { id: "v-gen4-8-gold", productId: "ring-gen4", name: "Size 8 / Gold", size: 8, finish: "gold", sku: "RG4-8-GLD", price: 449, inStock: true, inventoryCount: 3 },
      { id: "v-gen4-9-silver", productId: "ring-gen4", name: "Size 9 / Silver", size: 9, finish: "silver", sku: "RG4-9-SIL", price: 349, inStock: true, inventoryCount: 61 },
      { id: "v-gen4-9-black", productId: "ring-gen4", name: "Size 9 / Black", size: 9, finish: "black", sku: "RG4-9-BLK", price: 349, inStock: true, inventoryCount: 29 },
      { id: "v-gen4-10-silver", productId: "ring-gen4", name: "Size 10 / Silver", size: 10, finish: "silver", sku: "RG4-10-SIL", price: 349, inStock: true, inventoryCount: 33 },
      { id: "v-gen4-10-gold", productId: "ring-gen4", name: "Size 10 / Gold", size: 10, finish: "gold", sku: "RG4-10-GLD", price: 449, inStock: false, inventoryCount: 0 },
    ],
  },
  {
    id: "ring-gen3",
    name: "Ring Gen3",
    slug: "ring-gen3",
    description:
      "Our heritage ring. Proven technology for sleep and activity tracking.",
    shortDescription: "Proven sleep tracking technology.",
    price: 249,
    compareAtPrice: 299,
    currency: "USD",
    category: "rings",
    isNew: false,
    inStock: true,
    images: [
      {
        id: "img-gen3-1",
        url: "/images/ring-gen3-silver.webp",
        altText: "Ring Gen3 in silver finish",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      { id: "v-gen3-7-silver", productId: "ring-gen3", name: "Size 7 / Silver", size: 7, finish: "silver", sku: "RG3-7-SIL", price: 249, inStock: true, inventoryCount: 120 },
      { id: "v-gen3-7-black", productId: "ring-gen3", name: "Size 7 / Black", size: 7, finish: "black", sku: "RG3-7-BLK", price: 249, inStock: true, inventoryCount: 95 },
      { id: "v-gen3-8-silver", productId: "ring-gen3", name: "Size 8 / Silver", size: 8, finish: "silver", sku: "RG3-8-SIL", price: 249, inStock: true, inventoryCount: 87 },
      { id: "v-gen3-8-black", productId: "ring-gen3", name: "Size 8 / Black", size: 8, finish: "black", sku: "RG3-8-BLK", price: 249, inStock: false, inventoryCount: 0 },
      { id: "v-gen3-9-silver", productId: "ring-gen3", name: "Size 9 / Silver", size: 9, finish: "silver", sku: "RG3-9-SIL", price: 249, inStock: true, inventoryCount: 44 },
    ],
  },
  {
    id: "sizing-kit",
    name: "Sizing Kit",
    slug: "sizing-kit",
    description: "Find your perfect ring size before you buy.",
    shortDescription: "Find your perfect fit.",
    price: 0,
    currency: "USD",
    category: "accessories",
    isNew: false,
    inStock: true,
    images: [
      {
        id: "img-sizing-1",
        url: "/images/sizing-kit.webp",
        altText: "Ring sizing kit with multiple size samples",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      { id: "v-sizing-kit", productId: "sizing-kit", name: "Sizing Kit", size: 7, finish: "silver", sku: "SK-001", price: 0, inStock: true, inventoryCount: 500 },
    ],
  },
];

export const mockSubscription: SubscriptionOption = {
  id: "membership-monthly",
  name: "Ring Membership",
  interval: "monthly",
  price: 5.99,
  trialDays: 30,
  features: [
    "Sleep analysis & staging",
    "Readiness score",
    "Activity tracking & goals",
    "Health insights & trends",
    "Blood oxygen monitoring",
    "Temperature tracking",
  ],
};
