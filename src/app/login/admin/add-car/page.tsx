"use client";

import AdminTitle from "@/components/Admin/AdminTitle";
import CheckBox from "@/components/Admin/CheckBox";
import FeatureSelector from "@/components/Admin/FeatureSelector";
import { Car } from "@/types/car";
import { uploadImagesToVercelBlob } from "@/utils/uploadImages";
import React, { useRef, useState } from "react";
import { LuCloudUpload, LuPlus, LuX } from "react-icons/lu";
import { createCarData } from "@/utils/carUtils";
import SuccessAlert from "@/components/Admin/SuccessAlert";
import ErrorAlert from "@/components/Admin/ErrorAlert";

const AddCar = () => {
  const [features, setFeatures] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    completed: number;
    total: number;
    currentFile: string;
  } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onCarCreate = async (formData: FormData) => {
    try {
      setIsUploading(true);
      setUploadProgress(null);

      // Generate a temporary UUID for image naming (not for database)
      const tempId = crypto.randomUUID();
      
      // Upload images first with progress tracking using temp ID
      const uploadedImageUrls = await uploadImagesToVercelBlob(
        tempId,
        imagePreviews,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Build car data (without _id - let MongoDB generate it)
      const newCarData: Omit<Car, '_id'> = {
        brand: formData.get("brand") as string,
        model: formData.get("model") as string,
        year: parseInt(formData.get("year") as string, 10),
        pricePerDay: parseFloat(
          (formData.get("pricePerDay") as string).replace("₹", "").trim()
        ),
        category: formData.get("category") as
          | "Hatchback"
          | "SUV"
          | "MPV"
          | "Sedan"
          | "Luxury"
          | "Sports",
        transmission: formData.get("transmission") as
          | "Manual"
          | "Automatic",
        fuel_type: formData.get("fuelType") as
          | "Petrol"
          | "Diesel"
          | "Hybrid"
          | "Electric",
        seating_capacity: parseInt(
          formData.get("seatingCapacity") as string,
          10
        ),
        type: formData.get("type") as "regular" | "premium",
        featured: formData.get("featured") === "on" ? true : false,
        description: formData.get("description") as string,
        features: features,
        isAvailable: true,
        imageArray: uploadedImageUrls, // Set the uploaded image URLs
        image: uploadedImageUrls[0] || "", // Set the first image as the main image
        location: "Default Location", // TODO: Add location field to form
      };

      const response = await createCarData(newCarData);
      if (response.success) {
        setShowSuccessBanner(true);
      }else {
        setShowErrorBanner(true);
      }
    } catch (error) {
      console.error("Error creating car:", error);
      // Handle error (show toast, alert, etc.)
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to create car"
        }`
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      setImagePreviews([]);
    }
  };
  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImagePreviews((prev) => {
        const newPreviews = [...prev, ...fileArray];
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

      {showSuccessBanner && (
        <SuccessAlert setShowSuccessBanner={setShowSuccessBanner} message="Car added successfully"/>
      )}

      {showErrorBanner && (
        <ErrorAlert setShowErrorBanner={setShowErrorBanner} message="Failed to add car"/>
      )}

      {/* Upload Progress Indicator */}
      {uploadProgress && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              Uploading Images... ({uploadProgress.completed}/
              {uploadProgress.total})
            </span>
            <span className="text-sm text-blue-600">
              {Math.round(
                (uploadProgress.completed / uploadProgress.total) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (uploadProgress.completed / uploadProgress.total) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Current: {uploadProgress.currentFile}
          </p>
        </div>
      )}

      <form
        action={onCarCreate}
        className="flex flex-col gap-5 text-primary/90 text-[16px] mt-3 max-w-3xl mb-10"
      >
        {/* Car Model and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full ">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., Toyota, Ford, BMW"
            />
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
              placeholder="e.g., 50, 75, 100"
            />
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50  rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
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
              className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
            >
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="flex flex-col w-full "></div>
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
            className="px-3 py-2 mt-1 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
            placeholder="Provide a brief description of the car"
          ></textarea>
        </div>

        {/* Additional Features */}
        <div className="flex flex-col w-full ">
          <FeatureSelector features={features} setFeatures={setFeatures} />
        </div>

        {/* Cars Images */}
        <div>
          <label htmlFor="car-image" className="block mb-2">
            Select Images{" "}
            {imagePreviews.length > 0 && `(${imagePreviews.length} selected)`}
            <p className="text-sm mt-2 text-primary/50 mb-2">
              You can upload multiple images at once. First image will be the
              cover image.
            </p>
          </label>

          {
            <div className="flex gap-4 mb-4">
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-41 h-32 shadow-md transition-all hover:shadow-2xl hover:scale-102 duration-500"
                  >
                    <img
                      src={URL.createObjectURL(preview)}
                      alt={`Car Image ${index + 1}`}
                      className="w-41 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveImage(index);
                      }}
                      className="absolute -top-2 -right-2 bg-primary/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                    >
                      <LuX />
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
                className="cursor-pointer bg-white border-dotted border-primary/50 border-1 w-41 h-32 rounded"
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
            disabled={isUploading}
            className={`px-6 py-3 flex items-center rounded-md transition-all ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            } text-white`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Uploading Images...</span>
              </>
            ) : (
              <>
                <LuPlus className="mr-2 w-5 h-5" />
                <span>Add New Car</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
