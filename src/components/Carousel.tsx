'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuChevronLeft, LuChevronRight, LuCircle, LuDot } from 'react-icons/lu';

export interface CarouselProps {
  images: string[];
  alt?: string;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  alt = 'Carousel image',
  className = '',
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  aspectRatio = 'video'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  // Handle empty or single image
  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-lg ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        <div className={`relative ${getAspectRatioClass(aspectRatio)}`}>
          <Image
            src={images[0]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  return (
    <div className={`relative rounded-lg overflow-hidden group ${className}`}>
      {/* Main Image Display with Sliding Animation */}
      <div className={`relative ${getAspectRatioClass(aspectRatio)} overflow-hidden`}>
        <div 
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 w-full h-full min-w-full"
            >
              {imageErrors.has(index) ? (
                /* Fallback content for failed images */
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm font-medium">Image not found</div>
                  <div className="text-xs mt-1 opacity-75">Failed to load image</div>
                </div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${image.split('/').pop()}`}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  onError={() => handleImageError(index)}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Loading overlay for better UX */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse -z-20" />
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-all duration-400 z-10"
            aria-label="Previous image"
          >
            <LuChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-all duration-400 z-10"
            aria-label="Next image"
          >
            <LuChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-200 ${
                index === currentIndex
                  ? 'text-white scale-125'
                  : 'text-white/50 hover:text-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              {index === currentIndex ? (
                <LuDot className="w-4 h-4" />
              ) : (
                <LuCircle className="w-3 h-3" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

// Helper function to get aspect ratio classes
function getAspectRatioClass(aspectRatio: CarouselProps['aspectRatio']): string {
  switch (aspectRatio) {
    case 'square':
      return 'aspect-square';
    case 'video':
      return 'aspect-video';
    case 'wide':
      return 'aspect-[21/9]';
    case 'auto':
      return 'h-auto min-h-[200px]';
    default:
      return 'aspect-video';
  }
}

export default Carousel;