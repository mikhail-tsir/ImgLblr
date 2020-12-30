import { combineReducers } from "redux";
import { captures } from "./captures";
import { currentCapture } from "./current_capture";

export default combineReducers({ captures, currentCapture });
