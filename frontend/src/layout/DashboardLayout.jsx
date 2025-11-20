import { lazy, Suspense, useState } from "react";
import Preloader from "../components/Preloader";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

const SidebarCreator = lazy(() =>
  import("../components/Sidebar/SidebarCreator")
);
const SidebarAdmin = lazy(() => import("../components/Sidebar/SidebarAdmin"));

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="lg:pl-62 lg:block shrink-0">
          <Suspense fallback={<Preloader />}>
            {userRole === "creator" ? <SidebarCreator /> : <SidebarAdmin />}
          </Suspense>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <div className="relative w-64  ">
              <Suspense fallback={<Preloader />}>
                {userRole === "creator" ? (
                  <SidebarCreator />
                ) : (
                  <SidebarAdmin isMobile setIsOpen={setSidebarOpen} />
                )}
              </Suspense>
            </div>
          </div>
        )}

        {/* Scrollable Main Section */}
        <main className="flex-1 p-10  bg-gray-100 overflow-y-auto">
          {/* Mobile Menu Toggle Button */}
          {/* Mobile Menu Toggle Button: hide if sidebar is open */}
          {!sidebarOpen && (
            <button
              className="lg:hidden fixed top-3 left-4 bg-gray-700 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-gray-300 rounded-full p-3 shadow-md cursor-pointer z-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="text-white dark:text-gray-800 w-6 h-6" />
            </button>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
