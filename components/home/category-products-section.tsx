'use client';

import ProductCarousel from "@/components/shared/product-carousel";
import { allProducts } from "@/lib/products";

export default function CategoryProductsSection() {
  // Mix all products from different categories
  const mixedProducts = allProducts;

  return (
    <ProductCarousel 
      products={mixedProducts}
      title="Our Collection"
      showExploreButton={true}
      exploreButtonLink="/collections"
    />
  );
}

