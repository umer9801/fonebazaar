'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const inputClass = "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-black rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all placeholder-gray-400";

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-indigo-50/30 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-3">
            Reach Out
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-black mb-6">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { Icon: Mail, title: 'Email', content: 'info@fonebazaar.com', desc: 'Send us an email anytime', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { Icon: Phone, title: 'Phone', content: '+1 (555) 123-4567', desc: 'Mon–Fri, 9AM–6PM EST', color: 'text-cyan-600', bg: 'bg-cyan-50' },
              { Icon: Clock, title: 'Business Hours', content: 'Mon–Fri: 9AM–6PM', desc: 'Saturday: 10AM–4PM', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 6 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <c.Icon size={22} className={c.color} />
                </div>
                <h3 className="text-lg font-bold text-black mb-1">{c.title}</h3>
                <p className="text-black font-semibold text-sm">{c.content}</p>
                <p className="text-gray-400 text-sm mt-1">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <CheckCircle2 size={72} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you soon</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-black font-semibold mb-2 text-sm">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-black font-semibold mb-2 text-sm">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-black font-semibold mb-2 text-sm">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-black font-semibold mb-2 text-sm">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us more..." rows={6} className={`${inputClass} resize-none`} />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
