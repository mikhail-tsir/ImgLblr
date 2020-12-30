import { createAction, handleActions } from "redux-actions";

const SET_CURRENT_CAP = "SET_CURRENT_CAP";
const initialState = -1;

export const setCurrent = createAction(SET_CURRENT_CAP);

export const currentIdx = handleActions(
  {
    SET_CURRENT_CAP: (state, action) => {
      return action.payload;
    },
  },
  initialState
);
