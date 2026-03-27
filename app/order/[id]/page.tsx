'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts } from '@/lib/mockData';
import { ClipboardList, Cog, Package, CheckCircle2, ArrowRight } from 'lucide-react';

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
const statusIconMap = { pending: ClipboardList, processing: Cog, shipped: Package, delivered: CheckCircle2 };

export default function OrderDetailPage() {
  const params = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-black text-2xl font-bold">Order not found</p>
        </div>
      </main>
    );
  }

  const items = order.items.map((item) => ({ ...item, product: mockProducts.find((p) => p.id === item.productId) }));
  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/orders" className="text-indigo-600 hover:text-indigo-700 transition text-sm font-semibold mb-4 inline-flex items-center gap-1">
            ← Back to Orders
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-black mt-2">
            Order {order.id}
          </motion.h1>
          <p className="text-gray-400 mt-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Status Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-10 bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-black mb-8">Order Status</h2>
          <div className="flex items-start justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-100 z-0" />
            {statusSteps.map((status, idx) => {
              const IconComponent = statusIconMap[status as keyof typeof statusIconMap];
              const active = idx <= currentStatusIndex;
              return (
                <motion.div key={status} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * idx }}
                  className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${active ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                    <IconComponent size={22} />
                  </div>
                  <span className={`text-xs font-semibold text-center ${active ? 'text-black' : 'text-gray-400'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </motion.div>
              );
            })}
          </div>
          {order.deliveryDate && (
            <p className="text-gray-400 text-sm text-center mt-6">
              Estimated Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-extrabold text-black mb-6">Order Items</h2>
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-5 pb-5 border-b border-gray-100 last:border-0">
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-black">{item.product?.name}</h3>
                    {item.customization && <p className="text-sm text-gray-400 mt-1"><span className="font-semibold">Custom:</span> {item.customization}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
                      <span className="text-lg font-extrabold text-black">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-5">
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-black mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-black mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${(order.total / 1.08).toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-500 font-semibold">Free</span></div>
                <div className="flex justify-between text-gray-500 pb-3 border-b border-gray-100"><span>Tax</span><span>${(order.total - order.total / 1.08).toFixed(2)}</span></div>
                <div className="flex justify-between text-black font-extrabold text-base pt-1"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
              </div>
            </div>
            <Link href="/shop">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-md flex items-center justify-center gap-2">
                Continue Shopping <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
