import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { AuthPage } from './components/AuthPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SuccessPage } from './components/SuccessPage';
import { Page, Currency, CartItem, User } from './components/types';

/* MARKER-MAKE-KIT-INVOKED */

function generateOrderRef() {
  return 'KL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function loadCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem('kalii_cart') || '[]'); } catch { return []; }
}
function saveCart(items: CartItem[]) {
  localStorage.setItem('kalii_cart', JSON.stringify(items));
}
function loadSession(): User | null {
  try { return JSON.parse(localStorage.getItem('kalii_session') || 'null'); } catch { return null; }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);
  const [currentUser, setCurrentUser] = useState<User | null>(loadSession);
  const [orderRef, setOrderRef] = useState('');

  // Persist cart
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === item.product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === item.product.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (productId: number, qty: number) => {
    setCartItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const handleLogout = () => {
    localStorage.removeItem('kalii_session');
    setCurrentUser(null);
    setPage('home');
  };

  const handlePaymentSuccess = () => {
    setOrderRef(generateOrderRef());
    clearCart();
    setPage('success');
  };

  return (
    <div
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}
      className="antialiased"
    >
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        cartItems={cartItems}
        currentUser={currentUser}
        onLogout={handleLogout}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {page === 'home' && (
        <HomePage
          onNavigate={setPage}
          onAddToCart={addToCart}
          currency={currency}
        />
      )}

      {page === 'shop' && (
        <ShopPage
          onAddToCart={addToCart}
          currency={currency}
        />
      )}

      {(page === 'login' || page === 'register' || page === 'forgot') && (
        <AuthPage
          mode={page}
          onNavigate={setPage}
          onLogin={setCurrentUser}
        />
      )}

      {page === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          currency={currency}
          onNavigate={setPage}
          currentUser={currentUser}
        />
      )}

      {page === 'checkout' && (
        <CheckoutPage
          cartItems={cartItems}
          currency={currency}
          onNavigate={setPage}
          onPaymentSuccess={handlePaymentSuccess}
          currentUser={currentUser}
        />
      )}

      {page === 'success' && (
        <SuccessPage
          onNavigate={setPage}
          orderRef={orderRef}
        />
      )}
    </div>
  );
}
