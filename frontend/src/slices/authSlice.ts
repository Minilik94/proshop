import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo", JSON.stringify(state));
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;