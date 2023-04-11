import React from 'react';
import { BsThreeDotsVertical, BsPlusCircle, BsPencilFill, BsTrash2Fill } from 'react-icons/bs';
import "./ActionButton.css"

function ActionButton({ node, onAdd, onEdit, onDelete }) {

  const handleAdd = () => {
    onAdd(node.id);
  };

  const handleEdit = () => {
    onEdit(node.id);
  };

  const handleDelete = () => {
    onDelete(node.id);
  };

  return (
      <div className="dropdown">
        <button className="menu-button">
          <BsThreeDotsVertical/>
        </button>
        <div className="dropdown-content">
          <div className='dropdown-item' onClick={handleAdd}><BsPlusCircle/> Add</div>
          <div className='dropdown-item' onClick={handleEdit}><BsPencilFill/> Edit</div>
          <div className='dropdown-item' onClick={handleDelete}><BsTrash2Fill/> Delete</div>
        </div>
      </div>
  );
}

export default ActionButton;