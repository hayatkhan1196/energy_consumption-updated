import { resetPassword } from "../../actions/forgotPassword/forgotpassword";
import { createSlice } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    email: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.email = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default resetPasswordSlice.reducer;
