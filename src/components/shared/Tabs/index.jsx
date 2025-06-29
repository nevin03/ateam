import React, { useState } from "react";
import PropTypes from "prop-types";

export function Tabs({
  tabs = [],
  defaultIndex = 0,
  onTabChange,
  className = "",
  ...rest
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className={`w-full ${className}`} {...rest}>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`py-2 px-4 -mb-px border-b-2 transition-all duration-200 ${
              activeIndex === index
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeIndex]?.content}</div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultIndex: PropTypes.number,
  onTabChange: PropTypes.func,
  className: PropTypes.string,
};
