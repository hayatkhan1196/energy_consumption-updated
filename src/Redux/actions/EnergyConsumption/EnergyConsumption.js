import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { energyConsumptionOnOffApi } from "../../../components/allApis/api";

export const energyConsumption = createAsyncThunk(
  "energyconsumption/energyConsumptionOnOffApiData",
  async (data, thunkAPI) => {
    try {
      const Newtoken = localStorage.getItem("CabinetToken");

      const response = await axios.post(energyConsumptionOnOffApi, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Newtoken}`,
        },
      });
      console.log("postdata", response.data);

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
