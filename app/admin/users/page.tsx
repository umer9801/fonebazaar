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
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-black text-2xl font-bold">Access Denied</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-indigo-600 hover:text-indigo-700 transition text-sm font-semibold mb-3 inline-block">← Back to Dashboard</Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black">User Management</motion.h1>
          <p className="text-gray-400 mt-2">Total Users: <span className="font-bold text-black">{mockUsers.length}</span></p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((u, idx) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-lg">👤</div>
                    <h3 className="text-lg font-bold text-black">{u.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{u.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  u.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'
                }`}>
                  {u.role === 'admin' ? '👑 Admin' : 'Customer'}
                </span>
              </div>
              <div className="space-y-1 mb-5 pb-4 border-b border-gray-100 text-sm text-gray-400">
                <p><span className="font-semibold text-gray-600">ID:</span> {u.id}</p>
                <p><span className="font-semibold text-gray-600">Joined:</span> {new Date(u.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 bg-black text-white font-semibold rounded-xl hover:bg-neutral-900 transition-colors text-sm">Edit</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 bg-black text-white font-semibold rounded-xl hover:bg-neutral-900 transition-colors text-sm">Remove</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
