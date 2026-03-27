'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts } from '@/lib/mockData';
import { Package, ArrowRight } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  processing: 'bg-blue-50 text-blue-600 border-blue-200',
  shipped: 'bg-purple-50 text-purple-600 border-purple-200',
  delivered: 'bg-green-50 text-green-600 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-black text-2xl font-bold">Please sign in to view your orders</p>
          <Link href="/login">
            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900">
              Sign In
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  const userOrders = orders.filter((o) => o.userId === user.id);

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">History</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black">Your Orders</motion.h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {userOrders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Package size={64} className="text-gray-200 mx-auto mb-6" />
            <p className="text-gray-400 text-xl mb-8">You haven&apos;t placed any orders yet</p>
            <Link href="/shop">
              <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 shadow-lg">
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {userOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-black">Order {order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p>Items: {order.items.reduce((s, i) => s + i.quantity, 0)}</p>
                      {order.deliveryDate && <p>Est. Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-2">Items:</p>
                    <div className="flex gap-2 flex-wrap">
                      {order.items.map((item) => {
                        const product = mockProducts.find((p) => p.id === item.productId);
                        return (
                          <span key={item.productId} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                            {product?.name.split(' ')[0]} x{item.quantity}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-3">
                    <p className="text-3xl font-extrabold text-black">${order.total.toFixed(2)}</p>
                    <span className="text-indigo-600 text-sm font-semibold flex items-center gap-1">View <ArrowRight size={14} /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
