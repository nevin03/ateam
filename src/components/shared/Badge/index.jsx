import PropTypes from "prop-types";

const colors = {
  primary: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-800",
};

function Badge({ children, color = "primary", className = "", ...rest }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-sm rounded-full font-medium ${
        colors[color] || colors.primary
      } ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "success", "danger", "warning"]),
  className: PropTypes.string,
};
export default Badge;
