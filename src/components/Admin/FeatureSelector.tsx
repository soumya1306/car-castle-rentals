"use client";

import { useState } from "react";
import { LuX, LuPlus } from "react-icons/lu";

export default function FeatureSelector() {
  const predefinedFeatures = [
    "Bluetooth Connectivity",
    "GPS Navigation",
    "Sunroof",
    "Heated Seats",
  ];

  const [allFeatures, setAllFeatures] = useState([...predefinedFeatures]);
  const [customFeature, setCustomFeature] = useState("");

  const addCustomFeature = () => {
    if (customFeature.trim() && !allFeatures.includes(customFeature.trim())) {
      const newFeature = customFeature.trim();
      setAllFeatures((prev) => [...prev, newFeature]);
      setCustomFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setAllFeatures((prev) => prev.filter((f) => f !== feature));
  };

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
            {allFeatures.map((feature) => (
              <button
                key={feature}
                className="px-2 py-1 rounded-full text-[12px] font-medium transition-all duration-200 flex items-center text-primary/70 border-1 border-primary/30"
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
              placeholder="Enter custom feature name..."
              className="px-3 w-full py-2 border border-gray-300 focus:border-primary/50 rounded-md outline-none"
            />
            <button
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
