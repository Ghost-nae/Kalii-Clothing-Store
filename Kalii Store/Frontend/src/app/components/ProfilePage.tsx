import { useState } from 'react';
import { User, Order, Review, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Page, PRODUCTS, ORDER_STAGES, OrderStatus } from './types';
import { Package, Heart, Star, LogOut, ChevronDown, ChevronUp, Edit3, Check } from 'lucide-react';

interface ProfilePageProps {
  currentUser: User;
  onUpdateUser: (u: User) => void;
  orders: Order[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  reviews: Review[];
  currency: Currency;
  onNavigate: (page: Page) => void;
  onGoToProduct: (id: number) => void;
  onLogout: () => void;
}

type Tab = 'profile' | 'orders' | 'wishlist' | 'reviews';

export function ProfilePage({ currentUser, onUpdateUser, orders, wishlist, onToggleWishlist, reviews, currency, onNavigate, onGoToProduct, onLogout }: ProfilePageProps) {
  const [tab, setTab] = useState<Tab>('profile');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const rate = CURRENCY_RATES[currency];
  const sym  = CURRENCY_SYMBOLS[currency];
  const fmt  = (p: number) => `${sym}${(p * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile',  label: 'My Profile',     icon: <Edit3 size={15} /> },
    { id: 'orders',   label: `Orders (${orders.length})`,  icon: <Package size={15} /> },
    { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: <Heart size={15} /> },
    { id: 'reviews',  label: `Reviews (${reviews.length})`,  icon: <Star size={15} /> },
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      {/* Header */}
      <div style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }} className="px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold">
              {currentUser.firstName[0].toUpperCase()}
            </div>
            <div>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Account</p>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold">{currentUser.firstName} {currentUser.lastName}</h1>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{currentUser.email}</p>
            </div>
          </div>
          <button onClick={onLogout} style={{ color: 'var(--muted-foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs uppercase hover:text-destructive hover:border-destructive transition-colors focus:outline-none">
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Tabs */}
        <div style={{ borderBottom: '1px solid var(--border)' }} className="flex gap-1 mb-8 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                fontFamily: 'var(--font-display)', letterSpacing: '0.06em',
                color: tab === t.id ? 'var(--primary)' : 'var(--muted-foreground)',
                borderBottom: tab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
              }}
              className="flex items-center gap-2 px-4 py-3 text-xs uppercase whitespace-nowrap hover:text-foreground transition-colors focus:outline-none">
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {tab === 'profile' && <ProfileTab user={currentUser} onSave={onUpdateUser} />}

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="flex flex-col gap-4">
            {orders.length === 0 ? (
              <EmptyState icon={<Package size={40} />} message="No orders yet." cta="Shop Now" onCta={() => onNavigate('shop')} />
            ) : (
              orders.map(order => (
                <OrderCard key={order.ref} order={order} fmt={fmt} currency={currency}
                  expanded={expandedOrder === order.ref}
                  onToggle={() => setExpandedOrder(expandedOrder === order.ref ? null : order.ref)} />
              ))
            )}
          </div>
        )}

        {/* Wishlist tab */}
        {tab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <EmptyState icon={<Heart size={40} />} message="Your wishlist is empty." cta="Browse Products" onCta={() => onNavigate('shop')} />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                  <div key={product.id} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                    className="overflow-hidden group">
                    <div className="relative overflow-hidden bg-zinc-900 cursor-pointer" style={{ aspectRatio: '3/4' }}
                      onClick={() => onGoToProduct(product.id)}>
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      <button onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
                        className="absolute top-2 right-2 p-1.5 focus:outline-none" style={{ backgroundColor: 'rgba(8,8,8,0.7)', color: '#e53e3e' }}>
                        <Heart size={14} fill="#e53e3e" />
                      </button>
                    </div>
                    <div className="p-3 cursor-pointer" onClick={() => onGoToProduct(product.id)}>
                      <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold leading-snug">{product.name}</p>
                      <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold mt-1">
                        {CURRENCY_SYMBOLS[currency]}{(product.price * CURRENCY_RATES[currency]).toFixed(currency === 'ZAR' ? 0 : 2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reviews tab */}
        {tab === 'reviews' && (
          <div className="flex flex-col gap-4">
            {reviews.length === 0 ? (
              <EmptyState icon={<Star size={40} />} message="You haven't written any reviews yet." cta="Shop & Review" onCta={() => onNavigate('shop')} />
            ) : (
              reviews.map((r, i) => {
                const product = PRODUCTS.find(p => p.id === r.productId);
                return (
                  <div key={i} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5 flex gap-4">
                    {product && (
                      <div className="w-16 h-20 flex-shrink-0 bg-zinc-900 cursor-pointer overflow-hidden" onClick={() => onGoToProduct(product.id)}>
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                            onClick={() => product && onGoToProduct(product.id)}>
                            {product?.name || 'Product'}
                          </p>
                          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{new Date(r.date).toLocaleDateString('en-ZA')}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(n => (
                            <span key={n} style={{ color: n <= r.rating ? 'var(--primary)' : 'rgba(255,255,255,0.15)', fontSize: '12px' }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }} className="text-sm">{r.comment}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileTab({ user, onSave }: { user: User; onSave: (u: User) => void }) {
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const set = (k: keyof User, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const save = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-6 max-w-lg flex flex-col gap-4">
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-base font-bold uppercase mb-2">Personal Information</h2>
      <div className="grid grid-cols-2 gap-3">
        <PF label="First Name" value={form.firstName} onChange={v => set('firstName', v)} />
        <PF label="Last Name"  value={form.lastName}  onChange={v => set('lastName', v)} />
      </div>
      <PF label="Email Address" value={form.email} onChange={v => set('email', v)} type="email" />
      <PF label="New Password (leave blank to keep)" value={form.password} onChange={v => set('password', v)} type="password" />
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-sm font-bold uppercase mb-3">Delivery Address</h3>
        <div className="flex flex-col gap-3">
          <PF label="Street Address" value={form.address || ''} onChange={v => set('address', v)} placeholder="14 Mandela Avenue" />
          <div className="grid grid-cols-2 gap-3">
            <PF label="City" value={form.city || ''} onChange={v => set('city', v)} placeholder="Johannesburg" />
            <PF label="Postal Code" value={form.postalCode || ''} onChange={v => set('postalCode', v)} placeholder="2000" />
          </div>
        </div>
      </div>
      <button onClick={save}
        style={{ backgroundColor: saved ? 'rgba(201,168,76,0.6)' : 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        className="py-3 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-all focus:outline-none mt-2">
        {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
      </button>
    </div>
  );
}

function PF({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
        className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:opacity-40" />
    </div>
  );
}

function OrderCard({ order, fmt, expanded, onToggle }: { order: Order; fmt: (p: number) => string; currency: Currency; expanded: boolean; onToggle: () => void }) {
  const stageIndex = ORDER_STAGES.indexOf(order.status);

  const statusColor = (s: OrderStatus) => {
    if (s === 'Delivered') return '#4ade80';
    if (s === 'Shipped' || s === 'Out for Delivery') return 'var(--primary)';
    if (s === 'Order Received') return 'var(--muted-foreground)';
    return 'var(--foreground)';
  };

  return (
    <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
      {/* Header row */}
      <button onClick={onToggle} className="w-full focus:outline-none">
        <div className="flex items-center justify-between px-5 py-4 text-left">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Order</p>
              <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold">{order.ref}</p>
            </div>
            <div>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Date</p>
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{new Date(order.date).toLocaleDateString('en-ZA')}</p>
            </div>
            <div>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Total</p>
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{fmt(order.total)}</p>
            </div>
            <span style={{ color: statusColor(order.status), border: `1px solid ${statusColor(order.status)}`, fontFamily: 'var(--font-body)' }}
              className="px-3 py-0.5 text-xs rounded-full">{order.status}</span>
          </div>
          <div style={{ color: 'var(--muted-foreground)' }}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }} className="px-5 py-5 flex flex-col gap-5">
          {/* Tracking progress */}
          <div>
            <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs uppercase tracking-wider mb-4">Delivery Tracking</p>
            <div className="flex items-start gap-0">
              {ORDER_STAGES.map((stage, i) => {
                const done = i <= stageIndex;
                const current = i === stageIndex;
                return (
                  <div key={stage} className="flex-1 flex flex-col items-center gap-1 relative">
                    {/* Connector line */}
                    {i < ORDER_STAGES.length - 1 && (
                      <div className="absolute left-1/2 top-3 w-full h-px" style={{ backgroundColor: done && i < stageIndex ? 'var(--primary)' : 'var(--border)' }} />
                    )}
                    {/* Dot */}
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', border: '2px solid',
                      borderColor: done ? 'var(--primary)' : 'var(--border)',
                      backgroundColor: current ? 'var(--primary)' : done ? 'rgba(201,168,76,0.2)' : 'transparent',
                      zIndex: 1, flexShrink: 0,
                    }} className="flex items-center justify-center">
                      {done && !current && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                    </div>
                    <p style={{ color: done ? 'var(--foreground)' : 'var(--muted-foreground)', fontFamily: 'var(--font-body)', fontSize: '9px', lineHeight: 1.2 }}
                      className="text-center hidden md:block">{stage}</p>
                  </div>
                );
              })}
            </div>
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs mt-3 md:hidden">Status: <span style={{ color: 'var(--primary)' }}>{order.status}</span></p>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2">
            {order.items.map(({ product, quantity, size, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-14 flex-shrink-0 bg-zinc-900 overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1">
                  <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{product.name}</p>
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{size} · {color} · ×{quantity}</p>
                </div>
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{fmt(product.price * quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ borderTop: '1px solid var(--border)' }} className="pt-3 flex flex-col gap-1">
            {order.discount > 0 && <SmRow label="Discount" value={`-${fmt(order.discount)}`} accent />}
            <SmRow label="Shipping" value={order.shipping === 0 ? 'Free' : fmt(order.shipping)} />
            <SmRow label="Total" value={fmt(order.total)} bold />
          </div>
        </div>
      )}
    </div>
  );
}

function SmRow({ label, value, bold = false, accent = false }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{label}</span>
      <span style={{ color: accent ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-display)', fontWeight: bold ? 700 : 500 }} className="text-sm">{value}</span>
    </div>
  );
}

function EmptyState({ icon, message, cta, onCta }: { icon: React.ReactNode; message: string; cta: string; onCta: () => void }) {
  return (
    <div className="py-20 flex flex-col items-center gap-4 text-center">
      <div style={{ color: 'var(--muted-foreground)' }}>{icon}</div>
      <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{message}</p>
      <button onClick={onCta}
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        className="px-8 py-3 text-xs uppercase font-bold hover:opacity-90 focus:outline-none">{cta}</button>
    </div>
  );
}
