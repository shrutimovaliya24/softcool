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
    <div className="flex gap-4">
      {/* Thumbnail Gallery */}
      <div className="flex flex-col gap-4">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
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

      {/* Main Image */}
      <div className="flex-1 relative">
        <div className="relative h-96 md:h-[500px] lg:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
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
                className="object-cover"
                quality={90}
                priority={index === 0}
              />
            </div>
          ))}

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 bg-white border-2 border-gray-800 text-gray-800 px-4 py-2 rounded text-sm font-semibold z-10 font-sans">
              {badge}
            </div>
          )}

          {/* Favorite Icon */}
          {productId && (
            <button
              onClick={() => toggleFavorite(productId)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
              aria-label={isFavorite(productId) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`w-6 h-6 transition-colors ${
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

