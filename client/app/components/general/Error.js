import React from "react";

function Error({
  message = "Oops! Something went wrong",
  actionLabel = "Try Again",
  actionFn
}) {
  return (
    <div className="error">
      <div className="error-message">{message}</div>
      <Button variant="primary" onClick={actionFn}>
        {actionLabel}
      </Button>
    </div>
  );
}

export default Error;
