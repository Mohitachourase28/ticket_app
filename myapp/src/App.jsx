import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Loading from "./components/common/Loading.jsx";
import Layout from "./components/layout/Layout.jsx";
import Reports from "./pages/Reports.jsx";
import Team from "./pages/Team.jsx";
import Setting from "./pages/Setting.jsx";
import TicketForm from "./components/tickets/TicketForm.jsx";
import NotAuthorized from "./pages/Errors/not-authorized.jsx";
import Tickets from "./pages/Tickets/tickets.jsx";
import { Toaster } from "react-hot-toast";

const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["agent", "customer"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/team" element={<Layout><Team /></Layout>} />
        <Route path="/settings" element={<Layout><Setting /></Layout>} />
        <Route path="/new-ticket" element={<Layout><TicketForm /></Layout>} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/my-tickets" element={<Layout><Tickets /></Layout>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;

// import { useAuth } from "./context/AuthContext";
// import Sidebar from "./components/layout/Sidebar.jsx";
// import PropTypes from "prop-types";
// function App() {
//   const { userRole } = useAuth();
//   console.log("App.jsx userRole:", userRole); // 👈 Check this

//   return (
//     <>
//       <Sidebar />
//       {/* your routes and content */}
//     </>
//   );
// }
// App.propTypes = {
//   userRole: PropTypes.string,
// };
// export default App;