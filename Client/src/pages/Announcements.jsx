import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AddRounded, DeleteForever, EditRounded } from "@mui/icons-material";
import {
  useGetAnnouncementsApi,
  useUpdateAnnouncementApi,
} from "../helper/apis/users";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useError } from "../utils/ErrorHandler";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  width: "90%",
  maxWidth: "500px",
};

function Announcements() {
  const dataToSend = {
    action: "",
    id: "",
    data: "",
  };
  const editHelper = {
    id: "",
    state: false,
  };
  const { showError } = useError();
  const { user } = useSelector((state) => state.auth);
  const { announcements } = useSelector((state) => state.announcement);
  const { getAnnouncement } = useGetAnnouncementsApi();
  const { updateAnnouncement } = useUpdateAnnouncementApi();
  const [open, setOpen] = useState(false);
  const [req, setReq] = useState(dataToSend);
  const [editFlag, setEditFlag] = useState(editHelper);
  const handleOpen = () => {
    if (user.role !== "admin") return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditFlag(editHelper);
    setReq(dataToSend);
  };

  useEffect(() => {
    if (announcements.length === 0) getAnnouncement();
  }, []);

  const handleEdit = (item) => {
    if (user.permission === "read") {
      showError("You don't have the permission to edit this!", "error");
      return;
    }
    setEditFlag((prev) => ({
      ...prev,
      id: item._id,
      state: true,
    }));
    handleOpen();
  };

  const handleChange = (e) => {
    setReq((prev) => ({
      ...prev,
      id: editFlag.id,
      ...(editFlag?.state ? { action: "edit" } : { action: "create" }),
      data: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    updateAnnouncement(req);
    handleClose();
  };
  const handleDelete = (item) => {
    const reqBody = {
      id: item._id,
    };
    if (user.role === "admin") {
      updateAnnouncement(reqBody);
    } else {
      showError("You don't have the permission to delete this!", "error");
    }
  };
  return (
    <div className="w-full h-full p-5">
      <div className="w-full flex justify-between items-center max-[450px]:flex-col gap-2">
        <Typography variant="h5">Announcements</Typography>
        <Tooltip
          title={
            user.role !== "admin" ? "Only admin can create announcements" : null
          }
        >
          <Button
            endIcon={<AddRounded />}
            variant="contained"
            onClick={() => handleOpen()}
          >
            Create Announcement
          </Button>
        </Tooltip>
      </div>
      <div className="w-full mt-5 h-[90%] flex flex-col gap-5 border border-gray-200 rounded-lg ">
        <div className="w-full h-full px-3 py-5 narrow_scrollbar overflow-auto flex flex-col gap-5">
          {announcements?.map((el, id) => {
            return (
              <div
                key={id}
                className="w-full p-5 rounded-lg bg-gray-200 shadow max-h-[300px] overflow-y-auto narrow_scrollbar flex items-center justify-between"
              >
                <Typography variant="body4bold">{el.announcement}</Typography>
                <div className="flex gap-3">
                  <Tooltip
                    title={
                      user.permission !== "read"
                        ? "edit"
                        : "you don't have the authority to edit this"
                    }
                  >
                    <IconButton onClick={() => handleEdit(el)}>
                      <EditRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={
                      user.permission === "all"
                        ? "delete"
                        : "you don't have the authority to delete this"
                    }
                  >
                    <IconButton onClick={() => handleDelete(el)}>
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-5">
            <Typography variant="h5">Create new announcement</Typography>
          </div>
          <TextField
            label="Your Message"
            multiline
            rows={4} // Number of visible rows
            variant="filled" // "outlined", "filled", or "standard"
            fullWidth // Makes it take up the full width of its container
            onChange={(e) => handleChange(e)}
          />
          <div className="w-full flex justify-between mt-8">
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} variant="contained">
              {editFlag.state ? "Update" : "Create"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Announcements;
