import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <div>Please log in</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {mobileOpen && (
        <Sidebar
          role={user.role}
          isMobile={true}
          toggleSidebar={() => setMobileOpen(false)}
        />
      )}
      <Sidebar role={user.role} isMobile={false} />
      <div className="flex flex-col flex-1">
        <Navbar user={user} toggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
