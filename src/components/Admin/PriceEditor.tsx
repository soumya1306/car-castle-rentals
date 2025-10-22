import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";
import { Car } from "@/types/car";

type PriceEditorProps = {
  isPriceEditorMode: boolean;
  setIsPriceEditorMode: (mode: boolean) => void;
  car: Car;
  handleCarPriceUpdate: (carId: string, newPrice: string) => void;
};

const PriceEditor = ({
  isPriceEditorMode,
  setIsPriceEditorMode,
  car,
  handleCarPriceUpdate,
}: PriceEditorProps) => {
    const [newPrice, setNewPrice] = useState<string>(car.pricePerDay.toString());
    const handlePriceChange = (id:string, price:string) => {
        setNewPrice(price);
        handleCarPriceUpdate(car._id!, newPrice)

    }
  return (
    <>
      {isPriceEditorMode ? (
        <div className="flex ">
          <input
            type="text"
            defaultValue={"₹ " + newPrice.split(" ").pop()}
            className="w-18 px-2 border border-gray-300 rounded-md outline-none"
            onChange={(e) => {
              setNewPrice(e.target.value);
            }}
          />
          <button
            className=""
            onClick={() => handlePriceChange(car._id!, newPrice)}
          >
            <LuCheck
              size={18}
              className=" ml-2 inline text-primary/50 cursor-pointer"
            />
          </button>
        </div>
      ) : (
        <div className="flex">
          <span className="w-21">{"₹ " + newPrice.split(" ").pop()}</span>
          <button onClick={() => setIsPriceEditorMode(true)}>
            <LuPencil
              size={14}
              className="inline -mt-0.5 text-primary/70 cursor-pointer"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default PriceEditor;
