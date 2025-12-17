import type { Metadata } from "next";
import HeroSection from "@/components/home/hero-section";
import DiscoverProducts from "@/components/home/discover-products";
import OurCollectionSection from "@/components/home/our-collection-section";
import FeaturesSection from "@/components/home/features-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import ContactSection from "@/components/home/contact-section";
import { features, detailedFeatures, testimonials } from "@/lib/data";
import { categoryProducts } from "@/lib/products";

export const metadata: Metadata = {
  // Browser tab text for the home page
  title: "Softcool",
  description:
    "Discover Softcool’s best-selling orthopedic and cooling pillows, designed in India for healthier sleep, better neck and spine support, and all-night comfort.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Softcool | Premium Orthopedic & Cooling Pillows Online in India",
    description:
      "Explore Softcool’s hero products, best-sellers, and comfort collections featuring doctor-designed, cooling, and neem-infused pillows.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <DiscoverProducts products={categoryProducts} />
      <OurCollectionSection />
      <FeaturesSection features={features} detailedFeatures={detailedFeatures} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </div>
  );
}
