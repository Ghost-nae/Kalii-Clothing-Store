import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AuthPage } from './components/AuthPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SuccessPage } from './components/SuccessPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminPage } from './components/AdminPage';
import {
  Page, Currency, CartItem, User, Order, Review, OrderStatus,
  PRODUCTS, ADMIN_EMAIL, ADMIN_PASSWORD,
} from './components/types';

/* MARKER-MAKE-KIT-INVOKED */

const ls = {
  get: <T,>(key: string, fallback: T): T => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  },
  set: (key: string, val: unknown) => localStorage.setItem(key, JSON.stringify(val)),
};

function genRef() { return 'KL-' + Math.random().toString(36).substring(2, 8).toUpperCase(); }

export default function App() {
  const [page, setPage]                           = useState<Page>('home');
  const [currency, setCurrency]                   = useState<Currency>(ls.get('kalii_currency', 'ZAR'));
  const [cartItems, setCartItems]                 = useState<CartItem[]>(ls.get('kalii_cart', []));
  const [currentUser, setCurrentUser]             = useState<User | null>(ls.get('kalii_session', null));
  const [isAdmin, setIsAdmin]                     = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [wishlist, setWishlist]                   = useState<number[]>(ls.get('kalii_wishlist', []));
  const [orders, setOrders]                       = useState<Order[]>(ls.get('kalii_orders', []));
  const [reviews, setReviews]                     = useState<Review[]>(ls.get('kalii_reviews', []));
  const [searchQuery, setSearchQuery]             = useState('');
  const [orderRef, setOrderRef]                   = useState('');

  useEffect(() => { ls.set('kalii_cart',     cartItems); }, [cartItems]);
  useEffect(() => { ls.set('kalii_wishlist',  wishlist);  }, [wishlist]);
  useEffect(() => { ls.set('kalii_orders',    orders);    }, [orders]);
  useEffect(() => { ls.set('kalii_reviews',   reviews);   }, [reviews]);
  useEffect(() => { ls.set('kalii_currency',  currency);  }, [currency]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  // ── Cart ──────────────────────────────────────────────────────────────────
  const addToCart = (item: CartItem) => {
    const key = `${item.product.id}-${item.size}-${item.color}`;
    setCartItems(prev => {
      const hit = prev.find(i => `${i.product.id}-${i.size}-${i.color}` === key);
      return hit
        ? prev.map(i => `${i.product.id}-${i.size}-${i.color}` === key ? { ...i, quantity: i.quantity + item.quantity } : i)
        : [...prev, item];
    });
  };

  const updateQuantity = (productId: number, size: string, color: string, qty: number) =>
    setCartItems(prev => prev.map(i =>
      i.product.id === productId && i.size === size && i.color === color ? { ...i, quantity: qty } : i
    ));

  const removeItem = (productId: number, size: string, color: string) =>
    setCartItems(prev => prev.filter(i =>
      !(i.product.id === productId && i.size === size && i.color === color)
    ));

  const clearCart = () => setCartItems([]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogin = (user: User) => {
    const admin = user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD;
    setIsAdmin(admin);
    setCurrentUser(user);
    ls.set('kalii_session', user);
    setPage(admin ? 'admin' : 'home');
  };

  const handleLogout = () => {
    localStorage.removeItem('kalii_session');
    setCurrentUser(null);
    setIsAdmin(false);
    setPage('home');
  };

  // ── Wishlist ──────────────────────────────────────────────────────────────
  const toggleWishlist = (id: number) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // ── Orders ────────────────────────────────────────────────────────────────
  const handlePaymentSuccess = (order: Omit<Order, 'ref' | 'date' | 'status'>) => {
    const ref = genRef();
    const newOrder: Order = { ...order, ref, date: new Date().toISOString(), status: 'Order Received' };
    setOrders(prev => [newOrder, ...prev]);
    setOrderRef(ref);
    clearCart();
    setPage('success');
  };

  const updateOrderStatus = (ref: string, status: OrderStatus) =>
    setOrders(prev => prev.map(o => o.ref === ref ? { ...o, status } : o));

  // ── Reviews ───────────────────────────────────────────────────────────────
  const addReview = (review: Review) =>
    setReviews(prev => [review, ...prev.filter(r => !(r.productId === review.productId && r.userEmail === review.userEmail))]);

  const deleteReview = (productId: number, email: string) =>
    setReviews(prev => prev.filter(r => !(r.productId === productId && r.userEmail === email)));

  // ── Navigation ────────────────────────────────────────────────────────────
  const goToProduct = (id: number) => { setSelectedProductId(id); setPage('product'); };

  const navigate = (p: Page) => {
    if (p === 'profile' && !currentUser) { setPage('login'); return; }
    setPage(p);
  };

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) ?? null;
  const cartCount   = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }} className="antialiased">

      {/* Admin gets its own full-screen panel with no Navbar */}
      {isAdmin && page === 'admin' ? (
        <AdminPage
          orders={orders}
          reviews={reviews}
          onUpdateOrderStatus={updateOrderStatus}
          onDeleteReview={deleteReview}
          onLogout={handleLogout}
          currency={currency}
        />
      ) : (
        <>
          <Navbar
            currentPage={page}
            onNavigate={navigate}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            currentUser={currentUser}
            onLogout={handleLogout}
            currency={currency}
            onCurrencyChange={setCurrency}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={() => navigate('shop')}
          />

          {page === 'home' && (
            <HomePage onNavigate={navigate} onAddToCart={addToCart} currency={currency} onGoToProduct={goToProduct} />
          )}
          {page === 'shop' && (
            <ShopPage
              onAddToCart={addToCart} currency={currency}
              onGoToProduct={goToProduct} wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              initialSearch={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
          {page === 'product' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              currency={currency}
              onAddToCart={addToCart}
              onNavigate={navigate}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              reviews={reviews.filter(r => r.productId === selectedProduct.id)}
              currentUser={currentUser}
              onAddReview={addReview}
              onGoToProduct={goToProduct}
            />
          )}
          {(page === 'login' || page === 'register' || page === 'forgot') && (
            <AuthPage mode={page} onNavigate={navigate} onLogin={handleLogin} />
          )}
          {page === 'cart' && (
            <CartPage
              cartItems={cartItems} onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem} onClearCart={clearCart}
              currency={currency} onNavigate={navigate} currentUser={currentUser}
            />
          )}
          {page === 'checkout' && (
            <CheckoutPage
              cartItems={cartItems} currency={currency}
              onNavigate={navigate} onPaymentSuccess={handlePaymentSuccess}
              currentUser={currentUser}
            />
          )}
          {page === 'success' && <SuccessPage onNavigate={navigate} orderRef={orderRef} />}
          {page === 'profile' && currentUser && (
            <ProfilePage
              currentUser={currentUser}
              onUpdateUser={u => { setCurrentUser(u); ls.set('kalii_session', u); }}
              orders={orders}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              reviews={reviews.filter(r => r.userEmail === currentUser.email)}
              currency={currency}
              onNavigate={navigate}
              onGoToProduct={goToProduct}
              onLogout={handleLogout}
            />
          )}
        </>
      )}
    </div>
  );
}
