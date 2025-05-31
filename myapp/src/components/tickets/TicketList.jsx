import PropTypes from "prop-types";
import { FaClock, FaTrashAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const tagStyles = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-blue-100 text-blue-600",
  open: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-700",
  resolved: "bg-green-100 text-green-700",
  "in progress": "bg-yellow-200 text-yellow-800",
};

const TicketList = ({
  tickets,
  onDelete,
  onUpdateStatus,
  onAssign,
  currentAgent,
  role = "agent",
}) => {
  if (!tickets.length) {
    return <p className="text-center text-gray-500">No tickets found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => {
        const isAssigned = Boolean(ticket.user);

        return (
          <div
            key={ticket.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 relative hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-400 font-medium">{ticket.id}</p>
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label="More options"
                title="More options"
              >
                <HiOutlineDotsHorizontal />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {ticket.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ticket.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    tagStyles[tag.toLowerCase()] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* User Info */}
            {ticket.user && ticket.avatarUrl && (
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                <img
                  src={ticket.avatarUrl}
                  alt={`${ticket.user}'s avatar`}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{ticket.user}</span>
              </div>
            )}

            {/* Time */}
            {ticket.time && (
              <div className="flex items-center text-xs text-gray-400 mb-4">
                <FaClock className="mr-1" />
                <span>{ticket.time}</span>
              </div>
            )}

            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {role === "customer" && onDelete && (
                <button
                  onClick={() => onDelete(ticket.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete ticket"
                  title="Delete ticket"
                >
                  <FaTrashAlt />
                </button>
              )}

              {role === "agent" && (
                <>
                  {onUpdateStatus && (
                    <button
                      onClick={() => onUpdateStatus(ticket.id)}
                      className="text-blue-500 text-xs hover:underline cursor-pointer"
                      type="button"
                    >
                      Update Status
                    </button>
                  )}

                  {onAssign && (
                    <button
                      onClick={() => onAssign(ticket.id, currentAgent)}
                      className={`text-green-500 text-xs hover:underline ${
                        isAssigned
                          ? "cursor-not-allowed text-gray-400 hover:no-underline"
                          : ""
                      }`}
                      disabled={isAssigned}
                      aria-disabled={isAssigned}
                      type="button"
                    >
                      {isAssigned ? "Assigned" : "Assign Ticket"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onUpdateStatus: PropTypes.func,
  onAssign: PropTypes.func,
  currentAgent: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  role: PropTypes.string, // "agent" | "customer" | "admin" etc
};

export default TicketList;
