import PropTypes from "prop-types";

const baseStyle =
  "inline-flex items-center justify-center font-medium overflow-hidden";

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
};

const variants = {
  circle: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-none",
};

function Avatar({
  src,
  alt,
  size = "md",
  variant = "circle",
  bordered = false,
  fallback = "",
  className = "",
  ...rest
}) {
  const sizeClass = sizes[size] || sizes.md;
  const variantClass = variants[variant] || variants.circle;
  const borderClass = bordered ? "ring-2 ring-gray-300" : "";

  const combinedClasses = `${baseStyle} ${sizeClass} ${variantClass} ${borderClass} ${className}`;

  return src ? (
    <img src={src} alt={alt} className={combinedClasses} {...rest} />
  ) : (
    <div className={`${combinedClasses} bg-gray-200 text-gray-700`} {...rest}>
      {fallback}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["circle", "rounded", "square"]),
  bordered: PropTypes.bool,
  fallback: PropTypes.string,
  className: PropTypes.string,
};
export default Avatar;
