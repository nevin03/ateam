import PropTypes from "prop-types";

function Radio({ label, name, value, className = "", ...rest }) {
  return (
    <label className={`inline-flex items-center space-x-2 ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        className="form-radio h-4 w-4 text-blue-600"
        {...rest}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Radio;
