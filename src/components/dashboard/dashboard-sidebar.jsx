import { useState } from "react";
import { FaHome, FaUsers, FaChartBar, FaCog } from "react-icons/fa";

const menuItems = [
  { id: 1, label: "Products", icon: <FaHome size={16} />, path: "/home" },
];

export default function DashboardSidebar() {
  const [active, setActive] = useState(1);

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-gray-200 bg-white text-black">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <h3 className="font-bold">SHOP.CO</h3>
      </div>
      <nav className="mt-4 flex-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex cursor-pointer items-center gap-3 px-6 py-3 transition-colors ${active === item.id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} `}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
