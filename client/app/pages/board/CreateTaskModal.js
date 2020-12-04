import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal } from "../../components/general";
import { createTask, setCreateTaskModal } from "../../stores/board";

const formatDate = date => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

function CreateTaskModal() {
  const dispatch = useDispatch();
  const { isCreatingTask, createTaskError, createTaskListId } = useSelector(
    state => state.boardState
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  async function handleSubmit(event) {
    event.preventDefault();

    await dispatch(createTask({ name, description, dueDate }));
    setName("");
    setDescription("");
    setDueDate(new Date());
  }

  return (
    <Modal
      isOpen={Boolean(createTaskListId)}
      onClose={() => dispatch(setCreateTaskModal(null))}
      title="Create New Task"
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="task-name" className="form-field-label">
            Name
          </label>
          <input
            id="task-name"
            onChange={event => setName(event.target.value)}
            type="text"
            value={name}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-desc" className="form-field-label">
            Description
          </label>
          <textarea
            id="task-desc"
            rows={3}
            onChange={event => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-date" className="form-field-label">
            Due Date
          </label>
          <input
            id="task-date"
            onChange={event => setDueDate(new Date(event.target.value))}
            type="date"
            value={formatDate(dueDate)}
          />
        </div>
        {createTaskError && (
          <div className="form-error">
            {createTaskError.response && createTaskError.response.status === 422
              ? "Enter valid details"
              : "Something went wrong! Please try again"}
          </div>
        )}
        <Button disabled={isCreatingTask} type="submit" variant="primary">
          Create Task
        </Button>
      </form>
    </Modal>
  );
}

export default CreateTaskModal;
