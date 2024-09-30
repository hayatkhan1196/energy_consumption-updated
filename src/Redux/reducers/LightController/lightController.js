// streetLightReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { lightController } from "../../actions/LightController/lightController";

const initialState = {
  data: null,
  loading: false,
};

const LightControllerReducer = createSlice({
  name: "streetLight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lightController.pending, (state) => {
        state.loading = true;
      })
      .addCase(lightController.fulfilled, (state, action) => {
        console.log("light action", action);
        state.data = action.payload;

        state.loading = false;
      })
      .addCase(lightController.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default LightControllerReducer.reducer;
