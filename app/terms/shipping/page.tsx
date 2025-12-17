import type { Metadata } from "next";
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { Truck, Package, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | Softcool",
  description:
    "Learn about Softcool’s shipping timelines, free-shipping thresholds, and 30-day return policy for pillows and comfort products across India.",
  alternates: {
    canonical: "/terms/shipping",
  },
  openGraph: {
    title: "Shipping & Returns Policy | Softcool",
    description:
      "View details on Softcool shipping options, delivery times, return conditions, and how to request a return or exchange.",
    url: "/terms/shipping",
  },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Shipping & Returns" 
        subtitle="Fast, reliable shipping and hassle-free returns"
      />

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Shipping Information */}
          <AnimatedSection delay={100}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 font-sans">
                  Shipping Information
                </h2>
                <div className="w-24 h-1 bg-[#009EDD] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover-lift">
                  <div className="w-14 h-14 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="w-7 h-7 text-[#009EDD]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-sans">Standard Shipping</h3>
                  <p className="text-gray-700 font-sans">5-7 business days</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover-lift">
                  <div className="w-14 h-14 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-7 h-7 text-[#009EDD]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-sans">Express Shipping</h3>
                  <p className="text-gray-700 font-sans">2-3 business days</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover-lift">
                  <div className="w-14 h-14 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="w-7 h-7 text-[#009EDD]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-sans">Free Shipping</h3>
                  <p className="text-gray-700 font-sans">On orders over ₹2000</p>
                </div>
              </div>

              <div className="bg-white border-l-4 border-[#009EDD] p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-sans">Processing Time</h3>
                <p className="text-gray-700 font-sans">
                  Orders are typically processed within 1-2 business days. You will receive a tracking 
                  number once your order has been shipped.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Returns & Exchanges */}
          <AnimatedSection delay={200}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 font-sans">
                  Returns & Exchanges
                </h2>
                <div className="w-24 h-1 bg-[#009EDD] mx-auto rounded-full"></div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                    <RefreshCw className="w-7 h-7 text-[#009EDD]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Return Policy</h3>
                    <ul className="space-y-3 text-gray-700 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>30-day return policy from the date of delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Items must be in original condition with tags attached</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Return shipping costs are the responsibility of the customer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Refunds will be processed within 5-7 business days after we receive the returned item</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-[#525A65] p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-sans">How to Return</h3>
                <ol className="space-y-3 text-gray-700 font-sans list-decimal list-inside">
                  <li>Contact us at info@softcool.in or +91 7600018281</li>
                  <li>Provide your order number and reason for return</li>
                  <li>We will provide you with return instructions</li>
                  <li>Package the item securely and ship it back</li>
                </ol>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection delay={300}>
            <div className="bg-gradient-to-br from-[#009EDD] to-[#525A65] p-8 rounded-xl text-white text-center">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 font-sans">Need Help?</h3>
              <p className="mb-6 font-sans">
                If you have any questions about shipping or returns, please contact us:
              </p>
              <div className="space-y-2 font-sans">
                <p>Email: <a href="mailto:info@softcool.in" className="underline hover:opacity-80">info@softcool.in</a></p>
                <p>Phone: <a href="tel:+917600018281" className="underline hover:opacity-80">+91 7600018281</a></p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
