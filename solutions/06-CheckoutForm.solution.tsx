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
  city: "City", state: "State", postalCode: "Postal Code", country: "Country",
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "",
    line1: "", city: "", state: "", postalCode: "", country: "US",
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
        return "Please enter a valid email address";
      }
      if (name === "postalCode" && value && form.country === "US" && !US_POSTAL_REGEX.test(value)) {
        return "Please enter a valid US postal code";
      }
      return undefined;
    }, [form.country]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
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
      const el = document.getElementById(`field-${Object.keys(newErrors)[0]}`);
      if (el) (el as HTMLInputElement).focus();
    }
    return Object.keys(newErrors).length === 0;
  }, [form, validateField]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) onSubmit(form);
    }, [form, validate, onSubmit]
  );

  const renderField = (
    name: keyof FormData,
    options?: { type?: string; autoComplete?: string }
  ) => {
    const { type = "text", autoComplete } = options ?? {};
    const isRequired = REQUIRED_FIELDS.includes(name);
    const error = errors[name];
    const errorId = `${name}-error`;

    return (
      <div className="form-field">
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="form-section">
        <legend className="form-section__title">Contact Information</legend>
        {renderField("firstName", { autoComplete: "given-name" })}
        {renderField("lastName", { autoComplete: "family-name" })}
        {renderField("email", { type: "email", autoComplete: "email" })}
      </fieldset>
      <fieldset className="form-section">
        <legend className="form-section__title">Shipping Address</legend>
        {renderField("line1", { autoComplete: "address-line1" })}
        {renderField("line2", { autoComplete: "address-line2" })}
        {renderField("city", { autoComplete: "address-level2" })}
        {renderField("state", { autoComplete: "address-level1" })}
        {renderField("postalCode", { autoComplete: "postal-code" })}
      </fieldset>
      <button type="submit" className="checkout-form__submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Placing Order…" : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
