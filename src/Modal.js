// Modal.js
import React from 'react';
import './css/Modal.css';
import './App';
import { TbX } from "react-icons/tb";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
