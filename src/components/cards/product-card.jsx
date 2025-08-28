import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductCard({ product, i }) {
  const createArrayOfNumber = (number) => new Array(number).fill(" ");

  return (
    <Link
      className="custom-transition group w-1/4 rounded-2xl hover:border-gray-400 hover:shadow-lg"
      to={`/products/${product.id}`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-80 w-72 object-cover"
      />
      <div className="p-2 group-hover:bg-gray-50">
        <h6 className="custom-transition mt-2 h-14 group-hover:text-blue-700">
          {product.title}
        </h6>
        <div className="mt-1 flex items-center gap-1">
          {createArrayOfNumber(i % 5).map((_, i) => (
            <MdOutlineStar key={i} className="text-yellow-400" size={20} />
          ))}
          {createArrayOfNumber(5 - (i % 5)).map((_, i) => (
            <MdOutlineStar key={i} className="text-gray-300" size={20} />
          ))}
        </div>
        <h5 className="mt-2">NPR. {product.price}</h5>
      </div>
    </Link>
  );
}
