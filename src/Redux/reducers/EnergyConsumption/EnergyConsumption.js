import { createSlice } from "@reduxjs/toolkit";

import { energyConsumption } from "../../actions/EnergyConsumption/EnergyConsumption";

const energyConsumptionReducer = createSlice({
  name: "geofence",
  initialState: {
    deviceId: null,
    deviceState: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(energyConsumption.pending, (state) => {
        state.loading = true;
      })
      .addCase(energyConsumption.fulfilled, (state, action) => {
        state.deviceId = action.payload;
        state.deviceState = action.payload;
        state.loading = false;
      });
  },
});

export default energyConsumptionReducer.reducer;
