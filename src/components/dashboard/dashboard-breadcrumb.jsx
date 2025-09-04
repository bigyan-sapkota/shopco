import { Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export function DashboardBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const items = pathnames.map((name, index) => {
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    const to = "/" + pathnames.slice(0, index + 1).join("/");

    if (index === pathnames.length - 1) {
      return <Text key={to}>{displayName}</Text>;
    }

    return (
      <Link key={to} to={to} className="text-blue-600 hover:underline">
        {displayName}
      </Link>
    );
  });

  return (
    <div className="px-6 py-4">
      <div>{items}</div>
    </div>
  );
}
