import { combineReducers } from "redux";
import Login from "./authentication/login";
const rootReducer = combineReducers({
  auth: Login,
});
export default rootReducer;