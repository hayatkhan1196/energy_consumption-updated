import { createSlice } from "@reduxjs/toolkit";
import { getVehicleStatus } from "../../actions/live-tracking/getVehicleStatus";

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    listOfActiveVehicles: [],
    listOfInActiveVehicles: [],
    checkPoint: false,
    error: null,
  },
  reducers: {
    setListOfActiveVehicles: (state, action) => {
      state.listOfActiveVehicles = action?.payload;
    },
    setListOfInActiveVehicles: (state, action) => {
      state.listOfInActiveVehicles = action?.payload;
    },
    setCheckPoint: (state, action) => {
      state.checkPoint = action.payload;
    },
  },
});

export const {
  setListOfActiveVehicles,
  setListOfInActiveVehicles,
  setCheckPoint,
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
