import {
  ReduxNotificationConstants,
  ReduxPlantConstants,
} from "../reduxConstants/constants";

const initialState = {
  allNotifications: {},
};

export const notificationReducers = (state = initialState, action) => {
  switch (action?.type) {
    case ReduxNotificationConstants.SET_ALL_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: action.payload,
      };
    default:
      return state;
  }
};
