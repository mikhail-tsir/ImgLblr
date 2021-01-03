import { combineReducers } from "redux";
import { captures } from "./captures";
import { currentIdx } from "./current_capture";
import { permissions } from "./permissions";
import { savedImgs } from "./saved";

export default combineReducers({
  captures,
  savedImgs,
  currentIdx,
  permissions,
});
