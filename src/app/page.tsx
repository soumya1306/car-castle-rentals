import Image from "next/image";

import mainCar from "@/assets/main_car.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-2xl  ">Find your favourite car</p>
      <Image
        className="w-200 h-auto"
        src={mainCar}
        alt="Car Castle Logo"
      />
    </div>
  );  
}
