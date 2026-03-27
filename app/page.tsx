'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { heroImages, mockProducts } from '@/lib/mockData';
import { Zap, Sparkles, Target, Star, ArrowRight, CheckCircle } from 'lucide-react';

const ROTATION_INTERVAL = 5000;

const services = [
  {
    title: '3D Printing',
    description: 'Bring your ideas to life with precision 3D printing in multiple materials',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=1000&fit=crop',
    href: '/shop?category=3d-printing',
    color: 'from-violet-600/80 to-indigo-900/60',
  },
  {
    title: 'Laser Engraving',
    description: 'Precision engraving on wood, metal, leather and acrylic',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=1000&fit=crop',
    href: '/shop?category=laser',
    color: 'from-amber-600/80 to-orange-900/60',
  },
  {
    title: 'T-Shirts',
    description: 'Premium custom printed tees for every style and occasion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    href: '/shop?category=tshirt',
    color: 'from-cyan-600/80 to-blue-900/60',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '50K+', label: 'Orders Completed' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '3-5', label: 'Days Turnaround' },
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = mockProducts.slice(0, 6);

  return (
    <main className="bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${heroImages[currentHeroIndex]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest uppercase text-indigo-300 border border-indigo-400/40 rounded-full bg-indigo-500/10 backdrop-blur-sm"
          >
            Premium Custom Services
          </motion.span>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
            Create Something
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Custom t-shirts, laser engraving, and 3D printing — all under one roof
          </motion.p>
          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg flex items-center gap-2"
              >
                Shop Now <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/60 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Indicators */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentHeroIndex ? 'w-10 bg-indigo-400' : 'w-3 bg-white/40'
              }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-cyan-500 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-white/80 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Explore Our Services ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black">Explore Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{ height: '480px' }}
            >
              {/* Background image */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.h3
                  className="text-3xl font-extrabold text-white mb-3 drop-shadow-lg"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileInView={{ y: 0, opacity: 1 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {service.description}
                </p>
                <Link href={service.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-fit px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-gradient-to-br from-gray-50 to-indigo-50/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">Our Edge</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">Why Choose Us?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Premium quality with fast turnaround — every single time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Zap,
                title: 'Fast Turnaround',
                desc: 'Get your orders ready in 3-5 business days with express options available',
                color: 'text-amber-500',
                bg: 'bg-amber-50',
              },
              {
                Icon: Sparkles,
                title: 'Premium Quality',
                desc: 'Professional-grade materials and finishes that stand the test of time',
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
              },
              {
                Icon: Target,
                title: 'Custom Design',
                desc: 'Unlimited design possibilities — bring your vision, we make it real',
                color: 'text-cyan-600',
                bg: 'bg-cyan-50',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.Icon size={28} className={feature.color} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle size={16} /> Guaranteed
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-2">Handpicked</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black">Featured Products</h2>
          </div>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
            >
              View All <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="relative w-full h-60 overflow-hidden bg-gray-100">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-black mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <Link href={`/product/${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-500" />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center z-10"
        >
          <p className="text-indigo-200 font-semibold tracking-widest uppercase text-sm mb-4">Get Started Today</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Start your custom project today and bring your ideas to life with our expert team
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-indigo-700 font-extrabold text-lg rounded-xl shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white/60 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
