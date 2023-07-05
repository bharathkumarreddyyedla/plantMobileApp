import { ReduxHomeConstants } from "../reduxConstants/constants";

const initialState = {
  userLocation: {},
};

export const homeReducers = (state = initialState, action) => {
  switch (action?.type) {
    case ReduxHomeConstants.SET_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};