import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEstimateAPI, getEstimateByRequirementIdAPI } from "./estimationApi";


// ---------------- CREATE ----------------

export const createEstimate = createAsyncThunk(
    "estimate/createEstimate",
    async (data, { rejectWithValue }) => {
        try {
            return await createEstimateAPI(data);
        } catch (err) {
            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);

// ---------------- GET ----------------

export const getEstimateByRequirementId = createAsyncThunk(
    "estimate/getEstimateByRequirementId",
    async (requirementId, { rejectWithValue }) => {
        try {
            return await getEstimateByRequirementIdAPI(requirementId);
        } catch (err) {
            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);

const estimationSlice = createSlice({
    name: "estimate",

    initialState: {
        estimate: null,
        loading: false,
        createLoading: false,
        error: null,
        success: false,
    },

    reducers: {
        clearEstimate(state) {
            state.estimate = null;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createEstimate.pending, (state) => {
                state.createLoading = true;
                state.success = false;
            })

            .addCase(createEstimate.fulfilled, (state, action) => {
                state.createLoading = false;
                state.success = true;
                state.estimate = action.payload.data;
            })

            .addCase(createEstimate.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })

            // GET

            .addCase(getEstimateByRequirementId.pending, (state) => {
                state.loading = true;
            })

            .addCase(getEstimateByRequirementId.fulfilled, (state, action) => {
                state.loading = false;
                state.estimate = action.payload.data;
            })

            .addCase(getEstimateByRequirementId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearEstimate } = estimationSlice.actions;

export default estimationSlice.reducer;