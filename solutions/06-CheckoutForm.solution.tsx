"use client";

import { useState, useCallback } from "react";
import type { ShippingAddress } from "@/lib/types/commerce";

type FormData = ShippingAddress;
type FormErrors = Partial<Record<keyof FormData, string>>;

interface CheckoutFormProps {
  onSubmit: (data: FormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const US_POSTAL_REGEX = /^\d{5}(-\d{4})?$/;

const REQUIRED_FIELDS: (keyof FormData)[] = [
  "firstName", "lastName", "email", "line1", "city", "state", "postalCode",
];

const FIELD_LABELS: Record<keyof FormData, string> = {
  firstName: "First Name", lastName: "Last Name", email: "Email",
  line1: "Address Line 1", line2: "Address Line 2",
  city: "City", state: "State", postalCode: "ZIP Code", country: "Country",
};

const US_STATES = [
  { value: "", label: "Select state" },
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
];

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "",
    line1: "", city: "", state: "", postalCode: "", country: "US",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (!prev[name as keyof FormData]) return prev;
        const next = { ...prev };
        delete next[name as keyof FormData];
        return next;
      });
    }, []
  );

  const validateField = useCallback(
    (name: keyof FormData, value: string): string | undefined => {
      if (REQUIRED_FIELDS.includes(name) && !value.trim()) {
        return `${FIELD_LABELS[name]} is required`;
      }
      if (name === "email" && value && !EMAIL_REGEX.test(value)) {
        return "Enter a valid email address";
      }
      if (name === "postalCode" && value && form.country === "US" && !US_POSTAL_REGEX.test(value)) {
        return "Enter a valid ZIP code (e.g. 17102)";
      }
      return undefined;
    }, [form.country]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const error = validateField(name as keyof FormData, value);
      if (error) setErrors((prev) => ({ ...prev, [name]: error }));
    }, [validateField]
  );

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    for (const key of Object.keys(form) as (keyof FormData)[]) {
      const error = validateField(key, form[key] ?? "");
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.focus();
    }
    return Object.keys(newErrors).length === 0;
  }, [form, validateField]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit(form);
        setSubmitted(true);
      }
    }, [form, validate, onSubmit]
  );

  const renderField = (
    name: keyof FormData,
    options?: { type?: string; autoComplete?: string; half?: boolean }
  ) => {
    const { type = "text", autoComplete, half = false } = options ?? {};
    const isRequired = REQUIRED_FIELDS.includes(name);
    const error = errors[name];
    const errorId = `${name}-error`;

    return (
      <div className={`form-field ${half ? "form-field--half" : ""}`}>
        <label htmlFor={`field-${name}`} className="form-field__label">
          {FIELD_LABELS[name]}
          {isRequired && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
        <input
          id={`field-${name}`}
          name={name}
          type={type}
          value={form[name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          aria-required={isRequired}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`form-field__input ${error ? "form-field__input--error" : ""}`}
        />
        {error && <p id={errorId} className="form-field__error" role="alert">{error}</p>}
      </div>
    );
  };

  const renderSelect = (
    name: keyof FormData,
    selectOptions: { value: string; label: string }[],
    options?: { autoComplete?: string; half?: boolean }
  ) => {
    const { autoComplete, half = false } = options ?? {};
    const isRequired = REQUIRED_FIELDS.includes(name);
    const error = errors[name];
    const errorId = `${name}-error`;

    return (
      <div className={`form-field ${half ? "form-field--half" : ""}`}>
        <label htmlFor={`field-${name}`} className="form-field__label">
          {FIELD_LABELS[name]}
          {isRequired && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
        <select
          id={`field-${name}`}
          name={name}
          value={form[name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          aria-required={isRequired}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`form-field__input form-field__select ${error ? "form-field__input--error" : ""}`}
        >
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p id={errorId} className="form-field__error" role="alert">{error}</p>}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <div className="checkout-success__icon" aria-hidden="true">✓</div>
        <h2 className="checkout-success__title">Order Placed</h2>
        <p className="checkout-success__message">
          Confirmation sent to <strong>{form.email}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form onSubmit={handleSubmit} noValidate className="checkout-layout__form">
        <fieldset className="form-section">
          <legend className="form-section__title">Contact</legend>
          {renderField("email", { type: "email", autoComplete: "email" })}
        </fieldset>

        <fieldset className="form-section">
          <legend className="form-section__title">Shipping Address</legend>
          <div className="form-row">
            {renderField("firstName", { autoComplete: "given-name", half: true })}
            {renderField("lastName", { autoComplete: "family-name", half: true })}
          </div>
          {renderField("line1", { autoComplete: "address-line1" })}
          {renderField("line2", { autoComplete: "address-line2" })}
          <div className="form-row form-row--address">
            {renderField("city", { autoComplete: "address-level2" })}
            {renderSelect("state", US_STATES, { autoComplete: "address-level1", half: true })}
            {renderField("postalCode", { autoComplete: "postal-code", half: true })}
          </div>
        </fieldset>

        <div className="checkout-secure">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Secure checkout</span>
        </div>

        <button
          type="submit"
          className="checkout-form__submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Placing Order…" : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;