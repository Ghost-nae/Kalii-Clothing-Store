import { useState } from 'react';
import { Order, Review, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, PRODUCTS, ORDER_STAGES, OrderStatus } from './types';
import { BarChart2, Package, Users, ShoppingCart, Star, LogOut, TrendingUp, AlertTriangle } from 'lucide-react';

interface AdminPageProps {
  orders: Order[];
  reviews: Review[];
  onUpdateOrderStatus: (ref: string, status: OrderStatus) => void;
  onDeleteReview: (productId: number, email: string) => void;
  onLogout: () => void;
  currency: Currency;
}

type AdminTab = 'dashboard' | 'orders' | 'products' | 'reviews';

const ls = { get: <T,>(k: string, fb: T): T => { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? fb; } catch { return fb; } } };

export function AdminPage({ orders, reviews, onUpdateOrderStatus, onDeleteReview, onLogout, currency }: AdminPageProps) {
  const [tab, setTab] = useState<AdminTab>('dashboard');

  const rate = CURRENCY_RATES[currency];
  const sym  = CURRENCY_SYMBOLS[currency];
  const fmt  = (p: number) => `${sym}${(p * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const totalRevenue  = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders   = orders.length;
  const customers     = ls.get<unknown[]>('kalii_users', []).length;
  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length;
  const lowStockItems = PRODUCTS.filter(p => p.stock <= 5 && p.stock > 0).length;
  const soldOutItems  = PRODUCTS.filter(p => p.stock === 0).length;

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={15} /> },
    { id: 'orders',    label: `Orders (${totalOrders})`, icon: <ShoppingCart size={15} /> },
    { id: 'products',  label: 'Products',  icon: <Package size={15} /> },
    { id: 'reviews',   label: `Reviews (${reviews.length})`,  icon: <Star size={15} /> },
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{ backgroundColor: 'rgba(8,8,8,0.98)', borderBottom: '1px solid var(--border)' }} className="px-6 h-16 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', letterSpacing: '0.12em' }} className="text-lg font-bold uppercase">KALII</span>
          <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider">Admin Panel</span>
        </div>
        <button onClick={onLogout} style={{ color: 'var(--muted-foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
          className="flex items-center gap-2 px-4 py-2 text-xs uppercase hover:text-destructive hover:border-destructive transition-colors focus:outline-none">
          <LogOut size={12} /> Exit Admin
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside style={{ backgroundColor: 'var(--card)', borderRight: '1px solid var(--border)', width: 200, flexShrink: 0 }}
          className="hidden md:flex flex-col py-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                color: tab === t.id ? 'var(--primary)' : 'var(--muted-foreground)',
                backgroundColor: tab === t.id ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderRight: tab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
                fontFamily: 'var(--font-body)',
              }}
              className="flex items-center gap-3 px-6 py-3 text-sm text-left hover:text-foreground transition-colors focus:outline-none">
              {t.icon} {t.label}
            </button>
          ))}
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex" style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ color: tab === t.id ? 'var(--primary)' : 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
              className="flex-1 flex flex-col items-center gap-1 py-3 text-xs focus:outline-none">
              {t.icon}
              <span className="text-xs" style={{ fontSize: '9px' }}>{t.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-8 overflow-auto pb-24 md:pb-8">

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: fmt(totalRevenue), icon: <TrendingUp size={20} />, color: 'var(--primary)' },
                  { label: 'Total Orders',  value: String(totalOrders),  icon: <ShoppingCart size={20} />, color: '#60a5fa' },
                  { label: 'Customers',     value: String(customers),    icon: <Users size={20} />,       color: '#a78bfa' },
                  { label: 'Pending Orders',value: String(pendingOrders),icon: <Package size={20} />,     color: '#f59e0b' },
                ].map(c => (
                  <div key={c.label} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider">{c.label}</p>
                      <span style={{ color: c.color }}>{c.icon}</span>
                    </div>
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)', color: c.color } as React.CSSProperties} className="text-2xl font-bold">{c.value}</p>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              {(lowStockItems > 0 || soldOutItems > 0) && (
                <div style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }} className="p-4 mb-6 flex items-start gap-3">
                  <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ color: '#f59e0b', fontFamily: 'var(--font-display)' }} className="text-sm font-bold mb-1">Inventory Alerts</p>
                    {soldOutItems > 0 && <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{soldOutItems} product{soldOutItems > 1 ? 's' : ''} sold out</p>}
                    {lowStockItems > 0 && <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{lowStockItems} product{lowStockItems > 1 ? 's' : ''} with 5 or fewer units remaining</p>}
                  </div>
                </div>
              )}

              {/* Recent orders */}
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-lg font-bold uppercase mb-4">Recent Orders</h2>
              <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="overflow-x-auto">
                {orders.length === 0
                  ? <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="px-5 py-8 text-sm text-center">No orders yet.</p>
                  : <table className="w-full text-left min-w-[600px]">
                      <thead style={{ borderBottom: '1px solid var(--border)' }}>
                        <tr>
                          {['Ref', 'Date', 'Items', 'Total', 'Status'].map(h => (
                            <th key={h} style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="px-5 py-3 text-xs uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 8).map(o => (
                          <tr key={o.ref} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="px-5 py-3 text-sm font-semibold">{o.ref}</td>
                            <td style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="px-5 py-3 text-sm">{new Date(o.date).toLocaleDateString('en-ZA')}</td>
                            <td style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="px-5 py-3 text-sm">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                            <td style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="px-5 py-3 text-sm font-semibold">{fmt(o.total)}</td>
                            <td className="px-5 py-3">
                              <StatusBadge status={o.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                }
              </div>
            </div>
          )}

          {/* Orders tab */}
          {tab === 'orders' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase mb-6">All Orders</h1>
              {orders.length === 0
                ? <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">No orders placed yet.</p>
                : <div className="flex flex-col gap-4">
                    {orders.map(order => (
                      <div key={order.ref} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div className="flex flex-wrap gap-4">
                            <div><p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Ref</p><p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold">{order.ref}</p></div>
                            <div><p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Date</p><p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{new Date(order.date).toLocaleDateString('en-ZA')}</p></div>
                            <div><p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Delivery</p><p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">{order.address}, {order.city}</p></div>
                            <div><p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Total</p><p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold">{fmt(order.total)}</p></div>
                          </div>
                          <select value={order.status}
                            onChange={e => onUpdateOrderStatus(order.ref, e.target.value as OrderStatus)}
                            style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                            className="px-3 py-2 text-xs focus:outline-none">
                            {ORDER_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {order.items.map(({ product, quantity, size }, i) => (
                            <div key={i} className="flex-shrink-0 flex items-center gap-2" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', padding: '6px 10px' }}>
                              <div style={{ width: 32, height: 40, flexShrink: 0, overflow: 'hidden', backgroundColor: '#111' }}>
                                <img src={product.images[0]} alt="" className="w-full h-full object-cover object-top" />
                              </div>
                              <div>
                                <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold" style={{ fontSize: '11px' }}>{product.name}</p>
                                <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', fontSize: '10px' }}>×{quantity} · {size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}

          {/* Products tab */}
          {tab === 'products' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase mb-6">Product Inventory</h1>
              <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                  <thead style={{ borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Status'].map(h => (
                        <th key={h} style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="px-4 py-3 text-xs uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div style={{ width: 36, height: 44, flexShrink: 0, overflow: 'hidden', backgroundColor: '#111' }}>
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover object-top" />
                            </div>
                            <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{p.name}</p>
                          </div>
                        </td>
                        <td style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="px-4 py-3 text-sm">{p.category}</td>
                        <td style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="px-4 py-3 text-sm font-semibold">{fmt(p.price)}</td>
                        <td style={{ color: p.stock === 0 ? '#f87171' : p.stock <= 5 ? '#f59e0b' : 'var(--foreground)', fontFamily: 'var(--font-display)' }}
                          className="px-4 py-3 text-sm font-bold">{p.stock}</td>
                        <td style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="px-4 py-3 text-sm">⭐ {p.rating}</td>
                        <td className="px-4 py-3">
                          {p.stock === 0
                            ? <span style={{ color: '#f87171', border: '1px solid #f87171', fontFamily: 'var(--font-body)' }} className="px-2 py-0.5 text-xs">Sold Out</span>
                            : p.stock <= 5
                            ? <span style={{ color: '#f59e0b', border: '1px solid #f59e0b', fontFamily: 'var(--font-body)' }} className="px-2 py-0.5 text-xs">Low Stock</span>
                            : <span style={{ color: '#4ade80', border: '1px solid #4ade80', fontFamily: 'var(--font-body)' }} className="px-2 py-0.5 text-xs">In Stock</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews tab */}
          {tab === 'reviews' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase mb-6">Review Moderation</h1>
              {reviews.length === 0
                ? <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">No reviews yet.</p>
                : <div className="flex flex-col gap-3">
                    {reviews.map((r, i) => {
                      const product = PRODUCTS.find(p => p.id === r.productId);
                      return (
                        <div key={i} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5 flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold">{r.userName}</span>
                              <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{product?.name}</span>
                              <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= r.rating ? 'var(--primary)' : 'rgba(255,255,255,0.15)', fontSize: '11px' }}>★</span>)}</div>
                            </div>
                            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm leading-relaxed">{r.comment}</p>
                            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs mt-1">{new Date(r.date).toLocaleDateString('en-ZA')}</p>
                          </div>
                          <button onClick={() => onDeleteReview(r.productId, r.userEmail)}
                            style={{ color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', fontFamily: 'var(--font-body)', flexShrink: 0 }}
                            className="px-3 py-1.5 text-xs hover:bg-red-900/20 transition-colors focus:outline-none">Delete</button>
                        </div>
                      );
                    })}
                  </div>
              }
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const color = status === 'Delivered' ? '#4ade80' : status === 'Shipped' || status === 'Out for Delivery' ? 'var(--primary)' : 'var(--muted-foreground)';
  return <span style={{ color, border: `1px solid ${color}`, fontFamily: 'var(--font-body)' }} className="px-2 py-0.5 text-xs rounded-full whitespace-nowrap">{status}</span>;
}
