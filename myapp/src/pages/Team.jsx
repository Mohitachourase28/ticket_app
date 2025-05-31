import PropTypes from 'prop-types';
import {
  UserIcon,
  FolderIcon,
  TicketIcon,
  CheckCircleIcon
} from 'lucide-react';

const members = [
  {
    name: 'Sarah Anderson',
    title: 'Senior Developer',
    email: 'sarah.a@ticketflow.com',
    department: 'Development',
    ticketsResolved: 45,
    performance: 95,
    online: true
  },
  {
    name: 'Michael Chen',
    title: 'UI Designer',
    email: 'michael.c@ticketflow.com',
    department: 'Design',
    ticketsResolved: 32,
    performance: 92,
    online: false
  },
  {
    name: 'Emily Rodriguez',
    title: 'QA Lead',
    email: 'emily.r@ticketflow.com',
    department: 'QA',
    ticketsResolved: 28,
    performance: 88,
    online: true
  },
  {
    name: 'David Kim',
    title: 'Project Manager',
    email: 'david.k@ticketflow.com',
    department: 'Project Management',
    ticketsResolved: 38,
    performance: 94,
    online: true
  },
  {
    name: 'Lisa Thompson',
    title: 'Support Specialist',
    email: 'lisa.t@ticketflow.com',
    department: 'Customer Support',
    ticketsResolved: 42,
    performance: 90,
    online: false
  },
  {
    name: 'James Wilson',
    title: 'Developer',
    email: 'james.w@ticketflow.com',
    department: 'Development',
    ticketsResolved: 35,
    performance: 87,
    online: true
  },
];

const TeamManagement = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Team Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard icon={<UserIcon />} title="Total Members" value="12" />
        <SummaryCard icon={<FolderIcon />} title="Active Projects" value="8" />
        <SummaryCard icon={<TicketIcon />} title="Open Tickets" value="24" />
        <SummaryCard icon={<CheckCircleIcon />} title="Completed Tasks" value="156" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {['All Departments', 'Development', 'Design', 'QA', 'Project Management', 'Customer Support'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full border text-sm ${tab === 'All Departments' ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">+ Add New Member</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Export Team Data</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Team Settings</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Generate Report</button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {members.map(member => (
          <div key={member.email} className="p-4 bg-white rounded-xl shadow border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">{member.name}</h2>
              <span className={`text-xs font-medium ${member.online ? 'text-green-600' : 'text-gray-400'}`}>{member.online ? '● online' : '● offline'}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{member.title}</p>
            <p className="text-sm text-gray-600 mb-1">📧 {member.email}</p>
            <p className="text-sm text-gray-600 mb-1">🏢 {member.department}</p>
            <p className="text-sm text-gray-600 mb-1">✅ {member.ticketsResolved} tickets resolved</p>
            <p className="text-sm text-gray-600">📊 Performance: {member.performance}%</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow border">
        <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>Sarah Anderson resolved ticket #1234 - <span className="text-gray-500">2 hours ago</span></li>
          <li>Michael Chen updated design specs for Project X - <span className="text-gray-500">3 hours ago</span></li>
          <li>Emily Rodriguez completed QA review - <span className="text-gray-500">4 hours ago</span></li>
        </ul>
      </div>
    </div>
  );
};
const SummaryCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

SummaryCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TeamManagement;
