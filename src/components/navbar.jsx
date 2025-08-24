import { Link } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  return (
    <nav className="max-width padding-x flex h-20 items-center">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          {/* hamburger */}
          <button className="lg:hidden">
            <RxHamburgerMenu size={26} />
          </button>

          <h2 className="text-2xl font-bold lg:text-4xl">SHOP.CO</h2>
        </div>

        {/* navigation items */}

        <div className="fixed top-0 left-0 flex h-100 w-54 flex-col gap-6 bg-black text-white lg:static lg:h-auto lg:w-auto lg:flex-row lg:bg-transparent lg:text-black">
          {navigationLinks.map((link) => (
            <Link key={link.id} className="hover:text-blue-700" to={link.route}>
              {link.text}
            </Link>
          ))}
        </div>

        {/* search box */}
        <SearchBox />

        {/* cart and user icon */}
        <div className="flex items-center gap-4 lg:gap-2">
          <IoSearchOutline className="lg:hidden" size={26} />
          <IoCartOutline
            size={28}
            className="custom-transition cursor-pointer hover:text-blue-600"
          />
          <FaRegCircleUser
            size={24}
            className="custom-transition cursor-pointer hover:text-blue-600"
          />
        </div>
      </div>
    </nav>
  );
}

const navigationLinks = [
  { id: 1, text: "Products", route: "/products" },
  { id: 2, text: "On Sale", route: "/on-sale" },
  { id: 3, text: "About Us", route: "/about-us" },
  { id: 4, text: "Blogs", route: "/blogs" },
];

const SearchBox = () => {
  return (
    <div className="relative hidden h-10 w-120 rounded-4xl bg-gray-200 lg:block">
      <IoSearchOutline
        className="absolute top-2.5 left-3 text-gray-500"
        size={22}
      />

      <input
        type="text"
        className="h-full w-full rounded-4xl px-10 placeholder:text-gray-500"
        placeholder="Search for products..."
      />
    </div>
  );
};
