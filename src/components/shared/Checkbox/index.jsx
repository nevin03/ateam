import PropTypes from "prop-types";

function Checkbox({ label, name, className = "", ...rest }) {
  return (
    <label className={`inline-flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        name={name}
        className="form-checkbox h-4 w-4 text-blue-600"
        {...rest}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Checkbox;
