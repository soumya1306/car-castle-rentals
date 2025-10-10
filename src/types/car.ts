export interface Car {
  _id?: string;
  brand: string;
  model: string;
  image: string;
  imageArray: string[];
  year: number;
  category: 'Hatchback' | 'SUV' | 'MPV' | 'Sedan' | 'Luxury' | 'Sports';
  seating_capacity: number;
  fuel_type: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  pricePerDay: number;
  location: string;
  description: string;
  isAvailable: boolean;
  type: 'regular' | 'premium' | 'luxury';
  featured: boolean;
}