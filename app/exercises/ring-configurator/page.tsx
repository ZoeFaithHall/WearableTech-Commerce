"use client";

import { useState } from "react";
import ExercisePage from "@/components/ExercisePage";
import RingConfigurator from "@/solutions/02-RingConfigurator.solution";
import { mockProducts } from "@/lib/data/products";
import type { ProductVariant } from "@/lib/types/commerce";

export default function RingConfiguratorExercise() {
  const product = mockProducts[0]!;
  const [selected, setSelected] = useState<ProductVariant | null>(null);

  return (
    <ExercisePage
      number="2"
      title="Ring Configurator"
      time="25–30 min build from scratch"
      scenario="The core commerce interaction on any ring storefront: select a size and finish, see the price update live, and handle out-of-stock combinations. Built from an empty file."
      changes={[
        {
          category: "pattern",
          title: "Derived variant via useMemo, not managed state",
          description:
            "The selected variant is a function of size + finish — it's derived data, not independent state. useMemo recalculates only when size, finish, or variants change. No useEffect, no extra render cycle.",
        },
        {
          category: "pattern",
          title: "Options derived from data, not hardcoded",
          description:
            "Available sizes and finishes are derived from the variants array with Set + sort, not hardcoded arrays. If the product's variant list changes (new finish, discontinued size), the UI updates automatically.",
        },
        {
          category: "types",
          title: "Generic variant status checker",
          description:
            "getVariantStatus() returns a union type: 'available' | 'out-of-stock' | 'unavailable'. This drives the visual state (normal, strikethrough, dimmed) and aria labels from a single source of truth.",
        },
        {
          category: "a11y",
          title: "Accessible radio groups",
          description:
            "Each selector uses fieldset/legend for grouping, role=\"radiogroup\" for the container, role=\"radio\" with aria-checked for each option, and aria-disabled for unavailable combinations. Screen readers announce the full context.",
        },
        {
          category: "a11y",
          title: "Live price region",
          description:
            "The price display has aria-live=\"polite\" so screen readers announce price changes when the user selects a different size or finish, without interrupting their current focus.",
        },
        {
          category: "ux",
          title: "Combination-level stock checking",
          description:
            "Stock is checked at the size × finish intersection, not per-attribute. Size 8 might be in stock for silver but out of stock for stealth. The UI reflects this per-combination status.",
        },
      ]}
      beforeSlot={
        <div className="exercise-page__empty-state">
          <div className="label" style={{ marginBottom: 8 }}>// Empty starter file</div>
          <p>Built from scratch — no broken version to refactor.</p>
          <pre className="exercise-page__code-hint">{`import type { RingSize, RingFinish, ProductVariant } 
  from "@/lib/types/commerce";

// Step 1: Define your props interface
// Step 2: Build the component  
// Step 3: Export it`}</pre>
        </div>
      }
      afterSlot={
        <div>
          <RingConfigurator
            variants={product.variants}
            defaultSize={7}
            defaultFinish="silver"
            onVariantSelect={setSelected}
          />
          {selected && (
            <button
              className="product-card__cta"
              style={{ marginTop: 16, maxWidth: 300 }}
              disabled={!selected.inStock}
            >
              {selected.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      }
    />
  );
}
