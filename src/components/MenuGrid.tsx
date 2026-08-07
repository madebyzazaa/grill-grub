import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CATEGORIES, formatNaira, type Category, type MenuItem } from '@/data/menu';
import { useCart } from '@/context/CartContext';

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  const [active, setActive] = useState<Category | 'All'>('All');

  const filtered = active === 'All' ? items : items.filter((i) => i.category === active);

  return (
    <section id="menu" className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
          Our Menu
        </span>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Build Your Order
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
          Tap the + to add items to your cart. Adjust quantities anytime before
          checkout.
        </p>
      </div>

      {/* Category chips */}
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0">
        {(['All', ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
              active === cat
                ? 'bg-brand-500 text-ink-950'
                : 'bg-ink-800 text-neutral-300 ring-1 ring-ink-700 hover:bg-ink-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { lines, add, increment, decrement } = useCart();
  const line = lines.find((l) => l.id === item.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-ink-850 ring-1 ring-ink-700 transition hover:ring-brand-500/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-400 ring-1 ring-brand-500/30 backdrop-blur">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight text-white">{item.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-neutral-400">{item.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-extrabold text-brand-400">
            {formatNaira(item.price)}
          </span>

          {line ? (
            <div className="flex items-center gap-1 rounded-full bg-ink-700 p-1 ring-1 ring-ink-600">
              <button
                onClick={() => decrement(item.id)}
                className="grid h-8 w-8 place-items-center rounded-full bg-ink-800 text-white transition hover:bg-ink-600 active:scale-95"
                aria-label={`Remove one ${item.name}`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-bold tabular-nums text-white">{line.qty}</span>
              <button
                onClick={() => increment(item.id)}
                className="grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-ink-950 transition hover:bg-brand-400 active:scale-95"
                aria-label={`Add one ${item.name}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-ink-950 transition hover:bg-brand-400 active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
