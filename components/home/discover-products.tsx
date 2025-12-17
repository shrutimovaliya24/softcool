import Image from "next/image";
import { CategoryProduct } from "@/lib/products";

interface DiscoverProductsProps {
  products: CategoryProduct[];
}

export default function DiscoverProducts({ products }: DiscoverProductsProps) {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#5298C1] mb-4 sm:mb-6 font-sans leading-tight">
          Discover Our Best-Selling Comfort Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative cursor-pointer ${
                index === 0 ? 'lg:mt-10 xl:mt-16' : index === 1 ? 'lg:mt-6 xl:mt-10' : ''
              }`}
            >
              <div className="relative h-40 sm:h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-start p-3 sm:p-4 md:p-5">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#FDF55A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 font-sans">
                    {product.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

