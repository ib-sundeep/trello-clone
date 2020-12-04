import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Icon } from "../../components/general";
import { setCreateTaskModal } from "../../stores/board";
import TaskItem from "./TaskItem";

function ListItem({ listId }) {
  const dispatch = useDispatch();
  const list = useSelector(state => state.boardState.lists[listId]);

  return (
    <div className="list-item">
      <div className="list-item-header">
        <div className="list-item-title">{list.name}</div>
        <div className="list-item-action">
          <Button
            variant="dark"
            className="btn-icon small"
            onClick={() => dispatch(setCreateTaskModal(listId))}
          >
            <Icon name="add" />
          </Button>
        </div>
      </div>
      <div className="list-item-tasks">
        {list.taskIds.map(taskId => (
          <TaskItem key={taskId} taskId={taskId} />
        ))}
      </div>
    </div>
  );
}

export default ListItem;
