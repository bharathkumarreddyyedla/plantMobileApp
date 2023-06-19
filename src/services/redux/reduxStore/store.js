import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import combineAll from "../reduxReducer/combineReducers";

const store = createStore(combineAll, applyMiddleware(thunk));

export default store;
