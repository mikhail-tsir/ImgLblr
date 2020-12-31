import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default createStore(rootReducer, applyMiddleware(thunk));
