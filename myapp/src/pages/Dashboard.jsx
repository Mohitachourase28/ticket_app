/* eslint-disable no-unused-vars */

// const [tickets, setTickets] = useState([
//   {
//     id: "TK-1234",
//     title: "Unable to access cloud storage",
//     priority: "High",
//     status: "Open",
//     user: "John Anderson",
//     avatarUrl: "https://avatar.iran.liara.run/public/boy",
//     time: "2 hours ago",
//     tags: ["High", "Open"],
//   },
//   {
//     id: "TK-1237",
//     title: "Integration with third-party API",
//     priority: "High",
//     status: "In Progress",
//     user: "David Brown",
//     avatarUrl: "https://avatar.iran.liara.run/public/boy",
//     time: "3 hours ago",
//     tags: ["High", "In Progress"],
//   },
//   {
//     id: "TK-1235",
//     title: "Billing statement discrepancy",
//     priority: "Medium",
//     status: "In Progress",
//     user: "Emma Davis",
//     avatarUrl: "https://avatar.iran.liara.run/public/girl",
//     time: "4 hours ago",
//     tags: ["Medium", "In Progress"],
//   },
//   {
//     id: "TK-1238",
//     title: "Password reset not working",
//     priority: "Medium",
//     status: "Resolved",
//     user: "Maria Garcia",
//     avatarUrl: "https://avatar.iran.liara.run/public/girl",
//     time: "1 day ago",
//     tags: ["Medium", "Resolved"],
//   },
//   {
//     id: "TK-1236",
//     title: "Feature request: Dark mode",
//     priority: "Low",
//     status: "Open",
//     avatarUrl: "https://avatar.iran.liara.run/public/boy",
//     user: "Robert Smith",
//     time: "1 day ago",
//     tags: ["Low", "Open"],
//   },
//   {
//     id: "TK-1239",
//     title: "Account upgrade inquiry",
//     priority: "Low",
//     status: "Closed",
//     user: "James Wilson",
//     avatarUrl: "https://avatar.iran.liara.run/public/boy",
//     time: "2 days ago",
//     tags: ["Low", "Open", "Closed"],
//   },
// ]);
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TicketFilters from "../components/tickets/TicketFilters";
import StatsCard from "../components/tickets/StatsCard.jsx";
import TicketList from "../components/tickets/TicketList";
import TicketForm from "../components/tickets/TicketForm";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import PropTypes from "prop-types";

const Dashboard = ({ role }) => {
  const { userRole: contextUserRole } = useAuth();
  const userRole = role || contextUserRole || "agent";
  const [tickets, setTickets] = useState([]);
  const [searchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      label: "Open Tickets",
      value: 32,
      change: "+12.5%",
      color: "text-red-500",
    },
    {
      label: "In Progress",
      value: 45,
      change: "-8.2%",
      color: "text-green-500",
    },
    {
      label: "Resolved",
      value: 128,
      change: "+24.3%",
      color: "text-green-500",
    },
    {
      label: "Total Tickets",
      value: 205,
      change: "-2.1%",
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tickets"),
      (snapshot) => {
        const updatedTickets = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id || doc.id,
            title: data.title || "Untitled",
            priority: data.priority || "Low",
            status: data.status || "Open",
            user: data.user || "Anonymous",
            avatarUrl: data.avatarUrl || "",
            tags: data.tags || [],
            time: data.createdAt?.toDate?.().toLocaleString() || "N/A",
          };
        });
        setTickets(updatedTickets);
        setLoading(false);
      },
      (error) => {
        console.error("Real-time listener error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleDelete = (ticketId) => {
    const updated = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updated);
  };

  const handleUpdateStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status:
                ticket.status === "Open"
                  ? "In Progress"
                  : ticket.status === "In Progress"
                  ? "Resolved"
                  : "Open",
              tags: [ticket.priority, ticket.status],
            }
          : ticket
      )
    );
  };

  const handleAssignTicket = (ticketId, agent) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              user: agent.name,
              avatarUrl: agent.avatarUrl,
            }
          : ticket
      )
    );
  };

  if (loading) return <div className="p-6">Loading tickets...</div>;

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-1">Welcome to Dashboard</h1>
      <p className="text-gray-600 mb-4">You are logged in as {userRole}.</p>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">My Tickets</h2>

          <div className="flex items-center gap-2">
            <TicketFilters
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            {userRole === "customer" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors cursor-pointer"
              >
                Raise a Ticket
              </button>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-lg">
              <TicketForm
                role={userRole}
                closeModal={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}

        <TicketList
          role={userRole}
          tickets={filteredTickets}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
          onAssign={handleAssignTicket}
          currentAgent={{
            name: "Lucas Smith",
            avatarUrl: "https://i.pravatar.cc/150?img=13",
          }}
        />
      </div>
    </div>
  );
};
Dashboard.propTypes = {
  role: PropTypes.string,
};

export default Dashboard;
