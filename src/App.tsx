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
import { PortfolioSection } from './PortfolioSection';
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
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-900 selection:text-white transition-colors duration-500">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-gray-900 bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/40 shadow-sm hover:bg-white/40 active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all">BLACKPIXEL</Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-900 bg-white/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-sm active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all">
              <Link to="/" className="hover:text-gray-700 transition-colors">Start</Link>
              <Link to="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
              {user && <Link to="/admin" className="hover:text-gray-700 transition-colors font-bold">Admin</Link>}
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <Link to="/login" className="hidden sm:block text-sm font-medium text-gray-900 border border-white/40 bg-white/30 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white/50 hover:text-gray-900 active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all shadow-sm">Sign In</Link>
              ) : (
                <button onClick={handleSignOut} className="hidden sm:block text-sm font-medium text-red-600 bg-white/30 backdrop-blur-md border border-white/40 px-6 py-2 rounded-full hover:bg-white/50 active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all shadow-sm">Logout</button>
              )}
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-900 p-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full shadow-sm hover:bg-white/40 active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all"
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
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex flex-col p-6 gap-6 text-lg font-medium text-gray-900 border border-white/20">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 transition-colors">Start</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 transition-colors">Blog</Link>
              {user && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-gray-600 transition-colors">Admin</Link>}
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

        <footer className="bg-[#111] text-[#F0F0EE] py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none text-[20vw] font-black leading-none uppercase translate-x-1/4 -translate-y-1/4 mix-blend-overlay">
            BLACKPIXEL
          </div>
          <motion.div 
            className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10"
            initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.95, transformPerspective: 1000 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1000 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[12vw] sm:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] text-white">
              Bring it on!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-[#333] pt-12 text-sm text-[#999] font-medium leading-relaxed">
              <div>
                <p className="mb-4 text-white font-bold uppercase tracking-widest">About</p>
                <p>Ⓒ BLACKPIXEL Creative Agency,<br/>2017 - {new Date().getFullYear()} | All rights reserved.</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-white font-bold uppercase tracking-widest">Legal</p>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
              </div>
              <div>
                <p className="mb-4 text-white font-bold uppercase tracking-widest">Glendale Address:</p>
                <p>655 North Central Ave 17th Floor,<br/>Glendale, CA 91203</p>
              </div>
              <div>
                <p className="mb-4 text-white font-bold uppercase tracking-widest">Burbank Address:</p>
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
