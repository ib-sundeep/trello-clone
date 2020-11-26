import React from "react";

import cn from "classnames";

function Button({
  className,
  component = "button",
  type = "default",
  ...remainingProps
}) {
  return React.createElement(component, {
    className: cn("btn", `btn-${type}`, className),
    ...remainingProps
  });
}

export default Button;
