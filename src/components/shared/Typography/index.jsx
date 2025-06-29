import PropTypes from "prop-types";

const variants = {
  title: "text-4xl font-bold",
  subtitle1: "text-2xl font-semibold",
  subtitle2: "text-xl font-medium",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs text-gray-500",
  base: "text-base",
};

function Typography({ variant = "base", children, className = "", ...rest }) {
  const Component = "p";
  const style = `${variants[variant] || variants.base} ${className}`;

  return (
    <Component className={style} {...rest}>
      {children}
    </Component>
  );
}

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "title",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "base",
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Typography;
