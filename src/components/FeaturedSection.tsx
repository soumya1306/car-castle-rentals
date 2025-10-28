"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Car } from "@/types/car";
import { fetchApi } from "@/utils/api";

import CarCard from "./CarCard/CarCard";
import GridLoader from "@/components/loaders/GridLoader";
import Title from "./Title";

export default function FeaturedSection() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function loadCars() {
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setCars(response.data.cars.filter((car) => car.featured === true).slice(0, 6));
      }
      setLoading(false);
    }

    loadCars();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
      <div>
        <Title
          title="Featured Cars"
          subtitle="Check out our featured cars available for rent."
        />
      </div>

      <GridLoader count={6} className="mt-18" />
    </div>
  );
  if (error) return <div>Error: {error}</div>;


  return (
    <section id="featured" className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
      <div>
        <Title
          title="Featured Cars"
          subtitle="Check out our featured cars available for rent."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-18 w-full">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} type={car.type}/>
        ))}
      </div>
      <div className="mt-12">
             <button
             onClick={() => router.push("/reg-cars")}
        type="submit"
        className="mt-5 bg-primary text-white h-12 w-56 px-4 rounded active:scale-95 transition"
      >
        View All Cars
      </button>
      </div>
    </section>

  );
}
