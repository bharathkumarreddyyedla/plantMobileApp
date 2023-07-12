import { ReduxPlantConstants } from "../reduxConstants/constants";

const initialState = {
  plantDetails: {},
  myPlantDetails: {},
  plantMessage: "",
  faqPlantData: [],
  favouritePlants: [],
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
    case ReduxPlantConstants.SET_FAQPLAT_DATA:
      return {
        ...state,
        faqPlantData: action.payload,
      };
    case ReduxPlantConstants.SET_FAVOURITE_PLANT:
      return {
        ...state,
        favouritePlants: action.payload,
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
