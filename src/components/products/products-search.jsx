import React from "react";
import { MdSearch } from "react-icons/md";

export default function ProductsSearch({ searchQuery, handleSearchChange }) {
  return (
    <div className="relative">
      <MdSearch
        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
