import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, ShoppingBag, ExternalLink, ShieldCheck, ChevronRight, Menu, X, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import imgProduct1 from './assets/images/regenerated_image_1778602710542.jpg';
import imgProduct2 from './assets/images/regenerated_image_1778602711853.jpg';
import imgProduct4 from './assets/images/regenerated_image_1778602709338.jpg';

import { PortfolioSection } from './PortfolioSection';
import { TestimonialsSection } from './TestimonialsSection';
import imgRegenerated1778953719331 from './assets/images/regenerated_image_1778953719331.jpg';

// Types
type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  productUrl: string;
  category: 'Forex' | 'Trading Tools' | 'AI Tools' | 'Business' | 'E-Books' | 'Courses';
  createdAt: number;
};

// Initial Mock Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Nova AI Trading Bot V2.0',
    description: 'Fully automated algorithmic trading system powered by next-generation neural networks designed for major Forex pairs.',
    price: '$499.00',
    imageUrl: imgProduct1,
    productUrl: 'https://whop.com',
    category: 'AI Tools',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Institutional Order Block Indicators',
    description: 'Premium TradingView indicator that highlights institutional footprints, order blocks, and liquidity voids in real-time.',
    price: '$149.00',
    imageUrl: imgProduct2,
    productUrl: 'https://gumroad.com',
    category: 'Trading Tools',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'The Nexus Blueprint E-Book',
    description: 'A comprehensive 300-page guide covering risk management, psychology, and prop firm passing strategies.',
    price: '$49.00',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    productUrl: 'https://stan.store',
    category: 'E-Books',
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'Zero-to-Funded Bootcamp',
    description: 'Exclusive 6-week intensive course focusing on securing $100k+ in prop firm capital.',
    price: '$299.00',
    imageUrl: imgProduct4,
    productUrl: 'https://payhip.com',
    category: 'Courses',
    createdAt: Date.now(),
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<'home' | 'store' | 'community' | 'admin' | 'jackui'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // App State (Replacing Firebase for demo)
  const [products, setProducts] = useState<Product[]>([]);

  // Load theme and products
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Load products
    const savedProducts = localStorage.getItem('nova_nexus_products_v2');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('nova_nexus_products_v2', JSON.stringify(INITIAL_PRODUCTS));
    }
    
    // Check Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleNavClick = (view: 'home' | 'store' | 'community' | 'admin' | 'jackui') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setCurrentView('home');
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white relative">
      {/* Background Glows */}
      <div className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-zinc-200 dark:border-white/5 relative z-10 w-full transition-colors">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center h-full">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase">
              Nova Nexus
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-medium items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-zinc-900 dark:text-white ${currentView === 'home' ? 'text-zinc-900 dark:text-white border-b border-blue-500 pb-1' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('store')}
              className={`transition-colors hover:text-zinc-900 dark:text-white ${currentView === 'store' ? 'text-zinc-900 dark:text-white border-b border-blue-500 pb-1' : ''}`}
            >
              Store
            </button>
            <button 
              onClick={() => handleNavClick('community')}
              className={`transition-colors hover:text-zinc-900 dark:text-white ${currentView === 'community' ? 'text-zinc-900 dark:text-white border-b border-blue-500 pb-1' : ''}`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavClick('jackui')}
              className={`transition-colors hover:text-zinc-900 dark:text-white ${currentView === 'jackui' ? 'text-zinc-900 dark:text-white border-b border-blue-500 pb-1' : ''}`}
            >
              Jack UI
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div 
              className="w-10 h-5 bg-zinc-100 dark:bg-zinc-800 rounded-full relative cursor-pointer"
              onClick={toggleTheme}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-1' : 'left-6 bg-white dark:bg-zinc-900 border border-zinc-500'}`}></div>
            </div>

            <button 
              onClick={handleLogout}
              className="px-5 py-2 border border-red-500/30 text-red-400 rounded-full text-[11px] uppercase tracking-widest font-semibold hover:bg-red-500 hover:text-zinc-900 dark:text-white transition-all ml-2"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6 text-zinc-900 dark:text-white" /> : <Menu className="h-6 w-6 text-zinc-900 dark:text-white" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-zinc-200 dark:border-white/5 relative z-10 bg-zinc-50 dark:bg-[#050505]"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              <button onClick={() => handleNavClick('home')} className="text-[11px] uppercase tracking-widest text-left font-medium">Home</button>
              <button onClick={() => handleNavClick('store')} className="text-[11px] uppercase tracking-widest text-left font-medium">Store</button>
              <button onClick={() => handleNavClick('community')} className="text-[11px] uppercase tracking-widest text-left font-medium">Community</button>
              <button onClick={() => handleNavClick('jackui')} className="text-[11px] uppercase tracking-widest text-left font-medium">Jack UI</button>

              <button onClick={handleLogout} className="text-[11px] uppercase tracking-widest text-red-500 text-left font-medium mt-4">Logout</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && <HomeView key="home" onNavigate={handleNavClick} />}
          {currentView === 'store' && <StoreView key="store" products={products} />}
          {currentView === 'community' && <CommunityView key="community" />}
          {currentView === 'jackui' && <JackUiView key="jackui" />}
          {currentView === 'admin' && <AdminView key="admin" products={products} setProducts={setProducts} onLogout={handleLogout} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between px-6 lg:px-12 mt-auto relative z-10 w-full">
        <div className="flex flex-wrap gap-4 lg:gap-6 text-[9px] uppercase tracking-widest text-zinc-600 font-bold">
          <span>&copy; {new Date().getFullYear()} Nova Nexus Labs</span>
          <span className="hidden sm:inline">Secure Checkout via Whop</span>
          <span className="hidden md:inline">Global Digital License</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-blue-500">System Operational</span>
        </div>
      </footer>
    </div>
  );
}

// ----- VIEWS ----- //

function AuthView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else {
        setError(err.message || 'Authentication failed. Please check your credentials.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-closed-by-user') {
        // Just clear error or set a minor one
        setError('Sign-in cancelled.');
      } else {
        setError(err.message || 'Google Sign-In failed.');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-8 rounded-2xl z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <h2 className="text-2xl font-black tracking-widest uppercase">Nova Nexus</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-2 uppercase tracking-wider">{isLogin ? 'Access Portal' : 'Create Account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">{error}</div>}
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-black dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-black dark:text-white pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <label htmlFor="remember" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">Remember me</label>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl mt-2 hover:bg-zinc-200 transition-colors"
          >
            {isLogin ? 'Authenticate' : 'Register'}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-zinc-200 dark:border-white/10"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold tracking-widest text-xs py-4 rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] text-zinc-500 dark:text-zinc-500 text-center mt-2 uppercase tracking-wider px-4 hover:text-zinc-900 dark:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function HomeView({ onNavigate }: { onNavigate: (view: 'home' | 'store' | 'community' | 'admin' | 'jackui') => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col w-full"
    >
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-80px)] flex items-center px-6 lg:px-12 py-20 overflow-hidden">
        {/* Abstract Video & Image Background */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-black">
          <img 
            src="https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=2564&auto=format&fit=crop" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" 
          />
          <div className="absolute inset-0 bg-zinc-50 dark:bg-[#050505]/70 z-10 backdrop-blur-[1px]"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen z-10"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-28821-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 lg:h-full z-10 relative">
        {/* Left Content */}
        <div className="flex flex-col gap-6 justify-center py-12 lg:py-0">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="flex flex-col gap-6"
          >
            <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Premium Digital Marketplace</span>
            
            <div className="leading-none">
              <h1 className="text-7xl sm:text-[90px] xl:text-[110px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase">Nova</h1>
              <h1 className="text-7xl sm:text-[90px] xl:text-[110px] font-black tracking-tighter text-zinc-900 dark:text-white uppercase -mt-2 xl:-mt-4">Nexus</h1>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed">
              Transforming digital business with premium forex tools, AI resources, trading systems, and elite entrepreneur products.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://whop.com/fortune-digital-hub/fortune-digital-hub-5b/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 text-zinc-900 dark:text-white px-6 sm:px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-orange-500 transition-colors shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              >
                Whop Store
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              <a 
                href="https://t.me/+OLg2lgDqjVVjN2I0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-zinc-900 dark:text-white px-6 sm:px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Join Telegram
              </a>
              <a 
                href="https://payhip.com/FORTUNENOVAHUB"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 text-zinc-900 dark:text-white px-6 sm:px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-pink-500 transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] flex items-center gap-2"
              >
                Payhip
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right / Center Visuals */}
        <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute w-[320px] sm:w-[420px] h-[480px] sm:h-[580px] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-[40px] backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-4 overflow-hidden z-20"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-mono tracking-tighter">Live Analytics / FX-492</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="h-32 sm:h-40 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl flex flex-col relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" 
                alt="Forex Trading Chart" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 text-[10px] font-bold text-zinc-900 dark:text-white uppercase drop-shadow-md">Forex Pulse Pro</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 sm:h-24 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-3 border border-zinc-200 dark:border-white/5">
                <div className="text-[8px] text-zinc-500 dark:text-zinc-500 uppercase">Win Rate</div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-blue-400">92.4%</div>
              </div>
              <div className="h-20 sm:h-24 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-3 border border-zinc-200 dark:border-white/5">
                <div className="text-[8px] text-zinc-500 dark:text-zinc-500 uppercase">Avg Profit</div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-purple-400">+$1.4k</div>
              </div>
            </div>
            
            <div className="flex-1 bg-zinc-950/80 rounded-2xl border border-zinc-200 dark:border-white/10 p-4 space-y-3">
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-700 rounded transition-transform group-hover:scale-105"></div>
                  <div className="text-[10px] font-bold">Lumina AI Bot</div>
                </div>
                <span className="text-[10px] text-blue-400">Active</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-700 rounded"></div>
                  <div className="text-[10px] font-bold">Nexus OS Kit</div>
                </div>
                <span className="text-[10px]">Locked</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements Match Design HTML */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute w-48 h-64 bg-white/10 border border-zinc-300 dark:border-white/20 rounded-3xl backdrop-blur-md z-30 lg:-right-4 xl:right-10 top-10 lg:top-20 transform rotate-12 p-4 shadow-xl"
          >
            <div className="h-32 rounded-xl mb-4 overflow-hidden relative border border-white/10">
              <img src={imgRegenerated1778953719331} alt="Neural Edge V2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Neural-Edge V2</div>
            <div className="text-[14px] font-black mt-1 text-zinc-900 dark:text-white">$299.00</div>
            <div className="mt-3 w-full py-2 bg-white text-black text-[8px] font-bold uppercase text-center rounded-lg cursor-pointer">Buy Now</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden sm:block absolute w-48 h-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl z-10 lg:-left-12 xl:left-0 bottom-10 transform -rotate-6 p-4"
          >
            <div className="h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-4"></div>
            <div className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-500">Growth Course</div>
            <div className="text-[14px] font-black mt-1">FREE</div>
            <div className="mt-3 w-full py-2 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-[8px] font-bold uppercase text-center rounded-lg cursor-pointer">Download</div>
          </motion.div>
        </div>
      </div>
      </div>
      <PortfolioSection />
      <TestimonialsSection />

    </motion.div>
  );
}

function StoreView({ products }: { products: Product[], key?: React.Key }) {
  const categories = ['All', 'Forex', 'Trading Tools', 'AI Tools', 'Business', 'E-Books', 'Courses'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16"
    >
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">The Premium Store</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">Access our curated marketplace of high-performance digital tools and resources.</p>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 scrollbar-none">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:border-white/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 dark:text-zinc-500 font-medium">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={product.id}
              >
                <div className="overflow-hidden group border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 backdrop-blur-xl hover:border-blue-500/50 transition-colors duration-300 h-full flex flex-col rounded-[32px]">
                  <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-black/60 backdrop-blur-md text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col min-h-[220px]">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{product.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 flex-1 leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-black tracking-tighter">{product.price}</span>
                      <a 
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-200 transition-colors group/btn">
                          Buy Now
                          <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function CommunityView(props: { key?: React.Key }) {
  const links = [
    { name: "Telegram Channel", desc: "Join 10k+ traders for daily market breakdowns.", url: "https://t.me/+OLg2lgDqjVVjN2I0", icon: "💎", color: "from-blue-500 to-blue-600" },
    { name: "Whop Trading Floor", desc: "Access premium signals and live streams.", url: "https://whop.com/fortune-digital-hub/fortune-digital-hub-5b/", icon: "🚀", color: "from-orange-500 to-red-500" },
    { name: "Discord Server", desc: "Hang out with elite members of the Nexus.", url: "https://discord.com", icon: "🕹️", color: "from-indigo-500 to-purple-600" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto w-full px-6 lg:px-12 py-20 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
        <ShieldCheck className="w-8 h-8 text-zinc-900 dark:text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 flex flex-col">
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">Join The</span> 
        <span className="-mt-2">Inner Circle</span>
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-16 leading-relaxed">Connect with elite entrepreneurs, traders, and founders. Get exclusive insights before anyone else.</p>
      
      <div className="grid w-full gap-6">
        {links.map((link, i) => (
          <motion.a 
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative w-full rounded-[32px] bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden text-left flex items-center p-6"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl mr-6 border border-zinc-200 dark:border-white/5">
              {link.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{link.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm tracking-wide">{link.desc}</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:bg-white group-hover:text-black transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

function AdminView({ products, setProducts, onLogout }: { products: Product[], setProducts: (p: Product[]) => void, onLogout: () => void, key?: React.Key }) {
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    productUrl: '',
    category: 'Forex'
  });

  const handleDelete = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('nova_nexus_products', JSON.stringify(updated));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.imageUrl || !formData.productUrl) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description || '',
      price: formData.price,
      imageUrl: formData.imageUrl,
      productUrl: formData.productUrl,
      category: formData.category as Product["category"] || 'Forex',
      createdAt: Date.now()
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('nova_nexus_products_v2', JSON.stringify(updated));
    setIsAdding(false);
    setFormData({ title: '', description: '', price: '', imageUrl: '', productUrl: '', category: 'Forex' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto w-full px-6 lg:px-12 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-500 mt-2 font-medium tracking-wide">Manage your premium digital products (Local Demo Mode).</p>
        </div>
        <div className="flex gap-4">
          <button className="text-xs uppercase font-bold tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors" onClick={onLogout}>Logout</button>
          <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center hover:bg-zinc-200 transition-colors" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Product</>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-10 overflow-hidden"
          >
            <div className="border border-blue-500/30 bg-blue-500/5 backdrop-blur-md rounded-[32px] p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Product Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. Nexus Algorithm"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Category</label>
                    <select 
                      className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-zinc-900 dark:text-white"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                    >
                      <option className="bg-white dark:bg-zinc-900">Forex</option>
                      <option className="bg-white dark:bg-zinc-900">Trading Tools</option>
                      <option className="bg-white dark:bg-zinc-900">AI Tools</option>
                      <option className="bg-white dark:bg-zinc-900">Business</option>
                      <option className="bg-white dark:bg-zinc-900">E-Books</option>
                      <option className="bg-white dark:bg-zinc-900">Courses</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Price (e.g. $49.00)</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="$0.00"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Checkout URL (Whop/Gumroad)</label>
                    <input 
                      required
                      type="url" 
                      className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="https://"
                      value={formData.productUrl}
                      onChange={e => setFormData({...formData, productUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Image Upload OR URL</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-zinc-900 dark:text-white hover:file:bg-blue-500"
                      />
                      <input 
                        type="url" 
                        className="flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="...or paste URL instead"
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Description</label>
                    <textarea 
                      className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
                      placeholder="Short description..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pt-4">
                    <button type="submit" className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                      Save Product
                    </button>
                  </div>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-xl rounded-[32px] border border-zinc-200 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-white/5">
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-600 dark:text-zinc-400">Product</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">Category</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-600 dark:text-zinc-400">Price</th>
              <th className="px-6 py-4 text-right font-bold uppercase tracking-widest text-[10px] text-zinc-600 dark:text-zinc-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/5 overflow-hidden shrink-0 hidden sm:block">
                      <img src={p.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-sm tracking-wide text-zinc-900 dark:text-white">{p.title}</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase mt-1 sm:hidden">{p.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-[10px] font-bold uppercase text-zinc-700 dark:text-zinc-300">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-bold">{p.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-full bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all flex items-center justify-center ml-auto">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-500 font-medium">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function JackUiView(props: { key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full bg-[#0a0a0e] text-zinc-900 dark:text-white flex flex-col items-center py-6 px-4 md:px-8 gap-4 overflow-hidden font-mono"
    >
      {/* Top Navigation / Header (from the image) */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-500 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-purple-500 font-black text-xs">JAS-666</span>
          <span className="text-zinc-900 dark:text-white font-bold ml-2">JACKUI</span>
        </div>
        <div className="hidden md:flex gap-6">
          <span>EMAIL | HJJ303030@GMAIL.COM</span>
          <span>UI DESIGN / INTERACTION</span>
          <span>WEB DESIGN</span>
        </div>
      </div>

      {/* PANEL 1: CHARACTER/MECH */}
      <div className="w-full max-w-7xl relative bg-white dark:bg-zinc-900 min-h-[400px] md:h-[300px] rounded-sm overflow-hidden flex flex-col md:flex-row group border border-zinc-800">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f16] via-[#1a1c26] to-[#d5dae6] z-10 opacity-90 mix-blend-multiply"></div>
           <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2500&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[10s]" alt="Mech BG" />
        </div>
        
        {/* Left Character Area */}
        <div className="relative z-20 w-full md:w-1/3 h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent min-h-[300px]">
          <div className="absolute -left-20 -bottom-10 w-[400px] h-[120%] z-[-1] opacity-50 mix-blend-luminosity mix-blend-plus-lighter pointer-events-none">
            <img src="https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800" className="w-full h-full object-contain" alt="Character Render" />
          </div>
          
          {/* Stats */}
          <div className="flex flex-col gap-3 w-48 mt-auto backdrop-blur-md bg-white dark:bg-black/20 p-4 rounded-lg border border-zinc-200 dark:border-white/5">
             <div className="flex items-center justify-between text-[10px] uppercase">
                <span className="text-blue-300 font-bold tracking-widest w-6">HP</span>
                <div className="flex-1 mx-3 h-[2px] bg-zinc-100 dark:bg-zinc-800"><div className="h-full bg-blue-500 w-[70%] text-left"></div></div>
                <span className="text-zinc-900 dark:text-white text-right w-8">270</span>
             </div>
             <div className="flex items-center justify-between text-[10px] uppercase">
                <span className="text-purple-300 font-bold tracking-widest w-6">MP</span>
                <div className="flex-1 mx-3 h-[2px] bg-zinc-100 dark:bg-zinc-800"><div className="h-full bg-purple-500 w-[90%] text-left"></div></div>
                <span className="text-zinc-900 dark:text-white text-right w-8">6810</span>
             </div>
             <div className="flex items-center justify-between text-[10px] uppercase">
                <span className="text-yellow-300 font-bold tracking-widest w-6">EXP</span>
                <div className="flex-1 mx-3 h-[2px] bg-zinc-100 dark:bg-zinc-800"><div className="h-full bg-yellow-500 w-[30%] text-left"></div></div>
                <span className="text-zinc-900 dark:text-white text-right w-8">34</span>
             </div>
          </div>
        </div>

        {/* Right Info Area */}
        <div className="relative z-20 w-full md:w-2/3 h-full flex flex-col p-6 pt-12 items-end justify-center md:justify-around gap-8 text-right overflow-hidden min-h-[300px]">
          {/* Top Title */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-zinc-300 dark:border-white/20 px-6 py-2 rounded-tl-xl rounded-br-xl shadow-lg relative -top-6">
             <div className="w-4 h-4 border border-red-500 flex items-center justify-center rounded-full"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div></div>
             <div className="flex flex-col text-left">
                <span className="text-lg text-zinc-900 dark:text-white font-black tracking-widest uppercase">VX: JAS-666</span>
                <span className="text-[8px] text-zinc-700 dark:text-zinc-300 tracking-widest uppercase flex items-center gap-1"><div className="w-1 h-1 bg-white rounded-full"></div> Public Beta: Jack UI Lab</span>
             </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 w-[80%] h-[30%] md:h-[40%] bg-blue-500/10 skew-x-[-30deg] border border-blue-500/30 flex items-center pl-8 text-xl md:text-3xl font-black italic tracking-widest uppercase text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
             100% JACK UI
          </div>

          {/* Bottom Callouts */}
          <div className="flex flex-col gap-4 mt-auto">
             <div className="flex items-center gap-4 justify-end">
                <div className="flex flex-col text-right">
                   <span className="text-sm text-zinc-700 dark:text-zinc-300 font-black tracking-widest uppercase">Power Scarguse</span>
                   <span className="text-[8px] text-zinc-500 dark:text-zinc-500 tracking-widest">Go to the planet with your companions</span>
                </div>
                <div className="w-6 h-6 border border-blue-500/50 bg-blue-500/20 flex items-center justify-center transform rotate-45"><div className="w-2 h-2 bg-blue-400"></div></div>
             </div>
             <div className="flex items-center gap-4 justify-end">
                <div className="flex flex-col text-right">
                   <span className="text-sm text-zinc-700 dark:text-zinc-300 font-black tracking-widest uppercase">Modern Instruments</span>
                   <span className="text-[8px] text-zinc-500 dark:text-zinc-500 tracking-widest">Arctic Melt Earth's North and South Poles</span>
                </div>
                <div className="w-6 h-6 border border-purple-500/50 bg-purple-500/20 flex items-center justify-center rounded-full"><div className="w-3 h-3 bg-purple-400"></div></div>
             </div>
          </div>
        </div>
      </div>

      {/* PANEL 2: LANDSCAPE ROBOT */}
      <div className="w-full max-w-7xl relative bg-[#eef0f4] text-zinc-900 min-h-[400px] md:h-[350px] rounded-sm overflow-hidden flex items-center justify-center group shadow-md border border-zinc-300">
        {/* Diagonal Light Cutouts */}
        <div className="absolute right-0 w-1/2 h-full bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
        <div className="absolute left-[-10%] top-[-20%] w-[40%] h-[150%] bg-[#d9dde6] transform rotate-12 opacity-50 z-0"></div>

        {/* Top Left Title */}
        <div className="absolute top-6 left-6 z-20 flex flex-col">
          <span className="text-[8px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-500 uppercase flex items-center gap-2">Landscape Robot <div className="w-3 h-3 bg-blue-500 text-zinc-900 dark:text-white flex items-center justify-center rounded-sm text-[6px]">02</div></span>
          <span className="text-2xl font-black tracking-tighter uppercase text-zinc-800">BACK</span>
        </div>

        {/* Central Robot Graphic */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
           <img src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=800" className="h-[120%] object-cover mix-blend-multiply opacity-80 filter grayscale contrast-125 saturate-0" alt="Police Bot" />
           <div className="absolute w-[2px] h-[300px] bg-blue-500/50 transform rotate-45 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Content Layout */}
        <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 pt-20">
           {/* Left Tech Readout */}
           <div className="flex flex-col gap-1 md:mt-auto bg-white/90 p-5 backdrop-blur-md rounded-xl shadow-xl border border-zinc-200">
             <span className="text-xs font-black tracking-widest text-zinc-800 uppercase mb-2">Lorem Um Technology</span>
             <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 border-b border-zinc-200 pb-1 w-48">
                <span>Happy Lisa Qing</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
             </div>
             <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 border-b border-zinc-200 py-1 w-48">
                <span>Modern Time</span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
             </div>
             <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 pt-1 w-48">
                <span>Jack UI</span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
             </div>
             <div className="absolute -top-3 -right-3 w-7 h-7 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full flex items-center justify-center font-bold text-[8px] transform rotate-12 shadow-lg ring-2 ring-white">23</div>
           </div>

           {/* Right Call To Action */}
           <div className="flex flex-col items-center gap-2 md:mr-24 bg-white/70 p-4 backdrop-blur-md rounded-lg border border-white mt-12 md:mt-0 shadow-lg">
             <div className="w-8 h-8 rounded-full border-2 border-zinc-800 flex items-center justify-center">
               <div className="w-0 h-0 border-[6px] border-transparent border-l-zinc-800 ml-1"></div>
             </div>
             <div className="flex flex-col text-center mt-2">
                <span className="text-sm font-black tracking-[0.2em] uppercase text-zinc-900 drop-shadow-md">Choose A World</span>
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500">VX JAS-288</span>
             </div>
           </div>
        </div>
      </div>

      {/* PANEL 3: WEAPON DETAILS */}
      <div className="w-full max-w-7xl relative bg-zinc-100 text-zinc-900 min-h-[450px] md:h-[400px] rounded-sm overflow-hidden flex flex-col p-6 shadow-inner border border-zinc-300">
        {/* Background Radial Tech Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-zinc-300 rounded-full opacity-50 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-zinc-200 border-dashed rounded-full opacity-60 z-0 animate-[spin_120s_linear_infinite]"></div>
        
        {/* Header */}
        <div className="relative z-20 flex justify-between w-full">
           <div className="flex flex-col">
             <span className="text-[8px] font-bold tracking-[0.2em] text-blue-500 uppercase flex items-center gap-2">Weapon Details <div className="w-3 h-3 bg-blue-500 text-zinc-900 dark:text-white flex items-center justify-center rounded-sm text-[6px]">03</div></span>
             <span className="text-2xl font-black tracking-tighter uppercase text-zinc-800">BACK</span>
           </div>
           
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-500 uppercase mb-1 flex items-center gap-2">General Great <span className="w-1 h-3 bg-zinc-300 inline-block"></span> General Great</span>
              <div className="flex gap-1 h-8">
                 <div className="w-12 h-full bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-zinc-900 dark:text-white text-[8px] font-bold">SNIPER</div>
                 <div className="w-12 h-full bg-red-600 rounded flex items-center justify-center text-zinc-900 dark:text-white font-bold text-xs">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="relative flex-1 w-full z-10 flex flex-col md:flex-row mt-4">
           
           {/* Left Hexagons */}
           <div className="w-full md:w-1/3 flex flex-col justify-center pl-2 md:pl-12">
             <span className="text-[10px] font-black tracking-widest text-zinc-700 uppercase mb-4 opacity-80">Arctic Melt Earth's North</span>
             
             <div className="grid grid-cols-3 gap-2 w-48 relative z-20">
                {/* Hexagons styled using squares */}
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className={`aspect-square relative flex items-center justify-center border rounded transition-colors cursor-pointer ${i === 4 ? 'bg-red-500/10 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-white/50 backdrop-blur-sm border-zinc-300 hover:bg-zinc-200'}`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <span className="absolute top-2 left-2 text-[8px] text-zinc-600 dark:text-zinc-400 font-bold">{i}</span>
                     {i === 4 && <div className="w-1/2 h-1/2 border border-red-500 transform rotate-45 flex items-center justify-center"><div className="w-1/2 h-1/2 bg-red-500 transform rotate-45"></div></div>}
                     {i === 2 && <svg className="w-3 h-3 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                  </div>
                ))}
             </div>
             
             {/* Secondary hex row below */}
             <div className="grid grid-cols-3 gap-2 w-48 opacity-60 mt-2">
                {[1,2].map((i) => (
                  <div key={i} className="aspect-square relative flex items-center justify-center border border-zinc-300 rounded bg-transparent" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <span className="absolute top-2 left-2 text-[8px] text-zinc-600 dark:text-zinc-400 font-bold">{i}</span>
                  </div>
                ))}
             </div>
           </div>

           {/* Central Weapon Image */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-10 md:mt-0 z-10">
              <img src="https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?q=80&w=1200&auto=format&fit=crop" className="h-[200px] md:h-[250px] object-cover mix-blend-multiply opacity-90 drop-shadow-2xl filter contrast-125 hue-rotate-15" alt="Sci-Fi Weapon" style={{ clipPath: 'polygon(0 30%, 100% 0%, 100% 70%, 0% 100%)' }} />
           </div>

           {/* Bottom Right Callout */}
           <div className="absolute bottom-12 right-6 md:bottom-12 md:right-8 flex flex-col items-end gap-2 text-right z-20">
              <div className="flex items-center gap-3 bg-white/90 p-3 rounded-lg border border-zinc-200 backdrop-blur-md shadow-lg">
                 <div className="w-8 h-8 rounded-full border border-zinc-500 flex items-center justify-center text-[10px] text-zinc-700 font-bold bg-zinc-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                 </div>
                 <div className="flex flex-col text-right">
                    <span className="text-xs font-black tracking-widest text-zinc-800 uppercase">Close Combat</span>
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 tracking-wider">01</span>
                 </div>
              </div>
              <span className="text-[8px] tracking-[0.2em] text-zinc-500 dark:text-zinc-500 uppercase mt-2 bg-white/50 px-2 py-1 rounded">Public Beta: Jack UI Lab / VX: JAS-666</span>
           </div>
        </div>

        {/* Global Footer Layer over Panel 3 elements */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col md:flex-row md:items-center justify-between px-6 py-2 border-t border-zinc-200/50 text-[8px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest bg-zinc-100/90 backdrop-blur z-20">
           <div className="flex gap-4 items-center">
              <span className="text-black inline-flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white dark:bg-black"></div> JACK UI</span>
              <span>DETAILS</span>
              <span className="text-orange-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-orange-600"></div> LARGE RESOURCE</span>
              <span>WATCHING</span>
           </div>
           
           <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="tracking-widest">JACK UI DESIGN</span>
              <div className="w-4 h-4 bg-zinc-100 dark:bg-zinc-800 rounded-sm flex items-center justify-center text-zinc-900 dark:text-white">J</div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}