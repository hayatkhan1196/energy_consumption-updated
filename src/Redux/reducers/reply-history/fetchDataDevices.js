import { createSlice } from "@reduxjs/toolkit";

const devicesReplyHistory = createSlice({
  name: "devices",
  initialState: {
    listOfAllDevices: [],
  },
  reducers: {
    setListOfAllDevices: (state, action) => {
      state.listOfAllDevices = action.payload;
    },
  },
});

export const { setListOfAllDevices } = devicesReplyHistory.actions;
export default devicesReplyHistory.reducer;
