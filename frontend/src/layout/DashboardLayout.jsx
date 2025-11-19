import { lazy, Suspense } from "react";
import Preloader from "../components/Preloader";

const SidebarCreator = lazy(() =>
  import("../components/Sidebar/SidebarCreator")
);
const SidebarAdmin = lazy(() => import("../components/Sidebar/SidebarAdmin"));

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  // To test, switch between "creator" and "admin" by commenting/uncommenting below
  // const role = "creator";
  const role = "admin";
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="lg:pl-62 lg:block shrink-0">
          <Suspense fallback={<Preloader />}>
            {role === "creator" ? <SidebarCreator /> : <SidebarAdmin />}
          </Suspense>
        </div>

        {/* Scrollable Main Section */}
        <main className="flex-1 p-10  bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
