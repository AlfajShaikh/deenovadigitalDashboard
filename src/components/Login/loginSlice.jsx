import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "./loginApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      return await loginAPI(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  success: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token"),
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
logout: (state) => {
  state.success = false;
  state.user = null;
  state.token = null;
  state.error = null;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
},
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;

    state.user = action.payload.user;
    state.token = action.payload.token;

    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("isLoggedIn", "true");
})

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;