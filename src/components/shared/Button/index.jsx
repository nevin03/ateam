import PropTypes from "prop-types";
import clsx from "clsx";
const variantStyles = {
  contained: {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
    tertiary: "bg-tertiary-600 text-white hover:bg-tertiary-700",
    red: "bg-red-600 text-white hover:bg-red-700",
  },
  text: {
    primary: "text-primary-600 hover:underline",
    secondary: "text-secondary-600 hover:underline",
    tertiary: "text-tertiary-600 hover:underline",
    red: "text-red-600 hover:underline",
  },
  rounded: {
    primary:
      "bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200",
    secondary:
      "bg-secondary-100 text-secondary-700 rounded-full hover:bg-secondary-200",
    tertiary:
      "bg-tertiary-100 text-tertiary-700 rounded-full hover:bg-tertiary-200",
    red: "bg-red-100 text-red-700 rounded-full hover:bg-red-200",
  },
};

// Size styles
const sizeStyles = {
  sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
};

const Button = ({
  children,
  onClick,
  color = "primary",
  variant = "contained",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) => {
  const styles = clsx(
    "font-semibold transition duration-200 focus:outline-none",
    variantStyles[variant]?.[color],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  variant: PropTypes.oneOf(["contained", "text", "rounded"]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
