import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import UserMenu from "./menus/user-menu";

export default function Navbar() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  return (
    <nav className="max-width padding-x flex h-20 items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setIsNavBarVisible(true)}>
          <RxHamburgerMenu size={26} />
        </button>

        <h2 className="text-2xl font-bold lg:text-4xl">SHOP.CO</h2>
      </div>

      <div className="hidden gap-6 lg:flex">
        {navigationLinks.map((link) => (
          <Link key={link.id} className="hover:text-blue-700" to={link.route}>
            {link.text}
          </Link>
        ))}
      </div>

      <SearchBox className="hidden lg:block" />

      <div className="flex items-center gap-4 lg:gap-2">
        <IoSearchOutline className="lg:hidden" size={26} />

        <UserMenu>
          <FaRegCircleUser
            size={24}
            className="custom-transition cursor-pointer hover:text-blue-600"
          />
        </UserMenu>
      </div>

      {isNavBarVisible && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="bg-opacity-40 flex-1 bg-black"
            onClick={() => setIsNavBarVisible(false)}
          ></div>

          <div className="w-64 bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">SHOP.CO</h2>
              <button onClick={() => setIsNavBarVisible(false)}>
                <IoClose size={26} />
              </button>
            </div>

            <SearchBox className="mb-6" />

            <div className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.route}
                  onClick={() => setIsNavBarVisible(false)}
                  className="text-lg hover:text-blue-600"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const navigationLinks = [
  { id: 1, text: "Products", route: "/products" },
  { id: 2, text: "On Sale", route: "/on-sale" },
  { id: 3, text: "About Us", route: "/about-us" },
  { id: 4, text: "Blogs", route: "/blogs" },
];

const SearchBox = ({ className = "" }) => {
  return (
    <div
      className={`relative h-10 w-full max-w-xs rounded-4xl bg-gray-200 ${className}`}
    >
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
