# Wearable Tech Commerce

A Next.js + TypeScript e-commerce storefront for a health wearable, built to deepen my fluency with commerce-specific frontend patterns: variant selection, cart state management, subscription flows, and checkout validation.

## Why I Built This

I wanted to create multiple examples of handling an international commerce platform using **React component architecture** and **e-commerce domain logic**, specifically the patterns that make hardware + subscription storefronts work: product variants with independent pricing and inventory, cart state that handles both physical goods and recurring subscriptions, and checkout forms that validate for international shipping.

Rather than follow a generic tutorial, I modeled the data layer after a real commerce product and focused on the problems that actually matter in production storefronts.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript** (strict mode, `noUncheckedIndexedAccess`)
- **React 18** with Server Components and Client Components
- Route groups for storefront layout (`app/(shop)/`)
- JSON Server for mock API
- Vitest + Testing Library

## What's Here

**Commerce domain types** (`lib/types/commerce.ts`) — TypeScript interfaces for the full product → variant → cart → checkout pipeline, including ring sizing, finish variants, subscription options, and order lifecycle.

**App Router routes** (`app/`) — Server-rendered pages for the storefront:

| Route | Page |
|---|---|
| `/` | Storefront home |
| `/products/[slug]` | Product detail with configurator |
| `/cart` | Cart with quantity management |
| `/checkout` | Multi-section shipping form |
| `/membership` | Subscription toggle |
| `/order/[id]` | Order confirmation |

**Component exercises** (`exercises/`) — Six focused implementations covering core commerce UI patterns:

| Exercise | Pattern | Focus |
|---|---|---|
| Product Card | Props, derived state, event handling | `useMemo` for variant-dependent pricing, event bubbling prevention, accessible selectors |
| Ring Configurator | Compound selection, live updates | Size × finish matrix, out-of-stock detection, `role="radiogroup"` |
| Cart Context | State management, context API | Immutable updates, memoized provider values, typed context with null safety |
| Quantity Stepper | Controlled inputs, edge cases | Local vs. controlled state, input clamping, blur recovery |
| Subscription Toggle | Cross-cutting state | `role="switch"`, conditional rendering, price impact propagation |
| Checkout Form | Forms, validation, semantics | Field-level validation, `aria-describedby` error linking, `<fieldset>` grouping |

**Solutions** (`solutions/`) — Reference implementations with annotations explaining the decisions.

## Running It

```bash
npm install
npm run dev
```

Uncomment component imports in the route files under `app/(shop)/` to render each exercise against mock product data.

## What I Focused On

**TypeScript discipline** — Union types for ring sizes and finishes, `Omit`/`Partial` utility types for cart payloads, typed context with runtime null checks. No `any` in the solutions.

**Accessibility as a default** — `role="radiogroup"` with `aria-checked` for selectors, `aria-live="polite"` for price updates, `role="switch"` for toggles, `aria-describedby` linking errors to form fields, `<fieldset>`/`<legend>` grouping.

**Commerce-specific patterns** — `Intl.NumberFormat` for currency (not string concatenation), variant-level stock checking, cart deduplication with quantity merging, field-level error clearing instead of full-form resets.

**Next.js App Router conventions** — Server Components for data-fetching pages, Client Components (`"use client"`) for interactive UI, route groups for layout scoping, `@/` path aliases for clean imports.

## Author

**Zoë Hall** — Senior Frontend Engineer
[zoehall.dev](https://zoehall.dev) · [LinkedIn](https://linkedin.com/in/zoefhall)