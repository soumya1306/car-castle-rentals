"use client";

import { useEffect, useState } from "react";

import CarCard from "@/components/CarCard/CarCard";
import GridLoader from "@/components/loaders/GridLoader";
import Title from "@/components/Title";
import { Car } from "@/types/car";
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
        setCars(response.data.cars.filter((car) => car.type === "regular"));
      }
      setLoading(false);
    }

    loadCars();
  }, []);

  if (loading) return (
    <div className="">
      <div className="w-full bg-primary py-30 mb-20">
        <Title
          title="Regular Cars"
          subtitle="Smart choices for smart travelers - dependable cars at great prices. Explore our selection of regular cars."
          color="white"
        />
      </div>
      <div className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
        <GridLoader count={9} />
      </div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <div className="w-full bg-primary py-30 mb-20">
        <Title
        title="Regular Cars"
        subtitle="Smart choices for smart travelers - dependable cars at great prices. Explore our selection of regular cars."
        color="white"
      />
      </div>
      <div className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
