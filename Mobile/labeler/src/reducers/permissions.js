import * as Permissions from "expo-permissions";

import { createAction, handleActions } from "redux-actions";

const initialState = {
  cameraPermission: false,
};

const SET_CAMERA_PERMISSION = "SET_CAMERA_PERMISSION";

export const setCameraPermission = (permission) => {
  return { type: SET_CAMERA_PERMISSION, permission: permission };
};

export const permissions = handleActions(
  {
    SET_CAMERA_PERMISSION: (state, { permission }) => {
      return {
        ...state,
        cameraPermission: permission,
      };
    },
  },
  initialState
);

export function cameraPermissionAction() {
  return async (dispatch, getState) => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    dispatch(setCameraPermission(camera.status === "granted"));
  };
}
