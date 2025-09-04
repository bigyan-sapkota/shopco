import clsx from "clsx";
import { MdOutlineStar } from "react-icons/md";

export default function Stars({ number = 3, className }) {
  const createArrayOfNumber = (number) => new Array(number).fill(" ");

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {createArrayOfNumber(number % 5).map((_, i) => (
        <MdOutlineStar key={i} className="text-yellow-400" size={20} />
      ))}
      {createArrayOfNumber(5 - (number % 5)).map((_, i) => (
        <MdOutlineStar key={i} className="text-gray-300" size={20} />
      ))}
    </div>
  );
}
