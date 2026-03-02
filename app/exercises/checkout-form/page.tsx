"use client";

import ExercisePage from "@/components/ExercisePage";
import CheckoutFormBefore from "@/exercises/06-refactor-checkout-form/CheckoutForm";
import CheckoutFormAfter from "@/solutions/06-CheckoutForm.solution";

export default function CheckoutFormExercise() {
  return (
    <ExercisePage
      number="6"
      title="Checkout Form"
      time="20–25 min refactor"
      layout="stacked"
      scenario="A shipping form that works but has type issues, subtle validation bugs, HTML semantics problems, and accessibility gaps. The kind of form that passes QA visually but fails screen reader and keyboard testing."
      changes={[
        {
          category: "bug",
          title: "handleChange clears ALL errors on any keystroke",
          description:
            "Typing in the first name field cleared errors on email, postal code, everything. Replaced setErrors({}) with a targeted clear: delete only the changed field's error, leave the rest.",
        },
        {
          category: "bug",
          title: "No email or postal code format validation",
          description:
            "The original only checked for empty strings. Added regex validation for email format and US postal code pattern (5 digits or 5+4). Validation runs on blur and on submit.",
        },
        {
          category: "types",
          title: "onSubmit and handleChange typed as any",
          description:
            "Defined FormData as ShippingAddress (the domain type), FormErrors as Partial<Record<keyof FormData, string>> so error keys are constrained to actual field names, and typed all event handlers.",
        },
        {
          category: "a11y",
          title: "div instead of form element",
          description:
            "The original used a div — no native submit on Enter, no form landmark for screen readers. Replaced with a semantic form element with onSubmit and e.preventDefault().",
        },
        {
          category: "a11y",
          title: "Placeholders used as labels",
          description:
            "Placeholders disappear when you start typing, leaving no visible label. Added proper label elements with htmlFor/id associations. Placeholders are hints, not labels.",
        },
        {
          category: "a11y",
          title: "Errors not linked to inputs",
          description:
            "Error messages existed in the DOM but screen readers had no way to associate them with their inputs. Added aria-describedby on each input pointing to the error's id, and aria-invalid when an error is present.",
        },
        {
          category: "ux",
          title: "Inline field layout",
          description:
            "First/Last name share a row. City/State/ZIP share a row. State is a dropdown instead of a free-text input. Reduces vertical scrolling and matches user expectations from real storefronts.",
        },
        {
          category: "ux",
          title: "Success state on submission",
          description:
            "After successful validation and submit, the form transitions to a confirmation screen showing the email and total charged. No page reload needed — immediate feedback.",
        },
        {
          category: "ux",
          title: "Focus management on validation failure",
          description:
            "When submit validation fails, focus moves to the first field with an error. The user doesn't have to hunt for what went wrong — the cursor is already there.",
        },
      ]}
      beforeSlot={
        <div style={{ padding: 24, maxWidth: 360 }}>
          <CheckoutFormBefore onSubmit={(data: any) => console.log("Before:", data)} />
        </div>
      }
      afterSlot={
        <div style={{ padding: 24 }}>
          <CheckoutFormAfter onSubmit={(data) => console.log("After:", data)} />
        </div>
      }
    />
  );
}