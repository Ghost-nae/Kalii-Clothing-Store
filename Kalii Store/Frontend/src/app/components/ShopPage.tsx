import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { PRODUCTS, CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Product } from './types';
import { imgGroupShot } from './types';

const CATEGORIES = ['All', 'Tops', 'Jackets', 'Sets', 'Womens', 'Youth', 'Accessories'];

interface ShopPageProps {
  onAddToCart: (item: CartItem) => void;
  currency: Currency;
  onGoToProduct: (id: number) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  initialSearch?: string;
  onClearSearch?: () => void;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? 'var(--primary)' : 'rgba(255,255,255,0.15)', fontSize: '11px' }}>★</span>
      ))}
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24"
      fill={filled ? '#e53e3e' : 'none'} stroke={filled ? '#e53e3e' : 'currentColor'} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export function ShopPage({ onAddToCart, currency, onGoToProduct, wishlist, onToggleWishlist, initialSearch = '', onClearSearch }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => { setSearch(initialSearch); }, [initialSearch]);

  const rate = CURRENCY_RATES[currency];
  const sym  = CURRENCY_SYMBOLS[currency];
  const fmt  = (p: number) => `${sym}${(p * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const filtered = PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === 'price-asc' ? a.price - b.price :
      sort === 'price-desc' ? b.price - a.price :
      sort === 'rating' ? b.rating - a.rating : 0
    );

  const clearSearch = () => { setSearch(''); onClearSearch?.(); };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      {/* Header */}
      <div style={{ backgroundImage: `url(${imgGroupShot})`, backgroundSize: 'cover', backgroundPosition: 'center 20%', position: 'relative' }} className="h-44 flex items-end">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 30%, rgba(8,8,8,0.5))' }} />
        <div className="relative max-w-7xl mx-auto px-6 pb-6 w-full">
          <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }} className="text-xs uppercase mb-1">Kalii Store</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-4xl font-bold uppercase">All Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Active search banner */}
        {search.trim() && (
          <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            className="flex items-center gap-3 px-4 py-3 mb-6">
            <Search size={13} style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm flex-1">
              Results for <span style={{ color: 'var(--primary)' }}>"{search}"</span> — {filtered.length} found
            </span>
            <button onClick={clearSearch} style={{ color: 'var(--muted-foreground)' }}
              className="hover:text-foreground focus:outline-none"><X size={14} /></button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
                  backgroundColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                }}
                className="px-4 py-1.5 text-xs uppercase transition-all hover:border-white/30 focus:outline-none">
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{filtered.length} items</span>
            <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
              style={{ backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
              className="px-3 py-1.5 text-xs focus:outline-none">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-28 text-center">
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm mb-3">No products found.</p>
            <button onClick={clearSearch} style={{ color: 'var(--primary)', border: '1px solid var(--primary)', fontFamily: 'var(--font-display)' }}
              className="px-6 py-2 text-xs uppercase font-semibold focus:outline-none">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} fmt={fmt}
                onGoToProduct={onGoToProduct}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, fmt, onGoToProduct, isWishlisted, onToggleWishlist }: {
  product: Product; fmt: (p: number) => string;
  onGoToProduct: (id: number) => void;
  isWishlisted: boolean; onToggleWishlist: (id: number) => void;
}) {
  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
      className="group overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-900 cursor-pointer" style={{ aspectRatio: '3/4' }}
        onClick={() => onGoToProduct(product.id)}>
        <img src={product.images[0]} alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />

        {/* Overlays */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(8,8,8,0.65)' }}>
            <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }} className="text-sm uppercase font-bold">Sold Out</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && !soldOut && (
          <span style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
            className="absolute top-3 left-3 px-2 py-0.5 text-xs uppercase font-bold tracking-wider">
            {product.badge}
          </span>
        )}
        {lowStock && (
          <span style={{ backgroundColor: '#d4183d', color: '#fff', fontFamily: 'var(--font-body)' }}
            className="absolute top-3 right-10 px-2 py-0.5 text-xs">
            {product.stock} left
          </span>
        )}

        {/* Wishlist */}
        <button onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-2 right-2 p-1.5 focus:outline-none transition-transform hover:scale-110"
          style={{ backgroundColor: 'rgba(8,8,8,0.7)' }}>
          <HeartIcon filled={isWishlisted} />
        </button>

        {/* Hover CTA */}
        {!soldOut && (
          <button onClick={e => { e.stopPropagation(); onGoToProduct(product.id); }}
            style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.08em' }}
            className="absolute bottom-3 left-3 right-3 py-2.5 text-xs uppercase font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 focus:outline-none">
            Select Options
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1 cursor-pointer" onClick={() => onGoToProduct(product.id)}>
        <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider">{product.category}</p>
        <h3 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold leading-snug">{product.name}</h3>
        <div className="flex items-center gap-1.5">
          <StarRow rating={product.rating} />
          <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">({product.reviewCount})</span>
        </div>
        <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-base font-bold mt-auto pt-1">{fmt(product.price)}</p>
      </div>
    </div>
  );
}
