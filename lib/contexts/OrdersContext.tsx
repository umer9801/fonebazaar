'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { OrdersContextType, Order, OrderStatus } from '../types';

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('fonebazaar_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('fonebazaar_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
}
