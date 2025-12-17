'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { allProducts } from "@/lib/products";

export default function BestSellersSection() {
  const router = useRouter();

  const handleShopNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return;
    const user = localStorage.getItem('user');
    if (!user) {
      e.preventDefault();
      router.push('/login');
    }
  };
  const bestSellers = allProducts.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D031A] mb-8 sm:mb-12 md:mb-14 text-center font-sans leading-tight">
          Our Best Sellers
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-[#5298C1]/20"
            >
              {/* Product Image */}
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#CFC753] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold font-sans">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0D031A] font-sans leading-tight">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[#CFC753] text-[#CFC753]"
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg md:text-xl font-bold text-[#0D031A] font-sans">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm sm:text-base text-[#5A646E] line-through font-sans">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    href={`/pillow/${product.id}`}
                    onClick={handleShopNowClick}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[#5298C1] text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-[#5298C1]/90 transition-all duration-300 font-sans"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Shop Now
                  </Link>
                  <Link
                    href={`/pillow/${product.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-white border-2 border-[#5298C1] text-[#5298C1] text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-[#5298C1]/5 transition-all duration-300 font-sans"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

