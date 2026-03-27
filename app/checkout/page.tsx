'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/contexts/CartContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts } from '@/lib/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const items = cart.items.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId),
  }));

  const total = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push('/login');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

    // Create order
    addOrder({
      id: orderId,
      userId: user.id,
      items: cart.items,
      total: total * 1.08,
      status: 'processing',
      createdAt: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
    });

    clearCart();
    setIsProcessing(false);
    setOrderPlaced(true);

    setTimeout(() => {
      router.push(`/order/${orderId}`);
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-black text-2xl">Your cart is empty</p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {orderPlaced ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-96"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <CheckCircle2 size={80} className="text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Order Placed!</h2>
            <p className="text-gray-400 mb-8">Redirecting to order tracking...</p>
            <div className="flex gap-4">
              <Link href="/orders">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 bg-white text-black font-semibold rounded-lg"
                >
                  View Orders
                </motion.button>
              </Link>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 border border-white text-white font-semibold rounded-lg"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-bold text-white mb-4">Checkout</h1>
              <p className="text-gray-400 text-lg">Complete your purchase securely</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Shipping Address</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="zip"
                          placeholder="ZIP Code"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                        <input
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Payment Information</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={3}
                          className="w-full px-4 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={!isProcessing ? { scale: 1.05 } : {}}
                    whileTap={!isProcessing ? { scale: 0.95 } : {}}
                    className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Purchase'}
                  </motion.button>
                </form>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl sticky top-24">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-gray-400">
                        <span>
                          {item.product?.name} x {item.quantity}
                        </span>
                        <span>${(item.product?.price || 0) * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping:</span>
                      <span className="text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (8%):</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total:</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
