import { createStore, applyMiddleware, compose } from "redux";
import RootReducers from "../reducers/reducers";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  RootReducers,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
