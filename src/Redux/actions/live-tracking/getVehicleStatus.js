import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getVehicleLiveApi } from "../../../components/allApis/api";
import {
  setCheckPoint,
  setListOfActiveVehicles,
  setListOfInActiveVehicles,
} from "../../reducers/live-tracking/getVehicleStatus";

export const getVehicleStatus = createAsyncThunk(
  "vehicles/getStatus",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("TrackerToken");

    try {
      const response = await axios.get(getVehicleLiveApi, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      thunkAPI.dispatch(setListOfActiveVehicles(data?.ACTIVE));
      thunkAPI.dispatch(setListOfInActiveVehicles(data?.IN_ACTIVE));
      thunkAPI.dispatch(setCheckPoint(true));
    } catch (error) {
      console.log("This is error: ", error.response);
      alert(`${error.data.message}`);
    }
  }
);
