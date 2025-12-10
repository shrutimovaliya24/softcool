'use client';

import { useState } from 'react';
import AnimatedSection from "@/components/shared/animated-section";
import ProductCard from "@/components/shared/product-card";
import { allProducts, categoryProducts } from "@/lib/products";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [priceRange, setPriceRange] = useState<[number, number]>([899, 2500]);
  const [sortBy, setSortBy] = useState<string>("Recommended");

  // Filter products
  let filteredProducts = allProducts;
  
  if (selectedCategory !== "All Products") {
    filteredProducts = allProducts.filter(p => p.category === selectedCategory);
  }

  // Filter by price range
  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  if (sortBy === "Price: Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const minPrice = Math.min(...allProducts.map(p => p.price));
  const maxPrice = Math.max(...allProducts.map(p => p.price));

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <AnimatedSection delay={100}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 space-y-6 sm:space-y-8">
                  {/* Browse by Category */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 font-sans">Browse by</h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {["All Products", ...categoryProducts.map(c => c.name)].map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-sans text-sm sm:text-base ${
                              selectedCategory === category
                                ? 'bg-[#009EDD] text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Filter by Price */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 font-sans">Filter by</h3>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 font-sans">Price</label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 font-sans">
                          <span>₹{priceRange[0].toLocaleString()}</span>
                          <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <AnimatedSection delay={200}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-sans leading-tight">
                      {selectedCategory}
                    </h1>
                    <span className="text-sm sm:text-base text-gray-600 font-sans">
                      {filteredProducts.length} products
                    </span>
                  </div>
                  <div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EDD] focus:border-transparent font-sans w-full sm:w-auto"
                    >
                      <option value="Recommended">Sort by: Recommended</option>
                      <option value="Price: Low to High">Price: Low to High</option>
                      <option value="Price: High to Low">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </AnimatedSection>

              {/* Products Grid - 1 product per row on mobile, 2 on tablet, 3 on lg, 4 on xl */}
              <AnimatedSection delay={300}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {filteredProducts.map((product, index) => (
                    <div key={product.id} style={{ animationDelay: `${400 + index * 50}ms` }} className="animate-fade-in-up">
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        badge={product.badge}
                        image={product.image}
                        badgeStyle="white"
                        showDescription={false}
                      />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
