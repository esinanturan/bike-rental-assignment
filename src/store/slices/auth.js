import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LOGGED_IN: false,
  token: "$2b$10$aAOIAbJRAiicQZ944howNe",
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload: action }) {
      state.LOGGED_IN = true;
      state.auth = action.auth;
      state.token = action.token;
    },
    unsetAuth(state) {
      state.LOGGED_IN = false;
      state.auth = null;
      state.token = null;
    },
  },
});

export const { setAuth, unsetAuth } = authSlice.actions;
export default authSlice.reducer;
