'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts, categoryLabels } from '@/lib/mockData';
import { ServiceType } from '@/lib/types';
import { Star } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | 'all'>(
    (searchParams.get('category') as ServiceType) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const categories: (ServiceType | 'all')[] = ['all', 'tshirt', 'laser', '3d-printing'];

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-black mb-4">Shop Our Services</h1>
          <p className="text-gray-600 text-lg">Premium quality, competitive pricing</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 text-black rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-64 flex-shrink-0"
          >
            {/* Category Filter */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-black mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ x: 5 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : categoryLabels[cat]}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl shadow-md mt-6">
              <h3 className="text-lg font-bold text-black mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-6 font-medium"
            >
              Showing {filteredProducts.length} products
            </motion.div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">No products found</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)' }}
                    className="bg-white border-2 border-gray-200 overflow-hidden rounded-xl hover:border-indigo-300 transition-all group shadow-md"
                  >
                    {/* Image */}
                    <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {categoryLabels[product.category]}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">${product.price}</span>
                        <div className="flex items-center gap-2">
                          <Star size={18} className="text-amber-400 fill-amber-400" />
                          <span className="text-gray-600 text-sm">{product.rating}</span>
                          <span className="text-gray-500 text-xs">({product.reviews})</span>
                        </div>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all"
                        >
                          View Details
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
