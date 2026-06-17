import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { KeyRound, Mail, AlertCircle, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0EE] dark:bg-[#0A0A0A] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-zinc-800"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#111] dark:text-white mb-2">Admin Login</h1>
          <p className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest">Sign in to manage MIDZERO</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#111] dark:text-white mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-5 py-4 pl-12 text-sm font-medium focus:outline-none focus:border-[#FA1594] transition-colors"
                placeholder="admin@midzero.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#111] dark:text-white mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-5 py-4 pl-12 text-sm font-medium focus:outline-none focus:border-[#FA1594] transition-colors"
                placeholder="••••••••"
              />
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#FA1594] focus:ring-[#FA1594]"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400 select-none">Remember Me</span>
            </label>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-[#FA1594] hover:underline">Forgot?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#111] dark:bg-white text-white dark:text-black rounded-xl font-black uppercase tracking-widest hover:bg-[#FA1594] dark:hover:bg-[#FA1594] dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[56px]"
          >
            {loading ? renderLoader() : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">- Or continue with -</p>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 min-h-[56px]"
          >
            {loading ? (
              renderLoader()
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs font-black uppercase tracking-widest text-[#111] dark:text-white">Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
