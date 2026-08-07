import { Flame, MapPin, Phone, UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ink-700/60 bg-ink-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500">
              <UtensilsCrossed className="h-5 w-5 text-ink-950" />
            </span>
            <span className="font-display text-lg font-extrabold text-white">
              GRILL <span className="text-brand-400">&amp;</span> RUB
            </span>
          </div>

          <p className="text-center text-sm text-neutral-400">
            Port Harcourt's go-to spot for grills, jollof, plantain and more — delivered hot.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="tel:+2348148296284"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink-800 text-neutral-300 ring-1 ring-ink-700 transition hover:bg-ink-700 hover:text-white"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="#top"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink-800 text-neutral-300 ring-1 ring-ink-700 transition hover:bg-ink-700 hover:text-white"
              aria-label="Back to top"
            >
              <MapPin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-ink-700/60 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Grill &amp; Rub, Port Harcourt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
