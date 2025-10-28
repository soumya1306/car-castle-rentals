"use client";

import { useEffect, useState } from "react";
import { LuX, LuPlus } from "react-icons/lu";

export default function FeatureSelector({features, setFeatures}: {features: string[]; setFeatures: React.Dispatch<React.SetStateAction<string[]>>}) {
  const predefinedFeatures = [
    "Bluetooth Connectivity",
    "GPS Navigation",
    "Sunroof",
    "Heated Seats",
  ];

  // const [allFeatures, setAllFeatures] = useState([...predefinedFeatures]);
  const [customFeature, setCustomFeature] = useState("");

  const addCustomFeature = () => {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      const newFeature = customFeature.trim();
      setFeatures((prev) => [...prev, newFeature]);
      setCustomFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
  };

  useEffect(() => {
    setFeatures(predefinedFeatures);
  }, []);

  return (
    <div className="">
      <div className="">
        <h1 className="mb-2">
          Select Features
        </h1>
        <p className="text-sm text-primary/50 mb-2">
          All features are included by default. Remove any you don&apos;t need or add
          custom ones.
        </p>

        {/* All Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {features.map((feature) => (
              <button
                key={feature}
                type="button"
                className="px-2 py-1 rounded-full text-[12px] bg-white font-medium transition-all duration-200 flex items-center text-primary/70 border-1 border-primary/30"
              >
                {feature}
                <LuX
                  size={14}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFeature(feature);
                  }}
                  className="hover:text-red-300 ml-1 cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Feature */}
        <div>
          <div className="flex relative">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomFeature();
                }
              }}
              placeholder="Enter custom feature name..."
              className="px-3 w-full py-2 border bg-white border-gray-300 focus:border-primary/50 rounded-md outline-none"
            />
            <button
              type="button"
              onClick={addCustomFeature}
              className="bg-primary text-white rounded-r-lg h-full px-2 flex items-center absolute right-0"
            >
              <LuPlus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
