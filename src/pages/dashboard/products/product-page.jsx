import {
  Avatar,
  Badge,
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../hooks/use-debounce";
import { useProducts } from "../../../queries/use-products";
import DashboardHeader from "../../../components/dashboard/dashboard-header";
import { DashboardBreadCrumbs } from "../../../components/dashboard/dashboard-breadcrumb";

// Main Product Page Component
export default function DashboardProductPage() {
  const [cursor, setCursor] = useState(undefined);
  const [cursorHistory, setCursorHistory] = useState([undefined]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    owner: "",
    sort: "recent",
    price_gte: "",
    price_lte: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedFilters = useDebounce(filters, 500);

  const { data, isLoading } = useProducts(
    cursor,
    debouncedSearch,
    debouncedFilters,
  );

  const handleNext = () => {
    if (data?.cursor) {
      setCursorHistory((prev) => [...prev, data.cursor]);
      setCursor(data.cursor);
    }
  };

  const handlePrev = () => {
    if (cursorHistory.length > 1) {
      const newHistory = [...cursorHistory];
      newHistory.pop();
      const prevCursor = newHistory[newHistory.length - 1];
      setCursorHistory(newHistory);
      setCursor(prevCursor);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      owner: "",
      sort: "recent",
      price_gte: "",
      price_lte: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== "recent",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardBreadCrumbs />

      <section className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Products</h1>

          <div className="flex gap-2">
            <Button
              variant={showFilters ? "filled" : "outline"}
              leftSection={<FaFilter />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters{" "}
              {hasActiveFilters && (
                <Badge ml={5} circle>
                  {
                    Object.values(filters).filter((v) => v && v !== "recent")
                      .length
                  }
                </Badge>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="subtle"
                onClick={resetFilters}
                rightSection={<FaTimes />}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TextInput
            placeholder="Search products by title, description, or owner..."
            icon={<FaSearch />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {showFilters && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Select
                label="Category"
                placeholder="Select category"
                value={filters.category}
                onChange={(value) => handleFilterChange("category", value)}
                data={[
                  { value: "fruits", label: "Fruits" },
                  { value: "vegetables", label: "Vegetables" },
                  { value: "dairy", label: "Dairy" },
                  { value: "meat", label: "Meat" },
                ]}
                clearable
              />

              <TextInput
                label="Owner"
                placeholder="Filter by owner"
                value={filters.owner}
                onChange={(e) => handleFilterChange("owner", e.target.value)}
              />

              <Select
                label="Sort By"
                value={filters.sort}
                onChange={(value) => handleFilterChange("sort", value)}
                data={[
                  { value: "recent", label: "Most Recent" },
                  { value: "price_asc", label: "Price: Low to High" },
                  { value: "price_desc", label: "Price: High to Low" },
                  { value: "name", label: "Name" },
                ]}
              />

              <div className="flex gap-2">
                <NumberInput
                  label="Min Price"
                  placeholder="0"
                  value={filters.price_gte}
                  onChange={(value) => handleFilterChange("price_gte", value)}
                  min={0}
                  className="flex-1"
                />

                <NumberInput
                  label="Max Price"
                  placeholder="100"
                  value={filters.price_lte}
                  onChange={(value) => handleFilterChange("price_lte", value)}
                  min={0}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="relative rounded-lg bg-white shadow-lg">
          <LoadingOverlay visible={isLoading} overlayBlur={2} />

          <ScrollArea>
            <Table highlightOnHover striped verticalSpacing="sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.products && data.products.length > 0 ? (
                  data.products.map((element) => (
                    <tr key={element.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4">
                        <p className="max-w-xs font-medium">{element.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={element.image}
                          alt="product"
                          className="h-12 w-12 rounded-full object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          color={
                            element.category === "fruits"
                              ? "orange"
                              : element.category === "vegetables"
                                ? "green"
                                : element.category === "dairy"
                                  ? "blue"
                                  : "red"
                          }
                        >
                          {element.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge color={element.stock > 10 ? "green" : "red"}>
                          {element.stock} in stock
                        </Badge>
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        NPR {element.price}
                        {element.discount > 0 && (
                          <Text size="xs" color="dimmed" td="line-through">
                            NPR{" "}
                            {Math.round(
                              element.price * (1 + element.discount / 100),
                            )}
                          </Text>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/products/${element.id}`}
                            className="flex items-center gap-1 rounded-md px-3 py-1 text-blue-700 transition hover:bg-blue-50"
                          >
                            <FaEye size={12} />
                            View
                          </Link>
                          <Link
                            to={`/dashboard/products/${element.id}`}
                            className="flex items-center gap-1 rounded-md px-3 py-1 text-orange-500 transition hover:bg-orange-50"
                          >
                            <FaEdit size={12} />
                            Edit
                          </Link>
                          <Button
                            variant="subtle"
                            color="red"
                            leftIcon={<FaTrash size={12} />}
                            size="xs"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      <Text size="lg" color="dimmed">
                        No products found
                      </Text>
                      <Text size="sm" color="dimmed" mt={4}>
                        Try adjusting your search or filters
                      </Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </div>

        {/* Pagination */}
        {data?.products && data.products.length > 0 && (
          <Group justify="center" mt="xl">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={cursorHistory.length <= 1}
            >
              Previous
            </Button>
            <Button
              variant="filled"
              onClick={handleNext}
              disabled={!data?.cursor}
            >
              Next
            </Button>
          </Group>
        )}
      </section>
    </div>
  );
}
