export interface Car {
  _id: string;
  brand: string;
  model: string;
  image: string;
  year: number;
  category: "Hatchback" | "Sedan" | "SUV" | "Luxury" | "Sports";
  seating_capacity: number;
  fuel_type: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  pricePerDay: number;
  location: string;
  description: string;
  isAvaliable: boolean;
  type: "regular" | "premium" | "luxury";
  featured: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}