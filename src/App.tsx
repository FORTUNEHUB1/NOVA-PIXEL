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

  const handleGatedLink = async (url: string) => {
    if (user) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
          const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = url;
          }
        }
      } catch (error) {
        console.error('Sign-in required to open link:', error);
      }
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
      <div className="min-h-screen bg-[#F0F0EE] text-[#111111] dark:bg-[#0A0A0A] dark:text-[#F0F0EE] font-sans selection:bg-[#111] selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 text-[#111] dark:text-white transition-colors duration-500 overflow-visible bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 dark:border-white/10">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">MIDZERO</Link>
          
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex gap-10 font-bold uppercase tracking-widest text-xs">
              <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
              <Link to="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
              <a href="#" className="hover:opacity-70 transition-opacity">About</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Work</a>
              {user && <Link to="/admin" className="hover:opacity-70 transition-opacity text-[#FA1594]">Admin</Link>}
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <Link to="/login" className="hidden sm:block text-xs font-bold uppercase border border-current px-4 py-2 rounded-full hover:bg-[#111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">SignIn</Link>
              ) : (
                <button onClick={handleSignOut} className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700">Exit</button>
              )}
              
              <button 
                onClick={toggleTheme} 
                className="px-4 py-2 rounded-full border border-current hover:bg-[#111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#111] text-white z-[60] flex flex-col justify-center items-center gap-8 text-3xl font-black uppercase tracking-tighter">
            <div className="absolute top-6 right-6">
               <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <a href="#" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Work</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Contact</a>
            {user && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#FA1594]">Admin</Link>}
            
            <div className="mt-8 flex gap-4">
              {!user ? (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors">Sign In</Link>
              ) : (
                 <button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="text-xl font-bold uppercase text-red-500 tracking-widest">Sign Out</button>
              )}
            </div>
          </div>
        )}

        <main className="pt-24 uppercase-headings bg-[#F0F0EE] dark:bg-[#0A0A0A]">
          <Routes>
            <Route path="/" element={<Home handleGatedLink={handleGatedLink} />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin" element={<Admin user={user} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="bg-[#111] text-[#F0F0EE] py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none text-[20vw] font-black leading-none uppercase translate-x-1/4 -translate-y-1/4 mix-blend-overlay">
            MIDZERO
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
                <p>Ⓒ MIDZERO Creative Agency,<br/>2017 - {new Date().getFullYear()} | All rights reserved.</p>
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
