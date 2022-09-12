import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCounter: 0,
  },
  reducers: {
    addCounter: (state, action) => {
      state.cartCounter += 1;
    },
  },
});

export const { addCounter } = cartSlice.actions;
export default cartSlice.reducer;
