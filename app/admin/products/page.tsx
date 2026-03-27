'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts, categoryLabels } from '@/lib/mockData';
import { Star } from 'lucide-react';

export default function AdminProductsPage() {
  const { user } = useAuth();

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

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between">
          <div>
            <Link href="/admin" className="text-indigo-600 hover:text-indigo-700 transition text-sm font-semibold mb-3 inline-block">← Back to Dashboard</Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black">Product Management</motion.h1>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-md">
            + Add Product
          </motion.button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
        {mockProducts.map((product, idx) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
            whileHover={{ x: 4 }}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">{categoryLabels[product.category]}</span>
                  <span className="flex items-center gap-1 text-amber-500 text-sm font-semibold"><Star size={13} className="fill-amber-400" />{product.rating}</span>
                  <span className="text-gray-400 text-xs">({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-black mb-4">${product.price}</p>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-black text-white font-semibold rounded-xl hover:bg-neutral-900 transition-colors text-sm">Edit</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-black text-white font-semibold rounded-xl hover:bg-neutral-900 transition-colors text-sm">Delete</motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
