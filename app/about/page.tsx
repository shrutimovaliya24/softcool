import type { Metadata } from "next";
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { Heart, Target, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Softcool | Our Story, Mission & Vision",
  description:
    "Learn about Softcool’s journey, our mission to deliver science-backed comfort, and the vision behind our premium orthopedic and cooling pillow range.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Softcool | Our Story, Mission & Vision",
    description:
      "Discover how Softcool started, our 7+ years of experience, and how we design pillows and comfort products that transform sleep quality.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="About Us" 
        subtitle="Learn more about Softcool and our mission to provide ultimate comfort"
      />

      {/* Our Story Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#FDF55A]/10 via-white to-[#5298C1]/10 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5298C1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDF55A] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
          <AnimatedSection delay={100}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">
                Our Story
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            {/* Our Beginning */}
            <AnimatedSection delay={200}>
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
                  <div className="shrink-0 w-full md:w-auto flex md:block justify-center md:justify-start mb-3 md:mb-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#5298C1] rounded-2xl flex items-center justify-center shadow-lg">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-[#5298C1] h-full min-h-[180px] sm:min-h-[220px] flex flex-col">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5298C1] mb-4 sm:mb-5 font-sans leading-tight">
                      Our Beginning
                    </h3>
                    <p className="text-sm sm:text-base text-[#0D031A] leading-relaxed font-sans flex-1">
                      Softcool was born from a simple belief: everyone deserves a perfect night's sleep. 
                      With over 7 years of experience in the industry, we've dedicated ourselves to creating 
                      the most comfortable, innovative, and high-quality pillows and bedding products.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Our Journey */}
            <AnimatedSection delay={300}>
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
                  <div className="shrink-0 w-full md:w-auto order-2 md:order-1 flex md:block justify-center md:justify-start mb-3 md:mb-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#FDF55A] rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#0D031A]" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-[#FDF55A] order-1 md:order-2 h-full min-h-[180px] sm:min-h-[220px] flex flex-col">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D031A] mb-4 sm:mb-5 font-sans leading-tight">
                      Our Journey
                    </h3>
                    <p className="text-sm sm:text-base text-[#0D031A] leading-relaxed font-sans flex-1">
                      Our journey began with a vision to revolutionize sleep comfort through innovative materials 
                      and scientific design. Today, we continue to push boundaries in comfort technology, ensuring 
                      every product meets our high standards of quality and customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <AnimatedSection delay={400}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">
                Mission & Vision
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <AnimatedSection delay={500}>
              <div className="bg-white p-5 sm:p-7 md:p-9 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1] h-full min-h-[320px] sm:min-h-[380px] md:min-h-[400px] flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#FDF55A] rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto md:mx-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5298C1]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D031A] mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">Our Mission</h3>
                <div className="flex-1 flex flex-col">
                  <p className="text-sm sm:text-base text-[#0D031A] mb-4 sm:mb-5 md:mb-6 leading-relaxed font-sans">
                    Our mission is to provide ultimate comfort through our soft pillows, offering personalized 
                    support and alignment. We combine plush memory foam cores with hypoallergenic microfiber 
                    fill to ensure you sleep blissfully with optimal comfort and contouring.
                  </p>
                  <p className="text-sm sm:text-base text-[#0D031A] leading-relaxed font-sans">
                    We are committed to delivering products that are not just soft and comfortable, but also 
                    scientifically designed to provide the best support for your head and neck.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="bg-white p-5 sm:p-7 md:p-9 rounded-xl shadow-lg hover-lift border-l-4 border-[#5298C1] h-full min-h-[320px] sm:min-h-[380px] md:min-h-[400px] flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#FDF55A] rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto md:mx-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5298C1]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D031A] mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">Our Vision</h3>
                <div className="flex-1 flex flex-col">
                  <p className="text-sm sm:text-base text-[#0D031A] mb-4 sm:mb-5 md:mb-6 leading-relaxed font-sans">
                    To become the leading provider of premium comfort products, recognized for innovation, 
                    quality, and customer satisfaction. We envision a world where everyone experiences the 
                    perfect night's sleep.
                  </p>
                  <p className="text-sm sm:text-base text-[#0D031A] leading-relaxed font-sans">
                    Through continuous innovation and dedication to excellence, we aim to set new standards 
                    in the comfort industry while maintaining our commitment to quality and customer care.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
