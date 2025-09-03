import { NavLink } from "react-router-dom";
import { FaHome, FaListUl } from "react-icons/fa";

const menuItems = [
  { id: 1, label: "Home", icon: <FaHome size={16} />, path: "/dashboard" },
  {
    id: 2,
    label: "Products",
    icon: <FaListUl size={16} />,
    path: "/dashboard/products",
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-gray-200 bg-white text-black">
      {/* Logo / Title */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <h3 className="font-bold">SHOP.CO</h3>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? "bg-gray-200 font-semibold text-black"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
