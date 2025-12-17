'use client';

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#5298C1] to-[#CFC753]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/img/bed-pillows.jpg"
                alt="About SoftCool - Premium Quality Pillows"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D031A]/60 to-transparent"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sans leading-tight">
              About SoftCool
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans">
                With over 7 years of industry experience, SoftCool has been dedicated to creating the perfect sleep experience. We combine cutting-edge bio-ceramic fiber technology with scientific design principles to deliver pillows that offer unparalleled comfort and support.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans">
                Every SoftCool product is crafted with attention to detail, ensuring hypoallergenic properties, cooling technology, and seamless support. Our commitment to quality means each pillow comes with a serial number for quality control, giving you peace of mind with every purchase.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans">
                Experience the difference that comes from buying directly from the makers. Pure comfort, honest quality — delivered right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

