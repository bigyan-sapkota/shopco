import { Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export function DashboardBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-1">
        {pathnames.map((name, index) => {
          const displayName = name.charAt(0).toUpperCase() + name.slice(1);
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          const isLast = index === pathnames.length - 1;

          return (
            <div key={to} className="flex items-center gap-1">
              {isLast ? (
                <Text>{displayName}</Text>
              ) : (
                <Link to={to} className="text-blue-600 hover:underline">
                  {displayName}
                </Link>
              )}

              {!isLast && <span className="text-gray-400">{">"}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
