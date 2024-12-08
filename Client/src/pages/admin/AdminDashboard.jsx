import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangeUserPermissionApi,
  useGetAllUsersApi,
} from "../../helper/apis/users";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { changePermission } from "../../store/users/users";
function AdminDashboard() {
  const dispatch = useDispatch();
  const { handleChangePermission } = useChangeUserPermissionApi();
  const { users } = useSelector((state) => state.user);
  const { handleGetAllUsers } = useGetAllUsersApi();
  useEffect(() => {
    if (users.length === 0) handleGetAllUsers();
  }, []);
  const handleChange = async (e, el) => {
    const reqBody = {
      email: el.email,
      permission: e.target.value,
    };
    try {
      await handleChangePermission(reqBody);
      dispatch(changePermission({ id: el._id, permission: e.target.value }));
    } catch (err) {
      return;
    }
  };
  return (
    <div className="w-full h-full  p-5 ">
      <Typography variant="h5">Users</Typography>
      <div className="w-full h-[95%] py-5 px-3 flex flex-col gap-3 mt-7 overflow-y-auto narrow_scrollbar">
        {users?.map((el, id) => {
          const upperCasedName = el.name?.toUpperCase();
          return (
            el.role !== "admin" && (
              <div className="p-5 w-full bg-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    alt={upperCasedName}
                    src="/static/images/avatar/2.jpg"
                  />
                  <div className="flex flex-col ">
                    <Typography variant="body3bold" textTransform="capitalize">
                      {el.name}
                    </Typography>
                    <Typography variant="small1bold">{el.email}</Typography>
                  </div>
                </div>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Permission
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={el.permissions}
                    onChange={(e) => handleChange(e, el)}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={"edit"}>Edit</MenuItem>
                    <MenuItem value={"read"}>Read</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
