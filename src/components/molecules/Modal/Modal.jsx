import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, children, onClose, onSubmit }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <>
    {isOpen && (     
        <div className="modal-overlay">
            <div className="modal-container">
                <div className='modal-title'>
                    <h2>{title}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='modal-content'>
                        {children}
                    </div>
                    <div className="modal-buttons">
                        <button className='modal-button' type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className='modal-button' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )}
    </>
  );
};

export default Modal;
