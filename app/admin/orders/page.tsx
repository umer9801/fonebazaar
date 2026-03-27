'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const statusColors: Record<string, string> = {
  delivered: 'bg-green-50 text-green-600 border-green-200',
  shipped: 'bg-purple-50 text-purple-600 border-purple-200',
  processing: 'bg-blue-50 text-blue-600 border-blue-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
};

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();

  if (!user || user.role !== 'admin') {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-black text-2xl font-bold">Access Denied</p>
        </div>
      </main>
    );
  }

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-indigo-600 hover:text-indigo-700 transition text-sm font-semibold mb-3 inline-block">← Back to Dashboard</Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black">Order Management</motion.h1>
          <p className="text-gray-400 mt-2">Total Orders: <span className="font-bold text-black">{orders.length}</span></p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-gray-400 text-xl">No orders yet</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Order ID', 'Date', 'Items', 'Total', 'Status', 'Action'].map((h) => (
                      <th key={h} className="text-left py-4 px-6 text-gray-400 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <motion.tr key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
                      className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-black font-semibold">{order.id}</td>
                      <td className="py-4 px-6 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                      <td className="py-4 px-6 text-black font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer bg-transparent ${statusColors[order.status]}`}>
                          {statusOptions.map((s) => (
                            <option key={s} value={s} className="bg-white text-black">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <Link href={`/order/${order.id}`}>
                          <motion.button whileHover={{ scale: 1.05 }}
                            className="px-4 py-1.5 bg-black text-white font-semibold rounded-lg text-xs hover:bg-gray-900 transition-colors">
                            View
                          </motion.button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
