'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Sparkles, Zap, Target, Check } from 'lucide-react';

export default function AboutPage() {
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
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 text-balance">
            About FONE BAZAAR
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Premium custom tech services for creators, entrepreneurs, and enthusiasts
          </p>
        </motion.section>

        {/* Story Section */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={item}>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Founded in 2023, FONE BAZAAR emerged from a simple vision: to make premium custom
              tech services accessible to everyone. What started as a passion project has grown
              into a trusted partner for thousands of customers.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We believe in quality, creativity, and customer satisfaction. Every product that
              leaves our facility reflects our commitment to excellence and innovation.
            </p>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-96 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl flex items-center justify-center text-6xl"
          >
            🚀
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Sparkles,
                title: 'Quality First',
                description: 'We use premium materials and latest technology for every project',
              },
              {
                Icon: Zap,
                title: 'Fast Service',
                description: 'Quick turnaround without compromising on quality',
              },
              {
                Icon: Target,
                title: 'Customer Focus',
                description: 'Your satisfaction is our top priority',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl hover:border-white/30 transition-colors"
              >
                <value.Icon size={48} className="text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom T-Shirts',
                description: 'High-quality cotton tees with your unique design',
                items: ['Premium materials', 'Custom designs', 'Fast printing'],
              },
              {
                title: 'Laser Engraving',
                description: 'Professional precision engraving on any material',
                items: ['Metal', 'Wood', 'Acrylic & more'],
              },
              {
                title: '3D Printing',
                description: 'Turn your ideas into reality with 3D printing',
                items: ['Prototypes', 'Production', 'Custom designs'],
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-gray-400 flex items-center gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-gray-900 to-black border border-white/10 p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FONE BAZAAR for their custom tech needs
          </p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors"
            >
              Start Shopping Now
            </motion.button>
          </Link>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
