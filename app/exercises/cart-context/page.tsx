"use client";

import ExercisePage from "@/components/ExercisePage";

export default function CartContextExercise() {
  return (
    <ExercisePage
      number="3"
      title="Cart Context"
      time="20–25 min refactor"
      layout="stacked"
      scenario="A cart context provider with state mutation bugs, stale closures, missing types, and performance issues. The context powers every cart interaction in the storefront."
      changes={[
        {
          category: "bug",
          title: "removeItem mutates state with splice",
          description:
            "items.splice(index, 1) mutates the existing array, then setItems(items) passes the same reference. React compares by reference — same reference means no re-render. Replaced with filter() which returns a new array.",
        },
        {
          category: "bug",
          title: "addItem uses stale closure",
          description:
            "setItems([...items, item]) captures items from the closure at render time. If addItem is called twice rapidly, both calls see the same stale items array and the first add is lost. Fixed with the updater function: setItems(prev => [...prev, item]).",
        },
        {
          category: "bug",
          title: "No duplicate detection",
          description:
            "Adding the same item twice created two separate entries instead of incrementing quantity. Added a check: if the item ID exists, map over items and increment quantity. Otherwise append.",
        },
        {
          category: "types",
          title: "Context typed as any",
          description:
            "Defined CartContextType interface with all methods and derived values. createContext<CartContextType | null>(null) ensures consumers get type checking. The useCart hook throws if called outside the provider.",
        },
        {
          category: "types",
          title: "useCart has no null check",
          description:
            "Without the null check, calling useCart outside a CartProvider returns null and every property access silently fails. The typed hook throws a descriptive error immediately.",
        },
        {
          category: "pattern",
          title: "total recalculates every render",
          description:
            "Wrapped in useMemo keyed to items. Also added itemCount as a derived value — consumers need both and neither should trigger recalculation unless items actually change.",
        },
        {
          category: "pattern",
          title: "Provider value is a new object every render",
          description:
            "Without useMemo on the value object, every state change creates a new reference, causing every useCart consumer to re-render even if they only read itemCount. Memoized the entire value object.",
        },
        {
          category: "pattern",
          title: "Functions recreated every render",
          description:
            "Wrapped addItem, removeItem, updateQuantity, and clearCart in useCallback. Combined with the memoized value, consumers that only depend on stable functions won't re-render on state changes.",
        },
        {
          category: "ux",
          title: "updateQuantity allows 0 or negative",
          description:
            "Setting quantity to 0 left a ghost item in the cart. Now auto-removes the item if quantity drops below 1, which also simplifies the quantity stepper integration.",
        },
      ]}
      beforeSlot={
        <div className="exercise-page__code-panel">
          <pre className="code-block">
{`const CartContext = createContext`}<span className="code-error">{"<any>"}</span>{`(null);

`}<span className="code-comment">{"// stale closure — captures items at render time"}</span>{`
`}<span className="code-comment">{"// no duplicate check — same item creates 2 entries"}</span>{`
const addItem = (item: CartItem) => {
  setItems([...items, item]);
};

`}<span className="code-comment">{"// splice() mutates the array in place"}</span>{`
`}<span className="code-comment">{"// setItems(items) passes same reference — no re-render"}</span>{`
const removeItem = (id: string) => {
  const index = items.findIndex((i) => i.id === id);
  items.splice(index, 1);
  setItems(items);
};

`}<span className="code-comment">{"// recalculates on every render"}</span>{`
const total = items.reduce(
  (sum, item) => sum + item.price * item.quantity, 0
);

`}<span className="code-comment">{"// new object every render — all consumers re-render"}</span>{`
<CartContext.Provider
  value={{ items, addItem, removeItem, total }}
>`}
          </pre>
        </div>
      }
      afterSlot={
        <div className="exercise-page__code-panel">
          <pre className="code-block">
{`const CartContext = createContext`}<span className="code-success">{"<CartContextType | null>"}</span>{`(null);

`}<span className="code-comment">{"// updater function avoids stale closure"}</span>{`
`}<span className="code-comment">{"// duplicate detection — increment qty if exists"}</span>{`
`}<span className="code-comment">{"// useCallback for stable reference"}</span>{`
const addItem = useCallback((newItem) => {
  setItems((prev) => {
    const existing = prev.find(item => item.id === newItem.id);
    if (existing) {
      return prev.map(item =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...newItem, quantity: 1 }];
  });
}, []);

`}<span className="code-comment">{"// filter() returns a new array — triggers re-render"}</span>{`
const removeItem = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);

`}<span className="code-comment">{"// useMemo — only recalculates when items change"}</span>{`
const total = useMemo(
  () => items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0),
  [items]
);

`}<span className="code-comment">{"// memoized value — stable reference for consumers"}</span>{`
const value = useMemo<CartContextType>(
  () => ({ items, addItem, removeItem,
           updateQuantity, clearCart, total, itemCount }),
  [items, addItem, removeItem,
   updateQuantity, clearCart, total, itemCount]
);`}
          </pre>
        </div>
      }
    />
  );
}