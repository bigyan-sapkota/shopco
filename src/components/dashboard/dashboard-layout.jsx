import { Outlet } from "react-router-dom";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({ title }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-2">
          <h5 className="mt-2">{title}</h5>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
