import { navItems } from "../../routes/navConfig.js";
import * as Icons from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import PropTypes from "prop-types";
// import { useEffect } from "react";

const Sidebar = ({ isMobile, toggleSidebar }) => {
  const { userRole, loading } = useAuth();
  const location = useLocation();

  // useEffect(() => {
  //   // console.log("Sidebar loaded");
  //   // console.log("userRole from context:", userRole);
  //   // console.log("navItems:", navItems);
  // }, [userRole]);

  if (loading || !userRole) {
    return <div className="p-4">Loading menu...</div>; // show loading while fetching auth state
  }

  const items = navItems[userRole] || [];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-white border border-gray-300 h-full ${
        isMobile
          ? "w-64 fixed z-40 top-0 left-0 shadow-lg"
          : "w-64 hidden md:block"
      }`}
    >
      <div className="p-4 text-xl font-bold flex justify-between items-center">
        SupportHub
        {isMobile && (
          <button onClick={toggleSidebar} className="md:hidden">
            ✕
          </button>
        )}
      </div>

      <nav className="space-y-2 p-4">
        {items.map(({ label, icon, path }) => {
          const Icon = Icons[icon];
          return (
            <Link
              key={label}
              to={path}
              onClick={isMobile ? toggleSidebar : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(path)
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isMobile: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
