import { combineReducers } from "redux";
import { loadingReducers } from "./loadingReducer";
import { profileReducers } from "./profileReducers";

const combineAll = combineReducers({
  loader: loadingReducers,
  profile: profileReducers,
});

export default combineAll;
