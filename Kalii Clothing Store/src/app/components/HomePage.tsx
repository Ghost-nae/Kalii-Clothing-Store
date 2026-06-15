import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Page, PRODUCTS, CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, imgTwoGuys } from './types';

// Product images for category banners
import imgTracksuitJacketFront from '../../images/WhatsApp Image 2026-06-14 at 18.43.07.jpeg';
import imgCreamHoodie from '../../images/WhatsApp Image 2026-06-14 at 18.43.08.jpeg';
import imgTracksuit from '../../images/WhatsApp Image 2026-06-14 at 18.43.09.jpeg';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (item: CartItem) => void;
  currency: Currency;
}

export function HomePage({ onNavigate, onAddToCart, currency }: HomePageProps) {
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 3);
  const rate = CURRENCY_RATES[currency];
  const sym = CURRENCY_SYMBOLS[currency];

  const formatPrice = (zarPrice: number) =>
    `${sym}${(zarPrice * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const perks = [
    { icon: Truck, label: 'Free Delivery', desc: 'On orders over R800' },
    { icon: Shield, label: 'Secure Payment', desc: '100% protected transactions' },
    { icon: Zap, label: 'Fast Dispatch', desc: 'Same day for orders before 1PM' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero — 2 guys photo as background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${imgTwoGuys})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(110deg, rgba(8,8,8,0.95) 45%, rgba(8,8,8,0.45) 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="max-w-xl">
            <p
              style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
              className="text-xs uppercase mb-6"
            >
              New Collection — 2026
            </p>
            <h1
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', lineHeight: 1.05 }}
              className="text-6xl md:text-8xl font-bold mb-8 uppercase"
            >
              Inspired By The<br />
              <span style={{ color: 'var(--primary)' }}>Hustle.</span>
            </h1>
            <p
              style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
              className="text-base mb-10 max-w-sm"
            >
              Premium streetwear crafted for those who move with intention. Limited drops, unlimited style.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('shop')}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.1em',
                }}
                className="flex items-center gap-2 px-8 py-4 uppercase text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none"
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('shop')}
                style={{
                  color: 'var(--foreground)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.1em',
                }}
                className="px-8 py-4 uppercase text-sm font-semibold hover:border-white/50 transition-colors focus:outline-none"
              >
                Explore All
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
        </div>
      </section>

      {/* Perks strip */}
      <section style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4 py-4 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
              <Icon size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{label}</p>
                <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-2">Curated Picks</p>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-3xl font-bold uppercase">Featured Drops</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)' }}
            className="hidden md:flex items-center gap-1 text-sm hover:opacity-70 transition-opacity focus:outline-none"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(product => (
            <div
              key={product.id}
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              className="group overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-zinc-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
                    className="absolute top-4 left-4 px-3 py-1 text-xs uppercase font-semibold tracking-wider"
                  >
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => onAddToCart({ product, quantity: 1 })}
                  style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.1em' }}
                  className="absolute bottom-4 left-4 right-4 py-3 text-xs uppercase font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 focus:outline-none"
                >
                  Add to Cart
                </button>
              </div>
              <div className="p-4">
                <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1">{product.category}</p>
                <h3 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-base font-semibold mb-2">{product.name}</h3>
                <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-lg font-bold">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => onNavigate('shop')}
            style={{ color: 'var(--primary)', border: '1px solid var(--primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            className="px-8 py-3 text-sm uppercase font-semibold focus:outline-none"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Categories banner — using real Kalii photos */}
      <section style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-3xl font-bold uppercase mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Tops', image: imgCreamHoodie, count: 6 },
              { name: 'Jackets', image: imgTracksuitJacketFront, count: 3 },
              { name: 'Sets', image: imgTracksuit, count: 2 },
            ].map(cat => (
              <button
                key={cat.name}
                onClick={() => onNavigate('shop')}
                className="relative overflow-hidden group focus:outline-none"
                style={{ aspectRatio: '4/3' }}
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'rgba(8,8,8,0.55)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', letterSpacing: '0.15em' }} className="text-2xl font-bold uppercase">{cat.name}</h3>
                  <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)' }} className="text-sm mt-1">{cat.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1400 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }} className="text-xs uppercase mb-4">Limited Time</p>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-4xl md:text-5xl font-bold uppercase mb-4">
            First Order 10% Off
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-base mb-8">
            Create an account and get 10% off your first purchase. Join the Kalii community today.
          </p>
          <button
            onClick={() => onNavigate('register')}
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            className="px-10 py-4 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none"
          >
            Create Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', letterSpacing: '0.15em' }} className="text-lg font-bold uppercase">KALII</span>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">© 2026 Kalii Clothing. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <button key={l} style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs hover:text-foreground transition-colors focus:outline-none">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
