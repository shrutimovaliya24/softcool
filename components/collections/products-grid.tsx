import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/products";

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          badge={product.badge}
          image={product.image}
          description={product.description}
          badgeStyle="white"
          showDescription={true}
        />
      ))}
    </div>
  );
}

