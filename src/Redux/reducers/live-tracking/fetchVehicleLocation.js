import { createSlice } from "@reduxjs/toolkit";
import { fetchVehicleDevice } from "../../actions/live-tracking/fetchVehicleLocation";

const deviceSlice = createSlice({
  name: "devices-location",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicleDevice.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchVehicleDevice.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deviceSlice.reducer;
