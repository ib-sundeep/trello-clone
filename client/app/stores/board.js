import * as boardsApi from "../api/boards";
import * as listsApi from "../api/lists";
import * as tasksApi from "../api/tasks";

const GET_BOARD_INIT = "GET_BOARD_INIT";
const GET_BOARD_DONE = "GET_BOARD_DONE";
const GET_BOARD_ERROR = "GET_BOARD_ERROR";
const SET_CREATE_LIST_MODAL = "SET_CREATE_LIST_MODAL";
const CREATE_LIST_INIT = "CREATE_LIST_INIT";
const CREATE_LIST_DONE = "CREATE_LIST_DONE";
const CREATE_LIST_ERROR = "CREATE_LIST_ERROR";
const CREATE_TASK_INIT = "CREATE_TASK_INIT";
const CREATE_TASK_DONE = "CREATE_TASK_DONE";
const CREATE_TASK_ERROR = "CREATE_TASK_ERROR";
const SET_CREATE_TASK_LIST = "SET_CREATE_TASK_LIST";

export function loadBoard(slug) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().boardState;
    if (isLoading) return;

    dispatch({ type: GET_BOARD_INIT });
    try {
      const json = await boardsApi.get(slug);
      const order = Object.values(json.lists)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(o => o.id);
      for (let x in json.lists) {
        const list = json.lists[x];
        const taskIds = Object.values(json.tasks)
          .filter(o => o.listId === list.id)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map(o => o.id);
        list.taskIds = taskIds;
      }
      dispatch({ type: GET_BOARD_DONE, payload: { ...json, order } });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_BOARD_ERROR, payload: error });
    }
  };
}

export function setCreateListModal(isOpen) {
  return {
    type: SET_CREATE_LIST_MODAL,
    payload: isOpen
  };
}

export function createList(data) {
  return async (dispatch, getState) => {
    const { isCreatingList, board } = getState().boardState;
    if (isCreatingList) return;

    dispatch({ type: CREATE_LIST_INIT });
    try {
      const json = await listsApi.create({ ...data, boardId: board.id });
      json.list.taskIds = [];
      dispatch({ type: CREATE_LIST_DONE, payload: json.list });
    } catch (error) {
      console.log({ error });
      dispatch({ type: CREATE_LIST_ERROR, payload: error });
    }
  };
}

export function setCreateTaskModal(listId) {
  return {
    type: SET_CREATE_TASK_LIST,
    payload: listId
  };
}

export function createTask(data) {
  return async (dispatch, getState) => {
    const { isCreatingTask, createTaskListId } = getState().boardState;
    if (isCreatingTask) return;

    dispatch({ type: CREATE_TASK_INIT });
    try {
      const json = await tasksApi.create({ ...data, listId: createTaskListId });
      dispatch({ type: CREATE_TASK_DONE, payload: json.task });
    } catch (error) {
      dispatch({ type: CREATE_LIST_ERROR, payload: error });
    }
  };
}

export default function(
  state = {
    board: null,
    order: [],
    lists: {},
    tasks: {},
    isLoading: false,
    loadError: null,
    isCreateListModalOpen: false,
    isCreatingList: false,
    createListError: null,
    createTaskListId: null,
    isCreatingTask: false,
    createTaskError: false
  },
  action
) {
  switch (action.type) {
    case GET_BOARD_INIT:
      return { ...state, isLoading: true, loadError: null };
    case GET_BOARD_DONE:
      const { board, lists, tasks, order } = action.payload;
      return { ...state, isLoading: false, board, lists, tasks, order };
    case GET_BOARD_ERROR:
      return { ...state, isLoading: false, loadError: action.payload };
    case CREATE_LIST_INIT:
      return {
        ...state,
        isCreatingList: true,
        createListError: action.payload
      };
    case CREATE_LIST_DONE:
      const list = action.payload;
      return {
        ...state,
        isCreatingList: false,
        isCreateListModalOpen: false,
        lists: { ...state.lists, [list.id]: list },
        order: [...state.order, list.id]
      };
    case CREATE_LIST_ERROR:
      return {
        ...state,
        isCreatingList: false,
        createListError: action.payload
      };
    case SET_CREATE_LIST_MODAL:
      return { ...state, isCreateListModalOpen: action.payload };
    case SET_CREATE_TASK_LIST:
      return { ...state, createTaskListId: action.payload };
    case CREATE_TASK_INIT:
      return { ...state, isCreatingTask: true, createTaskError: null };
    case CREATE_TASK_DONE:
      const task = action.payload;
      return {
        ...state,
        isCreatingTask: false,
        createTaskListId: null,
        lists: {
          ...state.lists,
          [task.listId]: {
            ...state.lists[task.listId],
            taskIds: [...state.lists[task.listId].taskIds, task.id]
          }
        },
        tasks: {
          ...state.tasks,
          [task.id]: task
        }
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        isCreatingTask: false,
        createTaskError: action.payload
      };
    default:
      return state;
  }
}
