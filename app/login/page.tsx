'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, name, password);
      }
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const fillDemo = () => {
    if (isLogin) {
      setEmail('admin@fonebazaar.com');
      setPassword('admin123');
    } else {
      setName('John Doe');
      setEmail('customer@example.com');
      setPassword('password123');
    }
  };

  const inputClass = "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-black rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all placeholder-gray-400";

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen px-4 pt-16 pb-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 p-10 rounded-3xl shadow-xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  FONE BAZAAR
                </span>
              </Link>
              <h1 className="text-3xl font-extrabold text-black mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isLogin ? 'Sign in to your account' : 'Join FONE BAZAAR today'}
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              {!isLogin && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
                </motion.div>
              )}
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50 mt-2 shadow-lg"
              >
                {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            {/* Demo Button */}
            <motion.button
              onClick={fillDemo}
              whileHover={{ scale: 1.02 }}
              className="w-full py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors mb-6 text-sm"
            >
              {isLogin ? '📝 Fill Demo: Admin Account' : '👤 Fill Demo: New User'}
            </motion.button>

            {/* Toggle */}
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); setEmail(''); setPassword(''); setName(''); }}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
              <Link href="/" className="text-gray-400 hover:text-gray-600 transition text-sm block">
                ← Back to Home
              </Link>
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-center text-indigo-600 text-sm"
          >
            <p className="font-semibold mb-1">Demo Credentials Available</p>
            <p className="text-indigo-400 text-xs">Click the demo button above to auto-fill</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
