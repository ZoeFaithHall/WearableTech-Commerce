"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { RingSize, RingFinish, ProductVariant } from "@/lib/types/commerce";

interface RingConfiguratorProps {
  variants: ProductVariant[];
  defaultSize?: RingSize;
  defaultFinish?: RingFinish;
  onVariantSelect: (variant: ProductVariant | null) => void;
}

const RingConfigurator: React.FC<RingConfiguratorProps> = ({
  variants,
  defaultSize = 7,
  defaultFinish = "silver",
  onVariantSelect,
}) => {
  const [size, setSize] = useState<RingSize>(defaultSize);
  const [finish, setFinish] = useState<RingFinish>(defaultFinish);

  const availableSizes = useMemo(
    () => [...new Set(variants.map((v) => v.size))].sort((a, b) => a - b),
    [variants]
  );

  const availableFinishes = useMemo(
    () => [...new Set(variants.map((v) => v.finish))],
    [variants]
  );

  const selectedVariant = useMemo(
    () => variants.find((v) => v.size === size && v.finish === finish) ?? null,
    [variants, size, finish]
  );

  useEffect(() => {
    onVariantSelect(selectedVariant);
  }, [selectedVariant, onVariantSelect]);

  const getVariantStatus = useCallback(
    (checkSize: RingSize, checkFinish: RingFinish) => {
      const variant = variants.find(
        (v) => v.size === checkSize && v.finish === checkFinish
      );
      if (!variant) return "unavailable" as const;
      if (!variant.inStock) return "out-of-stock" as const;
      return "available" as const;
    },
    [variants]
  );

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="ring-configurator">
      <div className="configurator__price" aria-live="polite">
        {selectedVariant ? (
          <span>{formatPrice(selectedVariant.price)}</span>
        ) : (
          <span className="price--unavailable">Combination not available</span>
        )}
      </div>

      <fieldset className="configurator__fieldset">
        <legend className="configurator__legend">Size: <strong>{size}</strong></legend>
        <div role="radiogroup" aria-label="Ring size">
          {availableSizes.map((s) => {
            const status = getVariantStatus(s, finish);
            return (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                aria-label={`Size ${s}${status !== "available" ? `, ${status}` : ""}`}
                aria-disabled={status === "unavailable"}
                className={[
                  "configurator__option",
                  size === s && "configurator__option--selected",
                  status === "out-of-stock" && "configurator__option--oos",
                  status === "unavailable" && "configurator__option--unavailable",
                ].filter(Boolean).join(" ")}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="configurator__fieldset">
        <legend className="configurator__legend">Finish: <strong>{finish}</strong></legend>
        <div role="radiogroup" aria-label="Ring finish">
          {availableFinishes.map((f) => {
            const status = getVariantStatus(size, f);
            return (
              <button
                key={f}
                role="radio"
                aria-checked={finish === f}
                aria-label={`${f} finish${status !== "available" ? `, ${status}` : ""}`}
                aria-disabled={status === "unavailable"}
                className={[
                  "configurator__option",
                  "configurator__option--finish",
                  finish === f && "configurator__option--selected",
                  status === "out-of-stock" && "configurator__option--oos",
                  status === "unavailable" && "configurator__option--unavailable",
                ].filter(Boolean).join(" ")}
                onClick={() => setFinish(f)}
              >
                <span className={`finish-swatch finish-swatch--${f}`} aria-hidden="true" />
                <span>{f}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {selectedVariant && !selectedVariant.inStock && (
        <p className="configurator__oos" role="alert">This combination is currently out of stock.</p>
      )}
      {!selectedVariant && (
        <p className="configurator__oos" role="alert">This size and finish combination is not available.</p>
      )}
    </div>
  );
};

export default RingConfigurator;
