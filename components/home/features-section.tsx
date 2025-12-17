'use client';

import { Feather, BookOpen, ArrowUpRight, Anchor, Award, CheckCircle2 } from 'lucide-react';

interface Feature {
  number: string;
  title: string;
  description: string;
}

interface DetailedFeature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  detailedFeatures: DetailedFeature[];
}

// Icon mapping for detailed features
const featureIcons = [
  Feather,      // Bio-Ceramic Fiber
  BookOpen,     // Cooling Top
  ArrowUpRight, // Flippable
  Anchor,       // Serial Number
  Award,        // 7 Years in the Industry
  CheckCircle2  // Quality Assured
];

export default function FeaturesSection({ features, detailedFeatures }: FeaturesSectionProps) {
  return (
    <>
      {/* Numbered Features Section */}
      <section className="py-8 sm:py-12 bg-[#5298C1] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FDF55A] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
          {/* Main Features Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 md:mb-16 text-center font-sans leading-tight">
            Features
          </h2>

          {/* Numbered Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center px-4 sm:px-6"
              >
                <div className="relative inline-block mb-4">
                  <div className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 font-sans">
                    {feature.number}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#FDF55A] font-sans leading-tight">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Cards Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {detailedFeatures.map((feature, index) => {
              const IconComponent = featureIcons[index] || Feather;
              // Alternating pattern: Yellow, Light Blue, Yellow, Light Blue, Yellow, Light Blue
              const isYellow = index % 2 === 0;
              const bgColor = isYellow ? 'bg-[#FDF55A]' : 'bg-[#5298C1]';
              const textColor = isYellow ? 'text-[#0D031A]' : 'text-white';
              const iconColor = isYellow ? 'text-[#0D031A]' : 'text-white';

              return (
                <div
                  key={index}
                  className={`${bgColor} rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden`}
                >
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 relative z-10">
                    {/* Icon */}
                    <div className={`relative ${iconColor}`}>
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-2" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-base sm:text-lg md:text-xl font-bold ${textColor} font-sans leading-tight`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-xs sm:text-sm ${textColor}/90 font-sans leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

