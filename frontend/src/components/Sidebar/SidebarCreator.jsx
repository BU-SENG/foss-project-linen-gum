import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Settings,
  LogOut,
  X,
  HeartIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { logoutUser } from "../../api";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function SidebarCreator({ isMobile = false, setIsOpen }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await toast.promise(logoutUser(), {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: (err) => err.message || "Logout failed. Try again.",
      });

      // Clear Redux auth state
      dispatch(logout());

      // Redirect to signin page
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
      // toast already handled in toast.promise
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Lock body scroll on mobile sidebar open
  useEffect(() => {
    if (isMobile && setIsOpen) {
      document.body.classList.add("overflow-hidden");
      return () => document.body.classList.remove("overflow-hidden");
    }
  }, [isMobile, setIsOpen]);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {setIsOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar Panel */}
            <motion.aside
              className="fixed left-0 top-0 h-full w-64 bg-white  shadow-md flex flex-col justify-between z-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              transition={{ duration: 0.3 }}
            >
              <div>
                {/* Logo */}
                <div className="border-b border-gray-200">
                  <Link to="/">
                    <h1 className="flex gap-2 text-2xl text-center font-bold text-blue-600 m-7">
                      <HeartIcon className="h-8 w-8 text-blue-600" /> Aidly
                      Creator
                    </h1>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-5">
                    <li>
                      <NavLink
                        to="/creator/home"
                        onClick={() => setIsOpen(false)}
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
                        to="/creator/my-campaigns"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-md ${
                            isActive
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                      >
                        <FileText size={18} className="mr-3" />
                        <span>My Campaigns</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/creator/create-campaign"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-md ${
                            isActive
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                      >
                        <FilePlus size={18} className="mr-3" />
                        <span>Create Campaign</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Logout */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-gray-50 rounded   cursor-pointer"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>

            {/* Close button outside the sidebar */}
            <button
              onClick={() => setIsOpen(false)}
              className="fixed top-6 left-64 bg-gray-700 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-gray-300 rounded-full p-2 shadow-md z-50"
            >
              <X className="w-6 h-6 text-white dark:text-gray-800" />
            </button>
          </>
        )}
      </AnimatePresence>
    );
  }

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
              <NavLink
                to="/creator/home"
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
                to="/creator/my-campaigns"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <FileText size={18} className="mr-3" />
                <span>My Campaigns</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/creator/create-campaign"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <FilePlus size={18} className="mr-3" />
                <span>Create Campaign</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full mt-55 flex items-center gap-3 p-3 text-red-600  rounded hover:bg-gray-50  cursor-pointer"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
