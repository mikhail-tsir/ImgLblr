import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const LOAD_CAPTURES = "LOAD_CAPTURES",
  ADD_CAPTURE = "ADD_CAPTURE";

export const loadCaptures = createAction(LOAD_CAPTURES);
export const addCapture = createAction(ADD_CAPTURE);

export const captures = handleActions(
  {
    LOAD_CAPTURES: (state, action) => {
      return action.payload;
    },

    ADD_CAPTURE: (state, action) => {
      return [...state, action.payload];
    },
  },
  initialState
);
