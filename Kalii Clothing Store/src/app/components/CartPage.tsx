import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Page } from './types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  currency: Currency;
  onNavigate: (page: Page) => void;
  currentUser: { firstName: string } | null;
}

export function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onNavigate,
  currentUser,
}: CartPageProps) {
  const rate = CURRENCY_RATES[currency];
  const sym = CURRENCY_SYMBOLS[currency];

  const formatPrice = (zarPrice: number) =>
    `${sym}${(zarPrice * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 800 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16 flex flex-col items-center justify-center gap-6 px-4">
        <div
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          className="p-16 flex flex-col items-center gap-6 max-w-sm w-full text-center"
        >
          <ShoppingBag size={48} style={{ color: 'var(--muted-foreground)' }} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase mb-2">Your cart is empty</h2>
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">Add items from the shop to get started.</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            className="px-8 py-3 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none"
          >
            Browse Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      {/* Header */}
      <div style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }} className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Shopping Cart</p>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-3xl font-bold uppercase">
              {cartItems.reduce((sum, i) => sum + i.quantity, 0)} Item{cartItems.reduce((sum, i) => sum + i.quantity, 0) !== 1 ? 's' : ''}
            </h1>
          </div>
          <button
            onClick={onClearCart}
            style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', border: '1px solid var(--border)' }}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider hover:text-destructive hover:border-destructive transition-colors focus:outline-none"
          >
            <Trash2 size={12} /> Clear Cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map(({ product, quantity }) => (
            <div
              key={product.id}
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              className="flex gap-4 p-4"
            >
              {/* Image */}
              <div className="w-24 h-28 flex-shrink-0 bg-zinc-900 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-0.5">{product.category}</p>
                  <h3 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-base font-semibold">{product.name}</h3>
                  <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold mt-1">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {/* Qty controls */}
                  <div style={{ border: '1px solid var(--border)' }} className="flex items-center">
                    <button
                      onClick={() => quantity > 1 ? onUpdateQuantity(product.id, quantity - 1) : onRemoveItem(product.id)}
                      style={{ color: 'var(--foreground)' }}
                      className="px-3 py-1.5 hover:bg-white/5 transition-colors focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }} className="px-4 py-1.5 text-sm min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      style={{ color: 'var(--foreground)' }}
                      className="px-3 py-1.5 hover:bg-white/5 transition-colors focus:outline-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  {/* Subtotal + Remove */}
                  <div className="flex items-center gap-4">
                    <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      style={{ color: 'var(--muted-foreground)' }}
                      className="hover:text-destructive transition-colors focus:outline-none"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => onNavigate('shop')}
            style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
            className="flex items-center gap-2 text-sm mt-2 hover:text-primary transition-colors focus:outline-none self-start"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Order summary */}
        <div>
          <div
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            className="p-6 flex flex-col gap-4 sticky top-24"
          >
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-lg font-bold uppercase border-b pb-4" >Order Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">Subtotal</span>
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">
                  Add {formatPrice(800 - subtotal)} more for free shipping
                </p>
              )}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }} className="flex justify-between">
              <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="font-bold uppercase">Total</span>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-bold">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => currentUser ? onNavigate('checkout') : onNavigate('login')}
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
              className="w-full py-4 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none mt-2"
            >
              {currentUser ? 'Proceed to Checkout' : 'Sign In to Checkout'} <ArrowRight size={14} />
            </button>
            {!currentUser && (
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs text-center">
                You need to be logged in to checkout
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
