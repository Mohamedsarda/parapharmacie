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
    setCounter: (state, action) => {
      state.cartCounter = action.payload;
    },
  },
});

export const { addCounter, setCounter } = cartSlice.actions;
export default cartSlice.reducer;
