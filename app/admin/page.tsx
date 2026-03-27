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

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user || user.role !== 'admin') {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-black text-2xl">Access Denied</p>
          <p className="text-gray-600">You must be an admin to access this page</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Go Home
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = mockProducts.length;
  const totalUsers = mockUsers.length;

  const recentOrders = [...orders].reverse().slice(0, 5);
  const orderStats = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  const menuItems = [
    { title: 'Products', description: 'Manage catalog', href: '/admin/products', Icon: Package },
    { title: 'Orders', description: 'View all orders', href: '/admin/orders', Icon: ClipboardList },
    { title: 'Users', description: 'Manage users', href: '/admin/users', Icon: Users },
    { title: 'Analytics', description: 'View insights', href: '/admin/analytics', Icon: TrendingUp },
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg">Manage your business</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, Icon: DollarSign },
            { label: 'Total Orders', value: totalOrders, Icon: Package },
            { label: 'Products', value: totalProducts, Icon: Tag },
            { label: 'Users', value: totalUsers, Icon: Users },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.Icon size={40} className="text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((menu, idx) => (
                <Link key={idx} href={menu.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(255,255,255,0.1)' }}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all cursor-pointer"
                  >
                    <menu.Icon size={36} className="text-white mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">{menu.title}</h3>
                    <p className="text-gray-400 text-sm">{menu.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Order Status Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>
            <div className="space-y-4">
              {[
                { status: 'Pending', count: orderStats.pending, color: 'bg-yellow-500' },
                { status: 'Processing', count: orderStats.processing, color: 'bg-blue-500' },
                { status: 'Shipped', count: orderStats.shipped, color: 'bg-purple-500' },
                { status: 'Delivered', count: orderStats.delivered, color: 'bg-green-500' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="text-gray-400">{stat.status}</span>
                  </div>
                  <span className="font-bold text-white">{stat.count}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
            <Link href="/admin/orders">
              <span className="text-white hover:text-gray-300 transition">View All →</span>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-400">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400 font-semibold">Order ID</th>
                    <th className="text-left py-3 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-3 text-gray-400 font-semibold">Items</th>
                    <th className="text-left py-3 text-gray-400 font-semibold">Total</th>
                    <th className="text-left py-3 text-gray-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 text-white font-semibold">{order.id}</td>
                      <td className="py-3 text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-gray-400">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </td>
                      <td className="py-3 text-white font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered'
                              ? 'bg-green-500/20 text-green-300'
                              : order.status === 'shipped'
                              ? 'bg-purple-500/20 text-purple-300'
                              : order.status === 'processing'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
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
