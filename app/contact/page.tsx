'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 space-y-6"
          >
            {[
              {
                Icon: Mail,
                title: 'Email',
                content: 'info@fonebazaar.com',
                desc: 'Send us an email anytime',
              },
              {
                Icon: Phone,
                title: 'Phone',
                content: '+1 (555) 123-4567',
                desc: 'Mon-Fri, 9AM-6PM EST',
              },
            ].map((contact, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ x: 10 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-colors"
              >
                <contact.Icon size={36} className="text-white mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{contact.title}</h3>
                <p className="text-white font-semibold">{contact.content}</p>
                <p className="text-gray-400 text-sm mt-2">{contact.desc}</p>
              </motion.div>
            ))}

            {/* Business Hours */}
            <motion.div
              variants={item}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <span className="font-semibold text-white">Monday-Friday:</span> 9AM - 6PM
                </p>
                <p>
                  <span className="font-semibold text-white">Saturday:</span> 10AM - 4PM
                </p>
                <p>
                  <span className="font-semibold text-white">Sunday:</span> Closed
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <CheckCircle2 size={72} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you soon</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-3">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-6 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-3">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-6 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-3">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-6 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-3">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more..."
                      rows={6}
                      className="w-full px-6 py-3 bg-gray-800 border border-white/20 text-white rounded-lg focus:outline-none focus:border-white/50 placeholder-gray-500 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors"
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
