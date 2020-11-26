import React from "react";

function Modal({ isOpen, title, children }) {
  if (isOpen) {
    return (
      <>
        <div className="modal-overlay" />
        <div className="modal">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-action">
              <Button className="btn-dark"></Button>
            </div>
          </div>
          <div className="modal-body"></div>
        </div>
      </>
    );
  }
}

export default Modal;
