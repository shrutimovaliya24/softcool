'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  productId?: number;
}

export default function ProductImageGallery({ images, productName, badge, productId }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useCart();

  const displayImages = images && images.length > 0 ? images : [images[0] || '/img/placeholder.jpg'];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setMainImageIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = mainImageIndex > 0 ? mainImageIndex - 1 : displayImages.length - 1;
    setMainImageIndex(newIndex);
    setSelectedImageIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = mainImageIndex < displayImages.length - 1 ? mainImageIndex + 1 : 0;
    setMainImageIndex(newIndex);
    setSelectedImageIndex(newIndex);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main Image */}
      <div className="relative w-full md:flex-1">
        <div className="relative h-80 sm:h-96 md:h-[420px] lg:h-[520px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === mainImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                className="object-contain"
                quality={90}
                priority={index === 0}
              />
            </div>
          ))}

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white border-2 border-gray-800 text-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-semibold z-10 font-sans">
              {badge}
            </div>
          )}

          {/* Favorite Icon */}
          {productId && (
            <button
              onClick={() => toggleFavorite(productId)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all z-10"
              aria-label={isFavorite(productId) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                  isFavorite(productId) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-800'
                }`} 
              />
            </button>
          )}

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={handleNext}
                className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-4 md:mt-0 flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-1 no-scrollbar">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
              selectedImageIndex === index
                ? 'border-[#009EDD] scale-105'
                : 'border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              quality={75}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

