'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/contexts/CartContext';
import { mockProducts } from '@/lib/mockData';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const items = cart.items.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId),
  }));

  const total = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-black mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your items before checkout</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl mb-8">Your cart is empty</p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    variants={itemVariant}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl flex gap-6 hover:border-white/30 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="text-lg font-bold text-white hover:text-gray-300 transition">
                          {item.product?.name}
                        </h3>
                      </Link>
                      {item.customization && (
                        <p className="text-sm text-gray-400 mt-2">
                          <span className="font-semibold">Custom:</span> {item.customization}
                        </p>
                      )}
                      <p className="text-2xl font-bold text-white mt-3">
                        ${item.product?.price}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-400 hover:text-red-300 transition text-sm font-semibold"
                      >
                        Remove
                      </motion.button>
                      <div className="flex items-center border border-white/20 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 text-white hover:bg-white/10 transition"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 text-white hover:bg-white/10 transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-bold text-white">
                        ${(item.product?.price || 0) * item.quantity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <Link href="/shop">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  ← Continue Shopping
                </motion.button>
              </Link>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 h-fit"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping:</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-white text-xl font-bold mb-8">
                  <span>Total:</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <p className="text-center text-gray-400 text-xs mt-4">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
