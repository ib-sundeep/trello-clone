import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Header, Loading } from "../../components/general";
import { loadAllBoards } from "../../stores/home";

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
          <Button type="primary" onClick={() => dispatch(loadAllBoards())}>
            Try again
          </Button>
        </div>
      );
    } else {
      return <div>Loaded {boards.length} number of boards</div>;
    }
  }

  return (
    <>
      <Header title="Trello" />
      <div className="page">{ui()}</div>
    </>
  );
}

export default HomePage;
