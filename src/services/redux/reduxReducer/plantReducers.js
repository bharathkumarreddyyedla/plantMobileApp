import { ReduxPlantConstants } from "../reduxConstants/constants";

const initialState = {
  plantDetails: {},
  myPlantDetails:{},
  plantMessage:''
};

export const plantReducers = (state = initialState, action) => {
  switch (action?.type) {
    case ReduxPlantConstants.SET_DETAILED_PLANT_DATA:
      return {
        ...state,
        plantDetails: action.payload,
      };
      case ReduxPlantConstants.SET_PLAT_DATA:
      return {
        ...state,
        myPlantDetails: action.payload,
      };
      case ReduxPlantConstants.SET_MESSAGE:
      return {
        ...state,
        plantMessage: action.payload,
      };
    default:
      return state;
  }
};
