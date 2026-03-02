"use client";

// ═══════════════════════════════════════════════════════════════════
// EXERCISE 3: Refactor the Cart Context
// Time: 20–25 minutes
// Issues: 🔴 Bugs (3)  🟡 Types (2)  🟠 Performance (3)  🟣 Logic (3)
// ═══════════════════════════════════════════════════════════════════

import { createContext, useState, useContext } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  const removeItem = (id: string) => {
    const index = items.findIndex((i) => i.id === id);
    items.splice(index, 1);
    setItems(items);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
