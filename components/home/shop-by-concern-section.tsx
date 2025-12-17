'use client';

import Link from "next/link";
import { User, Backpack, Activity, Footprints } from "lucide-react";

interface Concern {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  href: string;
}

const concerns: Concern[] = [
  {
    icon: User,
    title: "Neck Pain",
    href: "/collections?concern=neck"
  },
  {
    icon: Backpack,
    title: "Back Pain",
    href: "/collections?concern=back"
  },
  {
    icon: Activity,
    title: "Hip Pain",
    href: "/collections?concern=hip"
  },
  {
    icon: Footprints,
    title: "Leg/Foot Pain",
    href: "/collections?concern=leg"
  }
];

export default function ShopByConcernSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D031A] mb-8 sm:mb-12 md:mb-16 text-center font-sans leading-tight">
          Shop by Concern
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {concerns.map((concern, index) => {
            const IconComponent = concern.icon;
            return (
              <Link
                key={index}
                href={concern.href}
                className="group bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#5298C1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0D031A] font-sans leading-tight">
                    {concern.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

