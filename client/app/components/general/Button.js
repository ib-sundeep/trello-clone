import React from "react";

import cn from "classnames";

function Button({
  className,
  component = "button",
  variant = "default",
  ...remainingProps
}) {
  return React.createElement(component, {
    className: cn("btn", `btn-${variant}`, className),
    ...remainingProps
  });
}

export default Button;
