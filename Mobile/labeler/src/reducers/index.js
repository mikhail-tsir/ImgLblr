import { combineReducers } from "redux";
import { captures } from "./captures";
import { currentIdx } from "./current_capture";
import { permissions } from "./permissions";

export default combineReducers({ captures, currentIdx, permissions });
