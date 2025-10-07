'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCarImages } from '@/utils/images';

interface CarImage {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export default function CarImageGallery() {
  const [images, setImages] = useState<CarImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function loadImages() {
      try {
        const carImages = await getCarImages();
        setImages(carImages);
      } catch (err) {
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) return <div>Loading images...</div>;
  if (error) return <div>Error: {error}</div>;
  if (images.length === 0) return <div>No images found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.pathname} className="relative aspect-square">
          <Image
            src={image.url}
            alt={image.pathname}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            <p>Size: {Math.round(image.size / 1024)}KB</p>
            <p>Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}