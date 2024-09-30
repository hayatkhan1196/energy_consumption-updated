// import { updateGeoFenceData } from "../../actions/geo-fence/putGeoFence";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   error: null,
// };

// const updateGeoFenceSlice = createSlice({
//   name: "updateGeoFence",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateGeoFenceData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateGeoFenceData.fulfilled, (state) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateGeoFenceData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });
// export { updateGeoFenceData };

// export default updateGeoFenceSlice.reducer;
