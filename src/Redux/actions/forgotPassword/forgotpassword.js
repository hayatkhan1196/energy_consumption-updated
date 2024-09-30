import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action to reset password
export const resetPassword = createAsyncThunk(
  "resetPassword/reset",
  async (email, thunkAPI) => {
    try {
      const token = localStorage.getItem("TrackerToken");
      const response = await axios.post(
        "http://192.168.0.24:9000/api/auth/forgot",
        { email },
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
      throw new Error(error.message);
    }
  }
);
