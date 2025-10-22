import Image from "next/image";

import mainCar from "@/assets/main_car.png";
import FeaturedSection from "@/components/FeaturedSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="xl:text-2xl 2xl:text-3xl mb-10 mt-20 sm:mt-40">Your holiday ride awaits—book a car today!</p>
      <Image
        className="xl:w-200 2xl:w-270 h-auto"
        src={mainCar}
        alt="Car Castle Logo"
      />
      <FeaturedSection />
    </div>
  );
}
