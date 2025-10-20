import { useState } from "react";

export default function ToggleButton({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
    const [checked, setChecked] = useState<boolean>(enabled);
    const handleChange = () => {
        setChecked(!checked);
        onToggle();
    }
  return (
    <button
      onClick={handleChange}
      className={`
        relative overflow-hidden px-2 rounded-xl text-[14px]
        transition-all duration-500 ease-in-out transform
        ${checked 
          ? 'bg-green-600/20 scale-105 mr-5' 
          : ' bg-red-600/20 scale-100'
        }
      `}
    >
      {/* Background slide effect */}
      <div
        className={`
          absolute inset-0 bg-white opacity-20
          transition-transform duration-400 ease-in-out
          ${checked ? 'translate-x-0' : '-translate-x-full'}
        `}
      />
      
      {/* Text with fade transition */}
      <span className="relative z-10 transition-all duration-300">
        {checked ? 'Available' : 'Unavailable'}
      </span>
    </button>
  );
}
