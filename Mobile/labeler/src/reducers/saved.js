import { createAction, handleActions } from "redux-actions";
import * as FileSystem from "expo-file-system";

import { savedLocation } from "../config/constants";
import { saveToSaved } from "../util/utils";
import { delCapture } from "./captures";

const initialState = [];

const LOAD_SAVED = "LOAD_SAVED",
  ADD_SAVED = "ADD_SAVED",
  DEL_SAVED = "DEL_SAVED";

export const loadSaved = createAction(LOAD_SAVED);
export const addSaved = createAction(ADD_SAVED);
export const delSaved = createAction(DEL_SAVED);

export const savedImgs = handleActions(
  {
    LOAD_SAVED: (state, action) => {
      return action.payload;
    },

    ADD_SAVED: (state, action) => {
      return [...state, action.payload];
    },

    DEL_SAVED: (state, action) => {
      const newState = [...state];
      newState.splice(action.payload.idx, 1);
      return newState;
    },
  },
  initialState
);

export function loadCapturesFromSaved() {
  return async (dispatch, getState) => {
    const savedImgs = await FileSystem.readDirectoryAsync(savedLocation);
    dispatch(loadSaved(savedImgs.map((name) => savedLocation + name)));
  };
}

export function moveToSaved(uri) {
  return async (dispatch, getState) => {
    const path = await saveToSaved(uri);
    dispatch(addSaved(path));
    // await FileSystem.deleteAsync(uri);
    // dispatch(delCapture(uri));
  };
}
