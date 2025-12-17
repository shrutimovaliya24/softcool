import Link from "next/link";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/products";

interface CollectionSectionProps {
  featuredProducts: Product[];
}

export default function CollectionSection({ featuredProducts }: CollectionSectionProps) {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600 font-sans">
            Our Collection
          </h2>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-gray-600 text-gray-600 text-lg font-semibold rounded-full hover:bg-gray-600 hover:text-white transition-colors font-sans w-fit"
          >
            Explore Now
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
              image={product.image}
              badgeStyle="blue"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

