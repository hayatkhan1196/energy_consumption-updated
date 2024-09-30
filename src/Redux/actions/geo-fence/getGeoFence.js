// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { geoFenceApi } from "../../../components/allApis/api";

// export const getGeoFence = createAsyncThunk(
//   "geofence/getGeofence data",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("TrackerToken");
//       const response = await axios.get(geoFenceApi, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const initialData = response.data.data;
//       console.log(
//         "🚀 ~ file: getGeoFence.js:19 ~ initialData======>:",
//         initialData
//       );
//       return initialData;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
