import { combineReducers } from "redux";
import Login from "./authentication/login";
import Layout from "./layout/layout";
import User from "./users/users";
const rootReducer = combineReducers({
  auth: Login,
  user: User,
  layout: Layout,
});
export default rootReducer;
