import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { socketApi } from "../../../components/allApis/api";

export const authorizeSocket = createAsyncThunk(
  "socket/authorizeSocket",
  async ({ token, socketId, channelName }, { rejectWithValue }) => {
    console.log(
      "🚀 ~ file: socket.js:8 ~ token, socketId, channelName :",
      token,
      socketId,
      channelName
    );
    try {
      const response = await axios.post(
        socketApi,
        {
          socket_id: socketId,
          channel_name: channelName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("🚀 ~ file: socket.js:22 ~ response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
