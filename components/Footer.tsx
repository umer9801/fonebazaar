'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail, Phone, Clock } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-gray-950 text-gray-400 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div variants={item} className="space-y-4 md:col-span-1">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              FONE BAZAAR
            </h3>
            <p className="text-sm leading-relaxed">
              Premium custom services for tech enthusiasts. Quality you can feel, speed you can count on.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.15, color: '#818cf8' }}
                  className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={item}>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'T-Shirts', href: '/shop?category=tshirt' },
                { label: 'Laser Engraving', href: '/shop?category=laser' },
                { label: '3D Printing', href: '/shop?category=3d-printing' },
                { label: 'Custom Orders', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-indigo-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={item}>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Return Policy', href: '#' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-indigo-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-indigo-400 shrink-0" />
                info@fonebazaar.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-indigo-400 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-indigo-400 shrink-0" />
                Mon–Fri, 9AM–6PM EST
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={item}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-600">
            © 2025 FONE BAZAAR. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Crafted with care for creators everywhere
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
