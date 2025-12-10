import HeroSection from "@/components/home/hero-section";
import DiscoverProducts from "@/components/home/discover-products";
import CategoryProductsSection from "@/components/home/category-products-section";
import FeaturesSection from "@/components/home/features-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import ContactSection from "@/components/home/contact-section";
import { products, features, detailedFeatures, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <DiscoverProducts products={products} />
      <CategoryProductsSection />
      <FeaturesSection features={features} detailedFeatures={detailedFeatures} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </div>
  );
}
