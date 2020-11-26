import * as boardsApi from "../api/boards";

const LOAD_BOARDS_INIT = "LOAD_BOARDS_INIT";
const LOAD_BOARDS_DONE = "LOAD_BOARDS_DONE";
const LOAD_BOARDS_ERROR = "LOAD_BOARDS_ERROR";

export function loadAllBoards() {
  return (dispatch, getState) => {
    const { homeState } = getState();
    if (homeState.isLoading) return;

    dispatch({
      type: LOAD_BOARDS_INIT
    });

    boardsApi
      .getList()
      .then(json => {
        dispatch({
          type: LOAD_BOARDS_DONE,
          payload: json.boards
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_BOARDS_ERROR,
          payload: error
        });
      });
  };
}

export default function(
  state = {
    boards: [],
    isLoading: false,
    loadError: null
  },
  action
) {
  switch (action.type) {
    case LOAD_BOARDS_INIT:
      return { ...state, isLoading: true, loadError: null };
    case LOAD_BOARDS_DONE:
      return { ...state, isLoading: false, boards: action.payload };
    case LOAD_BOARDS_ERROR:
      return { ...state, isLoading: false, loadError: action.payload };
    default:
      return state;
  }
}
