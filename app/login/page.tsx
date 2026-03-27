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

  // Demo credentials
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

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-2xl">
            {/* Header */}
            <motion.div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-400">
                {isLogin ? "Sign in to your account" : "Join FONE BAZAAR today"}
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {/* Name Field (Register Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                  />
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: !isLogin ? 0.1 : 0 }}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: !isLogin ? 0.2 : 0.1 }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                transition={{ delay: !isLogin ? 0.3 : 0.2 }}
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 mt-6"
              >
                {isLoading
                  ? 'Processing...'
                  : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
              </motion.button>
            </form>

            {/* Demo Button */}
            <motion.button
              onClick={fillDemo}
              whileHover={{ scale: 1.02 }}
              className="w-full py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors mb-6"
            >
              {isLogin ? '📝 Demo: Admin Account' : '👤 Demo: New User'}
            </motion.button>

            {/* Toggle Mode */}
            <div className="text-center space-y-4">
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  className="text-white font-semibold hover:text-gray-300 transition"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>

              <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-center text-blue-300 text-sm"
          >
            <p className="mb-2">Demo Credentials Available</p>
            <p className="text-xs text-blue-400">Click "Demo" button to auto-fill test account</p>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
