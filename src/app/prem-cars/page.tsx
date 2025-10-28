"use client";

import { useEffect, useState } from "react";

import CarCard from "@/components/CarCard/CarCard";
import GridLoader from "@/components/loaders/GridLoader";
import Title from "@/components/Title";
import { Car } from "@/types/car";
import { fetchApi } from "@/utils/api";
import SearchBar from "@/components/SearchBar";

export default function PremiumCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function loadCars() {
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        const premiumCars = response.data.cars.filter((car) => car.type === "premium");
        setCars(premiumCars);
        setFilteredCars(premiumCars);
      }
      setLoading(false);
    }

    loadCars();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) => {
        const query = searchQuery.toLowerCase();
        return (
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.category.toLowerCase().includes(query) ||
          car.fuel_type.toLowerCase().includes(query) ||
          car.transmission.toLowerCase().includes(query) ||
          car.location.toLowerCase().includes(query)
        );
      });
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  if (loading)
    return (
      <div className="">
        <div className="w-full bg-primary py-30 mb-20">
          <Title
            title="Premium Cars"
            subtitle="Experience the difference luxury makes in every drive. Explore our selection of premium cars."
            color="white"
          />
        </div>

        <div className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
          <GridLoader count={6} />
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <div className="w-full flex flex-col bg-primary py-30 mb-20 items-center">
        <Title
          title="Premium Cars"
          subtitle="Experience the difference luxury makes in every drive. Explore our selection of premium cars."
          color="white"
        />
        <SearchBar 
          onSearch={setSearchQuery}
          placeholder="Search by brand, model, category, fuel type..."
        />
      </div>
      <div className="flex flex-col items-center py-24 px-6 md:px-16 xl:px-32">
        {/* Search Results Counter */}
        {searchQuery && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              {filteredCars.length > 0 
                ? `Found ${filteredCars.length} premium car${filteredCars.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : `No results for "${searchQuery}"`
              }
            </p>
          </div>
        )}
        
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} type="premium" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-gray-500 text-xl mb-4">No premium cars found</div>
            <div className="text-gray-400 text-center max-w-md">
              {searchQuery ? 
                `No premium cars match "${searchQuery}". Try adjusting your search terms.` : 
                "No premium cars available at the moment."
              }
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
