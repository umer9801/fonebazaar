'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { mockProducts } from '@/lib/mockData';
import { ClipboardList, Cog, Package, CheckCircle2 } from 'lucide-react';

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderDetailPage() {
  const params = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-black text-2xl">Order not found</p>
        </div>
      </main>
    );
  }

  const items = order.items.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId),
  }));

  const currentStatusIndex = statusSteps.indexOf(order.status);

  const statusIconMap = {
    pending: ClipboardList,
    processing: Cog,
    shipped: Package,
    delivered: CheckCircle2,
  };

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/orders" className="text-gray-400 hover:text-white transition mb-4 inline-block">
            ← Back to Orders
          </Link>
          <h1 className="text-5xl font-bold text-white mb-2">Order {order.id}</h1>
          <p className="text-gray-400">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
        >
          <h2 className="text-xl font-bold text-white mb-6">Order Status</h2>
          <div className="flex items-center justify-between mb-8">
            {statusSteps.map((status, idx) => (
              <motion.div key={status} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    idx <= currentStatusIndex
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {(() => {
                    const IconComponent = statusIconMap[status as keyof typeof statusIconMap];
                    return <IconComponent size={24} />;
                  })()}
                </motion.div>
                <span
                  className={`text-sm font-semibold ${
                    idx <= currentStatusIndex ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                {idx < statusSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: idx < currentStatusIndex ? 1 : 0.3 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 h-1 bg-gradient-to-r from-white to-gray-800 mt-2"
                    style={{ origin: 'left' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          {order.deliveryDate && (
            <p className="text-gray-400 text-center">
              Estimated Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-6 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{item.product?.name}</h3>
                      {item.customization && (
                        <p className="text-sm text-gray-400 mt-2">
                          <span className="font-semibold">Custom:</span> {item.customization}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-400">Qty: {item.quantity}</span>
                        <span className="text-xl font-bold text-white">
                          ${(item.product?.price || 0) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Shipping & Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Shipping Address */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl">
              <h3 className="font-bold text-white mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-xl">
              <h3 className="font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${(order.total / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-400 pb-3 border-b border-white/10">
                  <span>Tax:</span>
                  <span>${(order.total - order.total / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
