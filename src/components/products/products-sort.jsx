import React from "react";
import { MdTune } from "react-icons/md";

export default function ProductsSort({
  showFilters,
  setShowFilters,
  appliedFilters,
  handleSortChange,
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
      >
        <MdTune size={20} />
        Filters
      </button>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={appliedFilters.sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="title_asc">Name A-Z</option>
          <option value="title_desc">Name Z-A</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
        </select>
      </div>
    </div>
  );
}
