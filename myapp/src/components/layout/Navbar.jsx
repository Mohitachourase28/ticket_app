import { Bell, Menu } from "lucide-react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = ({ user, toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border border-gray-300 bg-white">
      <div className="flex items-center gap-4">
  <button onClick={toggleSidebar} className="md:hidden">
    <Menu className="w-5 h-5" />
  </button>

  {/* <div className="flex flex-grow">
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button className="bg-blue-500 text-white  px-4 py-2 text-sm rounded-r-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
      Search
    </button>
  </div> */}
</div>


      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600" />
        {/* <button className="bg-blue-600 text-white font-bold px-3 py-1 rounded flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span className="text-sm hidden sm:block">Create Ticket</span>
        </button> */}
        <div className="flex items-center gap-2">
          <img
            src="https://avatar.iran.liara.run/public/boy"
            alt="user"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="text-sm">{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white font-bold  px-4 py-2 text-sm rounded hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
