import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Page, User } from './types';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './types';

interface AuthPageProps {
  mode: 'login' | 'register' | 'forgot';
  onNavigate: (page: Page) => void;
  onLogin: (user: User) => void;
}

export function AuthPage({ mode, onNavigate, onLogin }: AuthPageProps) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const getUsers = (): User[] => {
  try {
    let users: User[] = JSON.parse(localStorage.getItem("kalii_users") || "[]");

    if (!users.some(user => user.email === ADMIN_EMAIL)) {
      users.push({
        firstName: "Admin",
        lastName: "Kalii",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      localStorage.setItem("kalii_users", JSON.stringify(users));
    }

    return users;
  } catch {
    return [];
  }
};
  
  const saveUsers = (users: User[]) => localStorage.setItem('kalii_users', JSON.stringify(users));

  const handleRegister = () => {
    setError(''); setSuccess('');
    if (!form.firstName.trim()) return setError('First name is required.');
    if (!form.lastName.trim()) return setError('Last name is required.');
    if (!form.email.includes('@')) return setError('Enter a valid email address.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    const users = getUsers();
    if (users.find(u => u.email === form.email)) return setError('An account with this email already exists.');
    const newUser: User = { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password };
    saveUsers([...users, newUser]);
    setSuccess('Account created! Redirecting to login…');
    setTimeout(() => onNavigate('login'), 1500);
  };

  const handleLogin = () => {
    setError(''); setSuccess('');
    if (!form.email || !form.password) return setError('Please fill in all fields.');
    const users = getUsers();
    const match = users.find(u => u.email === form.email && u.password === form.password);
    if (!match) return setError('Incorrect email or password.');
   
    onLogin(match);
    
  };

  const handleForgot = () => {
    setError(''); setSuccess('');
    if (!form.email.includes('@')) return setError('Enter a valid email address.');
    const users = getUsers();
    if (!users.find(u => u.email === form.email)) return setError('No account found with that email.');
    setSuccess('If an account exists, a reset link has been sent.');
  };

  const handleSubmit = () => {
    if (mode === 'register') handleRegister();
    else if (mode === 'login') handleLogin();
    else handleForgot();
  };

  const titles = {
    login: 'Welcome Back',
    register: 'Create Account',
    forgot: 'Reset Password',
  };

  const subtitles = {
    login: 'Sign in to access your cart and orders.',
    register: 'Join Kalii for exclusive drops and member perks.',
    forgot: 'Enter your email and we\'ll send you a reset link.',
  };

  return (
    <div
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
      className="pt-16 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => onNavigate('home')}
          style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
          className="flex items-center gap-2 text-sm mb-8 hover:text-foreground transition-colors focus:outline-none"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* Card */}
        <div
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          className="p-8"
        >
          {/* Brand */}
          <div className="mb-8">
            <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }} className="text-xs uppercase mb-3">KALII</p>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }} className="text-2xl font-bold uppercase">{titles[mode]}</h1>
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-sm mt-2">{subtitles[mode]}</p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="Thabo"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Nkosi"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    placeholder="Min. 6 characters"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                    className="w-full px-4 py-3 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    style={{ color: 'var(--muted-foreground)' }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground focus:outline-none"
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-xs uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            )}
          </div>

          {/* Feedback */}
          {error && (
            <div style={{ backgroundColor: 'rgba(212,24,61,0.1)', border: '1px solid rgba(212,24,61,0.3)', color: '#f87171', fontFamily: 'var(--font-body)' }} className="mt-4 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--primary)', fontFamily: 'var(--font-body)' }} className="mt-4 px-4 py-3 text-sm">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            className="w-full mt-6 py-4 text-sm uppercase font-bold hover:opacity-90 transition-opacity focus:outline-none"
          >
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>

          {/* Mode switchers */}
          <div style={{ borderTop: '1px solid var(--border)' }} className="mt-6 pt-6 flex flex-col gap-2 text-center">
            {mode === 'login' && (
              <>
                <button onClick={() => onNavigate('forgot')} style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }} className="text-xs hover:text-primary transition-colors focus:outline-none">
                  Forgot your password?
                </button>
                <button onClick={() => onNavigate('register')} style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm hover:text-primary transition-colors focus:outline-none">
                  Don't have an account? <span style={{ color: 'var(--primary)' }}>Register</span>
                </button>
              </>
            )}
            {mode === 'register' && (
              <button onClick={() => onNavigate('login')} style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm hover:text-primary transition-colors focus:outline-none">
                Already have an account? <span style={{ color: 'var(--primary)' }}>Sign In</span>
              </button>
            )}
            {mode === 'forgot' && (
              <button onClick={() => onNavigate('login')} style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }} className="text-sm hover:text-primary transition-colors focus:outline-none">
                Remember your password? <span style={{ color: 'var(--primary)' }}>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
