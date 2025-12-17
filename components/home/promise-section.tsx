'use client';

import { Shield, Award, Heart, CheckCircle } from 'lucide-react';

interface Promise {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const promises: Promise[] = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product is tested for durability and comfort"
  },
  {
    icon: Award,
    title: "7 Years Experience",
    description: "Trusted by thousands of satisfied customers"
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your comfort and satisfaction is our priority"
  },
  {
    icon: CheckCircle,
    title: "Certified Materials",
    description: "Hypoallergenic and non-toxic materials only"
  }
];

export default function PromiseSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#5298C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-sans leading-tight">
            SoftCool Promise
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-sans">
            Your Trust, Our Priority. Experience the best of comfort with SoftCool.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {promises.map((promise, index) => {
            const IconComponent = promise.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#5298C1]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-sans leading-tight">
                    {promise.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
                    {promise.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

