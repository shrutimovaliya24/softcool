'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  description?: string;
  features?: string[];
  testimonial?: string;
  rating?: number;
  offer?: string;
  ctaText: string;
  type: "brand" | "features" | "social";
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/hero/slide3.jpg",
    alt: "SoftCool Customer Reviews - Loved by Sleepers",
    title: "Loved by Sleepers Everywhere",
    subtitle: "",
    testimonial: "Feels like sleeping on a cloud.",
    rating: 5,
    offer: "Order today — limited deals!",
    ctaText: "Order Now",
    type: "social"
  },
  {
    id: 2,
    image: "/hero/slide2.jpg",
    alt: "SoftCool Key Features - Why You'll Love It",
    title: "Why You'll Love It",
    subtitle: "",
    features: [
      "Personalized spine alignment",
      "Temperature-regulated comfort",
      "Hypoallergenic microfiber fill"
    ],
    ctaText: "Discover Comfort",
    type: "features"
  },
  {
    id: 3,
    image: "/hero/slide1.png",
    alt: "SoftCool Premium Pillows - Feel Soft Live Cool",
    title: "Feel Soft",
    subtitle: "Live Cool",
    description: "Sleep blissfully every night with plush memory foam core & hypoallergenic microfiber. Wake up refreshed and energized every morning with our premium bio-ceramic fiber technology.",
    ctaText: "Shop Now",
    type: "brand"
  }
];

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);
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
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        autoHeight
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={true}
        className="w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[640px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={slide.id === 1}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D031A]/80 via-[#0D031A]/60 to-[#0D031A]/40"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-end sm:items-center pb-10 sm:pb-16 pt-20 sm:pt-16 md:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full">
                  {/* Slide 1: Brand Promise - Centered */}
                  {slide.type === "brand" && (
                    <div className="max-w-4xl mx-auto text-center">
                      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans tracking-tight mb-3 sm:mb-5 whitespace-normal md:whitespace-nowrap">
                        <span className="text-white">{slide.title}</span>{" "}
                        <span className="text-white">{slide.subtitle}</span>
                      </h1>
                      <p className="text-sm sm:text-lg md:text-xl text-white leading-relaxed font-sans mb-5 sm:mb-7 max-w-2xl mx-auto">
                        {slide.description}
                      </p>
                      <Link
                        href="/collections"
                        onClick={handleShopNowClick}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2.5 bg-[#FDF55A] text-[#0D031A] text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-[#0D031A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans"
                      >
                        {slide.ctaText}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  )}

                  {/* Slide 2: Key Features - Content Wise (Left Aligned) */}
                  {slide.type === "features" && (
                    <div className="max-w-2xl text-left relative z-20 ml-4 sm:ml-8 md:ml-12 lg:ml-16">
                      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans tracking-tight mb-4 sm:mb-6 md:mb-8">
                        <span className="text-white">{slide.title}</span>
                      </h1>
                      <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8 md:mb-10">
                        {slide.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#FDF55A] shrink-0" strokeWidth={3} />
                            <p className="text-sm sm:text-lg md:text-xl text-white font-sans">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/collections"
                        onClick={handleShopNowClick}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2.5 bg-[#FDF55A] text-[#0D031A] text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-[#0D031A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans relative z-20"
                      >
                        {slide.ctaText}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  )}

                  {/* Slide 3: Social Proof - Content Wise (Left Aligned) */}
                  {slide.type === "social" && (
                    <div className="max-w-2xl text-left relative z-20 ml-4 sm:ml-8 md:ml-12 lg:ml-16">
                      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-sans tracking-tight mb-3 sm:mb-4">
                        {slide.title}
                      </h1>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {[...Array(slide.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 fill-[#FDF55A] text-[#FDF55A]" />
                        ))}
                      </div>
                      <p className="text-sm sm:text-lg md:text-xl text-white font-semibold font-sans mb-3 sm:mb-4 italic">
                        "{slide.testimonial}"
                      </p>
                      {slide.offer && (
                        <p className="text-base sm:text-lg md:text-xl text-[#5298C1] font-semibold font-sans mb-5 sm:mb-6 md:mb-8">
                          {slide.offer}
                        </p>
                      )}
                      <Link
                        href="/collections"
                        onClick={handleShopNowClick}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2.5 bg-[#FDF55A] text-[#0D031A] text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-[#0D031A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans relative z-20"
                      >
                        {slide.ctaText}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Simple Navigation Icons - hidden on very small screens to avoid overlapping text */}
      <button className="swiper-button-prev-custom absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center transition-all duration-300 group cursor-pointer">
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white group-hover:text-[#5298C1] transition-colors drop-shadow-lg" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center transition-all duration-300 group cursor-pointer">
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white group-hover:text-[#5298C1] transition-colors drop-shadow-lg" />
      </button>

      {/* Custom Pagination Styles - Dotted Bottom Pagination */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%);
          width: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
        }
        .swiper-pagination-bullet-custom {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 0 !important;
          display: inline-block;
        }
        .swiper-pagination-bullet-active-custom {
          background: rgba(255, 255, 255, 0.9);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 1;
        }
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
