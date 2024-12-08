import React, { useState, useEffect } from "react";
import { get, put, post } from "../apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ALL_USERS,
  ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENTS,
  LOGIN,
  UPDATE_PERMISSION,
} from "../urlHelper";
import {
  loginSuccess,
  apiError,
  setUserData,
} from "../../store/authentication/login";
import { useError } from "../../utils/ErrorHandler";
import { setAllUsers } from "../../store/users/users";
import {
  createAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  setAllAnnouncements,
} from "../../store/announcements/announcement";

export function useGetAllUsersApi() {
  const { showError } = useError();
  const dispatch = useDispatch();
  const handleGetAllUsers = async () => {
    try {
      const response = await get(ALL_USERS);
      const responseData = response?.data;
      dispatch(setAllUsers(responseData));
    } catch (err) {
      showError(err?.response?.data?.errorMessage, "error");
    }
  };
  return {
    handleGetAllUsers,
  };
}

export function useChangeUserPermissionApi() {
  const { showError } = useError();
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChangePermission = async (reqBody) => {
    try {
      const response = await post(UPDATE_PERMISSION, reqBody);
      showError(`User permission changed successfully`, "success");
    } catch (err) {
      dispatch(setAllUsers(users));
      showError(err?.response?.data?.errorMessage, "error");
    }
  };
  return {
    handleChangePermission,
  };
}

export function useGetAnnouncementsApi() {
  const dispatch = useDispatch();
  const { showError } = useError();
  const getAnnouncement = async () => {
    try {
      const response = await get(GET_ALL_ANNOUNCEMENTS);
      dispatch(setAllAnnouncements(response?.data));
    } catch (err) {
      showError(err?.response?.data?.errorMessage, "error");
    }
  };
  return {
    getAnnouncement,
  };
}
export function useUpdateAnnouncementApi() {
  const dipatch = useDispatch();
  const { showError } = useError();
  const updateAnnouncement = async (reqBody) => {
    try {
      const response = await post(ANNOUNCEMENT, reqBody);
      if (reqBody.action === "create") {
        dipatch(createAnnouncement(response?.data));
        showError(`Announcement created successfully`, "success");
      } else if (reqBody.action === "edit") {
        dipatch(editAnnouncement({ id: reqBody.id, data: reqBody.data }));
        showError(`Announcement updated successfully`, "success");
      } else {
        dipatch(deleteAnnouncement(reqBody.id));
        showError(`Announcement deleted successfully`, "success");
      }
    } catch (err) {
      showError(err?.response?.data?.errorMessage, "error");
    }
  };
  return {
    updateAnnouncement,
  };
}
