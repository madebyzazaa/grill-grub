import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartLine, MenuItem } from '@/data/menu';

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const add = (item: MenuItem) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === item.id);
        if (existing) {
          return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
        }
        return [...prev, { ...item, qty: 1 }];
      });
    };

    const increment = (id: string) => {
      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)));
    };

    const decrement = (id: string) => {
      setLines((prev) =>
        prev
          .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      );
    };

    const remove = (id: string) => {
      setLines((prev) => prev.filter((l) => l.id !== id));
    };

    const clear = () => setLines([]);

    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

    return { lines, count, subtotal, add, increment, decrement, remove, clear };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
