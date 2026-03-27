'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockUsers } from '@/lib/mockData';

export default function AdminUsersPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <main className="bg-black min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white text-2xl">Access Denied</p>
        </div>
      </main>
    );
  }

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
    <main className="bg-black min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/admin" className="text-gray-400 hover:text-white transition mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">User Management</h1>
          <p className="text-gray-400 text-lg mb-8">
            Total Users: <span className="font-bold text-white">{mockUsers.length}</span>
          </p>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockUsers.map((u) => (
            <motion.div
              key={u.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">👤</span>
                    <h3 className="text-lg font-bold text-white">{u.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{u.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.role === 'admin'
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {u.role === 'admin' ? '👑 Admin' : 'Customer'}
                </span>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-white/10 text-sm text-gray-400">
                <p>
                  <span className="font-semibold">ID:</span> {u.id}
                </p>
                <p>
                  <span className="font-semibold">Joined:</span>{' '}
                  {new Date(u.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
