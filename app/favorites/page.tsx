'use client';

import Link from 'next/link';
import Image from 'next/image';
import PageHero from "@/components/shared/page-hero";
import AnimatedSection from "@/components/shared/animated-section";
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { allProducts } from '@/lib/products';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  
  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="My Favorites" 
        subtitle="Your favorite products"
      />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {favoriteProducts.length === 0 ? (
            <AnimatedSection delay={100}>
              <div className="text-center py-12 sm:py-16 md:py-20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-gray-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans leading-tight">No favorites yet</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 font-sans px-4">
                  Start adding products to your favorites by clicking the heart icon on any product.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all font-sans hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#009EDD' }}
                >
                  Browse Products
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {favoriteProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 100}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200">
                      <Link href={`/pillow/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          quality={90}
                        />
                      </Link>
                      {product.badge && (
                        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white border-2 border-gray-800 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-semibold z-10 font-sans">
                          {product.badge}
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all z-10"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-3 sm:p-4 text-center flex-grow flex flex-col justify-between">
                      <div>
                        <Link href={`/pillow/${product.id}`}>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 hover:text-[#009EDD] transition-colors font-sans leading-tight line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex flex-col items-center justify-center gap-1 mb-3 sm:mb-4">
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through font-sans">
                              ₹{product.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          )}
                          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 font-sans">
                            ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-[#525A65] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all font-sans hover:opacity-90 flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

