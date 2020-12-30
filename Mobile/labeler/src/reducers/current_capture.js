import { createAction, handleActions } from "redux-actions";

const SET_CURRENT_CAP = "SET_CURRENT_CAP";
const initialState = "";

export const setCurrent = createAction(SET_CURRENT_CAP);

export const currentCapture = handleActions(
  {
    SET_CURRENT_CAP: (_, action) => {
      return action.payload;
    },
  },
  initialState
);
