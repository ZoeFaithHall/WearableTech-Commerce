"use client";

// ═══════════════════════════════════════════════════════════════════
// EXERCISE 6: Refactor the Checkout Form
// Time: 20–25 minutes
// Issues: 🔴 Bugs (3)  🟡 Types (4)  🟠 HTML (4)  🔵 A11y (4)  🟣 UX (3)
// ═══════════════════════════════════════════════════════════════════

import { useState } from "react";

const CheckoutForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName) newErrors.firstName = "Required";
    if (!form.lastName) newErrors.lastName = "Required";
    if (!form.email) newErrors.email = "Required";
    if (!form.line1) newErrors.line1 = "Required";
    if (!form.city) newErrors.city = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.postalCode) newErrors.postalCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <div>
      <h2>Shipping Information</h2>

      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
      {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}

      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
      {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}

      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

      <input name="line1" placeholder="Address Line 1" value={form.line1} onChange={handleChange} />
      {errors.line1 && <span style={{ color: "red" }}>{errors.line1}</span>}

      <input name="line2" placeholder="Address Line 2" value={form.line2} onChange={handleChange} />

      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}

      <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
      {errors.state && <span style={{ color: "red" }}>{errors.state}</span>}

      <input name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} />
      {errors.postalCode && <span style={{ color: "red" }}>{errors.postalCode}</span>}

      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
};

export default CheckoutForm;
