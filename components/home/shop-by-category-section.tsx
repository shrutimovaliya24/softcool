'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { categoryProducts } from "@/lib/products";

export default function ShopByCategorySection() {
  const router = useRouter();

  const handleShopNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return;
    const user = localStorage.getItem('user');
    if (!user) {
      e.preventDefault();
      router.push('/login');
    }
  };
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D031A] mb-8 sm:mb-12 md:mb-16 text-center font-sans leading-tight">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryProducts.map((category) => (
            <Link
              key={category.id}
              href="/collections"
              onClick={handleShopNowClick}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D031A]/80 via-[#0D031A]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 font-sans">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white font-medium font-sans">
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

