import React from "react";

function Header({ title, actions = [] }) {
  return (
    <div className="header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        {actions.map((action, index) => {
          return (
            <div key={index} className="header-action">
              {action}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
