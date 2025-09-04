import { Badge } from "@mantine/core";

import { Link } from "react-router-dom";
import Stars from "../layouts/stars";
import clsx from "clsx";

export default function ProductCard({ product, i, className }) {
  return (
    <Link
      className={clsx(
        "custom-transition group w-full rounded-2xl hover:border-gray-400 hover:shadow-lg",
        className,
      )}
      to={`/products/${product.id}`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-80 w-full object-cover"
      />
      <div className="p-2 group-hover:bg-gray-50">
        <Badge color={product.category === "fruits" ? "orange" : "green"}>
          {product.category}
        </Badge>
        <h6 className="custom-transition mt-2 h-14 group-hover:text-blue-700">
          {product.title}
        </h6>
        <Stars className="mt-1" number={i} />
        <h5 className="mt-2">NPR. {product.price}</h5>
      </div>
    </Link>
  );
}
