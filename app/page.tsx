import { mockProducts } from "@/lib/data/products";

export default function Home() {
  const product = mockProducts[0]!;

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <header className="page-header">
        <div className="label" style={{ marginBottom: 16 }}>
          Frontend Engineering · Commerce Patterns
        </div>
        <h1>
          Wearable Tech Commerce <span className="accent">Exercise Harness</span>
        </h1>
        <p
          className="mono"
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            marginTop: 8,
          }}
        >
          Uncomment imports in route files to test each component
        </p>
      </header>

      <main>
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 16 }}>Product Data</h2>
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              color: "var(--color-accent-muted)",
              marginBottom: 12,
            }}
          >
            // Mock API Response
          </p>
          <pre
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 2,
              padding: 24,
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              overflow: "auto",
              maxHeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            {JSON.stringify(product, null, 2)}
          </pre>
        </section>
      </main>
    </div>
  );
}
