import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, ProductConfiguration } from "@/types";

const STORAGE_KEY = "zahonky-cart-v1";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  loaded: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const itemTotal = (item: CartItem) => item.unitPrice * item.config.quantity;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* noop */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, loaded]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => [
      ...prev,
      { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
    ]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, config: { ...it.config, quantity: Math.min(50, Math.max(1, quantity)) } }
          : it,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      subtotal: items.reduce((sum, it) => sum + itemTotal(it), 0),
      count: items.reduce((sum, it) => sum + it.config.quantity, 0),
      loaded,
    };
  }, [items, addItem, updateQuantity, removeItem, clearCart, loaded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart musí být uvnitř CartProvider");
  return ctx;
}

export const cartItemTotal = itemTotal;

/** Textový popis konfigurace pro výpis v košíku a rekapitulaci. */
export function describeConfig(
  config: ProductConfiguration,
  labels: { material: string; paintQuality: string; paintColor: string },
) {
  return [
    `${config.length} × ${config.width} × ${config.height} cm`,
    labels.material,
    `${config.thickness} mm`,
    `${labels.paintQuality} nátěr`,
    `Odstín: ${labels.paintColor}`,
    config.topRail ? "Vrchní lišta" : "Bez vrchní lišty",
    config.interior === "folie" ? "Vnitřní fólie" : "Vnitřní opálení",
  ];
}
