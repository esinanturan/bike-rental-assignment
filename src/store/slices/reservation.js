import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentReservationProduct: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setCurrentReservationProduct(state, { payload: action }) {
      state.currentReservationProduct = action;
    },
    unSetCurrentReservationProduct(state) {
      state.currentReservationProduct = null;
    },
  },
});

export const { setCurrentReservationProduct, unSetCurrentReservationProduct } =
  reservationSlice.actions;
export default reservationSlice.reducer;
