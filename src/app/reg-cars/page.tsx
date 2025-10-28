"use client";

import { useEffect, useState } from "react";

import CarCard from "@/components/CarCard/CarCard";
import GridLoader from "@/components/loaders/GridLoader";
import Title from "@/components/Title";
import { Car } from "@/types/car";
import { fetchApi } from "@/utils/api";
import SearchBar from "@/components/SearchBar";

export default function RegularCars() {
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
        const regularCars = response.data.cars.filter((car) => car.type === "regular");
        setCars(regularCars);
        setFilteredCars(regularCars);
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
        <div className="w-full bg-primary py-30 mb-20 justify-center">
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
      <div className="w-full flex flex-col bg-primary py-30 mb-10 items-center">
        <Title
          title="Regular Cars"
          subtitle="Smart choices for smart travelers - dependable cars at great prices. Explore our selection of regular cars."
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
                ? `Found ${filteredCars.length} car${filteredCars.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : `No results for "${searchQuery}"`
              }
            </p>
          </div>
        )}
        
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} type="regular" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-gray-500 text-xl mb-4">No cars found</div>
            <div className="text-gray-400 text-center max-w-md">
              {searchQuery ? 
                `No regular cars match "${searchQuery}". Try adjusting your search terms.` : 
                "No regular cars available at the moment."
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
