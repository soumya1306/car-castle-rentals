"use client";

import { useEffect, useState } from "react";

import CarCard from "@/components/CarCard/CarCard";
import { Car } from "@/types/api";
import { fetchApi } from "@/utils/api";

export default function RegularCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function loadCars() {
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setCars(response.data.cars.filter(car => car.type === "regular"));
      }
      setLoading(false);
    }

    loadCars();
  }, []);

  console.log(cars)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center font-semibold mb-6">Regular Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-15 2xl:mx-100">
        {cars.map(car => (
          <CarCard
            key={car._id}
            car={car}
            onBook={async (car) => {
              // Add booking logic here
              console.log("Booking car:", car);
            }}
          />
        ))}
      </div>
    </div>
  );
}