import { combineReducers } from "redux";
import Login from "./authentication/login";
import Layout from "./layout/layout";
import User from "./users/users";
import Announcement from "./announcements/announcement";
const rootReducer = combineReducers({
  auth: Login,
  user: User,
  layout: Layout,
  announcement: Announcement,
});
export default rootReducer;
