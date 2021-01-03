// keeps track of whether the camera is currently capturing. Currently disabled.

import { createAction, handleActions } from "redux-actions";

const initialState = false;

const SET_CAPTURING = "SET_CAPTURING";

export const setCapturing = createAction(SET_CAPTURING);

export const capturing = handleActions(
  {
    SET_CAPTURING: (state, action) => {
      return action.payload;
    },
  },
  initialState
);
