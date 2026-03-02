import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wearable Tech Commerce",
  description: "Health wearable e-commerce storefront — React + TypeScript + Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
