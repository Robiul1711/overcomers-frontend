import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userType: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, userType } = action.payload;
      state.token = token;
      state.userType = userType;
      state.isAuthenticated = !!token;
    },
    clearAuth: (state) => {
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserType = (state) => state.auth.userType;
