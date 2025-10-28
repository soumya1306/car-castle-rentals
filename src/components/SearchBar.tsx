import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search by model" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
      <FiSearch className="text-gray-400 w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        className=" w-full h-full outline-none text-gray-500"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FiFilter className="text-gray-400 w-5 h-5 ml-auto" />
    </div>
  );
};

export default SearchBar;
