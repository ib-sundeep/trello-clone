import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Header, Icon, Loading } from "../../components/general";
import { loadAllBoards, setCreateBoardModal } from "../../stores/home";
import BoardItem from "./BoardItem";
import CreateBoardModal from "./CreateBoardModal";

function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, loadError, boards } = useSelector(
    state => state.homeState
  );

  useEffect(() => {
    dispatch(loadAllBoards());
  }, []);

  function ui() {
    if (isLoading) {
      return <Loading />;
    } else if (loadError) {
      return (
        <div className="error">
          <div className="error-message">Oopsie! Something went wrong</div>
          <Button variant="primary" onClick={() => dispatch(loadAllBoards())}>
            Try again
          </Button>
        </div>
      );
    } else {
      return (
        <div className="board-items">
          {boards.map(board => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
      );
    }
  }

  return (
    <>
      <Header
        actions={[
          <Button
            className="btn-icon"
            onClick={() => dispatch(setCreateBoardModal(true))}
            variant="light"
          >
            <Icon name="add" />
          </Button>
        ]}
        title="Trello"
      />
      <div className="page">{ui()}</div>
      <CreateBoardModal />
    </>
  );
}

export default HomePage;
