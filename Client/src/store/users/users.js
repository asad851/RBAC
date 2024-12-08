import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.users = [...action.payload];
    },
    changePermission: (state, action) => {
      const { id, permission } = action.payload;
      const index = state.users.findIndex((el) => el._id === id);
      if (index !== -1) {
        state.users[index].permissions = permission;
      }
    },
  },
});
export const { setAllUsers, changePermission } = userSlice.actions;
export default userSlice.reducer;
