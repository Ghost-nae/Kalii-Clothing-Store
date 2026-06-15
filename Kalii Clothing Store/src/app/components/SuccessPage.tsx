import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Page } from './types';

interface SuccessPageProps {
  onNavigate: (page: Page) => void;
  orderRef: string;
}

export function SuccessPage({ onNavigate, orderRef }: SuccessPageProps) {
  return (
    <div
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
      className="pt-16 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-8">
        {/* Animated checkmark circle */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle size={48} style={{ color: 'var(--primary)' }} />
        </div>

        <div>
          <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }} className="text-xs uppercase mb-3">Order Confirmed</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', lineHeight: 1.1 }} className="text-4xl md:text-5xl font-bold uppercase mb-4">
            Thank You!
          </h1>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }} className="text-base max-w-sm mx-auto">
            Your order has been placed and is being processed. You'll receive a confirmation shortly.
          </p>
        </div>

        {/* Order reference */}
        <div style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} className="w-full p-6">
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-2">Order Reference</p>
          <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }} className="text-lg font-bold">{orderRef}</p>
          <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs mt-2">Estimated delivery: 3–5 business days</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.1em',
            }}
            className="flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none"
          >
            Continue Shopping <ArrowRight size={14} />
          </button>
          <button
            onClick={() => onNavigate('home')}
            style={{
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.1em',
            }}
            className="flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase font-bold hover:border-white/30 transition-colors focus:outline-none"
          >
            <Home size={14} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
