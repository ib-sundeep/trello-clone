import React from "react";
import { Link } from "react-router-dom";

function BoardItem({ board }) {
  return (
    <Link className="board-item" to={`/boards/${board.slug}`}>
      <div className="board-item-title">{board.name}</div>
    </Link>
  );
}

export default BoardItem;
