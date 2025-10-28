"use client";

import Image from "next/image";
import Link from "next/link";
import { LuCar, LuFuel, LuMapPin, LuUsers } from "react-icons/lu";

import { Car } from "@/types/car";



interface CarCardProps {
  car: Car;
  type: "premium" | "regular" | "luxury";
}

export default function CarCard({ car, type }: CarCardProps) {

  return (
    <Link
      href={type === "premium" ? `/prem-cars/${car._id}` : `/reg-cars/${car._id}`}
      className="rounded-xl w-90 shadow-lg bg-white hover:-translate-y-1 overflow-hidden transition-transform duration-400 cursor-pointer flex flex-col gap-2"
    >
      <div className="relative w-full h-48 mb-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${car.imageArray[0].split("/").pop()}`}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover rounded w-full h-full transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority={false}
        />
        {car.isAvailable ? (
          <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Available
          </span>
        ) : (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Not Available
          </span>
        )}

        <div className="absolute bottom-4 right-4 bg-primary/50 text-white backdrop-blur-sm font-medium px-2 py-1 rounded-lg">
          <span>₹ {car.pricePerDay} </span>
          <span>/day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-medium">
              {car.brand} • {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-gray-700">
          <div className="flex items-center  text-muted-foreground">
            <LuUsers className="inline-block mr-1 "></LuUsers>
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center  text-muted-foreground">
            <LuFuel className="inline-block mr-1 "></LuFuel>
            <span>{car.fuel_type} </span>
          </div>

          <div className="flex items-center  text-muted-foreground">
            <LuCar className="inline-block mr-1 "></LuCar>
            <span>{car.transmission} </span>
          </div>

          <div className="flex items-center  text-muted-foreground">
            <LuMapPin className="inline-block mr-1 "></LuMapPin>
            <span>{car.location} </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
