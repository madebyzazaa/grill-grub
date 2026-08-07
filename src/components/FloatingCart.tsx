import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatNaira } from '@/data/menu';
import { useCart } from '@/context/CartContext';

interface FloatingCartProps {
  onClick: () => void;
}

export function FloatingCart({ onClick }: FloatingCartProps) {
  const { count, subtotal } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (count === 0 || !visible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-brand-500 px-5 py-3.5 text-ink-950 ring-1 ring-brand-400 transition hover:bg-brand-400 active:scale-95 animate-float-up"
    >
      <span className="relative">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink-950 px-1 text-xs font-bold text-white ring-1 ring-white/20">
          {count}
        </span>
      </span>
      <span className="text-sm font-bold">View Cart</span>
      <span className="rounded-full bg-ink-950/15 px-2.5 py-0.5 text-xs font-bold">
        {formatNaira(subtotal)}
      </span>
    </button>
  );
}
