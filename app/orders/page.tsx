'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts } from '@/lib/mockData';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-black text-2xl">Please sign in to view your orders</p>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  const userOrders = orders.filter((o) => o.userId === user.id);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    shipped: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    delivered: 'bg-green-500/20 text-green-300 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Your Orders</h1>
          <p className="text-gray-400 text-lg">Track and manage your purchases</p>
        </motion.div>

        {userOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl mb-8">You haven&apos;t placed any orders yet</p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-black font-bold rounded-lg"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {userOrders.map((order) => (
              <motion.div
                key={order.id}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-colors cursor-pointer"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-bold text-white">Order {order.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>
                        Placed: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                      {order.deliveryDate && (
                        <p>
                          Est. Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Items:</p>
                    <div className="flex gap-2 flex-wrap">
                      {order.items.map((item) => {
                        const product = mockProducts.find((p) => p.id === item.productId);
                        return (
                          <span
                            key={item.productId}
                            className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                          >
                            {product?.name.split(' ')[0]} x{item.quantity}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-400 mb-1">Total</p>
                    <p className="text-3xl font-bold text-white">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
