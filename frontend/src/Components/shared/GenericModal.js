import React from "react";
import "./../../styles/modal.css";

/**
 * A generic modal component for displaying custom content.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Callback to close the modal.
 * @param {JSX} children - Custom JSX content to display within the modal.
 *
 * Usage:
 * 1. Import this component where you need it.
 * 2. Pass the `isOpen` state and `onClose` callback from the parent component.
 * 3. Wrap the desired content in the `children` prop to display it within the modal.
 * 4. The modal can be closed by calling the `onClose` callback when needed.
 */

const GenericModal = ({ isOpen, onClose, children }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    isOpen && (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={handleModalClick}>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    )
  );
};

export default GenericModal;
