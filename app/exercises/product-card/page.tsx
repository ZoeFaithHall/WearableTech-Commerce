"use client";

import ExercisePage from "@/components/ExercisePage";
import ProductCardBefore from "@/exercises/01-refactor-product-card/ProductCard";
import ProductCardAfter from "@/solutions/01-ProductCard.solution";
import { mockProducts } from "@/lib/data/products";

export default function ProductCardExercise() {
  const product = mockProducts[0]!;

  return (
    <ExercisePage
      number="1"
      title="Product Card"
      time="25–30 min refactor"
      scenario="A product card with variant selection, pricing, and add-to-cart. The original has ~20 issues across bugs, types, React patterns, accessibility, and UX."
      changes={[
        {
          category: "bug",
          title: "Event bubbling on card click",
          description:
            "The entire card div had an onClick for navigation. Clicking size or finish buttons also triggered navigation. Fixed by moving navigation to a dedicated button and adding e.stopPropagation() on selectors.",
        },
        {
          category: "bug",
          title: "Loose equality in variant lookup",
          description:
            "handleAddToCart used == instead of ===. In a storefront with mixed types from an API, this could match wrong variants. Switched to strict equality.",
        },
        {
          category: "bug",
          title: "Missing useEffect dependency",
          description:
            "useEffect for price derivation was missing props.product.variants in its dependency array. If the product changed (navigation, restock), the price wouldn't update.",
        },
        {
          category: "types",
          title: "Props typed as any",
          description:
            "Defined a ProductCardProps interface with Product, AddToCartPayload callback, and navigation handler. Eliminated all any types including the variant find callback.",
        },
        {
          category: "pattern",
          title: "useEffect for derived state → useMemo",
          description:
            "Price was calculated via useEffect + setState, causing a render cycle and a flash of $0 on mount. Replaced with useMemo — the selected variant and price derive directly from size + finish selection.",
        },
        {
          category: "pattern",
          title: "Duplicate variant lookup",
          description:
            "The variant was looked up in both useEffect and handleAddToCart. Consolidated into a single useMemo that both the price display and add-to-cart handler reference.",
        },
        {
          category: "a11y",
          title: "No alt text, no ARIA roles",
          description:
            "Added alt text from the product image data, role=\"radiogroup\" with aria-checked for size and finish selectors, fieldset/legend grouping, and aria-live=\"polite\" on the price so screen readers announce changes.",
        },
        {
          category: "a11y",
          title: "Card div with onClick not focusable",
          description:
            "A div with onClick isn't keyboard accessible or announced as interactive. Replaced with a semantic button for the navigation target, separate from the selector controls.",
        },
        {
          category: "ux",
          title: "No out-of-stock handling",
          description:
            "Added stock checking at the variant level. Out-of-stock combinations show a warning, disable the CTA, and change the button label to 'Out of Stock'.",
        },
        {
          category: "ux",
          title: "Price formatting",
          description:
            "Replaced string concatenation ($) with Intl.NumberFormat for proper currency formatting. For a storefront serving 100+ countries, this handles locale-specific formatting automatically.",
        },
      ]}
      beforeSlot={
        <ProductCardBefore
          product={product}
          onAddToCart={(p: any) => console.log("Before — added:", p)}
        />
      }
      afterSlot={
        <ProductCardAfter
          product={product}
          onAddToCart={(p) => console.log("After — added:", p)}
          onNavigate={(slug) => console.log("Navigate:", slug)}
        />
      }
    />
  );
}
