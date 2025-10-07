'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Car } from '@/types/api';
import { uploadImage } from '@/utils/image';

interface CarFormProps {
  onSubmit: (car: Partial<Car>) => void;
  initialData?: Car;
}

export default function CarForm({ onSubmit, initialData }: CarFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image || '');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = initialData?.image;

      // Upload new image if selected
      if (imageFile) {
        const filename = `car-${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, filename);
      }

      // Get form data
      const formData = new FormData(e.currentTarget);
      const carData: Partial<Car> = {
        brand: formData.get('brand') as string,
        model: formData.get('model') as string,
        year: Number(formData.get('year')),
        category: formData.get('category') as Car['category'],
        seating_capacity: Number(formData.get('seating_capacity')),
        fuel_type: formData.get('fuel_type') as Car['fuel_type'],
        transmission: formData.get('transmission') as Car['transmission'],
        pricePerDay: Number(formData.get('pricePerDay')),
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as Car['type'],
        image: imageUrl,
        isAvaliable: true,
      };

      onSubmit(carData);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Car Image</label>
        <div className="flex items-center gap-4">
          {previewUrl && (
            <div className="relative w-32 h-32">
              <Image
                src={previewUrl}
                alt="Car preview"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>
      </div>

      {/* Add other form fields here */}
      
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Save Car'}
      </button>
    </form>
  );
}