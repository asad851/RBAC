import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBar: false,
};

const LayoutSlicer = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.sideBar = !state.sideBar;
    },
  },
});
export const {toggleSideBar} = LayoutSlicer.actions
export default LayoutSlicer.reducer
