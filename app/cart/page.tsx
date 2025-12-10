'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  
  const shipping = getTotalPrice() > 2000 ? 0 : 100;
  const total = getTotalPrice() + shipping;

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Shopping Cart" 
        subtitle="Review your items and proceed to checkout"
      />

      <section className="p-8 bg-white">
        <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          {cartItems.length === 0 ? (
            <AnimatedSection delay={100}>
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Your cart is empty</h2>
                <p className="text-gray-600 text-lg mb-8 font-sans">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-8 py-3 text-white rounded-lg font-semibold transition-all font-sans hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#009EDD' }}
                >
                  Continue Shopping
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <AnimatedSection key={`${item.id}-${index}`} delay={index * 100}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover-lift border border-gray-200">
                      <div className="flex gap-6">
                        <div className="relative w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/pillow/${item.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans hover:text-[#009EDD] transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-4 font-sans">
                            ₹{item.price.toLocaleString()} each
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 font-sans">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <div className="ml-auto">
                              <p className="text-lg font-semibold text-gray-900 font-sans">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <AnimatedSection delay={300}>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg sticky top-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Order Summary</h2>
                    <div className="space-y-3 mb-6">
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
                      {getTotalPrice() < 2000 && (
                        <p className="text-sm text-gray-500 font-sans">
                          Add ₹{(2000 - getTotalPrice()).toLocaleString()} more for free shipping
                        </p>
                      )}
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between text-xl font-bold text-gray-900 font-sans">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/checkout')}
                      className="block w-full text-center text-white py-3 px-6 rounded-lg font-semibold transition-all font-sans hover:opacity-90 hover:shadow-lg"
                      style={{ backgroundColor: '#009EDD' }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
