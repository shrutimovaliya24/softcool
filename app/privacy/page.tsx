import type { Metadata } from "next";
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { Lock, Database, Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Softcool",
  description:
    "Read Softcool’s privacy policy to learn how we collect, use, and protect your personal data when you browse, shop, and contact us.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Softcool",
    description:
      "Understand how Softcool handles your personal information, including order details, contact information, and marketing preferences.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Privacy Policy" 
        subtitle="How we collect, use, and protect your information"
      />

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <AnimatedSection delay={100}>
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl mb-8 border-l-4 border-[#009EDD]">
              <p className="text-gray-600 font-sans mb-2">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-sans">
                At Softcool, we are committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={200}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#009EDD]/10 rounded-full flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-[#009EDD]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Information We Collect</h2>
                    <p className="text-gray-700 mb-4 font-sans">
                      We may collect information that you provide directly to us, including:
                    </p>
                    <ul className="space-y-2 text-gray-700 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Name and contact information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Email address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Phone number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Shipping address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Payment information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#525A65]/10 rounded-full flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-[#525A65]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">How We Use Your Information</h2>
                    <ul className="space-y-2 text-gray-700 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Process and fulfill your orders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Communicate with you about your orders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Send you marketing communications (with your consent)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Improve our website and services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#009EDD] mt-1">•</span>
                        <span>Comply with legal obligations</span>
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
                    <Shield className="w-6 h-6 text-[#009EDD]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Data Security</h2>
                    <p className="text-gray-700 leading-relaxed font-sans">
                      We implement appropriate technical and organizational measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="bg-gradient-to-br from-[#009EDD] to-[#525A65] p-8 rounded-xl text-white">
                <div className="flex items-start gap-4">
                  <Mail className="w-8 h-8 shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4 font-sans">Contact Us</h2>
                    <p className="mb-4 font-sans">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="space-y-2 font-sans">
                      <p>Email: <a href="mailto:info@softcool.in" className="underline hover:opacity-80">info@softcool.in</a></p>
                      <p>Phone: <a href="tel:+917600018281" className="underline hover:opacity-80">+91 7600018281</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
