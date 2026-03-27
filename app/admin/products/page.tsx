'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts, categoryLabels } from '@/lib/mockData';

export default function AdminProductsPage() {
  const { user } = useAuth();

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
          className="flex items-center justify-between mb-12"
        >
          <div>
            <Link href="/admin" className="text-gray-400 hover:text-white transition mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-5xl font-bold text-white">Product Management</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Add Product
          </motion.button>
        </motion.div>

        {/* Products Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              whileHover={{ x: 5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 rounded text-xs font-semibold">
                      {categoryLabels[product.category]}
                    </span>
                    <span className="text-yellow-400">★ {product.rating}</span>
                    <span className="text-gray-400 text-xs">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="text-right">
                  <p className="text-3xl font-bold text-white mb-4">${product.price}</p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
