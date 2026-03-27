'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Sparkles, Zap, Target, Check, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-indigo-50/30 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-3"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-black mb-6"
          >
            About FONE BAZAAR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Premium custom tech services for creators, entrepreneurs, and enthusiasts
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-3">Who We Are</p>
            <h2 className="text-4xl font-extrabold text-black mb-6">Our Story</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-4">
              Founded in 2023, FONE BAZAAR emerged from a simple vision: to make premium custom
              tech services accessible to everyone. What started as a passion project has grown
              into a trusted partner for thousands of customers.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              We believe in quality, creativity, and customer satisfaction. Every product that
              leaves our facility reflects our commitment to excellence and innovation.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full h-96 bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-8xl shadow-sm"
          >
            🚀
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-3">What Drives Us</p>
            <h2 className="text-4xl font-extrabold text-black">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { Icon: Sparkles, title: 'Quality First', desc: 'We use premium materials and latest technology for every project', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { Icon: Zap, title: 'Fast Service', desc: 'Quick turnaround without compromising on quality', color: 'text-amber-500', bg: 'bg-amber-50' },
              { Icon: Target, title: 'Customer Focus', desc: 'Your satisfaction is our top priority, always', color: 'text-cyan-600', bg: 'bg-cyan-50' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${value.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.Icon size={28} className={value.color} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-3">What We Do</p>
            <h2 className="text-4xl font-extrabold text-black">What We Offer</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Custom T-Shirts', desc: 'High-quality cotton tees with your unique design', items: ['Premium materials', 'Custom designs', 'Fast printing'] },
              { title: 'Laser Engraving', desc: 'Professional precision engraving on any material', items: ['Metal', 'Wood', 'Acrylic & more'] },
              { title: '3D Printing', desc: 'Turn your ideas into reality with 3D printing', items: ['Prototypes', 'Production', 'Custom designs'] },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-gray-500 flex items-center gap-2">
                      <Check size={16} className="text-indigo-600 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative text-center bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-500 p-16 rounded-3xl overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust FONE BAZAAR for their custom needs
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-colors shadow-xl flex items-center gap-2 mx-auto"
              >
                Start Shopping <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
