import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRequirementEnquiryAPI, deleteRequirementEnquiryAPI, getAllRequirementEnquiryAPI, updateRequirementEnquiryAPI } from "./requirementEnquiryApi";


// Create
export const createRequirementEnquiry = createAsyncThunk(
    "requirement/create",
    async (data, thunkAPI) => {
        try {
            return await createRequirementEnquiryAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const updateRequirementEnquiry = createAsyncThunk(
    "requirement/update",
    async ({ requirementId, data }, thunkAPI) => {
        try {
            return await updateRequirementEnquiryAPI(
                requirementId,
                data
            );
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const deleteRequirementEnquiry = createAsyncThunk(
    "requirement/delete",
    async (requirementId, thunkAPI) => {
        try {
            await deleteRequirementEnquiryAPI(requirementId);
            return requirementId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

// Get All
export const getAllRequirementEnquiry = createAsyncThunk(
    "requirement/getAll",
    async (_, thunkAPI) => {
        try {
            return await getAllRequirementEnquiryAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    enquiryList: [],
};

const requirementEnquirySlice = createSlice({
    name: "requirementEnquiry",
    initialState,

    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createRequirementEnquiry.pending, (state) => {
                state.loading = true;
            })

            .addCase(createRequirementEnquiry.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(createRequirementEnquiry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(getAllRequirementEnquiry.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllRequirementEnquiry.fulfilled, (state, action) => {
                state.loading = false;
                state.enquiryList = action.payload.data;
            })

            .addCase(getAllRequirementEnquiry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(updateRequirementEnquiry.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateRequirementEnquiry.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.enquiryList.findIndex(
                    item => item.requirementId === action.payload.data.requirementId
                );

                if (index !== -1) {
                    state.enquiryList[index] = action.payload.data;
                }
            })

            .addCase(updateRequirementEnquiry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(deleteRequirementEnquiry.fulfilled, (state, action) => {

                state.loading = false;

                state.enquiryList = state.enquiryList.filter(
                    item => item.requirementId !== action.payload
                );

            })
            ;
    },
});

export const { clearState } = requirementEnquirySlice.actions;

export default requirementEnquirySlice.reducer;