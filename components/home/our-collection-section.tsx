'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useRef } from 'react';
import { allProducts } from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import 'swiper/css';
import 'swiper/css/navigation';

export default function OurCollectionSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof allProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-4 sm:mb-6 text-center font-sans leading-tight">
          Our Products
        </h2>
        
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={allProducts.length > 3}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.collection-button-next',
              prevEl: '.collection-button-prev',
            }}
            breakpoints={{
              640: {
                spaceBetween: 20,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1024: {
                spaceBetween: 24,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1280: {
                spaceBetween: 24,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            className="collection-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {allProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 group h-full flex flex-col">
                  {/* Badge above image for consistent gap on all sizes */}
                  {product.badge && (
                    <div className="px-3 sm:px-4 pt-3">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FDF55A] text-[#0D031A] text-xs sm:text-sm font-semibold font-sans shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Image - Clickable */}
                  <Link
                    href={`/pillow/${product.id}`}
                    className="relative mt-3 h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-white block"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      quality={90}
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 space-y-2 grow flex flex-col items-center text-center">
                    <Link href={`/pillow/${product.id}`}>
                      <h3 className="text-base sm:text-lg font-bold text-[#0D031A] font-sans leading-tight hover:text-[#5298C1] transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-[#5A646E] line-through font-sans">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-bold text-[#0D031A] font-sans">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Yellow Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#FDF55A] text-[#0D031A] text-sm font-semibold rounded-lg hover:bg-[#5298C1] hover:text-white transition-all duration-300 font-sans"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="collection-button-prev absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group -left-4 sm:-left-6">
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#5298C1] group-hover:text-[#0D031A] transition-colors" />
          </button>
          <button className="collection-button-next absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group -right-4 sm:-right-6">
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#5298C1] group-hover:text-[#0D031A] transition-colors" />
          </button>
        </div>

        {/* Swiper Navigation Styles */}
        <style jsx global>{`
          .collection-button-prev.swiper-button-disabled,
          .collection-button-next.swiper-button-disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </section>
  );
}

