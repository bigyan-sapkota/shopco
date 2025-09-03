import { Table } from "@mantine/core";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useProducts } from "../../../queries/use-products";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function DashboardProductPage() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error loading dashboard...</h1>;

  return (
    <section>
      <Table
        highlightOnHover
        className="mt-6 overflow-hidden rounded-lg bg-white shadow-lg"
      >
        <Table.Thead className="bg-gray-100">
          <Table.Tr>
            <Table.Th className="px-6 py-3 text-left">Title</Table.Th>
            <Table.Th className="px-6 py-3 text-left">Image</Table.Th>
            <Table.Th className="px-6 py-3 text-left">Category</Table.Th>
            <Table.Th className="px-6 py-3 text-left">Price</Table.Th>
            <Table.Th className="px-6 py-3 text-left">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.products.map((element) => (
            <Table.Tr key={element.id} className="border-b last:border-b-0">
              <Table.Td className="px-6 py-4">
                <p className="max-w-xs truncate font-medium">{element.title}</p>
              </Table.Td>
              <Table.Td className="px-6 py-4">
                <img
                  src={element.image}
                  alt="product-image"
                  className="size-14 rounded-full object-cover shadow-sm"
                />
              </Table.Td>
              <Table.Td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    element.category === "fruits"
                      ? "bg-orange-400"
                      : "bg-green-600"
                  }`}
                >
                  {element.category}
                </span>
              </Table.Td>
              <Table.Td className="px-6 py-4 font-semibold">
                NPR {element.price}
              </Table.Td>
              <Table.Td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link
                    to="/"
                    className="flex items-center gap-1 rounded-md px-3 py-1 font-medium text-blue-700 transition hover:bg-blue-50"
                  >
                    <FaEye />
                    View
                  </Link>
                  <Link
                    to={`/dashboard/products/${element.id}`}
                    className="flex items-center gap-1 rounded-md px-3 py-1 font-medium text-orange-500 transition hover:bg-orange-50"
                  >
                    <FaEdit />
                    Update
                  </Link>
                  <Link className="flex items-center gap-1 rounded-md px-3 py-1 font-medium text-red-700 transition hover:bg-red-50">
                    <FaTrash />
                    Delete
                  </Link>
                </div>{" "}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </section>
  );
}
