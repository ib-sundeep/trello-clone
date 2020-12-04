import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal } from "../../components/general";
import { createList, setCreateListModal } from "../../stores/board";

function CreateListModal() {
  const dispatch = useDispatch();
  const {
    isCreatingList,
    createListError,
    isCreateListModalOpen
  } = useSelector(state => state.boardState);

  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await dispatch(createList({ name }));
    setName("");
  }

  return (
    <Modal
      isOpen={isCreateListModalOpen}
      onClose={() => dispatch(setCreateListModal(false))}
      title="Create New List"
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="list-name" className="form-field-label">
            Name
          </label>
          <input
            id="list-name"
            onChange={event => setName(event.target.value)}
            type="text"
            value={name}
          />
        </div>
        {createListError && (
          <div className="form-error">
            {createListError.response && createListError.response.status === 422
              ? "Enter a valid list name"
              : "Something went wrong! Please try again"}
          </div>
        )}
        <Button disabled={isCreatingList} type="submit" variant="primary">
          Create List
        </Button>
      </form>
    </Modal>
  );
}

export default CreateListModal;
