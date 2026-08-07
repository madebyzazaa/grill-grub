import { Clock, Flame, Leaf, ShieldCheck } from 'lucide-react';

export function Features() {
  const items = [
    {
      icon: Flame,
      title: 'Grilled Fresh',
      text: 'Every order grilled and plated fresh the moment you order — never pre-made.',
    },
    {
      icon: Clock,
      title: 'Fast PH Delivery',
      text: 'Hot food at your door across Port Harcourt, delivered fast and sealed.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe Packaging',
      text: 'Sealed, tamper-proof boxes that keep your grills, rice and plantain hot.',
    },
    {
      icon: Leaf,
      title: 'Fresh Ingredients',
      text: 'Locally sourced produce and spices — bold Port Harcourt flavour, every time.',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-3xl bg-ink-850 p-5 ring-1 ring-ink-700 transition hover:ring-brand-500/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 ring-1 ring-brand-500/30">
              <it.icon className="h-5 w-5 text-brand-400" />
            </span>
            <h3 className="mt-4 font-display text-base font-bold text-white">{it.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-400">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
