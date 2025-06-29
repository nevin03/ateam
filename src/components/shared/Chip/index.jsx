import PropTypes from "prop-types";

function Chip({ label, onDelete, color = "blue", className = "", ...rest }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorMap[color]} ${className}`}
      {...rest}
    >
      <span>{label}</span>
      {onDelete && (
        <button onClick={onDelete} className="ml-2 text-xs hover:text-red-500">
          ✕
        </button>
      )}
    </div>
  );
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  color: PropTypes.oneOf(["blue", "green", "red", "gray"]),
  className: PropTypes.string,
};
export default Chip;
