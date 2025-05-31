import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const responseTimeData = [
    { name: "0-2h", value: 45 },
    { name: "2-4h", value: 30 },
    { name: "4-6h", value: 15 },
    { name: "6-8h", value: 7 },
    { name: "8-24h", value: 3 },
  ];

  const ticketStatusData = [
    { name: "Open", value: 2 },
    { name: "In Progress", value: 2 },
    { name: "Resolved", value: 1 },
    { name: "Closed", value: 0 },
  ];

  const priorityData = [
    { name: "High", value: 2 },
    { name: "Medium", value: 2 },
    { name: "Low", value: 1 },
  ];

  const COLORS = ["#3b82f6", "#facc15", "#22c55e", "#9ca3af"];

  const tickets = [
    {
      id: "TK-1234",
      subject: "Login Issue",
      status: "Open",
      priority: "High",
      created: "2024-01-15",
      resolution: "2h",
    },
    {
      id: "TK-1235",
      subject: "Payment Failed",
      status: "In Progress",
      priority: "Medium",
      created: "2024-01-15",
      resolution: "4h",
    },
    {
      id: "TK-1236",
      subject: "Account Access",
      status: "Resolved",
      priority: "Low",
      created: "2024-01-14",
      resolution: "1h",
    },
    {
      id: "TK-1237",
      subject: "Feature Request",
      status: "Open",
      priority: "Medium",
      created: "2024-01-13",
      resolution: "3h",
    },
    {
      id: "TK-1238",
      subject: "Data Sync Error",
      status: "In Progress",
      priority: "High",
      created: "2024-01-13",
      resolution: "5h",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow w-full">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="text-xl font-bold text-blue-500 inline-block bg-blue-100 px-1 rounded">
            2,847
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow w-full">
          <p className="text-sm text-gray-500">Open Tickets</p>
          <p className="text-xl font-bold text-green-500 inline-block bg-green-100 px-1 rounded">
            426
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow w-full">
          <p className="text-sm text-gray-500">Average Response Time</p>
          <p className="text-xl font-bold text-yellow-500 inline-block bg-yellow-100 px-1 rounded">
            2.4h
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow w-full">
          <p className="text-sm text-gray-500">Resolution Rate</p>
          <p className="text-xl font-bold text-purple-500 inline-block bg-purple-100 px-1 rounded">
            94.2%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow w-full h-64">
          <h2 className="text-sm font-semibold mb-2">
            Response Time Distribution
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseTimeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow w-full h-64">
          <h2 className="text-sm font-semibold mb-2">
            Ticket Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ticketStatusData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow w-full h-64">
          <h2 className="text-sm font-semibold mb-2">Priority Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {priorityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <h2 className="text-sm font-semibold mb-4">Detailed Reports</h2>
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 px-3">Ticket ID</th>
              <th className="py-2 px-3">Subject</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Priority</th>
              <th className="py-2 px-3">Created Date</th>
              <th className="py-2 px-3">Resolution Time</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-3 text-blue-600 font-medium cursor-pointer">
                  {ticket.id}
                </td>
                <td className="py-2 px-3">{ticket.subject}</td>
                <td className="py-2 px-3">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {ticket.status}
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : ticket.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-2 px-3">{ticket.created}</td>
                <td className="py-2 px-3">{ticket.resolution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
