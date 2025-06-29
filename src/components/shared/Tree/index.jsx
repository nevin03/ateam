import React, { useState } from "react";
import PropTypes from "prop-types";

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4 mt-1">
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer flex items-center gap-2 hover:text-blue-600"
      >
        {hasChildren && (
          <span className="font-bold">{expanded ? "▼" : "▶"}</span>
        )}
        <span>{node.label}</span>
      </div>
      {hasChildren && expanded && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

TreeNode.propTypes = {
  node: PropTypes.shape({
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  }),
};

export default function Tree({ data = [] }) {
  return (
    <div className="text-sm font-medium">
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  );
}

Tree.propTypes = {
  data: PropTypes.array.isRequired,
};
