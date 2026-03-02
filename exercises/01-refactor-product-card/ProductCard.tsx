"use client";

// ═══════════════════════════════════════════════════════════════════
// EXERCISE 1: Refactor the Product Card
// Time: 25–30 minutes
// ═══════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS:
// This component works but has ~20 issues across five categories:
//   🔴 Bugs   🟡 Type Safety   🟠 React Patterns   🔵 A11y   🟣 UX
//
// YOUR TASK:
//   1. Read the entire component (2 min)
//   2. List issues OUT LOUD (3 min)
//   3. Prioritize: types → bugs → patterns → a11y → polish
//   4. Refactor incrementally — don't rewrite from scratch
//
// HINT: There's a critical event bubbling bug.
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";

const ProductCard = (props: any) => {
  const [selectedSize, setSelectedSize] = useState(7);
  const [selectedFinish, setSelectedFinish] = useState("silver");
  const [isInCart, setIsInCart] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const variant = props.product.variants.find(
      (v: any) => v.size === selectedSize && v.finish === selectedFinish
    );
    if (variant) {
      setPrice(variant.price);
    }
  }, [selectedSize, selectedFinish]);

  const handleAddToCart = () => {
    const variant = props.product.variants.find(
      (v: any) => v.size == selectedSize && v.finish == selectedFinish
    );
    if (variant) {
      setIsInCart(true);
      props.onAddToCart &&
        props.onAddToCart({
          product: props.product,
          variant: variant,
          quantity: 1,
        });
      setTimeout(() => setIsInCart(false), 2000);
    }
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}
      onClick={() => (window.location.href = `/products/${props.product.slug}`)}
    >
      <img src={props.product.images[0].url} />
      <h3>{props.product.name}</h3>
      <p>${price}</p>

      <div>
        {[6, 7, 8, 9, 10, 11, 12, 13].map((size) => (
          <button
            key={size}
            style={{
              background: selectedSize === size ? "black" : "white",
              color: selectedSize === size ? "white" : "black",
            }}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <div>
        {["silver", "black", "stealth", "gold"].map((finish) => (
          <button
            key={finish}
            style={{
              background: selectedFinish === finish ? "black" : "white",
              color: selectedFinish === finish ? "white" : "black",
            }}
            onClick={() => setSelectedFinish(finish)}
          >
            {finish}
          </button>
        ))}
      </div>

      <button onClick={handleAddToCart} disabled={isInCart}>
        {isInCart ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
