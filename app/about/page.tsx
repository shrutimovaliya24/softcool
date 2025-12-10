import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { Heart, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="About Us" 
        subtitle="Learn more about Softcool and our mission to provide ultimate comfort"
      />

      {/* Our Story Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <AnimatedSection delay={100}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-600 mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">
                Our Story
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-[#009EDD] mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg hover-lift">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#009EDD]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Our Beginning</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-sans">
                  Softcool was born from a simple belief: everyone deserves a perfect night's sleep. 
                  With over 7 years of experience in the industry, we've dedicated ourselves to creating 
                  the most comfortable, innovative, and high-quality pillows and bedding products.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg hover-lift">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#009EDD]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">Our Journey</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-sans">
                  Our journey began with a vision to revolutionize sleep comfort through innovative materials 
                  and scientific design. Today, we continue to push boundaries in comfort technology, ensuring 
                  every product meets our high standards of quality and customer satisfaction.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <AnimatedSection delay={400}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-600 mb-3 sm:mb-4 md:mb-5 font-sans leading-tight">
                Mission & Vision
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-[#009EDD] mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <AnimatedSection delay={500}>
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg hover-lift border-l-4 border-[#009EDD]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#009EDD]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#009EDD]" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 font-sans leading-tight">Our Mission</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed font-sans">
                  Our mission is to provide ultimate comfort through our soft pillows, offering personalized 
                  support and alignment. We combine plush memory foam cores with hypoallergenic microfiber 
                  fill to ensure you sleep blissfully with optimal comfort and contouring.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-sans">
                  We are committed to delivering products that are not just soft and comfortable, but also 
                  scientifically designed to provide the best support for your head and neck.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg hover-lift border-l-4 border-[#525A65]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#525A65]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#525A65]" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 font-sans leading-tight">Our Vision</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed font-sans">
                  To become the leading provider of premium comfort products, recognized for innovation, 
                  quality, and customer satisfaction. We envision a world where everyone experiences the 
                  perfect night's sleep.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-sans">
                  Through continuous innovation and dedication to excellence, we aim to set new standards 
                  in the comfort industry while maintaining our commitment to quality and customer care.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
