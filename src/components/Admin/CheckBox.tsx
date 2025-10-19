import React from "react";

const CheckBox = ({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) => {
  return (
    <div className="flex flex-wrap items-end gap-6 md:gap-14 text-primary/60">
      <label className="flex gap-3 items-center cursor-pointer relative">
        <input id={id} name={name} type="checkbox" className="hidden peer" />
        <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:text-primary/60"></span>
        <svg
          className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z"
            fill="#2563EB"
            stroke="#2563EB"
            strokeWidth=".4"
          />
        </svg>
        <span className="text-gray-700 select-none">{label}</span>
      </label>
    </div>
  );
};

export default CheckBox;
