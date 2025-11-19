import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated → go to sign in
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If user exists but email not verified → redirect to verify page
  // Skip verification check for admin
  if (user && user.role !== "admin" && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // If role not allowed → go to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If okay → render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
