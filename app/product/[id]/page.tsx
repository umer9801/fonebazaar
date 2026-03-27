'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts, categoryLabels } from '@/lib/mockData';
import { useCart } from '@/lib/contexts/CartContext';
import { Star, Plus, Minus } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-black text-2xl">Product not found</p>
        </div>
      </main>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, customization);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-gray-400 mb-8"
        >
          <Link href="/shop" className="hover:text-white transition">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-white transition">
            {categoryLabels[product.category]}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {categoryLabels[product.category]}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-gray-400 text-lg mb-6">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Star size={24} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price and Cart */}
            <div>
              {/* Price */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-5xl font-bold text-white">${product.price}</span>
                <p className="text-gray-400 mt-2">Free shipping on orders over $50</p>
              </motion.div>

              {/* Customization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <label className="block text-white font-semibold mb-3">
                  Customization (Optional)
                </label>
                <textarea
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  placeholder="E.g., Design details, color preferences, special instructions..."
                  className="w-full px-4 py-3 bg-gray-900 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 resize-none"
                  rows={3}
                />
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mb-8"
              >
                <label className="text-white font-semibold">Quantity:</label>
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-white hover:bg-white/10 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-2 text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-white hover:bg-white/10 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Add to Cart */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors mb-4"
              >
                {addedToCart ? '✔ Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Cart
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 pt-20 border-t border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-12">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p, idx) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 overflow-hidden rounded-xl hover:border-white/30 transition-all group cursor-pointer"
                  >
                    <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-white">${p.price}</span>
                        <span className="text-gray-400">★ {p.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </main>
  );
}
