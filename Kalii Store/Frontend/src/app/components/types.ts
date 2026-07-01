// ── 2026-06 batch ─────────────────────────────────────────────────────────────
import imgTracksuit        from '../../images/WhatsApp Image 2026-06-14 at 18.43.09.jpeg';
import imgJacketFront      from '../../images/WhatsApp Image 2026-06-14 at 18.43.07.jpeg';
import imgJacketBack       from '../../images/WhatsApp Image 2026-06-14 at 18.43.06 (1).jpeg';
import imgJacketFlat       from '../../images/WhatsApp Image 2026-06-14 at 18.45.14.jpeg';
import imgCreamHoodie      from '../../images/WhatsApp Image 2026-06-14 at 18.43.08.jpeg';
import imgWhiteTee         from '../../images/WhatsApp Image 2026-06-14 at 18.43.08 (1).jpeg';
import imgBlackOvalTee     from '../../images/WhatsApp Image 2026-06-14 at 18.45.15.jpeg';
import imgGreenGlowHoodie  from '../../images/WhatsApp Image 2026-06-14 at 18.43.10.jpeg';
import imgGreenGlowFlat    from '../../images/WhatsApp Image 2026-06-14 at 18.45.15 (1).jpeg';
import imgGirlsClubTee     from '../../images/WhatsApp Image 2026-06-14 at 18.43.10 (1).jpeg';
import imgGroupShot        from '../../images/WhatsApp Image 2026-06-14 at 18.43.06.jpeg';
import imgTwoGuys          from '../../images/twoGuys.jpeg';

// ── 2025-08 batch ─────────────────────────────────────────────────────────────
import imgMint1            from '../../images/WhatsApp Image 2025-08-03 at 18.16.32.jpeg';
import imgMint2            from '../../images/WhatsApp Image 2025-08-03 at 18.16.32 (1).jpeg';
import imgMint3            from '../../images/WhatsApp Image 2025-08-03 at 18.16.32 (3).jpeg';
import imgMintBack1        from '../../images/WhatsApp Image 2025-08-03 at 18.16.32 (5).jpeg';
import imgMintBack2        from '../../images/WhatsApp Image 2025-08-03 at 18.16.32 (6).jpeg';
import imgOlive1           from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (1).jpeg';
import imgOlive2           from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (2).jpeg';
import imgOlive3           from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (3).jpeg';
import imgHat1             from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (4).jpeg';
import imgHat2             from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (5).jpeg';
import imgRack1            from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (7).jpeg';
import imgRack2            from '../../images/WhatsApp Image 2025-08-03 at 18.16.33 (9).jpeg';
import imgCrewneck1        from '../../images/WhatsApp Image 2025-08-03 at 18.13.48 (2).jpeg';
import imgCrewneck2        from '../../images/WhatsApp Image 2025-08-03 at 18.13.48 (3).jpeg';

export { imgTwoGuys, imgGroupShot };

// ─────────────────────────────────────────────────────────────────────────────
// Core types
// ─────────────────────────────────────────────────────────────────────────────
export type Page =
  | 'home' | 'shop' | 'product' | 'cart'
  | 'login' | 'register' | 'forgot'
  | 'checkout' | 'success'
  | 'profile' | 'admin';

export type Currency = 'ZAR' | 'USD' | 'EUR';

export type OrderStatus =
  | 'Order Received' | 'Payment Confirmed' | 'Processing'
  | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  badge?: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface Order {
  ref: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: Currency;
  status: OrderStatus;
  address: string;
  city: string;
  postalCode: string;
}

export interface Review {
  productId: number;
  userEmail: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
export const CURRENCY_RATES: Record<Currency, number> = { ZAR: 1, USD: 0.054, EUR: 0.049 };
export const CURRENCY_SYMBOLS: Record<Currency, string> = { ZAR: 'R', USD: '$', EUR: '€' };

export const COUPONS: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  'HUSTLE10':  { type: 'percent', value: 10, label: '10% off your order' },
  'KALII20':   { type: 'percent', value: 20, label: '20% off your order' },
  'NEWKID50':  { type: 'fixed',   value: 50, label: 'R50 off your order' },
  'GIRLSCLUB': { type: 'percent', value: 15, label: '15% off your order' },
};

export const ORDER_STAGES: OrderStatus[] = [
  'Order Received', 'Payment Confirmed', 'Processing',
  'Packed', 'Shipped', 'Out for Delivery', 'Delivered',
];

export const ADMIN_EMAIL    = 'admin@kalii.com';
export const ADMIN_PASSWORD = 'Kalii@2024';

const STD  = ['S', 'M', 'L', 'XL', 'XXL'];
const YOUTH = ['XS', 'S', 'M', 'L'];
const ONE  = ['One Size'];

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 1, name: 'Kalii Tracksuit Set', price: 999, category: 'Sets',
    images: [imgTracksuit, imgGroupShot],
    description: 'Full Kalii tracksuit — jacket and pants. Inspired by the hustle. Premium nylon with signature white stripe detailing and embroidered Kalii oval logos on chest and leg.',
    badge: 'Bestseller', sizes: STD, colors: ['Black'], stock: 15, rating: 4.8, reviewCount: 24,
  },
  {
    id: 2, name: 'Kalii Tracksuit Jacket', price: 599, category: 'Jackets',
    images: [imgJacketFront, imgJacketBack, imgJacketFlat],
    description: 'Kalii signature half-zip windbreaker jacket with oval logo badge. White stripe detailing on sleeves. Lightweight and packable.',
    badge: 'New', sizes: STD, colors: ['Black'], stock: 20, rating: 4.7, reviewCount: 18,
  },
  {
    id: 3, name: 'KALII Hoodie — Cream', price: 699, category: 'Tops',
    images: [imgCreamHoodie],
    description: 'Cream oversized hoodie with the iconic KALII bubble logo in burgundy. "Inspired by the hustle" script below. Heavy cotton blend for premium feel.',
    badge: 'Limited', sizes: STD, colors: ['Cream'], stock: 8, rating: 4.9, reviewCount: 31,
  },
  {
    id: 4, name: 'KALII Tee — White', price: 349, category: 'Tops',
    images: [imgWhiteTee],
    description: 'White heavyweight tee with the bold KALII bubble logo in burgundy. "Inspired by the hustle" script. 100% ring-spun cotton.',
    badge: 'New', sizes: STD, colors: ['White'], stock: 30, rating: 4.6, reviewCount: 14,
  },
  {
    id: 5, name: 'Kalii Oval Tee — Black', price: 299, category: 'Tops',
    images: [imgBlackOvalTee],
    description: 'Classic black tee with the embroidered Kalii oval chest logo. Clean, versatile — the essential Kalii everyday tee.',
    sizes: STD, colors: ['Black'], stock: 40, rating: 4.5, reviewCount: 22,
  },
  {
    id: 6, name: 'Green Glow Graphic Hoodie', price: 799, category: 'Tops',
    images: [imgGreenGlowHoodie],
    description: 'Statement black hoodie featuring the iconic green glow face graphic on front and back. Bold street art meets premium fleece. Limited edition.',
    badge: 'Trending', sizes: STD, colors: ['Black'], stock: 12, rating: 4.8, reviewCount: 19,
  },
  {
    id: 7, name: 'Green Glow Graphic Tee', price: 349, category: 'Tops',
    images: [imgGreenGlowFlat],
    description: 'Black tee with the bold green glow face graphic. Same iconic artwork as the hoodie in a lightweight tee format.',
    sizes: STD, colors: ['Black'], stock: 25, rating: 4.4, reviewCount: 9,
  },
  {
    id: 8, name: "Kalii Girl's Club Tee", price: 240, category: 'Womens',
    images: [imgGirlsClubTee],
    description: "Ladies inspired by the hustle. The Kalii Girl's Club tee features front and back graphics with the iconic lady logo.",
    badge: 'New', sizes: STD, colors: ['Black', 'Charcoal'], stock: 20, rating: 4.7, reviewCount: 11,
  },
  {
    id: 9, name: 'Mint Bear Hoodie', price: 699, category: 'Tops',
    images: [imgMint1, imgMint2, imgMint3, imgMintBack1, imgMintBack2],
    description: 'Fresh mint colourway with the Kalii bear "Inspired by the Hustle" logo on the chest and a large back graphic. Heavyweight fleece, relaxed fit.',
    badge: 'New', sizes: STD, colors: ['Mint'], stock: 18, rating: 4.9, reviewCount: 7,
  },
  {
    id: 10, name: 'Olive Green Graphic Tee', price: 349, category: 'Tops',
    images: [imgOlive1, imgOlive2, imgOlive3],
    description: 'Army olive tee with the green glow face graphic. Earthy tone meets bold street art print. Washed cotton, relaxed fit.',
    badge: 'Trending', sizes: STD, colors: ['Olive Green'], stock: 22, rating: 4.6, reviewCount: 5,
  },
  {
    id: 11, name: 'Inspired Bucket Hat', price: 199, category: 'Accessories',
    images: [imgHat1, imgHat2],
    description: 'The Kalii bear bucket hat. "Inspired by the Hustle" embroidery on the front panel. Adjustable strap, one size fits most.',
    badge: 'New', sizes: ONE, colors: ['Navy', 'Black'], stock: 35, rating: 4.5, reviewCount: 8,
  },
  {
    id: 12, name: 'Grey Kalii Logo Tee', price: 279, category: 'Tops',
    images: [imgRack1, imgRack2],
    description: 'Heather grey tee with the Kalii diamond shield logo. Lightweight everyday tee, versatile colourway that pairs with the full range.',
    sizes: STD, colors: ['Grey'], stock: 32, rating: 4.4, reviewCount: 4,
  },
  {
    id: 13, name: 'Youth Kalii Crewneck', price: 349, category: 'Youth',
    images: [imgCrewneck1, imgCrewneck2],
    description: 'Black crewneck sweatshirt with embroidered Kalii diamond shield logo. Designed for the next generation of hustlers.',
    badge: 'New', sizes: YOUTH, colors: ['Black'], stock: 15, rating: 4.8, reviewCount: 3,
  },
  {
    id: 14, name: 'Kalii 2024 Collection', price: 1299, category: 'Sets',
    images: [imgGroupShot, imgTracksuit],
    description: 'The full 2024 Spring/Summer collection. Move different. Stay original. Limited worldwide release. Includes jacket + pants + tee.',
    badge: 'Limited', sizes: STD, colors: ['Black'], stock: 5, rating: 5.0, reviewCount: 12,
  },
];
