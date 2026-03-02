"use client";

import { useState } from "react";
import ExercisePage from "@/components/ExercisePage";
import SubscriptionToggle from "@/solutions/05-SubscriptionToggle.solution";
import { mockSubscription } from "@/lib/data/products";

export default function SubscriptionToggleExercise() {
  const [active, setActive] = useState(false);

  return (
    <ExercisePage
      number="5"
      title="Subscription Toggle"
      time="15–20 min build from scratch"
      scenario="A toggle for adding a monthly membership during the shopping flow. The membership is a cross-cutting concern — it affects the cart total, product pricing, and checkout."
      changes={[
        {
          category: "a11y",
          title: "role=\"switch\" instead of checkbox",
          description:
            "Switches are for instant-apply toggles (this takes effect immediately). Checkboxes are for form submission (batched with other fields). The distinction matters for screen reader users who expect different interaction patterns.",
        },
        {
          category: "a11y",
          title: "Dynamic aria-label on toggle",
          description:
            "The label changes based on state: 'Add Ring Membership' when off, 'Remove Ring Membership' when on. The user always knows what the action will do, not just the current state.",
        },
        {
          category: "pattern",
          title: "Conditional feature list rendering",
          description:
            "The features list only renders when the toggle is active. This isn't just visual — it removes the DOM nodes entirely, which is cleaner for screen readers and avoids hidden-but-focusable elements.",
        },
        {
          category: "ux",
          title: "Trial period display",
          description:
            "When trialDays > 0, the pricing line includes the trial period. This is derived from the subscription data, not hardcoded — if the trial changes from 30 to 14 days, the UI updates automatically.",
        },
        {
          category: "ux",
          title: "Intl.NumberFormat for subscription price",
          description:
            "Same pattern as the product pricing — currency formatting via Intl.NumberFormat rather than string concatenation. Consistent approach across the entire storefront.",
        },
      ]}
      beforeSlot={
        <div className="exercise-page__empty-state">
          <div className="label" style={{ marginBottom: 8 }}>// Empty starter file</div>
          <p>Built from scratch — commerce-specific component.</p>
          <pre className="exercise-page__code-hint">{`import type { SubscriptionOption } 
  from "@/lib/types/commerce";

// Use role="switch" with aria-checked
// Not checkbox — switches are for 
// instant-apply toggles.`}</pre>
        </div>
      }
      afterSlot={
        <div style={{ padding: 24, maxWidth: 400 }}>
          <SubscriptionToggle
            subscription={mockSubscription}
            isActive={active}
            onToggle={setActive}
          />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Subscription: <span className="accent mono">{active ? "Active" : "Inactive"}</span>
          </p>
        </div>
      }
    />
  );
}
