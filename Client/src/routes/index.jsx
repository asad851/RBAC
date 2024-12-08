import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/authentication/Login.jsx";
import {
  LOGIN_PATH,
  ADMIN_DASHBOARD,
  ADMIN_ANNOUNCEMENTS,
  USER_ANNOUNCEMENTS,
} from "./route_names.js";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Announcements from "../pages/Announcements.jsx";

const NavigateToDefaultRoute = () => {
  return (
    <>
      <Navigate to={LOGIN_PATH} />;
    </>
  );
};
export const publicRoutes = [
  { path: LOGIN_PATH, element: Login },
  { path: "/", element: NavigateToDefaultRoute },
];

export const AuthProtectedAdminRoutes = [
  { path: ADMIN_DASHBOARD, element: AdminDashboard },
  { path: ADMIN_ANNOUNCEMENTS, element: Announcements },
];

export const AuthProtectedUserRoutes = [
  { path: USER_ANNOUNCEMENTS, element: Announcements },
];
