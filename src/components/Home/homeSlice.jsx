import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardAPI } from "./homeApi";

export const getDashboard = createAsyncThunk(
    "home/getDashboard",
    async (_, { rejectWithValue }) => {
        try {
            return await getDashboardAPI();
        } catch (err) {
            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);

const homeSlice = createSlice({
    name: "home",

    initialState: {
        dashboard: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
            })

            .addCase(getDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload.dashboard;
            })

            .addCase(getDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default homeSlice.reducer;