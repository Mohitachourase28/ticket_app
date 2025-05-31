// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "../components/common/Loading.jsx";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  // Show loading spinner while auth state is initializing
  if (loading) return <Loading />;

  // Redirect unauthenticated users to login
  if (!user) return <Navigate to="/login" />;

  // Redirect authenticated users without required role
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  // Allow access
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
