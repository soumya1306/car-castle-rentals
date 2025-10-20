"use client";

import AdminTitle from "@/components/Admin/AdminTitle";
import Editor from "@/components/Admin/Editor";
import ErrorAlert from "@/components/Admin/ErrorAlert";
import ToggleButton from "@/components/Admin/ToggleButton";
import ToggleSwitch from "@/components/Admin/ToggleSwitch";
import { Car } from "@/types/car";
import { fetchApi } from "@/utils/api";
import { updateCarData } from "@/utils/carUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuEyeClosed, LuEyeOff, LuPen, LuPencil, LuTrash2 } from "react-icons/lu";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>();
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  useEffect(() => {
    async function loadCars() {
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.error) {
        setError(true);
      } else if (response.data) {
        setCars(response.data.cars);
      }
      setLoading(false);
    }

    loadCars();
  }, []);

  const editCarType = (carId: string) => {};

  const handleFeatureToggle = async (carId: string) => {
    const result = await updateCarData({
      _id: carId,
      featured: !cars.find(car => car._id === carId)?.featured
    });
    if (!result.success) {
      setError(true);
    }
  };

  const handleCarAvailability = async (carId: string) => {
    const result = await updateCarData({
      _id: carId,
      isAvailable: !cars.find(car => car._id === carId)?.isAvailable
    });
    if (!result.success) {
      setError(true);
    }
  };

  return (
    <div className="px-4 md:px-10 w-full">
      {/* <Editor type="type"/> */}
      {showErrorBanner && <ErrorAlert setShowErrorBanner={setShowErrorBanner} />}
      <AdminTitle
        title="Manage Cars"
        subtitle="View all listed cars, update details, or remove cars from the fleet as needed."
      />

      <div className="max-w-[900px] w-full rounded-md overflow-hidden border border-primary/30 mt-6">
        <table className="w-full table-auto border-collapse">
          <thead className="text-gray-500 text-left">
            <tr>
              <th className="p-3 font-medium ">Car</th>
              <th className="p-3 font-medium">Type</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Featured</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => 
              car._id ? (
              <tr key={car._id} className="border-t border-primary/30">
                <td className="p-3 flex">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BLOB_URL}/thar-black.jpg`}
                    alt={`${car.brand} ${car.model}`}
                    width={60}
                    height={40}
                    className="inline-block mr-2 w-17 h-12 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-[15px] text-primary/70">
                      {car.brand} {car.model}
                    </span>
                    <span className="text-[13px] text-primary/50">
                      {car.seating_capacity} • {car.transmission}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-[15px] text-primary/70 mr-2">
                  <div className="flex justify-between">
                    {car.type === "premium" ? "Premium" : "Regular"}
                    <LuPencil
                      size={16}
                      className="inline mt-1 text-primary/50 cursor-pointer"
                    />
                  </div>
                </td>
                <td className="p-3 text-[15px] text-primary/70">
                  <div className="flex justify-between">
                    <span>{"₹" + car.pricePerDay}</span>
                    <LuPencil
                      size={16}
                      className="inline mt-1 text-primary/50 cursor-pointer"
                    />
                  </div>
                </td>
                <td className="p-3 text-[15px] text-primary/70">
                  <ToggleButton
                    enabled={car.isAvailable}
                    onToggle={() => car._id && handleCarAvailability(car._id)}
                    label={car.isAvailable ? "Available" : "Unavailable"}
                  />
                </td>
                <td className=" text-primary/70">
                  <ToggleSwitch
                    enabled={car.featured}
                    onToggle={() => car._id && handleFeatureToggle(car._id)}
                  />
                </td>
                <td className="text-primary/50">
                  <div className="flex justify-center gap-4">
                    <button className="cursor-pointer">{<LuEyeOff size={16} />}</button>
                  <button className="text-red-500/80 cursor-pointer">{<LuTrash2 size={16} />}</button>
                  </div>
                  
                </td>
              </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
