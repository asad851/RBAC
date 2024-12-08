import React, { useState, useEffect } from "react";
import { get, put, post } from "../apiHelper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../urlHelper";
import {
  loginSuccess,
  apiError,
  setUserData,
} from "../../store/authentication/login";
import { useError } from "../../utils/ErrorHandler";
import { ADMIN_DASHBOARD, USER_ANNOUNCEMENTS } from "../../routes/route_names";
import Cookies from "js-cookie";
export function useLoginUserApi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showError } = useError();
  const handleLogin = async (credentials) => {
    try {
      const response = await post(LOGIN, credentials);
      const responseData = response.response;
      dispatch(loginSuccess(responseData));
      const userData = responseData;
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setUserData(userData));
      const millisecondsInDay = 24 * 2 * 60 * 60 * 1000;
      const expiryMilliseconds = new Date().getTime() + millisecondsInDay;
      Cookies.set("token", responseData?.token, {
        expires: new Date(expiryMilliseconds),
        secure: true,
        sameSite: "strict",
      });
      if (userData.role === "admin") {
        navigate(ADMIN_DASHBOARD);
      } else {
        navigate(USER_ANNOUNCEMENTS);
      }
    } catch (err) {
      showError(err?.response?.data?.errorMessage, "error");
    }
  };
  return { handleLogin };
}
