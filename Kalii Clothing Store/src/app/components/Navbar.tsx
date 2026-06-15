import { ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Page, Currency, CartItem, CURRENCY_SYMBOLS } from './types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItems: CartItem[];
  currentUser: { firstName: string; email: string } | null;
  onLogout: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  cartItems,
  currentUser,
  onLogout,
  currency,
  onCurrencyChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currencies: Currency[] = ['ZAR', 'USD', 'EUR'];

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
  ];

  return (
    <nav
      style={{ backgroundColor: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span
            style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', letterSpacing: '0.12em' }}
            className="text-xl font-bold tracking-widest uppercase"
          >
            KALII CLOTHING
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              style={{
                fontFamily: 'var(--font-body)',
                color: currentPage === page ? 'var(--primary)' : 'var(--muted-foreground)',
                letterSpacing: '0.06em',
              }}
              className="text-sm uppercase tracking-wider transition-colors hover:text-foreground focus:outline-none"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Currency selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => { setCurrencyOpen(v => !v); setUserOpen(false); }}
              style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
              className="flex items-center gap-1 text-xs uppercase tracking-wider hover:text-foreground transition-colors focus:outline-none"
            >
              {currency}
              <ChevronDown size={12} />
            </button>
            {currencyOpen && (
              <div
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                className="absolute right-0 top-7 w-20 rounded-lg overflow-hidden shadow-2xl"
              >
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { onCurrencyChange(c); setCurrencyOpen(false); }}
                    style={{
                      color: c === currency ? 'var(--primary)' : 'var(--foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                    className="w-full px-4 py-2 text-xs text-left hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    {c} {CURRENCY_SYMBOLS[c]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 hover:opacity-70 transition-opacity focus:outline-none"
            style={{ color: 'var(--foreground)' }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-body)' }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* User / Auth */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => { setUserOpen(v => !v); setCurrencyOpen(false); }}
                style={{ color: 'var(--foreground)' }}
                className="flex items-center gap-2 p-2 hover:opacity-70 transition-opacity focus:outline-none"
              >
                <div
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  {currentUser.firstName[0].toUpperCase()}
                </div>
              </button>
              {userOpen && (
                <div
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  className="absolute right-0 top-12 w-44 rounded-lg overflow-hidden shadow-2xl"
                >
                  <div style={{ borderBottom: '1px solid var(--border)' }} className="px-4 py-3">
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-medium">{currentUser.firstName}</p>
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => { onLogout(); setUserOpen(false); }}
                    style={{ color: 'var(--destructive)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              style={{ color: 'var(--foreground)' }}
              className="p-2 hover:opacity-70 transition-opacity focus:outline-none"
            >
              <User size={20} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 focus:outline-none"
            style={{ color: 'var(--foreground)' }}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); setMobileOpen(false); }}
              style={{
                color: currentPage === page ? 'var(--primary)' : 'var(--foreground)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
              }}
              className="text-sm uppercase tracking-wider text-left focus:outline-none"
            >
              {label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} className="pt-3 flex gap-3">
            {(['ZAR', 'USD', 'EUR'] as Currency[]).map(c => (
              <button
                key={c}
                onClick={() => { onCurrencyChange(c); setMobileOpen(false); }}
                style={{
                  color: c === currency ? 'var(--primary)' : 'var(--muted-foreground)',
                  fontFamily: 'var(--font-body)',
                  border: c === currency ? '1px solid var(--primary)' : '1px solid var(--border)',
                }}
                className="px-3 py-1 rounded text-xs focus:outline-none"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
