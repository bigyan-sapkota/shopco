import React from "react";

export default function ProductsFilter({
  tempFilters,
  handleApplyFilters,
  handleTempFilterChange,
  handleResetFilters,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Category Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={tempFilters.category}
            onChange={(e) => handleTempFilterChange("category", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Min Price (NPR)
          </label>
          <input
            type="number"
            placeholder="0"
            value={tempFilters.price_gte}
            onChange={(e) =>
              handleTempFilterChange("price_gte", e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Max Price (NPR)
          </label>
          <input
            type="number"
            placeholder="1000"
            value={tempFilters.price_lte}
            onChange={(e) =>
              handleTempFilterChange("price_lte", e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleApplyFilters}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
