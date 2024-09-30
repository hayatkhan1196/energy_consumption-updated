import { createSlice } from "@reduxjs/toolkit";
import { authorizeSocket } from "../../actions/live-tracking/socket";

const initialState = {
  data: [],
  listOfActiveUsers: [],
  listOfInactiveUsers: [],
  loading: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // setData: (state, action) => {
    //   console.log("🚀 ~ file: Socket.js:29 ~ action:", action);
    //   state.data = action.payload;
    // },
    // setListOfActiveUsers: (state, action) => {
    //   state.listOfActiveUsers = action.payload;
    // },
    // setListOfInactiveUsers: (state, action) => {
    //   console.log("socket data action:================>", action.payload);
    //   state.listOfInactiveUsers = action.payload;
    // },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorizeSocket.pending, (state, action) => {
        state.data = action.payload;
        state.loading = true;
      })
      .addCase(authorizeSocket.fulfilled, (state, action) => {
        state.listOfActiveUsers = action.payload?.ACTIVE;
        state.listOfInactiveUsers = action.payload?.IN_ACTIVE;
        state.loading = false;
      })
      .addCase(authorizeSocket.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setData,
  setListOfActiveUsers,
  setListOfInactiveUsers,
  setLoading,
} = socketSlice.actions;

export default socketSlice.reducer;
