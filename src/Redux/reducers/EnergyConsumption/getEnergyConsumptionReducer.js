// streetLightReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getEnergyLight } from "../../actions/EnergyConsumption/getEnergyConsumption";
// import { getEnergyLight } from "../../actions/EnergyConsumption/getEnergyConsumption";

const initialState = {
  data: null,
  loading: false,
};

const getLiveLatestReducer = createSlice({
  name: "streetLight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnergyLight.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnergyLight.fulfilled, (state, action) => {
        console.log(
          "🚀 ~ file: getEnergyConsumptionReducer.js:20 ~ .addCase ~ action:",
          action
        );
        state.data = action.payload;
        console.log(
          "🚀 ~ file: getEnergyConsumptionReducer.js:25 ~ .addCase ~ state.data:",
          state.data
        );

        state.loading = false;
      })
      .addCase(getEnergyLight.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getLiveLatestReducer.reducer;
