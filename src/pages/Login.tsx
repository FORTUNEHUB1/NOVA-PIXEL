import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { KeyRound, Mail, AlertCircle, Loader2 } from 'lucide-react';
import heroBgVideo from '../assets/videos/hero-bg.mp4';

// Help log security access
async function logAuthEvent(email: string, success: boolean, action: string, uid?: string) {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      email,
      success,
      action,
      uid: uid || null,
      timestamp: Timestamp.now(),
      userAgent: navigator.userAgent
    });
  } catch(e) {
    console.error("Audit log failed to write", e);
  }
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await logAuthEvent(email, true, 'email_password_login', userCredential.user.uid);
      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err.code);
      // Generic error so we don't reveal if account exists
      setError('Invalid email or password. Please try again.');
      await logAuthEvent(email, false, 'email_password_login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);

      const result = await signInWithPopup(auth, googleProvider);
      await logAuthEvent(result.user.email || 'Unknown Google User', true, 'google_login', result.user.uid);
      navigate('/admin');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err.code);
      setError('Authentication failed. Please try again or use another method.');
      await logAuthEvent('Unknown Google Attempt', false, 'google_login');
    } finally {
      setLoading(false);
    }
  };

  const renderLoader = () => (
    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={heroBgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Login</h1>
          <p className="text-gray-200 font-medium text-sm">Welcome back please login to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border border-white/50 rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner"
                placeholder="User Name"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border border-white/50 rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner"
                placeholder="Password"
              />
              <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-white focus:ring-white bg-transparent"
              />
              <span className="text-sm font-medium text-white select-none">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[56px] mt-4"
          >
            {loading ? renderLoader() : 'Login'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6">- Or continue with -</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-bold text-white">Google</span>
            </button>
            <button
              disabled={loading}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.56.12 2.89.69 3.77 1.87-3.15 1.83-2.6 6.13.57 7.42-.72 1.81-1.92 3.82-2.92 3.68zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-bold text-white">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white text-sm font-medium">Don't have an account? <a href="#" className="font-bold hover:underline">Signup</a></p>
        </div>
      </motion.div>
    </div>
  );
}
