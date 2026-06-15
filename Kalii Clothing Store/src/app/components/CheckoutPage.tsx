import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Page } from './types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  currency: Currency;
  onNavigate: (page: Page) => void;
  onPaymentSuccess: () => void;
  currentUser: { firstName: string; email: string } | null;
}

export function CheckoutPage({
  cartItems,
  currency,
  onNavigate,
  onPaymentSuccess,
  currentUser,
}: CheckoutPageProps) {
  const [form, setForm] = useState({
    cardName: currentUser ? `${currentUser.firstName}` : '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const rate = CURRENCY_RATES[currency];
  const sym = CURRENCY_SYMBOLS[currency];
  const formatPrice = (zarPrice: number) =>
    `${sym}${(zarPrice * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 800 ? 0 : 99;
  const total = subtotal + shipping;

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handleSubmit = () => {
    setError('');
    if (!form.cardName.trim()) return setError('Cardholder name is required.');
    const rawCard = form.cardNumber.replace(/\s/g, '');
    if (rawCard.length !== 16) return setError('Enter a valid 16-digit card number.');
    if (form.expiry.length < 5) return setError('Enter a valid expiry date (MM/YY).');
    if (form.cvv.length < 3) return setError('Enter a valid CVV (3-4 digits).');
    if (!form.address.trim()) return setError('Delivery address is required.');
    if (!form.city.trim()) return setError('City is required.');
    if (!form.postalCode.trim()) return setError('Postal code is required.');

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      <div style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }} className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('cart')}
            style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
            className="flex items-center gap-2 text-sm mb-4 hover:text-foreground transition-colors focus:outline-none"
          >
            <ArrowLeft size={14} /> Back to Cart
          </button>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Secure Checkout</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-3xl font-bold uppercase">Payment Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Delivery info */}
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-base font-bold uppercase mb-5">Delivery Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Street Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="14 Mandela Avenue"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => set('city', e.target.value)}
                    placeholder="Johannesburg"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Postal Code</label>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={e => set('postalCode', e.target.value)}
                    placeholder="2000"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={16} style={{ color: 'var(--primary)' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-base font-bold uppercase">Card Details</h2>
              <div className="ml-auto flex items-center gap-1">
                <Lock size={12} style={{ color: 'var(--muted-foreground)' }} />
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">256-bit SSL</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Cardholder Name</label>
                <input
                  type="text"
                  value={form.cardName}
                  onChange={e => set('cardName', e.target.value)}
                  placeholder="Name as on card"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Card Number</label>
                <input
                  type="text"
                  value={form.cardNumber}
                  onChange={e => set('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Expiry Date</label>
                  <input
                    type="text"
                    value={form.expiry}
                    onChange={e => set('expiry', formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">CVV</label>
                  <input
                    type="password"
                    value={form.cvv}
                    onChange={e => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="•••"
                    maxLength={4}
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(212,24,61,0.1)', border: '1px solid rgba(212,24,61,0.3)', color: '#f87171', fontFamily: 'var(--font-body)' }} className="px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={processing}
            style={{
              backgroundColor: processing ? 'rgba(201,168,76,0.6)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.1em',
            }}
            className="w-full py-5 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing…
              </>
            ) : (
              <><Lock size={14} /> Pay {formatPrice(total)}</>
            )}
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6 sticky top-24">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-base font-bold uppercase mb-5 pb-4 border-b border-border">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-4">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-14 flex-shrink-0 bg-zinc-900 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold truncate">{product.name}</p>
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Qty: {quantity}</p>
                  </div>
                  <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold flex-shrink-0">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">Subtotal</span>
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }} className="flex justify-between mt-1">
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="font-bold uppercase">Total</span>
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
