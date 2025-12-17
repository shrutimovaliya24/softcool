import type { Metadata } from "next";
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { FileText, Scale, CreditCard, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Softcool",
  description:
    "Review Softcool’s terms and conditions, including product usage, pricing, payments, and intellectual property policies for our pillow and comfort products.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Softcool",
    description:
      "Understand the terms that govern using Softcool’s website, placing orders, making payments, and accessing our services.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Terms & Conditions" 
        subtitle="Please read these terms carefully before using our website"
      />

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <AnimatedSection delay={100}>
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl mb-8 border-l-4 border-[#009EDD]">
              <p className="text-gray-600 font-sans mb-2">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-sans">
                Please read these Terms and Conditions carefully before using our website and purchasing 
                our products.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={200}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-[#009EDD]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Agreement to Terms</h2>
                    <p className="text-gray-700 leading-relaxed font-sans">
                      By accessing or using our website, you agree to be bound by these Terms and Conditions. 
                      If you disagree with any part of these terms, you may not access the service.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#525A65]/10 rounded-full flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-[#525A65]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Products and Pricing</h2>
                    <ul className="space-y-2 text-gray-700 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>All product descriptions and images are for illustrative purposes only</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>We reserve the right to modify prices at any time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Prices are in Indian Rupees (INR) unless otherwise stated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>We reserve the right to limit quantities or refuse orders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-[#009EDD]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Orders and Payment</h2>
                    <ul className="space-y-2 text-gray-700 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>All orders are subject to product availability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>We reserve the right to cancel any order at any time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Payment must be received before order processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>We accept various payment methods as displayed on our website</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#525A65]/10 rounded-full flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-[#525A65]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed font-sans">
                      All content on this website, including text, graphics, logos, images, and software, 
                      is the property of Softcool or its content suppliers and is protected by copyright 
                      and other intellectual property laws.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="bg-gradient-to-br from-[#009EDD] to-[#525A65] p-8 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-4 font-sans">Contact Us</h2>
                <p className="mb-4 font-sans">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2 font-sans">
                  <p>Email: <a href="mailto:info@softcool.in" className="underline hover:opacity-80">info@softcool.in</a></p>
                  <p>Phone: <a href="tel:+917600018281" className="underline hover:opacity-80">+91 7600018281</a></p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
