// ── Exercise 6 mounts here ─────────────────────────────────────
// import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="label" style={{ marginBottom: 16 }}>
        Checkout
      </div>
      <h1>Shipping & Payment</h1>

      <div style={{ marginTop: 40, maxWidth: 560 }}>
        {/* <CheckoutForm onSubmit={(data) => console.log("Order:", data)} /> */}

        <p className="mono" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          // Uncomment CheckoutForm import to test Exercise 6
        </p>
      </div>
    </div>
  );
}
