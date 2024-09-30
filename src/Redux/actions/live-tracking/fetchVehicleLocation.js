import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchVehicleLiveApi } from "../../../components/allApis/api";

export const fetchVehicleDevice = createAsyncThunk(
  "devices/fetchVehicleLocation",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("TrackerToken");
      const response = await axios.get(fetchVehicleLiveApi, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const initialData = response.data.data;
      return initialData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
