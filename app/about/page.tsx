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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-silver/10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-silver/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent font-bold text-sm uppercase tracking-widest border border-gold/30 rounded-full shadow-lg">
              Our Story
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            About <span className="bg-gradient-to-r from-gold via-silver to-gold bg-clip-text text-transparent">FONE BAZAAR</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Premium custom tech services for creators, entrepreneurs, and visionaries who demand excellence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-silver rounded-full" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold/20 to-silver/20 text-gold font-bold text-sm uppercase tracking-widest border border-gold/30 rounded-full mb-6">
                Who We Are
              </span>
              <h2 className="text-5xl font-black text-black mb-8 leading-tight">Our Story</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-xl leading-relaxed"
            >
              Founded in 2023, FONE BAZAAR emerged from a simple vision: to make premium custom
              tech services accessible to everyone. What started as a passion project has grown
              into a trusted partner for thousands of customers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 text-xl leading-relaxed"
            >
              We believe in quality, creativity, and customer satisfaction. Every product that
              leaves our facility reflects our commitment to excellence and innovation.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-silver/20 rounded-3xl blur-xl" />
            <div className="relative w-full h-96 bg-gradient-to-br from-black via-gray-900 to-black border border-gold/30 rounded-3xl flex items-center justify-center text-9xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-silver/10" />
              <span className="relative z-10 animate-premium-float">🚀</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-gold/20 to-silver/20 text-gold font-bold text-sm uppercase tracking-widest border border-gold/30 rounded-full mb-6">
              What Drives Us
            </span>
            <h2 className="text-5xl font-black text-black mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-silver rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { Icon: Sparkles, title: 'Quality First', desc: 'We use premium materials and latest technology for every project', color: 'text-gold', bg: 'bg-gradient-to-br from-gold/10 to-gold/5', border: 'border-gold/30' },
              { Icon: Zap, title: 'Fast Service', desc: 'Quick turnaround without compromising on quality', color: 'text-silver', bg: 'bg-gradient-to-br from-silver/10 to-silver/5', border: 'border-silver/30' },
              { Icon: Target, title: 'Customer Focus', desc: 'Your satisfaction is our top priority, always', color: 'text-gold', bg: 'bg-gradient-to-br from-gold/10 to-gold/5', border: 'border-gold/30' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`bg-white ${value.bg} border ${value.border} p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                  <value.Icon size={32} className={value.color} />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gold transition-colors">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-gold/20 to-silver/20 text-gold font-bold text-sm uppercase tracking-widest border border-gold/30 rounded-full mb-6">
              What We Do
            </span>
            <h2 className="text-5xl font-black text-black mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-silver rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Custom T-Shirts', desc: 'High-quality cotton tees with your unique design', items: ['Premium materials', 'Custom designs', 'Fast printing'], icon: '👕' },
              { title: 'Laser Engraving', desc: 'Professional precision engraving on any material', items: ['Metal', 'Wood', 'Acrylic & more'], icon: '⚡' },
              { title: '3D Printing', desc: 'Turn your ideas into reality with 3D printing', items: ['Prototypes', 'Production', 'Custom designs'], icon: '🖨️' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-white bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-silver/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-silver/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg text-4xl">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.desc}</p>
                </div>
                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-center gap-3 text-lg">
                      <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                      {item}
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative text-center bg-gradient-to-br from-black via-gray-900 to-black p-20 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-silver/10" />
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-gold/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-silver/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white mb-6"
            >
              Ready to Get <span className="bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">Started?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of satisfied customers who trust FONE BAZAAR for their custom needs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-gold to-silver text-black font-black text-xl rounded-2xl shadow-2xl hover:shadow-gold transition-all flex items-center gap-3 mx-auto border-2 border-gold"
                >
                  Start Shopping <ArrowRight size={24} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
