// import { createSlice } from "@reduxjs/toolkit";
// import { getGeoFence } from "../../actions/geo-fence/getGeoFence";

// const geoFenceSlice = createSlice({
//   name: "geofence",
//   initialState: {
//     data: {},
//     error: null,
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getGeoFence.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getGeoFence.fulfilled, (state, action) => {
//         console.log("🚀 ~ file: geoFence.js:27 ~ .addCase ~ action:", action);
//         state.data = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export default geoFenceSlice.reducer;
