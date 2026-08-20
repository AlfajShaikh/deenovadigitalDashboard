import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStaffAPI, deleteStaffAPI, getAllStaffAPI, getStaffByIdAPI, resendOtpAPI, updateStaffAPI, verifyOtpAPI } from "./staffEntryApi";

export const createStaff = createAsyncThunk(
    "staff/create",
    async (staffData, thunkAPI) => {
        try {
            return await createStaffAPI(staffData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const getAllStaff = createAsyncThunk(
    "staff/getAll",
    async (_, thunkAPI) => {
        try {
            return await getAllStaffAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);


export const getStaffById = createAsyncThunk(
    "staff/getById",
    async (staffId, thunkAPI) => {
        try {
            return await getStaffByIdAPI(staffId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const updateStaff = createAsyncThunk(
    "staff/update",
    async ({ staffId, data }, thunkAPI) => {
        try {
            return await updateStaffAPI(staffId, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);


export const deleteStaff = createAsyncThunk(
    "staff/delete",
    async (staffId, thunkAPI) => {
        try {
            await deleteStaffAPI(staffId);
            return staffId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);


export const verifyOtp = createAsyncThunk(
    "staff/verifyOtp",
    async (data, thunkAPI) => {
        try {
            return await verifyOtpAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const resendOtp = createAsyncThunk(
    "staff/resendOtp",
    async (email, thunkAPI) => {
        try {
            return await resendOtpAPI(email);
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
    staffList: [],
    selectedStaff: null,
};

const staffEntrySlice = createSlice({
    name: "staffEntry",
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

            .addCase(createStaff.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(createStaff.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.otpVerified = false;
            })


            .addCase(createStaff.rejected, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllStaff.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staffList = action.payload.data;
            })

            .addCase(getAllStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getStaffById.pending, (state) => {
                state.loading = true;
            })

            .addCase(getStaffById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedStaff = action.payload.data;
            })

            .addCase(getStaffById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(updateStaff.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateStaff.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.staffList.findIndex(
                    item => item.staffId === action.payload.data.staffId
                );

                if (index !== -1) {
                    state.staffList[index] = action.payload.data;
                }

                state.selectedStaff = action.payload.data;
            })

            .addCase(updateStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteStaff.fulfilled, (state, action) => {

                state.staffList = state.staffList.filter(
                    item => item.staffId !== action.payload
                );

                state.selectedStaff = null;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })

            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpVerified = true;
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
            })

            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearState } = staffEntrySlice.actions;

export default staffEntrySlice.reducer;