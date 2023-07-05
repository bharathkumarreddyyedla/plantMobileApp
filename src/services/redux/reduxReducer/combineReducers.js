import { combineReducers } from "redux";
import { loadingReducers } from "./loadingReducer";
import { profileReducers } from "./profileReducers";
import { plantReducers } from "./plantReducers";
import { homeReducers } from "./homeReducer";
import { notificationReducers } from "./notificationReducers";

const combineAll = combineReducers({
  loader: loadingReducers,
  profile: profileReducers,
  plants: plantReducers,
  home:homeReducers,
  notification:notificationReducers
});

export default combineAll;
