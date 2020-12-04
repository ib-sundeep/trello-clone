import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Header, Loading } from "../../components/general";
import { loadBoard, setCreateListModal } from "../../stores/board";
import CreateListModal from "./CreateListModal";
import CreateTaskModal from "./CreateTaskModal";
import ListItem from "./ListItem";

function BoardPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { isLoading, loadError, board, order } = useSelector(state => {
    return {
      isLoading: state.boardState.isLoading,
      loadError: state.boardState.loadError,
      board: state.boardState.board,
      order: state.boardState.order
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(loadBoard(slug));
  }, [slug]);

  function ui() {
    if (isLoading) {
      return <Loading />;
    } else if (loadError) {
      return <Error actionFn={() => dispatch(loadBoard(slug))} />;
    } else {
      return (
        <div className="board">
          <div className="list-items">
            {order.map(listId => (
              <ListItem key={listId} listId={listId} />
            ))}
            <div className="list-new-btn-wrapper">
              <Button
                className="list-new-btn"
                onClick={() => dispatch(setCreateListModal(true))}
              >
                Create New List
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Header title={board && board.slug === slug ? board.name : slug} />
      <div className="page">{ui()}</div>
      <CreateListModal />
      <CreateTaskModal />
    </>
  );
}

export default BoardPage;
