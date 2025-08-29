import { useCallback, useEffect, useState } from "react";
import { MdSearch, MdTune } from "react-icons/md";
import ProductCard from "../components/cards/product-card";
import { useDebounce } from "../hooks/use-debounce";
import { useInfiniteProducts } from "../queries/use-infinite-products";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    sort: "recent",
    price_gte: "",
    price_lte: "",
  });
  const [tempFilters, setTempFilters] = useState({
    category: "",
    sort: "recent",
    price_gte: "",
    price_lte: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Debounce only the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Combine search and applied filters for the API call
  const queryParams = {
    q: debouncedSearchQuery,
    ...appliedFilters,
    limit: 20,
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts(queryParams);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle temporary filter changes (not applied immediately)
  const handleTempFilterChange = useCallback((filterType, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  // Handle sort change (apply immediately)
  const handleSortChange = useCallback((value) => {
    setAppliedFilters((prev) => ({
      ...prev,
      sort: value,
    }));
    setTempFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  }, []);

  // Apply filters when button is clicked
  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(tempFilters);
  }, [tempFilters]);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    const resetState = {
      category: "",
      sort: "recent",
      price_gte: "",
      price_lte: "",
    };
    setAppliedFilters(resetState);
    setTempFilters(resetState);
    setSearchQuery("");
  }, []);

  // Load more products when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 1000 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Get all products from all pages
  const allProducts = data?.pages.flatMap((page) => page.products || []) || [];
  const totalProducts = allProducts.length;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Casual</h1>
        <p className="text-gray-600">
          Showing 1-{allProducts.length} of {totalProducts} Products
          {debouncedSearchQuery && (
            <span className="ml-2">• Results for "{debouncedSearchQuery}"</span>
          )}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
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

        {/* Filter Toggle and Sort */}
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={tempFilters.category}
                  onChange={(e) =>
                    handleTempFilterChange("category", e.target.value)
                  }
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
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} i={index} />
        ))}
      </div>

      {/* No Products Found */}
      {allProducts.length === 0 && !isLoading && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">No products found</p>
          <p className="mt-2 text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Load More Button/Loading */}
      {hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}

      {/* Loading indicator for infinite scroll */}
      {isFetchingNextPage && (
        <div className="py-4 text-center">
          <div className="text-gray-500">Loading more products...</div>
        </div>
      )}
    </div>
  );
}
