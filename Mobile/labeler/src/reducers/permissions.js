import { createAction, handleActions } from "redux-actions";

const initialState = {
  cameraPermission: false,
};

const SET_CAMERA_PERMISSION = "SET_CAMERA_PERMISSION";

export const setCameraPermission = createAction(SET_CAMERA_PERMISSION);

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
