import { useState } from "react";

export default function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
    const [checked, setChecked] = useState<boolean>(enabled);
    const handleChange = () => {
        setChecked(!checked);
        onToggle();
    }
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
        />
        <div className="w-[34px] h-[18px] bg-slate-300 rounded-full peer peer-checked:bg-primary/70 transition-colors duration-200"></div>
        <span className="dot absolute left-[1px] top-[1px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
      </label>
    </div>
  );
}
