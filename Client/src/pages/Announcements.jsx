import React from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AddRounded } from "@mui/icons-material";
function Announcements() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-full p-5">
      <div className="w-full flex justify-between items-center">
        <Typography variant="h5">Announcements</Typography>
        <Tooltip
          title={
            user.role !== "admin" ? "Only admin can create announcements" : null
          }
        >
          <Button
            endIcon={<AddRounded />}
            disabled={user.role !== "admin"}
            variant="contained"
          >
            Create Announcement
          </Button>
        </Tooltip>
      </div>
      <div className="w-full mt-5 h-[90%] flex flex-col gap-5 border border-gray-200 rounded-lg ">
        <div className="w-full h-full px-3 py-5 narrow_scrollbar overflow-auto flex flex-col gap-5">
          <div className="w-full p-5 rounded-lg bg-gray-200 shadow max-h-[300px] overflow-y-auto narrow_scrollbar">
            <Typography variant="small1bold">
              jsdjfbsdfbhdsudsgbvidvhdfvvfv
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
