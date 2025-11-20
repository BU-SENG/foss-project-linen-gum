import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, FileText, LogOut, X, HeartIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../../api";

export default function SidebarAdmin({ isMobile = false, setIsOpen }) {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await toast.promise(logoutUser(), {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: (err) => err.message || "Logout failed",
      });

      dispatch(logout());
      if (isMobile && setIsOpen) setIsOpen(false);
    } catch (err) {
      console.error(err);
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

  // Mobile Sidebar with animation
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
              className="fixed left-0 top-0 h-full w-64 bg-white  flex flex-col justify-between z-50"
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
                      Admin
                    </h1>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-5">
                    <li>
                      <NavLink
                        to="/admin/home"
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
                        to="/admin/all-campaigns"
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
                        <span>Campaigns</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-red-600 dark:text-red-400 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <LogOut className="w-6 h-6" /> <span>Logout</span>
                </button>
              </div>
            </motion.aside>

            {/* Close Button - outside the sidebar */}
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

  // Large screen Sidebar
  return (
    <aside className="bg-white hidden lg:flex fixed left-0 h-131 w-62 flex-col justify-between z-40">
      <div>
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
                <LayoutDashboard size={18} className="mr-3" />{" "}
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
                <FileText size={18} className="mr-3" /> <span>Campaigns</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full mt-73 flex items-center gap-3 p-3 text-red-600 dark:text-red-400 rounded hover:bg-gray-50 cursor-pointer"
          >
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
