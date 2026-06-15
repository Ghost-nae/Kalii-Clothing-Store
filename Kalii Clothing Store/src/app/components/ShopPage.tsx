import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import imgGroupShot from '../../images/WhatsApp Image 2026-06-14 at 18.43.06.jpeg';
import { PRODUCTS, CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Product } from './types';

interface ShopPageProps {
  onAddToCart: (item: CartItem) => void;
  currency: Currency;
}

const CATEGORIES = ['All', 'Tops', 'Jackets', 'Sets', 'Womens'];

export function ShopPage({ onAddToCart, currency }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const rate = CURRENCY_RATES[currency];
  const sym = CURRENCY_SYMBOLS[currency];

  const formatPrice = (zarPrice: number) =>
    `${sym}${(zarPrice * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const filtered = PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleAdd = (product: Product) => {
    onAddToCart({ product, quantity: 1 });
    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      {/* Page header */}
      <div
        style={{
          backgroundImage: `url(${imgGroupShot})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          position: 'relative',
        }}
        className="h-40 flex items-center"
      >
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.82)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-2">Kalii Store</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-4xl font-bold uppercase">All Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.08em',
                  backgroundColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                }}
                className="px-5 py-2 text-xs uppercase transition-all duration-200 hover:border-white/30 focus:outline-none"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{filtered.length} items</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as typeof sort)}
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
              }}
              className="px-3 py-2 text-xs focus:outline-none"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => {
            const isAdded = addedIds.has(product.id);
            return (
              <div
                key={product.id}
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                className="group overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden bg-zinc-900" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
                      className="absolute top-3 left-3 px-2 py-0.5 text-xs uppercase font-semibold tracking-wider"
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider">{product.category}</p>
                  <h3 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold leading-snug flex-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-base font-bold">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      style={{
                        backgroundColor: isAdded ? 'var(--primary)' : 'transparent',
                        color: isAdded ? 'var(--primary-foreground)' : 'var(--foreground)',
                        border: isAdded ? '1px solid var(--primary)' : '1px solid var(--border)',
                      }}
                      className="p-2 transition-all duration-300 hover:border-primary hover:text-primary focus:outline-none"
                    >
                      {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
