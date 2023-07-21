import { ReduxPostConstants } from "../reduxConstants/constants";

const initialState = {
  postDetails: {},
};

export const postReducers = (state = initialState, action) => {
  switch (action?.type) {
    case ReduxPostConstants.SET_POST_DETAILS:
      return {
        ...state,
        postDetails: action.payload,
      };
    default:
      return state;
  }
};
