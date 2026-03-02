import Link from "next/link";

const EXERCISES = [
  {
    number: "01",
    title: "Product Card",
    type: "Refactor",
    href: "/exercises/product-card",
    focus: "Derived state, event bubbling, accessible selectors, TypeScript interfaces",
    issues: 20,
  },
  {
    number: "02",
    title: "Ring Configurator",
    type: "Build",
    href: "/exercises/ring-configurator",
    focus: "Size × finish variant matrix, live pricing, out-of-stock detection",
    issues: null,
  },
  {
    number: "03",
    title: "Cart Context",
    type: "Refactor",
    href: "/exercises/cart-context",
    focus: "Immutable state, stale closures, memoized provider, typed context",
    issues: 11,
  },
  {
    number: "04",
    title: "Quantity Stepper",
    type: "Build",
    href: "/exercises/quantity-stepper",
    focus: "Controlled inputs, bounds clamping, local vs. upstream state",
    issues: null,
  },
  {
    number: "05",
    title: "Subscription Toggle",
    type: "Build",
    href: "/exercises/subscription-toggle",
    focus: "role=\"switch\", cross-cutting cart state, conditional rendering",
    issues: null,
  },
  {
    number: "06",
    title: "Checkout Form",
    type: "Refactor",
    href: "/exercises/checkout-form",
    focus: "Semantic HTML, field-level validation, aria-describedby error linking",
    issues: 18,
  },
];

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <header style={{ marginBottom: 48 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          Frontend Engineering · Commerce Patterns
        </div>
        <h1 style={{ marginBottom: 8 }}>
          Ring<span className="accent">Commerce</span>
        </h1>
        <p style={{ color: "var(--color-text-secondary)", maxWidth: 640, lineHeight: 1.7 }}>
          Six focused exercises covering the core UI patterns in an e-commerce storefront:
          variant selection, cart state, subscription flows, and checkout validation.
          Each page shows the before and after with annotations explaining what changed and why.
        </p>
      </header>

      <div className="home-grid">
        {EXERCISES.map((ex) => (
          <Link key={ex.number} href={ex.href} className="home-card">
            <div className="home-card__header">
              <span className="home-card__number">{ex.number}</span>
              <span className={`home-card__type home-card__type--${ex.type.toLowerCase()}`}>
                {ex.type}
              </span>
            </div>
            <h3 className="home-card__title">{ex.title}</h3>
            <p className="home-card__focus">{ex.focus}</p>
            {ex.issues && (
              <span className="home-card__issues">
                {ex.issues} issues identified & fixed
              </span>
            )}
          </Link>
        ))}
      </div>

      <section style={{ marginTop: 64 }}>
        <h2 style={{ marginBottom: 16 }}>Tech Stack</h2>
        <div className="tech-chips">
          {["Next.js 14", "React 18", "TypeScript (strict)", "App Router", "CSS Custom Properties", "Vitest"].map((t) => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
