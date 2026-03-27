'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockProducts, categoryLabels } from '@/lib/mockData';
import { useCart } from '@/lib/contexts/CartContext';
import { Star, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

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
          <p className="text-black text-2xl font-bold">Product not found</p>
        </div>
      </main>
    );
  }

  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, customization);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-gray-400 text-sm mb-10">
          <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-indigo-600 transition">{categoryLabels[product.category]}</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-full aspect-square bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {categoryLabels[product.category]}
              </span>
              <h1 className="text-4xl font-extrabold text-black mb-4">{product.name}</h1>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">{product.description}</p>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-amber-400 fill-amber-400" />
                  <span className="text-black font-bold">{product.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-black">${product.price}</span>
                <p className="text-gray-400 text-sm mt-2">Free shipping on orders over $50</p>
              </div>

              <div className="mb-6">
                <label className="block text-black font-semibold mb-2 text-sm">Customization (Optional)</label>
                <textarea value={customization} onChange={(e) => setCustomization(e.target.value)}
                  placeholder="Design details, color preferences, special instructions..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none text-sm"
                  rows={3} />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <label className="text-black font-semibold text-sm">Quantity:</label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-black hover:bg-gray-100 transition"><Minus size={16} /></button>
                  <span className="px-6 py-2 text-black font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-black hover:bg-gray-100 transition"><Plus size={16} /></button>
                </div>
              </div>

              <motion.button onClick={handleAddToCart} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-colors mb-3 shadow-lg flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                {addedToCart ? '✔ Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <Link href="/cart">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm">
                  View Cart
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-extrabold text-black">Related Products</h2>
              <Link href={`/shop?category=${product.category}`}>
                <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={14} /></span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p, idx) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-black mb-2">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-black">${p.price}</span>
                        <span className="text-amber-400 text-sm font-semibold">★ {p.rating}</span>
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
