import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { Product, CartItem, Currency, CURRENCY_RATES, CURRENCY_SYMBOLS, Page, Review, User } from './types';

interface Props {
  product: Product;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  onNavigate: (page: Page) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  reviews: Review[];
  currentUser: User | null;
  onAddReview: (r: Review) => void;
  onGoToProduct: (id: number) => void;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? '#e53e3e' : 'none'} stroke={filled ? '#e53e3e' : 'currentColor'} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? 'var(--primary)' : 'none'}
          style={{ color: i <= Math.round(rating) ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }} />
      ))}
    </div>
  );
}

export function ProductDetailPage({ product, currency, onAddToCart, onNavigate, wishlist, onToggleWishlist, reviews, currentUser, onAddReview, onGoToProduct }: Props) {
  const [mainImg, setMainImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const rate = CURRENCY_RATES[currency];
  const sym  = CURRENCY_SYMBOLS[currency];
  const fmt  = (p: number) => `${sym}${(p * rate).toFixed(currency === 'ZAR' ? 0 : 2)}`;

  const isWishlisted = wishlist.includes(product.id);
  const soldOut = product.stock === 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes[0] !== 'One Size') { setSizeError(true); return; }
    setSizeError(false);
    onAddToCart({ product, quantity: qty, size: selectedSize || product.sizes[0], color: selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = () => {
    if (!currentUser || !reviewComment.trim()) return;
    onAddReview({
      productId: product.id,
      userEmail: currentUser.email,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString(),
    });
    setReviewSubmitted(true);
    setReviewComment('');
  };

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : product.rating;

  const userAlreadyReviewed = currentUser && reviews.some(r => r.userEmail === currentUser.email);

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }} className="pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Back */}
        <button onClick={() => onNavigate('shop')}
          style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
          className="flex items-center gap-2 text-sm mb-8 hover:text-foreground transition-colors focus:outline-none">
          <ArrowLeft size={14} /> Back to Shop
        </button>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '3/4' }}>
              <img src={product.images[mainImg]} alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-500" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImg(i)}
                    className="flex-shrink-0 overflow-hidden focus:outline-none transition-opacity"
                    style={{ width: 64, height: 80, border: i === mainImg ? '2px solid var(--primary)' : '2px solid transparent', opacity: i === mainImg ? 1 : 0.6 }}>
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-2">{product.category}</p>
              {product.badge && (
                <span style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)' }}
                  className="inline-block px-3 py-0.5 text-xs uppercase font-bold tracking-wider mb-3">
                  {product.badge}
                </span>
              )}
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', lineHeight: 1.1 }} className="text-3xl font-bold uppercase mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-3">
                <StarRow rating={avgRating} />
                <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">
                  {avgRating.toFixed(1)} ({reviews.length || product.reviewCount} reviews)
                </span>
              </div>
              <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-3xl font-bold">{fmt(product.price)}</p>
            </div>

            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }} className="text-sm">{product.description}</p>

            {/* Stock */}
            {soldOut ? (
              <p style={{ color: '#f87171', fontFamily: 'var(--font-body)' }} className="text-sm font-semibold">Out of Stock</p>
            ) : product.stock <= 5 ? (
              <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)' }} className="text-sm">Only {product.stock} left in stock!</p>
            ) : (
              <p style={{ color: '#4ade80', fontFamily: 'var(--font-body)' }} className="text-xs">In Stock</p>
            )}

            {/* Color */}
            {product.colors.length > 1 && (
              <div>
                <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-2">
                  Colour: <span style={{ color: 'var(--primary)' }}>{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)}
                      style={{
                        fontFamily: 'var(--font-body)',
                        border: c === selectedColor ? '1px solid var(--primary)' : '1px solid var(--border)',
                        color: c === selectedColor ? 'var(--primary)' : 'var(--muted-foreground)',
                        backgroundColor: 'transparent',
                      }}
                      className="px-4 py-1.5 text-xs transition-all focus:outline-none">{c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes[0] !== 'One Size' && (
              <div>
                <p style={{ color: sizeError ? '#f87171' : 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-2">
                  Size {sizeError && '— Please select a size'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false); }}
                      style={{
                        fontFamily: 'var(--font-display)', width: 44, height: 44,
                        border: s === selectedSize ? '2px solid var(--primary)' : '1px solid var(--border)',
                        color: s === selectedSize ? 'var(--primary)' : 'var(--muted-foreground)',
                        backgroundColor: 'transparent',
                      }}
                      className="text-sm font-semibold transition-all focus:outline-none">{s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-3">
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider">Qty</p>
              <div style={{ border: '1px solid var(--border)' }} className="flex items-center">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ color: 'var(--foreground)' }}
                  className="px-3 py-2 hover:bg-white/5 transition-colors focus:outline-none text-lg leading-none">−</button>
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}
                  className="px-4 py-2 text-sm min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock || 10, q + 1))} style={{ color: 'var(--foreground)' }}
                  className="px-3 py-2 hover:bg-white/5 transition-colors focus:outline-none text-lg leading-none">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={soldOut}
                style={{
                  backgroundColor: added ? 'rgba(201,168,76,0.7)' : soldOut ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                  color: soldOut ? 'var(--muted-foreground)' : 'var(--primary-foreground)',
                  fontFamily: 'var(--font-display)', letterSpacing: '0.1em',
                }}
                className="flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-all focus:outline-none disabled:cursor-not-allowed">
                <ShoppingBag size={16} />
                {added ? 'Added!' : soldOut ? 'Sold Out' : 'Add to Cart'}
              </button>
              <button onClick={() => onToggleWishlist(product.id)}
                style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                className="px-4 py-4 hover:border-red-400 transition-colors focus:outline-none">
                <HeartIcon filled={isWishlisted} />
              </button>
            </div>

            {/* Info strips */}
            <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4 flex flex-col gap-2">
              {[
                ['Free Delivery', 'On orders over R800'],
                ['Easy Returns', '14-day hassle-free returns'],
                ['Secure Payment', '256-bit SSL encrypted'],
              ].map(([title, desc]) => (
                <div key={title} className="flex justify-between">
                  <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-xs font-semibold">{title}</span>
                  <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div style={{ borderTop: '1px solid var(--border)' }} className="mt-16 pt-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Customer Reviews</p>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase">
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </h2>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <StarRow rating={avgRating} size={18} />
                <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Review list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {reviews.length === 0 ? (
                <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }} className="text-sm font-semibold">{r.userName}</p>
                        <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">{new Date(r.date).toLocaleDateString('en-ZA')}</p>
                      </div>
                      <StarRow rating={r.rating} size={13} />
                    </div>
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }} className="text-sm">{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write a review */}
            <div>
              {!currentUser ? (
                <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5 text-center">
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm mb-3">Sign in to leave a review</p>
                  <button onClick={() => onNavigate('login')}
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                    className="px-6 py-2.5 text-xs uppercase font-bold hover:opacity-90 focus:outline-none">Sign In</button>
                </div>
              ) : reviewSubmitted || userAlreadyReviewed ? (
                <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5">
                  <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }} className="text-sm font-bold mb-1">Review submitted!</p>
                  <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs">Thank you for your feedback.</p>
                </div>
              ) : (
                <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="p-5 flex flex-col gap-4">
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-base font-bold uppercase">Write a Review</h3>
                  <div>
                    <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-2">Your Rating</p>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => setReviewRating(n)} className="focus:outline-none">
                          <Star size={22} fill={n <= reviewRating ? 'var(--primary)' : 'none'}
                            style={{ color: n <= reviewRating ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-2 block">Your Review</label>
                    <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                      rows={4} placeholder="Tell others what you think…"
                      style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)', resize: 'none' }}
                      className="w-full px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:opacity-40" />
                  </div>
                  <button onClick={handleReviewSubmit} disabled={!reviewComment.trim()}
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                    className="py-3 text-xs uppercase font-bold hover:opacity-90 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed">
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
