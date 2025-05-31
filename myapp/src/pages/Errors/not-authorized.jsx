import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
