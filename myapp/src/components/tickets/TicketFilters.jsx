// import { FaFilter } from "react-icons/fa";
import { DateRangePickerButton } from "../common/DateRangePickerButton.jsx";
import PropTypes from "prop-types";

const TicketFilters = ({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) => {
    
  return (
    <div className="flex gap-2 flex-wrap">
      {/* <button className="border border-gray-300 px-3 py-1 rounded-md text-black flex items-center gap-2">
        <FaFilter className="text-blue-600" />
        Filter
      </button> */}

      <select
        className="border border-gray-300 px-3 py-1 rounded-md"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        className="border border-gray-300 px-3 py-1 rounded-md"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      <DateRangePickerButton />
      {/* <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700">
        New Ticket
      </button> */}
    </div>
  );
};
TicketFilters.propTypes = {
  priorityFilter: PropTypes.string.isRequired,
  setPriorityFilter: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
};

export default TicketFilters;
