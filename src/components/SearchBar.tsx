import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="flex items-center justify-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
      <FiSearch className="text-gray-400 w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="Search by model"
        className=" w-full h-full outline-none text-gray-500"
        onClick={(e) => setSearchTerm(e.currentTarget.value)}
      />
      <FiFilter className="text-gray-400 w-5 h-5 ml-auto" />
    </div>
  );
};

export default SearchBar;
