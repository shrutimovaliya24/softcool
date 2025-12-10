import Image from "next/image";
import { CategoryProduct } from "@/lib/products";

interface DiscoverProductsProps {
  products: CategoryProduct[];
}

export default function DiscoverProducts({ products }: DiscoverProductsProps) {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-left text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-sans leading-tight">
          <span className="block">Discover Our Best-Selling</span>
          <span className="block">Comfort Products</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative cursor-pointer ${
                index === 1 ? 'sm:mt-8 md:mt-12 lg:mt-16' : index === 2 ? '' : 'sm:mt-4 md:mt-8 lg:mt-12'
              }`}
            >
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-start p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 font-sans">
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

