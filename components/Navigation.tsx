'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCart } from '@/lib/contexts/CartContext';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart.items.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold tracking-tight text-black transition-colors"
            >
              FONE BAZAAR
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-black transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="font-medium text-black transition-colors hover:text-black"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-xl bg-black text-white transition-colors hover:bg-gray-800"
              >
                <ShoppingCart size={22} />
              </motion.button>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-medium text-black">
                  {user.name}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={logout}
                  className="px-4 py-2 bg-black text-white font-semibold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 bg-black text-white font-semibold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white rounded-2xl shadow-xl mb-4 border border-gray-100"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-100 rounded-xl font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-100 rounded-xl font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <div className="pt-2 border-t border-gray-100">
                  {user ? (
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full px-4 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
