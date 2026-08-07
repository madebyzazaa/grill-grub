import { useState } from 'react';
import { Menu, ShoppingBag, UtensilsCrossed, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Grill Boxes', href: '#menu' },
    { label: 'Rice & Plantain', href: '#menu' },
    { label: 'Breakfast', href: '#menu' },
    { label: 'Shakes', href: '#menu' }
  ];

  return (
    <header className="fixed top-0 z-40 w-full border-b border-ink-700/60 bg-ink-900/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500">
            <UtensilsCrossed className="h-5 w-5 text-ink-950" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            GRILL <span className="text-brand-400">&amp;</span> RUB
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-300 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition hover:text-brand-400">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 rounded-full bg-ink-800 px-4 py-2 text-sm font-semibold text-white ring-1 ring-ink-700 transition hover:bg-ink-700"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-brand-500 px-1 text-xs font-bold text-ink-950">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink-800 text-white ring-1 ring-ink-700 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-float-up border-t border-ink-700/60 bg-ink-900 px-4 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-ink-800"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
