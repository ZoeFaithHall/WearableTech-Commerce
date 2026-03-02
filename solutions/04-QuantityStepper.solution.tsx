"use client";

import { useState, useEffect } from "react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const clamp = (n: number): number => Math.min(max, Math.max(min, n));

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") { setInputValue(""); return; }
    if (!/^\d+$/.test(raw)) return;
    const parsed = parseInt(raw, 10);
    setInputValue(raw);
    onChange(clamp(parsed));
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || inputValue === "") {
      setInputValue(String(value));
    } else {
      const clamped = clamp(parsed);
      setInputValue(String(clamped));
      onChange(clamped);
    }
  };

  return (
    <div className="quantity-stepper" role="group" aria-label="Quantity">
      <button
        className="quantity-stepper__btn"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        type="button"
      >
        −
      </button>
      <input
        className="quantity-stepper__input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label="Quantity"
      />
      <button
        className="quantity-stepper__btn"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
