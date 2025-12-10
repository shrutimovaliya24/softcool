'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  paymentMethod: 'cod' | 'online';
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  userId?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        // Filter orders by current user if logged in
        if (user?.email) {
          setOrders(parsedOrders.filter((order: Order) => order.userId === user.email));
        } else {
          setOrders(parsedOrders);
        }
      } catch (error) {
        console.error('Error parsing stored orders:', error);
        localStorage.removeItem('orders');
      }
    }
  }, [user]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (user?.email) {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      // Update existing orders and add new ones
      const orderMap = new Map<string, Order>();
      
      // Add all existing orders
      allOrders.forEach((order: Order) => {
        orderMap.set(order.id, order);
      });
      
      // Update with current user's orders
      orders.forEach((order) => {
        orderMap.set(order.id, order);
      });
      
      localStorage.setItem('orders', JSON.stringify(Array.from(orderMap.values())));
    }
  }, [orders, user]);

  const generateOrderNumber = () => {
    return `SOFT-${Date.now().toString().slice(-8)}`;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      orderDate: new Date().toISOString(),
      status: 'pending',
      userId: user?.email,
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      // Also save to localStorage immediately
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([newOrder, ...allOrders]));
      return updated;
    });
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    // First check in current orders
    const order = orders.find((order) => order.id === orderId);
    if (order) return order;
    
    // If not found, check in localStorage (for cases where user just logged in)
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return storedOrders.find((order: Order) => order.id === orderId);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        cancelOrder,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}

