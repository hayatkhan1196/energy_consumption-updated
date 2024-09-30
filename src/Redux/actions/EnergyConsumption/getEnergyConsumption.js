// streetLightActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnergyConsumptionLiveData } from "../../../components/allApis/api";

export const getEnergyLight = createAsyncThunk(
  "latestLive/getLiveLatestData",
  async () => {
    const Newtoken = localStorage.getItem("CabinetToken");
    const response = await axios.get(getEnergyConsumptionLiveData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Newtoken}`,
      },
    });

    console.log("🚀 =====> livedata response:", response.data.data);
    return response.data.data;
  }
);
