'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { useOrders } from '@/contexts/orders-context';
import { useAuth } from '@/contexts/auth-context';
import { ArrowLeft, Package, MapPin, Phone, Mail, Calendar, CreditCard, Wallet, X } from 'lucide-react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { getOrderById, cancelOrder } = useOrders();
  const { isAuthenticated, user } = useAuth();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const order = getOrderById(id);
  
  // Verify order belongs to current user
  const userOrder = order && order.userId === user?.email ? order : null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <PageHero title="Order Details" subtitle="View order information" />
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center py-12 sm:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Please Login</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 font-sans">You need to be logged in to view order details.</p>
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

  if (!order || !userOrder) {
    return (
      <div className="min-h-screen bg-white">
        <PageHero title="Order Details" subtitle="View order information" />
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center py-12 sm:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Order Not Found</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 font-sans">The order you're looking for doesn't exist or doesn't belong to you.</p>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90"
              style={{ backgroundColor: '#009EDD' }}
            >
              Back to Orders
            </Link>
          </div>
        </section>
      </div>
    );
  }

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

  const handleCancelOrder = () => {
    if (userOrder) {
      cancelOrder(userOrder.id);
      setShowCancelConfirm(false);
      router.push('/orders');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Order Details" subtitle={`Order #${userOrder.orderNumber}`} />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-[#009EDD] transition-colors mb-4 sm:mb-6 font-sans"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Orders
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
              {/* Order Status */}
              <AnimatedSection delay={100}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-sans leading-tight">Order Status</h2>
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold font-sans w-fit ${getStatusColor(userOrder.status)}`}>
                      {userOrder.status.charAt(0).toUpperCase() + userOrder.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-sans mb-3 sm:mb-4">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      Ordered on {new Date(userOrder.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {userOrder.status !== 'cancelled' && userOrder.status !== 'delivered' && (
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all font-sans hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </AnimatedSection>

              {/* Order Items */}
              <AnimatedSection delay={200}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Order Items</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {userOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-200 last:border-0 last:pb-0">
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
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#009EDD] transition-colors font-sans mb-1 leading-tight">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-gray-600 font-sans mb-1 sm:mb-2">
                            Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                          </p>
                          <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 font-sans">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Shipping Address */}
              <AnimatedSection delay={300}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans flex items-center gap-2 leading-tight">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    Shipping Address
                  </h2>
                  <div className="text-sm sm:text-base text-gray-700 font-sans space-y-1">
                    <p className="font-semibold">
                      {userOrder.shippingInfo.firstName} {userOrder.shippingInfo.lastName}
                    </p>
                    <p>{userOrder.shippingInfo.address}</p>
                    <p>
                      {userOrder.shippingInfo.city}, {userOrder.shippingInfo.state} - {userOrder.shippingInfo.pincode}
                    </p>
                    <div className="mt-3 space-y-1.5 sm:space-y-2">
                      <p className="flex items-center gap-2">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <a href={`tel:${userOrder.shippingInfo.phone}`} className="hover:text-[#009EDD] transition-colors break-all">
                          {userOrder.shippingInfo.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <a href={`mailto:${userOrder.shippingInfo.email}`} className="hover:text-[#009EDD] transition-colors break-all">
                          {userOrder.shippingInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={400}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg lg:sticky lg:top-8 border border-gray-200">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 font-sans leading-tight">Order Summary</h2>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex justify-between text-sm sm:text-base text-gray-700 font-sans">
                      <span>Subtotal</span>
                      <span>₹{userOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-gray-700 font-sans">
                      <span>Shipping</span>
                      <span>
                        {userOrder.shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${userOrder.shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 sm:pt-3">
                      <div className="flex justify-between text-base sm:text-lg md:text-xl font-bold text-gray-900 font-sans">
                        <span>Total</span>
                        <span>₹{userOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700 font-sans">
                      {userOrder.paymentMethod === 'cod' ? (
                        <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
                      ) : (
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Payment Method</p>
                        <p className="text-xs sm:text-sm">
                          {userOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Cancel Confirmation Popup */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Cancel Order</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 md:mb-6 font-sans leading-relaxed">
              Are you sure you want to cancel order #{userOrder.orderNumber}? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-600 text-white py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:opacity-90"
              >
                Yes, Cancel Order
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all font-sans hover:bg-gray-300"
              >
                No, Keep Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

