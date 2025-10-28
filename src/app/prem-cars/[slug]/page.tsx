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

import SpinLoader from "@/components/loaders/SpinLoader";
import { Car } from "@/types/car";
import Carousel from "@/components/Carousel";
import { sendBookingInquiry } from "@/utils/emailService";

interface CarDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const CarDetailsPage = ({ params }: CarDetailsPageProps) => {
  // Hooks initialization
  const router = useRouter();
  const { slug } = React.use(params) as { slug: string };
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitSource, setSubmitSource] = useState<"whatsapp" | "callback">();
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

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

  const handleFormSubmit = async(formData: FormData) => {
    const pickupDate = formData.get("pickupDate") as string;
    const returnDate = formData.get("returnDate") as string;
    const location = formData.get("location") as string;
    const contactNumber = formData.get("contactNumber") as string;

    if (!carDetails) return;
    
    if (submitSource === "callback") {
      setEmailLoading(true);
      setEmailSuccess(false);
      
      try {
        await sendBookingInquiry({
          carModel: `${carDetails.brand} ${carDetails.model}`,
          pricePerDay: carDetails.pricePerDay,
          carCategory: carDetails.category,
          pickupDate,
          returnDate,
          location,
          customerPhone: contactNumber,
        });
        
        setEmailSuccess(true);
        // Hide success message after 5 seconds
        setTimeout(() => setEmailSuccess(false), 5000);
      } catch (error) {
        console.error('Failed to send booking inquiry:', error);
        // You could add error state here if needed
      } finally {
        setEmailLoading(false);
      }
      
      return;
    }
    // Create WhatsApp message with booking details
    const whatsappMessage = `Hello! I'm interested in booking a premium car from Car Castle Rentals.

*Car Details:*
🚗 ${carDetails.brand} ${carDetails.model}
💰 ₹${carDetails.pricePerDay}/day
📍 Category: ${carDetails.category} (Premium)

*Booking Details:*
📅 Pick-up Date: ${pickupDate}
📅 Return Date: ${returnDate}
📍 Delivery Location: ${location}
📞 Contact Number: ${contactNumber}

Please confirm the availability and provide further details for the premium car booking.

Thank you!`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Car Castle Rentals WhatsApp number
    const whatsappNumber = process.env.WHATSAPP_NUMBER_INQUIRY;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
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
            <Carousel
              images={carDetails.imageArray}
              alt={`${carDetails.brand} ${carDetails.model}`}
              showArrows={true}
              showDots={true}
              autoPlay={false}
            />

            {/* Car Title and Basic Info */}
            <div className="space-y-6 text-primary mt-2">
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
              <label htmlFor="location">Delivery Location</label>
              <p className="text-xs -mt-2">* Charges may apply for delivery</p>
              <input
                type="text"
                id="location"
                name="location"
                className="border border-gray-300 rounded-lg p-2"
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
                isValid={(value) => {
                  if (value.match(/^[6-9]\d{9}$/)) {
                    return true;
                  } else return false;
                }}
              />
            </div>

            <div className="flex gap-4">
              <button
                className="bg-green-600 hover:bg-green-700 justify-center text-[14px] text-white py-3 px-4 rounded-lg mx-auto mt-4 cursor-pointer flex items-center gap-2 transition-colors"
                type="submit"
                onClick={() => setSubmitSource("whatsapp")}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Book via WhatsApp
              </button>
              <button
                className="bg-primary justify-center text-[14px] text-white py-3 px-4 rounded-lg mx-auto mt-4 cursor-pointer"
                type="submit"
                onClick={() => setSubmitSource("callback")}
                disabled={emailLoading}
              >
                Request a callback
              </button>
            </div>

            {/* Loading State */}
            {emailLoading && (
              <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-blue-50 rounded-lg">
                <SpinLoader size={24} />
                <span className="text-blue-600 font-medium">Sending your booking inquiry...</span>
              </div>
            )}

            {/* Success Message */}
            {emailSuccess && (
              <div className="flex items-center gap-3 mt-6 p-4 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-green-600 font-medium">
                  Booking inquiry sent successfully! We'll contact you soon.
                </span>
              </div>
            )}
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
