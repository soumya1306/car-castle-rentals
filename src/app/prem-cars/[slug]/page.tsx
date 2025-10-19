"use client";

/**
 * Premium Car Details Page
 *
 * This page displays detailed information about a specific premium car.
 * It fetches car data based on the URL slug (MongoDB ObjectId) and
 * shows comprehensive information including images, specifications,
 * and features.
 */

// Next.js and React imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// Icon imports
import { FiArrowLeft } from "react-icons/fi";
import {
  LuCar,
  LuCircleCheckBig,
  LuFuel,
  LuMapPin,
  LuUsers,
} from "react-icons/lu";
// Local imports
import PhoneInput from "react-phone-input-2";

import SpinLoader from "@/components/Loaders/SpinLoader";
import { Car } from "@/types/car";

interface CarDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const CarDetailsPage = ({ params }: CarDetailsPageProps) => {
  // Hooks initialization
  const router = useRouter();
  const { slug } = React.use(params) as { slug: string };
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  /**
   * Fetches car details from the API using the provided slug (ObjectId)
   * Updates the carDetails state with the fetched data
   */
  useEffect(() => {
    async function fetchCarDetails() {
      try {
        // Make API request
        const response = await fetch(`/api/cars?_id=${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse and validate response
        const data = await response.json();
        if (!data.cars || data.cars.length === 0) {
          console.error("No car found with ID:", slug);
          return;
        }

        // Update state with car details
        setCarDetails(data.cars[0]);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    }

    fetchCarDetails();
  }, [slug]);

  const handleFormSubmit = (formData: FormData) => {
    const contactNumber = formData.get("contactNumber");
    console.log(contactNumber)

  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Navigation Back Button */}
      <button
        className="flex items-center gap-2 mb-6 text-[18px] text-primary cursor-pointer"
        onClick={() => router.back()}
      >
        <FiArrowLeft className="inline mr-2 " />
        Back to all Premium Cars
      </button>

      {/* Main Content */}
      {carDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:mb-12">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2">
            {/* Car Image */}
            <Image
              src={`${process.env.NEXT_PUBLIC_BLOB_URL}/thar-black.jpg`}
              alt={`${carDetails.brand} ${carDetails.model}`}
              width={1000}
              height={600}
              className="w-full h-auto object-cover rounded-xl mb-6 shadow-xl"
            />

            {/* Car Title and Basic Info */}
            <div className="space-y-6 text-primary">
              <h1 className="text-3xl font-bold">
                {carDetails.brand} • {carDetails.model}
              </h1>
              <p className="text-lg text-gray-600 -mt-2">
                {carDetails.category} • {carDetails.year}
              </p>

              <hr className="border-gray-300 mt-4 mb-6" />

              {/* Car Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {/* Seating Capacity */}
                <div className="flex flex-col items-center p-6 rounded-xl bg-primary/10">
                  <LuUsers className="inline-block mr-1 h-5 w-5" />
                  <span>{carDetails.seating_capacity} Seats</span>
                </div>

                {/* Fuel Type */}
                <div className="flex flex-col items-center p-6 rounded-xl bg-primary/10">
                  <LuFuel className="inline-block mr-1 h-5 w-5" />
                  <span>{carDetails.fuel_type}</span>
                </div>

                {/* Transmission Type */}
                <div className="flex flex-col items-center p-6 rounded-xl bg-primary/10">
                  <LuCar className="inline-block mr-1 h-6 w-6" />
                  <span>{carDetails.transmission}</span>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center p-6 rounded-xl bg-primary/10">
                  <LuMapPin className="inline-block mr-1 h-5 w-5" />
                  <span>{carDetails.location}</span>
                </div>
              </div>

              {/* Car Description */}
              <div>
                <h1 className="text-2xl font-medium mb-3">Description</h1>
                <p className="text-gray-500 text-[18px]">
                  {carDetails?.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h1 className="text-2xl font-medium mb-3">Features</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Bluetooth Connectivity",
                    "GPS Navigation",
                    "Sunroof",
                    "Heated Seats",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-500 text-[18px] py-3"
                    >
                      <LuCircleCheckBig className="mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <form
            className="flex flex-col shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 justify-center"
            action={handleFormSubmit}
          >
            <p className="flex flex-col text-2xl text-gray-800 font-semibold">
              ₹ {carDetails.pricePerDay}
              <span className="text-xl text-gray-400 font-normal">
                {" "}
                per day
              </span>
            </p>
            <div className="flex flex-col gap-2 text-[18px]">
              <label htmlFor="pickup-date">Pick-up Date</label>
              <input
                type="date"
                id="pickup-date"
                name="pickupDate"
                className="border border-gray-300 rounded-lg p-2"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="flex flex-col gap-2 text-[18px]">
              <label htmlFor="return-date">Return Date</label>
              <input
                type="date"
                id="return-date"
                name="returnDate"
                className="border border-gray-300 rounded-lg p-2"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="flex flex-col gap-2 text-[18px]">
              <label htmlFor="contact-number">Contact Number</label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputStyle={{
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  width: "100%",
                }}
                inputProps={{
                  name: "contactNumber",
                  required: true,
                }}
                isValid ={
                  (value) => {
                    if (value.match(/^[6-9]\d{9}$/)){
                      return true;
                    }else
                      return false;
                  }
                }
              />
            </div>

            <button
              className="bg-primary justify-center text-[18px] text-white py-3 px-4 rounded-lg mx-auto mt-4 cursor-pointer"
              type="submit"
            >
              Request a callback
            </button>
          </form>
        </div>
      ) : (
        // Loading State
        <div className="min-h-screen flex items-center justify-center">
          <SpinLoader size={48} />
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
