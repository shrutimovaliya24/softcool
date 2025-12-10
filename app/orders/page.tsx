'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { useOrders } from '@/contexts/orders-context';
import { useAuth } from '@/contexts/auth-context';
import { Package, Eye, X, Calendar } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { orders, cancelOrder } = useOrders();
  const { isAuthenticated } = useAuth();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <PageHero title="My Orders" subtitle="View your order history" />
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center py-12 sm:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Please Login</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 font-sans">You need to be logged in to view your orders.</p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90"
              style={{ backgroundColor: '#009EDD' }}
            >
              Go to Login
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setCancellingOrderId(orderId);
      cancelOrder(orderId);
      setTimeout(() => setCancellingOrderId(null), 1000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="My Orders" subtitle="View your order history" />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {orders.length === 0 ? (
            <AnimatedSection delay={100}>
              <div className="text-center py-12 sm:py-16 md:py-20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-gray-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">No orders yet</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 font-sans px-4">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#009EDD' }}
                >
                  Start Shopping
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {orders.map((order, index) => (
                <AnimatedSection key={order.id} delay={index * 100}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 md:p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 font-sans">
                            Order #{order.orderNumber}
                          </h3>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold font-sans ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-sans">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>
                            {new Date(order.orderDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 font-sans">
                          ₹{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 sm:gap-4">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link href={`/pillow/${item.id}`}>
                              <h4 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#009EDD] transition-colors font-sans leading-tight mb-1">
                                {item.name}
                              </h4>
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-600 font-sans">
                              Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 font-sans">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="text-xs sm:text-sm text-gray-600 font-sans space-y-1">
                        <p>
                          <strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                        <p>
                          <strong>Shipping to:</strong> {order.shippingInfo.city}, {order.shippingInfo.state}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => router.push(`/orders/${order.id}`)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#009EDD] text-white rounded-lg font-semibold text-xs sm:text-sm transition-all font-sans hover:opacity-90 flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          View Details
                        </button>
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={cancellingOrderId === order.id}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all font-sans hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

