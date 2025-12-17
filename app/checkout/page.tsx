'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useOrders } from '@/contexts/orders-context';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = getTotalPrice() > 2000 ? 0 : 100;
  const total = getTotalPrice() + shipping;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Create order
    const order = addOrder({
      items: cartItems,
      total,
      subtotal: getTotalPrice(),
      shipping,
      paymentMethod,
      shippingInfo: formData,
    });

    // Clear cart and redirect to thank you page
    clearCart();
    router.push(`/thank-you?orderId=${order.id}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <PageHero title="Checkout" subtitle="Complete your order" />
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center py-12 sm:py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Please Login</h2>
            <p className="text-gray-600 mb-8 font-sans">You need to be logged in to proceed with checkout.</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 text-white rounded-lg font-semibold transition-all font-sans hover:opacity-90"
                style={{ backgroundColor: '#009EDD' }}
              >
                Go to Login
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all font-sans hover:bg-gray-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <PageHero title="Checkout" subtitle="Complete your order" />
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center py-12 sm:py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 font-sans">Please add items to your cart before checkout.</p>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-3 text-white rounded-lg font-semibold transition-all font-sans hover:opacity-90"
              style={{ backgroundColor: '#009EDD' }}
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Checkout" subtitle="Complete your order" />
      
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#009EDD] transition-colors mb-6 font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Shipping Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <AnimatedSection delay={100}>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans resize-none ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 font-sans">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-[#009EDD] transition-all font-sans ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Payment Method */}
              <AnimatedSection delay={200}>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Payment Method</h2>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all font-sans ${
                        paymentMethod === 'cod'
                          ? 'border-[#009EDD] bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Wallet className={`w-6 h-6 ${paymentMethod === 'cod' ? 'text-[#009EDD]' : 'text-gray-400'}`} />
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900 font-sans">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600 font-sans">Pay when you receive your order</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === 'cod'
                          ? 'border-[#009EDD] bg-[#009EDD]'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cod' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('online')}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all font-sans ${
                        paymentMethod === 'online'
                          ? 'border-[#009EDD] bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className={`w-6 h-6 ${paymentMethod === 'online' ? 'text-[#009EDD]' : 'text-gray-400'}`} />
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900 font-sans">Online Payment / Card</h3>
                        <p className="text-sm text-gray-600 font-sans">Pay securely with card or UPI</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === 'online'
                          ? 'border-[#009EDD] bg-[#009EDD]'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'online' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={300}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 shadow-lg lg:sticky lg:top-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Order Summary</h2>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate font-sans">{item.name}</h4>
                          <p className="text-xs text-gray-600 font-sans">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-gray-900 font-sans">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-gray-700 font-sans">
                      <span>Subtotal</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 font-sans">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900 font-sans">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center text-white py-3 px-6 rounded-lg font-semibold transition-all font-sans hover:opacity-90 hover:shadow-lg"
                    style={{ backgroundColor: '#009EDD' }}
                  >
                    {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

