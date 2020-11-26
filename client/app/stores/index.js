import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import boardReducer from "./board";
import homeReducer from "./home";

const reducers = combineReducers({
  boardState: boardReducer,
  homeState: homeReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
