import * as boardsApi from "../api/boards";

const LOAD_BOARDS_INIT = "LOAD_BOARDS_INIT";
const LOAD_BOARDS_DONE = "LOAD_BOARDS_DONE";
const LOAD_BOARDS_ERROR = "LOAD_BOARDS_ERROR";
const SET_CREATE_BOARD_MODAL = "SET_CREATE_BOARD_MODAL";
const CREATE_BOARD_INIT = "CREATE_BOARD_INIT";
const CREATE_BOARD_DONE = "CREATE_BOARD_DONE";
const CREATE_BOARD_ERROR = "CREATE_BOARD_ERROR";

export function loadAllBoards() {
  return async (dispatch, getState) => {
    const { homeState } = getState();
    if (homeState.isLoading) return;

    dispatch({
      type: LOAD_BOARDS_INIT
    });

    try {
      const json = await boardsApi.getList();
      dispatch({
        type: LOAD_BOARDS_DONE,
        payload: json.boards
      });
    } catch (error) {
      dispatch({
        type: LOAD_BOARDS_ERROR,
        payload: error
      });
    }
  };
}

export function createBoard(data) {
  return async (dispatch, getState) => {
    const { homeState } = getState();
    if (homeState.isCreating) return;

    dispatch({
      type: CREATE_BOARD_INIT
    });

    try {
      const json = await boardsApi.create(data);
      dispatch({
        type: CREATE_BOARD_DONE,
        payload: json.board
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOARD_ERROR,
        payload: error
      });

      throw error;
    }
  };
}

export function setCreateBoardModal(isOpen) {
  return {
    type: SET_CREATE_BOARD_MODAL,
    payload: isOpen
  };
}

export default function(
  state = {
    boards: [],
    isLoading: false,
    loadError: null,
    isCreateModalOpen: false,
    isCreating: false,
    createError: null
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
    case SET_CREATE_BOARD_MODAL:
      return { ...state, isCreateModalOpen: action.payload };
    case CREATE_BOARD_INIT:
      return { ...state, isCreating: true, createError: null };
    case CREATE_BOARD_DONE:
      state.boards.push(action.payload);
      return {
        ...state,
        isCreating: false,
        boards: state.boards,
        isCreateModalOpen: false
      };
    case CREATE_BOARD_ERROR:
      return { ...state, isCreating: false, createError: action.payload };
    default:
      return state;
  }
}
