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

      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {cartItems.length === 0 ? (
            <AnimatedSection delay={100}>
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-[#FDF55A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-[#5298C1]" />
                </div>
                <h2 className="text-2xl font-bold text-[#5298C1] mb-4 font-sans">Your cart is empty</h2>
                <p className="text-[#0D031A] text-lg mb-8 font-sans">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#FDF55A] text-[#0D031A] rounded-lg font-semibold transition-all font-sans hover:bg-[#5298C1] hover:text-white hover:shadow-lg"
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
                    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover-lift border border-[#5298C1]/20">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start w-full">
                        <div className="relative w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <Link href={`/pillow/${item.id}`}>
                            <h3 className="text-base sm:text-lg font-semibold text-[#0D031A] mb-1.5 sm:mb-2 font-sans hover:text-[#5298C1] transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm sm:text-base text-[#0D031A] mb-3 sm:mb-4 font-sans">
                            ₹{item.price.toLocaleString()} each
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 w-full">
                            <div className="flex items-center gap-3">
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
                            </div>
                            <div className="w-full sm:w-auto text-right sm:text-left">
                              <p className="text-base sm:text-lg font-semibold text-[#0D031A] font-sans">
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
                  <div className="bg-white border border-[#5298C1]/20 rounded-xl p-6 shadow-lg sticky top-8">
                    <h2 className="text-xl font-bold text-[#5298C1] mb-6 font-sans">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-[#0D031A] font-sans">
                        <span>Subtotal</span>
                        <span>₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#0D031A] font-sans">
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
                        <p className="text-sm text-[#0D031A] font-sans">
                          Add ₹{(2000 - getTotalPrice()).toLocaleString()} more for free shipping
                        </p>
                      )}
                      <div className="border-t border-[#5298C1]/20 pt-3">
                        <div className="flex justify-between text-xl font-bold text-[#0D031A] font-sans">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/checkout')}
                      className="block w-full text-center bg-[#FDF55A] text-[#0D031A] py-3 px-6 rounded-lg font-semibold transition-all font-sans hover:bg-[#5298C1] hover:text-white hover:shadow-lg"
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
