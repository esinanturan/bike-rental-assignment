import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEditUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEditUser(state, { payload: action }) {
      state.currentEditUser = action;
    },
    unsetEditUser(state) {
      state = initialState;
    },
  },
});

export const { setEditUser, unsetEditUser } = userSlice.actions;
export default userSlice.reducer;
