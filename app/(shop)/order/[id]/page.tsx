import { notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  if (!id) return notFound();

  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="label" style={{ marginBottom: 16 }}>
        Order Confirmation
      </div>
      <h1>
        Order <span className="accent">#{id}</span>
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
        Thank you for your order. You'll receive a confirmation email shortly.
      </p>
    </div>
  );
}
