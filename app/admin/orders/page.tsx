'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();

  if (!user || user.role !== 'admin') {
    return (
      <main className="bg-black min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white text-2xl">Access Denied</p>
        </div>
      </main>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/admin" className="text-gray-400 hover:text-white transition mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Order Management</h1>
          <p className="text-gray-400 text-lg mb-8">
            Total Orders: <span className="font-bold text-white">{orders.length}</span>
          </p>
        </motion.div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">No orders yet</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="overflow-x-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black">
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Order ID</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Items</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Total</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    variants={item}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-4 px-6 text-white font-semibold">{order.id}</td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </td>
                    <td className="py-4 px-6 text-white font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as any)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-transparent border cursor-pointer transition-colors ${
                          order.status === 'delivered'
                            ? 'border-green-500/50 text-green-300 hover:bg-green-500/20'
                            : order.status === 'shipped'
                            ? 'border-purple-500/50 text-purple-300 hover:bg-purple-500/20'
                            : order.status === 'processing'
                            ? 'border-blue-500/50 text-blue-300 hover:bg-blue-500/20'
                            : order.status === 'cancelled'
                            ? 'border-red-500/50 text-red-300 hover:bg-red-500/20'
                            : 'border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20'
                        }`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="bg-gray-900">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/order/${order.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-1 bg-white/10 text-white font-semibold rounded text-xs hover:bg-white/20 transition-colors"
                        >
                          View
                        </motion.button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
