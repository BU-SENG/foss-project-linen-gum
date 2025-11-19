import { lazy, Suspense } from "react";
import Preloader from "../components/Preloader";
import { useSelector } from "react-redux";

const SidebarCreator = lazy(() =>
  import("../components/Sidebar/SidebarCreator")
);
const SidebarAdmin = lazy(() => import("../components/Sidebar/SidebarAdmin"));

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="lg:pl-62 lg:block shrink-0">
          <Suspense fallback={<Preloader />}>
            {userRole === "creator" ? <SidebarCreator /> : <SidebarAdmin />}
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
