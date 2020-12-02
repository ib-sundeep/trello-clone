import React from "react";

import Button from "./Button";
import Icon from "./Icon";

function Modal({ isOpen, title, children, onClose }) {
  if (isOpen) {
    return (
      <>
        <div className="modal-overlay" />
        <div className="modal">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-action">
              <Button
                className="btn-icon small"
                onClick={onClose}
                variant="dark"
              >
                <Icon name="close" />
              </Button>
            </div>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default Modal;
