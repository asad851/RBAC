import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  announcements: [],
};

const announcementSlicer = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAllAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
    createAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
    },
    editAnnouncement: (state, action) => {
      let { id, data } = action.payload;
      const index = state.announcements.findIndex((el) => el._id === id);
      if (index !== -1) {
        state.announcements[index].announcement = data;
      }
    },
    deleteAnnouncement: (state, action) => {
      let id = action.payload;
      state.announcements = state.announcements.filter((el) => el._id !== id);
    },
  },
});
export const {
  setAllAnnouncements,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} = announcementSlicer.actions;
export default announcementSlicer.reducer;
