// Local product images
import imgTracksuit from '../../images/WhatsApp Image 2026-06-14 at 18.43.09.jpeg';
import imgTracksuitJacketFront from '../../images/WhatsApp Image 2026-06-14 at 18.43.07.jpeg';
import imgTracksuitJacketBack from '../../images/WhatsApp Image 2026-06-14 at 18.43.06 (1).jpeg';
import imgTracksuitJacketFlat from '../../images/WhatsApp Image 2026-06-14 at 18.45.14.jpeg';
import imgCreamHoodie from '../../images/WhatsApp Image 2026-06-14 at 18.43.08.jpeg';
import imgWhiteTee from '../../images/WhatsApp Image 2026-06-14 at 18.43.08 (1).jpeg';
import imgBlackTee from '../../images/WhatsApp Image 2026-06-14 at 18.45.15.jpeg';
import imgGreenGlowHoodie from '../../images/WhatsApp Image 2026-06-14 at 18.43.10.jpeg';
import imgGreenGlowTeeFlat from '../../images/WhatsApp Image 2026-06-14 at 18.45.15 (1).jpeg';
import imgGirlsClubTee from '../../images/WhatsApp Image 2026-06-14 at 18.43.10 (1).jpeg';
import imgGroupShot from '../../images/WhatsApp Image 2026-06-14 at 18.43.06.jpeg';

export type Page = 'home' | 'shop' | 'cart' | 'login' | 'register' | 'forgot' | 'checkout' | 'success';

export type Currency = 'ZAR' | 'USD' | 'EUR';

export interface Product {
  id: number;
  name: string;
  price: number; // base price in ZAR
  category: string;
  image: string;
  description: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CURRENCY_RATES: Record<Currency, number> = {
  ZAR: 1,
  USD: 0.054,
  EUR: 0.049,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Kalii Tracksuit Set',
    price: 999,
    category: 'Sets',
    image: imgTracksuit,
    description: 'Full Kalii tracksuit — jacket and pants. Inspired by the hustle.',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Kalii Tracksuit Jacket',
    price: 599,
    category: 'Jackets',
    image: imgTracksuitJacketFront,
    description: 'Kalii signature windbreaker jacket with oval logo badge.',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Kalii Jacket — Back Logo',
    price: 599,
    category: 'Jackets',
    image: imgTracksuitJacketBack,
    description: 'Kalii jacket featuring the oversized oval back logo graphic.',
  },
  {
    id: 4,
    name: 'Kalii Jacket — Flat',
    price: 599,
    category: 'Jackets',
    image: imgTracksuitJacketFlat,
    description: 'Classic Kalii half-zip windbreaker with white stripe detailing.',
  },
  {
    id: 5,
    name: 'KALII Hoodie — Cream',
    price: 699,
    category: 'Tops',
    image: imgCreamHoodie,
    description: 'Cream oversized hoodie with KALII bubble logo in burgundy.',
    badge: 'Limited',
  },
  {
    id: 6,
    name: 'KALII Tee — White',
    price: 349,
    category: 'Tops',
    image: imgWhiteTee,
    description: 'White heavyweight tee with KALII "inspired by the hustle" print.',
    badge: 'New',
  },
  {
    id: 7,
    name: 'Kalii Oval Tee — Black',
    price: 299,
    category: 'Tops',
    image: imgBlackTee,
    description: 'Classic black tee with embroidered Kalii oval chest logo.',
  },
  {
    id: 8,
    name: 'Green Glow Graphic Hoodie',
    price: 799,
    category: 'Tops',
    image: imgGreenGlowHoodie,
    description: 'Statement black hoodie featuring the iconic green glow graphic.',
    badge: 'Trending',
  },
  {
    id: 9,
    name: 'Green Glow Graphic Tee',
    price: 349,
    category: 'Tops',
    image: imgGreenGlowTeeFlat,
    description: 'Black tee with the bold green glow face graphic print.',
  },
  {
    id: 10,
    name: "Kalii Girl's Club Tee",
    price: 240,
    category: 'Womens',
    image: imgGirlsClubTee,
    description: "Ladies inspired by the hustle. Kalii Girl's Club tee front & back.",
    badge: 'New',
  },
  {
    id: 11,
    name: 'Kalii 2024 Collection Set',
    price: 1299,
    category: 'Sets',
    image: imgGroupShot,
    description: 'The full 2024 Spring/Summer collection. Move different. Stay original.',
    badge: 'Limited',
  },
];

// Hero background image — 2 guys photo
import imgTwoGuys from '../../images/twoGuys.jpeg';
export { imgTwoGuys };
