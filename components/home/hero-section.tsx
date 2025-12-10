import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen grid grid-cols-2 gap-0 overflow-hidden">
      {/* Left Side */}
      <div className="bg-white relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-y-auto">
        {/* Heading positioned at top-middle, left aligned */}
        <h1 className="absolute top-[20%] sm:top-[25%] left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-gray-600 font-sans tracking-tight mb-4 sm:mb-6 md:mb-8">
          Feel Soft
        </h1>
        {/* Content below heading */}
        <div className="absolute top-[30%] sm:top-[30%] md:top-[40%] left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 w-full pr-2 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-12 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
            Experience ultimate comfort with our soft pillows, offering personalized support and alignment through a plush memory foam core and hypoallergenic microfiber fill. Sleep blissfully with optimal comfort and contouring.
          </p>
          <div className="flex">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 bg-white border border-gray-600 text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg font-semibold rounded-full hover:bg-gray-600 hover:text-white transition-colors font-sans"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/img/bed-pillows.jpg"
            alt="Bed with pillows"
            fill
            sizes="50vw"
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        {/* Heading positioned at top-middle, left aligned - same line as Feel Soft */}
        <h1 className="absolute top-[20%] sm:top-[25%] left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-white font-sans tracking-tight z-10 mb-4 sm:mb-6 md:mb-8">
          Live Cool
        </h1>
      </div>
    
    </section>
  );
}
