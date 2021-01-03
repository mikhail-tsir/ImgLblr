import { createAction, handleActions } from "redux-actions";
import * as FileSystem from "expo-file-system";

import { queueLocation } from "../config/constants";
import { saveToQueue } from "../util/utils";

const initialState = [];

const LOAD_CAPTURES = "LOAD_CAPTURES",
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

export function loadCapturesFromQueue() {
  return async (dispatch, getState) => {
    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
    dispatch(loadCaptures(queueImgs.map((name) => queueLocation + name)));
  };
}

export function saveCaptureToQueue(uri) {
  return async (dispatch, getState) => {
    saveToQueue(uri)
      .then((path) => {
        dispatch(addCapture(path));
      })
      .catch((err) => alert(err));
  };
}
