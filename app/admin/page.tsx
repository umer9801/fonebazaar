'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts, mockUsers } from '@/lib/mockData';
import { Package, ClipboardList, Users, TrendingUp, DollarSign, Tag } from 'lucide-react';

const cardClass = "bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all";

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user || user.role !== 'admin') {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-black text-2xl font-bold">Access Denied</p>
          <p className="text-gray-400">You must be an admin to access this page</p>
          <Link href="/"><motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900">Go Home</motion.button></Link>
        </div>
      </main>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const orderStats = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };
  const recentOrders = [...orders].reverse().slice(0, 5);
  const menuItems = [
    { title: 'Products', description: 'Manage catalog', href: '/admin/products', Icon: Package },
    { title: 'Orders', description: 'View all orders', href: '/admin/orders', Icon: ClipboardList },
    { title: 'Users', description: 'Manage users', href: '/admin/users', Icon: Users },
    { title: 'Analytics', description: 'View insights', href: '/admin/analytics', Icon: TrendingUp },
  ];

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">Admin</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black">Dashboard</motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, Icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Total Orders', value: orders.length, Icon: Package, color: 'text-cyan-600', bg: 'bg-cyan-50' },
            { label: 'Products', value: mockProducts.length, Icon: Tag, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Users', value: mockUsers.length, Icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }} className={cardClass}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-black">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.Icon size={24} className={stat.color} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((menu, idx) => (
                <Link key={idx} href={menu.href}>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ y: -5 }} className={`${cardClass} cursor-pointer group`}>
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                      <menu.Icon size={24} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-1">{menu.title}</h3>
                    <p className="text-gray-400 text-sm">{menu.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
            <h3 className="text-xl font-bold text-black mb-6">Order Status</h3>
            <div className="space-y-4">
              {[
                { status: 'Pending', count: orderStats.pending, color: 'bg-amber-400' },
                { status: 'Processing', count: orderStats.processing, color: 'bg-blue-500' },
                { status: 'Shipped', count: orderStats.shipped, color: 'bg-purple-500' },
                { status: 'Delivered', count: orderStats.delivered, color: 'bg-green-500' },
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                    <span className="text-gray-500 text-sm">{s.status}</span>
                  </div>
                  <span className="font-bold text-black">{s.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={cardClass}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-black">Recent Orders</h2>
            <Link href="/admin/orders"><span className="text-indigo-600 hover:text-indigo-700 transition text-sm font-semibold">View All →</span></Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-gray-400">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Order ID', 'Date', 'Items', 'Total', 'Status'].map((h) => (
                      <th key={h} className="text-left py-3 text-gray-400 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3 text-black font-semibold">{order.id}</td>
                      <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                      <td className="py-3 text-black font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-200' :
                          order.status === 'shipped' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-amber-50 text-amber-600 border-amber-200'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
