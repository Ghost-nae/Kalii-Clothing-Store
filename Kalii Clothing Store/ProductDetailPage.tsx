import { ShoppingBag, User, Menu, X, ChevronDown, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { Page, Currency, CURRENCY_SYMBOLS } from './types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  currentUser: { firstName: string; email: string } | null;
  onLogout: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
}

export function Navbar({
  currentPage, onNavigate, cartCount, wishlistCount,
  currentUser, onLogout, currency, onCurrencyChange,
  searchQuery, onSearchChange, onSearchSubmit,
}: NavbarProps) {
  const [mobileOpen, setCurrencyOpen2] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const setMobileOpen = setCurrencyOpen2;
  const currencies: Currency[] = ['ZAR', 'USD', 'EUR'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setSearchOpen(false);
  };

  const Badge = ({ count, offset = '' }: { count: number; offset?: string }) =>
    count > 0 ? (
      <span className={`absolute ${offset || '-top-1 -right-1'} min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold`}
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-body)', fontSize: '10px', padding: '0 4px' }}>
        {count > 99 ? '99+' : count}
      </span>
    ) : null;

  return (
    <nav style={{ backgroundColor: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      className="fixed top-0 left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="focus:outline-none flex-shrink-0">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', letterSpacing: '0.12em' }}
            className="text-lg md:text-xl font-bold uppercase">KALII CLOTHING</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 ml-2">
          {(['home', 'shop'] as Page[]).map(p => (
            <button key={p} onClick={() => onNavigate(p)}
              style={{ color: currentPage === p ? 'var(--primary)' : 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.07em' }}
              className="text-xs uppercase tracking-wider hover:text-foreground transition-colors focus:outline-none capitalize">
              {p}
            </button>
          ))}
        </div>

        {/* Search — desktop inline */}
        <form onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-xs ml-auto"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--input-background)' }}>
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)}
            placeholder="Search products…"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)', backgroundColor: 'transparent' }}
            className="flex-1 px-3 py-2 text-xs focus:outline-none placeholder:opacity-50" />
          <button type="submit" className="px-3 hover:opacity-70 transition-opacity focus:outline-none"
            style={{ color: 'var(--muted-foreground)' }}>
            <Search size={13} />
          </button>
        </form>

        {/* Right icons */}
        <div className="flex items-center ml-auto md:ml-2">
          {/* Currency — desktop */}
          <div className="relative hidden md:block">
            <button onClick={() => { setCurrencyOpen(v => !v); setUserOpen(false); }}
              style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
              className="flex items-center gap-0.5 px-2 py-2 text-xs uppercase hover:text-foreground transition-colors focus:outline-none">
              {currency}<ChevronDown size={10} />
            </button>
            {currencyOpen && (
              <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                className="absolute right-0 top-10 w-24 z-50 shadow-2xl overflow-hidden">
                {currencies.map(c => (
                  <button key={c} onClick={() => { onCurrencyChange(c); setCurrencyOpen(false); }}
                    style={{ color: c === currency ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition-colors focus:outline-none">
                    {c} {CURRENCY_SYMBOLS[c]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile search toggle */}
          <button onClick={() => setSearchOpen(v => !v)} className="md:hidden relative p-2 focus:outline-none"
            style={{ color: 'var(--foreground)' }}>
            <Search size={18} />
          </button>

          {/* Wishlist */}
          <button onClick={() => onNavigate(currentUser ? 'profile' : 'login')}
            className="relative p-2 hover:opacity-70 transition-opacity focus:outline-none" style={{ color: 'var(--foreground)' }}>
            <Heart size={18} />
            <Badge count={wishlistCount} />
          </button>

          {/* Cart */}
          <button onClick={() => onNavigate('cart')}
            className="relative p-2 hover:opacity-70 transition-opacity focus:outline-none" style={{ color: 'var(--foreground)' }}>
            <ShoppingBag size={18} />
            <Badge count={cartCount} />
          </button>

          {/* User */}
          {currentUser ? (
            <div className="relative">
              <button onClick={() => { setUserOpen(v => !v); setCurrencyOpen(false); }}
                className="p-1 hover:opacity-70 transition-opacity focus:outline-none">
                <div style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                  {currentUser.firstName[0].toUpperCase()}
                </div>
              </button>
              {userOpen && (
                <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  className="absolute right-0 top-10 w-48 z-50 shadow-2xl overflow-hidden">
                  <div style={{ borderBottom: '1px solid var(--border)' }} className="px-4 py-3">
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{currentUser.firstName}</p>
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs truncate">{currentUser.email}</p>
                  </div>
                  {[{ label: 'My Profile & Orders', page: 'profile' as Page }].map(({ label, page }) => (
                    <button key={label} onClick={() => { onNavigate(page); setUserOpen(false); }}
                      style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}
                      className="w-full px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors focus:outline-none">
                      {label}
                    </button>
                  ))}
                  <button onClick={() => { onLogout(); setUserOpen(false); }}
                    style={{ color: '#f87171', fontFamily: 'var(--font-body)', borderTop: '1px solid var(--border)' }}
                    className="w-full px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors focus:outline-none">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => onNavigate('login')} className="p-2 hover:opacity-70 transition-opacity focus:outline-none"
              style={{ color: 'var(--foreground)' }}>
              <User size={18} />
            </button>
          )}

          {/* Mobile menu */}
          <button className="md:hidden p-2 focus:outline-none ml-1" style={{ color: 'var(--foreground)' }}
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }} className="md:hidden px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)}
              placeholder="Search products…" autoFocus
              style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)', backgroundColor: 'var(--input-background)', border: '1px solid var(--border)' }}
              className="flex-1 px-3 py-2 text-sm focus:outline-none" />
            <button type="submit" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
              className="px-4 py-2 text-xs font-bold uppercase focus:outline-none">Go</button>
          </form>
        </div>
      )}

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}
          className="md:hidden px-6 py-4 flex flex-col gap-4">
          {(['home', 'shop'] as Page[]).map(p => (
            <button key={p} onClick={() => { onNavigate(p); setMobileOpen(false); }}
              style={{ color: currentPage === p ? 'var(--primary)' : 'var(--foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.07em' }}
              className="text-sm uppercase text-left focus:outline-none capitalize">{p}
            </button>
          ))}
          {currentUser && (
            <button onClick={() => { onNavigate('profile'); setMobileOpen(false); }}
              style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}
              className="text-sm uppercase text-left focus:outline-none">My Profile</button>
          )}
          <div style={{ borderTop: '1px solid var(--border)' }} className="pt-3 flex gap-2">
            {currencies.map(c => (
              <button key={c} onClick={() => { onCurrencyChange(c); setMobileOpen(false); }}
                style={{ color: c === currency ? 'var(--primary)' : 'var(--muted-foreground)', border: c === currency ? '1px solid var(--primary)' : '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                className="px-3 py-1 text-xs focus:outline-none">{c}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
