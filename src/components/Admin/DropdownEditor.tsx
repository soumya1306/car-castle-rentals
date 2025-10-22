import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function DropdownEditor({
  id,
  currentValue,
  onSelect,
}: {
  id:string,
  currentValue: string;
  onSelect: (_id: string, value: "regular" | "premium" | "luxury") => void;
}) {
  const [selectedValue, setSelectedValue] = useState<string>(currentValue);
  const handleChange = (value: string) => {
    setSelectedValue(value);
    onSelect(id, value as "regular" | "premium" | "luxury");
  };
  return (
    <div className="relative flex w-full">
      <select
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full appearance-none bg-transparent border border-gray-300 rounded pl-1 cursor-pointer"
      >
        <option value="regular">Regular</option>
        <option value="premium">Premium</option>
      </select>

      <LuChevronDown
        size={18}
        className="absolute right-0 inline mt-1 text-primary/50 cursor-pointer"
      />
    </div>
  );
}
