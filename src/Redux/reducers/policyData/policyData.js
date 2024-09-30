// policySlice.js
import { createSlice } from "@reduxjs/toolkit";

const policySlice = createSlice({
  name: "policies",
  initialState: {
    data: [],
    isLoading: false, // Add isLoading state
  },
  reducers: {
    setPolicies: (state, action) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPolicies, setIsLoading } = policySlice.actions;
export default policySlice.reducer;
