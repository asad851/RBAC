import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LOGIN_PATH } from "../../routes/route_names";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export const Authmiddleware = (props) => {
  const token = Cookies.get("token");
  const { user } = useSelector((state) => state.auth);
  if (!token || user.role !== "admin") {
    Cookies.remove("token");
    localStorage.clear();
    return (
      <Navigate to={{ pathname: LOGIN_PATH, state: { from: props.location } }} />
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};

export const AuthUserMiddleWare = (props) => {
  const token = Cookies.get("token");
    const { user } = useSelector((state) => state.auth)
    console.log(user)
  if (!token || user.role !== "user") {
    Cookies.remove("token");
    localStorage.clear();
    return (
      <Navigate to={{ pathname:LOGIN_PATH, state: { from: props.location } }} />
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};