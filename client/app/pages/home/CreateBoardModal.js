import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal } from "../../components/general";
import { createBoard, setCreateBoardModal } from "../../stores/home";

function CreateBoardModal() {
  const dispatch = useDispatch();
  const { isCreating, createError, isCreateModalOpen } = useSelector(
    state => state.homeState
  );

  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await dispatch(createBoard({ boardName: name }));
    setName("");
  }

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(setCreateBoardModal(false))}
      title="Create New Board"
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="board-name" className="form-field-label">
            Name
          </label>
          <input
            id="board-name"
            onChange={event => setName(event.target.value)}
            type="text"
            value={name}
          />
        </div>
        {createError && (
          <div className="form-error">
            {createError.response && createError.response.status === 422
              ? "Enter a valid board name"
              : "Something went wrong! Please try again"}
          </div>
        )}
        <Button disabled={isCreating} type="submit" variant="primary">
          Create Board
        </Button>
      </form>
    </Modal>
  );
}

export default CreateBoardModal;
