'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts } from '@/lib/mockData';
import { DollarSign, Package, TrendingUp, ShoppingCart } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  const { orders } = useOrders();

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

  // Calculate analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((s, i) => s + i.quantity, 0), 0);

  // Top products
  const productSales: Record<string, number> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, qty]) => ({
      product: mockProducts.find((p) => p.id === id),
      quantity: qty,
    }));

  // Sales by category
  const categorySales: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      if (product) {
        if (!categorySales[product.category]) {
          categorySales[product.category] = { count: 0, revenue: 0 };
        }
        categorySales[product.category].count += item.quantity;
        categorySales[product.category].revenue += (product.price * item.quantity);
      }
    });
  });

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
        >
          <Link href="/admin" className="text-gray-400 hover:text-white transition mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Analytics & Insights</h1>
          <p className="text-gray-400 text-lg">Detailed business metrics</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12"
        >
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, Icon: DollarSign },
            { label: 'Total Orders', value: orders.length, Icon: Package },
            { label: 'Average Order', value: `$${averageOrderValue.toFixed(2)}`, Icon: TrendingUp },
            { label: 'Items Sold', value: totalItems, Icon: ShoppingCart },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
                <metric.Icon size={40} className="text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Top Selling Products</h2>
            {topProducts.length === 0 ? (
              <p className="text-gray-400">No sales data yet</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((item, idx) => (
                  <motion.div
                    key={item.product?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="text-2xl font-bold text-gray-400">{idx + 1}.</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{item.product?.name}</p>
                      <p className="text-gray-400 text-sm">
                        {item.quantity} units sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        ${(item.product?.price || 0) * item.quantity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Sales by Category */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Sales by Category</h2>
            {Object.entries(categorySales).length === 0 ? (
              <p className="text-gray-400">No sales data yet</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(categorySales).map(([category, data], idx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold capitalize">{category}</span>
                      <span className="text-gray-400 text-sm">{data.count} items</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (data.revenue /
                              Math.max(
                                ...Object.values(categorySales).map((d) => d.revenue)
                              )) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-white to-gray-500"
                      />
                    </div>
                    <p className="text-gray-400 text-sm mt-1">${data.revenue.toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Order Status Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Order Status Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: 'Pending', count: orders.filter((o) => o.status === 'pending').length, color: 'bg-yellow-500' },
              { status: 'Processing', count: orders.filter((o) => o.status === 'processing').length, color: 'bg-blue-500' },
              { status: 'Shipped', count: orders.filter((o) => o.status === 'shipped').length, color: 'bg-purple-500' },
              { status: 'Delivered', count: orders.filter((o) => o.status === 'delivered').length, color: 'bg-green-500' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.status}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${stat.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">{stat.count}</span>
                </div>
                <p className="text-white font-semibold">{stat.status}</p>
                <p className="text-gray-400 text-sm">
                  {orders.length > 0
                    ? `${((stat.count / orders.length) * 100).toFixed(1)}%`
                    : '0%'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
