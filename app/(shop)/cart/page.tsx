// ── Exercises 3 + 4 mount here ─────────────────────────────────
// import { useCart } from "@/context/CartContext";
// import QuantityStepper from "@/components/QuantityStepper";

export default function CartPage() {
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="label" style={{ marginBottom: 16 }}>
        Shopping Cart
      </div>
      <h1>Your Cart</h1>

      <div style={{ marginTop: 40 }}>
        <p className="mono" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          // Uncomment CartContext + QuantityStepper imports to test Exercises 3 & 4
        </p>
      </div>
    </div>
  );
}
