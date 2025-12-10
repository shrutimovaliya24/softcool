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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#525A65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Main Features Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center font-sans leading-tight">
            FEATURES
          </h2>

          {/* Numbered Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center px-2 sm:px-4">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 font-sans">
                  {feature.number}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white font-sans leading-tight">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Cards Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {detailedFeatures.map((feature, index) => {
              const IconComponent = featureIcons[index] || Feather;
              // Alternating pattern: Light, Dark, Light, Dark, Light, Dark
              const isDark = index % 2 === 1;
              const bgColor = isDark ? 'bg-[#525A65]' : 'bg-gray-50';
              const textColor = isDark ? 'text-white' : 'text-gray-900';
              const iconColor = isDark ? 'text-white' : 'text-gray-900';

              return (
                <div
                  key={index}
                  className={`${bgColor} rounded-lg p-6 sm:p-8 md:p-10 shadow-md transition-all duration-300 hover:shadow-xl group cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-5 transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Icon */}
                    <div className={`${iconColor} transition-transform duration-300 group-hover:-translate-y-1`}>
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[1.5]" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${textColor} transition-transform duration-300 group-hover:-translate-y-1 font-sans leading-tight`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-xs sm:text-sm md:text-base ${textColor} transition-transform duration-300 group-hover:-translate-y-1 font-sans leading-relaxed`}>
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

