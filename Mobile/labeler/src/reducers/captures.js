import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const LOAD_CAPTURES = "LOAD_CAPTURES",
  ADD_CAPTURE = "ADD_CAPTURE",
  DEL_CAPTURE = "DEL_CAPTURE";

export const loadCaptures = createAction(LOAD_CAPTURES);
export const addCapture = createAction(ADD_CAPTURE);
export const delCapture = createAction(DEL_CAPTURE);

export const captures = handleActions(
  {
    LOAD_CAPTURES: (state, action) => {
      return action.payload;
    },

    ADD_CAPTURE: (state, action) => {
      return [...state, action.payload];
    },

    DEL_CAPTURE: (state, action) => {
      const newState = [...state];
      newState.splice(action.payload.idx, 1);
      return newState;
    },
  },
  initialState
);
