import { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { DELIVERY_FEE, WHATSAPP_NUMBER, formatNaira } from '@/data/menu';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { lines, subtotal, count, increment, decrement, remove, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setCheckout(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const total = subtotal + (lines.length > 0 ? DELIVERY_FEE : 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?\d[\d\s-]{6,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppLink = () => {
    const orderLines = lines
      .map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ${formatNaira(l.qty * l.price)}`)
      .join('\n');

    const message =
      `*NEW ORDER — GRILL & RUB*\n\n` +
      `*Items:*\n${orderLines}\n\n` +
      `*Subtotal:* ${formatNaira(subtotal)}\n` +
      `*Delivery Fee:* ${formatNaira(DELIVERY_FEE)}\n` +
      `*Total:* ${formatNaira(total)}\n\n` +
      `*Customer:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Delivery Address:* ${form.address}\n\n` +
      `Please confirm my order. Thanks!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    window.open(buildWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ink-900 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-bold text-white">
              {checkout ? 'Checkout' : 'Your Cart'}
            </h2>
            {count > 0 && !checkout && (
              <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-xs font-bold text-brand-400">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-neutral-300 transition hover:bg-ink-700 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-800 ring-1 ring-ink-700">
                <ShoppingBag className="h-9 w-9 text-neutral-500" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-white">Your cart is empty</h3>
              <p className="mt-1.5 text-sm text-neutral-400">
                Add grills, jollof, plantain or breakfast boxes from the menu to get started.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-ink-950 transition hover:bg-brand-400"
              >
                Browse Menu
              </button>
            </div>
          ) : checkout ? (
            <CheckoutForm form={form} setForm={setForm} errors={errors} />
          ) : (
            <div className="space-y-3 p-4">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="flex gap-3 rounded-2xl bg-ink-850 p-3 ring-1 ring-ink-700"
                >
                  <img
                    src={l.image}
                    alt={l.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold leading-tight text-white">{l.name}</h4>
                      <button
                        onClick={() => remove(l.id)}
                        className="text-neutral-500 transition hover:text-brand-400"
                        aria-label={`Remove ${l.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-brand-400">{formatNaira(l.price)}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full bg-ink-700 p-1">
                        <button
                          onClick={() => decrement(l.id)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-ink-800 text-white transition hover:bg-ink-600 active:scale-95"
                          aria-label={`Remove one ${l.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold tabular-nums text-white">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => increment(l.id)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-ink-950 transition hover:bg-brand-400 active:scale-95"
                          aria-label={`Add one ${l.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-white">
                        {formatNaira(l.qty * l.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clear}
                className="mt-1 w-full rounded-xl py-2 text-xs font-semibold text-neutral-500 transition hover:text-brand-400"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {lines.length > 0 && (
          <div className="border-t border-ink-700 bg-ink-900 p-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-neutral-300">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-brand-400" /> Delivery Fee
                </span>
                <span className="tabular-nums">{formatNaira(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between border-t border-ink-700 pt-2.5 font-display text-lg font-extrabold text-white">
                <span>Total</span>
                <span className="text-brand-400 tabular-nums">{formatNaira(total)}</span>
              </div>
            </div>

            {checkout ? (
              <div className="mt-4 space-y-2">
                <button
                  onClick={handlePlaceOrder}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-go-500 py-4 text-base font-extrabold text-white transition hover:bg-go-400 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                  </svg>
                  Place Order on WhatsApp
                </button>
                <button
                  onClick={() => setCheckout(false)}
                  className="w-full rounded-2xl bg-ink-800 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-ink-700"
                >
                  Back to Cart
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCheckout(true)}
                className="mt-4 w-full rounded-2xl bg-brand-500 py-4 text-base font-extrabold text-ink-950 transition hover:bg-brand-400 active:scale-95"
              >
                Checkout · {formatNaira(total)}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

interface CheckoutFormProps {
  form: { name: string; phone: string; address: string };
  setForm: (f: { name: string; phone: string; address: string }) => void;
  errors: Record<string, string>;
}

function CheckoutForm({ form, setForm, errors }: CheckoutFormProps) {
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const fieldClass = (key: string) =>
    `w-full rounded-xl bg-ink-850 px-4 py-3 text-sm text-white ring-1 transition outline-none placeholder:text-neutral-500 focus:ring-brand-500 ${
      errors[key] ? 'ring-flame-500' : 'ring-ink-700'
    }`;

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Full Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={update('name')}
          placeholder="e.g. Ada Okafor"
          className={fieldClass('name')}
        />
        {errors.name && <p className="mt-1 text-xs text-flame-400">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          placeholder="e.g. 0803 123 4567"
          className={fieldClass('phone')}
        />
        {errors.phone && <p className="mt-1 text-xs text-flame-400">{errors.phone}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Delivery Address
        </label>
        <textarea
          value={form.address}
          onChange={update('address')}
          rows={3}
          placeholder="House number, street, area, Port Harcourt landmark..."
          className={`${fieldClass('address')} resize-none`}
        />
        {errors.address && <p className="mt-1 text-xs text-flame-400">{errors.address}</p>}
      </div>

      <p className="rounded-xl bg-ink-850 p-3 text-xs text-neutral-400 ring-1 ring-ink-700">
        Your order will be sent via WhatsApp to our dispatch team in Port Harcourt.
        We'll confirm availability and ETA before payment.
      </p>
    </div>
  );
}
