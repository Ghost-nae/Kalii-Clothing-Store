import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Tag, X } from 'lucide-react';
import { CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Page, COUPONS, Order } from './types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  currency: Currency;
  onNavigate: (page: Page) => void;
  onPaymentSuccess: (order: Omit<Order, 'ref' | 'date' | 'status'>) => void;
  currentUser: { firstName: string; lastName: string; email: string; address?: string; city?: string; postalCode?: string } | null;
}

export function CheckoutPage({ cartItems, currency, onNavigate, onPaymentSuccess, currentUser }: CheckoutPageProps) {
  const [form, setForm] = useState({
    cardName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',
    cardNumber: '', expiry: '', cvv: '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    postalCode: currentUser?.postalCode || '',
  });
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const rate = CURRENCY_RATES[currency];
  const sym  = CURRENCY_SYMBOLS[currency];
  const fmt  = (p: number) => `${sym}${(p * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 800 ? 0 : 99;

  const couponData = appliedCoupon ? COUPONS[appliedCoupon] : null;
  const discount = couponData
    ? couponData.type === 'percent' ? Math.round(subtotal * couponData.value / 100) : couponData.value
    : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const fmtCard   = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExpiry = (v: string) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!COUPONS[code]) { setCouponError('Invalid coupon code.'); return; }
    setAppliedCoupon(code);
    setCouponError('');
    setCouponInput('');
  };

  const handleSubmit = () => {
    setError('');
    if (!form.cardName.trim()) return setError('Cardholder name is required.');
    if (form.cardNumber.replace(/\s/g,'').length !== 16) return setError('Enter a valid 16-digit card number.');
    if (form.expiry.length < 5) return setError('Enter a valid expiry date.');
    if (form.cvv.length < 3) return setError('Enter a valid CVV.');
    if (!form.address.trim()) return setError('Delivery address is required.');
    if (!form.city.trim()) return setError('City is required.');
    if (!form.postalCode.trim()) return setError('Postal code is required.');

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess({ items: cartItems, subtotal, shipping, discount, total, currency, address: form.address, city: form.city, postalCode: form.postalCode });
    }, 2200);
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      <div style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }} className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => onNavigate('cart')}
            style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
            className="flex items-center gap-2 text-sm mb-4 hover:text-foreground transition-colors focus:outline-none">
            <ArrowLeft size={14} /> Back to Cart
          </button>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Secure Checkout</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-3xl font-bold uppercase">Payment Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Delivery */}
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-sm font-bold uppercase mb-5">Delivery Information</h2>
            <div className="flex flex-col gap-4">
              <Field label="Street Address" value={form.address} onChange={v => set('address', v)} placeholder="14 Mandela Avenue" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" value={form.city} onChange={v => set('city', v)} placeholder="Johannesburg" />
                <Field label="Postal Code" value={form.postalCode} onChange={v => set('postalCode', v)} placeholder="2000" />
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
              <Tag size={14} style={{ color: 'var(--primary)' }} /> Discount Code
            </h2>
            {appliedCoupon ? (
              <div style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold">{appliedCoupon}</p>
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{couponData?.label}</p>
                </div>
                <button onClick={() => setAppliedCoupon(null)} style={{ color: 'var(--muted-foreground)' }} className="hover:text-foreground focus:outline-none"><X size={14} /></button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input type="text" value={couponInput} onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                  placeholder="Enter code e.g. HUSTLE10"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                  className="flex-1 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:opacity-40" />
                <button onClick={applyCoupon}
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                  className="px-5 py-3 text-xs uppercase font-bold hover:opacity-90 focus:outline-none">Apply</button>
              </div>
            )}
            {couponError && <p style={{ color: '#f87171', fontFamily: 'var(--font-body)' }} className="text-xs mt-2">{couponError}</p>}
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs mt-2 opacity-60">Try: HUSTLE10 · KALII20 · NEWKID50 · GIRLSCLUB</p>
          </div>

          {/* Card */}
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={15} style={{ color: 'var(--primary)' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-sm font-bold uppercase">Card Details</h2>
              <div className="ml-auto flex items-center gap-1">
                <Lock size={11} style={{ color: 'var(--muted-foreground)' }} />
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">256-bit SSL</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Field label="Cardholder Name" value={form.cardName} onChange={v => set('cardName', v)} placeholder="Name on card" />
              <Field label="Card Number" value={form.cardNumber} onChange={v => set('cardNumber', fmtCard(v))} placeholder="1234 5678 9012 3456" maxLength={19} mono />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry" value={form.expiry} onChange={v => set('expiry', fmtExpiry(v))} placeholder="MM/YY" maxLength={5} />
                <Field label="CVV" value={form.cvv} onChange={v => set('cvv', v.replace(/\D/g,'').slice(0,4))} placeholder="•••" maxLength={4} type="password" />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(212,24,61,0.1)', border: '1px solid rgba(212,24,61,0.3)', color: '#f87171', fontFamily: 'var(--font-body)' }}
              className="px-4 py-3 text-sm">{error}</div>
          )}

          <button onClick={handleSubmit} disabled={processing}
            style={{ backgroundColor: processing ? 'rgba(201,168,76,0.5)' : 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            className="w-full py-5 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none disabled:cursor-not-allowed">
            {processing
              ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" /> Processing…</>
              : <><Lock size={14} /> Pay {fmt(total)}</>}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6 sticky top-24">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', borderBottom: '1px solid var(--border)' }}
              className="text-sm font-bold uppercase mb-4 pb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-4">
              {cartItems.map(({ product, quantity, size, color }) => (
                <div key={`${product.id}-${size}-${color}`} className="flex items-center gap-3">
                  <div className="w-12 h-14 flex-shrink-0 bg-zinc-900 overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold truncate">{product.name}</p>
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{size} · {color} · ×{quantity}</p>
                  </div>
                  <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold flex-shrink-0">{fmt(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4 flex flex-col gap-2">
              <Row label="Subtotal" value={fmt(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : fmt(shipping)} highlight={shipping === 0} />
              {discount > 0 && <Row label={`Discount (${appliedCoupon})`} value={`-${fmt(discount)}`} highlight />}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }} className="flex justify-between mt-1">
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="font-bold uppercase text-sm">Total</span>
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-bold">{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, maxLength, type = 'text', mono = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; maxLength?: number; type?: string; mono?: boolean;
}) {
  return (
    <div>
      <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} maxLength={maxLength}
        style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: mono ? 'monospace' : 'var(--font-body)', letterSpacing: mono ? '0.05em' : undefined }}
        className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:opacity-40" />
    </div>
  );
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{label}</span>
      <span style={{ color: highlight ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{value}</span>
    </div>
  );
}
