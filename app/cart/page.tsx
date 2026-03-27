'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/contexts/CartContext';
import { mockProducts } from '@/lib/mockData';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const items = cart.items.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId),
  }));

  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">
            Review
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold text-black">
            Shopping Cart
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <ShoppingCart size={64} className="text-gray-200 mx-auto mb-6" />
            <p className="text-gray-400 text-xl mb-8">Your cart is empty</p>
            <Link href="/shop">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-lg">
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-6"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${item.productId}`}>
                      <h3 className="text-lg font-bold text-black hover:text-indigo-600 transition">{item.product?.name}</h3>
                    </Link>
                    {item.customization && (
                      <p className="text-sm text-gray-400 mt-1"><span className="font-semibold">Custom:</span> {item.customization}</p>
                    )}
                    <p className="text-2xl font-extrabold text-black mt-2">${item.product?.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => removeFromCart(item.productId)}
                      className="text-red-400 hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </motion.button>
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1.5 text-black hover:bg-gray-100 transition font-bold">−</button>
                      <span className="px-4 py-1.5 text-black font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1.5 text-black hover:bg-gray-100 transition font-bold">+</button>
                    </div>
                    <p className="text-lg font-bold text-black">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}

              <Link href="/shop">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm">
                  ← Continue Shopping
                </motion.button>
              </Link>
            </div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm sticky top-24">
                <h2 className="text-2xl font-extrabold text-black mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-500 font-semibold">Free</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                </div>
                <div className="flex justify-between text-black text-xl font-extrabold mb-8">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2">
                    Checkout <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <p className="text-center text-gray-400 text-xs mt-4">🔒 Secure checkout with SSL encryption</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
