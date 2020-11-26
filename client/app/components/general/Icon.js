import React from "react";
import cn from "classnames";

function Icon({ className, name, size = "medium" }) {
  return <i className={cn("material-icons", "size", className)}>{name}</i>;
}

export default Icon;
