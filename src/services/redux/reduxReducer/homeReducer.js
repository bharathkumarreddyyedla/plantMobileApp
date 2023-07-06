import { ReduxHomeConstants } from "../reduxConstants/constants";

const initialState = {
  userLocation: {},
  userAddress:{}
};

export const homeReducers = (state = initialState, action) => {
  switch (action?.type) {
    case ReduxHomeConstants.SET_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
      case ReduxHomeConstants.SET_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };
    default:
      return state;
  }
};