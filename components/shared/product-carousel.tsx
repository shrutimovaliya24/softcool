'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ProductCard from './product-card';
import { Product } from '@/lib/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  showExploreButton?: boolean;
  exploreButtonLink?: string;
}

export default function ProductCarousel({ 
  products, 
  title = "Our Collection",
  showExploreButton = true,
  exploreButtonLink = "/collections"
}: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-4 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-600 font-sans leading-tight">
            {title}
          </h2>
          {showExploreButton && (
            <a
              href={exploreButtonLink}
              className="inline-flex items-center justify-center px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-gray-600 text-gray-600 text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300 font-sans w-fit"
            >
              Explore Now
            </a>
          )}
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={products.length > 6}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            breakpoints={{
              640: {
                spaceBetween: 20,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              768: {
                spaceBetween: 24,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1024: {
                spaceBetween: 24,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1280: {
                spaceBetween: 24,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="product-carousel-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badge={product.badge}
                  image={product.image}
                  badgeStyle="white"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg hover:bg-gray-50 transition-all hover:border-[#009EDD] hidden sm:flex"
            aria-label="Previous products"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="swiper-button-next-custom absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg hover:bg-gray-50 transition-all hover:border-[#009EDD] hidden sm:flex"
            aria-label="Next products"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}

