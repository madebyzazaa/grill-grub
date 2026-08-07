import { ArrowRight, MapPin, Star, Truck, UtensilsCrossed } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/Screenshot_2026-08-07_233144.png"
          alt="Grill & Rub signature breakfast box"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/80 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/45 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pt-16 sm:px-6">
        <div className="max-w-xl">
          <span className="inline-flex animate-float-up items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <UtensilsCrossed className="h-3.5 w-3.5" /> Port Harcourt's Favourite Food Stop
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Craving Loaded
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              Grills &amp; Good Food?
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base text-neutral-300 sm:text-lg">
            From smoky grill boxes to jollof, plantain, breakfast plates and
            more — cooked fresh and delivered hot across Port Harcourt.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/20 transition hover:bg-brand-400 hover:shadow-brand-500/30"
            >
              Order Now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-300">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-brand-400 text-brand-400" /> Loved in PH
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-400" /> Fast delivery
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-400" /> Port Harcourt
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-400">
        <div className="flex h-9 w-5 justify-center rounded-full border border-neutral-600 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-neutral-400" />
        </div>
      </div>
    </section>
  );
}
