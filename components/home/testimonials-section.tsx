'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-6 sm:mb-8 md:mb-10 text-center font-sans leading-tight">
          Customer Reviews
        </h2>
        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={testimonials.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
              1024: {
                spaceBetween: 24,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
            style={{
              height: 'auto'
            }}
            className="testimonials-carousel-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl border-2 border-[#FDF55A] shadow-md hover:shadow-lg transition-shadow duration-300 h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] flex flex-col">
                  <blockquote className="text-sm sm:text-base text-[#0D031A] mb-4 sm:mb-6 font-sans leading-relaxed grow flex-1">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-[#5298C1]/20 border-2 border-[#FDF55A] shrink-0">
                      {testimonial.image && (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
                          className="object-cover"
                          quality={75}
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-[#0D031A] font-sans">{testimonial.author}</h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Custom Styles for Equal Height Cards and Pagination */}
        <style jsx global>{`
          .testimonials-carousel-swiper .swiper-slide {
            height: auto;
            display: flex;
          }
          .testimonials-carousel-swiper .swiper-slide > div {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .testimonials-carousel-swiper .swiper-pagination {
            position: relative !important;
            bottom: 0 !important;
            margin-top: 24px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
          }
          .testimonials-carousel-swiper .swiper-pagination-bullet-custom {
            width: 10px !important;
            height: 10px !important;
            background: #5298C1 !important;
            opacity: 0.4 !important;
            border-radius: 50% !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
            margin: 0 !important;
            display: inline-block !important;
          }
          .testimonials-carousel-swiper .swiper-pagination-bullet-active-custom {
            background: #5298C1 !important;
            opacity: 1 !important;
            width: 12px !important;
            height: 12px !important;
          }
        `}</style>
      </div>
    </section>
  );
}

