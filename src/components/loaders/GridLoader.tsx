import React from 'react';

interface GridLoaderProps {
  count?: number;
  className?: string;
}

export default function GridLoader({ count = 6, className = '' }: GridLoaderProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {Array(count).fill(0).map((_, index) => (
        <div
          key={index}
          className="rounded-xl w-80 h-[400px] shadow-lg bg-white overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-200"></div>
          
          {/* Content placeholders */}
          <div className="p-4 space-y-4">
            {/* Title placeholder */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            
            {/* Price placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            
            {/* Details placeholder */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            
            {/* Button placeholder */}
            <div className="h-10 bg-gray-200 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}