import { combineReducers } from "redux";
import { captures } from "./captures";
import { currentIdx } from "./current_capture";

export default combineReducers({ captures, currentIdx });
