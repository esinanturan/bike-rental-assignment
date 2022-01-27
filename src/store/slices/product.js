import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEditProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setEditProduct(state, { payload }) {
      state.list = payload;
    },
    unsetEditProduct(state) {
      state = initialState;
    },
  },
});

export const { setEditProduct, unsetEditProduct } = productSlice.actions;
export default productSlice.reducer;
