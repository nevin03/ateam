import React, { useState } from "react";
import PropTypes from "prop-types";

function Accordion({ title, children, className = "", ...rest }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded ${className}`} {...rest}>
      <button
        className="w-full px-4 py-2 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && <div className="px-4 py-2">{children}</div>}
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
export default Accordion;
