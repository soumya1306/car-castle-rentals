"use client";

import AdminTitle from "@/components/Admin/AdminTitle";
import DropdownEditor from "@/components/Admin/DropdownEditor";
import ErrorAlert from "@/components/Admin/ErrorAlert";
import ImageEditor from "@/components/Admin/ImageEditor";
import PriceEditor from "@/components/Admin/PriceEditor";
import ToggleButton from "@/components/Admin/ToggleButton";
import ToggleSwitch from "@/components/Admin/ToggleSwitch";
import { Car } from "@/types/car";
import { fetchApi } from "@/utils/api";
import { updateCarData } from "@/utils/carUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>();
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [editingImageCarId, setEditingImageCarId] = useState<string | null>(null);

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

  const handleChangeCarType = async (
    carId: string,
    value: "regular" | "premium" | "luxury"
  ) => {
    const result = await updateCarData({
      _id: carId,
      type: value,
    });
    if (!result.success) {
      setError(true);
    }
  };

  const handleFeatureToggle = async (carId: string) => {
    const result = await updateCarData({
      _id: carId,
      featured: !cars.find((car) => car._id === carId)?.featured,
    });
    if (!result.success) {
      setError(true);
    }
  };

  const handleCarAvailability = async (carId: string) => {
    const result = await updateCarData({
      _id: carId,
      isAvailable: !cars.find((car) => car._id === carId)?.isAvailable,
    });
    if (!result.success) {
      setError(true);
    }
  };

  const handleCarPriceUpdate = async (carId: string, newPrice: string) => {
    const result = await updateCarData({
      _id: carId,
      pricePerDay: parseFloat(newPrice.replace(/[^0-9.-]+/g, "")),
    });

    if (!result.success) {
      setError(true);
    } else {
      setEditingCarId(null); // Close the price editor for this car
      // Refresh the cars list to show updated price
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.data) {
        setCars(response.data.cars);
      }
    }
  };

  const handleImageUpdate = async (carId: string, newImageArray: string[]) => {
    const result = await updateCarData({
      _id: carId,
      imageArray: newImageArray,
    });

    if (!result.success) {
      setError(true);
    } else {
      setEditingImageCarId(null); // Close the image editor
      // Refresh the cars list to show updated images
      const response = await fetchApi<{ cars: Car[] }>("cars");
      if (response.data) {
        setCars(response.data.cars);
      }
    }
  };

  return (
    <div className=" px-4 md:px-10 w-full">
      {showErrorBanner && (
        <ErrorAlert setShowErrorBanner={setShowErrorBanner} />
      )}
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
                    <div className="relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${car.imageArray[0].split('/').pop()}`}
                        alt={`${car.brand} ${car.model}`}
                        width={60}  
                        height={40}
                        className="inline-block mr-2 w-17 h-12 object-cover rounded"
                      />
                      <button
                        onClick={() => car._id && setEditingImageCarId(car._id)}
                        className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-blue-600 transition-colors"
                        title="Edit images"
                      >
                        <LuPencil size={10} />
                      </button>
                    </div>
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
                    <DropdownEditor
                      id={car._id}
                      currentValue={car.type}
                      onSelect={handleChangeCarType}
                    />
                  </td>
                  <td className="p-3 text-[15px] text-primary/70">
                    <PriceEditor
                      isPriceEditorMode={editingCarId === car._id}
                      setIsPriceEditorMode={(isEditing: boolean) => 
                        setEditingCarId(isEditing && car._id ? car._id : null)
                      }
                      car={car}
                      handleCarPriceUpdate={handleCarPriceUpdate}
                    />
                  </td>
                  <td className="p-3 text-[15px] text-primary/70">
                    <ToggleButton
                      enabled={car.isAvailable}
                      onToggle={() => car._id && handleCarAvailability(car._id)}
                      checkedLabel="Available"
                      uncheckedLabel="Unavailable"
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
                      <button className="text-red-500/80 cursor-pointer">
                        {<LuTrash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      
      {/* Image Editor Popup */}
      {editingImageCarId && (
        <ImageEditor
          car={cars.find(car => car._id === editingImageCarId)!}
          onClose={() => setEditingImageCarId(null)}
          onSave={handleImageUpdate}
        />
      )}
    </div>
  );
};

export default ManageCars;
