import PropTypes from 'prop-types';

const StatsCard = ({ label, value, change, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-bold">{value}</h3>
    <p className="text-gray-500">{label}</p>
    <span className={`${color} text-sm`}>{change}</span>
  </div>
);

StatsCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string
};

export default StatsCard;
