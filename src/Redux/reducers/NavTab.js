import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 2;

export const navTabSlice = createSlice({
  name: "navTab",
  initialState: { value: initialStateValue },
  reducers: {
    currentNavTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { currentNavTab } = navTabSlice.actions;

export default navTabSlice.reducer;
