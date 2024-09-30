import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const updateGeoFenceData = createAsyncThunk(
  "geoFence/updateGeoFenceData",
  async (payload, thunkAPI) => {
    try {
      const { geofendId, updateData } = payload;
      const token = localStorage.getItem("TrackerToken");

      const response = await axios.put(
        `http://192.168.0.24:9000/api/fence/${geofendId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
