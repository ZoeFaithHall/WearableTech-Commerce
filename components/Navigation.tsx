"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/exercises/product-card", label: "01 · Product Card" },
  { href: "/exercises/ring-configurator", label: "02 · Configurator" },
  { href: "/exercises/cart-context", label: "03 · Cart Context" },
  { href: "/exercises/quantity-stepper", label: "04 · Qty Stepper" },
  { href: "/exercises/subscription-toggle", label: "05 · Subscription" },
  { href: "/exercises/checkout-form", label: "06 · Checkout" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Exercise navigation">
      <div className="site-nav__inner">
        <Link href="/" className="site-nav__logo">
          <span className="accent">Ring</span>Commerce
        </Link>

        <div className="site-nav__links">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`site-nav__link ${
                pathname === href ? "site-nav__link--active" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
