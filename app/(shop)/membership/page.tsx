// ── Exercise 5 mounts here ─────────────────────────────────────
// import SubscriptionToggle from "@/components/SubscriptionToggle";

import { mockSubscription } from "@/lib/data/products";

export default function MembershipPage() {
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="label" style={{ marginBottom: 16 }}>
        Membership
      </div>
      <h1>
        Ring <span className="accent">Membership</span>
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
        Unlock insights with a monthly membership.
      </p>

      <div style={{ marginTop: 40, maxWidth: 480 }}>
        {/* <SubscriptionToggle
          subscription={mockSubscription}
          isActive={false}
          onToggle={(active) => console.log("Subscription:", active)}
        /> */}

        <p className="mono" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          // Uncomment SubscriptionToggle import to test Exercise 5
        </p>
      </div>
    </div>
  );
}
