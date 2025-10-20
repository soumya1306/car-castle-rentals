"use client";

import AdminTitle from "@/components/Admin/AdminTitle";
import CheckBox from "@/components/Admin/CheckBox";
import FeatureSelector from "@/components/Admin/FeatureSelector";
import { Car } from "@/types/car";
import React, { useRef, useState } from "react";
import { LuCloudUpload, LuPlus } from "react-icons/lu";

const AddCar = () => {
  const [imageLinksArray, setImageLinksArray] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const [carData, setCarData] = useState<Car>();
  console.log(imagePreviews);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onCarCreate = async (formData: FormData) => {};

  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files) {
      const fileArray = Array.from(files);
      setImagePreviews((prev) => {
        const newPreviews = [...prev, ...fileArray];
        console.log("New previews:", newPreviews);
        return newPreviews;
      });
    }
  };

  const handleClearInput = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const onRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="px-12">
      <AdminTitle
        title="Add Car"
        subtitle="Add a new car by providing all the details"
      />

      <form
        action={onCarCreate}
        className="flex flex-col gap-5 text-primary/70 text-[16px] mt-3 max-w-xl mb-10"
      >

        {/* Car Model and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full ">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., Toyota, Ford, BMW"
            />
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., Corolla, Mustang, X5"
            />
          </div>
        </div>

        {/* Car Year and Price Per Day and Category */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full ">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., 2020, 2021, 2022"
            />
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="price">Price Per Day</label>
            <input
              type="text"
              id="pricePerDay"
              name="pricePerDay"
              defaultValue={"₹"}
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., 50, 75, 100"
            />
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50  rounded-md outline-none"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="MPV">MPV</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>

        {/* Car transmission and fuel type and seating capacity */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full ">
            <label htmlFor="transmission">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="seatingCapacity">Seating Capacity</label>
            <input
              type="number"
              id="seatingCapacity"
              name="seatingCapacity"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., 4, 5, 7"
            />
          </div>
        </div>

        {/*Car Types, Featured, Availability */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="type">Car Type</label>
            <select
              id="type"
              name="type"
              className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
            >
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="flex flex-col w-full ">

          </div>
          <div className="flex flex-col w-full justify-end items-end">
            <CheckBox id="featured" label="Featured" name="featured" />
          </div>
        </div>

        {/* Car Description */}
        <div className="flex flex-col w-full ">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="px-3 py-2 mt-1 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
            placeholder="Provide a brief description of the car"
          ></textarea>
        </div>

        {/* Additional Features */}
        <div className="flex flex-col w-full ">
          <FeatureSelector />
        </div>

        {/* Cars Images */}
        <div>
          <label htmlFor="car-image" className="block mb-2">
            Select Images{" "}
            {imagePreviews.length > 0 &&
              `(${imagePreviews.length} selected)`}
            <p className="text-sm mt-2 text-primary/50 mb-2">
              You can upload multiple images at once. First image will be the cover image.
            </p>
          </label>

          {
            <div className="flex gap-4 mb-4">
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-41 h-32 shadow-md transition-all hover:shadow-2xl hover:scale-102 duration-500">
                    <img
                      src={URL.createObjectURL(preview)}
                      alt={`Car Image ${index + 1}`}
                      className="w-41 h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveImage(index);
                      }}
                      className="absolute -top-2 -right-2 bg-primary/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              <input
                type="file"
                name="imageArr"
                id="car-image"
                className="hidden"
                ref={imageInputRef}
                onChange={onUploadImage}
                onClick={handleClearInput}
                multiple
                accept="image/*"
              />
              <button
                type="button"
                className="cursor-pointer border-dotted border-primary/50 border-1 w-41 h-32 rounded"
                onClick={() => imageInputRef.current?.click()}
              >
                <LuCloudUpload className="inline mr-2" />
                Upload Images
              </button>
            </div>
          }
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-2 py-1 flex rounded-md"
          >
            <LuPlus className="m-1 w-6 h-6" />
            <span className="mt-1">Add a new Car</span>
          </button>
        </div>

        
      </form>
    </div>
  );
};

export default AddCar;
