import { createSlice } from "@reduxjs/toolkit";
let userData = JSON.parse(localStorage.getItem("userData"));
const initialState = {
  error: "",
  loading: false,
  token: "",
  user: userData || null,
};

const authSlice = createSlice({
  name: "Login", // Use a clear and descriptive name
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
      state.error = ""; // Clear any previous errors
    },
    loginSuccess: (state, action) => {
      const token = action?.payload?.token; // Extract token from payload
      state.loading = false;
      state.token = token;
      state.isUserLoggedOut = false;
    },
    apiError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  apiError,
  setUserData,
} = authSlice.actions;
export default authSlice.reducer;