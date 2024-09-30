// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const addGeoFenceData = createAsyncThunk(
//   "geoFence/createGeoFenceData",
//   async (data, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("TrackerToken");

//       const response = await axios.post(
//         "http://192.168.0.240:8500/api/fence",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       throw error.response.data.message;
//     }
//   }
// );
