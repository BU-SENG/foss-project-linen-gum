import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Settings,
  LogOut,
  HeartIcon,
} from "lucide-react";
import { useState } from "react";

export default function SidebarApplicant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    e.preventDefault();
    //  Handle logout logic
  };

  return (
    <>
      {/* Sidebar (always visible on large screens) */}
      <aside className="bg-white hidden lg:flex fixed left-0 h-131 w-62 flex-col justify-between z-40">
        {/* Logo */}
        <div className="border-b border-gray-200">
          <Link to="/">
            <h1 className="flex gap-2 text-2xl text-center font-bold text-blue-600 m-7">
              <HeartIcon className="h-8 w-8 text-blue-600" /> Aidly Creator
            </h1>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-5">
            <li>
              <Link
                to="/creator/dashboard"
                className="flex items-center px-4 py-2 text-gray-900 bg-blue-50 rounded-md"
              >
                <LayoutDashboard size={18} className="mr-3 text-blue-600" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/creator/dashboard/my-campaigns"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                <FileText size={18} className="mr-3" />
                <span>My Campaigns</span>
              </Link>
            </li>
            <li>
              <Link
                to="/creator/dashboard/create-campaign"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                <FilePlus size={18} className="mr-3" />
                <span>Create Campaign</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full mt-55 flex items-center gap-3 p-3 text-red-600 dark:text-red-400 rounded hover:bg-white dark:hover:bg-gray-800 cursor-pointer"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
