// import { createSlice } from "@reduxjs/toolkit";
// import { addGeoFenceData } from "../../actions/geo-fence/postGeoFence";

// const initialState = {
//   isloading: false,
//   postError: null,
// };

// const addGeoFenceSlice = createSlice({
//   name: "geoFence",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addGeoFenceData.pending, (state) => {
//         state.isloading = true;
//         state.postError = null;
//       })
//       .addCase(addGeoFenceData.fulfilled, (state) => {
//         state.isloading = false;
//         state.postError = null;
//       })
//       .addCase(addGeoFenceData.rejected, (state, action) => {
//         state.isloading = false;
//         state.postError = action.error.message;
//       });
//   },
// });
// export { addGeoFenceSlice };

// export default addGeoFenceSlice.reducer;
