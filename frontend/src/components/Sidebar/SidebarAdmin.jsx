import { NavLink } from "react-router-dom";
import {
  Home,
  Folder,
  LogOut,
  Menu,
  X,
  UserRound,
  HeartIcon,
  LayoutDashboard,
  FilePlus,
  FileText,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <aside className="bg-white hidden lg:flex fixed left-0 h-131  w-62 flex-col justify-between z-40">
        <div>
          {/* Logo */}
          <div className="border-b border-gray-200">
            <Link to="/">
              <h1 className="flex gap-2 text-2xl text-center font-bold text-blue-600 m-7">
                <HeartIcon className="h-8 w-8 text-blue-600" /> Aidly Admin
              </h1>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-5">
              <li>
                <NavLink
                  to="/admin/home"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <LayoutDashboard size={18} className="mr-3" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/all-campaigns"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <FileText size={18} className="mr-3" />
                  <span>Campaigns</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full mt-73 flex items-center gap-3 p-3 text-red-600 dark:text-red-400 rounded hover:bg-white dark:hover:bg-gray-800 cursor-pointer"
            >
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
