import { combineReducers } from "redux";
import { loadingReducers } from "./loadingReducer";

const combineAll = combineReducers({loader: loadingReducers});

export default combineAll;
