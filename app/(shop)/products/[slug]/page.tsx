// ── Exercise 2 mounts here ─────────────────────────────────────
// import RingConfigurator from "@/components/RingConfigurator";

import { mockProducts } from "@/lib/data/products";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="label" style={{ marginBottom: 16 }}>
        {product.category}
      </div>
      <h1>
        {product.name}{" "}
        {product.isNew && <span className="accent">New</span>}
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
        {product.description}
      </p>

      <div style={{ marginTop: 40 }}>
        {/* Uncomment to mount Exercise 2: */}
        {/* <RingConfigurator
          variants={product.variants}
          defaultSize={7}
          defaultFinish="silver"
          onVariantSelect={(v) => console.log("Selected:", v)}
        /> */}

        <p className="mono" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          // Uncomment RingConfigurator import to test Exercise 2
        </p>
      </div>
    </div>
  );
}
