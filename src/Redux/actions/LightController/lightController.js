// streetLightActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { lightControllerApi } from "../../../components/allApis/api";

export const lightController = createAsyncThunk(
  "streetLight/fetchStreetLightData",
  async () => {
    const Newtoken = localStorage.getItem("CabinetToken");
    const response = await axios.get(lightControllerApi, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Newtoken}`,
      },
    });

    console.log("🚀 =====> responsehayat:", response);
    return response.data.data;
  }
);
