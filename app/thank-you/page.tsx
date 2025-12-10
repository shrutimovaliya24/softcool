import Link from 'next/link';
import { CheckCircle, Package, Mail } from 'lucide-react';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Thank You!" 
        subtitle="Your order has been successfully placed"
      />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-scale-in">
                  <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">
                  Order Confirmed!
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 font-sans px-4">
                  Your order has been received. We'll send you a confirmation email shortly.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#009EDD]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 font-sans">Order Processing</h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-sans">We'll start preparing your order right away</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#009EDD]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 font-sans">Email Confirmation</h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-sans">Check your email for order details</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#009EDD' }}
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:border-[#009EDD] hover:text-[#009EDD]"
                >
                  Return to Home
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
