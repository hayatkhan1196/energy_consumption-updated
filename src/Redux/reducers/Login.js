import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RuntimeConfig } from "../../runTime.config";

// Async thunk for login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(RuntimeConfig.loginApi, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("res ==", response?.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  isLoggedIn: false,
  providedData: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(
        "🚀 ~ file: Login.js:37 ~ builder.addCase ~ action:",
        action.payload.data
      );
      if (action.payload) {
        state.isLoggedIn = true;
        state.providedData = action?.payload.data;
        console.log(
          "🚀 ~ file: Login.js:44 ~ builder.addCase ~ state.providedData:",
          state.providedData
        );
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.providedData = null;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
