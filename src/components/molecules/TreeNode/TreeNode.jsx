import React, { useState } from 'react';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import "./TreeNode.css"

const TreeNode = ({ node, children, onAdd, onEdit, onDelete, countChildren }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenCount = countChildren(node.id);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <div className='node-container'>
        <div className='node' onClick={handleToggle}>
          <div className='node-content'>
            <div className='node-text'>
              <div className='node-icon'>
                {children.length > 0 && (isExpanded ? <FaMinusCircle style={{color: "rgb(237, 92, 92)"}} /> : <FaPlusCircle style={{color: "rgb(76, 192, 76)"}} /> )}
              </div>
              <h4 className='node-name'>
                {node.name}
              </h4>
            </div>
            <div className='node-count'>
             {childrenCount} nodes under
            </div>
          </div>
          <ActionButton
            node={node}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        {isExpanded && children.length > 0 && <div className='tree-node' style={{marginLeft: "3rem"}}>{children}</div>}
      </div>
  );
};

export default TreeNode;