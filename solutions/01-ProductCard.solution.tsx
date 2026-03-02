"use client";

import { useState, useMemo, useCallback } from "react";
import type {
  Product,
  RingSize,
  RingFinish,
  AddToCartPayload,
} from "@/lib/types/commerce";

interface ProductCardProps {
  product: Product;
  onAddToCart: (payload: AddToCartPayload) => void;
  onNavigate: (slug: string) => void;
}

const SIZES: RingSize[] = [6, 7, 8, 9, 10, 11, 12, 13];
const FINISHES: RingFinish[] = ["silver", "black", "stealth", "gold"];

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedSize, setSelectedSize] = useState<RingSize>(7);
  const [selectedFinish, setSelectedFinish] = useState<RingFinish>("silver");
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (v) => v.size === selectedSize && v.finish === selectedFinish
      ) ?? null,
    [product.variants, selectedSize, selectedFinish]
  );

  const displayPrice = selectedVariant?.price ?? product.price;
  const isOutOfStock = selectedVariant ? !selectedVariant.inStock : false;

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant || !selectedVariant.inStock) return;
    onAddToCart({ product, variant: selectedVariant, quantity: 1 });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }, [selectedVariant, product, onAddToCart]);

  const heroImage = product.images[0];

  return (
    <article className="product-card">
      <button
        className="product-card__image-link"
        onClick={() => onNavigate(product.slug)}
        aria-label={`View ${product.name} details`}
      >
        {heroImage ? (
          <img
            src={heroImage.url}
            alt={heroImage.altText || `${product.name} product photo`}
            loading="lazy"
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true" />
        )}
        {product.isNew && <span className="product-card__badge">New</span>}
      </button>

      <h3 className="product-card__name">{product.name}</h3>

      <p className="product-card__price" aria-live="polite">
        {product.compareAtPrice && (
          <span className="product-card__compare-price">
            <s>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: product.currency,
              }).format(product.compareAtPrice)}
            </s>{" "}
          </span>
        )}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: product.currency,
        }).format(displayPrice)}
      </p>

      <fieldset className="product-card__selector">
        <legend>Ring Size</legend>
        <div role="radiogroup" aria-label="Ring size">
          {SIZES.map((size) => (
            <button
              key={size}
              role="radio"
              aria-checked={selectedSize === size}
              aria-label={`Size ${size}`}
              className={`selector-option ${selectedSize === size ? "selector-option--active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="product-card__selector">
        <legend>Finish</legend>
        <div role="radiogroup" aria-label="Ring finish">
          {FINISHES.map((finish) => (
            <button
              key={finish}
              role="radio"
              aria-checked={selectedFinish === finish}
              aria-label={`${finish} finish`}
              className={`selector-option ${selectedFinish === finish ? "selector-option--active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setSelectedFinish(finish); }}
            >
              {finish}
            </button>
          ))}
        </div>
      </fieldset>

      {isOutOfStock && (
        <p className="product-card__stock-warning" role="alert">
          This combination is currently unavailable
        </p>
      )}

      <button
        className="product-card__cta"
        onClick={handleAddToCart}
        disabled={isOutOfStock || addedFeedback}
        aria-busy={addedFeedback}
      >
        {addedFeedback ? "Added to Cart ✓" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </article>
  );
};

export default ProductCard;
