"use client";

import { useState } from "react";
import ExercisePage from "@/components/ExercisePage";
import QuantityStepper from "@/solutions/04-QuantityStepper.solution";

export default function QuantityStepperExercise() {
  const [qty, setQty] = useState(1);

  return (
    <ExercisePage
      number="4"
      title="Quantity Stepper"
      time="15–20 min build from scratch"
      scenario="A cart quantity input with increment/decrement buttons and direct text entry. The simple concept hides a surprising number of edge cases around input state management."
      changes={[
        {
          category: "pattern",
          title: "Two layers of state: local input vs. controlled value",
          description:
            "The user needs to clear the input field while typing (empty string is an invalid quantity). Local inputValue state allows intermediate invalid states. The parent's onChange only fires with valid, clamped numbers. On blur, the input snaps back to the last valid value.",
        },
        {
          category: "pattern",
          title: "Clamp function for bounds",
          description:
            "Math.min(max, Math.max(min, n)) — a single pure function that enforces bounds. Used in handleInputChange, handleBlur, handleIncrement, and handleDecrement. One source of truth for the constraint.",
        },
        {
          category: "ux",
          title: "Non-numeric rejection without clearing input",
          description:
            "If the user types 'abc', the handler returns early without updating state. The input stays at its previous value. No error flash, no empty field, no confusing behavior.",
        },
        {
          category: "ux",
          title: "Buttons disabled at bounds",
          description:
            "Decrement disables at min, increment disables at max. Prevents rapid-click overshoot and gives immediate visual feedback that the limit has been reached.",
        },
        {
          category: "a11y",
          title: "role=\"group\" with labeled buttons",
          description:
            "The stepper is wrapped in role=\"group\" with aria-label=\"Quantity\". Each button has its own aria-label ('Decrease quantity', 'Increase quantity'). Input uses inputMode=\"numeric\" and pattern=\"[0-9]*\" for mobile keyboards.",
        },
      ]}
      beforeSlot={
        <div className="exercise-page__empty-state">
          <div className="label" style={{ marginBottom: 8 }}>// Empty starter file</div>
          <p>Built from scratch — edge case exercise.</p>
          <div style={{ marginTop: 16 }}>
            <p className="mono" style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }}>
              Edge cases to handle:
            </p>
            <ul style={{ color: "var(--color-text-secondary)", fontSize: 13, paddingLeft: 20, lineHeight: 1.8 }}>
              <li>User clears the input (empty string)</li>
              <li>User types &quot;abc&quot; or &quot;0&quot; or &quot;-3&quot;</li>
              <li>User types &quot;999&quot; when max is 10</li>
              <li>Rapid clicking at max/min bounds</li>
            </ul>
          </div>
        </div>
      }
      afterSlot={
        <div style={{ padding: 24 }}>
          <p className="mono" style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 16 }}>
            Try: clear it, type letters, exceed bounds, blur away
          </p>
          <QuantityStepper value={qty} onChange={setQty} min={1} max={10} />
          <p style={{ marginTop: 12, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Current value: <span className="accent mono">{qty}</span>
          </p>
        </div>
      }
    />
  );
}
