import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import Admin from './pages/Admin';
import Login from './pages/Login';
import PortfolioSection from './PortfolioSection';
import ChatbotWidget from './ChatbotWidget';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In failed', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optional: redirect to home after sign out
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  const handleGatedLink = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen text-white font-sans selection:bg-[#00FF66] selection:text-black relative">
        {/* Fullscreen Fixed Zoomed-Out Background - crystal clear with no dimming overlays */}
        <div 
          className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
          style={{ 
            backgroundImage: "url('/5.jpg')",
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top"
          }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 bg-black/75 backdrop-blur-xl px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-[#00FF66]/60 hover:shadow-[0_0_25px_rgba(0,255,102,0.3)] active:bg-[#00FF66] active:text-black transition-all group"
            >
              <img 
                src="/blackcard-logo.jpg" 
                alt="BLACKCARD Official Logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain bg-black flex-shrink-0 group-hover:scale-105 transition-transform" 
              />
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white">BLACKCARD</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-medium text-zinc-300 bg-black/60 backdrop-blur-xl px-7 py-2.5 rounded-full border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <Link to="/" className="hover:text-[#00FF66] transition-colors">Start</Link>
              <Link to="/blog" className="hover:text-[#00FF66] transition-colors">Blog</Link>
              {user && <Link to="/admin" className="hover:text-[#00FF66] transition-colors font-bold text-white">Admin</Link>}
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <Link to="/login" className="hidden sm:block text-sm font-bold text-white border border-white/20 bg-black/60 backdrop-blur-xl px-6 py-2.5 rounded-full hover:bg-white/10 hover:border-[#00FF66]/60 hover:shadow-[0_0_20px_rgba(0,255,102,0.25)] active:bg-[#00FF66] active:text-black transition-all shadow-md">Sign In</Link>
              ) : (
                <button onClick={handleSignOut} className="hidden sm:block text-sm font-bold text-red-400 bg-black/60 backdrop-blur-xl border border-red-500/30 px-6 py-2.5 rounded-full hover:bg-red-500/20 hover:border-red-500/60 transition-all shadow-md">Logout</button>
              )}
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full shadow-md hover:bg-white/10 active:bg-[#00FF66] active:text-black transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-24 left-4 right-4 z-[60]">
            <div className="bg-[#0c0d0e]/95 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col p-6 gap-6 text-lg font-medium text-white border border-white/20 bg-grid-wallpaper">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <img src="/blackcard-logo.jpg" alt="BLACKCARD Logo" className="w-8 h-8 rounded-lg object-contain bg-black border border-white/15" />
                <span className="font-black text-xl tracking-tighter uppercase text-white">BLACKCARD</span>
              </div>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00FF66] transition-colors">Start</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00FF66] transition-colors">Blog</Link>
              {user && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="font-bold text-[#00FF66] hover:text-white transition-colors">Admin</Link>}
            </div>
          </div>
        )}

        <main className="flex-1 w-full bg-transparent">
          <Routes>
            <Route path="/" element={<Home handleGatedLink={handleGatedLink} />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin" element={<Admin user={user} isAuthLoading={isAuthLoading} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<PortfolioSection />} />
          </Routes>
        </main>

        <footer className="bg-black/90 backdrop-blur-2xl border-t border-white/20 text-[#F0F0EE] py-24 px-6 md:px-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none text-[20vw] font-black leading-none uppercase translate-x-1/4 -translate-y-1/4 mix-blend-overlay text-white">
            BLACKCARD
          </div>
          <motion.div 
            className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/blackcard-logo.jpg" 
                  alt="BLACKCARD Official Logo" 
                  className="w-12 h-12 rounded-xl object-contain bg-black border border-white/20 shadow-lg" 
                />
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white">BLACKCARD</h3>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#00FF66]">Creative Agency & Market</p>
                </div>
              </div>
            </div>

            <h2 className="text-[12vw] sm:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] text-white">
              Bring it on!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/15 pt-12 text-sm text-zinc-200 font-medium leading-relaxed">
              <div>
                <p className="mb-4 text-[#00FF66] font-bold uppercase tracking-widest text-xs">About</p>
                <p>Ⓒ BLACKCARD Creative Agency,<br/>2017 - {new Date().getFullYear()} | All rights reserved.</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-[#00FF66] font-bold uppercase tracking-widest text-xs">Legal</p>
                <a href="#" className="hover:text-[#00FF66] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#00FF66] transition-colors">Terms and Conditions</a>
                <a href="#" className="hover:text-[#00FF66] transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-[#00FF66] transition-colors">Accessibility Statement</a>
              </div>
              <div>
                <p className="mb-4 text-[#00FF66] font-bold uppercase tracking-widest text-xs">Glendale Address:</p>
                <p>655 North Central Ave 17th Floor,<br/>Glendale, CA 91203</p>
              </div>
              <div>
                <p className="mb-4 text-[#00FF66] font-bold uppercase tracking-widest text-xs">Burbank Address:</p>
                <p>40 E Verdugo Street, Ste 114<br/>Burbank, CA 91502</p>
              </div>
            </div>
          </motion.div>
        </footer>
        <ChatbotWidget user={user} />
      </div>
    </BrowserRouter>
  );
}
